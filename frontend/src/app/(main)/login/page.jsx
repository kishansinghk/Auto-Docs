'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post('http://localhost:5000/user/authenticate', {
        email: formData.email,
        password: formData.password
      });

      if (response.status === 200) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Dispatch custom event to notify navbar of login state change
        window.dispatchEvent(new Event('loginStateChanged'));
        
        // Show success toast
  
        toast.success('Login successful! Welcome back!', {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#063970",
            color: "#fff",
            borderRadius: "10px",
            padding: "16px",
          },
        });

        // Redirect to dashboard
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Invalid email or password', {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#f87171",
          color: "#fff",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-gray-100">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          {/* Logo and Back Link */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center group">
              <motion.span 
                className="text-2xl mr-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                📄
              </motion.span>
              <span className="text-xl font-bold group-hover:text-blue-300 transition-colors duration-300">AutoDocs</span>
            </Link>
            <Link 
              href="/" 
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center"
            >
              <span className="mr-2">←</span> Back to Home
            </Link>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#112240] rounded-xl shadow-2xl p-8 border border-gray-800"
          >
            <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Welcome Back
            </h1>
            <p className="text-gray-400 mb-8">
              Sign in to continue to your AutoDocs account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-[#0a192f] border ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all duration-300`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-[#0a192f] border ${
                    errors.password ? 'border-red-500' : 'border-gray-700'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all duration-300`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </motion.div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-center"
                >
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-gray-700 bg-[#0a192f] text-blue-500 focus:ring-blue-500/20"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                    Remember me
                  </label>
                </motion.div>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </motion.button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#112240] text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: '🐦', label: 'Twitter' },
                  { icon: '🔗', label: 'GitHub' },
                  { icon: '📘', label: 'Google' }
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 px-4 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400 transition-all duration-300"
                  >
                    <span className="text-xl mr-2">{social.icon}</span>
                    <span className="text-sm">{social.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Signup Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link 
                  href="/signup" 
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 