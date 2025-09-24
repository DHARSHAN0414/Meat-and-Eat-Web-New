import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ChevronRight } from 'lucide-react';

const Breadcrumb = () => {
  const location = useLocation();
  
  // Define breadcrumb mappings
  const breadcrumbMap = {
    '/home': { label: 'Home', show: true },
    '/products': { label: 'Products', show: true },
    '/category/beef': { label: 'Beef', show: true },
    '/category/pork': { label: 'Pork', show: true },
    '/category/chicken': { label: 'Chicken', show: true },
    '/category/seafood': { label: 'Seafood', show: true },
    '/category/lamb': { label: 'Lamb', show: true },
    '/cart': { label: 'Shopping Cart', show: true },
    '/dashboard': { label: 'Account Dashboard', show: true },
    '/admin': { label: 'Admin Login', show: true },
    '/admin/dashboard': { label: 'Admin Dashboard', show: true }
  };

  // Generate breadcrumb items
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs = [
      { path: '/home', label: 'Home', icon: <Home className="w-4 h-4" /> }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      if (breadcrumbMap[currentPath]) {
        breadcrumbs.push({
          path: currentPath,
          label: breadcrumbMap[currentPath].label,
          isLast: index === pathSegments.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumb on home page or if only one item
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 border-b border-gray-200 py-3"
    >
      <div className="container-custom">
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.path}>
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
              {breadcrumb.isLast ? (
                <span className="text-gray-900 font-medium flex items-center space-x-1">
                  {index === 0 && breadcrumb.icon}
                  <span>{breadcrumb.label}</span>
                </span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200 flex items-center space-x-1"
                >
                  {index === 0 && breadcrumb.icon}
                  <span>{breadcrumb.label}</span>
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Breadcrumb;
