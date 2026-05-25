import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
export default function Intro({
  onComplete
}) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    // Sequence timing
    const timers = [setTimeout(() => setStage(1), 500),
    // Show "GURNOOR PROJECTS"
    setTimeout(() => setStage(2), 2000),
    // Show "presents"
    setTimeout(() => setStage(3), 3500),
    // Fade all out
    setTimeout(() => {
      onComplete();
    }, 4500) // Unmount Intro and show App
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);
  return <AnimatePresence>
      {stage < 3 && <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden" initial={{
      opacity: 1
    }} exit={{
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)"
    }} transition={{
      duration: 1,
      ease: 'easeInOut'
    }}>
          {/* Animated Background Lights */}
          <motion.div animate={{
        opacity: [0.1, 0.3, 0.1]
      }} transition={{
        duration: 4,
        repeat: Infinity
      }} className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-red-900/40 blur-[120px] pointer-events-none" />
          <motion.div animate={{
        opacity: [0.1, 0.2, 0.1]
      }} transition={{
        duration: 3,
        repeat: Infinity,
        delay: 1
      }} className="absolute bottom-[10%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-red-900/40 blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <AnimatePresence>
              {stage >= 1 && <motion.h1 initial={{
            opacity: 0,
            y: 20,
            letterSpacing: "0.1em"
          }} animate={{
            opacity: 1,
            y: 0,
            letterSpacing: "0.2em"
          }} exit={{
            opacity: 0,
            y: -20
          }} transition={{
            duration: 1,
            ease: 'easeOut'
          }} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white uppercase text-center drop-shadow-2xl mb-6">
                  Gurnoor Projects
                </motion.h1>}
            </AnimatePresence>

            <AnimatePresence>
              {stage >= 2 && <motion.p initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -10
          }} transition={{
            duration: 0.8,
            ease: 'easeOut'
          }} className="text-xl md:text-2xl font-sans font-light tracking-[0.3em] text-red-400 italic">
                  presents
                </motion.p>}
            </AnimatePresence>
          </div>
        </motion.div>}
    </AnimatePresence>;
}