'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import FileUpload from "@/components/fileUpload";
import CodeBlock from "@/components/syntaxHilighter";
import toast from "react-hot-toast";

export default function Home() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDoc, setActiveDoc] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [editedContent, setEditedContent] = useState(""); // State to hold edited content

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/docs");
      setDocs(data);
      if (data.length > 0 && !activeDoc) {
        setActiveDoc(data[0]._id);
      }
    } catch (error) {
      console.error("Failed to fetch docs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const deleteDocument = async (docId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/delete/${docId}`);
      if (response.status === 200) {
        toast.success("Document deleted successfully", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#063970",
            color: "#fff",
          },
        });
        fetchDocs(); // Refresh the document list
      }
    } catch (error) {
      console.error("Error deleting document", error);
      toast.error("Failed to delete document", {
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
      });
      if (response.status === 200) {
        toast.success("Document updated successfully", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#063970",
            color: "#fff",
          },
        });
        setIsEditing(false);
        fetchDocs(); // Refresh the document list
      }
    } catch (error) {
      console.error("Error updating document", error);
      toast.error("Failed to update document", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#f87171",
          color: "#fff",
        },
      });
    }
  };

  const formatDocContent = (content) => {
    let formattedContent = '';
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';
    
    lines.forEach(line => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          formattedContent += `<div id="code-block-${Math.random().toString(36).substr(2, 9)}" class="code-block-placeholder"></div>`;
          inCodeBlock = false;
          
          setTimeout(() => {
            const placeholder = document.getElementById(`code-block-${Math.random().toString(36).substr(2, 9)}`);
            if (placeholder) {
              const codeBlockElement = document.createElement('div');
              ReactDOM.render(<CodeBlock language={codeLanguage} code={codeContent} />, codeBlockElement);
              placeholder.parentNode.replaceChild(codeBlockElement, placeholder);
            }
          }, 0);
          
          codeContent = '';
          codeLanguage = '';
        } else {
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim() || 'plaintext';
        }
      } else if (inCodeBlock) {
        codeContent += line + '\n';
      } else {
        let processedLine = line
          .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-indigo-700 mt-6 mb-3">$1</h1>')
          .replace(/^## (.*$)/gm, '<h2 className="text-xl font-bold text-indigo-600 mt-5 mb-2">$1</h2>')
          .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-indigo-500 mt-4 mb-2">$1</h3>')
          .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>')
          .replace(/\*(.*?)\*/g, '<span class="italic">$1</span>');
        
        formattedContent += processedLine + '\n';
      }
    });
    
    return formattedContent;
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
                    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-indigo-700 mt-6 mb-3">$1</h1>')
                    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-indigo-600 mt-5 mb-2">$1</h2>')
                    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-indigo-500 mt-4 mb-2">$1</h3>')
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 shadow-lg pt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">AI-Generated Documentation</h1>
          <p className="text-indigo-100 mt-2">Upload your code files to generate comprehensive documentation</p>
        </div>
      </div>
      
      <div className="container mx-auto p-4">
        <FileUpload onUploadSuccess={fetchDocs} />
        
        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : docs.length === 0 ? (
          <div className="text-center my-12 p-6 bg-white rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900">No documentation yet</h3>
            <p className="mt-2 text-gray-500">Upload a code file to generate your first documentation</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4 h-fit">
              <h2 className="font-bold text-lg mb-4 text-gray-700 border-b pb-2">Documents</h2>
              <ul className="space-y-2">
                {docs.map((doc) => (
                  <li key={doc._id}>
                    <button
                      onClick={() => setActiveDoc(doc._id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors hover:bg-indigo-50 ${
                        activeDoc === doc._id 
                          ? "bg-indigo-100 border-l-4 border-indigo-500 font-medium text-indigo-700" 
                          : "text-gray-700"
                      }`}
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {doc.filename}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </div>
                    </button>
                    <button
                      onClick={() => deleteDocument(doc._id)}
                      className="mt-2 text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:col-span-3">
              {activeDoc && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {docs.filter(doc => doc._id === activeDoc).map((doc) => (
                    <div key={doc._id}>
                      <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-xl text-indigo-800">
                            {doc.filename}
                          </h3>
                          <p className="text-sm text-indigo-500 mt-1">
                            Generated on {new Date(doc.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleEdit(doc)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="p-5">
                        {isEditing ? (
                          <div>
                            <textarea
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                              className="w-full h-64 border rounded-md p-2"
                            />
                            <div className="mt-4">
                              <button
                                onClick={() => saveEditedDocument(activeDoc)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md mr-2"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="prose max-w-none">
                            {renderDocContent(doc.content)}
                          </div>
                        )}
                      </div>
                      
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}