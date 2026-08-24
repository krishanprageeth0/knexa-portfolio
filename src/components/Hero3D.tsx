import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import GridDivider from './GridDivider';

export const Hero3D: React.FC = () => {
  const [scrambledText, setScrambledText] = useState('Full-Stack Developer & Designer');

  // Text scramble effect simulation
  useEffect(() => {
    const phrases = [
      'Full-Stack Developer & Graphic Designer',
      'Founder & CTO, Knexa System',
      'Smart Systems. Creative Solutions.',
    ];
    let partIndex = 0;
    let timer: any;

    const scramble = (targetText: string) => {
      let currentIter = 0;
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+';
      
      const interval = setInterval(() => {
        const textVal = targetText
          .split('')
          .map((char, index) => {
            if (index < currentIter) return targetText[index];
            if (char === ' ') return ' ';
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join('');

        setScrambledText(textVal);

        currentIter += 1;
        if (currentIter >= targetText.length + 1) {
          clearInterval(interval);
        }
      }, 30);
    };

    const cycleText = () => {
      partIndex = (partIndex + 1) % phrases.length;
      scramble(phrases[partIndex]);
      timer = setTimeout(cycleText, 4500);
    };

    timer = setTimeout(cycleText, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Blueprint lines on landing page (Weichie style) */}
      <div className="absolute top-0 left-1/4 h-full w-[1px] bg-white/5 hidden md:block" />
      <div className="absolute top-0 right-1/4 h-full w-[1px] bg-white/5 hidden md:block" />
      
      {/* Hero Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Animated Category */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-3"
        >
          <span className="text-gold font-display font-bold tracking-[0.3em] text-xs uppercase bg-gold/10 border border-gold/20 px-4 py-1.5 rounded-full inline-block">
            CREATIVE TECHNOLOGY STUDIO
          </span>
        </motion.div>

        {/* Big Bold Headline */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
            className="text-5xl md:text-8xl font-display font-black text-white tracking-tighter"
          >
            KRISHAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-magenta text-glow-blue">PRAGEETH</span>
          </motion.h1>
        </div>

        {/* Animated Subtitle / Scrambler */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="h-8 md:h-10 mb-8"
        >
          <p className="text-silver-light font-display font-bold text-lg md:text-2xl tracking-wide max-w-2xl mx-auto uppercase">
            {scrambledText}
          </p>
        </motion.div>

        {/* Dynamic self-drawing visual accent line */}
        <div className="max-w-xs mx-auto mb-8">
          <GridDivider direction="horizontal" delay={0.8} />
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-gray-400 text-sm md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-light"
        >
          &ldquo;I design brands, digital experiences, and visual stories that connect.&rdquo;
        </motion.p>

        {/* CTA Buttons - Wrapped in Magnetic physics */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Magnetic range={40} strength={0.4}>
            <a
              href="#portfolio"
              className="w-48 text-center block py-4 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-widest shadow-lg hover:bg-silver transition-colors"
            >
              View Portfolio
            </a>
          </Magnetic>
          
          <Magnetic range={40} strength={0.4}>
            <a
              href="https://wa.me/94767781717"
              target="_blank"
              rel="noopener noreferrer"
              className="w-48 text-center block py-4 rounded-full border border-white/20 bg-dark-900/40 backdrop-blur-sm text-white hover:border-electric/50 font-extrabold text-xs uppercase tracking-widest transition-all text-glow-blue"
            >
              Get a Quote
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Mouse scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <span className="text-[9px] text-gray-500 tracking-[0.4em] uppercase mb-2 font-bold select-none">SCROLL TO DISCOVER</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[22px] h-[36px] rounded-full border border-white/25 flex items-start justify-center p-1"
        >
          <div className="w-1.5 h-2.5 bg-electric rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};
export default Hero3D;
