import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Palette, Film, TrendingUp, Layers, Check, ShieldCheck, Zap } from 'lucide-react';
import GridDivider from './GridDivider';
import Magnetic from './Magnetic';

// Reusable 3D Tilt Card with Glowing Cursor Border
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max rotation 12 degrees
    const rX = -(mouseY / (height / 2)) * 12;
    const rY = (mouseX / (width / 2)) * 12;
    setTilt({ x: rX, y: rY });

    // Track mouse coordinates for neon glow border
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card-container ${className} cursor-pointer`}
      style={{ perspective: 1200 }}
    >
      <div
        className="tilt-card glass-panel p-8 rounded-2xl w-full h-full border border-white/5 bg-dark-900/60 relative overflow-hidden group glass-panel-hover"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow spotlight ring */}
        <div
          className="absolute w-[200px] h-[200px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 bg-radial-glow"
          style={{
            left: `${glowPos.x}px`,
            top: `${glowPos.y}px`,
            background: 'radial-gradient(circle, rgba(0,82,255,0.15) 0%, rgba(0,82,255,0) 70%)',
          }}
        />

        <div className="tilt-card-content relative z-10" style={{ transform: 'translateZ(40px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

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

export const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'web' | 'graphics' | 'video' | 'growth'>('web');

  const categories = [
    { id: 'web', name: 'Web Development', icon: Globe },
    { id: 'graphics', name: 'Graphic Design', icon: Palette },
    { id: 'video', name: 'Video Editing', icon: Film },
    { id: 'growth', name: 'Growth Packages', icon: TrendingUp },
  ];

  const webServices = [
    { name: 'Landing Page', price: 'Rs. 29,000', desc: 'Single-page scroll site with custom layout, fast loading, and social media integration.', features: ['Responsive Design', '1 Year Free consultation', 'SEO Friendly Layout', 'WhatsApp Integration'] },
    { name: 'Portfolio Website', price: 'Rs. 29,000', desc: 'Personal bio, skill highlights, and filterable projects gallery matching your aesthetic.', features: ['Interactive Sections', 'CV Download Option', 'Contact Form Integration', 'SSL Security Guidance'] },
    { name: 'Business (up to 5 pages)', price: 'Rs. 38,000', desc: 'Full business site showing services, teams, about, and dynamic contact features.', features: ['Up to 5 Pages', 'Google Maps Config', 'Custom Business Email', 'CMS Setup (WordPress/Next)'] },
    { name: 'Standard Business Website', price: 'Rs. 45,000', desc: 'Advanced CMS workspace for blogging, case-studies, and comprehensive client resources.', features: ['Unlimited Blogs/Pages', 'Speed Optimization', 'Admin Dashboard Panel', 'Basic Analytics Setup'] },
    { name: 'Tourism (with booking)', price: 'Rs. 45,000', desc: 'Custom holiday, tour, and rental vehicle booking configurations for agency growth.', features: ['Interactive Tour Filters', 'Booking/Enquiry Panel', 'Vehicle Fleet Showcase', 'Currency Swapper'] },
    { name: 'LMS (Learning Platform)', price: 'Rs. 68,000', desc: 'Full course workspace with enrollment portals, quiz modules, and instructor workflows.', features: ['Student Dashboard', 'Course/Video Hosting', 'Certificate Generation', 'Secure Login Portal'] },
    { name: 'E-commerce (with gateway)', price: 'Rs. 75,000', desc: 'Advanced shopping store with product catalog, cart flows, and regional banking gateway API.', features: ['Cart & Checkout Flows', 'Payment Gateway Integration', 'Inventory Tracking System', 'Discount Coupon Engine'] },
  ];

  const videoEditing = [
    { duration: 'Up to 15 sec', price: 'Rs. 2,000', desc: 'Perfect for TikTok, IG Reels, YouTube Shorts or short promotional banners.', features: ['Standard Cuts', 'Subtitles / Captions', 'Royalty-Free Audio', 'Full HD Output'] },
    { duration: 'Up to 30 sec', price: 'Rs. 3,000', desc: 'Great for Facebook/Meta video advertisements or quick product reveals.', features: ['Dynamic Editing', 'Motion Title Cards', 'Color Grading', 'Sound Effects'] },
    { duration: 'Up to 60 sec (1 min)', price: 'Rs. 5,000', desc: 'Engaging content for corporate bios, customer stories, or detailed services.', features: ['Custom Animation Highlights', 'Logo Reveal Outro', 'Premium Audio Sync', 'Revision Sessions'] },
    { duration: 'Up to 90 sec', price: 'Rs. 7,000', desc: 'Explanatory features, website walkthroughs, or YouTube guides.', features: ['Screen Records Sync', 'Sound Design Layers', 'Text Highlight Popups', 'Multi-Platform Formats'] },
    { duration: 'Up to 120 sec (2 min)', price: 'Rs. 9,000', desc: 'High-end brand promo, wedding cinematic trailers, or training modules.', features: ['Cinematic Color Grading', 'Motion Graphics Overlay', 'Full Sound Design Suite', 'Source Files Delivery'] },
    { duration: 'Above 2 min', price: 'Custom Quote', desc: 'Documentaries, educational series, corporate events or high-tier cinematic edits.', features: ['Storyboard Assistance', 'Custom Transitions', 'Multi-Cam Editing', 'Dedicated Support'] },
  ];

  const growthPackages = [
    {
      name: 'Starter Launch Plan',
      price: 'Rs. 18,000',
      period: '/ month',
      saving: 'Save Rs. 1,000 (Valued at Rs. 19,000)',
      features: [
        '16 Posts (4 FB Carousels/Banners per week)',
        '2 Standard Video Reels (Subtitles & Music)',
        'Social Media Setup (FB, IG, TikTok)',
        '1 Meta Ad Campaign Setup (Setup only)',
        'Monthly Performance Update',
      ],
      hot: false,
    },
    {
      name: 'Pro Growth & AI Power',
      price: 'Rs. 26,500',
      period: '/ month',
      saving: 'Save Rs. 2,500 (Valued at Rs. 29,000)',
      features: [
        '16 Posts (4 Carousels/Banners per week)',
        '2 Standard Video Reels (Subtitles & Music)',
        '2 AI Promo Videos (AI Script, Visuals & Voice)',
        'Social Media Management & Moderation',
        '3 Meta Ad Campaign Setups (3 ad sets)',
        'Bi-weekly Performance Updates',
      ],
      hot: true,
    },
    {
      name: 'Elite Growth & Full Funnel',
      price: 'Rs. 42,000',
      period: '/ month',
      saving: 'Save Rs. 6,000 (Valued at Rs. 48,000)',
      features: [
        '24 Posts (6 Carousels/Banners per week)',
        '4 Premium Video Reels (Subtitles, Motion Graphics)',
        '4 AI Promo Videos (AI Script & Voiceovers)',
        'Full Social Media & Community Moderation',
        '5 Meta Ad Campaigns (Setup + Ongoing optimization)',
        'Monthly Strategy Call + PDF Performance Report',
      ],
      hot: false,
    },
  ];

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-transparent">
      <div id="pricing" className="absolute top-0" />
      {/* Editorial horizontal layout line */}
      <GridDivider direction="horizontal" className="absolute top-0 left-0 w-full" />
      <div className="absolute top-0 right-[8%] h-full w-[1px] bg-white/5 hidden xl:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <AnimatedHeading subtitle="SOLUTIONS FOR GROWTH" titlePart1="SERVICES &" titlePart2="PRICING" />

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-20 max-w-3xl mx-auto p-1.5 bg-dark-900/60 rounded-full border border-white/5 backdrop-blur-md">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <Magnetic key={cat.id} range={20} strength={0.3}>
                <button
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`flex-1 py-3 px-6 rounded-full font-display font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 min-w-[150px] ${
                    isActive
                      ? 'bg-gradient-to-r from-electric to-electric-light text-white shadow-lg shadow-electric/25'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </button>
              </Magnetic>
            );
          })}
        </div>

        {/* Pricing Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {/* 1. Website Development */}
            {activeCategory === 'web' && (
              <motion.div
                key="web"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {webServices.map((service, idx) => (
                  <TiltCard key={service.name + idx} className="h-full">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <span className="text-[9px] text-electric font-display font-black tracking-widest uppercase block mb-1">
                          WEB ARCHITECTURE
                        </span>
                        <h3 className="font-display font-black text-xl text-white mb-3 uppercase tracking-tight">
                          {service.name}
                        </h3>
                        <p className="text-gray-400 text-xs font-light leading-relaxed mb-8">
                          {service.desc}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-baseline mb-6 border-t border-white/5 pt-4">
                          <span className="text-2xl font-display font-black text-white">{service.price}</span>
                          <span className="text-[10px] text-gray-500 font-semibold uppercase ml-1.5">starting price</span>
                        </div>
                        <ul className="flex flex-col gap-3">
                          {service.features.map((feat) => (
                            <li key={feat} className="flex items-center gap-2.5 text-xs text-gray-300">
                              <Check className="w-4 h-4 text-gold shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TiltCard>
                ))}
                
                {/* Special Guarantee Card */}
                <div className="tilt-card-container border-2 border-dashed border-electric/20 rounded-2xl p-8 flex flex-col justify-center items-center text-center bg-electric/5 backdrop-blur-sm">
                  <ShieldCheck className="w-12 h-12 text-electric mb-4" />
                  <h4 className="font-display font-black text-lg text-white mb-2 uppercase tracking-tight">Included Guarantee</h4>
                  <p className="text-xs text-gray-400 max-w-xs leading-relaxed mb-6 font-light">
                    Free consultation, 1-year SSL certificate setup, and custom domain configuration guidance.
                  </p>
                  <span className="text-[10px] font-display font-black text-gold uppercase tracking-wider bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full">
                    Premium standard
                  </span>
                </div>
              </motion.div>
            )}

            {/* 2. Graphic Design */}
            {activeCategory === 'graphics' && (
              <motion.div
                key="graphics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* FB Post Pricing Card */}
                <div className="lg:col-span-7">
                  <TiltCard>
                    <h3 className="font-display font-black text-2xl text-white mb-3 uppercase tracking-tight">
                      Facebook Post Design
                    </h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-8">
                      Bespoke social media ad creatives, carousels, and announcements custom designed to expand reach.
                    </p>
                    <div className="overflow-x-auto border-t border-white/5 pt-4">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="text-gold font-display font-bold border-b border-white/10 pb-2.5">
                            <th className="py-2">Quantity</th>
                            <th className="py-2">Rate (per post)</th>
                            <th className="py-2 text-right">Total Investment</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300 font-light">
                          <tr><td className="py-2.5">1 Post</td><td className="py-2.5">Rs. 1,300</td><td className="py-2.5 text-right font-bold text-white">Rs. 1,300</td></tr>
                          <tr><td className="py-2.5">2 Posts</td><td className="py-2.5">Rs. 1,200</td><td className="py-2.5 text-right font-bold text-white">Rs. 2,400</td></tr>
                          <tr><td className="py-2.5">3 Posts</td><td className="py-2.5">Rs. 1,100</td><td className="py-2.5 text-right font-bold text-white">Rs. 3,300</td></tr>
                          <tr><td className="py-2.5">4 Posts</td><td className="py-2.5">Rs. 1,000</td><td className="py-2.5 text-right font-bold text-white">Rs. 4,000</td></tr>
                          <tr className="text-electric font-semibold"><td className="py-2.5">5+ Posts</td><td className="py-2.5">Rs. 900</td><td className="py-2.5 text-right font-bold">Rs. 4,500+</td></tr>
                          <tr className="text-electric font-semibold"><td className="py-2.5">10+ Posts</td><td className="py-2.5">Rs. 850</td><td className="py-2.5 text-right font-bold">Rs. 8,500+</td></tr>
                          <tr className="text-electric font-semibold"><td className="py-2.5">15+ Posts</td><td className="py-2.5">Rs. 800</td><td className="py-2.5 text-right font-bold">Rs. 12,000+</td></tr>
                          <tr className="text-electric font-semibold"><td className="py-2.5">20+ Posts</td><td className="py-2.5">Rs. 750</td><td className="py-2.5 text-right font-bold">Rs. 15,000+</td></tr>
                          <tr className="text-electric font-semibold"><td className="py-2.5">25+ Posts</td><td className="py-2.5">Rs. 720</td><td className="py-2.5 text-right font-bold">Rs. 18,000+</td></tr>
                          <tr className="text-electric font-semibold"><td className="py-2.5">30+ Posts</td><td className="py-2.5">Rs. 700</td><td className="py-2.5 text-right font-bold">Rs. 21,000+</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </TiltCard>
                </div>

                {/* FB Cover Pricing Card */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <TiltCard>
                    <h3 className="font-display font-black text-xl text-white mb-3 uppercase tracking-tight">
                      Facebook Cover Page
                    </h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-8">
                      Make a striking first impression with premium custom corporate and business cover art.
                    </p>
                    <div className="overflow-x-auto border-t border-white/5 pt-4">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="text-gold font-display font-bold border-b border-white/10 pb-2.5">
                            <th className="py-2">Quantity</th>
                            <th className="py-2">Rate</th>
                            <th className="py-2 text-right">Total Price</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300 font-light">
                          <tr><td className="py-2.5">1 Cover</td><td className="py-2.5">Rs. 1,300</td><td className="py-2.5 text-right font-bold text-white">Rs. 1,300</td></tr>
                          <tr><td className="py-2.5">2 Covers</td><td className="py-2.5">Rs. 1,200</td><td className="py-2.5 text-right font-bold text-white">Rs. 2,400</td></tr>
                          <tr><td className="py-2.5">3 Covers</td><td className="py-2.5">Rs. 1,100</td><td className="py-2.5 text-right font-bold text-white">Rs. 3,300</td></tr>
                          <tr><td className="py-2.5">4 Covers</td><td className="py-2.5">Rs. 1,000</td><td className="py-2.5 text-right font-bold text-white">Rs. 4,000</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </TiltCard>

                  {/* Add-on Note card */}
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-dark-900/20 text-center flex flex-col items-center justify-center">
                    <Layers className="w-6 h-6 text-gold mb-2" />
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                      Sinhal, English, & Tamil designs supported
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. Video Editing */}
            {activeCategory === 'video' && (
              <motion.div
                key="video"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {videoEditing.map((tier, idx) => (
                  <TiltCard key={tier.duration + idx}>
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <span className="text-[9px] text-gold font-display font-black tracking-widest uppercase block mb-1">
                          EDITING PRODUCTION
                        </span>
                        <h3 className="font-display font-black text-xl text-white mb-3 uppercase tracking-tight">
                          {tier.duration}
                        </h3>
                        <p className="text-gray-400 text-xs font-light leading-relaxed mb-8">
                          {tier.desc}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-baseline mb-6 border-t border-white/5 pt-4">
                          <span className="text-2xl font-display font-black text-white">{tier.price}</span>
                        </div>
                        <ul className="flex flex-col gap-3">
                          {tier.features.map((feat) => (
                            <li key={feat} className="flex items-center gap-2.5 text-xs text-gray-300">
                              <Check className="w-4 h-4 text-electric shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </motion.div>
            )}

            {/* 4. Growth Packages */}
            {activeCategory === 'growth' && (
              <motion.div
                key="growth"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
              >
                {growthPackages.map((pkg, idx) => (
                  <div
                    key={pkg.name + idx}
                    className={`relative rounded-3xl overflow-hidden flex flex-col justify-between border ${
                      pkg.hot
                        ? 'border-electric bg-dark-900/80 shadow-2xl shadow-electric/15'
                        : 'border-white/5 bg-dark-900/40'
                    }`}
                  >
                    {/* Hot Badge */}
                    {pkg.hot && (
                      <div className="absolute top-0 right-0 bg-electric text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-bl-2xl flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 fill-white" /> Popular Choice
                      </div>
                    )}

                    <div className="p-8">
                      <span className="text-[9px] text-gold font-display font-bold uppercase tracking-widest block mb-1">
                        MONTHLY SUBSCRIPTION
                      </span>
                      <h3 className="font-display font-black text-2xl text-white mb-2 uppercase tracking-tight">
                        {pkg.name}
                      </h3>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-display font-black text-white">{pkg.price}</span>
                        <span className="text-xs text-gray-500 font-bold tracking-wider ml-1 uppercase">{pkg.period}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold block mb-8 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-max uppercase tracking-wider">
                        {pkg.saving}
                      </span>
                      
                      <ul className="flex flex-col gap-4 border-t border-white/5 pt-6">
                        {pkg.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5 text-xs text-gray-300">
                            <Check className="w-4 h-4 text-electric shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-8 bg-black/20 border-t border-white/5">
                      <Magnetic range={30} strength={0.3}>
                        <a
                          href={`https://wa.me/94767781717?text=Hi%20Krishan,%20I%20am%20interested%20in%20your%20${encodeURIComponent(pkg.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-48 text-center block py-4 rounded-full font-display font-black text-xs uppercase tracking-widest transition-all ${
                            pkg.hot
                              ? 'bg-gradient-to-r from-electric to-electric-light text-white shadow-lg shadow-electric/25 hover:shadow-electric/40'
                              : 'bg-white/5 hover:bg-white/10 text-white'
                          }`}
                        >
                          Subscribe Plan
                        </a>
                      </Magnetic>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footnote */}
        <div id="pricing-footnote" className="mt-20 text-center text-[10px] text-gray-500 max-w-xl mx-auto leading-relaxed font-semibold uppercase tracking-widest">
          * Website packages show base starting prices. Final quotes depend on feature requirements, layouts, and API integrations. All prices are in LKR.
        </div>
      </div>
    </section>
  );
};
export default Services;
