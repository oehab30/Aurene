import React from 'react'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import { Trash2, Minus, Plus, Heart } from 'lucide-react'

interface CartItemProps {
  id: string
  title: string
  image: string
  quantity: number
  price: number
}

const CartItem: React.FC<CartItemProps> = ({ id, title, image, quantity, price }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="relative group bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-4 md:p-6 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/5">
      <div className="flex flex-col md:flex-row items-center gap-8">
        
        {/* Product Image Panel */}
        <div className="relative aspect-square w-full md:w-32 lg:w-40 shrink-0 overflow-hidden rounded-3xl bg-gray-50 dark:bg-[#151515]">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={image}
            alt={title}
          />
        </div>

        {/* Product Details Section */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Handcrafted Series</span>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none group-hover:text-orange-500 transition-colors">
                {title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">Ref. No: AUR-{id.slice(0, 4)} — Limited Release</p>
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center justify-end gap-1">
                <span className="text-sm font-bold text-orange-500">$</span>
                {price.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-100 dark:bg-white/5 w-full mt-auto" />

          {/* Controls & Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
            
            {/* Elegant Quantity Controls */}
            <div className="flex items-center bg-gray-50 dark:bg-white/5 p-1 rounded-2xl border border-gray-100 dark:border-white/5">
              <button
                type="button"
                onClick={() => updateQuantity(id, Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-white/10 text-gray-400 hover:text-orange-500 transition-all active:scale-90"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-sm font-black text-gray-900 dark:text-white tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(id, quantity + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-white/10 text-gray-400 hover:text-orange-500 transition-all active:scale-90"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-orange-500 rounded-2xl transition-all"
                title="Save for later"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeFromCart(id)}
                className="p-3 bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all"
                title="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
