
import React from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: "blur(4px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.0,
      ease: [0.23, 1, 0.32, 1],
      staggerChildren: 0.1
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
      duration: 0.8,
      ease: [0.23, 0.99, 0.6, 1]
    }
  }
};

const Hero = ({ playSound }) => {
  return (
    <motion.section
      id="home"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="pt-32 pb-20 px-4 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="inline-block mb-8"
        >
          <div className="bg-[#e8d9c5] p-6 rounded-2xl border-4 border-dashed border-[#d4c0a1] inline-block shadow-xl relative">
            <h1 className="text-4xl md:text-6xl font-handwritten text-[#8c5e37] leading-tight">
              Panadería Artesanal SIN TACC
            </h1>
            <div className="absolute -bottom-2 -right-2 bg-[#d4c0a1] w-1/2 h-1 transform rotate-2"></div>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-[#6a5d4d] max-w-3xl mx-auto mb-12 font-medium"
        >
          Cada pieza hecha con dedicación y cuidado, 100% libre de trigo, avena, cebada y centeno.
          Para que todos puedan disfrutar del verdadero sabor del pan.
        </motion.p>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ 
            y: -8,
            scale: 1.02,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          whileTap={{ 
            scale: 0.96,
            transition: { duration: 0.1, ease: "easeIn" }
          }}
          onClick={() => playSound('paperTear')}
          transition={{ delay: 0.4 }}
          className="inline-block"
        >
          <div className="bg-[#e8d9c5] border-2 border-[#d4c0a1] rounded-xl shadow-lg px-8 py-4 cursor-pointer group">
            <span className="text-lg md:text-xl font-medium text-[#8c5e37] group-hover:text-[#7a512e] transition-colors">
              Descubre nuestros productos
            </span>
            <div className="absolute -bottom-1 -right-1 bg-[#d4c0a1] w-1/3 h-1 transform rotate-1"></div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#f8f3e6] to-transparent pointer-events-none"></div>
    </motion.section>
  );
};

export default Hero;