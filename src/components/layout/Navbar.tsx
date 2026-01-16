import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Darkmode from "./Darkmode";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    // Check admin status whenever location changes
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/Shop/all" },
    { name: "About", path: "/About" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`fixed w-full z-100 transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden p-2 -ml-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter uppercase text-gray-900 dark:text-white transition-colors duration-500">Auréne</span>
          <div className="hidden lg:block w-1.5 h-1.5 bg-orange-500 rounded-full" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:text-orange-500 ${location.pathname === link.path ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/Wishlist" className="relative p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[8px] font-black flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>
          
          <Link 
            to={isAdmin ? "/dashboard" : "/Login"} 
            className="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
            title={isAdmin ? "Dashboard" : "Login"}
          >
            <User className="w-5 h-5" />
          </Link>
          
          <Link to="/Cart" className="relative p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[8px] font-black flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-200 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-full max-w-xs bg-white dark:bg-[#0f0f0f] z-201 lg:hidden shadow-2xl flex flex-col p-8 transition-colors duration-500"
            >
              <div className="flex items-center justify-between mb-16">
                <span className="text-xl font-black tracking-tighter uppercase text-gray-900 dark:text-white">Auréne</span>
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      to={link.path}
                      className={`text-2xl font-black uppercase tracking-tighter ${location.pathname === link.path ? 'text-orange-500' : 'text-gray-900 dark:text-white'}`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100 dark:border-white/5 space-y-6">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Theme Adjustment</span>
                   <Darkmode />
                </div>
                <button className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all">
                  Join the Membership
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;