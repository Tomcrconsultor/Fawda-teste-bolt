"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu as MenuIcon, X } from 'lucide-react';
import DynamicDiv from './DynamicDiv';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <DynamicDiv className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DynamicDiv className="flex justify-between h-16">
          <DynamicDiv className="flex items-center">
            {/* Menu Mobile Button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-emerald-600 ml-2 md:ml-0">
              SiriaExpress
            </Link>

            {/* Desktop Menu */}
            <DynamicDiv className="hidden md:flex md:items-center md:space-x-8 ml-8">
              <Link 
                href="/#menu" 
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Cardápio
              </Link>
              <Link 
                href="/sobre" 
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Sobre
              </Link>
              <Link 
                href="/contato" 
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Contato
              </Link>
            </DynamicDiv>
          </DynamicDiv>

          {/* Actions */}
          <DynamicDiv className="flex items-center space-x-4">
            <button 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
              aria-label="Carrinho de compras"
            >
              <ShoppingCart className="h-6 w-6" />
            </button>
            <Link 
              href="/login" 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
              aria-label="Área do usuário"
            >
              <User className="h-6 w-6" />
            </Link>
          </DynamicDiv>
        </DynamicDiv>
      </DynamicDiv>

      {/* Mobile Menu */}
      <DynamicDiv
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <DynamicDiv className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/#menu"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
          >
            Cardápio
          </Link>
          <Link
            href="/sobre"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
          >
            Sobre
          </Link>
          <Link
            href="/contato"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
          >
            Contato
          </Link>
        </DynamicDiv>
      </DynamicDiv>
    </nav>
  );
}