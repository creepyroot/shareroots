import { UploadCloud, DownloadCloud, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
export default function Home({
  onSelect
}) {
  return <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center justify-center space-x-2 mb-6 px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4 text-red-400" />
          <span className="text-sm font-medium text-slate-300">E2E Encrypted P2P Transfer</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-widest text-white mb-6 uppercase">
          SHARE<span className="text-red-400">ROOTS</span>
        </h1>
        
        <p className="text-lg text-slate-400 font-sans max-w-xl mx-auto leading-relaxed">
          Share files securely between devices without size limits. 
          No servers in the middle, purely peer-to-peer over an encrypted 
          secure channel.
        </p>
      </motion.div>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.1
    }} className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* Send Card */}
        <button onClick={() => onSelect('send')} className="group relative flex flex-col items-center p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-red-500/50 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm hover:red-glow overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 rounded-2xl bg-slate-800flex flex-col items-center justify-center mb-6 bg-slate-800/80 group-hover:scale-110 transition-transform duration-300 flex items-center shadow-lg shadow-black/50">
            <UploadCloud className="w-8 h-8 text-red-400 relative z-10" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2 font-display">Send a File</h2>
          <p className="text-slate-400 text-sm italic text-center">Generate a secure code and transfer directly to the receiver.</p>
        </button>

        {/* Receive Card */}
        <button onClick={() => onSelect('receive')} className="group relative flex flex-col items-center p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-red-500/50 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm hover:red-glow overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/50">
            <DownloadCloud className="w-8 h-8 text-red-400 relative z-10" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2 font-display">Receive a File</h2>
          <p className="text-slate-400 text-sm text-center italic">Enter a generated code to connect and accept incoming files.</p>
        </button>
      </motion.div>
    </div>;
}