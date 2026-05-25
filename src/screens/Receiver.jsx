import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Download, Check, AlertCircle, Loader2 } from 'lucide-react';
import { formatBytes } from '../lib/utils';
export default function Receiver({
  onBack,
  transferManager,
  initialCode
}) {
  const [code, setCode] = useState(initialCode || '');
  useEffect(() => {
    if (initialCode) {
      transferManager.connectToRoot(initialCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);
  const handleSubmit = e => {
    e.preventDefault();
    if (code.trim().length === 6) {
      transferManager.connectToRoot(code.toUpperCase());
    }
  };
  const renderStatus = () => {
    const {
      status,
      progress,
      metadata,
      errorMsg
    } = transferManager;
    if (status === 'error') {
      return <div className="text-center p-8 bg-red-500/10 border border-red-500/50 rounded-2xl w-full max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 font-medium mb-6">{errorMsg || "Connection failed or interrupted."}</p>
          <div className="flex justify-center gap-4">
             <button onClick={() => transferManager.cleanup()} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">Try Again</button>
             <button onClick={onBack} className="text-slate-400 hover:text-white underline text-sm py-2">Return Home</button>
          </div>
        </div>;
    }
    if (status === 'connecting') {
      return <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="flex flex-col items-center justify-center p-12 text-slate-400 max-w-md mx-auto">
          <Loader2 className="w-8 h-8 animate-spin mb-4 text-red-500" />
          <p>Locating peer and establishing secure connection...</p>
        </motion.div>;
    }
    if (status === 'waiting_for_approval') {
      return <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 max-w-md mx-auto shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-red-500 opacity-50" />
          <div className="flex flex-col items-center justify-center text-center">
            <Download className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-xl font-display text-white mb-2">Incoming Transfer</h3>
            <p className="text-sm text-slate-400 mb-6 font-mono">Sender wants to share <strong className="text-white">{transferManager.totalFiles}</strong> file(s) with you.</p>
            
            <button onClick={transferManager.acceptTransfer} className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-red-600 hover:bg-red-500 text-white font-medium rounded-xl transition-all shadow-[0_0_24px_-6px_rgba(99,102,241,0.4)]">
               Accept & Download
            </button>
          </div>
        </motion.div>;
    }
    if (status === 'reconnecting') {
      return <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="flex flex-col items-center justify-center p-12 text-orange-400 max-w-md mx-auto bg-orange-950/20 border border-orange-900/50 rounded-2xl">
           <Loader2 className="w-8 h-8 animate-spin mb-4 text-orange-500" />
           <p className="text-center mb-4">Connection interrupted. Waiting to reconnect...</p>
           <button onClick={() => transferManager.resumeDownload()} className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg transition-colors">Force Reconnect</button>
         </motion.div>;
    }
    if (status === 'negotiating' || status === 'transferring') {
      return <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 max-w-md mx-auto shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-red-500 opacity-50" />
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-display text-white">Downloading</h3>
            <span className="text-red-400 font-mono text-lg">{progress.toFixed(0)}%</span>
          </div>
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 flex flex-col gap-1">
             <div className="flex justify-between w-full mb-1">
               <span className="text-xs text-red-500 font-bold tracking-wider uppercase">
                 File {transferManager.currentIndex + 1} of {transferManager.totalFiles || 1}
               </span>
             </div>
             <p className="text-sm font-medium text-slate-300 truncate" title={metadata?.name}>{metadata?.name || 'File...'}</p>
             <p className="text-xs text-slate-500 font-mono">{formatBytes(metadata?.size || 0)}</p>
          </div>
          
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
             <motion.div className="h-full bg-red-500 shadow-[0_0_24px_-6px_rgba(99,102,241,0.5)]" initial={{
            width: 0
          }} animate={{
            width: `${progress}%`
          }} transition={{
            ease: "linear",
            duration: 0.2
          }} />
          </div>
          <p className="text-center text-xs text-slate-400 mt-4">
            {status === 'negotiating' ? 'Initializing secure channel...' : 'Receiving encrypted chunks...'}
          </p>
          
          {!('showSaveFilePicker' in window) && status === 'transferring' && transferManager.totalFiles === 1 && <p className="text-[10px] text-orange-400/80 mt-4 text-center">
               * Running in fallback mode. The file will download once fully received into memory.
             </p>}
        </motion.div>;
    }
    if (status === 'completed') {
      return <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="w-full flex-col flex items-center bg-emerald-950/20 border border-emerald-900/50 rounded-2xl p-8 max-w-md mx-auto shadow-2xl backdrop-blur-md text-center cursor-default">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
             <Check className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-xl font-display text-white mb-2">Download Complete</h3>
          <p className="text-sm text-slate-400 mb-8 font-mono">{transferManager.totalFiles || 1} file(s) securely received.</p>
          <button onClick={() => {
          transferManager.cleanup();
          setCode('');
        }} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium">
             Receive More Files
          </button>
        </motion.div>;
    }

    // Default: Form to enter code
    return <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="w-full max-w-md mx-auto">
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[60px]" />
          
          <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-8 mx-auto shadow-xl shadow-black/40">
            <Download className="w-8 h-8 text-red-400" />
          </div>
          
          <h3 className="text-2xl font-display font-bold text-center text-white mb-2">Connect to Root</h3>
          <p className="text-slate-400 text-center text-sm mb-8">Enter the 6-character secure code provided by the sender.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="relative mb-6">
              <input type="text" value={code} onChange={e => setCode(e.target.value.toUpperCase().slice(0, 6))} placeholder="XXXXXX" className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl px-6 py-4 text-center text-3xl font-mono tracking-[0.5em] text-white placeholder-slate-700 focus:outline-none focus:border-red-500/50 transition-colors uppercase" maxLength={6} />
            </div>
            
            <button type="submit" disabled={code.length !== 6} className="w-full flex items-center justify-center gap-2 py-4 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all hover:shadow-[0_0_24px_-6px_rgba(99,102,241,0.4)]">
               Connect & Receive <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </motion.div>;
  };
  return <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 w-full">
      <div className="w-full max-w-4xl flex items-center justify-start mb-8">
        <button onClick={() => {
        transferManager.cleanup();
        onBack();
      }} className="flex items-center text-slate-400 hover:text-white transition-colors gap-2 text-sm uppercase tracking-wider font-semibold">
          <ArrowLeft className="w-4 h-4" /> Exit 
        </button>
      </div>

      {renderStatus()}
    </div>;
}