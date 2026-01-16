'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid'
import Priceslide from './Priceslide'
import Color from './color'
import { motion, AnimatePresence } from 'framer-motion'
import { useShopStore } from '@/store/useShopStore'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import { extractUniqueCategories, extractUniqueMaterials } from '@/utils/filterUtils'

export default function DesktopFilters() {
  const { filters: activeFilters, setCategory, toggleMaterial } = useShopStore();
  
  // Fetch products to generate dynamic filters
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });
  
  // Generate dynamic filter options
  const dynamicCategories = extractUniqueCategories(products);
  const dynamicMaterials = extractUniqueMaterials(products);
  
  const materialFilters = [{
    id: 'Material',
    name: 'Material',
    options: dynamicMaterials
  }];

  return (
    <motion.form
      className="hidden lg:block space-y-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Discovery</h3>
        <button 
          type="button"
          onClick={() => useShopStore.getState().resetFilters()}
          className="text-[10px] text-orange-500 font-bold uppercase tracking-widest hover:underline"
        >
          Reset
        </button>
      </div>
      
      {/* Categories */}
      <div className="space-y-4 border-b border-gray-100 dark:border-white/10 pb-8">
        <ul className="space-y-4 text-sm font-medium text-gray-700 dark:text-gray-300">
          <li>
            <button
              type="button"
              onClick={() => setCategory(null)}
              className={`transition-colors duration-200 block text-left w-full ${!activeFilters.category ? 'text-orange-500 font-bold' : 'hover:text-orange-500'}`}
            >
              All Collections
            </button>
          </li>
          {dynamicCategories.map((category) => (
            <li key={category.name}>
              <button
                type="button"
                onClick={() => setCategory(category.name.trim())}
                className={`transition-colors duration-200 block text-left w-full ${activeFilters.category === category.name.trim() ? 'text-orange-500 font-bold' : 'hover:text-orange-500'}`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <Disclosure as="div" defaultOpen className="border-b border-gray-100 dark:border-white/10 py-8">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-left uppercase">
                <span className="font-bold tracking-widest text-gray-900 dark:text-gray-200">Price Range</span>
                <span className="ml-6 flex items-center">
                  <PlusIcon className={`w-4 h-4 ${open ? 'hidden' : 'block'}`} />
                  <MinusIcon className={`w-4 h-4 ${open ? 'block' : 'hidden'}`} />
                </span>
              </DisclosureButton>
            </h3>
            <AnimatePresence>
              {open && (
                <DisclosurePanel static>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6">
                      <Priceslide />
                    </div>
                  </motion.div>
                </DisclosurePanel>
              )}
            </AnimatePresence>
          </>
        )}
      </Disclosure>

      {/* Color Palette */}
      <Disclosure as="div" defaultOpen className="border-b border-gray-100 dark:border-white/10 py-8">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-left uppercase">
                <span className="font-bold tracking-widest text-gray-900 dark:text-gray-200">Color Palette</span>
                <span className="ml-6 flex items-center">
                  <PlusIcon className={`w-4 h-4 ${open ? 'hidden' : 'block'}`} />
                  <MinusIcon className={`w-4 h-4 ${open ? 'block' : 'hidden'}`} />
                </span>
              </DisclosureButton>
            </h3>
            <AnimatePresence>
              {open && (
                <DisclosurePanel static>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6">
                      <Color />
                    </div>
                  </motion.div>
                </DisclosurePanel>
              )}
            </AnimatePresence>
          </>
        )}
      </Disclosure>

      {/* material filters */}
      {materialFilters.map((section) => (
        <Disclosure key={section.id} as="div" defaultOpen className="border-b border-gray-100 dark:border-white/10 py-8">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-left uppercase">
                  <span className="font-bold tracking-widest text-gray-900 dark:text-gray-200">{section.name}</span>
                  <span className="ml-6 flex items-center">
                    <PlusIcon className={`w-4 h-4 ${open ? 'hidden' : 'block'}`} />
                    <MinusIcon className={`w-4 h-4 ${open ? 'block' : 'hidden'}`} />
                  </span>
                </DisclosureButton>
              </h3>

              <AnimatePresence>
                {open && (
                  <DisclosurePanel static>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center gap-3">
                            <input
                              checked={activeFilters.material.includes(option.value)}
                              onChange={() => toggleMaterial(option.value)}
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 dark:border-white/20 text-orange-500 focus:ring-orange-500 bg-white dark:bg-black transition-all cursor-pointer"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className={`text-sm cursor-pointer transition-colors ${activeFilters.material.includes(option.value) ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </DisclosurePanel>
                )}
              </AnimatePresence>
            </>
          )}
        </Disclosure>
      ))}
    </motion.form>
  )
}
