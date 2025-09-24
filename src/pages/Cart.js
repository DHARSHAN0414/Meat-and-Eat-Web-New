import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Clock, 
  CreditCard, 
  Truck, 
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Home,
  ChevronRight,
  Gift,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalPrice, 
    getTotalItems,
    getDeliveryFee,
    deliverySlot,
    setDeliverySlot,
    paymentMethod,
    setPaymentMethod
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Mock delivery slots
  const deliverySlots = [
    { id: 'morning', label: 'Morning (8 AM - 12 PM)', price: 0, available: true },
    { id: 'afternoon', label: 'Afternoon (12 PM - 4 PM)', price: 0, available: true },
    { id: 'evening', label: 'Evening (4 PM - 8 PM)', price: 2, available: true },
    { id: 'express', label: 'Express (Within 2 hours)', price: 8, available: false },
  ];


  // Mock coupons
  const availableCoupons = {
    'WELCOME20': { discount: 20, type: 'percentage', minOrder: 30 },
    'SAVE10': { discount: 10, type: 'fixed', minOrder: 50 },
    'FREESHIP': { discount: 0, type: 'shipping', minOrder: 25 }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleApplyCoupon = () => {
    const coupon = availableCoupons[couponCode.toUpperCase()];
    if (coupon && getTotalPrice() >= coupon.minOrder) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon });
    }
  };

  const getCouponDiscount = () => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.type === 'percentage') {
      return (getTotalPrice() * appliedCoupon.discount) / 100;
    } else if (appliedCoupon.type === 'fixed') {
      return appliedCoupon.discount;
    } else if (appliedCoupon.type === 'shipping') {
      return getDeliveryFee();
    }
    return 0;
  };

  const getSlotPrice = () => {
    if (!deliverySlot) return 0;
    const slot = deliverySlots.find(s => s.id === deliverySlot);
    return slot ? slot.price : 0;
  };

  const getFinalTotalWithDiscounts = () => {
    const subtotal = getTotalPrice();
    const deliveryFee = getDeliveryFee();
    const slotPrice = getSlotPrice();
    const couponDiscount = getCouponDiscount();
    
    return subtotal + deliveryFee + slotPrice - couponDiscount;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-16">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-200 py-3">
          <div className="container-custom">
            <div className="flex items-center space-x-2 text-sm">
              <Link to="/home" className="text-gray-600 hover:text-primary-600 flex items-center space-x-1">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">Shopping Cart</span>
            </div>
          </div>
        </div>

        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link
              to="/products"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Start Shopping</span>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="container-custom">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/home" className="text-gray-600 hover:text-primary-600 flex items-center space-x-1">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Shopping Cart ({getTotalItems()} items)</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-soft">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-6"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-gray-600 text-sm">{item.category} • {item.cut}</p>
                          <p className="text-gray-500 text-sm">{item.weight}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <span className="text-2xl font-bold text-primary-600">${item.price}</span>
                            <span className="text-gray-500 text-sm">/lb</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 text-sm mt-1 flex items-center space-x-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="bg-white rounded-xl shadow-soft mt-6 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Gift className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900">Apply Coupon</h3>
              </div>
              
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="btn-outline px-6"
                >
                  Apply
                </button>
              </div>

              {appliedCoupon && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">
                    Coupon "{appliedCoupon.code}" applied! You saved ${getCouponDiscount().toFixed(2)}
                  </span>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="text-green-600 hover:text-green-700 ml-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary & Checkout */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft sticky top-24">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                {/* Delivery Slot Selection */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <h4 className="font-semibold text-gray-900">Delivery Time</h4>
                  </div>
                  
                  <div className="space-y-2">
                    {deliverySlots.map((slot) => (
                      <label
                        key={slot.id}
                        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                          deliverySlot === slot.id
                            ? 'border-primary-500 bg-primary-50'
                            : slot.available
                            ? 'border-gray-200 hover:border-gray-300'
                            : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="deliverySlot"
                            value={slot.id}
                            checked={deliverySlot === slot.id}
                            onChange={() => setDeliverySlot(slot.id)}
                            disabled={!slot.available}
                            className="text-primary-600"
                          />
                          <div>
                            <div className={`font-medium ${!slot.available ? 'text-gray-400' : 'text-gray-900'}`}>
                              {slot.label}
                            </div>
                            {!slot.available && (
                              <div className="text-xs text-red-600">Currently unavailable</div>
                            )}
                          </div>
                        </div>
                        <div className={`font-semibold ${!slot.available ? 'text-gray-400' : 'text-gray-900'}`}>
                          {slot.price === 0 ? 'Free' : `+$${slot.price}`}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <CreditCard className="w-5 h-5 text-primary-600" />
                    <h4 className="font-semibold text-gray-900">Payment Method</h4>
                  </div>
                  
                  <div className="space-y-2">
                    <label className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'card' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-primary-600"
                      />
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </label>
                    
                    <label className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'cod' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-primary-600"
                      />
                      <Truck className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                    <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">
                      {getDeliveryFee() === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${getDeliveryFee().toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  {deliverySlot && getSlotPrice() > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Slot Fee</span>
                      <span className="font-semibold">${getSlotPrice().toFixed(2)}</span>
                    </div>
                  )}
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span className="font-semibold">-${getCouponDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary-600">${getFinalTotalWithDiscounts().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => setShowCheckout(true)}
                  disabled={!deliverySlot}
                  className="w-full btn-primary mt-6 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {!deliverySlot && (
                  <div className="flex items-center space-x-2 mt-3 text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Please select a delivery time slot</span>
                  </div>
                )}

                <div className="text-center mt-4">
                  <Link
                    to="/products"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCheckout(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h3>
                <p className="text-gray-600 mb-6">
                  Your order has been placed and will be delivered during your selected time slot.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      clearCart();
                      setShowCheckout(false);
                    }}
                    className="w-full btn-primary"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="w-full btn-outline"
                  >
                    View Order Details
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
