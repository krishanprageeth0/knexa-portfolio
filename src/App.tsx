import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { WhatsApp } from './components/WhatsApp';
import { Background3D } from './components/Background3D';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const sections = ['home', 'about', 'services', 'portfolio', 'pricing', 'gallery', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen text-silver antialiased select-none bg-transparent overflow-x-hidden">
      {/* Site-wide Continuous 3D Background */}
      <Background3D />

      {/* Mouse Follower Glow Aura (Weichie design helper) */}
      <div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 cursor-glow-light z-0 transition-transform duration-300 ease-out hidden md:block"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* Floating Header */}
      <Navbar activeSection={activeSection} />

      {/* Page Content Overlay */}
      <main className="relative z-10">
        <Hero3D />
        <About />
        <Services />
        <Portfolio />
        <Gallery />
        <Contact />
      </main>

      {/* Sticky Bottom-Right WhatsApp CTA */}
      <WhatsApp />
    </div>
  );
};

export default App;
