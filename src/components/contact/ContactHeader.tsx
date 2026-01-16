import React from "react";
import { motion } from "framer-motion";

export default function ContactHeader() {
  return (
    <div className="relative text-center mb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-block px-4 py-1.5 mb-6 rounded-full border border-orange-500/20 bg-orange-500/5 backdrop-blur-md"
      >
        <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">
          Concierge Services
        </span>
      </motion.div>
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tighter mb-6">
        Let's Start a <span className="text-orange-500">Conversation.</span>
      </h1>
      <p className="max-w-xl mx-auto text-lg text-gray-500 dark:text-gray-400 font-medium">
        Whether you have a question about our collections or need personalized styling advice, our dedicated team is here to assist you.
      </p>
    </div>
  );
}
