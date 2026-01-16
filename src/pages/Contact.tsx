import React from "react";
import ContactHeader from "../components/contact/ContactHeader";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-screen relative overflow-hidden transition-colors duration-500">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/5 dark:bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gray-200/20 dark:bg-white/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:py-32">
        <ContactHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContactInfo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Location Map Section */}
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="mt-24 space-y-8"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-white uppercase">Our Worldwide <span className="text-orange-500">Boutique</span></h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm tracking-widest uppercase">Visit us at our flagship location</p>
          </div>

          <div className="h-[450px] w-full rounded-[3rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-2xl relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.317424611463!2d-73.97825708459377!3d40.75889497932679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f9cfcb250d%3A0xdb570ddcb466874a!2s5th%20Ave%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2seg!4v1710000000000!5m2!1sen!2seg" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true}
              loading="lazy"
              className="grayscale dark:invert dark:hue-rotate-180 opacity-80 contrast-125"
              title="Aurene Flagship Boutique"
            />
            {/* Map Overlay to prevent accidental scrolls */}
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 dark:ring-white/5 shadow-inner" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
