
import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = ({ yRange }) => {
  return (
    <motion.div
      style={{ y: yRange }}
      className="fixed top-0 left-0 w-full pointer-events-none z-0"
    >
      <div className="absolute top-20 left-10 w-16 h-16 bg-[#e8d9c5] border-2 border-dashed border-[#d4c0a1] rounded-lg transform rotate-3 opacity-70"></div>
      <div className="absolute top-40 right-10 w-12 h-12 bg-[#e8d9c5] border-2 border-dashed border-[#d4c0a1] rounded-lg transform -rotate-2 opacity-70"></div>
      <div className="absolute bottom-32 left-20 w-10 h-10 bg-[#d4c0a1] border-2 border-dashed border-[#c8b69d] rounded-lg transform rotate-6 opacity-60"></div>
    </motion.div>
  );
};

export default FloatingElements;