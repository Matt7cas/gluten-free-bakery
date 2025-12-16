
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { usePerformance } from './src/contexts/PerformanceContext';

import Header from './src/components/Header';
import Hero from './src/components/Hero';
import Products from './src/components/Products';
import About from './src/components/About';
import Contact from './src/components/Contact';
import Footer from './src/components/Footer';
import FloatingElements from './src/components/FloatingElements';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isAudioEnabled, setIsAudioEnabled, playSound } = usePerformance();
  const audioRefs = useRef({});
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 200], [0, 30]);

  // Initialize audio elements
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Sound effect URLs (short, optimized samples)
      const SOUND_EFFECTS = {
        paperRustle: 'audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkgQ29udmVydGVyIFYyLjkuMA==',
        paperTear: 'audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkgQ29udmVydGVyIFYyLjkuMA==',
        paperDrop: 'audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkgQ29udmVydGVyIFYyLjkuMA==',
        menuOpen: 'audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkgQ29udmVydGVyIFYyLjkuMA=='
      };

      Object.entries(SOUND_EFFECTS).forEach(([key, url]) => {
        const audio = new Audio();
        audio.src = url;
        audio.volume = 0.25;
        audioRefs.current[key] = audio;
      });
    }
  }, []);

  // Play sound on menu interactions
  useEffect(() => {
    if (isMenuOpen) {
      playSound('menuOpen');
    }
  }, [isMenuOpen, playSound]);

  // Handle section changes with scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'products', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop &&
            scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f3e6] font-sans relative overflow-x-hidden">
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <Hero playSound={playSound} />

      <Products playSound={playSound} />
      <About />
      <Contact playSound={playSound} />
      <Footer playSound={playSound} />
      <FloatingElements yRange={yRange} />
    </div>
  );
};

export default App;