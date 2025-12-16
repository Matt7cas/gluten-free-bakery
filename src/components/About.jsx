
import React from 'react';
import { motion } from 'framer-motion';
import { WheatOff, ShieldCheck } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.21, 0.32, 0.35, 1]
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
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:w-1/2 relative"
        >
          <div className="bg-white p-8 rounded-2xl border-4 border-dashed border-[#d4c0a1] shadow-xl relative z-10">
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#e8d9c5] rounded-lg transform rotate-3"></div>
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
            <div className="absolute -bottom-3 -right-3 bg-[#d4c0a1] w-1/2 h-1 transform rotate-1"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
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
            <div className="absolute -top-3 -right-3 bg-[#c8b69d] w-1/3 h-1 transform rotate-2"></div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;