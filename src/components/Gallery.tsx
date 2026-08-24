import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye } from 'lucide-react';
import GridDivider from './GridDivider';
import Magnetic from './Magnetic';

interface GalleryItem {
  id: string;
  title: string;
  category: 'label' | 'logo' | 'post' | 'card';
  image: string;
  desc: string;
}

// Cinematic Split-Text Reveal Component
const AnimatedHeading: React.FC<{ subtitle: string; titlePart1: string; titlePart2: string }> = ({ subtitle, titlePart1, titlePart2 }) => {
  return (
    <div className="text-center md:text-left overflow-hidden mb-16">
      <motion.span
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-gold font-display font-bold tracking-[0.25em] text-xs uppercase block mb-2"
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

export const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'label' | 'logo' | 'post' | 'card'>('all');

  const galleryItems: GalleryItem[] = [
    // 1. Social Posts ("post site" folder)
    {
      id: 'post-01',
      title: 'IT Bootcamp register ad',
      category: 'post',
      image: '/assets/projects/01.jpg',
      desc: 'High-conversion Facebook ad creative template optimized for programming bootcamps.'
    },
    {
      id: 'post-2nd',
      title: 'IT Bootcamp curriculum ad',
      category: 'post',
      image: '/assets/projects/2nd.jpg',
      desc: 'Secondary campaign ad banner highlighting student mentoring structures.'
    },
    {
      id: 'post-boost',
      title: 'Campaign promo ad',
      category: 'post',
      image: '/assets/projects/boost-r.jpg',
      desc: 'Vibrant conversion banner layout optimized for meta target audiences.'
    },
    {
      id: 'post-00-11',
      title: 'Social banner layout 11',
      category: 'post',
      image: '/assets/projects/00%20(11).jpg',
      desc: 'Corporate social grid post designed for product promotion campaigns.'
    },
    {
      id: 'post-00-13',
      title: 'Social banner layout 13',
      category: 'post',
      image: '/assets/projects/00%20(13).jpg',
      desc: 'Visual marketing graphic card designed for social media channels.'
    },
    {
      id: 'post-00-15',
      title: 'Social banner layout 15',
      category: 'post',
      image: '/assets/projects/00%20(15).jpg',
      desc: 'Promotional ad banner template custom designed for clients.'
    },
    {
      id: 'post-00-17',
      title: 'Social banner layout 17',
      category: 'post',
      image: '/assets/projects/00%20(17).jpg',
      desc: 'Corporate announcement social creative designed for brand pages.'
    },
    {
      id: 'post-00-18',
      title: 'Social banner layout 18',
      category: 'post',
      image: '/assets/projects/00%20(18).jpg',
      desc: 'Creative ad creative customized with brand colors and typography.'
    },
    {
      id: 'creative-asset-1',
      title: 'Creative Layout Asset 1',
      category: 'post',
      image: '/assets/projects/project1.jpg',
      desc: 'Creative layout design illustrating professional social branding.'
    },
    {
      id: 'creative-asset-5',
      title: 'Creative Layout Asset 5',
      category: 'post',
      image: '/assets/projects/project5.png',
      desc: 'Promotional ad banner graphic for tech marketing campaigns.'
    },

    // 2. Logos ("logo site" folder)
    {
      id: 'logo-denexus',
      title: 'DeNexus Technology Logo',
      category: 'logo',
      image: '/assets/projects/DeNexus%20LOGO-01-01.jpg',
      desc: 'High-tech structural vector monogram designed for DeNexus Technology.'
    },
    {
      id: 'logo-deez',
      title: 'Deez Food & Coffee Logo',
      category: 'logo',
      image: '/assets/projects/Deez%20LOGO-01.jpg',
      desc: 'Playful branding typography emblem logo designed for Deez Cafe.'
    },
    {
      id: 'logo-naturize-leaf',
      title: 'K.N Naturize Logo Concept',
      category: 'logo',
      image: '/assets/projects/K.N%20Naturize%20Logo-01-01.jpg',
      desc: 'Organic leaf vector badge logo design for herbal product lines.'
    },
    {
      id: 'logo-knexa-png',
      title: 'Knexa system logo emblem',
      category: 'logo',
      image: '/assets/projects/Logo%20PNG-01-01.png',
      desc: 'Clean vector brand mark monogram designed for Knexa System.'
    },
    {
      id: 'logo-rash-new',
      title: 'Rash New Logo design',
      category: 'logo',
      image: '/assets/projects/Rash%20New-01.png',
      desc: 'Minimalist corporate vector logo designed for Rash brand.'
    },
    {
      id: 'logo-hhh',
      title: 'HHH Company Logo',
      category: 'logo',
      image: '/assets/projects/hhh-01.jpg',
      desc: 'Sleek monogram logo layout designed for HHH corporate group.'
    },
    {
      id: 'creative-asset-3',
      title: 'Creative Layout Asset 3',
      category: 'logo',
      image: '/assets/projects/project3.png',
      desc: 'Visual identity logo vector badge mockup.'
    },
    {
      id: 'creative-asset-7',
      title: 'Creative Layout Asset 7',
      category: 'logo',
      image: '/assets/projects/project7.jpg',
      desc: 'Circular geometric logo emblem designed for creative studios.'
    },

    // 3. Labels / Packaging ("label" folder)
    {
      id: 'lbl-naturize-enhancer',
      title: 'Naturize Label wrap',
      category: 'label',
      image: '/assets/projects/package%20front-Picsart-AiImageEnhancer.png',
      desc: 'Premium herbal oil label wrap layout designed for K.N. Naturize Herbal Oils.'
    },
    {
      id: 'lbl-tag',
      title: 'Botanical Product tag',
      category: 'label',
      image: '/assets/projects/tag-02-01.png',
      desc: 'Eco-friendly tag layout customized with vector botanical lines.'
    },
    {
      id: 'lbl-front',
      title: 'Naturize bottle front mockup',
      category: 'label',
      image: '/assets/projects/front.jpg',
      desc: 'High-resolution packaging mockup rendering the front label wrap.'
    },
    {
      id: 'lbl-back',
      title: 'Naturize bottle back layout',
      category: 'label',
      image: '/assets/projects/back.jpg',
      desc: 'Packaging back panel design specifying instructions and barcode placements.'
    },
    {
      id: 'lbl-cover',
      title: 'Naturize brand Cover mockup',
      category: 'label',
      image: '/assets/projects/cover.jpg',
      desc: 'Premium bottle packaging cover layout rendering under studio lighting.'
    },
    {
      id: 'lbl-new-033',
      title: 'Herbal Oil variant wrap',
      category: 'label',
      image: '/assets/projects/new%20033-02.jpg',
      desc: 'Secondary variant label wrap configuration for herbal cosmetic lines.'
    },
    {
      id: 'lbl-01-01',
      title: 'Herbal Oil label concept',
      category: 'label',
      image: '/assets/projects/01-01.jpg',
      desc: 'First-stage label wrap design conceptualized for product catalogs.'
    },
    {
      id: 'creative-asset-2',
      title: 'Creative Layout Asset 2',
      category: 'label',
      image: '/assets/projects/project2.png',
      desc: 'Corporate vector mockup showing product brand configurations.'
    },

    // 4. Business Cards ("business card" folder)
    {
      id: 'card-pranaro',
      title: 'Pranaro Business card front',
      category: 'card',
      image: '/assets/projects/Pranaro%20cmyk%20new.jpg',
      desc: 'Sleek corporate identity business card designed for Pranaro brand.'
    },
    {
      id: 'card-class',
      title: 'Weekly schedule card layout',
      category: 'card',
      image: '/assets/projects/class%20card%20%2001.jpg',
      desc: 'Weekly class timetable index card design created for educational campuses.'
    },
    {
      id: 'card-picsart',
      title: 'SITC corporate card front',
      category: 'card',
      image: '/assets/projects/card-Picsart-AiImageEnhancer.jpg',
      desc: 'Premium identity card wrap designed for SITC / Ideacade campus.'
    },
    {
      id: 'card-back11',
      title: 'Corporate card back layout',
      category: 'card',
      image: '/assets/projects/back11.jpg',
      desc: 'Standard back layout for business card prints detailing logo marks.'
    },
    {
      id: 'card-untitled',
      title: 'Pranaro card variant design',
      category: 'card',
      image: '/assets/projects/Untitled-1-01-01.jpg',
      desc: 'Alternate design template conceptualized for corporate business cards.'
    },
    {
      id: 'creative-asset-4',
      title: 'Creative Layout Asset 4',
      category: 'card',
      image: '/assets/projects/project4.png',
      desc: 'Print-ready corporate folder templates and brochure covers.'
    },
    {
      id: 'creative-asset-6',
      title: 'Creative Layout Asset 6',
      category: 'card',
      image: '/assets/projects/project6.png',
      desc: 'Corporate newsletter flyer and cover page graphic layout.'
    }
  ];

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-32 relative overflow-hidden bg-transparent">
      {/* Blueprint lines */}
      <GridDivider direction="horizontal" className="absolute top-0 left-0 w-full" />
      <div className="absolute top-0 left-[8%] h-full w-[1px] bg-white/5 hidden xl:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20">
          <AnimatedHeading subtitle="CREATIVE PORTFOLIO" titlePart1="GRAPHIC" titlePart2="DESIGNS" />

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-dark-900/60 backdrop-blur-md rounded-full border border-white/5">
            {([
              { id: 'all', label: 'All' },
              { id: 'label', label: 'Labels / Packaging' },
              { id: 'logo', label: 'Logos' },
              { id: 'post', label: 'Social Posts' },
              { id: 'card', label: 'Business Cards' }
            ] as const).map((opt) => (
              <Magnetic key={opt.id} range={15} strength={0.3}>
                <button
                  onClick={() => setFilter(opt.id)}
                  className={`px-5 py-2.5 rounded-full font-display font-bold text-xs uppercase tracking-widest transition-all ${
                    filter === opt.id
                      ? 'bg-electric text-white shadow-lg shadow-electric/25'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* Designs Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-panel overflow-hidden rounded-3xl border border-white/5 bg-dark-900/40 relative group cursor-pointer aspect-square"
                onClick={() => setSelectedItem(item)}
              >
                {/* Image Frame */}
                <div className="w-full h-full relative overflow-hidden bg-dark-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  />
                  
                  {/* Overlay Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <div className="flex justify-end">
                      <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] bg-electric font-display font-black tracking-widest text-white px-2.5 py-1.5 rounded-full uppercase mb-2 inline-block">
                        {item.category}
                      </span>
                      <h3 className="font-display font-black text-sm text-white uppercase tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6" 
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-dark-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="absolute top-6 right-6 z-10">
                <Magnetic range={25} strength={0.35}>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-2.5 rounded-full bg-black/60 border border-white/10 text-white hover:border-white/30 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </Magnetic>
              </div>

              {/* Showcase Image */}
              <div className="w-full max-h-[70vh] overflow-y-auto bg-black flex items-center justify-center">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-auto object-contain max-h-[70vh]"
                />
              </div>

              {/* Readout Description */}
              <div className="p-8 border-t border-white/5 bg-dark-950/90 backdrop-blur-md">
                <span className="text-[9px] text-gold font-display font-black tracking-widest uppercase block mb-1">
                  {selectedItem.category}
                </span>
                <h3 className="font-display font-black text-xl text-white uppercase tracking-tight mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {selectedItem.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default Gallery;
