import React from 'react';
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useNavigate } from "react-router-dom";

function BestSellers() {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const products = [
    { id: "bs1", image: "/home-pic/BS-1.png", title: "Classic Gold Watch", price: 2450, category: "Accessories" },
    { id: "bs2", image: "/home-pic/BS-2.png", title: "Midnight Chronograph", price: 3450, category: "Chronographs" },
    { id: "bs3", image: "/home-pic/BS-3.png", title: "Luxe Series III", price: 2000, category: "Limited" },
    { id: "bs4", image: "/home-pic/BS-4.png", title: "Aurum Executive", price: 2000, category: "Signature" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image
      });
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-center text-4xl font-bold mb-16 text-gray-900 dark:text-white transition-colors duration-500"> Best Sellers</h1>
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            className="group relative flex flex-col bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2"
          >
            {/* Image Container with Actions */}
            <div className="relative aspect-4/5 overflow-hidden bg-gray-50 dark:bg-[#151515]">
              <motion.img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleWishlist(product)}
                    className={`p-3 rounded-full shadow-xl transition-colors ${isInWishlist(product.id) ? 'bg-orange-500 text-white' : 'bg-white text-black hover:text-orange-500'}`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAddToCart(product)}
                    className="p-3 bg-white text-black hover:text-orange-500 rounded-full shadow-xl transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(`/Shop/all`)}
                    className="p-3 bg-white text-black hover:text-orange-500 rounded-full shadow-xl transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </motion.button>
              </div>

              {/* Tag */}
              <div className="absolute top-4 left-4">
                 <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-black dark:text-white rounded-full border border-black/5 dark:border-white/10">
                   {product.category}
                 </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col items-center text-center">
              <h3 className="text-gray-400 dark:text-gray-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">
                Auréne Premium
              </h3>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors line-clamp-1">
                {product.title}
              </h2>
              <p className="text-xl font-light text-gray-900 dark:text-white flex items-center gap-1">
                <span className="text-xs font-bold text-orange-500">$</span>
                {product.price.toLocaleString()}
              </p>
              
              <div className="mt-6 w-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                 <button 
                  onClick={() => navigate(`/Shop/all`)}
                  className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold tracking-widest uppercase active:scale-[0.98] transition-all"
                 >
                    View Details
                 </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default BestSellers;
