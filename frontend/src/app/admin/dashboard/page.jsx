'use client';
import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import Sidebar from '../Sidebar';

const AdminDashboard = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notifications, setNotifications] = useState(3);

  const handleLogout = () => {
    // Implement logout logic
    router.push('/login');
  };

  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className={`${darkMode ? 'bg-gray-800 shadow-lg border-b border-gray-700' : 'bg-white shadow-md border-b border-gray-200'} transition-colors duration-300`}>
          <div className="flex items-center justify-between px-6 py-3">
            <h1 className={`text-xl font-semibold ${darkMode ? 'bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent' : 'text-gray-800'}`}>
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "users" && "Manage Users"}
              {activeTab === "docs" && "Manage Docs"}
              {activeTab === "feedback" && "Review Feedback"}
              {activeTab === "settings" && "Settings"}
            </h1>
            <div className="flex items-center space-x-4">
              <div className={`relative group ${searchFocused ? 'w-64' : 'w-40'} transition-all duration-300`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                </div>
                <input
                  type="text"
                  className={`pl-10 pr-4 py-2 w-full 
                    ${darkMode ? 'bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400' : 'bg-gray-100 border border-gray-200 text-gray-700 placeholder-gray-500'} 
                    rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Search..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
              
              <div className="relative cursor-pointer transform hover:scale-110 transition-transform duration-200">
                <Bell size={20} className={darkMode ? "text-gray-300" : "text-gray-600"} />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center transform -translate-y-1/2 translate-x-1/2">
                    {notifications}
                  </span>
                )}
              </div>
              
              <div className="relative">
                <div 
                  className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-medium cursor-pointer transform hover:scale-110 transition-transform duration-200"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  AD
                </div>
                
                {dropdownOpen && (
                  <div 
                    className={`absolute right-0 mt-2 w-48 py-2 
                      ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} 
                      rounded-xl shadow-xl z-50`}
                  >
                    <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>Profile</a>
                    <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>Preferences</a>
                    <div className={`my-1 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}></div>
                    <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'}`} onClick={handleLogout}>Logout</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content Area - Placeholder for your separate page components */}
        <main className={`flex-1 overflow-auto p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
          <div className={`flex items-center justify-center h-full ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Content for {activeTab} will be loaded here</h2>
              <p>This is just a placeholder. Create separate components for each page.</p>
              <div className="mt-6 inline-block bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Click the sidebar buttons to navigate
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, title, active = false, onClick, darkMode }) => {
  return (
    <div 
      className={`flex items-center space-x-3 px-6 py-3 cursor-pointer transition-all duration-200 ${
        active 
          ? darkMode 
            ? "text-blue-400 bg-gray-700 rounded-r-xl" 
            : "text-blue-600 bg-blue-50 rounded-r-xl"
          : darkMode
            ? "text-gray-300 hover:bg-gray-700 rounded-r-xl"
            : "text-gray-600 hover:bg-gray-100 rounded-r-xl"
      }`}
      onClick={onClick}
    >
      <div className={`transform transition-transform duration-200 ${active ? "scale-110" : ""}`}>
        {icon}
      </div>
      <span className={active ? "font-medium" : ""}>{title}</span>
    </div>
  );
};

export default AdminDashboard;