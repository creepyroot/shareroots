import React, { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import Home from './screens/Home';
import Sender from './screens/Sender';
import Receiver from './screens/Receiver';
import Intro from './components/Intro';
import Guide from './screens/Guide';
import { useTransfer } from './hooks/useTransfer';
export default function App() {
  const [view, setView] = useState('home');
  const [recvCode, setRecvCode] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const transferManager = useTransfer();

  // Check for deep link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('recv');
    if (code) {
      setRecvCode(code);
      setView('receive');
      setShowIntro(false); // Skip intro if deep linked
      // Clear URL to prevent refresh loops
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
  return <>
      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
      <main className="relative min-h-screen font-sans selection:bg-red-500/30 selection:text-red-200 text-slate-100 flex flex-col">
        <CosmicBackground />
        
        {/* Navbar Minimal */}
        <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 hover:cursor-pointer">
           <div className="flex items-center gap-2" onClick={() => setView('home')} role="button">
              <span className="font-display font-bold tracking-widest text-white flex items-center gap-1 text-xl">SHARE<span className="text-red-400">ROOTS</span></span>
           </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-center items-center w-full z-10 px-4">
          {view === 'home' && <Home onSelect={setView} />}
          {view === 'send' && <Sender onBack={() => setView('home')} transferManager={transferManager} />}
          {view === 'receive' && <Receiver onBack={() => setView('home')} transferManager={transferManager} initialCode={recvCode} />}
          {view === 'guide' && <Guide onBack={() => setView('home')} />}
        </div>
        
        {/* Footer minimal */}
        <footer className="py-6 flex flex-col items-center gap-1 text-center font-mono z-10 sticky top-[100vh]">
           <p className="text-[10px] text-slate-600 mt-2 italic max-w-sm">Made by GURNOOR WITH LOVE FOR PEOPLE WITH HUGE FILES TO TRANSFER ACROSS LONG LONG DISTANCE</p>
        </footer>
      </main>
    </>;
}