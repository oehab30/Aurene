import React from 'react';
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  material: string;
  color: string;
  image: string;
  stock: number;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="group relative flex flex-col bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2"
    >
      {/* Image Container with Actions */}
      <div className="relative aspect-4/5 overflow-hidden bg-gray-50 dark:bg-[#151515]">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {[
            { icon: Heart, label: 'Wishlist' },
            { icon: ShoppingCart, label: 'Add to Cart' },
            { icon: Eye, label: 'Quick View' }
          ].map((action, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white dark:bg-white text-black rounded-full shadow-xl"
              title={action.label}
            >
              <action.icon className="w-5 h-5" />
            </motion.button>
          ))}
        </div>

        {/* Tag */}
        <div className="absolute top-4 left-4">
           <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-black dark:text-white rounded-full border border-black/5 dark:border-white/10">
             {product.category}
           </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col items-center text-center">
        <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">
          Auréne Premium
        </h3>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
          {product.name}
        </h2>
        <p className="text-2xl font-light text-gray-900 dark:text-white flex items-center gap-2">
          <span className="text-sm font-bold text-orange-500">$</span>
          {product.price.toLocaleString()}
        </p>
        
        <div className="mt-6 w-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
           <button className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold tracking-widest uppercase active:scale-[0.98] transition-all">
              View Details
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
