import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, Mail, MapPin, Phone, WheatOff, ShieldCheck } from 'lucide-react';

// Mock product data
const products = [
  {
    id: 1,
    name: "Pan de Campo",
    description: "Tradicional pan artesanal con miga suave y corteza crujiente. 100% libre de TACC.",
    image: "https://placehold.co/400x300/e8d9c5/5c4b3d?text=Pan+de+Campo&font=playfair"
  },
  {
    id: 2,
    name: "Croissant",
    description: "Croissant hojaldrado con manteca, horneado hasta alcanzar un dorado perfecto. Sin trazas de gluten.",
    image: " https://placehold.co/400x300/e8d9c5/5c4b3d?text=Croissant&font=playfair"
  },
  {
    id: 3,
    name: "Medialunas Dulces",
    description: "Clásicas medialunas argentinas con glaseado casero. Garantizadas sin TACC.",
    image: " https://placehold.co/400x300/e8d9c5/5c4b3d?text=Medialunas&font=playfair"
  },
  {
    id: 4,
    name: "Torta de Chocolate",
    description: "Esponjosa torta de chocolate con relleno cremoso. Ideal para celíacos y amantes del chocolate.",
    image: " https://placehold.co/400x300/e8d9c5/5c4b3d?text=Torta+Chocolate&font=playfair"
  },
  {
    id: 5,
    name: "Facturas surtidas",
    description: "Selección de facturas artesanales: bolas de fraile, vigilantes y bizcochitos. Sin trazas de gluten.",
    image: " https://placehold.co/400x300/e8d9c5/5c4b3d?text=Facturas&font=playfair"
  },
  {
    id: 6,
    name: "Pan de Miga",
    description: "Pan blanco suave y esponjoso, perfecto para sándwiches y tostadas. Certificado SIN TACC.",
    image: " https://placehold.co/400x300/e8d9c5/5c4b3d?text=Pan+Miga&font=playfair"
  }
];

// Sound effect URLs (short, optimized samples)
const SOUND_EFFECTS = {
  paperRustle: 'data:audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkgQ29udmVydGVyIFYyLjkuMA==',
  paperTear: 'data:audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkgQ29udmVydGVyIFYyLjkuMA==',
  paperDrop: 'data:audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkgQ29udmVydGVyIFYyLjkuMA==',
  menuOpen: 'data:audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkgQ29udmVydGVyIFYyLjkuMA=='
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const audioRefs = useRef({});
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 200], [0, 30]);

  // Initialize audio elements
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Object.entries(SOUND_EFFECTS).forEach(([key, url]) => {
        const audio = new Audio();
        audio.src = url;
        audio.volume = 0.25;
        audioRefs.current[key] = audio;
      });
    }
  }, []);

  // Play sound effect
  const playSound = (soundName) => {
    if (isAudioEnabled && audioRefs.current[soundName]) {
      const sound = audioRefs.current[soundName].cloneNode();
      sound.volume = 0.3;
      sound.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  // Play sound on menu interactions
  useEffect(() => {
    if (isMenuOpen) {
      playSound('menuOpen');
    }
  }, [isMenuOpen]);

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

  // Torn paper animation variants
  const paperVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotate: -2
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotate: i % 2 === 0 ? -1 : 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.21, 0.32, 0.35, 1]
      }
    }),
    hover: {
      y: -5,
      rotate: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Menu animation variants
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

  // Section animation variants
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

  return (
    <div className="min-h-screen bg-[#f8f3e6] font-sans relative overflow-x-hidden">
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
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

      {/* Hero Section */}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-[#6a5d4d] max-w-3xl mx-auto mb-12 font-medium"
          >
            Cada pieza hecha con dedicación y cuidado, 100% libre de trigo, avena, cebada y centeno. 
            Para que todos puedan disfrutar del verdadero sabor del pan.
          </motion.p>
          
          <motion.div 
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => playSound('paperTear')}
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

      {/* Products Section */}
      <motion.section 
        id="products"
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
                Nuestros Productos
              </h2>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#d4c0a1] w-1/4 h-1 transform -rotate-1"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={paperVariants}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{ once: true }}
                whileHover="hover"
                onHoverStart={() => playSound('paperRustle')}
                onClick={() => playSound('paperTear')}
                className="relative cursor-pointer group"
              >
                <div className="absolute -inset-1 bg-[#d4c0a1] opacity-20 rounded-xl transform rotate-1"></div>
                <div className="relative bg-white p-6 rounded-xl border-2 border-dashed border-[#d4c0a1] shadow-lg overflow-hidden">
                  <div className="aspect-w-4 aspect-h-3 mb-4 rounded-lg overflow-hidden border-2 border-[#e8d9c5]">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-handwritten text-[#8c5e37] mb-2">{product.name}</h3>
                  <p className="text-[#6a5d4d] leading-relaxed">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-[#a89a7d]">SIN TACC CERTIFICADO</span>
                    <ShieldCheck className="text-green-600 w-5 h-5" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#d4c0a1] w-1/3 h-1 transform rotate-2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
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

      {/* Contact Section */}
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
            <div className="absolute -bottom-1 -right-1 bg-[#d4c0a1] w-1/4 h-1 transform -rotate-1"></div>
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
              
              <div className="absolute -bottom-2 -right-2 bg-[#d4c0a1] w-1/3 h-1 transform rotate-2"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#f8f3e6] border-t-4 border-dashed border-[#d4c0a1] py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-white inline-block p-6 rounded-2xl border-4 border-dashed border-[#d4c0a1] mb-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-6 h-6 text-green-600" />
                <span className="font-medium text-[#8c5e37]">Certificado SIN TACC</span>
              </div>
              <div className="flex items-center space-x-2">
                <WheatOff className="w-6 h-6 text-red-500" />
                <span className="font-medium text-[#8c5e37]">Libre de trazas de gluten</span>
              </div>
            </div>
          </div>
          
          <p className="text-lg text-[#6a5d4d] max-w-3xl mx-auto mb-6">
            © {new Date().getFullYear()} Panadería Sin TACC. Todos los productos son elaborados en un ambiente 100% libre de trigo, avena, cebada y centeno. 
            Garantizamos la seguridad alimentaria para personas celíacas.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => {
                playSound('paperRustle');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-[#e8d9c5] border-2 border-[#d4c0a1] rounded-xl font-medium text-[#8c5e37] hover:bg-[#d4c0a1] transition-colors"
            >
              Volver arriba
            </button>
            <div className="text-sm text-[#a89a7d]">
              Desarrollado con ❤️ para la comunidad celíaca
            </div>
          </div>
        </div>
      </footer>

      {/* Floating paper elements for decoration */}
      <motion.div 
        style={{ y: yRange }}
        className="fixed top-0 left-0 w-full pointer-events-none z-0"
      >
        <div className="absolute top-20 left-10 w-16 h-16 bg-[#e8d9c5] border-2 border-dashed border-[#d4c0a1] rounded-lg transform rotate-3 opacity-70"></div>
        <div className="absolute top-40 right-10 w-12 h-12 bg-[#e8d9c5] border-2 border-dashed border-[#d4c0a1] rounded-lg transform -rotate-2 opacity-70"></div>
        <div className="absolute bottom-32 left-20 w-10 h-10 bg-[#d4c0a1] border-2 border-dashed border-[#c8b69d] rounded-lg transform rotate-6 opacity-60"></div>
      </motion.div>

      <style jsx global>{`
        @import url(' https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap');
        
        .font-handwritten {
          font-family: 'Dancing Script', cursive;
        }
        
        .font-sans {
          font-family: 'Quicksand', sans-serif;
        }
        
        body {
          -webkit-tap-highlight-color: transparent;
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: #d4c0a1 #f8f3e6;
        }
        
        *::-webkit-scrollbar {
          width: 8px;
        }
        
        *::-webkit-scrollbar-track {
          background: #f8f3e6;
        }
        
        *::-webkit-scrollbar-thumb {
          background-color: #d4c0a1;
          border-radius: 10px;
          border: 2px solid #f8f3e6;
        }
      `}</style>
    </div>
  );
};

export default App;