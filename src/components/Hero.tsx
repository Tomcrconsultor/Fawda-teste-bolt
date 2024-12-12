"use client"

import React from 'react';
import Image from 'next/image';
import DynamicDiv from './DynamicDiv';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const STORAGE_URL = "https://vobaklixhkvwmmmpajeb.supabase.co/storage/v1/object/public/menu-images";

export default function Hero() {
  const scrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const menu = document.getElementById('menu');
    if (menu) {
      menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <DynamicDiv className="relative bg-gradient-to-r from-emerald-800 to-emerald-600 text-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={`${STORAGE_URL}/pao-sirio.jpg`}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Decorative Food Images */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, x: -100 }}
          animate={{ opacity: 0.6, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full overflow-hidden"
        >
          <Image
            src={`${STORAGE_URL}/kibe-carne.jpg`}
            alt="Kibe de Carne"
            fill
            className="object-cover"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 0.6, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full overflow-hidden"
        >
          <Image
            src={`${STORAGE_URL}/pasta-alho.jpg`}
            alt="Pasta de Alho"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Content */}
      <DynamicDiv className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <DynamicDiv className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Sabores Autênticos <br className="hidden md:block" />
            da Síria
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 text-emerald-50"
          >
            Descubra o verdadeiro sabor da culinária síria, preparada com ingredientes frescos e receitas tradicionais
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center gap-8"
          >
            <motion.a
              href="#menu"
              onClick={scrollToMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-emerald-800 px-8 py-4 rounded-lg text-lg font-medium hover:bg-emerald-50 transition-colors duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              Ver Cardápio
            </motion.a>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-white/80 cursor-pointer"
              onClick={scrollToMenu}
            >
              <ChevronDown size={32} />
            </motion.div>
          </motion.div>
        </DynamicDiv>
      </DynamicDiv>
    </DynamicDiv>
  );
}