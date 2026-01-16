import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const RelatedProducts: React.FC = () => {
  const relatedProducts = [
    {
      id: 'rp1',
      name: 'Gilded Chronograph',
      category: 'Timepieces',
      price: '$4,150',
      image: '/home-pic/BS-1.png',
    },
    {
      id: 'rp2',
      name: 'Silk Leather Tote',
      category: 'Leather Goods',
      price: '$2,800',
      image: '/home-pic/BS-2.png',
    },
    {
      id: 'rp3',
      name: 'Midnight Series VIII',
      category: 'Limited Edition',
      price: '$5,900',
      image: '/home-pic/BS-3.png',
    },
  ]

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Complementary Pieces</h3>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">Curated based on your selection</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-6 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/5 hover:-translate-y-1"
          >
            <div className="aspect-square w-full mb-6 overflow-hidden rounded-3xl bg-gray-50 dark:bg-[#151515]">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={product.image}
                alt={product.name}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest">{product.category}</span>
                <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tighter">{product.name}</h4>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{product.price}</p>
                <button className="w-10 h-10 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center transition-all hover:bg-orange-500 active:scale-90">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
