import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Loader2, DollarSign, Package, Palette, Layers } from 'lucide-react';
import { type Product } from '../../types/apiproduct';

const productSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  originalPrice: z.coerce.number().min(0, 'Price must be positive'),
  discount: z.coerce.number().min(0).max(100, 'Discount must be between 0 and 100'),
  price: z.coerce.number().min(0, 'Final price must be positive'),
  category: z.string().min(1, 'Category is required'),
  color: z.string().min(1, 'Color is required'),
  material: z.string().min(1, 'Material is required'),
  stock: z.coerce.number().min(0, 'Stock must be positive'),
  imageUrl: z.string().url('Must be a valid URL'),
  imagePublicId: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormData) => void;
  isLoading?: boolean;
  buttonText: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, isLoading = false, buttonText }) => {
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      originalPrice: 0,
      discount: 0,
      price: 0,
      category: '',
      color: '',
      material: '',
      stock: 0,
      imageUrl: '',
      imagePublicId: '',
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        originalPrice: initialData.originalPrice,
        discount: initialData.discount,
        price: initialData.price,
        category: initialData.category,
        color: initialData.color,
        material: initialData.material,
        stock: initialData.stock,
        imageUrl: initialData.imageUrl,
        imagePublicId: initialData.imagePublicId || '',
      });
    }
  }, [initialData, reset]);

  // Auto-calculate final price when original price or discount changes
  const originalPrice = watch('originalPrice');
  const discount = watch('discount');

  useEffect(() => {
    if (originalPrice >= 0 && discount >= 0) {
      const calculatedPrice = originalPrice - (originalPrice * (discount / 100));
      setValue('price', Number(calculatedPrice.toFixed(2)));
    }
  }, [originalPrice, discount, setValue]);

  const inputClasses = "w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-4 outline-none transition-all text-gray-900 dark:text-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10";
  const labelClasses = "text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1 mb-2 block";

  return (
    <motion.form 
      onSubmit={handleSubmit((data: any) => onSubmit(data))} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6"
    >
      {/* Title */}
      <div>
        <label className={labelClasses}>Product Title</label>
        <input 
          {...register('title')} 
          className={inputClasses}
          placeholder="Enter product name"
        />
        {errors.title && <p className="text-red-500 text-sm mt-2 ml-1">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className={labelClasses}>Description</label>
        <textarea 
          {...register('description')} 
          rows={4}
          className={inputClasses}
          placeholder="Describe your product in detail"
        />
        {errors.description && <p className="text-red-500 text-sm mt-2 ml-1">{errors.description.message}</p>}
      </div>

      {/* Pricing Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <label className={labelClasses}>
            <DollarSign className="w-3 h-3 inline mr-1" />
            Original Price
          </label>
          <input 
            type="number"
            step="0.01"
            {...register('originalPrice')} 
            className={inputClasses}
            placeholder="0.00"
          />
          {errors.originalPrice && <p className="text-red-500 text-sm mt-2 ml-1">{errors.originalPrice.message}</p>}
        </div>

        <div>
          <label className={labelClasses}>Discount (%)</label>
          <input 
            type="number"
            step="0.01"
            {...register('discount')} 
            className={inputClasses}
            placeholder="0"
          />
          {errors.discount && <p className="text-red-500 text-sm mt-2 ml-1">{errors.discount.message}</p>}
        </div>

        <div>
          <label className={labelClasses}>Final Price</label>
          <input 
            type="number"
            step="0.01"
            readOnly
            {...register('price')} 
            className={`${inputClasses} bg-orange-50 dark:bg-orange-500/10 cursor-not-allowed font-bold text-orange-600 dark:text-orange-400`}
          />
          {errors.price && <p className="text-red-500 text-sm mt-2 ml-1">{errors.price.message}</p>}
        </div>
      </div>

      {/* Inventory & Attributes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className={labelClasses}>
            <Package className="w-3 h-3 inline mr-1" />
            Stock Quantity
          </label>
          <input 
            type="number"
            {...register('stock')} 
            className={inputClasses}
            placeholder="0"
          />
          {errors.stock && <p className="text-red-500 text-sm mt-2 ml-1">{errors.stock.message}</p>}
        </div>

        <div>
          <label className={labelClasses}>
            <Layers className="w-3 h-3 inline mr-1" />
            Category
          </label>
          <input 
            {...register('category')} 
            className={inputClasses}
            placeholder="e.g. Watches, Rings, Bags"
          />
          {errors.category && <p className="text-red-500 text-sm mt-2 ml-1">{errors.category.message}</p>}
        </div>

        <div>
          <label className={labelClasses}>
            <Palette className="w-3 h-3 inline mr-1" />
            Color
          </label>
          <input 
            {...register('color')} 
            className={inputClasses}
            placeholder="e.g. Gold, Silver, Black"
          />
          {errors.color && <p className="text-red-500 text-sm mt-2 ml-1">{errors.color.message}</p>}
        </div>

        <div>
          <label className={labelClasses}>Material</label>
          <input 
            {...register('material')} 
            className={inputClasses}
            placeholder="e.g. Gold, Leather, Stainless Steel"
          />
          {errors.material && <p className="text-red-500 text-sm mt-2 ml-1">{errors.material.message}</p>}
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className={labelClasses}>Product Image URL</label>
        <input 
          {...register('imageUrl')} 
          className={inputClasses}
          placeholder="https://example.com/image.jpg"
        />
        {errors.imageUrl && <p className="text-red-500 text-sm mt-2 ml-1">{errors.imageUrl.message}</p>}
      </div>

      {/* Submit Button */}
      <motion.button 
        type="submit" 
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl uppercase tracking-wider text-xs sm:text-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          buttonText
        )}
      </motion.button>
    </motion.form>
  );
};

export default ProductForm;
