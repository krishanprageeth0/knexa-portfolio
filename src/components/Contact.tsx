import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Download, Send, CheckCircle, Linkedin, Github, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import GridDivider from './GridDivider';
import Magnetic from './Magnetic';

// Cinematic Split-Text Reveal Component
const AnimatedHeading: React.FC<{ subtitle: string; titlePart1: string; titlePart2: string }> = ({ subtitle, titlePart1, titlePart2 }) => {
  return (
    <div className="text-center mb-16 overflow-hidden">
      <motion.span
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-electric font-display font-bold tracking-[0.25em] text-xs uppercase block mb-2"
      >
        {subtitle}
      </motion.span>
      
      <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tighter flex flex-wrap justify-center gap-x-3">
        {titlePart1.split(' ').map((word, idx) => (
          <span key={idx} className="overflow-hidden inline-block">
            <motion.span
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: idx * 0.05 }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-gold text-glow-blue flex gap-x-3">
          {titlePart2.split(' ').map((word, idx) => (
            <span key={idx} className="overflow-hidden inline-block">
              <motion.span
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: (idx + titlePart1.split(' ').length) * 0.05 }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      </h2>
    </div>
  );
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#087f8c', '#f37021', '#d61a7a'],
    });
  };

  const handleDownloadCV = () => {
    triggerConfetti();
  };

  const handleDownloadPortfolio = () => {
    triggerConfetti();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      triggerConfetti();
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-transparent">
      {/* Blueprint horizontal lines (Weichie style) */}
      <GridDivider direction="horizontal" className="absolute top-0 left-0 w-full" />
      <div className="absolute top-0 left-[8%] h-full w-[1px] bg-white/5 hidden xl:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <AnimatedHeading subtitle="LET'S WORK TOGETHER" titlePart1="GET IN" titlePart2="TOUCH" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          {/* Left Column: Info & Downloads */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col gap-8 border border-white/5"
            >
              <div className="border-b border-white/5 pb-5 flex items-center gap-4">
                <img src="/assets/logo.png" alt="Knexa System" className="h-12 w-12 object-contain rounded-full shadow-md" />
                <div>
                  <span className="font-display font-black text-xl text-white tracking-wide block uppercase">
                    KNEXA SYSTEM
                  </span>
                  <span className="text-[9px] text-gold font-display font-bold uppercase tracking-widest block mt-1">
                    Smart Systems. Creative Solutions.
                  </span>
                </div>
              </div>

              {/* Direct Info */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-5 text-gray-300">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-electric">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block">Location</span>
                    <span className="text-sm font-bold text-white uppercase mt-0.5">Kottawa, Sri Lanka</span>
                  </div>
                </div>

                <div className="flex items-center gap-5 text-gray-300">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-electric">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block">Phone / WhatsApp</span>
                    <a href="tel:+94767781717" className="text-sm font-bold text-white hover:text-electric transition-colors uppercase mt-0.5 block">
                      +94 76 778 1717
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-5 text-gray-300">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-electric">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block">Email Address</span>
                    <a href="mailto:Krishanprageeth87@gmail.com" className="text-sm font-bold text-white hover:text-electric transition-colors mt-0.5 block">
                      Krishanprageeth87@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex gap-4 mt-4 border-t border-white/5 pt-8">
                {[
                  { icon: Linkedin, url: 'https://linkedin.com/in/krishanprageeth', label: 'LinkedIn' },
                  { icon: Github, url: 'https://github.com/krishanprageeth', label: 'GitHub' },
                  { icon: Compass, url: 'https://figma.com/@krishanprageeth', label: 'Figma' },
                ].map((soc) => {
                  const Icon = soc.icon;
                  return (
                    <Magnetic key={soc.label} range={20} strength={0.3}>
                      <a
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-electric/50 text-gray-400 hover:text-electric flex items-center justify-center transition-all duration-300"
                        aria-label={soc.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    </Magnetic>
                  );
                })}
              </div>
            </motion.div>

            {/* Asset Downloads - Magnetic */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Magnetic range={30} strength={0.25}>
                <a
                  href="/Krishan_Prageeth_Resume.pdf"
                  download="Krishan_Prageeth_Resume.pdf"
                  onClick={handleDownloadCV}
                  className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-electric/30 flex flex-col justify-between gap-6 group transition-all cursor-pointer text-left block w-full"
                >
                  <div className="w-12 h-12 rounded-2xl bg-electric/10 flex items-center justify-center text-electric group-hover:scale-105 transition-transform duration-300">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm text-white uppercase tracking-tight group-hover:text-electric transition-colors">
                      Download CV
                    </h4>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1 block">
                      PDF format • 223 KB
                    </span>
                  </div>
                </a>
              </Magnetic>

              <Magnetic range={30} strength={0.25}>
                <a
                  href="/Portfolio.pdf"
                  download="Krishan_Prageeth_Portfolio.pdf"
                  onClick={handleDownloadPortfolio}
                  className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-gold/30 flex flex-col justify-between gap-6 group transition-all cursor-pointer text-left block w-full"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:scale-105 transition-transform duration-300">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm text-white uppercase tracking-tight group-hover:text-gold transition-colors">
                      Download Portfolio
                    </h4>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1 block">
                      Design PDF • 21.8 MB
                    </span>
                  </div>
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 bg-dark-900/40 h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight mb-2">
                  Send a Direct Inquiry
                </h3>
                <p className="text-xs text-gray-400 font-light mb-8">
                  Fill out the template below. We will analyze your specifications and reply in 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Krishan Prageeth"
                      className="w-full bg-dark-950/70 border border-white/10 rounded-xl px-5 py-4 text-xs text-white focus:border-electric/50 focus:outline-none transition-colors font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="example@gmail.com"
                      className="w-full bg-dark-950/70 border border-white/10 rounded-xl px-5 py-4 text-xs text-white focus:border-electric/50 focus:outline-none transition-colors font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                      Project Requirements
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="Briefly outline your goals (budget, pages, design layout details)..."
                      className="w-full bg-dark-950/70 border border-white/10 rounded-xl px-5 py-4 text-xs text-white focus:border-electric/50 focus:outline-none transition-colors resize-none font-medium"
                    />
                  </div>

                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      <span className="font-semibold uppercase tracking-wider text-[10px]">Enquiry submitted. We will contact you shortly.</span>
                    </motion.div>
                  )}

                  <div className="mt-4">
                    <Magnetic range={25} strength={0.25}>
                      <button
                        type="submit"
                        disabled={isSubmitting || isSubmitted}
                        className="w-56 py-4 rounded-full bg-gradient-to-r from-electric to-electric-light text-white font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-electric/20 hover:shadow-electric/35 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </Magnetic>
                  </div>
                </form>
              </div>

              <div className="mt-12 text-[9px] text-gray-500 font-bold uppercase tracking-widest text-center">
                © {new Date().getFullYear()} Knexa System. Sri Lanka.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
