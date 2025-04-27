'use client'
import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage({ 
        type: 'success', 
        text: 'Thank you for your message. We will get back to you soon!' 
      });
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Have questions about Autodocs? We're here to help.
          </p>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Left side - Contact Info */}
            <div className="bg-blue-600 text-white p-8 md:w-1/3">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div>
                  <p className="font-medium">Email</p>
                  <p className="mt-1">support@autodocs.com</p>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="mt-1">(123) 456-7890</p>
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="mt-1">
                    123 Documentation Lane<br />
                    Suite 456<br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </div>
              <div className="mt-12">
                <p className="font-medium">Follow Us</p>
                <div className="flex space-x-4 mt-2">
                  <a href="#" className="hover:text-blue-200">Twitter</a>
                  <a href="#" className="hover:text-blue-200">LinkedIn</a>
                  <a href="#" className="hover:text-blue-200">GitHub</a>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-8 md:w-2/3">
              <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
              
              {submitMessage.text && (
                <div className={`mb-6 p-4 rounded ${submitMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {submitMessage.text}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 flex items-center justify-center font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="font-semibold text-lg text-gray-900">What is Autodocs?</h3>
              <p className="mt-2 text-gray-600">Autodocs is an intelligent documentation platform that helps teams create, manage, and share documentation effortlessly.</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="font-semibold text-lg text-gray-900">Do you offer a free trial?</h3>
              <p className="mt-2 text-gray-600">Yes! We offer a 14-day free trial with no credit card required. You can explore all features during this period.</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="font-semibold text-lg text-gray-900">How quickly do you respond to inquiries?</h3>
              <p className="mt-2 text-gray-600">We typically respond to all inquiries within 24 hours during business days. Premium support plans receive priority responses.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}