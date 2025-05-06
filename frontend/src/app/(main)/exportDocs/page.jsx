'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ExportPage() {
  const [selectedFormat, setSelectedFormat] = useState('markdown');
  const [selectedTemplate, setSelectedTemplate] = useState('default');
  const [includeOptions, setIncludeOptions] = useState({
    codeSnippets: true,
    diagrams: true,
    apiReference: true,
    changelog: false
  });

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
  };

  const handleOptionToggle = (option) => {
    setIncludeOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleExport = () => {
    // Add your export logic here
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-gray-100">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mt-10 mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            >
              Export Documentation
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Choose your preferred format and customize the export settings for your documentation.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Export Options */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Format Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#112240] rounded-xl shadow-2xl p-8 border border-gray-800"
              >
                <h2 className="text-2xl font-bold mb-6 text-white">Export Format</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'markdown', label: 'Markdown', icon: '📝' },
                    { id: 'pdf', label: 'PDF', icon: '📄' },
                    { id: 'html', label: 'HTML', icon: '🌐' },
                    { id: 'docx', label: 'Word', icon: '📑' }
                  ].map((format) => (
                    <motion.button
                      key={format.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleFormatChange(format.id)}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        selectedFormat === format.id
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                          : 'bg-[#0a192f] border-gray-700 text-gray-400 hover:border-blue-500/50'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{format.icon}</span>
                      <span className="font-medium">{format.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Template Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-[#112240] rounded-xl shadow-2xl p-8 border border-gray-800"
              >
                <h2 className="text-2xl font-bold mb-6 text-white">Template</h2>
                <div className="space-y-4">
                  {[
                    { id: 'default', label: 'Default', description: 'Clean and professional' },
                    { id: 'minimal', label: 'Minimal', description: 'Simple and focused' },
                    { id: 'technical', label: 'Technical', description: 'Detailed and structured' }
                  ].map((template) => (
                    <motion.div
                      key={template.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => handleTemplateChange(template.id)}
                      className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                        selectedTemplate === template.id
                          ? 'bg-blue-500/20 border-blue-500'
                          : 'bg-[#0a192f] border-gray-700 hover:border-blue-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-white">{template.label}</h3>
                          <p className="text-sm text-gray-400">{template.description}</p>
                        </div>
                        {selectedTemplate === template.id && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-blue-400"
                          >
                            ✓
                          </motion.span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Include Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-[#112240] rounded-xl shadow-2xl p-8 border border-gray-800"
              >
                <h2 className="text-2xl font-bold mb-6 text-white">Include</h2>
                <div className="space-y-4">
                  {Object.entries(includeOptions).map(([option, isSelected]) => (
                    <motion.div
                      key={option}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-[#0a192f]"
                    >
                      <div className="flex items-center">
                        <span className="text-blue-400 mr-3">
                          {option === 'codeSnippets' ? '💻' :
                           option === 'diagrams' ? '📊' :
                           option === 'apiReference' ? '🔌' : '📋'}
                        </span>
                        <span className="text-white capitalize">
                          {option.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleOptionToggle(option)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                          isSelected ? 'bg-blue-500' : 'bg-gray-600'
                        }`}
                      >
                        <motion.div
                          className="w-4 h-4 bg-white rounded-full"
                          animate={{ x: isSelected ? 24 : 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Preview Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Preview Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-[#112240] rounded-xl shadow-2xl p-8 border border-gray-800"
              >
                <h2 className="text-2xl font-bold mb-6 text-white">Preview</h2>
                <div className="bg-[#0a192f] rounded-lg p-4 border border-gray-700 h-96 overflow-y-auto">
                  <div className="prose prose-invert max-w-none">
                    <h3 className="text-blue-400">Documentation Preview</h3>
                    <p className="text-gray-300">
                      This is a preview of how your documentation will look when exported.
                      The actual content will be generated based on your selected options.
                    </p>
                    <div className="mt-4 p-4 bg-[#112240] rounded-lg">
                      <code className="text-gray-300">
                        // Example code snippet
                        function example() {'{'}
                          return "Hello, World!";
                        {'}'}
                      </code>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Export Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-[#112240] rounded-xl shadow-2xl p-8 border border-gray-800"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExport}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Export Documentation
                </motion.button>
                <p className="text-center text-gray-400 mt-4">
                  Your documentation will be generated and downloaded in the selected format.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Feedback Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 bg-[#112240] rounded-xl shadow-2xl p-8 border border-gray-800"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">Have suggestions?</h2>
                <p className="text-gray-300">
                  Help us improve our export functionality by sharing your experience
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-[#0a192f] text-blue-400 rounded-lg font-semibold border border-blue-500/50 hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
              >
                <a href="feedback"></a>
                Provide Feedback
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}