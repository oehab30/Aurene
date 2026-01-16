import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Eye, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { productService } from "@/services/productService";

import { useShopStore } from "@/store/useShopStore";

const ITEMS_PER_PAGE = 8;

function ShopProductGrid() {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const { filters } = useShopStore();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  // Filter and Sort Logic
  const filteredProducts = React.useMemo(() => {
    if (!products) return [];

    let result = [...products];

    // 1. Category Filter
    if (filters.category) {
      result = result.filter(product => 
        product.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    // 2. Price Filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter(product => 
        product.price >= min && product.price <= max
      );
    }

    // 3. Material Filter
    if (filters.material && filters.material.length > 0) {
      result = result.filter(product => 
        filters.material.includes(product.material)
      );
    }

    // 4. Color Filter
    if (filters.color) {
      result = result.filter(product => 
        product.color === filters.color
      );
    }

    // 5. Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming createdAt exists and is sortable, or use another field. 
        // If createdAt is missing, might need to adjust or default to API order.
        if (result[0]?.createdAt) {
             result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        break;
      case 'rating': 
        // Placeholder for rating sort if added later
        break;
      default:
        break;
    }

    return result;
  }, [products, filters]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleWishlist = (product: any) => {
    if (isInWishlist(product._id || product.id)) {
      removeFromWishlist(product._id || product.id);
    } else {
      addToWishlist({
        id: product._id || product.id,
        title: product.title || product.name,
        price: product.price,
        image: product.imageUrl || product.image
      });
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product._id || product.id,
      title: product.title || product.name,
      price: product.price,
      image: product.imageUrl || product.image,
      quantity: 1
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );
  }

  if (isError) {
     return (
        <div className="flex justify-center items-center h-64 text-red-500">
          Failed to load products.
        </div>
      );
  }

  // Generate dynamic heading based on filters
  const getCollectionHeading = () => {
    const parts: string[] = [];
    
    if (filters.category) {
      parts.push(filters.category);
    }
    
    if (filters.color) {
      parts.push(filters.color);
    }
    
    if (filters.material && filters.material.length > 0) {
      if (filters.material.length === 1) {
        parts.push(filters.material[0]);
      } else {
        parts.push(`${filters.material.length} Materials`);
      }
    }
    
    if (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000)) {
      parts.push(`$${filters.priceRange[0]} - $${filters.priceRange[1]}`);
    }
    
    if (parts.length === 0) {
      return "Our Collection";
    }
    
    return parts.join(" · ");
  };

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <motion.h1 
        key={getCollectionHeading()} // Re-animate when heading changes
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-500"
      >
        {getCollectionHeading()}
      </motion.h1>
      
      {/* Subtitle showing filter count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center text-sm text-gray-500 dark:text-gray-400 mb-16"
      >
        {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
      </motion.p>
      
      {currentProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 dark:text-gray-400">No products found matching your criteria.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {currentProducts.map((product) => (
              <motion.div
                key={product._id || product.id}
                variants={itemVariants}
                className="group relative flex flex-col bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2"
              >
                {/* Image Container with Actions */}
                <div className="relative aspect-4/5 overflow-hidden bg-gray-50 dark:bg-[#151515]">
                  <motion.img
                    src={product.imageUrl || product.image || 'https://via.placeholder.com/300'}
                    alt={product.title || product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleWishlist(product)}
                        className={`p-3 rounded-full shadow-xl transition-colors ${isInWishlist(product._id || product.id) ? 'bg-orange-500 text-white' : 'bg-white text-black hover:text-orange-500'}`}
                      >
                        <Heart className={`w-5 h-5 ${isInWishlist(product._id || product.id) ? 'fill-current' : ''}`} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAddToCart(product)}
                        className="p-3 bg-white text-black hover:text-orange-500 rounded-full shadow-xl transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(`/shop/${product.category}`)} // Or specific product link
                        className="p-3 bg-white text-black hover:text-orange-500 rounded-full shadow-xl transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                  </div>

                  {/* Tag */}
                  <div className="absolute top-4 left-4">
                     <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-black dark:text-white rounded-full border border-black/5 dark:border-white/10">
                       {product.category}
                     </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col items-center text-center">
                  <h3 className="text-gray-400 dark:text-gray-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">
                    Auréne Premium
                  </h3>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors line-clamp-1">
                    {product.title || product.name}
                  </h2>
                  <p className="text-xl font-light text-gray-900 dark:text-white flex items-center gap-1">
                    <span className="text-xs font-bold text-orange-500">$</span>
                    {product.price.toLocaleString()}
                  </p>
                  
                  <div className="mt-6 w-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                     <button 
                      onClick={() => navigate(`/shop/${product.category}`)}
                      className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold tracking-widest uppercase active:scale-[0.98] transition-all"
                     >
                        View Details
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 bg-white dark:bg-white/10 rounded-full shadow-md text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-500 hover:text-white transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      currentPage === page
                        ? 'bg-orange-500 text-white shadow-lg scale-110'
                        : 'bg-white dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 bg-white dark:bg-white/10 rounded-full shadow-md text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-500 hover:text-white transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ShopProductGrid;
