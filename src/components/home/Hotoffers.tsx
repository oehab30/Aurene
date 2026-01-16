import React from "react";
import { motion } from "framer-motion";
import { Flame, Star, Zap, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

function Hotoffers() {
  const { addToCart } = useCart();

  const products = [
    {
      id: "ho1",
      name: "Diamond Jewelry",
      description: "Sparkling beauty that captivates",
      oldPrice: 12000,
      newPrice: 5999,
      image: "/home-pic/HO-1.png",
      tag: "Limited",
      icon: Star,
      buttonColor: "#9333EA",
    },
    {
      id: "ho2",
      name: "Gold Necklace",
      description: "Pure elegance for every moment",
      oldPrice: 9000,
      newPrice: 4500,
      image: "/home-pic/HO-2.png",
      tag: "Hot",
      icon: Flame,
      buttonColor: "#EAB308",
    },
    {
      id: "ho3",
      name: "Silver Ring",
      description: "Timeless and modern style",
      oldPrice: 2500,
      newPrice: 1299,
      image: "/home-pic/HO-3.png",
      tag: "Discovery",
      icon: Zap,
      buttonColor: "#3B82F6",
    },
  ];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      title: product.name,
      price: product.newPrice,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-4">
          <div className="space-y-2">
             <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-none">
               Exclusive <span className="text-orange-500">Promotions</span>
             </h2>
             <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest">Selected Masterpieces for the Discerning</p>
          </div>
        </div>

        {/* MOBILE SWIPE CONTAINER / DESKTOP GRID */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="w-[300px] sm:w-[350px] md:w-[400px] lg:w-auto shrink-0 snap-center relative rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#111111] shadow-2xl transition-all duration-500 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Image */}
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full border border-black/5 dark:border-white/10 shadow-sm">
                   <product.icon className="w-3 h-3 text-orange-500" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white">{product.tag}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{product.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium line-clamp-1">{product.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-white/5">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through font-medium">${product.oldPrice.toLocaleString()}</span>
                    <span className="text-2xl font-black text-orange-500">${product.newPrice.toLocaleString()}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAddToCart(product)}
                    style={{ backgroundColor: product.buttonColor }}
                    className="w-12 h-12 text-white rounded-full flex items-center justify-center shadow-lg transition-transform text-2xl font-bold"
                  >
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hotoffers;
