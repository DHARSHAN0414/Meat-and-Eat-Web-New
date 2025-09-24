import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X,
  Home,
  Building,
  Phone,
  User
} from 'lucide-react';

const AddressManager = ({ onAddressSelect, selectedAddressId }) => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      fullName: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'New York, NY 10001',
      phone: '+1 (555) 123-4567',
      type: 'home',
      isDefault: true
    },
    {
      id: 2,
      name: 'Office',
      fullName: 'John Doe',
      address: '456 Business Ave, Suite 200',
      city: 'New York, NY 10002',
      phone: '+1 (555) 987-6543',
      type: 'work',
      isDefault: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    fullName: '',
    address: '',
    city: '',
    phone: '',
    type: 'home',
    isDefault: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddAddress = () => {
    const newAddress = {
      id: Date.now(),
      ...formData
    };
    
    setAddresses(prev => [...prev, newAddress]);
    setFormData({
      name: '',
      fullName: '',
      address: '',
      city: '',
      phone: '',
      type: 'home',
      isDefault: false
    });
    setShowAddForm(false);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address.id);
    setFormData(address);
    setShowAddForm(true);
  };

  const handleUpdateAddress = () => {
    setAddresses(prev => 
      prev.map(addr => 
        addr.id === editingAddress ? { ...formData } : addr
      )
    );
    setFormData({
      name: '',
      fullName: '',
      address: '',
      city: '',
      phone: '',
      type: 'home',
      isDefault: false
    });
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  const handleSetDefault = (addressId) => {
    setAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    );
  };

  const getAddressTypeIcon = (type) => {
    switch (type) {
      case 'home':
        return <Home className="w-4 h-4" />;
      case 'work':
        return <Building className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Delivery Address</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-outline text-sm flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Address</span>
        </button>
      </div>

      {/* Address List */}
      <div className="space-y-3">
        {addresses.map((address) => (
          <motion.div
            key={address.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedAddressId === address.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onAddressSelect(address)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="text-primary-600 mt-1">
                  {getAddressTypeIcon(address.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">{address.name}</h4>
                    {address.isDefault && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{address.fullName}</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{address.address}</span>
                    </div>
                    <div className="mt-1">{address.city}</div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Phone className="w-3 h-3" />
                      <span>{address.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {!address.isDefault && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetDefault(address.id);
                    }}
                    className="text-gray-400 hover:text-green-600 text-xs"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditAddress(address);
                  }}
                  className="text-gray-400 hover:text-blue-600"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAddress(address.id);
                  }}
                  className="text-gray-400 hover:text-red-600"
                  disabled={addresses.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Address Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h4>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingAddress(null);
                  setFormData({
                    name: '',
                    fullName: '',
                    address: '',
                    city: '',
                    phone: '',
                    type: 'home',
                    isDefault: false
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Home, Office"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Street address, apartment, suite, etc."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City, State, ZIP
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="New York, NY 10001"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isDefault}
                    onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                    className="text-primary-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Set as default address</span>
                </label>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                disabled={!formData.name || !formData.fullName || !formData.address || !formData.city || !formData.phone}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4" />
                <span>{editingAddress ? 'Update Address' : 'Add Address'}</span>
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingAddress(null);
                  setFormData({
                    name: '',
                    fullName: '',
                    address: '',
                    city: '',
                    phone: '',
                    type: 'home',
                    isDefault: false
                  });
                }}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddressManager;
