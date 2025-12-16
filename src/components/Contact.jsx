
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

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

const Contact = ({ playSound }) => {
  return (
    <motion.section
      id="contact"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-20 px-4 bg-white relative"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 relative inline-block"
        >
          <div className="bg-[#e8d9c5] p-4 rounded-xl border-2 border-dashed border-[#d4c0a1] inline-block">
            <h2 className="text-3xl md:text-4xl font-handwritten text-[#8c5e37]">
              Contáctanos
            </h2>
          </div>
          <div className="absolute -bottom-2 -right-2 w-full h-4 bg-[#d4c0a1]/30 -skew-x-6 -rotate-1 rounded-full -z-10"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="bg-[#f8f3e6] p-6 rounded-xl border-2 border-dashed border-[#d4c0a1]">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-[#8c5e37] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-handwritten text-xl text-[#8c5e37] mb-1">Dirección</h3>
                  <p className="text-[#6a5d4d]">Av. Siempre Viva 123, Buenos Aires</p>
                  <p className="text-[#6a5d4d]">Local 45, Galería Artesanal</p>
                </div>
              </div>
            </div>

            <div className="bg-[#f8f3e6] p-6 rounded-xl border-2 border-dashed border-[#d4c0a1]">
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-[#8c5e37] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-handwritten text-xl text-[#8c5e37] mb-1">Teléfono</h3>
                  <p className="text-[#6a5d4d]">+54 11 4567-8901</p>
                  <p className="text-[#6a5d4d]">Lunes a Sábado: 8:00 - 20:00</p>
                </div>
              </div>
            </div>

            <div className="bg-[#f8f3e6] p-6 rounded-xl border-2 border-dashed border-[#d4c0a1]">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-[#8c5e37] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-handwritten text-xl text-[#8c5e37] mb-1">Email</h3>
                  <p className="text-[#6a5d4d]">hola@panaderiasintacc.com.ar</p>
                  <p className="text-[#6a5d4d]">ventas@panaderiasintacc.com.ar</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#e8d9c5] p-8 rounded-2xl border-4 border-dashed border-[#d4c0a1] shadow-xl"
          >
            <h3 className="text-2xl font-handwritten text-[#8c5e37] mb-6 text-center">
              Horarios de Atención
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-[#d4c0a1] pb-2">
                <span className="font-medium">Lunes - Viernes</span>
                <span>8:00 - 20:00</span>
              </div>
              <div className="flex justify-between border-b border-[#d4c0a1] pb-2">
                <span className="font-medium">Sábados</span>
                <span>9:00 - 18:00</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-medium">Domingos</span>
                <span>9:00 - 15:00</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#d4c0a1]">
              <p className="text-center text-[#6a5d4d] italic">
                "Vení a conocernos y disfrutá de un café con nuestros productos,
                en un ambiente seguro y libre de TACC"
              </p>
            </div>
          
            {/* Washi Tape Decoration */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-[#e8d9c5] shadow-md -rotate-1 opacity-90 backdrop-blur-[1px] border border-[#d4c0a1]/50"></div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;