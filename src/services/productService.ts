import { api } from '@/lib/api';
import type { Product } from '@/types/apiproduct';

export const productService = {
  addProduct: async (data: Omit<Product, '_id' | 'id' | 'createdAt' | 'updatedAt' | '__v'>) => {
    const response = await api.post('/admin/products', data);
    return response.data;
  },
  
  updateProduct: async (id: string, data: Partial<Product>) => {
    const response = await api.patch(`/admin/products/${id}`, data);
    return response.data;
  },
  
  deleteProduct: async (id: string) => {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  },
  
  getProduct: async (id: string) => {
    const response = await api.get<{ product: Product }>(`/products/${id}`);
    return response.data.product;
  },

  getProducts: async () => {
    const response = await api.get<Product[] | { products: Product[] }>('/products');
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return response.data.products;
  }
};
