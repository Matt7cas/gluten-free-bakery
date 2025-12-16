
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { usePerformance } from '../contexts/PerformanceContext';

const Header = ({
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  setActiveSection
}) => {
  const { isAudioEnabled, setIsAudioEnabled, playSound } = usePerformance();

  const menuVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 150
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 150
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.23, 0.99, 0.6, 1]
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const paperVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotate: -3,
      scale: 0.9
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotate: i % 2 === 0 ? -1.5 : 1.5,
      scale: 1,
      transition: {
        delay: i * 0.12,
        duration: 0.8,
        ease: [0.23, 0.99, 0.6, 1]
      }
    }),
    hover: {
      y: -8,
      rotate: 0,
      scale: 1.02,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Audio toggle button */}
      <button
        onClick={() => {
          setIsAudioEnabled(!isAudioEnabled);
          playSound('paperRustle');
        }}
        className="fixed bottom-6 right-6 z-50 p-3 bg-[#e8d9c5] border-2 border-[#d4c0a1] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label={isAudioEnabled ? "Desactivar sonido" : "Activar sonido"}
      >
        {isAudioEnabled ? (
          <Volume2 className="text-[#8c7b5f] w-6 h-6" />
        ) : (
          <VolumeX className="text-[#a89a7d] w-6 h-6" />
        )}
      </button>

      {/* Navigation */}
      <nav className="fixed w-full z-40 px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="cursor-pointer"
            onClick={() => {
              playSound('paperRustle');
              setActiveSection('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative">
              <div className="bg-[#e8d9c5] p-2 rounded-lg shadow-md border-2 border-[#d4c0a1]">
                <h1 className="text-2xl md:text-3xl font-handwritten text-[#8c5e37] tracking-tight">
                  Panadería Sin TACC
                </h1>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#d4c0a1] w-3/4 h-1 transform rotate-1"></div>
            </div>
          </motion.div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-2">
            {['home', 'products', 'about', 'contact'].map((section) => (
              <motion.button
                key={section}
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  scale: 1.03,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ 
                  scale: 0.94,
                  transition: { duration: 0.1, ease: "easeIn" }
                }}
                onClick={() => {
                  playSound('paperRustle');
                  setActiveSection(section);
                  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeSection === section
                    ? 'bg-[#e8d9c5] border-[#d4c0a1] text-[#8c5e37]'
                    : 'bg-white border-[#c8b69d] text-[#a89a7d] hover:bg-[#f5f0e1]'
                } border-2 shadow-md`}
              >
                <span className="capitalize">{section}</span>
                <div className={`absolute -bottom-1 -right-1 h-1 bg-[#d4c0a1] transition-all duration-300 ${
                  activeSection === section ? 'w-1/2' : 'w-1/4'
                }`}></div>
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              playSound('paperRustle');
            }}
            className="md:hidden p-2 bg-[#e8d9c5] border-2 border-[#d4c0a1] rounded-lg shadow-md"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? (
              <X className="text-[#8c5e37] w-6 h-6" />
            ) : (
              <Menu className="text-[#8c5e37] w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden fixed top-0 left-0 h-full w-4/5 bg-[#f8f3e6] border-r-4 border-dashed border-[#d4c0a1] shadow-2xl z-50 mt-16"
            >
              <div className="p-6 space-y-6 mt-8">
                {['home', 'products', 'about', 'contact'].map((section, index) => (
                  <motion.button
                    key={section}
                    variants={paperVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setActiveSection(section);
                      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                      playSound('paperDrop');
                    }}
                    className={`block w-full text-left p-4 rounded-lg border-2 shadow-md transition-all ${
                      activeSection === section
                        ? 'bg-[#e8d9c5] border-[#d4c0a1] text-[#8c5e37]'
                        : 'bg-white border-[#c8b69d] text-[#a89a7d] hover:bg-[#f5f0e1]'
                    }`}
                  >
                    <span className="text-lg capitalize font-medium">{section}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Header;