'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { marked } from 'marked';

export default function ExportDocs() {
  const searchParams = useSearchParams();
  const docId = searchParams.get('id');
  const [document, setDocument] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('txt');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/${docId}`);
        setDocument(response.data);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    if (docId) {
      fetchDocument();
    }
  }, [docId]);

  const downloadDocument = async () => {
    if (!document) return;

    setLoading(true);
    try {
      let content = document.content;
      let blob;
      let filename = document.filename.split('.')[0] || 'document';

      switch (selectedFormat) {
        case 'txt':
          blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
          filename += '.txt';
          break;

        case 'md':
          blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
          filename += '.md';
          break;

        case 'pdf':
          const pdf = new jsPDF();
          const parsedContent = marked(content);
          // Remove HTML tags for PDF
          const plainText = parsedContent.replace(/<[^>]+>/g, '');
          pdf.text(plainText, 10, 10);
          blob = pdf.output('blob');
          filename += '.pdf';
          break;

        case 'html':
          const htmlContent = marked(content);
          const fullHtml = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <title>${document.filename}</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
                pre { background: #f4f4f4; padding: 15px; border-radius: 5px; }
                code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
              </style>
            </head>
            <body>
              ${htmlContent}
            </body>
            </html>
          `;
          blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
          filename += '.html';
          break;

        default:
          throw new Error('Unsupported format');
      }

      saveAs(blob, filename);
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Error downloading document');
    } finally {
      setLoading(false);
    }
  };

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">Loading document...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Export Document</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {document.filename}
            </h3>
            <p className="text-sm text-gray-500">
              Created on {new Date(document.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Format
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="txt">Plain Text (.txt)</option>
              <option value="md">Markdown (.md)</option>
              <option value="pdf">PDF Document (.pdf)</option>
              <option value="html">HTML Document (.html)</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              onClick={downloadDocument}
              disabled={loading}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Downloading...' : 'Download'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}