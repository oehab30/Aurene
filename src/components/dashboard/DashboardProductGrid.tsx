import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Eye, TrendingUp } from 'lucide-react';

interface Product {
  _id?: string;
  id?: string | number;
  title?: string;
  name?: string;
  price: number;
  imageUrl?: string;
  image?: string;
  images?: string[];
  category: string;
  stock?: number;
  soldCount?: number;
}

interface DashboardProductGridProps {
  products: Product[];
}

const DashboardProductGrid: React.FC<DashboardProductGridProps> = ({ products }) => {
  const navigate = useNavigate();

  const handleEdit = (productId: string | number) => {
    navigate(`/dashboard/products/edit/${productId}`);
  };

  const handleDelete = (productId: string | number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Implement delete logic here
      console.log('Delete product:', productId);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Product Inventory
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {products?.length || 0} Products
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        {products?.map((product) => {
          const productId = product._id || product.id || '';
          const productTitle = product.title || product.name;
          const productImage = product.imageUrl || product.image || product.images?.[0];

          return (
            <motion.div
              key={productId}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-black/20">
                <img
                  src={productImage || 'https://via.placeholder.com/400'}
                  alt={productTitle}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 sm:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(productId)}
                    className="p-2 sm:p-3 bg-white text-gray-900 rounded-full shadow-xl hover:bg-orange-500 hover:text-white transition-colors"
                    title="Edit Product"
                  >
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(productId)}
                    className="p-2 sm:p-3 bg-white text-gray-900 rounded-full shadow-xl hover:bg-red-500 hover:text-white transition-colors"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 sm:p-3 bg-white text-gray-900 rounded-full shadow-xl hover:bg-blue-500 hover:text-white transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </div>

                {/* Stock Badge */}
                {product.stock !== undefined && (
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                      product.stock > 10 
                        ? 'bg-green-500/90 text-white' 
                        : product.stock > 0 
                        ? 'bg-yellow-500/90 text-white'
                        : 'bg-red-500/90 text-white'
                    }`}>
                      Stock: {product.stock}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      {product.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mt-1 line-clamp-1 group-hover:text-orange-500 transition-colors">
                      {productTitle}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-orange-500">$</span>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {product.price.toLocaleString()}
                    </span>
                  </div>

                  {product.soldCount !== undefined && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>{product.soldCount} sold</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {(!products || products.length === 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-white/5 mb-4">
            <Eye className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No Products Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start by adding your first product to the inventory
          </p>
          <button
            onClick={() => navigate('/dashboard/products/add')}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
          >
            Add Product
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardProductGrid;
