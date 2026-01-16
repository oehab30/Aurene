import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function Featuredcollection() {
  const collections = [
    { title: "Watchmaker's Art", image: "/home-pic/FC-1.png", tag: "Limited" },
    { title: "Pure Silver", image: "/home-pic/FC-2.png", tag: "Jewelry" },
    { title: "Italian Leather", image: "/home-pic/FC-3.png", tag: "Essential" },
  ];

  return (
    <section className="py-24 px-4 bg-white dark:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px]">Curation Selection</span>
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-none">
            Featured <br /> <span className="font-outline-2 text-transparent dark:text-transparent border-gray-900 dark:border-white">Collections</span>
          </h2>
        </div>

        {/* Collection Container */}
        <div className="flex gap-6 w-full overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide
                        md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">

          {collections.map((col, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center relative group overflow-hidden rounded-[2.5rem] bg-gray-100 dark:bg-[#111111]"
            >
              <div className="aspect-4/5 w-full relative">
                <img
                  src={col.image}
                  alt={col.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                   <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-left">
                     <span className="text-orange-500 font-bold uppercase tracking-widest text-[10px]">{col.tag}</span>
                     <h3 className="text-2xl font-bold text-white tracking-tight">{col.title}</h3>
                     
                     <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-4">
                        <Link to="/Shop/all" className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-[10px] group/link">
                          Explore Series
                          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md group-hover/link:bg-orange-500 transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </Link>
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Featuredcollection;
