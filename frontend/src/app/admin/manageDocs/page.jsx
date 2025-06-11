'use client';
import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import { 
  FileText,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Download,
  Share2,
  Archive,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  RefreshCcw,
  Plus,
  Folder,
  File,
  Tag,
  User,
  Calendar,
  Code,
  Book,
  HelpCircle
} from 'lucide-react';

// Sample document data
const documentsData = [
  {
    id: 'DOC-001',
    title: 'API Integration Guide',
    type: 'User Manual',
    status: 'Published',
    author: 'John Doe',
    lastModified: '2024-03-15 14:30',
    size: '2.4 MB',
    tags: ['API', 'Integration', 'Guide'],
    views: 1245,
    downloads: 342
  },
  {
    id: 'DOC-002',
    title: 'Database Schema Reference',
    type: 'Technical Doc',
    status: 'In Review',
    author: 'Jane Smith',
    lastModified: '2024-03-15 13:45',
    size: '1.8 MB',
    tags: ['Database', 'Schema', 'Reference'],
    views: 856,
    downloads: 213
  },
  {
    id: 'DOC-003',
    title: 'User Authentication Flow',
    type: 'API Doc',
    status: 'Draft',
    author: 'Robert Johnson',
    lastModified: '2024-03-14 09:15',
    size: '1.2 MB',
    tags: ['Auth', 'Security', 'API'],
    views: 0,
    downloads: 0
  }
];

export default function ManageDocs() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDocActions, setShowDocActions] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Published': return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'In Review': return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'Draft': return darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800';
      case 'In Progress': return darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800';
      default: return darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'User Manual': return <FileText size={16} className="text-blue-500" />;
      case 'Technical Doc': return <File size={16} className="text-purple-500" />;
      case 'API Doc': return <FileText size={16} className="text-green-500" />;
      case 'Tutorial': return <Book size={16} className="text-yellow-500" />;
      case 'Guide': return <HelpCircle size={16} className="text-red-500" />;
      default: return <FileText size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Add your manage docs content here */}
        <main className={`flex-1 overflow-auto p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
          {/* Header */}
          <header className={`${darkMode ? 'bg-gray-800 shadow-lg border-b border-gray-700' : 'bg-white shadow-md border-b border-gray-200'} transition-colors duration-300`}>
            <div className="px-6 py-4 flex items-center justify-between">
              <h1 className={`text-2xl font-semibold ${darkMode ? 'bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent' : 'text-gray-800'}`}>
                Manage Documents
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-lg transition-colors"
                  onClick={() => setShowUploadModal(true)}
                >
                  <Plus size={20} />
                  <span>New Document</span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
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
                      placeholder="Search documents..."
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
                    <option value="user-manual">User Manual</option>
                    <option value="technical">Technical Doc</option>
                    <option value="api">API Doc</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="guide">Guide</option>
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
                    <option value="published">Published</option>
                    <option value="in-review">In Review</option>
                    <option value="draft">Draft</option>
                    <option value="in-progress">In Progress</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Documents List */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                    <tr>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Document
                      </th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Type
                      </th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Status
                      </th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Author
                      </th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Last Modified
                      </th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Stats
                      </th>
                      <th scope="col" className={`px-6 py-3 text-right text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                    {documentsData.map((doc) => (
                      <tr key={doc.id} className={`transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {getTypeIcon(doc.type)}
                            </div>
                            <div className="ml-4">
                              <div className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                {doc.title}
                              </div>
                              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {doc.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                            {doc.type}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                            {doc.author}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {doc.lastModified}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Eye size={16} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                              <span className={`ml-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {doc.views}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Download size={16} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                              <span className={`ml-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {doc.downloads}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className={`p-1 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                              <Eye size={16} className="text-blue-600" />
                            </button>
                            <button className={`p-1 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                              <Edit size={16} className="text-indigo-600" />
                            </button>
                            <button 
                              className={`p-1 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                              onClick={() => setShowDocActions(showDocActions === doc.id ? null : doc.id)}
                            >
                              <MoreVertical size={16} className={darkMode ? "text-gray-300" : "text-gray-500"} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>

          {/* Upload Modal */}
          {showUploadModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl w-full max-w-md mx-4`}>
                <div className={`px-6 py-4 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Upload New Document
                  </h2>
                </div>
                <div className="p-6">
                  <form className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                        Document Title
                      </label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          darkMode 
                            ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                            : 'bg-gray-100 border border-gray-200 text-gray-700'
                        }`}
                        placeholder="Enter document title"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                        Document Type
                      </label>
                      <select
                        className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          darkMode 
                            ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                            : 'bg-gray-100 border border-gray-200 text-gray-700'
                        }`}
                      >
                        <option value="user-manual">User Manual</option>
                        <option value="technical">Technical Doc</option>
                        <option value="api">API Doc</option>
                        <option value="tutorial">Tutorial</option>
                        <option value="guide">Guide</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                        Upload File
                      </label>
                      <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
                        darkMode ? 'border-gray-600' : 'border-gray-300'
                      }`}>
                        <div className="space-y-1 text-center">
                          <div className="flex text-sm text-gray-600">
                            <label className={`relative cursor-pointer rounded-md font-medium ${
                              darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                            }`}>
                              <span>Upload a file</span>
                              <input type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            PDF, DOCX, or MD up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className={`px-6 py-4 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'} flex justify-end space-x-3`}>
                  <button
                    onClick={() => setShowUploadModal(false)}
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
                    Upload Document
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}