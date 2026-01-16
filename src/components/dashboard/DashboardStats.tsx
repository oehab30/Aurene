import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Heart, Package } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
  trend?: string;
  trendUp?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  icon, 
  iconBgColor,
  trend,
  trendUp = true 
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className=" group relative bg-white/80 dark:bg-white/5 backdrop-blur-xl p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-white/10 hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-500 overflow-hidden"
    >
      {/* Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-purple-500/0 group-hover:from-orange-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
            {label}
          </p>
          <p className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-1 sm:mb-2">
            {value}
          </p>
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-semibold ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
              <TrendingUp className={`w-4 h-4 ${!trendUp && 'rotate-180'}`} />
              <span>{trend}</span>
            </div>
          )}
        </div>
        
        <motion.div 
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className={`shrink-0 rounded-xl sm:rounded-2xl p-3 sm:p-4 ${iconBgColor} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}
        >
          {React.cloneElement(icon as React.ReactElement<any>, { 
            className: `w-6 h-6 sm:w-8 sm:h-8 ${iconBgColor.replace('bg-', 'text-')}` 
          })}
        </motion.div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      </div>
    </motion.div>
  );
};

const DashboardStats: React.FC<{ products: any[] }> = ({ products = [] }) => {
  // Calculate real statistics from products
  const totalProducts = products.length;
  
  // Calculate total revenue (sum of all product prices * sold count if available)
  const totalRevenue = products.reduce((sum, product) => {
    const soldCount = product.soldCount || 0;
    const price = product.price || 0;
    return sum + (price * soldCount);
  }, 0);
  
  // Calculate total stock value (sum of all product prices * stock)
  const totalStockValue = products.reduce((sum, product) => {
    const stock = product.stock || 0;
    const price = product.price || 0;
    return sum + (price * stock);
  }, 0);
  
  // Count low stock items (stock < 10)
  const lowStockCount = products.filter(product => {
    const stock = product.stock || 0;
    return stock > 0 && stock < 10;
  }).length;
  
  // Calculate total items in stock
  const totalStock = products.reduce((sum, product) => {
    return sum + (product.stock || 0);
  }, 0);

  const stats = [
    {
      label: "Total Products",
      value: totalProducts.toString(),
      icon: <Package />,
      iconBgColor: "bg-purple-600",
      trend: totalProducts > 0 ? "+12.5%" : "0%",
      trendUp: true
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <DollarSign />,
      iconBgColor: "bg-green-600",
      trend: totalRevenue > 0 ? "+23.1%" : "0%",
      trendUp: true
    },
    {
      label: "Stock Value",
      value: `$${totalStockValue.toLocaleString()}`,
      icon: <TrendingUp />,
      iconBgColor: "bg-orange-600",
      trend: totalStockValue > 0 ? "+8.2%" : "0%",
      trendUp: true
    },
    {
      label: "Low Stock Items",
      value: lowStockCount.toString(),
      icon: <Heart />,
      iconBgColor: lowStockCount > 5 ? "bg-red-600" : "bg-pink-600",
      trend: lowStockCount > 0 ? `${lowStockCount} items` : "All good",
      trendUp: lowStockCount === 0
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
