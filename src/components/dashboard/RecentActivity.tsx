import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShoppingBag, User, TrendingUp, Package, DollarSign } from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'order' | 'product' | 'user' | 'revenue';
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
}

const RecentActivity = () => {
  const activities: ActivityItem[] = [
    {
      id: 1,
      type: 'order',
      title: 'New Order Placed',
      description: 'Order #12345 - Classic Gold Watch',
      time: '5 minutes ago',
      icon: <ShoppingBag className="w-5 h-5" />,
      iconBg: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'product',
      title: 'Product Updated',
      description: 'Silver Essence - Stock updated to 25',
      time: '1 hour ago',
      icon: <Package className="w-5 h-5" />,
      iconBg: 'bg-purple-500'
    },
    {
      id: 3,
      type: 'user',
      title: 'New User Registration',
      description: 'john.doe@example.com joined',
      time: '2 hours ago',
      icon: <User className="w-5 h-5" />,
      iconBg: 'bg-green-500'
    },
    {
      id: 4,
      type: 'revenue',
      title: 'Revenue Milestone',
      description: 'Monthly revenue reached $50,000',
      time: '5 hours ago',
      icon: <DollarSign className="w-5 h-5" />,
      iconBg: 'bg-orange-500'
    },
    {
      id: 5,
      type: 'product',
      title: 'Low Stock Alert',
      description: 'Deep Ocean Blue - Only 3 items left',
      time: '1 day ago',
      icon: <TrendingUp className="w-5 h-5" />,
      iconBg: 'bg-red-500'
    }
  ];

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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-white/10 p-5 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            variants={itemVariants}
            whileHover={{ x: 4 }}
            className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer"
          >
            {/* Icon */}
            <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${activity.iconBg} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              {React.cloneElement(activity.icon as React.ReactElement<any>, {
                className: `w-4 h-4 sm:w-5 sm:h-5 ${activity.iconBg.replace('bg-', 'text-')}`
              })}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors">
                {activity.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {activity.description}
              </p>
            </div>

            {/* Time */}
            <div className="shrink-0 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
              {activity.time}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 py-3 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
      >
        View All Activity
      </motion.button>
    </div>
  );
};

export default RecentActivity;
