
import React from 'react';
import { ShieldCheck, WheatOff } from 'lucide-react';

const Footer = ({ playSound }) => {
  return (
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
          © {new Date().getFullYear()} Date el gusto sin TACC. Todos los productos son elaborados en un ambiente 100% libre de trigo, avena, cebada y centeno.
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
  );
};

export default Footer;