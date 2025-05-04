'use client'
import { useState, useEffect } from 'react';
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

export default function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Handle initial dark mode
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', String(newMode));
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  if (!mounted) {
    // Prevent flash of unstyled content
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Toaster position="top-center" />
      <main className="min-h-screen transition-colors duration-200">
        {children}
      </main>
    </>
  );
}