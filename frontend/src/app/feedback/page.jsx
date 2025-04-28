'use client';
import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

export default function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !feedback) {
      setError('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // In a real implementation, you would send the feedback data to your backend
    console.log({ name, email, feedback });
    
    setError('');
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setName('');
      setEmail('');
      setFeedback('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">We Value Your Feedback</h1>
        <p className="text-gray-600 mt-2">Help us improve our documentation</p>
      </div>

      {submitted ? (
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="text-green-500" size={24} />
          </div>
          <h2 className="text-lg font-medium text-green-800">Thank you for your feedback!</h2>
          <p className="text-green-700 mt-2">We appreciate your input and will use it to improve our documentation.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 p-3 rounded text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
              Feedback
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Please share your thoughts, suggestions, or report any issues you've encountered..."
            />
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
            >
              <Send size={18} className="mr-2" />
              Submit Feedback
            </button>
          </div>
        </form>
      )}
    </div>
  );
}