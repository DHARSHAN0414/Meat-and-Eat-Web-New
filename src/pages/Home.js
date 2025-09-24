import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Shield, 
  Clock, 
  Heart, 
  Star, 
  ShoppingCart, 
  Award, 
  Leaf, 
  Zap, 
  Globe, 
  MapPin, 
  ChevronRight, 
  Play, 
  Quote
} from 'lucide-react';
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
//   StaggerContainer,
//   ParallaxElement
// } from '../components/Animations';
// import OptimizedImage, { OptimizedBackground } from '../components/OptimizedImage';

const Home = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Free Delivery',
      description: 'Free delivery on orders over $50',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Quality Guarantee',
      description: '100% satisfaction guarantee',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Fresh Daily',
      description: 'Cut fresh every morning',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Customer Care',
      description: '24/7 customer support',
      color: 'from-red-500 to-red-600'
    }
  ];

  const trustIndicators = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '15+', label: 'Years Experience' },
    { number: '100%', label: 'Grass-Fed' },
    { number: '24/7', label: 'Support' }
  ];

  const whyChooseUs = [
    {
      icon: <Leaf className="w-12 h-12" />,
      title: 'Grass-Fed Quality',
      description: 'All our meats come from grass-fed, free-range animals raised on local farms without hormones or antibiotics.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Premium Cuts',
      description: 'Hand-selected by our expert butchers to ensure only the finest cuts reach your table.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Lightning Fast',
      description: 'Order by 2 PM and receive your fresh meat the same day. Cut fresh, delivered fresh.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: 'Local Sourcing',
      description: 'Supporting local farmers and sustainable practices while bringing you the best quality.',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const certifications = [
    { name: 'USDA Certified', icon: <Award className="w-6 h-6" /> },
    { name: 'Organic Certified', icon: <Leaf className="w-6 h-6" /> },
    { name: 'HACCP Certified', icon: <Shield className="w-6 h-6" /> },
    { name: 'Local Farm Verified', icon: <MapPin className="w-6 h-6" /> }
  ];

  const products = [
    {
      id: 1,
      name: 'Premium Ribeye Steak',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      badge: 'Premium',
      description: 'Premium cut with perfect marbling'
    },
    {
      id: 2,
      name: 'Organic Chicken Breast',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1588347818503-4a1b5b5b5b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      badge: 'Organic',
      description: 'Free-range, hormone-free chicken'
    },
    {
      id: 3,
      name: 'Fresh Salmon Fillet',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a8023a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      badge: 'Fresh',
      description: 'Fresh Atlantic salmon'
    }
  ];

  const testimonials = [
    {
      name: 'John Smith',
      role: 'Verified Customer',
      content: 'The quality of meat from Meat & Eat is exceptional. Every cut is perfect and the flavor is outstanding.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      content: 'Fast delivery and amazing quality. I\'ve been ordering from Meat & Eat for months and never disappointed.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-100/20 to-primary-200/20"></div>
        </div>
        
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
                >
                  <Award className="w-4 h-4 mr-2" />
                  #1 Premium Meat Supplier
                </motion.div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Premium Quality{' '}
                  <span className="gradient-text">Meats</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  From farm to table, we deliver the finest cuts of meat with 
                  uncompromising quality and freshness. Experience the difference 
                  that premium quality makes.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="btn-primary flex items-center justify-center space-x-2 group">
                  <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Start Shopping</span>
                </Link>
                <button className="btn-outline flex items-center justify-center space-x-2 group">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Watch Video</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-gray-200"
              >
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary-600">{indicator.number}</div>
                    <div className="text-sm text-gray-600">{indicator.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Premium Steak"
                  className="rounded-2xl shadow-strong w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                
                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg"
                >
                  <div className="flex items-center space-x-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    <div className="text-sm font-semibold">
                      <div>4.9/5</div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-8 text-center group hover:scale-105"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding gradient-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Meat & Eat?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the highest quality meats with exceptional service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-8 group hover:shadow-xl transition-shadow"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Trusted Certifications
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 group-hover:bg-primary-200 transition-colors">
                    <div className="text-primary-600">
                      {cert.icon}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{cert.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Limited Time Offer!</h2>
            <p className="text-xl mb-8 opacity-90">
              Get 20% off your first order + Free delivery on orders over $50
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn-secondary flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Shop Now</span>
              </Link>
              <button className="btn-outline-white flex items-center justify-center space-x-2">
                <span>Learn More</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular cuts, carefully selected for their exceptional quality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/lb</span>
                    </div>
                    <Link
                      to="/products"
                      className="btn-primary text-sm py-2 px-4"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-8 relative"
              >
                <Quote className="absolute top-4 left-4 w-8 h-8 text-primary-200" />
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90">
              Get the latest offers, new products, and cooking tips delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="btn-secondary px-6 py-3 whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              No spam, unsubscribe at any time
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
