'use client'

import { useState } from 'react'
import { FunnelIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { motion, AnimatePresence } from 'framer-motion'
import MobileFilters from './MobileFilters'
import DesktopFilters from './DesktopFilters'
import SortMenu from './SortMenu'
import ShopProductGrid from './ShopProductGrid'

export default function Categories() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="bg-white dark:bg-[#0a0a0a] transition-colors duration-500 min-h-screen">
      <MobileFilters mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-baseline justify-between border-b border-gray-200 dark:border-white/10 pt-24 pb-10"
        >
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tighter text-gray-900 dark:text-white">
              The <span className="text-orange-500">Collection</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm tracking-widest uppercase">
              Curated Luxury Essentials
            </p>
          </div>

          <div className="flex items-center gap-4">
            <SortMenu />

            <div className="hidden sm:flex items-center bg-gray-100 dark:bg-white/5 rounded-xl p-1 gap-1 border border-gray-200 dark:border-white/10">
              <button type="button" className="p-2 text-gray-900 dark:text-white bg-white dark:bg-white/10 rounded-lg shadow-sm transition-all">
                <Squares2X2Icon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button type="button" className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-300 transition-all">
                <FunnelIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white transition-all"
            >
              <FunnelIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        {/* Product Section */}
        <section aria-labelledby="products-heading" className="pt-12 pb-24">
          <h2 id="products-heading" className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-4">
            {/* Sidebar with staggered fade in */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <DesktopFilters />
            </motion.div>

            {/* Product Grid Container */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <AnimatePresence>
                <div className="space-y-12">
                   <ShopProductGrid />
                </div>
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
