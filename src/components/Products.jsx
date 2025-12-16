
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

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
    y: -10,
    rotate: 0,
    scale: 1.02,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

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

const Products = ({ playSound }) => {
  return (
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
  );
};

export default Products;