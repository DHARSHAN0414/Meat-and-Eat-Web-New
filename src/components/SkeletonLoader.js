import React from 'react';
import { motion } from 'framer-motion';

// Skeleton Loading Components
export const SkeletonCard = ({ className = "" }) => (
  <div className={`bg-white rounded-xl shadow-soft p-6 ${className}`}>
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

export const SkeletonStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        className="bg-white rounded-xl p-6 shadow-soft"
      >
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export const SkeletonTable = () => (
  <div className="bg-white rounded-xl shadow-soft overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
    <div className="p-6">
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
                <div className="h-5 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const SkeletonProductGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="animate-pulse">
          <div className="w-full h-48 bg-gray-200"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="flex items-center justify-between">
              <div className="h-5 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonSidebar = () => (
  <div className="lg:w-64 flex-shrink-0">
    <div className="bg-white rounded-xl shadow-soft p-4">
      <div className="space-y-2">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Loading States for Dashboard
export const DashboardSkeleton = () => (
  <div className="min-h-screen pt-16 bg-gray-50">
    <div className="container-custom py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Skeleton */}
        <SkeletonSidebar />

        {/* Main Content Skeleton */}
        <div className="flex-1 space-y-6">
          {/* Welcome Section Skeleton */}
          <div className="bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-64 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>
          </div>

          {/* Stats Skeleton */}
          <SkeletonStats />

          {/* Recent Orders Skeleton */}
          <SkeletonTable />

          {/* Quick Actions Skeleton */}
          <SkeletonCard />
        </div>
      </div>
    </div>
  </div>
);

// Pulse Animation Component
export const PulseLoader = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-full h-full bg-primary-600 rounded-full"></div>
    </motion.div>
  );
};

// Shimmer Effect Component
export const ShimmerEffect = ({ width = "100%", height = "1rem", className = "" }) => (
  <div
    className={`relative overflow-hidden bg-gray-200 rounded ${className}`}
    style={{ width, height }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

// Loading Button Component
export const LoadingButton = ({ loading = false, children, ...props }) => (
  <motion.button
    {...props}
    disabled={loading}
    className={`relative overflow-hidden ${props.className || ''}`}
    whileHover={!loading ? { scale: 1.05 } : {}}
    whileTap={!loading ? { scale: 0.95 } : {}}
  >
    {loading && (
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    )}
    <span className={`flex items-center justify-center space-x-2 ${loading ? 'opacity-70' : ''}`}>
      {loading && <PulseLoader size="sm" />}
      {children}
    </span>
  </motion.button>
);

export default {
  SkeletonCard,
  SkeletonStats,
  SkeletonTable,
  SkeletonProductGrid,
  SkeletonSidebar,
  DashboardSkeleton,
  PulseLoader,
  ShimmerEffect,
  LoadingButton
};
