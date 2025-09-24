import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Shield, 
  Search,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { MagneticElement } from './MicroInteractions';
import { debounce } from '../utils/performance';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  
  const searchRef = useRef(null);
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Search suggestions data - memoized for performance
  const allSuggestions = useMemo(() => [
    { text: 'ribeye steak', type: 'product' },
    { text: 'ground beef', type: 'product' },
    { text: 'pork chops', type: 'product' },
    { text: 'chicken breast', type: 'product' },
    { text: 'salmon', type: 'product' },
    { text: 'lamb chops', type: 'product' },
    { text: 'organic', type: 'filter' },
    { text: 'premium', type: 'filter' },
    { text: 'fresh', type: 'filter' },
    { text: 'grass-fed', type: 'filter' },
    { text: 'steak', type: 'cut' },
    { text: 'ground', type: 'cut' },
    { text: 'roast', type: 'cut' },
    { text: 'chop', type: 'cut' }
  ], []);

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((query) => {
      if (query.length > 0) {
        const filtered = allSuggestions.filter(suggestion =>
          suggestion.text.toLowerCase().includes(query.toLowerCase())
        );
        setSearchSuggestions(filtered.slice(0, 8));
        setShowSuggestions(true);
      } else {
        setSearchSuggestions([]);
        setShowSuggestions(false);
      }
    }, 150),
    [allSuggestions]
  );

  // Handle search input
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add to search history
      const newHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      
      // Navigate to products page with search query
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    navigate(`/products?search=${encodeURIComponent(suggestion.text)}`);
    setShowSuggestions(false);
  };

  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/home', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/cart', label: 'Cart' },
    { path: '/dashboard', label: 'Account' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-100"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M&E</span>
            </div>
            <span className="text-xl font-bold gradient-text">Meat & Eat</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
                    {/* Search Bar */}
                    <div className="relative" ref={searchRef}>
                      <motion.form 
                        onSubmit={handleSearchSubmit} 
                        className="relative"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <motion.input
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={handleSearchInput}
                          onFocus={() => setShowSuggestions(true)}
                          className="w-64 px-4 py-2 pl-10 pr-4 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-primary-300"
                          whileFocus={{ 
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                            borderColor: "rgb(59, 130, 246)"
                          }}
                        />
                        <motion.div
                          className="absolute left-3 top-1/2 transform -translate-y-1/2"
                          animate={{ 
                            scale: searchQuery ? 1.1 : 1,
                            color: searchQuery ? "rgb(59, 130, 246)" : "rgb(156, 163, 175)"
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <Search className="w-4 h-4" />
                        </motion.div>
                        <motion.button
                          type="submit"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-600 hover:text-primary-700"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <Search className="w-4 h-4" />
                        </motion.button>
                      </motion.form>

              {/* Search Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && (searchSuggestions.length > 0 || searchHistory.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-strong border border-gray-200 z-50 max-h-80 overflow-y-auto"
                  >
                    {/* Search Suggestions */}
                    {searchSuggestions.length > 0 && (
                      <div className="p-2">
                        <div className="text-xs font-medium text-gray-500 px-2 py-1">Suggestions</div>
                        {searchSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center space-x-2"
                          >
                            <Search className="w-3 h-3 text-gray-400" />
                            <span>{suggestion.text}</span>
                            <span className="text-xs text-gray-400 capitalize">({suggestion.type})</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Search History */}
                    {searchHistory.length > 0 && (
                      <div className="p-2 border-t border-gray-100">
                        <div className="flex items-center justify-between px-2 py-1">
                          <div className="text-xs font-medium text-gray-500">Recent Searches</div>
                          <button
                            onClick={clearSearchHistory}
                            className="text-xs text-gray-400 hover:text-gray-600"
                          >
                            Clear
                          </button>
                        </div>
                        {searchHistory.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick({ text: item })}
                            className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center space-x-2"
                          >
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span>{item}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

                    {/* Main Navigation */}
                    {navItems.map((item) => (
                      <motion.div
                        key={item.path}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Link
                          to={item.path}
                          className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                            isActive(item.path)
                              ? 'text-primary-600'
                              : 'text-gray-700 hover:text-primary-600'
                          }`}
                        >
                          <span className="relative z-10">{item.label}</span>
                          
                          {/* Hover underline animation */}
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            style={{ originX: 0 }}
                          />
                          
                          {/* Active tab indicator */}
                          {isActive(item.path) && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                              initial={false}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
                    {/* Cart */}
                    <MagneticElement strength={0.2}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Link
                          to="/cart"
                          className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200 group"
                        >
                          <motion.div
                            animate={{ 
                              rotate: [0, -10, 10, -10, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                              duration: 0.6,
                              repeat: Infinity,
                              repeatDelay: 3,
                              ease: "easeInOut"
                            }}
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </motion.div>
                          {getTotalItems() > 0 && (
                            <motion.span
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-lg"
                            >
                              {getTotalItems()}
                            </motion.span>
                          )}
                        </Link>
                      </motion.div>
                    </MagneticElement>

                    {/* Admin Link */}
                    <MagneticElement strength={0.2}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Link
                          to="/admin"
                          className="hidden sm:flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <motion.div
                            animate={{ 
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 4,
                              ease: "easeInOut"
                            }}
                          >
                            <Shield className="w-4 h-4" />
                          </motion.div>
                          <span>Admin</span>
                        </Link>
                      </motion.div>
                    </MagneticElement>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <User className="w-4 h-4 text-gray-600" />
                </button>

                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-strong border border-gray-200 py-2"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Account Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link
                to="/"
                className="btn-primary text-sm py-2 px-4"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 py-4"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/admin"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
