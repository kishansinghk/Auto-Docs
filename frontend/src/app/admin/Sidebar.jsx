'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Users, FileText, MessageSquare, Settings, LogOut, ChevronRight, Menu, X } from 'lucide-react';

const Sidebar = ({ darkMode, setDarkMode }) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navigateToPage = (page) => {
        setActiveTab(page);
        switch (page) {
            case "dashboard":
                router.push("/admin/dashboard");
                break;
            case "users":
                router.push("/admin/manageuser");
                break;
            case "docs":
                router.push("/admin/manageDocs");
                break;
            case "feedback":
                router.push("/admin/feedbackReview");
                break;
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleLogout = () => {
        router.push('/login');
    };

    return (
        <aside className="h-full">
            {/* Mobile menu button */}
            <div className={`lg:hidden fixed top-4 ${sidebarOpen ? 'left-64' : 'left-4'} z-50`}>
                <button
                    onClick={toggleSidebar}
                    className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} 
                    shadow-lg transition-all duration-200 hover:scale-110`}
                >
                    {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar main content */}
            <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0 fixed lg:relative h-full w-64 
                ${darkMode ? 'bg-gray-800' : 'bg-white'} 
                shadow-lg transition-transform duration-300 ease-in-out z-40`}
            >
                {/* Logo */}
                <div className="p-4 flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">A</span>
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                        AutoDocs Admin
                    </span>
                </div>

                {/* Navigation */}
                <nav className="mt-6 flex flex-col h-[calc(100%-10rem)] justify-between">
                    <div className="space-y-1">
                        <SidebarItem
                            icon={<Home size={20} />}
                            title="Dashboard"
                            active={activeTab === "dashboard"}
                            onClick={() => navigateToPage("dashboard")}
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
                    </div>

                    {/* Bottom section */}
                    <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700/50 pt-4 bg-inherit">
                        <div
                            className={`px-6 py-3 flex items-center justify-between cursor-pointer 
                                ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} 
                                transition-colors duration-200`}
                            onClick={() => setDarkMode(!darkMode)}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-5 h-5">
                                    {darkMode ? (
                                        // Sun icon for light mode
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                                        </svg>
                                    ) : (
                                        // Moon icon for dark mode
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                            </div>
                            <ChevronRight size={16} />
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
        </aside>
    );
}

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

export default Sidebar
