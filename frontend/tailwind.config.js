const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        'ai-blue': '#2563eb',
        'ai-indigo': '#4f46e5',
        'ai-purple': '#7e22ce',
        'ai-dark': '#1e293b',
        'doc-light': '#f8fafc',
      },
    },
  },
  plugins: [],
};