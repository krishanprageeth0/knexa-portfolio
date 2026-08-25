import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import Magnetic from './Magnetic';
import { sfx } from '../utils/audio';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [muted, setMuted] = useState(sfx.getMuted());

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Planner', href: '#portfolio' },
    { name: 'Designs', href: '#gallery' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMute = () => {
    const newVal = sfx.setMuted(!muted);
    setMuted(newVal);
    sfx.playClick();
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'py-4 bg-[#020202]/85 backdrop-blur-xl border-b border-white/5 shadow-lg'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo - Magnetic */}
        <Magnetic range={30} strength={0.3}>
          <a
            href="#home"
            onClick={() => sfx.playClick()}
            onMouseEnter={() => sfx.playHover()}
            className="flex items-center gap-3 group cursor-pointer h-10"
          >
            <img src="/assets/logo.png" alt="Knexa System" className="h-full w-auto object-contain rounded-full shadow-md" />
            <div className="flex flex-col">
              <span className="font-display font-black text-base tracking-wider text-white leading-none">
                KNEXA
              </span>
              <span className="text-[9px] font-bold text-gold tracking-widest leading-none mt-1">
                SYSTEM
              </span>
            </div>
          </a>
        </Magnetic>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-dark-900/40 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Magnetic key={link.name} range={20} strength={0.4}>
                <a
                  href={link.href}
                  onClick={() => sfx.playClick()}
                  onMouseEnter={() => sfx.playHover()}
                  className={`relative px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-colors duration-300 block ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              </Magnetic>
            );
          })}
        </div>

        {/* Speaker Icon & Desktop CTA */}
        <div className="hidden md:flex items-center gap-6">
          <Magnetic range={20} strength={0.35}>
            <button
              onClick={handleToggleMute}
              onMouseEnter={() => sfx.playHover()}
              className="p-2.5 rounded-full border border-white/10 hover:border-white/25 text-gray-400 hover:text-white transition-all bg-dark-900/40 backdrop-blur-md"
              title={muted ? "Unmute sound effects" : "Mute sound effects"}
            >
              {muted ? <VolumeX className="w-4 h-4 text-magenta" /> : <Volume2 className="w-4 h-4 text-electric" />}
            </button>
          </Magnetic>

          <Magnetic range={30} strength={0.35}>
            <a
              href="https://wa.me/94767781717"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sfx.playClick()}
              onMouseEnter={() => sfx.playHover()}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-electric to-electric-light text-white font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-electric/25 hover:shadow-electric/40 block transition-all"
            >
              Get a Quote
            </a>
          </Magnetic>
        </div>

        {/* Mobile Menu Actions */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={handleToggleMute}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {muted ? <VolumeX className="w-5 h-5 text-magenta" /> : <Volume2 className="w-5 h-5 text-electric" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-900/90 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setIsOpen(false);
                      sfx.playClick();
                    }}
                    className={`text-sm font-bold uppercase tracking-widest block transition-colors ${
                      isActive ? 'text-electric' : 'text-gray-400'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
