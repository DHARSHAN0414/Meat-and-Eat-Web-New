import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Grid, 
  List, 
  Heart, 
  ShoppingCart, 
  Star, 
  Calendar, 
  Scale, 
  MapPin,
  Eye,
  Plus,
  Minus,
  X,
  Bookmark,
  Home,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from 'react-router-dom';
// Animation components available for future use
// import { 
//   FadeInUp, 
//   FadeInLeft, 
//   FadeInRight, 
//   ScaleIn, 
//   SlideInFromBottom,
//   AnimatedButton,
//   AnimatedCard,
//   AnimatedImage,
//   StaggerContainer
// } from '../components/Animations';
// import OptimizedImage from '../components/OptimizedImage';

// Product data
const products = [
  {
    id: 'ribeye',
    name: 'Ribeye Steak',
    category: 'beef',
    cut: 'steak',
    price: 24.99,
    freshness: 'today',
    weight: '~1.5 lbs',
    cutDate: 'Cut: Today',
    origin: 'Grass-fed, Local Farm',
    description: 'Premium ribeye steak with perfect marbling. Cut from the rib section, this steak offers exceptional tenderness and rich flavor.',
    nutrition: 'High in protein, iron, and B-vitamins. Contains healthy fats and essential amino acids.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    rating: 5,
    reviews: 127,
    badge: 'Premium',
    organic: false,
    premium: true
  },
  {
    id: 'ground-beef',
    name: 'Ground Beef',
    category: 'beef',
    cut: 'ground',
    price: 8.99,
    freshness: 'today',
    weight: '~1 lb',
    cutDate: 'Cut: Today',
    origin: 'Grass-fed, Local Farm',
    description: 'Fresh ground beef with 80/20 lean-to-fat ratio. Perfect for burgers, meatballs, and tacos.',
    nutrition: 'Rich in protein, iron, zinc, and B-vitamins. Good source of healthy fats.',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    rating: 5,
    reviews: 89,
    badge: 'Fresh',
    organic: false,
    premium: false
  },
  {
    id: 'beef-roast',
    name: 'Beef Roast',
    category: 'beef',
    cut: 'roast',
    price: 18.99,
    freshness: 'yesterday',
    weight: '~3 lbs',
    cutDate: 'Cut: Yesterday',
    origin: 'Organic, Local Farm',
    description: 'Tender beef roast perfect for slow cooking. Marbled with fat for exceptional flavor.',
    nutrition: 'High in protein, iron, and essential amino acids. Contains healthy fats.',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    rating: 4,
    reviews: 45,
    badge: 'Organic',
    organic: true,
    premium: false
  },
  {
    id: 'pork-chops',
    name: 'Pork Chops',
    category: 'pork',
    cut: 'chop',
    price: 15.99,
    freshness: 'today',
    weight: '~1.2 lbs',
    cutDate: 'Cut: Today',
    origin: 'Local Farm',
    description: 'Thick-cut bone-in pork chops. Juicy and flavorful, perfect for grilling or pan-searing.',
    nutrition: 'High in protein, thiamine, and selenium. Good source of B-vitamins.',
    image: 'https://images.unsplash.com/photo-1588347818503-4a1b5b5b5b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    rating: 5,
    reviews: 73,
    badge: 'Local',
    organic: false,
    premium: false
  },
  {
    id: 'chicken-breast',
    name: 'Organic Chicken Breast',
    category: 'chicken',
    cut: 'whole',
    price: 12.99,
    freshness: 'today',
    weight: '~1.8 lbs',
    cutDate: 'Cut: Today',
    origin: 'Organic, Free-range',
    description: 'Organic free-range chicken breast. Lean, tender, and perfect for healthy meals.',
    nutrition: 'High in protein, low in fat. Rich in niacin, phosphorus, and selenium.',
    image: 'https://images.unsplash.com/photo-1588347818503-4a1b5b5b5b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    rating: 5,
    reviews: 156,
    badge: 'Organic',
    organic: true,
    premium: false
  },
  {
    id: 'salmon',
    name: 'Atlantic Salmon',
    category: 'seafood',
    cut: 'whole',
    price: 22.99,
    freshness: 'today',
    weight: '~2 lbs',
    cutDate: 'Caught: Today',
    origin: 'Wild-caught, Atlantic',
    description: 'Fresh Atlantic salmon fillet. Rich in omega-3 fatty acids and perfect for grilling.',
    nutrition: 'High in omega-3 fatty acids, protein, and vitamin D. Rich in selenium.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    rating: 5,
    reviews: 98,
    badge: 'Premium',
    organic: false,
    premium: true
  },
  {
    id: 'lamb-chops',
    name: 'Lamb Chops',
    category: 'lamb',
    cut: 'chop',
    price: 28.99,
    freshness: 'yesterday',
    weight: '~1.5 lbs',
    cutDate: 'Cut: Yesterday',
    origin: 'Grass-fed, Local Farm',
    description: 'Premium lamb chops with excellent marbling. Tender and flavorful.',
    nutrition: 'High in protein, iron, and B-vitamins. Rich in healthy fats.',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    rating: 5,
    reviews: 41,
    badge: 'Premium',
    organic: false,
    premium: true
  }
];

const Products = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    cut: 'all',
    price: 'all',
    freshness: 'all',
    sort: 'name'
  });
  
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites') || '[]'));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { addToCart } = useCart();
  const location = useLocation();

  // Handle search from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setFilters(prev => ({ ...prev, search: searchParam }));
    }
  }, [location.search]);

  // Search suggestions data
  const allSuggestions = [
    'ribeye steak', 'ground beef', 'pork chops', 'chicken breast',
    'salmon', 'lamb chops', 'beef roast', 'organic', 'premium', 
    'fresh', 'grass-fed', 'free-range', 'steak', 'ground', 'roast', 'chop'
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      
      // Cut filter
      if (filters.cut !== 'all' && product.cut !== filters.cut) {
        return false;
      }
      
      // Price filter
      if (filters.price !== 'all') {
        const [min, max] = filters.price.split('-').map(p => parseFloat(p));
        if (max) {
          if (product.price < min || product.price > max) return false;
        } else {
          if (product.price < min) return false;
        }
      }
      
      // Freshness filter
      if (filters.freshness !== 'all') {
        if (filters.freshness === 'organic' && !product.organic) return false;
        if (filters.freshness === 'premium' && !product.premium) return false;
        if (filters.freshness !== 'organic' && filters.freshness !== 'premium' && 
            product.freshness !== filters.freshness) return false;
      }
      
      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [filters]);

  // Handle search with suggestions
  const handleSearchChange = (value) => {
    setFilters(prev => ({ ...prev, search: value }));
    
    if (value.length >= 2) {
      const suggestions = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Toggle favorite
  const toggleFavorite = (productId) => {
    const newFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Handle quantity change
  const updateQuantity = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change)
    }));
  };

  // Add to cart
  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({ ...product, quantity });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      cut: 'all',
      price: 'all',
      freshness: 'all',
      sort: 'name'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Home className="w-4 h-4 text-primary-600" />
            <span className="text-primary-600">Home</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Product Catalog</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Product Catalog</h1>
            <p className="text-xl opacity-90">Discover our premium selection of fresh meats and seafood</p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container-custom py-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products, cuts, or categories..."
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => filters.search.length >= 2 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              
              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setFilters(prev => ({ ...prev, search: suggestion }));
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Search className="w-4 h-4 text-gray-400" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Category Quick Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'beef', 'pork', 'chicken', 'seafood', 'lamb'].map(category => (
              <button
                key={category}
                onClick={() => setFilters(prev => ({ ...prev, category }))}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filters.category === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <select
              value={filters.cut}
              onChange={(e) => setFilters(prev => ({ ...prev, cut: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Cuts</option>
              <option value="steak">Steak</option>
              <option value="ground">Ground</option>
              <option value="roast">Roast</option>
              <option value="chop">Chop</option>
              <option value="whole">Whole</option>
            </select>

            <select
              value={filters.price}
              onChange={(e) => setFilters(prev => ({ ...prev, price: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Prices</option>
              <option value="0-15">$0 - $15</option>
              <option value="15-25">$15 - $25</option>
              <option value="25-35">$25 - $35</option>
              <option value="35">$35+</option>
            </select>

            <select
              value={filters.freshness}
              onChange={(e) => setFilters(prev => ({ ...prev, freshness: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Freshness</option>
              <option value="today">Cut Today</option>
              <option value="yesterday">Cut Yesterday</option>
              <option value="organic">Organic Only</option>
              <option value="premium">Premium Only</option>
            </select>

            <select
              value={filters.sort}
              onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="name">Name A-Z</option>
              <option value="price-low">Price Low-High</option>
              <option value="price-high">Price High-Low</option>
              <option value="rating">Rating</option>
            </select>

            <button
              onClick={clearFilters}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
            </button>

            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors">
              <Bookmark className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container-custom py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              {filteredProducts.length} products found
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}
              >
                {/* Product Image */}
                <div className={`relative group ${viewMode === 'list' ? 'w-48 h-32' : 'h-64'}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                      product.badge === 'Premium' ? 'bg-orange-500' :
                      product.badge === 'Organic' ? 'bg-green-500' :
                      product.badge === 'Fresh' ? 'bg-blue-500' : 'bg-purple-500'
                    }`}>
                      {product.badge}
                    </span>
                  </div>

                  {/* Freshness Indicator */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                      product.freshness === 'today' ? 'bg-green-500' :
                      product.freshness === 'yesterday' ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {product.freshness === 'today' ? 'Cut Today' : 
                       product.freshness === 'yesterday' ? 'Cut Yesterday' : 'This Week'}
                    </span>
                  </div>

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`p-3 rounded-full transition-colors ${
                        favorites.includes(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className={`${viewMode === 'list' ? 'flex justify-between items-start' : ''}`}>
                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{product.category} • {product.cut}</p>
                      
                      {/* Product Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Scale className="w-4 h-4 text-primary-600" />
                          <span>{product.weight}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-primary-600" />
                          <span>{product.cutDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-primary-600" />
                          <span>{product.origin}</span>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className={`${viewMode === 'list' ? 'text-right' : ''}`}>
                      <div className="text-2xl font-bold text-primary-600 mb-4">
                        ${product.price}<span className="text-sm font-normal text-gray-600">/lb</span>
                      </div>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-2 mb-4">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[3rem] text-center">
                          {quantities[product.id] || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full btn-primary flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                  <div>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-96 object-cover rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h2>
                    <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <Scale className="w-5 h-5 text-primary-600" />
                        <span>{selectedProduct.weight}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-primary-600" />
                        <span>{selectedProduct.cutDate}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-primary-600" />
                        <span>{selectedProduct.origin}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h4 className="font-semibold mb-2">Nutritional Information</h4>
                      <p className="text-sm text-gray-600">{selectedProduct.nutrition}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-primary-600">
                        ${selectedProduct.price}<span className="text-lg font-normal text-gray-600">/lb</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(selectedProduct.id, -1)}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[3rem] text-center">
                            {quantities[selectedProduct.id] || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(selectedProduct.id, 1)}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleAddToCart(selectedProduct)}
                          className="btn-primary flex items-center space-x-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
