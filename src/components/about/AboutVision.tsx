import React from 'react';
import { motion } from 'framer-motion';

const AboutVision = () => {
  return (
    <section className="py-24 px-6 text-center max-w-4xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.5em]">The Vision</h2>
          <p className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tighter uppercase">
            "We don't build collections. We curate artifacts for the modern human experience."
          </p>
        </motion.div>
        
        <div className="pt-6">
           <span className="text-orange-500 font-black italic text-xl">Auréne</span>
        </div>
    </section>
  );
};

export default AboutVision;
