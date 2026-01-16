import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from "@/hooks/products/useproduct";
import { motion } from 'framer-motion';
import { 
  LogOut, 
  Plus, 
  TrendingUp, 
  Package, 
  Users, 
  DollarSign,
  Activity,
  BarChart3,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardProductGrid from '@/components/dashboard/DashboardProductGrid';
import RecentActivity from '@/components/dashboard/RecentActivity';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = "Admin"; // You can get this from auth context

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/Login");
  };

  const { isFetching, error, data, refetch } = useProducts();

  if (isFetching) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-12 h-12 text-orange-500" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">Error loading dashboard</p>
          <button 
            onClick={() => refetch()}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500 pt-20">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Admin <span className="text-orange-500">Dashboard</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Welcome back, {userName}
              </p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard/products/add')}
                className="flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:bg-orange-600 transition-all flex-1 sm:flex-initial"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Add Product</span>
                <span className="sm:hidden">Add</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gray-200 dark:hover:bg-white/20 transition-all flex-1 sm:flex-initial"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">Exit</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Overview
            </h2>
            <button 
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
            >
              <Activity className="w-4 h-4" />
              Refresh
            </button>
          </div>
          
          <DashboardStats products={data || []} />
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <DashboardProductGrid products={data} />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <RecentActivity />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
