"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Coffee, Pizza, Sandwich, ShoppingBag, Cookie, UtensilsCrossed } from 'lucide-react';

const categories = [
  {
    id: 'combos',
    name: 'Combos',
    icon: ShoppingBag,
    description: 'Combinações especiais para todas as ocasiões'
  },
  {
    id: 'lanches',
    name: 'Lanches',
    icon: Sandwich,
    description: 'Deliciosos lanches árabes tradicionais'
  },
  {
    id: 'pastas',
    name: 'Pastas',
    icon: UtensilsCrossed,
    description: 'Pastas e patês artesanais'
  },
  {
    id: 'salgados',
    name: 'Salgados',
    icon: Pizza,
    description: 'Salgados típicos da culinária síria'
  },
  {
    id: 'doces-sirios',
    name: 'Doces Sírios',
    icon: Cookie,
    description: 'Doces tradicionais da Síria'
  },
  {
    id: 'mercado-sirio',
    name: 'Mercado Sírio',
    icon: Utensils,
    description: 'Produtos importados e especiarias'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Ajuste para o header fixo
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-gray-50" id="categories">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossas Categorias
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nossa seleção de pratos e produtos autênticos da culinária síria
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                variants={item}
                onClick={() => scrollToSection(category.id)}
                className={`relative overflow-hidden rounded-xl aspect-square group transition-all duration-300 ${
                  activeCategory === category.id 
                    ? 'bg-emerald-50 border-emerald-500 shadow-lg scale-105' 
                    : 'bg-white hover:bg-emerald-50 border-gray-100 hover:scale-105'
                } border-2`}
              >
                <motion.div 
                  className="absolute inset-0 flex flex-col items-center justify-center p-4"
                  initial={false}
                  animate={{ scale: activeCategory === category.id ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className={`h-8 w-8 mb-3 ${
                    activeCategory === category.id ? 'text-emerald-600' : 'text-emerald-500 group-hover:text-emerald-600'
                  }`} />
                  <span className={`text-sm font-medium text-center mb-2 ${
                    activeCategory === category.id ? 'text-emerald-900' : 'text-gray-900'
                  }`}>
                    {category.name}
                  </span>
                  <span className="text-xs text-gray-500 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {category.description}
                  </span>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

