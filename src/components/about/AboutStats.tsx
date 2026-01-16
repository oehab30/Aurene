import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Globe, ShieldCheck } from 'lucide-react';

const AboutStats = () => {
  const stats = [
    { label: 'Master Artisans', value: '40+', icon: Users },
    { label: 'Design Awards', value: '12', icon: Award },
    { label: 'Global Boutiques', value: '24', icon: Globe },
    { label: 'Quality Guarantee', value: '100%', icon: ShieldCheck },
  ];

  return (
    <section className="bg-gray-50 dark:bg-white/5 py-24 px-6 transition-colors">
       <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 bg-white dark:bg-black rounded-2xl flex items-center justify-center shadow-lg">
                <stat.icon className="w-8 h-8 text-orange-500" />
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-black text-gray-900 dark:text-white tabular-nums">{stat.value}</span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            </motion.div>
          ))}
       </div>
    </section>
  );
};

export default AboutStats;
