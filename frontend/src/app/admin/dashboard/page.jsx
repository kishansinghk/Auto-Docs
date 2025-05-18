'use client';
import { useState } from 'react';
import { 
  BarChart, 
  LineChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Bell,
  Settings,
  HelpCircle,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Home,
  PieChart,
  Folder,
  Calendar,
  MessageSquare,
  AlertCircle,
  Check,
  BarChart2,
  FileCheck,
  Edit,
  Eye,
  Filter,
  ArrowRight,
  RefreshCcw,
  ChevronRight
} from 'lucide-react';

// Sample data for charts
const documentsData = [
  { name: 'Jan', created: 45, processed: 40, published: 35 },
  { name: 'Feb', created: 52, processed: 48, published: 45 },
  { name: 'Mar', created: 61, processed: 55, published: 52 },
  { name: 'Apr', created: 67, processed: 60, published: 56 },
  { name: 'May', created: 70, processed: 66, published: 61 },
  { name: 'Jun', created: 78, processed: 72, published: 67 },
  { name: 'Jul', created: 85, processed: 78, published: 74 },
];

const documentTypeData = [
  { name: 'User Manuals', count: 124, color: '#3B82F6' },
  { name: 'API Docs', count: 85, color: '#10B981' },
  { name: 'Tutorials', count: 67, color: '#F59E0B' },
  { name: 'Guides', count: 92, color: '#6366F1' },
  { name: 'Reference', count: 53, color: '#EC4899' },
];

const recentDocuments = [
  { id: 'DOC-1234', title: 'API Integration Guide', author: 'John Doe', date: '2025-05-09', status: 'Published', priority: 'High' },
  { id: 'DOC-1235', title: 'User Authentication Manual', author: 'Jane Smith', date: '2025-05-08', status: 'In Review', priority: 'Medium' },
  { id: 'DOC-1236', title: 'Database Schema Reference', author: 'Robert Johnson', date: '2025-05-08', status: 'Draft', priority: 'High' },
  { id: 'DOC-1237', title: 'Mobile App Setup Guide', author: 'Emily Davis', date: '2025-05-07', status: 'Published', priority: 'Low' },
  { id: 'DOC-1238', title: 'Troubleshooting Guide', author: 'Michael Brown', date: '2025-05-07', status: 'In Progress', priority: 'Medium' },
];

const unreadNotifications = [
  { id: 1, message: 'New document submitted for review', time: '10 minutes ago', type: 'info' },
  { id: 2, message: 'API Documentation update approved', time: '1 hour ago', type: 'success' },
  { id: 3, message: 'Server maintenance scheduled', time: '2 hours ago', type: 'warning' }
];

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedDocType, setSelectedDocType] = useState('all');
  const [darkMode, setDarkMode] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Published': return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'In Review': return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'Draft': return darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800';
      case 'In Progress': return darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800';
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

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success': return <Check className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'info': return <MessageSquare className="h-5 w-5 text-blue-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} ${darkMode ? 'bg-gray-800' : 'bg-white'} text-white transition-all duration-300 ease-in-out shadow-lg`}>
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">AutoDocs</span>
            </div>
          )}
          <button onClick={toggleSidebar} className={`p-1 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-5">
          <ul>
            <li className="mb-2">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full px-4 py-3 flex items-center ${
                  activeTab === 'overview' 
                    ? darkMode 
                      ? 'bg-gray-700 text-blue-400' 
                      : 'bg-indigo-700 text-white'
                    : darkMode
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-indigo-700 text-white'
                } rounded-md mx-2 transition-colors duration-200`}
              >
                <Home size={20} />
                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
              </button>
            </li>
            <li className="mb-2">
              <button 
                onClick={() => setActiveTab('documents')}
                className={`w-full px-4 py-3 flex items-center ${
                  activeTab === 'documents' 
                    ? darkMode 
                      ? 'bg-gray-700 text-blue-400' 
                      : 'bg-indigo-700 text-white'
                    : darkMode
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-indigo-700 text-white'
                } rounded-md mx-2 transition-colors duration-200`}
              >
                <FileText size={20} />
                {isSidebarOpen && <span className="ml-3">Documents</span>}
              </button>
            </li>
            <li className="mb-2">
              <button 
                onClick={() => setActiveTab('users')}
                className={`w-full px-4 py-3 flex items-center ${
                  activeTab === 'users' 
                    ? darkMode 
                      ? 'bg-gray-700 text-blue-400' 
                      : 'bg-indigo-700 text-white'
                    : darkMode
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-indigo-700 text-white'
                } rounded-md mx-2 transition-colors duration-200`}
              >
                <Users size={20} />
                {isSidebarOpen && <span className="ml-3">Users</span>}
              </button>
            </li>
            <li className="mb-2">
              <button 
                onClick={() => setActiveTab('analytics')}
                className={`w-full px-4 py-3 flex items-center ${
                  activeTab === 'analytics' 
                    ? darkMode 
                      ? 'bg-gray-700 text-blue-400' 
                      : 'bg-indigo-700 text-white'
                    : darkMode
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-indigo-700 text-white'
                } rounded-md mx-2 transition-colors duration-200`}
              >
                <BarChart2 size={20} />
                {isSidebarOpen && <span className="ml-3">Analytics</span>}
              </button>
            </li>
            <li className="mb-2">
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full px-4 py-3 flex items-center ${
                  activeTab === 'settings' 
                    ? darkMode 
                      ? 'bg-gray-700 text-blue-400' 
                      : 'bg-indigo-700 text-white'
                    : darkMode
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-indigo-700 text-white'
                } rounded-md mx-2 transition-colors duration-200`}
              >
                <Settings size={20} />
                {isSidebarOpen && <span className="ml-3">Settings</span>}
              </button>
            </li>
          </ul>
        </nav>
        {isSidebarOpen && (
          <div className={`absolute bottom-0 w-64 p-4 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
            <div 
              className={`px-6 py-3 flex items-center justify-between cursor-pointer ${
                darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              } rounded-r-xl transition-colors duration-200`}
              onClick={toggleTheme}
            >
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5">
                  {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
              </div>
              <div>
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Header */}
        <header className={`${darkMode ? 'bg-gray-800 shadow-lg border-b border-gray-700' : 'bg-white shadow-md border-b border-gray-200'} transition-colors duration-300`}>
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className={`text-2xl font-semibold ${darkMode ? 'bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent' : 'text-gray-800'}`}>Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className={`relative group ${searchFocused ? 'w-64' : 'w-40'} transition-all duration-300`}>
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
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <button 
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative`}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell size={20} className={darkMode ? "text-gray-300" : "text-gray-600"} />
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {unreadNotifications.length}
                  </span>
                </button>
                
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-80 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} rounded-md shadow-lg overflow-hidden z-20`}>
                    <div className={`p-3 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                      <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Notifications</h3>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {unreadNotifications.map((notification) => (
                        <div key={notification.id} className={`p-3 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-100'}`}>
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="ml-3 w-0 flex-1">
                              <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{notification.message}</p>
                              <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={`p-3 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} text-center`}>
                      <button className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-indigo-600 hover:text-indigo-800'} font-medium`}>
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User menu */}
              <div className="relative">
                <button 
                  className={`flex items-center space-x-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                  <ChevronDown size={16} className={darkMode ? "text-gray-300" : "text-gray-500"} />
                </button>
                
                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-48 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} rounded-md shadow-lg overflow-hidden z-20`}>
                    <div className="py-1">
                      <a href="#profile" className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>Profile</a>
                      <a href="#settings" className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>Settings</a>
                      <div className={`my-1 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}></div>
                      <a href="#logout" className={`block px-4 py-2 text-sm ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'}`}>Sign out</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className={`p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 transition-transform hover:scale-105 cursor-pointer`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-sm uppercase font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Documents</h3>
                <div className={`p-2 rounded-full ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <FileText size={20} className={darkMode ? "text-blue-400" : "text-blue-600"} />
                </div>
              </div>
              <p className={`text-3xl font-bold mt-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>421</p>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp size={16} className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+12.5%</span>
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>from last month</span>
              </div>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 transition-transform hover:scale-105 cursor-pointer`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-sm uppercase font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Users</h3>
                <div className={`p-2 rounded-full ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                  <Users size={20} className={darkMode ? "text-green-400" : "text-green-600"} />
                </div>
              </div>
              <p className={`text-3xl font-bold mt-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>157</p>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp size={16} className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+8.3%</span>
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>from last month</span>
              </div>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 transition-transform hover:scale-105 cursor-pointer`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-sm uppercase font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pending Reviews</h3>
                <div className={`p-2 rounded-full ${darkMode ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
                  <Eye size={20} className={darkMode ? "text-yellow-400" : "text-yellow-600"} />
                </div>
              </div>
              <p className={`text-3xl font-bold mt-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>24</p>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp size={16} className="text-red-500 mr-1" />
                <span className="text-red-500 font-medium">+15.2%</span>
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>from last month</span>
              </div>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 transition-transform hover:scale-105 cursor-pointer`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-sm uppercase font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>New Docs Today</h3>
                <div className={`p-2 rounded-full ${darkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
                  <FileCheck size={20} className={darkMode ? "text-purple-400" : "text-purple-600"} />
                </div>
              </div>
              <p className={`text-3xl font-bold mt-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>12</p>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp size={16} className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+3.6%</span>
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>from yesterday</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Document Activity Chart */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} lg:col-span-2 rounded-lg shadow p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-lg font-semibold ${darkMode ? 'bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent' : 'text-gray-800'}`}>Document Activity</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSelectedPeriod('weekly')}
                    className={`px-3 py-1 text-sm rounded-md ${
                      selectedPeriod === 'weekly' 
                        ? darkMode 
                          ? 'bg-blue-900 text-blue-300' 
                          : 'bg-indigo-100 text-indigo-700'
                        : darkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Weekly
                  </button>
                  <button 
                    onClick={() => setSelectedPeriod('monthly')}
                    className={`px-3 py-1 text-sm rounded-md ${
                      selectedPeriod === 'monthly' 
                        ? darkMode 
                          ? 'bg-blue-900 text-blue-300' 
                          : 'bg-indigo-100 text-indigo-700'
                        : darkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setSelectedPeriod('yearly')}
                    className={`px-3 py-1 text-sm rounded-md ${
                      selectedPeriod === 'yearly' 
                        ? darkMode 
                          ? 'bg-blue-900 text-blue-300' 
                          : 'bg-indigo-100 text-indigo-700'
                        : darkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={documentsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#f0f0f0"} />
                    <XAxis dataKey="name" stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
                    <YAxis stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1F2937' : '#ffffff',
                        borderColor: darkMode ? '#374151' : '#e5e7eb',
                        borderRadius: '0.375rem',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="created" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} name="Created" />
                    <Line type="monotone" dataKey="processed" stroke="#10B981" strokeWidth={2} name="Processed" />
                    <Line type="monotone" dataKey="published" stroke="#6366F1" strokeWidth={2} name="Published" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Document Types */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-lg font-semibold ${darkMode ? 'bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent' : 'text-gray-800'}`}>Document Types</h2>
                <button className={`p-1 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <RefreshCcw size={16} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                </button>
              </div>
              
              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={documentTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {documentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1F2937' : '#ffffff',
                        borderColor: darkMode ? '#374151' : '#e5e7eb',
                        borderRadius: '0.375rem',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>

              <div>
                {documentTypeData.map((type) => (
                  <div key={type.name} className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: type.color }}></span>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{type.name}</span>
                    </div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{type.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Documents */}
          <div className={`mt-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
            <div className={`px-6 py-4 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'} flex justify-between items-center`}>
              <h2 className={`text-lg font-semibold ${darkMode ? 'bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent' : 'text-gray-800'}`}>Recent Documents</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <select 
                    className={`pl-3 pr-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-white border-gray-300 text-gray-700'
                    }`}
                    value={selectedDocType}
                    onChange={(e) => setSelectedDocType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="user-manuals">User Manuals</option>
                    <option value="api-docs">API Docs</option>
                    <option value="tutorials">Tutorials</option>
                    <option value="guides">Guides</option>
                    <option value="reference">Reference</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                  </div>
                </div>
                <button className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white text-sm rounded-md transition-colors">
                  <span>View All</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                      ID
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                      Title
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                      Author
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                      Date
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                      Status
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                      Priority
                    </th>
                    <th scope="col" className={`px-6 py-3 text-right text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                  {recentDocuments.map((doc) => (
                    <tr key={doc.id} className={`hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        {doc.id}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        {doc.title}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {doc.author}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {doc.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`font-medium ${getPriorityColor(doc.priority)}`}>
                          {doc.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className={`p-1 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                            <Eye size={16} className="text-blue-600" />
                          </button>
                          <button className={`p-1 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                            <Edit size={16} className="text-indigo-600" />
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
      </div>
    </div>
  );
}