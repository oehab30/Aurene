import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const WishlistHero = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black pt-20">
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/about/wishlisthero.jpg')` }}
      />
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/40 to-transparent" />
      
      <div className="relative z-20 text-center space-y-6 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full backdrop-blur-md"
        >
          <Shield className="w-3 h-3 text-orange-500" />
          <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px]">Private Inventory</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none"
        >
          The <span className="text-transparent font-outline-white">Vault</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-gray-400 text-sm md:text-lg max-w-xl mx-auto font-medium uppercase tracking-widest leading-relaxed"
        >
          Where aspiration meets preservation. Your private selection of Auréne masterpieces.
        </motion.p>
      </div>
    </section>
  );
};

export default WishlistHero;
