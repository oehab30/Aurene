import React from 'react'
import CartItem from './CartItem'
import RelatedProducts from './RelatedProducts'
import OrderSummary from './OrderSummary'
import VoucherForm from './VoucherForm'
import { useCart } from '@/context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

function Cartbox() {
  const { cartItems, cartCount } = useCart();

  return (
    <section className="bg-white dark:bg-[#0a0a0a] transition-colors duration-500 pt-32 pb-24 antialiased min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 dark:border-white/5 pb-12 gap-6"
        >
          <div className="space-y-4">
            <Link to="/Shop/all" className="flex items-center gap-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest hover:translate-x-1 transition-transform group">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Return to Catalog
            </Link>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              Shopping <span className="text-orange-500">Bag</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-gray-50 dark:bg-white/5 rounded-full border border-gray-100 dark:border-white/10">
            <ShoppingBag className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">{cartCount} Masterpieces</span>
          </div>
        </motion.div>

        {/* Main Content Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Cart Items List - Span 8 columns */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CartItem
                      id={item.id}
                      title={item.title}
                      image={item.image}
                      quantity={item.quantity}
                      price={item.price}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {cartItems.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center space-y-6 bg-gray-50 dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-white/10"
                >
                  <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-300 dark:text-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">Your bag is empty</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">Discover our latest collection and start building your archival wardrobe.</p>
                  </div>
                  <Link to="/Shop/all" className="px-10 py-4 bg-orange-500 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20">
                    Explore Arrivals
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Related Products - Enhanced styling integration */}
            <div className="pt-12 border-t border-gray-100 dark:border-white/5">
               <RelatedProducts />
            </div>
          </div>

          {/* Sidebar Summary - Span 4 columns */}
          <div className="lg:col-span-4 space-y-8 sticky top-32">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <OrderSummary />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <VoucherForm />
            </motion.div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 flex flex-col items-center text-center gap-2">
                  <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center">
                     <span className="text-orange-500 text-xs font-black italic">A</span>
                  </div>
                  <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Auréne Guarantee</span>
               </div>
               <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 flex flex-col items-center text-center gap-2">
                  <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center">
                     <span className="text-orange-500 text-xs font-black">24</span>
                  </div>
                  <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Global Concierge</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cartbox
