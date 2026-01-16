import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WishlistEmpty = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-40 bg-gray-50/50 dark:bg-white/5 rounded-[5rem] border border-gray-200 dark:border-white/5"
    >
      <div className="w-24 h-24 bg-white dark:bg-black rounded-full flex items-center justify-center mb-8 shadow-2xl relative">
          <Heart className="w-10 h-10 text-gray-200 dark:text-gray-800" />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-orange-500 rounded-full"
          />
      </div>
      <h3 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4">The Vault is Sealed</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto text-center mb-12 uppercase tracking-widest font-bold leading-relaxed">
        Unlock exclusive pieces from our new collection to begin your curation.
      </p>
      <Link to="/Shop/all" className="inline-flex items-center gap-4 px-14 py-6 bg-orange-500 text-white rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(249,115,22,0.3)] hover:bg-orange-600 hover:-translate-y-1.5 transition-all group">
        Begin Exploration
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
      </Link>
    </motion.div>
  );
};

export default WishlistEmpty;
