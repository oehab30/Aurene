'use client'

import { Dialog, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid'
import Priceslide from './Priceslide'
import Color from './color'
import { subCategories, filters } from './data'
import { useShopStore } from '@/store/useShopStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function MobileFilters({ mobileFiltersOpen, setMobileFiltersOpen }: { mobileFiltersOpen: boolean; setMobileFiltersOpen: (v: boolean) => void }) {
  const { filters: activeFilters, setCategory, toggleMaterial } = useShopStore();

  return (
    <AnimatePresence>
      {mobileFiltersOpen && (
        <Dialog 
          static
          open={mobileFiltersOpen} 
          onClose={setMobileFiltersOpen} 
          className="relative z-100 lg:hidden"
        >
          {/* Background overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
            aria-hidden="true" 
          />

          <div className="fixed inset-0 z-40 flex">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="ml-auto relative flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-[#0f0f0f] pt-4 pb-6 shadow-2xl transition-colors duration-500"
            >
              <div className="flex items-center justify-between px-6 pt-2 pb-4 border-b border-gray-100 dark:border-white/10">
                <h2 className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white uppercase">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <form className="mt-4 px-6 space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <h3 className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mb-4">Collections</h3>
                  <ul className="space-y-4">
                    <li>
                      <button
                        type="button"
                        onClick={() => { setCategory(null); setMobileFiltersOpen(false); }}
                        className={`text-sm font-medium transition-colors ${!activeFilters.category ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}
                      >
                        All collections
                      </button>
                    </li>
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <button
                          type="button"
                          onClick={() => { setCategory(category.name.trim()); setMobileFiltersOpen(false); }}
                          className={`text-sm font-medium transition-colors ${activeFilters.category === category.name.trim() ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PRICE FILTER */}
                <Disclosure as="div" defaultOpen className="border-t border-gray-100 dark:border-white/10 pt-8">
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between py-3 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                          <span className="font-bold text-xs uppercase tracking-widest text-gray-900 dark:text-gray-200">Price Range</span>
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

                {/* COLOR FILTER */}
                <Disclosure as="div" defaultOpen className="border-t border-gray-100 dark:border-white/10 pt-8">
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between py-3 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                          <span className="font-bold text-xs uppercase tracking-widest text-gray-900 dark:text-gray-200">Color Palette</span>
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

                {/* DYNAMIC FILTERS */}
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" defaultOpen className="border-t border-gray-100 dark:border-white/10 pt-8">
                     {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <DisclosureButton className="group flex w-full items-center justify-between py-3 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <span className="font-bold text-xs uppercase tracking-widest text-gray-900 dark:text-gray-200">{section.name}</span>
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
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        type="checkbox"
                                        className="h-5 w-5 rounded border-gray-300 dark:border-white/10 text-orange-500 focus:ring-orange-500 bg-gray-50 dark:bg-black/40"
                                      />
                                      <label htmlFor={`filter-mobile-${section.id}-${optionIdx}`} className="text-sm text-gray-600 dark:text-gray-400 font-medium">
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
                
                <div className="pt-6 pb-12">
                   <button 
                    type="button"
                    onClick={() => { useShopStore.getState().resetFilters(); setMobileFiltersOpen(false); }}
                    className="w-full py-4 border border-orange-500 text-orange-500 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition-all"
                   >
                     Reset All
                   </button>
                </div>
              </form>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
