import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import ProductForm, { type ProductFormData } from '../../components/admin/ProductForm';
import { productService } from '../../services/productService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const AddProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productService.addProduct,
    onSuccess: () => {
      toast.success('Product added successfully!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/dashboard');
    },
    onError: (error: any) => {
      console.error('Error adding product:', error);
      toast.error(error.response?.data?.message || 'Failed to add product');
    }
  });

  const handleSubmit = (data: ProductFormData) => {
    mutation.mutate({ ...data, soldCount: 0, imagePublicId: data.imagePublicId || '' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500 pt-20">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-4">
            <div className="p-4 bg-orange-500/10 rounded-2xl">
              <Plus className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                Add New <span className="text-orange-500">Product</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Create a new product for your inventory
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProductForm 
            onSubmit={handleSubmit} 
            buttonText="Create Product" 
            isLoading={mutation.isPending}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AddProduct;
