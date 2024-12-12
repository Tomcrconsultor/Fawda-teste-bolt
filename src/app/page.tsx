'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import { motion } from 'framer-motion'

// Loading components
const CategoryLoader = () => (
  <div className="animate-pulse py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    </div>
  </div>
)

const MenuLoader = () => (
  <div className="animate-pulse py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-xl aspect-[4/3]"></div>
        ))}
      </div>
    </div>
  </div>
)

// Dynamic imports
const Categories = dynamic(() => import('@/components/Categories'), {
  ssr: false,
  loading: () => <CategoryLoader />
})

const Menu = dynamic(() => import('@/components/Menu'), {
  ssr: false,
  loading: () => <MenuLoader />
})

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Suspense fallback={<CategoryLoader />}>
          <Categories />
        </Suspense>

        <div id="menu" className="scroll-mt-20">
          <Suspense fallback={<MenuLoader />}>
            <Menu />
          </Suspense>
        </div>
      </motion.div>
    </div>
  )
}
