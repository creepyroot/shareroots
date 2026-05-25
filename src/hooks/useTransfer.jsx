import { useState, useRef, useCallback } from 'react';
import Peer from 'peerjs';
const CHUNK_SIZE = 256 * 1024; // 256 KB
const MAX_BUFFER = 4 * 1024 * 1024; // 4 MB

const ICE_SERVERS = [{
  urls: 'stun:stun.l.google.com:19302'
}, {
  urls: 'stun:global.stun.twilio.com:3478'
}, {
  urls: 'turn:openrelay.metered.ca:80',
  username: 'openrelayproject',
  credential: 'openrelayproject'
}, {
  urls: 'turn:openrelay.metered.ca:443',
  username: 'openrelayproject',
  credential: 'openrelayproject'
}, {
  urls: 'turn:openrelay.metered.ca:443?transport=tcp',
  username: 'openrelayproject',
  credential: 'openrelayproject'
}];
export function useTransfer() {
  const [status, setStatus] = useState('idle');
  const [rootId, setRootId] = useState('');
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [metadata, setMetadata] = useState(null);
  const metadataRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const peerRef = useRef(null);
  const connRef = useRef(null);
  const filesRef = useRef([]);

  // Receiver state
  const receivedBytesRef = useRef(0);
  const fileStreamRef = useRef(null); // FileSystemWritableFileStream
  const dirHandleRef = useRef(null); // FileSystemDirectoryHandle
  const chunksCacheRef = useRef([]); // Fallback if no FileSystem API

  const cleanup = useCallback(() => {
    if (connRef.current) {
      connRef.current.close();
      connRef.current = null;
    }
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    if (fileStreamRef.current) {
      try {
        fileStreamRef.current.close();
      } catch (e) {}
      fileStreamRef.current = null;
    }
    chunksCacheRef.current = [];
    dirHandleRef.current = null;
    setStatus('idle');
    setProgress(0);
    setMetadata(null);
    metadataRef.current = null;
    setCurrentIndex(0);
    setTotalFiles(0);
  }, []);

  // SENDER
  const startHosting = useCallback(files => {
    cleanup();
    setStatus('generating_id');
    filesRef.current = files;
    setTotalFiles(files.length);
    setCurrentIndex(0);

    // Generate a random 6-character alphanumeric code
    const code = Math.random().toString(36).slice(-6).toUpperCase().padStart(6, '0');
    const fullId = `shareroots-${code}`;
    const peer = new Peer(fullId, {
      debug: 2,
      config: {
        iceServers: ICE_SERVERS
      }
    });
    peerRef.current = peer;
    peer.on('open', id => {
      setRootId(code);
      setStatus('waiting_for_peer');
    });
    peer.on('connection', conn => {
      // Disconnect existing if a new connection comes in
      if (connRef.current && connRef.current.open) {
        connRef.current.close();
      }
      connRef.current = conn;
      setStatus('negotiating');
      let currentFileIdx = 0;
      let isSending = false;
      const sendNextFile = () => {
        if (!connRef.current || !connRef.current.open) return;
        if (currentFileIdx >= filesRef.current.length) {
          connRef.current.send({
            type: 'all-complete'
          });
          setStatus('completed');
          setProgress(100);
          return;
        }
        const file = filesRef.current[currentFileIdx];
        const md = {
          name: file.name,
          size: file.size,
          type: file.type
        };
        setMetadata(md);
        metadataRef.current = md;
        setCurrentIndex(currentFileIdx);
        connRef.current.send({
          type: 'metadata',
          metadata: md,
          index: currentFileIdx,
          total: filesRef.current.length
        });
      };
      conn.on('open', () => {
        sendNextFile();
      });
      conn.on('data', async data => {
        const msg = data;
        if (msg.type === 'accept') {
          if (isSending) return;
          isSending = true;
          setStatus('transferring');
          const file = filesRef.current[currentFileIdx];
          let offset = msg.startOffset;

          // Send Loop
          while (offset < file.size) {
            if (!connRef.current || !connRef.current.open) {
              isSending = false;
              break;
            }

            // Flow control/Backpressure
            if (conn.dataChannel && conn.dataChannel.bufferedAmount > MAX_BUFFER) {
              await new Promise(resolve => setTimeout(resolve, 50));
              continue;
            }
            const slice = file.slice(offset, offset + CHUNK_SIZE);
            const arrayBuffer = await slice.arrayBuffer();
            try {
              conn.send({
                type: 'file-data',
                buffer: arrayBuffer
              });
              offset += arrayBuffer.byteLength;
              setProgress(Number((offset / file.size * 100).toFixed(2)));
            } catch (err) {
              console.error("Send error", err);
              isSending = false;
              break;
            }
          }
          if (offset >= file.size) {
            conn.send({
              type: 'file-complete'
            });
            isSending = false;
          }
        } else if (msg.type === 'ready-for-next') {
          currentFileIdx++;
          sendNextFile();
        }
      });
      conn.on('close', () => {
        setStatus(prev => {
          if (prev !== 'completed') return 'waiting_for_peer';
          return prev;
        });
      });
      conn.on('error', err => {
        console.error('Connection error:', err);
        setStatus('waiting_for_peer');
      });
    });
    peer.on('error', err => {
      console.error('Peer error', err);
      setStatus('error');
      setErrorMsg(err.message);
    });
  }, [cleanup, status]);

  // RECEIVER
  const connectToRoot = useCallback(code => {
    cleanup();
    setStatus('connecting');
    setRootId(code);
    const peer = new Peer({
      debug: 2,
      config: {
        iceServers: ICE_SERVERS
      }
    });
    peerRef.current = peer;
    peer.on('error', err => {
      console.error('Peer error:', err.type, err);
      setStatus('error');
      if (err.type === 'peer-unavailable') {
        setErrorMsg('Sender not found. Check the code and make sure the sender is open.');
      } else {
        setErrorMsg(err.message || 'Connection failed.');
      }
    });
    peer.on('open', () => {
      const fullId = `shareroots-${code.toUpperCase()}`;
      console.log("Connected to secure channel. Connecting to sender:", fullId);
      const conn = peer.connect(fullId, {
        reliable: true
      });
      connRef.current = conn;
      conn.on('open', () => {
        console.log("Data connection opened to sender.");
        setStatus(prev => {
          if (prev === 'connecting' || prev === 'idle') {
            return 'negotiating';
          }
          return prev;
        });
      });
      conn.on('data', async data => {
        const msg = data;
        if (msg.type === 'metadata') {
          setMetadata(msg.metadata);
          metadataRef.current = msg.metadata;
          setCurrentIndex(msg.index);
          setTotalFiles(msg.total);
          receivedBytesRef.current = 0;
          chunksCacheRef.current = [];
          if (msg.index === 0) {
            setStatus('waiting_for_approval');
          } else {
            // Auto-accept subsequent files
            const autoAcceptNextFile = async () => {
              let targetFileStream = null;
              try {
                if (dirHandleRef.current) {
                  const fileHandle = await dirHandleRef.current.getFileHandle(msg.metadata.name, {
                    create: true
                  });
                  targetFileStream = await fileHandle.createWritable();
                }
              } catch (err) {
                console.error("Auto file access denied", err);
              }
              fileStreamRef.current = targetFileStream;
              setStatus('transferring');
              conn.send({
                type: 'accept',
                startOffset: 0
              });
            };
            autoAcceptNextFile();
          }
        }
        if (msg.type === 'file-data') {
          const buffer = msg.buffer;
          receivedBytesRef.current += buffer.byteLength;
          setProgress(Number((receivedBytesRef.current / (metadataRef.current?.size || 1) * 100).toFixed(2)));
          if (fileStreamRef.current) {
            await fileStreamRef.current.write(buffer);
          } else {
            chunksCacheRef.current.push(buffer);
          }
        }
        if (msg.type === 'file-complete') {
          if (fileStreamRef.current) {
            await fileStreamRef.current.close();
            fileStreamRef.current = null;
          } else {
            // Trigger fallback download
            const blob = new Blob(chunksCacheRef.current, {
              type: metadataRef.current?.type || 'application/octet-stream'
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = metadataRef.current?.name || 'downloaded_file';
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
          }
          if (msg.type === 'file-complete') {
            conn.send({
              type: 'ready-for-next'
            });
          }
        }
        if (msg.type === 'all-complete') {
          setStatus('completed');
          setProgress(100);
        }
      });
      conn.on('close', () => {
        setStatus(prev => {
          if (prev !== 'completed') return 'reconnecting';
          return prev;
        });
      });
      conn.on('error', err => {
        console.error('Connection error', err);
        setStatus('error');
        setErrorMsg(err.message);
      });
    });
    peer.on('error', err => {
      console.error('Peer error', err);
      setStatus('error');
      setErrorMsg(err.message);
    });
  }, [cleanup]);
  const resumeDownload = useCallback(() => {
    if (rootId) {
      connectToRoot(rootId);
    }
  }, [rootId, connectToRoot]);
  const acceptTransfer = useCallback(async () => {
    if (!metadataRef.current || !connRef.current) return;
    let targetFileStream = null;
    if ('showDirectoryPicker' in window && totalFiles > 1 && !dirHandleRef.current) {
      try {
        // @ts-ignore
        dirHandleRef.current = await window.showDirectoryPicker({
          mode: 'readwrite'
        });
      } catch (err) {
        console.warn("Directory picker cancelled", err);
      }
    }
    try {
      if (dirHandleRef.current) {
        const fileHandle = await dirHandleRef.current.getFileHandle(metadataRef.current.name, {
          create: true
        });
        targetFileStream = await fileHandle.createWritable();
      } else if ('showSaveFilePicker' in window && totalFiles === 1) {
        // @ts-ignore
        const handle = await window.showSaveFilePicker({
          suggestedName: metadataRef.current.name
        });
        targetFileStream = await handle.createWritable();
      }
    } catch (err) {
      console.error("File access denied", err);
      setStatus('error');
      setErrorMsg('File access denied by user.');
      connRef.current.close();
      return;
    }
    fileStreamRef.current = targetFileStream;
    setStatus('transferring');
    connRef.current.send({
      type: 'accept',
      startOffset: 0
    });
  }, [totalFiles]);
  return {
    status,
    rootId,
    progress,
    errorMsg,
    metadata,
    currentIndex,
    totalFiles,
    startHosting,
    connectToRoot,
    resumeDownload,
    acceptTransfer,
    cleanup
  };
}