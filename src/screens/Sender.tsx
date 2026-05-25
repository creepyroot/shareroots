import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Copy, Check, FileUp, Loader2, ArrowRight } from 'lucide-react';
import { useTransfer } from '../hooks/useTransfer';
import { formatBytes } from '../lib/utils';

interface SenderProps {
  onBack: () => void;
  transferManager: ReturnType<typeof useTransfer>;
}

export default function Sender({ onBack, transferManager }: SenderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopyLink = () => {
    const url = window.location.origin + '?recv=' + transferManager.peerId;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(transferManager.peerId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      transferManager.startHosting(selectedFiles);
    }
  };

  // Prevent drag default behavior
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFiles = Array.from(e.dataTransfer.files);
      setFiles(selectedFiles);
      transferManager.startHosting(selectedFiles);
    }
  };

  const renderStatus = () => {
    const { status, progress, peerId, metadata, errorMsg, currentIndex, totalFiles } = transferManager;
    
    if (status === 'error') {
      return (
        <div className="text-center p-8 bg-red-500/10 border border-red-500/50 rounded-2xl w-full">
          <p className="text-red-400 font-medium mb-4">{errorMsg || "An unexpected error occurred."}</p>
          <button onClick={() => { transferManager.cleanup(); setFiles([]); }} className="text-slate-300 hover:text-white underline">Start Over</button>
        </div>
      );
    }

    if (status === 'generating_id') {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mb-4 text-cyan-500" />
          <p>Generating security credentials...</p>
        </div>
      );
    }

    if (status === 'waiting_for_peer') {
       return (
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 max-w-md shadow-2xl backdrop-blur-md relative overflow-hidden"
         >
           <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-500 opacity-50" />
           <h3 className="text-lg font-medium text-slate-200 mb-6 text-center">Share this code with the receiver</h3>
           
           <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6">
              <span className="font-mono text-3xl font-bold tracking-[0.2em] text-cyan-400 select-all">{peerId}</span>
              <button 
                onClick={handleCopyCode}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                title="Copy Code"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5 text-slate-400" />}
              </button>
           </div>
           
           <div className="flex flex-col gap-3">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-xl transition-colors cyan-glow"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                Copy Direct Link
              </button>
           </div>
           
           <div className="mt-8 flex flex-col items-center gap-3">
             <div className="relative flex items-center justify-center w-12 h-12">
               <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin"></div>
             </div>
             <p className="text-sm text-slate-400">Waiting for receiver to connect...</p>
             <p className="text-xs text-slate-500 mt-2 font-mono">{totalFiles} file(s) queued for transfer</p>
           </div>
         </motion.div>
       )
    }

    if (status === 'negotiating' || status === 'transferring') {
      return (
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 max-w-md shadow-2xl backdrop-blur-md"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-display text-white">Transferring</h3>
             <span className="text-cyan-400 font-mono text-lg">{progress.toFixed(0)}%</span>
           </div>
           
           <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 flex flex-col gap-1">
              <div className="flex justify-between w-full mb-1">
                <span className="text-xs text-cyan-500 font-bold tracking-wider uppercase">
                  File {currentIndex + 1} of {totalFiles}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-300 truncate" title={metadata?.name}>{metadata?.name}</p>
              <p className="text-xs text-slate-500 font-mono">{formatBytes(metadata?.size || 0)}</p>
           </div>
           
           <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-cyan-500 cyan-glow"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
          </div>
          <p className="text-center text-xs text-slate-400 mt-4 animate-pulse">
            {status === 'negotiating' ? 'Establishing secure channel...' : 'Sending encrypted chunks...'}
          </p>
        </motion.div>
      );
    }
    
    if (status === 'completed') {
      return (
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full flex-col flex items-center bg-emerald-950/20 border border-emerald-900/50 rounded-2xl p-8 max-w-md shadow-2xl backdrop-blur-md text-center cursor-default"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
             <Check className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-xl font-display text-white mb-2">Transfer Complete</h3>
          <p className="text-sm text-slate-400 mb-8 font-mono">{totalFiles} file(s) securely delivered.</p>
          <button
             onClick={() => {
               transferManager.cleanup();
               setFiles([]);
             }}
             className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
          >
             Send More Files
          </button>
        </motion.div>
      )
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 w-full">
      <div className="w-full max-w-4xl flex items-center justify-start mb-8">
        <button 
          onClick={() => {
             transferManager.cleanup();
             onBack();
          }} 
          className="flex items-center text-slate-400 hover:text-white transition-colors gap-2 text-sm uppercase tracking-wider font-semibold group py-2"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Exit 
        </button>
      </div>

      <AnimatePresence mode="wait">
        {files.length === 0 ? (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-xl"
          >
            <div 
              onDragOver={handleDrag}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-3xl p-16 text-center cursor-pointer bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-sm transition-all duration-300 group"
            >
              <input 
                type="file"
                multiple
                ref={fileInputRef}
                onChange={onFileChange}
                className="hidden"
              />
              <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-800/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl shadow-black/40">
                <FileUp className="w-10 h-10 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">Select Files to Send</h3>
              <p className="text-slate-400 mb-6 max-w-sm mx-auto leading-relaxed">
                Drag and drop files here, or click to browse. Share multiple files of any size.
              </p>
              
              <div className="inline-flex items-center gap-2 bg-slate-950 border border-slate-800 px-4 py-2 rounded-lg text-sm text-slate-300 font-mono">
                Initiate Secure Channel <ArrowRight className="w-4 h-4 text-cyan-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex justify-center"
          >
            {renderStatus()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
