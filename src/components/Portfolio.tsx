import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Terminal, MessageSquare, RefreshCw, ExternalLink } from 'lucide-react';
import GridDivider from './GridDivider';
import Magnetic from './Magnetic';

interface PlatformOption {
  id: string;
  name: string;
  price: number;
  desc: string;
}

interface AddonOption {
  id: string;
  name: string;
  price: number;
  desc: string;
}

interface LiveSite {
  title: string;
  url: string;
}

// Cinematic Split-Text Reveal Component
const AnimatedHeading: React.FC<{ subtitle: string; titlePart1: string; titlePart2: string }> = ({ subtitle, titlePart1, titlePart2 }) => {
  return (
    <div className="text-center md:text-left overflow-hidden">
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
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-magenta text-glow-blue flex gap-x-3">
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

export const Portfolio: React.FC = () => {
  const [platform, setPlatform] = useState<string>('landing');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');

  const platforms: PlatformOption[] = [
    { id: 'landing', name: 'Landing Page', price: 29000, desc: 'Single-scroll promotional layouts built for quick campaigns.' },
    { id: 'business', name: 'Corporate Business', price: 38000, desc: 'Up to 5 standard pages describing corporate profiles and offerings.' },
    { id: 'tourism', name: 'Tourism booking', price: 45000, desc: 'Custom holiday booking filters, vehicles fleet, and reservation paths.' },
    { id: 'lms', name: 'LMS Academy Platform', price: 68000, desc: 'Student workflows, video catalogs, courses, and exam options.' },
    { id: 'ecommerce', name: 'E-commerce Store', price: 75000, desc: 'Digital store catalogs, cart systems, checkouts, and local bank APIs.' }
  ];

  const addons: AddonOption[] = [
    { id: 'seo', name: 'Premium SEO Package', price: 8000, desc: 'Structured schemas, speed optimization, and search rankings.' },
    { id: 'domain', name: 'Business Domain & Mail', price: 5000, desc: 'Custom domain mapping and professional GSuite/cPanel configuration.' },
    { id: 'logo', name: 'Corporate Logo Branding', price: 4000, desc: 'High-quality vector graphics and logo concepts for launch.' },
    { id: 'meta', name: 'Meta Ad Campaign Setup', price: 10000, desc: 'Facebook/Instagram campaign configuration to drive traffic.' }
  ];

  // Actual client websites
  const liveSites: LiveSite[] = [
    { title: 'Knexa Corporate Portal', url: 'https://knexa-nu.vercel.app/' },
    { title: 'Aether Travels Agency', url: 'https://krishanprageeth0.github.io/AETHER-TRAVELS/' },
    { title: 'Narthanika Academy LMS', url: 'https://krishanprageeth0.github.io/narthanika_web/' },
    { title: 'Rent-A-Car Tours Portal', url: 'https://rent-a-car-tourism.vercel.app/tours' },
    { title: 'Atelier Sens Design Studio', url: 'https://krishanprageeth0.github.io/ATELIER-SENS/' },
    { title: 'Knexa Demo Showcase', url: 'https://knexademo.vercel.app/' },
    { title: 'Knexa System Portfolio v1', url: 'https://krishanprageeth0.github.io/portfolioknexa/' }
  ];

  const basePrice = useMemo(() => {
    return platforms.find((p) => p.id === platform)?.price || 0;
  }, [platform]);

  const addonsPrice = useMemo(() => {
    return selectedAddons.reduce((sum, id) => {
      const addon = addons.find((a) => a.id === id);
      return sum + (addon ? addon.price : 0);
    }, 0);
  }, [selectedAddons]);

  const speedPrice = useMemo(() => {
    return deliverySpeed === 'express' ? 15000 : 0;
  }, [deliverySpeed]);

  const totalEstimate = basePrice + addonsPrice + speedPrice;

  const handleToggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleGenerateWhatsAppLink = () => {
    const selectedPlat = platforms.find((p) => p.id === platform)?.name || '';
    const addonNames = selectedAddons
      .map((id) => addons.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');
    const speedMode = deliverySpeed === 'express' ? 'Express (under 5 days)' : 'Standard Delivery';

    const text = `Hi Krishan, I configured a custom project spec sheet on your site:
- **Project Type**: ${selectedPlat}
- **Add-Ons**: ${addonNames || 'None'}
- **Delivery Mode**: ${speedMode}
- **Estimated Investment**: Rs. ${totalEstimate.toLocaleString()}`;

    window.open(`https://wa.me/94767781717?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleReset = () => {
    setPlatform('landing');
    setSelectedAddons([]);
    setDeliverySpeed('standard');
  };

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden bg-transparent">
      {/* Editorial horizontal layout dividers (Weichie style) */}
      <GridDivider direction="horizontal" className="absolute top-0 left-0 w-full" />
      <div className="absolute top-0 left-[8%] h-full w-[1px] bg-white/5 hidden xl:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20">
          <AnimatedHeading subtitle="TAILOR YOUR SYSTEM" titlePart1="PROJECT SPECS" titlePart2="PLANNER" />
          
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-xs font-display font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all bg-dark-900/60 backdrop-blur-md"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Blueprint
          </button>
        </div>

        {/* Builder Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Questionnaire Options */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Step 1: Select Platform */}
            <div className="flex flex-col gap-5">
              <h3 className="font-display font-black text-lg text-white uppercase tracking-wider flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-electric" /> 1. Select Project platform
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platforms.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-40 ${
                      platform === p.id
                        ? 'border-electric bg-electric/[0.03] bg-[#0c0c0e] shadow-lg shadow-electric/5'
                        : 'border-white/10 bg-[#09090b]/95 hover:border-white/20'
                    }`}
                  >
                    {platform === p.id && (
                      <div className="absolute top-4 right-4 text-electric">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-display font-black text-sm text-white uppercase tracking-wide">
                        {p.name}
                      </h4>
                      <p className="text-xs text-gray-300 mt-2 font-normal leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                    <span className="text-sm font-display font-black text-white block mt-4">
                      Rs. {p.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Add-Ons */}
            <div className="flex flex-col gap-5">
              <h3 className="font-display font-black text-lg text-white uppercase tracking-wider flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-electric" /> 2. Configure Add-Ons
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addons.map((a) => {
                  const isSelected = selectedAddons.includes(a.id);
                  return (
                    <div
                      key={a.id}
                      onClick={() => handleToggleAddon(a.id)}
                      className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-40 ${
                        isSelected
                          ? 'border-magenta bg-magenta/[0.03] bg-[#0c0c0e] shadow-lg shadow-magenta/5'
                          : 'border-white/10 bg-[#09090b]/95 hover:border-white/20'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-4 right-4 text-magenta">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-display font-black text-sm text-white uppercase tracking-wide">
                          {a.name}
                        </h4>
                        <p className="text-xs text-gray-300 mt-2 font-normal leading-relaxed">
                          {a.desc}
                        </p>
                      </div>
                      <span className="text-sm font-display font-black text-white block mt-4">
                        + Rs. {a.price.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Speed option */}
            <div className="flex flex-col gap-5">
              <h3 className="font-display font-black text-lg text-white uppercase tracking-wider flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-electric" /> 3. Delivery speed
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setDeliverySpeed('standard')}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    deliverySpeed === 'standard'
                      ? 'border-electric bg-[#0c0c0e]'
                      : 'border-white/10 bg-[#09090b]/95 hover:border-white/20'
                  }`}
                >
                  <div>
                    <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">
                      Standard
                    </h4>
                    <span className="text-xs text-gray-300 font-normal mt-1 block">Approx. 7-14 Days</span>
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Included</span>
                </div>

                <div
                  onClick={() => setDeliverySpeed('express')}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    deliverySpeed === 'express'
                      ? 'border-electric bg-[#0c0c0e]'
                      : 'border-white/10 bg-[#09090b]/95 hover:border-white/20'
                  }`}
                >
                  <div>
                    <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">
                      Express Sprint
                    </h4>
                    <span className="text-xs text-gray-300 font-normal mt-1 block">Under 5 Days delivery</span>
                  </div>
                  <span className="text-xs font-display font-black text-magenta block">
                    + Rs. 15,000
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Terminal Readout Configuration */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-8 rounded-3xl border border-white/10 bg-[#070709]/95 backdrop-blur-xl flex flex-col justify-between min-h-[500px] shadow-xl">
              <div>
                {/* Console Header */}
                <div className="flex items-center gap-2 border-b border-white/5 pb-4 mb-6">
                  <Terminal className="w-5 h-5 text-electric" />
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">
                    Schematic_Compiler.log
                  </span>
                </div>

                {/* Simulated Log Output */}
                <div className="font-mono text-xs text-gray-300 flex flex-col gap-3 py-2 leading-relaxed">
                  <p className="text-emerald-400">&gt; INITIALIZING SYSTEM SCHEMATIC CONFIG...</p>
                  <p>&gt; PLATFORM: <span className="text-white font-bold">{platforms.find((p) => p.id === platform)?.name.toUpperCase()}</span></p>
                  <p className="text-gray-500">&gt; BASE COST: Rs. {basePrice.toLocaleString()}</p>
                  
                  {selectedAddons.length > 0 ? (
                    selectedAddons.map((id) => {
                      const ad = addons.find((a) => a.id === id);
                      return (
                        <p key={id} className="text-magenta-light">
                          &gt; INJECTING ADDON: {ad?.name.toUpperCase()} (+Rs. {ad?.price.toLocaleString()})
                        </p>
                      );
                    })
                  ) : (
                    <p className="text-gray-500">&gt; ADDONS: NONE LOADED</p>
                  )}

                  <p>&gt; RUNTIME MODE: <span className="text-white font-bold">{deliverySpeed.toUpperCase()}</span></p>
                  {deliverySpeed === 'express' && (
                    <p className="text-gray-500">&gt; SPEED SURCHARGE: Rs. 15,000</p>
                  )}

                  <div className="w-full h-[1px] bg-white/5 my-3" />
                  
                  <p className="text-emerald-400">&gt; ESTIMATION COMPLETED WITH ZERO WARNINGS</p>
                </div>
              </div>

              {/* Estimate Calculations */}
              <div className="border-t border-white/5 pt-6 mt-8">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block mb-1">
                  ESTIMATED INVESTMENT BUDGET
                </span>
                
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-3xl md:text-4xl font-display font-black text-white">
                    Rs. {totalEstimate.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                    LKR ESTIMATE
                  </span>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-4">
                  <Magnetic range={25} strength={0.25}>
                    <button
                      onClick={handleGenerateWhatsAppLink}
                      className="w-full py-4 rounded-full bg-gradient-to-r from-electric to-electric-light text-white font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-electric/25 hover:shadow-electric/40 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" /> Compile & Send Quote
                    </button>
                  </Magnetic>
                  
                  <span className="text-[9px] text-center text-gray-500 uppercase tracking-wider font-semibold">
                    Quotes compile directly into WhatsApp messages.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Client Sites Cyber Directory (Restored!) */}
        <div className="mt-24 max-w-4xl mx-auto border border-white/5 rounded-3xl p-10 bg-dark-900/40 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
          <div className="absolute top-0 left-[25%] h-full w-[1px] bg-white/5 hidden md:block" />

          <h4 className="font-display font-black text-lg text-white uppercase tracking-wider mb-8 flex items-center gap-3">
            <span className="w-3 h-[1px] bg-gold" /> Cyber Directory / Live Builds
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveSites.map((site) => (
              <Magnetic key={site.url} range={25} strength={0.25}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-dark-950/50 hover:border-electric/50 transition-all group cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-display font-black text-white group-hover:text-electric transition-colors uppercase tracking-wide">
                      {site.title.replace(' Portal', '').replace(' System', '').replace(' Agency', '')}
                    </span>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1.5 overflow-hidden text-ellipsis max-w-[170px] whitespace-nowrap">
                      {site.url.replace('https://', '').replace('www.', '')}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-electric group-hover:border-electric/50 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Portfolio;
