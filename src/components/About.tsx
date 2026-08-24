import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import GridDivider from './GridDivider';

// Cinematic Split-Text Reveal Component
const AnimatedHeading: React.FC<{ subtitle: string; titlePart1: string; titlePart2: string }> = ({ subtitle, titlePart1, titlePart2 }) => {
  return (
    <div className="text-center md:text-left mb-16 overflow-hidden">
      <motion.span
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-electric font-display font-bold tracking-[0.25em] text-xs uppercase block mb-2"
      >
        {subtitle}
      </motion.span>
      
      <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tighter flex flex-wrap justify-center md:justify-start gap-x-3">
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

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'experience'>('experience');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const profilePhotos = [
    '/assets/profile/profile1.jpg',
    '/assets/profile/profile2.jpg',
    '/assets/profile/profile3.jpg',
    '/assets/profile/profile4.jpg',
    '/assets/profile/profile5.jpg',
    '/assets/profile/profile6.jpg',
  ];

  const skillCategories = [
    { name: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma (UI/UX)'] },
    { name: 'Backend & Databases', skills: ['PHP', 'Node.js', 'MySQL', 'PostgreSQL', 'Prisma ORM'] },
    { name: 'Platforms & CMS', skills: ['WordPress', 'WooCommerce', 'SEO Optimization', 'Meta Ads Campaign'] },
  ];

  const education = [
    {
      degree: 'BSc (Hons) Software Engineering',
      institution: 'Saegis Campus',
      duration: '2022 – 2026 Expected',
      details: 'Focusing on database architecture, web technologies, UI frameworks, and distributed software environments.',
    },
    {
      degree: 'Diploma in Web Designing & Development',
      institution: 'Ideacade / SITC Campus',
      duration: '2026 Completed',
      details: 'Advanced paradigms in creative visual design, cross-platform layouts, and browser-rendering performance.',
    },
    {
      degree: 'G.C.E. Advanced Level',
      institution: 'Royal College, Colombo 07',
      duration: '2017 – 2019',
      details: 'Mathematics stream. Maintained active involvement in student computer clubs.',
    },
  ];

  const experience = [
    {
      role: 'Founder / CTO',
      company: 'Knexa System',
      duration: 'Present',
      details: 'Leading technical architectures, brand designs, and full-funnel digital customer conversion campaigns.',
    },
    {
      role: 'Senior IT & Finance Coordinator',
      company: 'Solution Associates (Pvt) Ltd',
      duration: 'Previous',
      details: 'Coordinated corporate IT systems, database servers, client routing channels, and finance tracking metrics.',
    },
    {
      role: 'WordPress Developer & SEO Specialist',
      company: 'DG Enterprises',
      duration: 'Previous',
      details: 'Bespoke WooCommerce setups, custom PHP template programming, and structured schema SEO campaigns.',
    },
    {
      role: 'Software Developer Intern',
      company: 'Fuchsius (Private) Limited',
      duration: 'Previous',
      details: 'Built custom client CRM dashboard elements using PHP, MySQL databases, and Javascript endpoints.',
    },
  ];

  const nextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % profilePhotos.length);
  };

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-transparent">
      {/* Editorial layout thin border lines (Weichie style) */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5" />
      <div className="absolute top-0 left-[8%] h-full w-[1px] bg-white/5 hidden xl:block" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <AnimatedHeading subtitle="WHO I AM" titlePart1="ABOUT" titlePart2="ME" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Text & Skills */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Bio Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
              className="glass-panel p-10 rounded-3xl relative overflow-hidden group border border-white/5"
            >
              {/* Highlight Neon Border line */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-electric to-gold" />
              
              <h3 className="font-display font-black text-3xl text-white mb-6 uppercase tracking-tight">
                Krishan Prageeth
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6 font-light text-sm md:text-base">
                I am a Software Engineering undergraduate at Saegis Campus and the Founder/CTO of **Knexa System** — a Sri Lankan software agency. I have a strong track record in full-stack web development, corporate IT systems, and digital brand development.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8 font-light text-sm md:text-base">
                My passion is bridging the gap between advanced software engineering and creative digital design. By writing scalable code and crafting beautiful visuals, I build products that provide immediate value to businesses.
              </p>
              
              {/* Motto Banner */}
              <div className="border border-white/5 rounded-2xl p-6 bg-dark-950/50 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] text-gold font-display font-bold uppercase tracking-widest block mb-1">Company Motto</span>
                  <span className="text-xl font-display font-black text-white text-glow-gold italic">
                    &ldquo;Smart Systems. Creative Solutions.&rdquo;
                  </span>
                </div>
                <div className="text-[10px] font-bold text-electric uppercase tracking-widest bg-electric/10 border border-electric/25 px-3.5 py-1.5 rounded-full w-max h-max">
                  CTO / Founder
                </div>
              </div>
            </motion.div>

            {/* Skills Panel */}
            <div className="flex flex-col gap-6">
              <h4 className="font-display font-black text-xl text-white uppercase tracking-wider flex items-center gap-3">
                <span className="w-3 h-[1px] bg-electric" /> Technical Core Matrix
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skillCategories.map((category, catIdx) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: catIdx * 0.1 }}
                    className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-electric/20 transition-colors"
                  >
                    <span className="text-[10px] text-gold font-display font-black uppercase tracking-widest block mb-4 border-b border-white/5 pb-2">
                      {category.name}
                    </span>
                    <ul className="flex flex-col gap-3">
                      {category.skills.map((skill) => (
                        <li key={skill} className="flex items-center gap-2.5 text-xs text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-electric shrink-0" />
                          <span className="font-medium">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Photo Showcase & Timeline */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            {/* Interactive Portrait Rotator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <div
                onClick={nextPhoto}
                className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/5 group cursor-pointer"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePhotoIndex}
                    src={profilePhotos[activePhotoIndex]}
                    alt={`Krishan portrait ${activePhotoIndex + 1}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover object-top"
                  />
                </AnimatePresence>
                
                {/* Photo slide indicator */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 text-[10px] font-bold text-white tracking-widest">
                  {activePhotoIndex + 1} / {profilePhotos.length}
                </div>
                
                {/* Slide Hint */}
                <div className="absolute inset-0 bg-electric/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="px-5 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl shadow-2xl">
                    Next Image
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-gray-500 mt-3 font-semibold uppercase tracking-widest">
                Click image to cycle portraits (graduations, corporate assets)
              </span>
            </motion.div>

            {/* Timeline Dashboard */}
            <div className="w-full">
              {/* Tab Toggles */}
              <div className="flex bg-dark-900/60 p-1 rounded-full border border-white/5 mb-8 backdrop-blur-md">
                <button
                  onClick={() => setActiveTab('experience')}
                  className={`flex-1 py-3 rounded-full font-display font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === 'experience'
                      ? 'bg-electric text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" /> Experience
                </button>
                <button
                  onClick={() => setActiveTab('education')}
                  className={`flex-1 py-3 rounded-full font-display font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === 'education'
                      ? 'bg-electric text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" /> Education
                </button>
              </div>

              {/* Timeline list with self-drawing divider */}
              <div className="relative pl-8">
                <GridDivider direction="vertical" className="absolute left-[-0.5px] top-2 bottom-2" />

                <AnimatePresence mode="wait">
                  {activeTab === 'experience'
                    ? experience.map((item, idx) => (
                        <motion.div
                          key={item.role + idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.4, delay: idx * 0.08 }}
                          className="mb-8 last:mb-0 relative"
                        >
                          {/* Pulsing indicator node */}
                          <div className="absolute left-[-39.5px] top-1.5 w-6 h-6 rounded-full border border-electric bg-dark-950 flex items-center justify-center shadow-lg shadow-electric/20">
                            <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
                          </div>
                          
                          <span className="text-[10px] font-bold text-gold font-display uppercase tracking-widest block">
                            {item.duration}
                          </span>
                          <h5 className="font-display font-black text-lg text-white mt-1 uppercase tracking-tight">
                            {item.role}
                          </h5>
                          <span className="text-xs font-bold text-silver-dark block mb-3 uppercase tracking-wide">
                            {item.company}
                          </span>
                          <p className="text-xs text-gray-400 leading-relaxed font-light">
                            {item.details}
                          </p>
                        </motion.div>
                      ))
                    : education.map((item, idx) => (
                        <motion.div
                          key={item.degree + idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.4, delay: idx * 0.08 }}
                          className="mb-8 last:mb-0 relative"
                        >
                          {/* Pulsing indicator node */}
                          <div className="absolute left-[-39.5px] top-1.5 w-6 h-6 rounded-full border border-gold bg-dark-950 flex items-center justify-center shadow-lg shadow-gold/20">
                            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                          </div>
                          
                          <span className="text-[10px] font-bold text-gold font-display uppercase tracking-widest block">
                            {item.duration}
                          </span>
                          <h5 className="font-display font-black text-lg text-white mt-1 uppercase tracking-tight">
                            {item.degree}
                          </h5>
                          <span className="text-xs font-bold text-silver-dark block mb-3 uppercase tracking-wide">
                            {item.institution}
                          </span>
                          <p className="text-xs text-gray-400 leading-relaxed font-light">
                            {item.details}
                          </p>
                        </motion.div>
                      ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
