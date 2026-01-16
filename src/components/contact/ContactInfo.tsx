import React from "react";
import { Mail, Phone, MapPin, Clock, Globe, Instagram, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const infoItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 000-0000",
    description: "Mon-Fri from 9am to 6pm.",
  },
  {
    icon: Mail,
    label: "Email",
    value: "concierge@aurene.com",
    description: "We'll respond within 24 hours.",
  },
  {
    icon: MapPin,
    label: "Boutique",
    value: "123 luxury Ave, Fashion District",
    description: "New York, NY 10001",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "10:00 AM - 8:00 PM",
    description: "Open every day of the week.",
  },
];

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
        <p className="text-gray-400 max-w-sm">
          Experience the pinnacle of service. Our team is dedicated to providing
          you with an unparalleled experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {infoItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-orange-500/70 uppercase tracking-widest mb-1">
                  {item.label}
                </p>
                <p className="text-white font-semibold mb-1">{item.value}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-8 border-t border-white/10">
        <p className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-widest">Connect with us</p>
        <div className="flex gap-4">
          {[Instagram, Twitter, Linkedin, Globe].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ y: -3, scale: 1.1 }}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-orange-400 hover:border-orange-500/30 transition-all"
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
