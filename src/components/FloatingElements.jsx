
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// Componente optimizado con animaciones basadas en scroll
const FloatingElements = () => {
  const [scrollY, setScrollY] = useState(0);

  // Función optimizada para manejar el evento de scroll
  const handleScroll = useCallback(() => {
    // Usar requestAnimationFrame para optimizar el rendimiento
    window.requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  }, []);

  useEffect(() => {
    // Agregar listener de scroll con opciones de rendimiento
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Limpiar listener al desmontar
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Calcular transformaciones basadas en scroll para cada elemento flotante
  const calculateTransform = (factor) => {
    return scrollY * factor;
  };

  return (
    <div className="fixed top-0 left-0 w-full pointer-events-none z-0 overflow-hidden">
      {/* Elemento superior izquierdo con animación */}
      <motion.div
        className="absolute w-16 h-16 bg-[#e8d9c5] border-2 border-dashed border-[#d4c0a1] rounded-lg opacity-70"
        style={{
          top: `${Math.sin(scrollY * 0.01) * 20 + 80}px`,
          left: `${Math.cos(scrollY * 0.008) * 15 + 40}px`,
          rotate: `${Math.sin(scrollY * 0.005) * 10}deg`,
        }}
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Elemento superior derecho con animación */}
      <motion.div
        className="absolute w-12 h-12 bg-[#e8d9c5] border-2 border-dashed border-[#d4c0a1] rounded-lg opacity-70"
        style={{
          top: `${Math.cos(scrollY * 0.012) * 25 + 160}px`,
          right: `${Math.sin(scrollY * 0.007) * 20 + 40}px`,
          rotate: `${Math.cos(scrollY * 0.006) * -8}deg`,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Elemento inferior izquierdo con animación */}
      <motion.div
        className="absolute w-10 h-10 bg-[#d4c0a1] border-2 border-dashed border-[#c8b69d] rounded-lg opacity-60"
        style={{
          bottom: `${Math.sin(scrollY * 0.009) * 30 + 120}px`,
          left: `${Math.sin(scrollY * 0.011) * 25 + 80}px`,
          rotate: `${Math.sin(scrollY * 0.007) * 12}deg`,
        }}
        animate={{
          borderRadius: ["0%", "20%", "0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Elemento adicional central con animación */}
      <motion.div
        className="absolute w-8 h-8 bg-[#c8b69d] border border-solid border-[#b8a692] rounded-full opacity-50"
        style={{
          top: `${Math.cos(scrollY * 0.015) * 40 + 50}%`,
          left: `${Math.sin(scrollY * 0.013) * 30 + 50}%`,
        }}
        animate={{
          y: [0, -20, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default React.memo(FloatingElements); // Memoización para optimizar rendimiento