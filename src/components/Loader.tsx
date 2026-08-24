import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    'INITIALIZING WEBGRID ENGINE...',
    'STAGING GRAPHIC MONOGRAM CORES...',
    'INJECTING BRAND SHADER SHELLS...',
    'COMPILING MATHEMATICAL WAVE VECTORS...',
    'ESTABLISHING WHATSAPP TUNNELS...',
    'KNEXA SYSTEM COMPILED SUCCESSFULLY.'
  ];

  useEffect(() => {
    // Smooth progress counter increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Small buffer before fade out
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Tick terminal logs based on progress percentage
    const step = 100 / logs.length;
    const currentLog = Math.min(Math.floor(progress / step), logs.length - 1);
    setLogIndex(currentLog);
  }, [progress, logs.length]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100vh' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[999] bg-[#020202] flex flex-col items-center justify-center font-mono select-none"
    >
      {/* Blueprint Grid Dots */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="flex flex-col items-center max-w-sm w-full px-6 relative z-10">
        {/* Pulsing Monogram Logo */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8"
        >
          <img src="/assets/logo.png" alt="Knexa Logo" className="w-16 h-16 rounded-full object-contain shadow-lg shadow-electric/15" />
        </motion.div>

        {/* Brand Name */}
        <h2 className="font-display font-black text-sm tracking-[0.3em] text-white uppercase mb-1">
          KNEXA SYSTEM
        </h2>
        <span className="text-[9px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-10">
          Digital Architect
        </span>

        {/* Loading Progress Bar */}
        <div className="w-full bg-white/5 border border-white/10 h-1 rounded-full overflow-hidden mb-4 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-electric to-magenta rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Value */}
        <div className="w-full flex justify-between text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-6">
          <span>Booting System</span>
          <span className="text-electric">{progress}%</span>
        </div>

        {/* Terminal Compilation Logs */}
        <div className="h-6 w-full flex items-center justify-center text-center">
          <motion.span
            key={logIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-[9px] uppercase tracking-wider font-semibold ${
              progress === 100 ? 'text-emerald-400 font-bold' : 'text-gray-500'
            }`}
          >
            {logs[logIndex]}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};
export default Loader;
