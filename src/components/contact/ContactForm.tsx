import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
    >
      <form action="#" method="POST" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="first-name" className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              First name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="Alexander"
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all outline-none placeholder:text-gray-600"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="last-name" className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Last name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Vance"
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all outline-none placeholder:text-gray-600"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="alex@lux.com"
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all outline-none placeholder:text-gray-600"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Your Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="How can our concierge assist you today?"
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all outline-none placeholder:text-gray-600 resize-none"
          />
        </div>

        <button
          type="submit"
          className="group w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Send Message</span>
          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </form>
    </motion.div>
  );
}
