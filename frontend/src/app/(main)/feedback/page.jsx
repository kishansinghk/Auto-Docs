'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';

// Validation Schema
const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  subject: Yup.string()
    .min(5, 'Subject is too short')
    .max(100, 'Subject is too long')
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message is too short')
    .max(1000, 'Message is too long')
    .required('Message is required'),
  feedbackType: Yup.string()
    .oneOf(['suggestion', 'bug', 'feature'], 'Please select a feedback type')
    .required('Please select a feedback type'),
  rating: Yup.number()
    .min(1, 'Please provide a rating')
    .max(5, 'Rating cannot be more than 5')
    .required('Please provide a rating')
});

export default function FeedbackPage() {
  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
    feedbackType: 'suggestion',
    rating: 0
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('http://localhost:5000/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Feedback submitted successfully!');
        resetForm();
      } else {
        toast.error(data.message || 'Failed to submit feedback');
      }
    } catch (error) {
      toast.error('Error submitting feedback');
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Custom form field component
  const FormField = ({ field, form: { touched, errors }, label, ...props }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`w-full px-4 py-3 bg-[#0a192f] border ${
          touched[field.name] && errors[field.name]
            ? 'border-red-500'
            : 'border-gray-700'
        } rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300`}
      />
      {touched[field.name] && errors[field.name] && (
        <div className="text-red-500 text-sm mt-1">{errors[field.name]}</div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#0a192f] text-gray-100">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            >
              Share Your Feedback
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Help us improve AutoDocs by sharing your thoughts and suggestions.
            </motion.p>
          </div>

          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-[#112240] rounded-xl shadow-2xl p-8 border border-gray-800"
          >
            <Formik
              initialValues={initialValues}
              validationSchema={FeedbackSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, isSubmitting, touched, errors }) => (
                <Form className="space-y-8">
                  {/* Feedback Type Selection */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Type of Feedback</h2>                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { id: 'suggestion', label: 'Suggestion', icon: '💡' },
                        { id: 'bug', label: 'Bug Report', icon: '🐛' },
                        { id: 'feature', label: 'Feature Request', icon: '✨' }
                      ].map((type) => (
                        <motion.button
                          key={type.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFieldValue('feedbackType', type.id)}
                          className={`p-4 rounded-lg border transition-all duration-300 ${
                            values.feedbackType === type.id
                              ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                              : 'bg-[#0a192f] border-gray-700 text-gray-400 hover:border-blue-500/50'
                          }`}
                        >
                          <span className="text-2xl mb-2 block">{type.icon}</span>
                          <span className="font-medium">{type.label}</span>
                        </motion.button>
                      ))}
                    </div>
                    {touched.feedbackType && errors.feedbackType && (
                      <div className="text-red-500 text-sm">{errors.feedbackType}</div>
                    )}
                  </div>

                  {/* Rating Section */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">How would you rate your experience?</h2>
                    <div className="flex justify-center gap-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setFieldValue('rating', star)}
                          className="text-4xl"
                        >
                          <span className={values.rating >= star ? 'text-yellow-400' : 'text-gray-600'}>
                            ★
                          </span>
                        </motion.button>
                      ))}
                    </div>
                    {touched.rating && errors.rating && (
                      <div className="text-red-500 text-sm text-center">{errors.rating}</div>
                    )}
                  </div>

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Field
                      name="name"
                      label="Name"
                      placeholder="Your name"
                      component={FormField}
                    />
                    <Field
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      component={FormField}
                    />
                  </div>

                  <Field
                    name="subject"
                    label="Subject"
                    placeholder="Brief description of your feedback"
                    component={FormField}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <Field
                      as="textarea"
                      name="message"
                      rows="6"
                      className={`w-full px-4 py-3 bg-[#0a192f] border ${
                        touched.message && errors.message
                          ? 'border-red-500'
                          : 'border-gray-700'
                      } rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300`}
                      placeholder="Please provide detailed feedback..."
                    />
                    {touched.message && errors.message && (
                      <div className="text-red-500 text-sm mt-1">{errors.message}</div>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="pt-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </motion.button>
                  </motion.div>
                </Form>
              )}
            </Formik>
          </motion.div>

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-300">
              Thank you for helping us improve AutoDocs! We appreciate your time and feedback.
            </p>
            <Link 
              href="/"
              className="inline-block mt-4 text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}