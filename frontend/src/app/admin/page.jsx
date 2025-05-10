'use client';
import { useState, useEffect } from "react";
import { 
  Users, 
  Home, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  FileText, 
  Menu, 
  X,
  ChevronRight
} from "lucide-react";
import { useRouter } from 'next/router';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notifications, setNotifications] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  
  // This would typically use Next.js router
  // const router = useRouter();
  
  const navigateToPage = (page) => {
    setActiveTab(page);
    // In a real app with separate pages:
    // router.push(`/admin/${page}`);
    console.log(`Navigating to ${page} page`);
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  const handleLogout = () => {
    alert("Logout clicked - In a real app, this would log you out");
  };
  
  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      {/* Mobile sidebar toggle */}
      <div className={`lg:hidden fixed top-4 ${sidebarOpen ? 'left-64' : 'left-4'} z-50`}>
        <button 
          onClick={toggleSidebar} 
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} shadow-lg transition-all duration-200 hover:scale-110`}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Sidebar */}
      <div 
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          fixed lg:relative lg:translate-x-0 z-40
          w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-r-2xl 
          ${darkMode ? 'border-r border-gray-700' : 'border-r border-gray-200'} 
          h-full transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">AutoDocs Admin</span>
        </div>
        
        <nav className="mt-6 flex flex-col h-[calc(100%-10rem)]">
          <SidebarItem 
            icon={<Home size={20} />} 
            title="Dashboard" 
            active={activeTab === "dashboard"} 
            onClick={() => navigateToPage("/dashboard")} 
            darkMode={darkMode}
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            title="Manage Users" 
            active={activeTab === "users"} 
            onClick={() => navigateToPage("users")} 
            darkMode={darkMode}
          />
          <SidebarItem 
            icon={<FileText size={20} />} 
            title="Manage Docs" 
            active={activeTab === "docs"} 
            onClick={() => navigateToPage("docs")} 
            darkMode={darkMode}
          />
          <SidebarItem 
            icon={<MessageSquare size={20} />} 
            title="Review Feedback" 
            active={activeTab === "feedback"} 
            onClick={() => navigateToPage("feedback")} 
            darkMode={darkMode}
          />
          <SidebarItem 
            icon={<Settings size={20} />} 
            title="Settings" 
            active={activeTab === "settings"} 
            onClick={() => navigateToPage("settings")} 
            darkMode={darkMode}
          />
          
          <div className={`mt-auto ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'} pt-4`}>
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
            
            <SidebarItem 
              icon={<LogOut size={20} />} 
              title="Logout" 
              onClick={handleLogout} 
              darkMode={darkMode}
            />
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
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