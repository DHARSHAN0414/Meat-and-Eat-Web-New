import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import { Products, Cart, Dashboard, AdminLogin, AdminDashboard } from './pages';

// Context
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { SecurityProvider } from './context/SecurityContext';

function App() {
  return (
    <AuthProvider>
      <SecurityProvider>
        <CartProvider>
          <Router>
                  <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <Breadcrumb />
                    <motion.main
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="min-h-screen"
                    >
              <Routes>
                {/* Customer Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </motion.main>
            <Footer />
          </div>
          </Router>
        </CartProvider>
      </SecurityProvider>
    </AuthProvider>
  );
}

export default App;
