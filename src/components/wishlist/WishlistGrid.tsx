import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trash2, ShoppingBag } from 'lucide-react';

interface WishlistItemProps {
  item: any;
  index: number;
  onRemove: (id: string) => void;
  onMoveToCart: (item: any) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ item, index, onRemove, onMoveToCart }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group"
    >
      <div className="relative bg-[#fbfbfb] dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[3rem] p-4 transition-all duration-700 hover:shadow-2xl hover:shadow-orange-500/5 group-hover:bg-white dark:group-hover:bg-[#111]">
        
        {/* Visual Asset */}
        <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-gray-50 dark:bg-black/20">
          <img
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            src={item.image}
            alt={item.title}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Metadata Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
             <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black text-orange-500 uppercase tracking-[0.2em]">
                   <Sparkles className="w-2.5 h-2.5" />
                   Archival Tier
                </span>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">OBJ_{item.id.slice(0, 4)}</span>
             </div>
             <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-[0.9] group-hover:text-orange-500 transition-colors">
               {item.title}
             </h3>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5">
            <div className="flex flex-col">
               <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Valuation</span>
               <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">${item.price.toLocaleString()}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => onRemove(item.id)}
                className="p-4 bg-gray-100 dark:bg-white/5 text-gray-400 hover:text-red-500 rounded-2xl transition-all"
                title="Purge Object"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onMoveToCart(item)}
                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-orange-500 hover:text-white transition-all shadow-xl shadow-black/5 active:scale-95"
              >
                Stage to Bag
                <ShoppingBag className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface WishlistGridProps {
  items: any[];
  onRemove: (id: string) => void;
  onMoveToCart: (item: any) => void;
}

const WishlistGrid: React.FC<WishlistGridProps> = ({ items, onRemove, onMoveToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <WishlistItem 
            key={item.id} 
            item={item} 
            index={index} 
            onRemove={onRemove} 
            onMoveToCart={onMoveToCart} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WishlistGrid;
