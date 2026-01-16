import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';
import ProductCard from './ProductCard';
import type { Product } from './ProductCard';
import { useShopStore } from '@/store/useShopStore';
import { Loader2, PackageX } from 'lucide-react';

const ProductGrid = () => {
  const { filters } = useShopStore();

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products', filters],
    queryFn: async () => {
      // Build query string for JSON Server
      let url = '/products';
      const params = new URLSearchParams();
      
      if (filters.category) params.append('category', filters.category);
      if (filters.color) params.append('color', filters.color);
      
      const queryString = params.toString();
      const response = await api.get(queryString ? `${url}?${queryString}` : url);
      let data = response.data;

      // Client-side filtering for things JSON server might not handle well out of box 
      // (like multiple materials or exact price ranges without complex query syntax)
      data = data.filter((p: Product) => {
        const matchesMaterial = filters.material.length === 0 || filters.material.includes(p.material);
        const matchesPrice = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
        return matchesMaterial && matchesPrice;
      });

      // Sorting
      if (filters.sortBy === 'low-high') data.sort((a: Product, b: Product) => a.price - b.price);
      if (filters.sortBy === 'high-low') data.sort((a: Product, b: Product) => b.price - a.price);
      if (filters.sortBy === 'newest') data.sort((a: Product, b: Product) => parseInt(b.id) - parseInt(a.id));

      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        <p className="text-gray-500 animate-pulse tracking-widest uppercase text-xs">Loading Collections...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Failed to load luxury collection. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {products && products.length > 0 ? (
          <motion.div
            key="grid"
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <PackageX className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No items found</h3>
            <p className="text-gray-500 max-w-xs">Adjust your filters to discover other pieces from our collection.</p>
            <button 
              onClick={() => useShopStore.getState().resetFilters()}
              className="mt-6 text-orange-500 font-bold hover:underline"
            >
              Reset all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;
