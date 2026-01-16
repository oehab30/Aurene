import React from 'react';
import { motion } from 'framer-motion';

const AboutMaterials = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:order-2 relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl"
        >
          <img src="/about/materials.png" alt="Luxury Materials" className="w-full h-full object-cover" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:order-1 space-y-8 text-left"
        >
           <div className="space-y-4">
            <h2 className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.4em]">Sourcing Ethics</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">
              Materials of <br /> <span className="text-gray-400">Absolute Intent</span>
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
            We believe luxury should have a soul. That's why every ounce of gold, every millimeter of leather, and every silk thread is sourced with absolute transparency. We work directly with certified suppliers to ensure ethical mining and fair labor practices.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
             <div className="space-y-2">
                <h4 className="text-sm font-black dark:text-white uppercase tracking-widest">Certified 24K</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Recycled Gold Sourcing</p>
             </div>
             <div className="space-y-2">
                <h4 className="text-sm font-black dark:text-white uppercase tracking-widest">Zero Impact</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Eco-conscious Tanning</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMaterials;
