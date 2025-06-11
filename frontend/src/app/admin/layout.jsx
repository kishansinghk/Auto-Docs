'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';

export default function AdminLayout({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}