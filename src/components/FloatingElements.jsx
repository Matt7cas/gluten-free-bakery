
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
      {/* Elemento superior izquierdo con animación fluida */}
      <motion.div
        className="absolute w-16 h-16 bg-gradient-to-br from-[#e8d9c5] to-[#f0e6d5] rounded-xl opacity-70 shadow-lg"
        style={{
          top: `${Math.sin(scrollY * 0.008) * 30 + 100}px`,
          left: `${Math.cos(scrollY * 0.006) * 25 + 60}px`,
          rotate: `${Math.sin(scrollY * 0.004) * 15}deg`,
        }}
        animate={{
          y: [0, 15, 0],
          scale: [0.95, 1.05, 0.95],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Elemento superior derecho con animación fluida */}
      <motion.div
        className="absolute w-14 h-14 bg-gradient-to-br from-[#d4c0a1] to-[#e8d9c5] rounded-xl opacity-65 shadow-lg"
        style={{
          top: `${Math.cos(scrollY * 0.01) * 35 + 180}px`,
          right: `${Math.sin(scrollY * 0.007) * 30 + 60}px`,
          rotate: `${Math.cos(scrollY * 0.005) * -12}deg`,
        }}
        animate={{
          x: [0, -20, 0],
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 4px 20px rgba(212, 192, 161, 0.3)",
            "0 8px 30px rgba(212, 192, 161, 0.5)",
            "0 4px 20px rgba(212, 192, 161, 0.3)"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Elemento inferior izquierdo con animación fluida */}
      <motion.div
        className="absolute w-12 h-12 bg-gradient-to-br from-[#c8b69d] to-[#d4c0a1] rounded-full opacity-60 shadow-lg"
        style={{
          bottom: `${Math.sin(scrollY * 0.008) * 40 + 140}px`,
          left: `${Math.sin(scrollY * 0.009) * 35 + 100}px`,
          rotate: `${Math.sin(scrollY * 0.006) * 18}deg`,
        }}
        animate={{
          y: [0, -25, 0],
          scale: [0.9, 1.1, 0.9],
          borderRadius: ["0%", "50%", "0%"]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Elemento central con animación fluida */}
      <motion.div
        className="absolute w-10 h-10 bg-gradient-to-br from-[#b8a692] to-[#c8b69d] rounded-full opacity-55 shadow-lg"
        style={{
          top: `${Math.cos(scrollY * 0.012) * 50 + 45}%`,
          left: `${Math.sin(scrollY * 0.011) * 40 + 45}%`,
          rotate: `${Math.sin(scrollY * 0.007) * 20}deg`,
        }}
        animate={{
          scale: [0.85, 1.15, 0.85],
          opacity: [0.5, 0.7, 0.5],
          boxShadow: [
            "0 2px 10px rgba(184, 166, 146, 0.2)",
            "0 6px 25px rgba(184, 166, 146, 0.4)",
            "0 2px 10px rgba(184, 166, 146, 0.2)"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Elemento adicional superior central con animación fluida */}
      <motion.div
        className="absolute w-8 h-8 bg-gradient-to-br from-[#a89682] to-[#b8a692] rounded-full opacity-45 shadow-md"
        style={{
          top: `${Math.sin(scrollY * 0.009) * 25 + 20}%`,
          left: `${Math.cos(scrollY * 0.008) * 30 + 70}%`,
        }}
        animate={{
          y: [0, 20, 0],
          scale: [0.8, 1.2, 0.8],
          rotate: [0, 15, 0, -15, 0]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Elemento adicional inferior derecho con animación fluida */}
      <motion.div
        className="absolute w-6 h-6 bg-gradient-to-br from-[#988672] to-[#a89682] rounded-lg opacity-40 shadow-md"
        style={{
          bottom: `${Math.cos(scrollY * 0.011) * 35 + 80}px`,
          right: `${Math.sin(scrollY * 0.01) * 25 + 100}px`,
          rotate: `${Math.cos(scrollY * 0.008) * -25}deg`,
        }}
        animate={{
          x: [0, 15, 0],
          scale: [0.9, 1.1, 0.9],
          opacity: [0.35, 0.55, 0.35]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default React.memo(FloatingElements); // Memoización para optimizar rendimiento