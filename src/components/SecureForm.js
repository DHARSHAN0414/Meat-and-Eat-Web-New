import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle, 
  Shield,
  Lock,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { 
  sanitizeInput, 
  validateEmail, 
  validatePassword, 
  validatePhoneNumber,
  checkPasswordStrength,
  generateCSRFToken
} from '../utils/security';

const SecureInput = ({ 
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  validation,
  icon: Icon,
  className = "",
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value && validation) {
      const result = validation(value);
      setIsValid(result.isValid);
      setErrorMessage(result.message || '');
    } else if (value) {
      setIsValid(true);
      setErrorMessage('');
    } else {
      setIsValid(null);
      setErrorMessage('');
    }
  }, [value, validation]);

  const handleChange = (e) => {
    const sanitizedValue = sanitizeInput(e.target.value);
    onChange({ target: { name, value: sanitizedValue } });
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          className={`
            w-full px-4 py-3 
            ${Icon ? 'pl-12' : 'pl-4'}
            ${type === 'password' ? 'pr-12' : 'pr-4'}
            border rounded-lg transition-all duration-200
            ${isValid === false ? 'border-red-500 bg-red-50' : 
              isValid === true ? 'border-green-500 bg-green-50' : 
              isFocused ? 'border-primary-500 bg-white' : 
              'border-gray-200 bg-white'}
            focus:outline-none focus:ring-2 focus:ring-primary-500/20
          `}
          {...props}
        />
        
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
        
        {isValid !== null && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isValid ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
        )}
      </div>
      
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-600 flex items-center space-x-1"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{errorMessage}</span>
        </motion.div>
      )}
    </div>
  );
};

const PasswordStrengthIndicator = ({ password }) => {
  const strength = password ? checkPasswordStrength(password) : null;
  
  if (!strength) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 space-y-2"
    >
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Password strength:</span>
        <span className={`text-sm font-medium ${
          strength.strength === 'weak' ? 'text-red-600' :
          strength.strength === 'medium' ? 'text-yellow-600' :
          'text-green-600'
        }`}>
          {strength.strength.toUpperCase()}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            strength.strength === 'weak' ? 'bg-red-500 w-1/3' :
            strength.strength === 'medium' ? 'bg-yellow-500 w-2/3' :
            'bg-green-500 w-full'
          }`}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className={`flex items-center space-x-1 ${strength.checks.length ? 'text-green-600' : 'text-gray-400'}`}>
          <CheckCircle className="w-3 h-3" />
          <span>8+ characters</span>
        </div>
        <div className={`flex items-center space-x-1 ${strength.checks.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
          <CheckCircle className="w-3 h-3" />
          <span>Uppercase</span>
        </div>
        <div className={`flex items-center space-x-1 ${strength.checks.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
          <CheckCircle className="w-3 h-3" />
          <span>Lowercase</span>
        </div>
        <div className={`flex items-center space-x-1 ${strength.checks.number ? 'text-green-600' : 'text-gray-400'}`}>
          <CheckCircle className="w-3 h-3" />
          <span>Number</span>
        </div>
        <div className={`flex items-center space-x-1 ${strength.checks.special ? 'text-green-600' : 'text-gray-400'}`}>
          <CheckCircle className="w-3 h-3" />
          <span>Special char</span>
        </div>
      </div>
    </motion.div>
  );
};

const SecureForm = ({ 
  onSubmit, 
  children, 
  className = "",
  enableCSRF = true,
  ...props 
}) => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    if (enableCSRF) {
      setCsrfToken(generateCSRFToken());
    }
  }, [enableCSRF]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (enableCSRF) {
      // Add CSRF token to form data
      const formData = new FormData(e.target);
      formData.append('_csrf', csrfToken);
      onSubmit(e, { csrfToken });
    } else {
      onSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`space-y-6 ${className}`}
      {...props}
    >
      {enableCSRF && (
        <input type="hidden" name="_csrf" value={csrfToken} />
      )}
      {children}
    </form>
  );
};

// Pre-configured secure form components
export const LoginForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const emailValidation = (email) => ({
    isValid: validateEmail(email),
    message: validateEmail(email) ? '' : 'Please enter a valid email address'
  });

  const passwordValidation = (password) => ({
    isValid: password.length >= 8,
    message: password.length >= 8 ? '' : 'Password must be at least 8 characters'
  });

  return (
    <SecureForm onSubmit={(e) => onSubmit(formData, e)} className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Secure Login</h2>
        <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
      </div>

      <SecureInput
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email address"
        validation={emailValidation}
        icon={Mail}
        required
      />

      <SecureInput
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        validation={passwordValidation}
        icon={Lock}
        required
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="rounded text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <button type="button" className="text-sm text-primary-600 hover:text-primary-700">
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading || !formData.email || !formData.password}
        className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Shield className="w-5 h-5" />
        <span>{loading ? 'Signing in...' : 'Sign In Securely'}</span>
      </button>
    </SecureForm>
  );
};

export const SignupForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nameValidation = (name) => ({
    isValid: name.length >= 2,
    message: name.length >= 2 ? '' : 'Name must be at least 2 characters'
  });

  const emailValidation = (email) => ({
    isValid: validateEmail(email),
    message: validateEmail(email) ? '' : 'Please enter a valid email address'
  });

  const phoneValidation = (phone) => ({
    isValid: validatePhoneNumber(phone),
    message: validatePhoneNumber(phone) ? '' : 'Please enter a valid phone number'
  });

  const passwordValidation = (password) => ({
    isValid: validatePassword(password),
    message: validatePassword(password) ? '' : 'Password must meet security requirements'
  });

  const confirmPasswordValidation = (confirmPassword) => ({
    isValid: confirmPassword === formData.password && confirmPassword.length > 0,
    message: confirmPassword === formData.password ? '' : 'Passwords do not match'
  });

  return (
    <SecureForm onSubmit={(e) => onSubmit(formData, e)} className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-600 mt-2">Join us with enhanced security protection</p>
      </div>

      <SecureInput
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full name"
        validation={nameValidation}
        icon={User}
        required
      />

      <SecureInput
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email address"
        validation={emailValidation}
        icon={Mail}
        required
      />

      <SecureInput
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone number"
        validation={phoneValidation}
        icon={Phone}
        required
      />

      <div>
        <SecureInput
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          validation={passwordValidation}
          icon={Lock}
          required
        />
        <PasswordStrengthIndicator password={formData.password} />
      </div>

      <SecureInput
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm password"
        validation={confirmPasswordValidation}
        icon={Lock}
        required
      />

      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          className="mt-1 rounded text-primary-600 focus:ring-primary-500"
          required
        />
        <label className="text-sm text-gray-600">
          I agree to the{' '}
          <button type="button" className="text-primary-600 hover:text-primary-700">
            Terms of Service
          </button>{' '}
          and{' '}
          <button type="button" className="text-primary-600 hover:text-primary-700">
            Privacy Policy
          </button>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading || !formData.agreeToTerms || !validateEmail(formData.email) || !validatePassword(formData.password)}
        className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Shield className="w-5 h-5" />
        <span>{loading ? 'Creating account...' : 'Create Secure Account'}</span>
      </button>
    </SecureForm>
  );
};

export { SecureForm, SecureInput, PasswordStrengthIndicator };
