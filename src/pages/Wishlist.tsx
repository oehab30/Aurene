import React, { useEffect, useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
import WishlistHero from "../components/wishlist/WishlistHero";
import WishlistGrid from "../components/wishlist/WishlistGrid";
import WishlistEmpty from "../components/wishlist/WishlistEmpty";

function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMoveToCart = (item: any) => {
    addToCart({ ...item, quantity: 1 });
    removeFromWishlist(item.id);
  };

  return (
    <div className="bg-white dark:bg-[#0a0a0a] transition-colors duration-700 min-h-screen">
      <WishlistHero />

      {/* Grid Content Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 border-b border-gray-100 dark:border-white/5 pb-10 mb-16">
           <div className="flex items-center gap-6">
              <div className="space-y-1">
                 <h2 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">Active Curation</h2>
                 <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{wishlistItems.length} Reserved Objects</p>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-white/10" />
              <button 
                onClick={clearWishlist}
                className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-2 group"
              >
                Clear Archives
                <Trash2 className="w-3 h-3 group-hover:scale-110 transition-transform" />
              </button>
           </div>
        </div>

        {wishlistItems.length > 0 ? (
          <WishlistGrid 
            items={wishlistItems} 
            onRemove={removeFromWishlist} 
            onMoveToCart={handleMoveToCart} 
          />
        ) : (
          <WishlistEmpty />
        )}
      </div>
    </div>
  );
}

export default Wishlist;
