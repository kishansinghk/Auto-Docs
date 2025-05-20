'use client';
import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import { 
  MessageSquare,
  Search,
  Filter,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  Flag,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  ChevronDown,
  ChevronRight,
  RefreshCcw,
  Reply,
  Archive,
  Trash2,
  AlertCircle
} from 'lucide-react';

// Sample feedback data
const feedbackData = [
  {
    id: 'FB-001',
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'JD'
    },
    type: 'Bug Report',
    priority: 'High',
    status: 'Open',
    rating: 2,
    message: 'The document search functionality is not working properly. When I try to search for specific terms, it returns irrelevant results.',
    createdAt: '2024-03-15 14:30',
    lastUpdated: '2024-03-15 14:30',
    attachments: ['screenshot1.png', 'error_log.txt']
  },
  {
    id: 'FB-002',
    user: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'JS'
    },
    type: 'Feature Request',
    priority: 'Medium',
    status: 'In Progress',
    rating: 4,
    message: 'It would be great to have a dark mode option for the documentation interface. This would help reduce eye strain during night-time reading.',
    createdAt: '2024-03-15 13:45',
    lastUpdated: '2024-03-15 15:20',
    attachments: []
  },
  {
    id: 'FB-003',
    user: {
      name: 'Robert Johnson',
      email: 'robert.j@example.com',
      avatar: 'RJ'
    },
    type: 'Content Issue',
    priority: 'Low',
    status: 'Resolved',
    rating: 5,
    message: 'The API documentation for the authentication endpoints needs to be updated with the new OAuth2 flow.',
    createdAt: '2024-03-14 09:15',
    lastUpdated: '2024-03-15 10:30',
    attachments: ['api_spec.pdf']
  },
  {
    id: 'FB-004',
    user: {
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      avatar: 'ED'
    },
    type: 'Bug Report',
    priority: 'High',
    status: 'Open',
    rating: 1,
    message: 'The documentation page crashes when trying to view large code snippets in the mobile view.',
    createdAt: '2024-03-15 15:20',
    lastUpdated: '2024-03-15 15:20',
    attachments: ['crash_report.txt']
  },
  {
    id: 'FB-005',
    user: {
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      avatar: 'MB'
    },
    type: 'Feature Request',
    priority: 'Medium',
    status: 'In Progress',
    rating: 3,
    message: 'Please add a "Copy to Clipboard" button for code examples in the documentation.',
    createdAt: '2024-03-15 11:30',
    lastUpdated: '2024-03-15 14:15',
    attachments: []
  }
];

export default function ReviewFeedback() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFeedbackActions, setShowFeedbackActions] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      case 'In Progress': return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      default: return darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return darkMode ? 'text-red-400' : 'text-red-600';
      case 'Medium': return darkMode ? 'text-yellow-400' : 'text-yellow-600';
      case 'Low': return darkMode ? 'text-green-400' : 'text-green-600';
      default: return darkMode ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Bug Report': return <AlertCircle size={16} className="text-red-500" />;
      case 'Feature Request': return <Star size={16} className="text-blue-500" />;
      case 'Content Issue': return <MessageSquare size={16} className="text-green-500" />;
      default: return <MessageSquare size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Add your feedback review content here */}
        <main className={`flex-1 overflow-auto p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
          {/* Your existing feedback review content */}
          {/* Header */}
          <header className={`${darkMode ? 'bg-gray-800 shadow-lg border-b border-gray-700' : 'bg-white shadow-md border-b border-gray-200'} transition-colors duration-300`}>
            <div className="px-6 py-4 flex items-center justify-between">
              <h1 className={`text-2xl font-semibold ${darkMode ? 'bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent' : 'text-gray-800'}`}>
                Review Feedback
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-lg transition-colors"
                >
                  <RefreshCcw size={20} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="p-6">
            {/* Filters and Search */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 mb-6`}>
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                    </div>
                    <input
                      type="text"
                      className={`pl-10 pr-4 py-2 w-full 
                        ${darkMode ? 'bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400' : 'bg-gray-100 border border-gray-200 text-gray-700 placeholder-gray-500'} 
                        rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Search feedback..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4">
                  <select
                    className={`px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                        : 'bg-gray-100 border border-gray-200 text-gray-700'
                    }`}
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="content">Content Issue</option>
                  </select>

                  <select
                    className={`px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                        : 'bg-gray-100 border border-gray-200 text-gray-700'
                    }`}
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>

                  <select
                    className={`px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                        : 'bg-gray-100 border border-gray-200 text-gray-700'
                    }`}
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Feedback List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Feedback Items */}
              <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
                <div className="divide-y divide-gray-200">
                  {feedbackData.map((feedback) => (
                    <div 
                      key={feedback.id}
                      className={`p-6 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors cursor-pointer`}
                      onClick={() => setSelectedFeedback(feedback)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-medium">
                            {feedback.user.avatar}
                          </div>
                          <div>
                            <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                              {feedback.user.name}
                            </h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {feedback.user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(feedback.status)}`}>
                            {feedback.status}
                          </span>
                          <button 
                            className={`p-1 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowFeedbackActions(showFeedbackActions === feedback.id ? null : feedback.id);
                            }}
                          >
                            <MoreVertical size={16} className={darkMode ? "text-gray-300" : "text-gray-500"} />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          {getTypeIcon(feedback.type)}
                          <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            {feedback.type}
                          </span>
                          <span className={`text-sm ${getPriorityColor(feedback.priority)}`}>
                            {feedback.priority} Priority
                          </span>
                        </div>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} line-clamp-2`}>
                          {feedback.message}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star size={16} className="text-yellow-500" />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {feedback.rating}/5
                            </span>
                          </div>
                          {feedback.attachments.length > 0 && (
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {feedback.attachments.length} attachment(s)
                            </span>
                          )}
                        </div>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {feedback.createdAt}
                        </span>
                      </div>

                      {showFeedbackActions === feedback.id && (
                        <div className={`absolute right-0 mt-2 w-48 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} rounded-md shadow-lg overflow-hidden z-20`}>
                          <div className="py-1">
                            <button 
                              className={`w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                              onClick={() => setShowReplyModal(true)}
                            >
                              <div className="flex items-center space-x-2">
                                <Reply size={16} />
                                <span>Reply</span>
                              </div>
                            </button>
                            <button className={`w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                              <div className="flex items-center space-x-2">
                                <Archive size={16} />
                                <span>Archive</span>
                              </div>
                            </button>
                            <div className={`my-1 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}></div>
                            <button className={`w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'}`}>
                              <div className="flex items-center space-x-2">
                                <Trash2 size={16} />
                                <span>Delete</span>
                              </div>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback Details */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
                {selectedFeedback ? (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Feedback Details
                      </h2>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedFeedback.status)}`}>
                        {selectedFeedback.status}
                      </span>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          User Information
                        </h3>
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-medium">
                            {selectedFeedback.user.avatar}
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                              {selectedFeedback.user.name}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {selectedFeedback.user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Feedback Information
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Type</span>
                            <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                              {selectedFeedback.type}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Priority</span>
                            <span className={`text-sm font-medium ${getPriorityColor(selectedFeedback.priority)}`}>
                              {selectedFeedback.priority}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Rating</span>
                            <div className="flex items-center space-x-1">
                              <Star size={16} className="text-yellow-500" />
                              <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                {selectedFeedback.rating}/5
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Message
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {selectedFeedback.message}
                        </p>
                      </div>

                      {selectedFeedback.attachments.length > 0 && (
                        <div>
                          <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Attachments
                          </h3>
                          <div className="space-y-2">
                            {selectedFeedback.attachments.map((attachment, index) => (
                              <div 
                                key={index}
                                className={`flex items-center space-x-2 p-2 rounded-lg ${
                                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                                }`}
                              >
                                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {attachment}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t border-gray-200">
                        <button
                          onClick={() => setShowReplyModal(true)}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-lg transition-colors"
                        >
                          <Reply size={16} />
                          <span>Reply to Feedback</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`flex items-center justify-center h-full ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <p>Select a feedback item to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Reply Modal */}
        {showReplyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl w-full max-w-md mx-4`}>
              <div className={`px-6 py-4 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Reply to Feedback
                </h2>
              </div>
              <div className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Your Response
                    </label>
                    <textarea
                      className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        darkMode 
                          ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                          : 'bg-gray-100 border border-gray-200 text-gray-700'
                      }`}
                      rows={4}
                      placeholder="Type your response here..."
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Update Status
                    </label>
                    <select
                      className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        darkMode 
                          ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                          : 'bg-gray-100 border border-gray-200 text-gray-700'
                      }`}
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className={`px-6 py-4 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'} flex justify-end space-x-3`}>
                <button
                  onClick={() => setShowReplyModal(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    darkMode 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 rounded-lg transition-colors"
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}