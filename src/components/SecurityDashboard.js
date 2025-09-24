import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Bell, 
  AlertTriangle, 
  CheckCircle,
  Settings,
  Key,
  Smartphone,
  Globe,
  Cookie,
  MapPin,
  BarChart3,
  X
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';
import { checkPasswordStrength } from '../utils/security';

const SecurityDashboard = () => {
  const {
    privacySettings,
    securityLevel,
    twoFactorEnabled,
    securityAlerts,
    updatePrivacySettings,
    updateSecurityLevel,
    toggleTwoFactor,
    markAlertAsRead,
    clearSecurityAlerts,
    getSecurityStatus
  } = useSecurity();

  const [activeTab, setActiveTab] = useState('privacy');
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(null);

  const securityStatus = getSecurityStatus();

  const handlePasswordChange = (password) => {
    setNewPassword(password);
    setPasswordStrength(checkPasswordStrength(password));
  };

  const tabs = [
    { id: 'privacy', label: 'Privacy Settings', icon: <Eye className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'alerts', label: 'Security Alerts', icon: <Bell className="w-4 h-4" /> },
    { id: 'data', label: 'Data Protection', icon: <Lock className="w-4 h-4" /> }
  ];

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Cookie className="w-5 h-5 mr-2 text-primary-600" />
          Cookie Preferences
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Essential Cookies</h4>
              <p className="text-sm text-gray-600">Required for the website to function properly</p>
            </div>
            <div className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600">
              Always Active
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
              <p className="text-sm text-gray-600">Help us improve our website performance</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={privacySettings.analytics}
                onChange={(e) => updatePrivacySettings({ analytics: e.target.checked })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
              <p className="text-sm text-gray-600">Used to deliver personalized ads</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={privacySettings.marketing}
                onChange={(e) => updatePrivacySettings({ marketing: e.target.checked })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-primary-600" />
          Location & Tracking
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Location Tracking</h4>
              <p className="text-sm text-gray-600">Allow location-based features and delivery</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={privacySettings.locationTracking}
                onChange={(e) => updatePrivacySettings({ locationTracking: e.target.checked })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Data Collection</h4>
              <p className="text-sm text-gray-600">Collect usage data to improve services</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={privacySettings.dataCollection}
                onChange={(e) => updatePrivacySettings({ dataCollection: e.target.checked })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-primary-600" />
          Security Level
        </h3>
        
        <div className="space-y-3">
          {['standard', 'enhanced', 'maximum'].map((level) => (
            <label key={level} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="securityLevel"
                value={level}
                checked={securityLevel === level}
                onChange={(e) => updateSecurityLevel(e.target.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <div>
                <div className="font-medium text-gray-900 capitalize">{level} Security</div>
                <div className="text-sm text-gray-600">
                  {level === 'standard' && 'Basic protection with essential security features'}
                  {level === 'enhanced' && 'Additional security measures and monitoring'}
                  {level === 'maximum' && 'Highest level of security with all features enabled'}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Smartphone className="w-5 h-5 mr-2 text-primary-600" />
          Two-Factor Authentication
        </h3>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Enable 2FA</h4>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={twoFactorEnabled}
              onChange={(e) => toggleTwoFactor(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Key className="w-5 h-5 mr-2 text-primary-600" />
          Change Password
        </h3>
        
        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          {passwordStrength && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-medium text-gray-700">Password Strength:</div>
                <div className={`text-sm font-medium ${
                  passwordStrength.strength === 'weak' ? 'text-red-600' :
                  passwordStrength.strength === 'medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {passwordStrength.strength.toUpperCase()}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={`flex items-center space-x-1 ${passwordStrength.checks.length ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>8+ characters</span>
                </div>
                <div className={`flex items-center space-x-1 ${passwordStrength.checks.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>Uppercase letter</span>
                </div>
                <div className={`flex items-center space-x-1 ${passwordStrength.checks.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>Lowercase letter</span>
                </div>
                <div className={`flex items-center space-x-1 ${passwordStrength.checks.number ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>Number</span>
                </div>
                <div className={`flex items-center space-x-1 ${passwordStrength.checks.special ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>Special character</span>
                </div>
              </div>
            </div>
          )}
          
          <button
            disabled={!passwordStrength || passwordStrength.strength === 'weak'}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecurityAlerts = () => (
    <div className="space-y-4">
      {securityAlerts.length === 0 ? (
        <div className="bg-white rounded-xl p-8 shadow-soft text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Security Alerts</h3>
          <p className="text-gray-600">Your account is secure with no active alerts.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Security Alerts</h3>
            <button
              onClick={clearSecurityAlerts}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Clear All
            </button>
          </div>
          
          {securityAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-xl p-4 shadow-soft border-l-4 ${
                alert.type === 'error' ? 'border-red-500' :
                alert.type === 'warning' ? 'border-yellow-500' :
                'border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                    alert.type === 'error' ? 'text-red-500' :
                    alert.type === 'warning' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <div>
                    <div className="font-medium text-gray-900">{alert.message}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {new Date(alert.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => markAlertAsRead(alert.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );

  const renderDataProtection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
          Data Usage Overview
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-primary-600">2.4 MB</div>
            <div className="text-sm text-gray-600">Profile Data</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-primary-600">15.7 MB</div>
            <div className="text-sm text-gray-600">Order History</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-primary-600">8.3 MB</div>
            <div className="text-sm text-gray-600">Preferences</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Rights</h3>
        
        <div className="space-y-3">
          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">Download Your Data</div>
            <div className="text-sm text-gray-600">Get a copy of all your personal data</div>
          </button>
          
          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">Request Data Correction</div>
            <div className="text-sm text-gray-600">Update or correct your personal information</div>
          </button>
          
          <button className="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600">
            <div className="font-medium">Delete Account & Data</div>
            <div className="text-sm">Permanently remove your account and all associated data</div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Security & Privacy</h1>
          <p className="text-gray-600">Manage your security settings and privacy preferences</p>
        </div>

        {/* Security Status */}
        <div className="bg-white rounded-xl p-6 shadow-soft mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                securityStatus.securityLevel === 'maximum' ? 'bg-green-100' :
                securityStatus.securityLevel === 'enhanced' ? 'bg-yellow-100' :
                'bg-gray-100'
              }`}>
                <Shield className={`w-6 h-6 ${
                  securityStatus.securityLevel === 'maximum' ? 'text-green-600' :
                  securityStatus.securityLevel === 'enhanced' ? 'text-yellow-600' :
                  'text-gray-600'
                }`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 capitalize">
                  {securityStatus.securityLevel} Security Level
                </h3>
                <p className="text-sm text-gray-600">
                  {securityStatus.twoFactorEnabled ? 'Two-factor authentication enabled' : 'Two-factor authentication disabled'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Last login</div>
              <div className="font-medium text-gray-900">
                {securityStatus.lastLogin ? new Date(securityStatus.lastLogin).toLocaleDateString() : 'Never'}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-soft mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.id === 'alerts' && securityStatus.unreadAlerts > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {securityStatus.unreadAlerts}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'privacy' && renderPrivacySettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'alerts' && renderSecurityAlerts()}
          {activeTab === 'data' && renderDataProtection()}
        </motion.div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
