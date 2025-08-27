// src/app/documents/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, Calendar, User, Eye, Download, X } from 'lucide-react';
import Link from 'next/link';

interface ProcessingJob {
  jobId: string;
  fileName: string;
  fullName: string;
  status: string;
  processingMethod: string;
  createdAt: string;
}

export default function DocumentsPage() {
  const [jobs, setJobs] = useState<ProcessingJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<ProcessingJob | null>(null);
  const [documentData, setDocumentData] = useState<any>(null);
  const [loadingDocument, setLoadingDocument] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/results`);
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDocuments = jobs.filter(job =>
    job.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const displayedDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getFileSize = (fileName: string) => {
    // Mock file sizes based on file type
    if (fileName.endsWith('.pdf')) return '2.4 MB';
    if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) return '1.8 MB';
    if (fileName.endsWith('.png')) return '3.2 MB';
    return '1.5 MB';
  };

  const handleViewDocument = async (job: ProcessingJob) => {
    setSelectedDocument(job);
    setIsDocumentModalOpen(true);
    setLoadingDocument(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/results/${job.jobId}`);
      if (response.ok) {
        const data = await response.json();
        setDocumentData(data);
      } else {
        console.error('Failed to fetch document data');
        setDocumentData(null);
      }
    } catch (error) {
      console.error('Error fetching document data:', error);
      setDocumentData(null);
    } finally {
      setLoadingDocument(false);
    }
  };

  const closeDocumentModal = () => {
    setIsDocumentModalOpen(false);
    setSelectedDocument(null);
    setDocumentData(null);
  };

  const handleDownloadDocument = () => {
    if (documentData?.fileUrl && selectedDocument) {
      const link = document.createElement('a');
      link.href = documentData.fileUrl;
      link.download = selectedDocument.fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Document not available for download');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Processed Documents</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View your previously processed documents and results
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search documents..."
            className="pl-10 w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle>Document History</CardTitle>
          <CardDescription>
            {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayedDocuments.map((job) => (
              <Card key={job.jobId} className="bg-gray-50 dark:bg-gray-800 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          <span className="sm:hidden">
                            {job.fileName.length > 10 ? (
                              <>
                                {job.fileName.substring(0, 10)}
                                <button 
                                  onClick={() => {
                                    setSelectedFileName(job.fileName);
                                    setShowNameModal(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-800 ml-1 text-sm"
                                  title={job.fileName}
                                >
                                  View
                                </button>
                              </>
                            ) : job.fileName}
                          </span>
                          <span className="hidden sm:inline">{job.fileName}</span>
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {getFileSize(job.fileName)} • {job.processingMethod === 'ai' ? 'Smart Extraction' : 'Standard Extraction'} processing
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleViewDocument(job)}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white hover:scale-105 transition-transform duration-200 shadow-lg"
                      >
                        <Eye className="w-4 h-4 sm:mr-1" />
                        <span className="hidden sm:inline">Extracted Vs Original</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      {job.fullName}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      Uploaded on {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        job.status === 'completed' ? 'bg-green-500' : job.status === 'processing' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {jobs.length === 0 ? 'No documents processed yet' : 'No documents found'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchTerm ? 'Try adjusting your search terms' : 'Upload your first document to get started'}
                </p>
                <Link href="/">
                  <Button>
                    Upload Document
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  size="sm"
                  className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:border-red-700 dark:hover:text-red-400 transition-all duration-200"
                >
                  Previous
                </Button>
                
                <div className="flex flex-wrap justify-center gap-1 overflow-x-auto max-w-full">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 p-0 ${
                        currentPage === i + 1 
                          ? '' 
                          : 'hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:border-red-700 dark:hover:text-red-400 transition-all duration-200'
                      }`}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage >= totalPages}
                  size="sm"
                  className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:border-red-700 dark:hover:text-red-400 transition-all duration-200"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Viewer Modal */}
      {isDocumentModalOpen && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-6xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Document Viewer: {selectedDocument.fileName}
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleDownloadDocument}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button
                  onClick={closeDocumentModal}
                  variant="outline"
                  size="sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
              {loadingDocument ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Loading document...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Extracted Text */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Extracted Text
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded border border-blue-300 dark:border-blue-600 max-h-96 overflow-y-auto">
                      <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {documentData?.rawText || 'No extracted text available'}
                      </div>
                    </div>
                    
                    {/* Extracted Information */}
                    {documentData && (
                      <div className="mt-4 space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                            Full Name
                          </label>
                          <div className="bg-white dark:bg-gray-800 p-2 rounded border border-blue-300 dark:border-blue-600 text-blue-900 dark:text-blue-100">
                            {documentData.fullName || 'Not extracted'}
                          </div>
                        </div>
                        {documentData.age && (
                          <div>
                            <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                              Age
                            </label>
                            <div className="bg-white dark:bg-gray-800 p-2 rounded border border-blue-300 dark:border-blue-600 text-blue-900 dark:text-blue-100">
                              {documentData.age} years
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Original Document */}
                  <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <Eye className="w-5 h-5 mr-2" />
                      Original Document
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-300 dark:border-gray-600 h-[600px] overflow-y-auto">
                      {documentData?.fileUrl ? (
                        selectedDocument.fileName.toLowerCase().endsWith('.pdf') ? (
                          <iframe
                            src={documentData.fileUrl}
                            className="w-full h-full border-0"
                            title="PDF Document"
                          />
                        ) : (
                          <img
                            src={documentData.fileUrl}
                            alt="Document"
                            className="w-full h-full object-contain"
                          />
                        )
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">
                              Document not available
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Document Name Modal */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Full Document Name
              </h3>
            </div>
            <div className="p-4">
              <p className="text-gray-700 dark:text-gray-300 break-all">
                {selectedFileName}
              </p>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <Button
                onClick={() => setShowNameModal(false)}
                variant="outline"
                size="sm"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}