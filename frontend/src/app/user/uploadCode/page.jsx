'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CodeBlock from '@/components/syntaxHilighter';

export default function UploadCodePage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [uploadMethod, setUploadMethod] = useState('file');
  const [isDragging, setIsDragging] = useState(false);
  const [code, setCode] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);
  const [activeDoc, setActiveDoc] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
    fetchDocs();
  }, [router]);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/docs', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setDocs(data);
      if (data.length > 0 && !activeDoc) {
        setActiveDoc(data[0]._id);
      }
    } catch (error) {
      console.error('Failed to fetch docs', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleUploadMethodChange = (method) => {
    setUploadMethod(method);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      if (uploadMethod === 'file' && file) {
        formData.append('file', file);
      } else if (uploadMethod === 'paste' && code) {
        formData.append('code', code);
      }
      formData.append('language', selectedLanguage);

      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        toast.success('Code uploaded successfully!', {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#063970",
            color: "#fff",
          },
        });
        fetchDocs();
        setCode('');
        setFile(null);
      }
    } catch (error) {
      console.error('Error uploading code:', error);
      toast.error('Failed to upload code', {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#f87171",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (docId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/delete/${docId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        toast.success('Document deleted successfully', {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#063970",
            color: "#fff",
          },
        });
        fetchDocs();
      }
    } catch (error) {
      console.error('Error deleting document', error);
      toast.error('Failed to delete document', {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#f87171",
          color: "#fff",
        },
      });
    }
  };

  const handleEdit = (doc) => {
    setIsEditing(true);
    setEditedContent(doc.content);
  };

  const saveEditedDocument = async (docId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/update/${docId}`, {
        content: editedContent,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        toast.success('Document updated successfully', {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#063970",
            color: "#fff",
          },
        });
        setIsEditing(false);
        fetchDocs();
      }
    } catch (error) {
      console.error('Error updating document', error);
      toast.error('Failed to update document', {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#f87171",
          color: "#fff",
        },
      });
    }
  };

  const handleDownload = (docId) => {
    setIsDownloading(true);
    router.push(`/exportDocs/${docId}`);
  };

  const renderDocContent = (content) => {
    const sections = [];
    const lines = content.split('\n');
    let currentSection = [];
    let inCodeBlock = false;
    let codeBlockContent = '';
    let codeBlockLanguage = '';
    
    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          sections.push({
            type: 'text',
            content: currentSection.join('\n')
          });
          sections.push({
            type: 'code',
            language: codeBlockLanguage,
            content: codeBlockContent
          });
          
          inCodeBlock = false;
          codeBlockContent = '';
          currentSection = [];
        } else {
          inCodeBlock = true;
          codeBlockLanguage = line.slice(3).trim() || 'plaintext';
        }
      } else if (inCodeBlock) {
        codeBlockContent += line + '\n';
      } else {
        currentSection.push(line);
      }
      
      if (index === lines.length - 1 && currentSection.length > 0) {
        sections.push({
          type: 'text',
          content: currentSection.join('\n')
        });
      }
    });
    
    return (
      <>
        {sections.map((section, index) => {
          if (section.type === 'code') {
            return <CodeBlock key={index} language={section.language} code={section.content.trim()} />;
          } else {
            return (
              <div 
                key={index}
                className="mb-4"
                dangerouslySetInnerHTML={{ 
                  __html: section.content
                    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-blue-400 mt-6 mb-3">$1</h1>')
                    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-blue-300 mt-5 mb-2">$1</h2>')
                    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-blue-200 mt-4 mb-2">$1</h3>')
                    .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>')
                    .replace(/\*(.*?)\*/g, '<span class="italic">$1</span>')
                }}
              />
            );
          }
        })}
      </>
    );
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
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            >
              Upload Your Code
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Upload your source code or paste it directly to generate documentation automatically.
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-12">
            {/* Upload Options */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Language Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#112240] rounded-xl shadow-2xl p-8 border border-gray-800"
              >
                <h2 className="text-2xl font-bold mb-6 text-white">Select Language</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'javascript', label: 'JavaScript', icon: '⚡' },
                    { id: 'python', label: 'Python', icon: '🐍' },
                    { id: 'java', label: 'Java', icon: '☕' },
                    { id: 'typescript', label: 'TypeScript', icon: '📘' }
                  ].map((lang) => (
                    <motion.button
                      key={lang.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleLanguageChange(lang.id)}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        selectedLanguage === lang.id
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                          : 'bg-[#0a192f] border-gray-700 text-gray-400 hover:border-blue-500/50'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{lang.icon}</span>
                      <span className="font-medium">{lang.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Upload Method Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-[#112240] rounded-xl shadow-2xl p-8 border border-gray-800"
              >
                <h2 className="text-2xl font-bold mb-6 text-white">Upload Method</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'file', label: 'Upload File', icon: '📁' },
                    { id: 'paste', label: 'Paste Code', icon: '📋' }
                  ].map((method) => (
                    <motion.button
                      key={method.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleUploadMethodChange(method.id)}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        uploadMethod === method.id
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                          : 'bg-[#0a192f] border-gray-700 text-gray-400 hover:border-blue-500/50'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{method.icon}</span>
                      <span className="font-medium">{method.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Upload Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {uploadMethod === 'file' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-[#112240] rounded-xl shadow-2xl p-8 border border-gray-800"
                >
                  <div
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                      isDragging
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-700 hover:border-blue-500/50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="text-4xl mb-4">📁</div>
                    <h3 className="text-xl font-bold text-white mb-2">Drag & Drop Your Files</h3>
                    <p className="text-gray-400 mb-4">or</p>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept=".js,.py,.java,.ts,.jsx,.tsx,.html"
                    />
                    <motion.label
                      htmlFor="file-upload"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-[#0a192f] text-blue-400 rounded-lg border border-blue-500/50 hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 cursor-pointer"
                    >
                      Browse Files
                    </motion.label>
                    {file && (
                      <p className="text-sm text-blue-400 mt-4">
                        Selected file: {file.name}
                      </p>
                    )}
                    <p className="text-sm text-gray-400 mt-4">
                      Supported formats: .js, .py, .java, .ts
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-[#112240] rounded-xl shadow-2xl p-8 border border-gray-800"
                >
                  <h2 className="text-2xl font-bold mb-6 text-white">Paste Your Code</h2>
                  <textarea
                    value={code}
                    onChange={handleCodeChange}
                    className="w-full h-96 px-4 py-3 bg-[#0a192f] border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 font-mono text-sm"
                    placeholder="Paste your code here..."
                    required={uploadMethod === 'paste'}
                  />
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-[#112240] rounded-xl shadow-2xl p-8 border border-gray-800"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Generate Documentation'
                  )}
                </motion.button>
                <p className="text-center text-gray-400 mt-4">
                  Your code will be analyzed and documentation will be generated automatically.
                </p>
              </motion.div>
            </motion.div>
          </form>

          {/* Documents List and Preview */}
          {loading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : docs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center my-12 p-6 bg-[#112240] rounded-xl shadow-2xl border border-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-white">No documentation yet</h3>
              <p className="mt-2 text-gray-400">Upload a code file to generate your first documentation</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-16 grid grid-cols-1 lg:grid-cols-4 gap-6"
            >
              <div className="lg:col-span-1 bg-[#112240] rounded-xl shadow-2xl p-6 border border-gray-800">
                <h2 className="font-bold text-lg mb-4 text-white border-b border-gray-700 pb-2">Documents</h2>
                <ul className="space-y-2">
                  {docs.map((doc) => (
                    <li key={doc._id}>
                      <button
                        onClick={() => setActiveDoc(doc._id)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          activeDoc === doc._id 
                            ? "bg-blue-500/20 border-l-4 border-blue-500 font-medium text-blue-400" 
                            : "text-gray-400 hover:bg-blue-500/10"
                        }`}
                      >
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {doc.filename}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </div>
                      </button>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleDownload(doc._id)}
                          disabled={isDownloading}
                          className="text-sm text-green-400 hover:text-green-300 transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                          {isDownloading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-green-400"></div>
                          ) : (
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                              />
                            </svg>
                          )}
                          {isDownloading ? 'Redirecting...' : 'Download'}
                        </button>
                        <button
                          onClick={() => handleEdit(doc)}
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteDocument(doc._id)}
                          className="text-sm text-red-400 hover:text-red-300 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="lg:col-span-3">
                {activeDoc && (
                  <div className="bg-[#112240] rounded-xl shadow-2xl overflow-hidden border border-gray-800">
                    {docs.filter(doc => doc._id === activeDoc).map((doc) => (
                      <div key={doc._id}>
                        <div className="bg-[#0a192f] p-4 border-b border-gray-700 flex justify-between items-center">
                          <div>
                            <h3 className="font-bold text-xl text-white">
                              {doc.filename}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                              Generated on {new Date(doc.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="p-6">
                          {isEditing ? (
                            <div>
                              <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                className="w-full h-96 px-4 py-3 bg-[#0a192f] border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 font-mono text-sm"
                              />
                              <div className="mt-4 flex gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => saveEditedDocument(activeDoc)}
                                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                                >
                                  Save
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setIsEditing(false)}
                                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all duration-300"
                                >
                                  Cancel
                                </motion.button>
                              </div>
                            </div>
                          ) : (
                            <div className="prose prose-invert max-w-none">
                              {renderDocContent(doc.content)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}