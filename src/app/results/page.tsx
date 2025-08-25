//results/[jobId]/page.tsx 
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Clock, CheckCircle, XCircle, ChevronUp, ChevronDown, SortAsc, Search, Download, Calendar, User, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Modal } from '../../components/Modal';

interface ProcessingJob {
  jobId: string;
  fileName: string;
  fullName: string;
  status: string;
  processingMethod: string;
  createdAt: string;
}

export default function ResultsPage() {
  const [jobs, setJobs] = useState<ProcessingJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [processingMethodFilter, setProcessingMethodFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [selectedJobForComparison, setSelectedJobForComparison] = useState<ProcessingJob | null>(null);

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/results');
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  // Filter and sort jobs
  const filteredAndSortedJobs = jobs
    .filter(job => {
      const matchesMethod = !processingMethodFilter || job.processingMethod === processingMethodFilter;
      const matchesSearch = !searchTerm || 
        job.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesMethod && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedJobs.length / itemsPerPage);
  const displayedJobs = filteredAndSortedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setCurrentPage(1);
  };

  const handleFilterChange = (method: string) => {
    setProcessingMethodFilter(method);
    setCurrentPage(1);
  };

  const handleDownload = (job: ProcessingJob) => {
    // TODO: Implement actual download functionality
    console.log('Downloading:', job.fileName);
    alert(`Downloading ${job.fileName}...`);
  };

  const handleComparison = (job: ProcessingJob) => {
    setSelectedJobForComparison(job);
    setIsComparisonModalOpen(true);
  };

  const closeComparisonModal = () => {
    setIsComparisonModalOpen(false);
    setSelectedJobForComparison(null);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Processing Results</h1>
        <div className="text-center py-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Processing Results</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View your document processing results and download processed files
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search results..."
            className="pl-10 w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters and Controls */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle>Filters & Controls</CardTitle>
          <CardDescription>
            Filter and sort your processing results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Processing Method Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Processing Method
                </label>
                <select
                  value={processingMethodFilter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white hover:border-red-400 transition-colors duration-200"
                >
                  <option value="">All Methods</option>
                  <option value="ai">AI Extraction</option>
                  <option value="standard">Standard Extraction</option>
                </select>
              </div>

              {/* Sort Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort by Date
                </label>
                <Button
                  variant="outline"
                  onClick={handleSortToggle}
                  className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                >
                  <SortAsc className="w-4 h-4" />
                  <span>{sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}</span>
                  {sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredAndSortedJobs.length} of {jobs.length} results
            </div>
          </div>
        </CardContent>
      </Card>
      
      {filteredAndSortedJobs.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {jobs.length === 0 ? 'No documents processed yet.' : 'No results match your filters.'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Upload your first document to get started'}
            </p>
            <Link href="/">
              <Button>
                Upload Document
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Results Table */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Processing Results</CardTitle>
              <CardDescription>
                {filteredAndSortedJobs.length} result{filteredAndSortedJobs.length !== 1 ? 's' : ''} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displayedJobs.map((job) => (
                  <Card key={job.jobId} className="bg-gray-50 dark:bg-gray-800 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{job.fileName}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {job.processingMethod === 'ai' ? 'AI Extraction' : 'Standard Extraction'} processing
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownload(job)}
                            className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                          <Link href={`/results/${job.jobId}`}>
                            <Button size="sm" className="hover:scale-105 transition-transform duration-200">
                              View Results
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleComparison(job)}
                            className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
                          >
                            <BarChart3 className="w-4 h-4 mr-1" />
                            Comparison
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center text-sm">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          {job.fullName}
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {new Date(job.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(job.status)}
                            <span className="capitalize">{job.status}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    size="sm"
                    className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
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
                            : 'hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200'
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
                    className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Comparison Modal */}
      <Modal
        isOpen={isComparisonModalOpen}
        onClose={closeComparisonModal}
        title="AI vs Standard Extraction Comparison"
        size="xl"
      >
        {selectedJobForComparison && (
          <div className="space-y-6">
            {/* Job Information Header */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Document: {selectedJobForComparison.fileName}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Processing Method:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    selectedJobForComparison.processingMethod === 'ai' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {selectedJobForComparison.processingMethod === 'ai' ? 'AI Extraction' : 'Standard Extraction'}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <span className="ml-2 capitalize">{selectedJobForComparison.status}</span>
                </div>
                <div>
                  <span className="font-medium">Processed:</span>
                  <span className="ml-2">{new Date(selectedJobForComparison.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-medium">
                      Extraction Field
                    </th>
                    <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-center font-medium bg-blue-50 dark:bg-blue-900/30">
                      AI Extraction
                    </th>
                    <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-center font-medium bg-green-50 dark:bg-green-900/30">
                      Standard Extraction
                    </th>
                    <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-center font-medium">
                      Accuracy Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium">
                      First Name
                    </td>
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-center bg-blue-50 dark:bg-blue-900/20">
                      {selectedJobForComparison.fullName.split(' ')[0]}
                    </td>
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-center bg-green-50 dark:bg-green-900/20">
                      {selectedJobForComparison.fullName.split(' ')[0]}
                    </td>
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-center">
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-xs">
                        100%
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium">
                      Last Name
                    </td>
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-center bg-blue-50 dark:bg-blue-900/20">
                      {selectedJobForComparison.fullName.split(' ').slice(1).join(' ')}
                    </td>
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-center bg-green-50 dark:bg-green-900/20">
                      {selectedJobForComparison.fullName.split(' ').slice(1).join(' ')}
                    </td>
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-center">
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-xs">
                        100%
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium">
                      Date of Birth
                    </td>
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-center bg-blue-50 dark:bg-blue-900/20">
                      1990-05-15
                    </td>
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-center bg-green-50 dark:bg-green-900/20">
                      1990-05-15
                    </td>
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-center">
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-xs">
                        100%
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium">
                      Document Type
                    </td>
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-center bg-blue-50 dark:bg-blue-900/20">
                      {selectedJobForComparison.fileName.endsWith('.pdf') ? 'PDF Document' : 'Image File'}
                    </td>
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-center bg-green-50 dark:bg-green-900/20">
                      {selectedJobForComparison.fileName.endsWith('.pdf') ? 'PDF Document' : 'Image File'}
                    </td>
                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-center">
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-xs">
                        100%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  AI Extraction Summary
                </h4>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <li>• Advanced pattern recognition</li>
                  <li>• Context-aware text extraction</li>
                  <li>• Higher accuracy for complex documents</li>
                  <li>• Faster processing time</li>
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Standard Extraction Summary
                </h4>
                <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                  <li>• Traditional OCR processing</li>
                  <li>• Reliable for structured documents</li>
                  <li>• Consistent results</li>
                  <li>• Lower resource usage</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
              <Button variant="outline" onClick={closeComparisonModal}>
                Close
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Export Comparison Report
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}