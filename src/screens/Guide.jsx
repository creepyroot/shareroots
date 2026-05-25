import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, ShieldCheck, Zap, Heart } from 'lucide-react';
export default function Guide({
  onBack
}) {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} className="w-full max-w-2xl bg-slate-900/40 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 font-mono text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      <h2 className="text-3xl font-display font-bold text-white mb-6">User Guide</h2>
      
      <div className="space-y-6 text-slate-300">
        <div className="flex gap-4">
          <Zap className="text-red-400 w-6 h-6 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-white">Sending Files</h4>
            <p className="text-sm">Click 'SEND', drop your files, and share the 6-digit code with the receiver. Your files are encrypted instantly.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <BookOpen className="text-purple-400 w-6 h-6 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-white">Receiving</h4>
            <p className="text-sm">Enter the code provided by the sender. Once the connection is established, approve the download and your files will start streaming directly to your device.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <ShieldCheck className="text-emerald-400 w-6 h-6 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-white">Privacy</h4>
            <p className="text-sm">SHARE ROOTS uses high-grade end-to-end encryption. Data moves directly between devices; nothing is stored on our servers.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-800 text-center font-mono text-xs text-slate-500">
        <Heart className="inline w-4 h-4 text-red-500 mr-2" />
        Made by GURNOOR WITH LOVE FOR PEOPLE WITH HUGE FILES TO TRANSFER ACROSS LONG LONG DISTANCE.
      </div>
    </motion.div>;
}