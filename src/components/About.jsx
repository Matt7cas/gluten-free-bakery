
import React from 'react';
import { motion } from 'framer-motion';
import { WheatOff, ShieldCheck } from 'lucide-react';

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
    y: 30,
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

const About = () => {
  return (
    <motion.section
      id="about"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-20 px-4 bg-[#f8f3e6] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:w-1/2 relative"
        >
          <div className="bg-white p-8 rounded-2xl border-4 border-dashed border-[#d4c0a1] shadow-xl relative z-10">
            {/* Pin/Stamp Element */ }
            <div className="absolute -top-5 -left-5 w-16 h-16 bg-[#e8d9c5] rounded-full border-4 border-dashed border-[#d4c0a1] shadow-md flex items-center justify-center transform -rotate-12 z-20">
               <span className="text-2xl">🌾</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-handwritten text-[#8c5e37] mb-6">
              Comprometidos con tu salud
            </h2>
            <p className="text-lg text-[#6a5d4d] mb-6 leading-relaxed">
              En nuestra panadería especializada en productos libres de TACC (trigo, avena, cebada y centeno),
              cada etapa de producción sigue rigurosos protocolos de seguridad alimentaria para garantizar que
              nuestros productos sean 100% aptos para celíacos.
            </p>
            <div className="flex items-center space-x-4 mb-6">
              <WheatOff className="w-10 h-10 text-red-500" />
              <p className="text-lg font-medium text-[#8c5e37]">Libre de trazas de gluten</p>
            </div>
            <div className="flex items-center space-x-4">
              <ShieldCheck className="w-10 h-10 text-green-600" />
              <p className="text-lg font-medium text-[#8c5e37]">Certificación internacional SIN TACC</p>
            </div>
            {/* Washi Tape Decoration */ }
             <div className="absolute -bottom-4 right-10 w-32 h-6 bg-[#d4c0a1]/40 transform -rotate-2 rounded-sm blur-[0.5px]"></div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:w-1/2 flex justify-center"
        >
          <div className="relative">
            <div className="bg-[#e8d9c5] p-6 rounded-2xl border-4 border-dashed border-[#d4c0a1] shadow-xl">
              <div className="text-center">
                <div className="bg-white border-2 border-dashed border-[#d4c0a1] rounded-xl p-6 mb-6">
                  <h3 className="text-2xl font-handwritten text-[#8c5e37] mb-2">Nuestro Proceso</h3>
                  <p className="text-[#6a5d4d] italic">
                    "Cada producto es elaborado en un ambiente exclusivo SIN TACC,
                    con ingredientes seleccionados y horneados con dedicación artesanal."
                  </p>
                </div>
                <div className="flex justify-center space-x-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#d4c0a1] rounded-full flex items-center justify-center mx-auto mb-2 text-[#8c5e37] font-bold text-xl">1</div>
                    <p className="font-medium">Ingredientes certificados</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#d4c0a1] rounded-full flex items-center justify-center mx-auto mb-2 text-[#8c5e37] font-bold text-xl">2</div>
                    <p className="font-medium">Elaboración en ambiente controlado</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#d4c0a1] rounded-full flex items-center justify-center mx-auto mb-2 text-[#8c5e37] font-bold text-xl">3</div>
                    <p className="font-medium">Control de calidad permanente</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Corner Tape */ }
            <div className="absolute -top-3 -right-3 w-24 h-8 bg-[#c8b69d]/50 transform rotate-6 shadow-sm backdrop-blur-[1px]"></div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;