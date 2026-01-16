import React from 'react';
import { motion } from 'framer-motion';

const AboutHeritage = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4 text-left">
            <h2 className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.4em]">Our Heritage</h2>
            <h3 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">
              Born in the <br /> Heart of <span className="text-gray-400">Creation</span>
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
            Founded on the belief that accessories are the punctuation of personal style, Auréne began as a private studio dedicated to the art of the "Perfect Object." Our journey started with a single timepiece and has grown into a global house for those who value substance as much as style.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
            Every Auréne piece is a collaboration between master artisans and visionary designers, ensuring that our heritage of quality remains local while our vision reaches the furthest corners of the world.
          </p>
          <div className="pt-8">
             <button className="px-10 py-5 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all">
               Read Full Editorial
             </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl"
        >
          <img src="/about/heritage.png" alt="Craftsmanship" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHeritage;
