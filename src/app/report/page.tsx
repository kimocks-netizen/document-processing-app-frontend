'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, BarChart3, Download, PieChart, TrendingUp } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
// html2pdf will be imported dynamically on client side

interface ProcessingJob {
  jobId: string;
  fileName: string;
  processingMethod: 'ai' | 'standard';
  status: string;
  createdAt: string;
  fullName: string;
}



export default function ReportPage() {
  const [jobs, setJobs] = useState<ProcessingJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    try {
      setError(null);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/results`);
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
      } else {
        setError(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      setError('Failed to connect to server. Please check if the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate statistics
  const totalJobs = jobs.length;
  const aiJobs = jobs.filter(job => job.processingMethod === 'ai').length;
  const standardJobs = jobs.filter(job => job.processingMethod === 'standard').length;
  
  const aiPercentage = totalJobs > 0 ? ((aiJobs / totalJobs) * 100).toFixed(1) : '0';
  const standardPercentage = totalJobs > 0 ? ((standardJobs / totalJobs) * 100).toFixed(1) : '0';
  
  const mostUsedMethod = aiJobs > standardJobs ? 'AI Extraction' : 
                         standardJobs > aiJobs ? 'Standard Extraction' : 'Equal Usage';

  // Chart data for pie chart
  const chartData = [
    { name: 'AI Extraction', value: aiJobs, color: '#3B82F6' },
    { name: 'Standard Extraction', value: standardJobs, color: '#10B981' }
  ];

  const COLORS = ['#3B82F6', '#10B981'];

  // Status distribution
  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const reportDate = new Date().toLocaleDateString();
  const reportTime = new Date().toLocaleTimeString();

  const handleDownloadPdf = async () => {
    const reportElement = document.getElementById('report-content');
    if (reportElement) {
      try {
        const html2pdf = (await import('html2pdf.js')).default;
        const opt = {
          margin: 0.5,
          filename: 'document-processing-report.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(reportElement).set(opt).save();
      } catch (error) {
        console.error('Failed to generate PDF:', error);
        alert('Failed to generate PDF. Please try again.');
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading report data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button 
            onClick={fetchAllJobs}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6 gap-6">
      {/* Header */}
      <div className="max-w-7xl w-full mx-auto">
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-6 rounded-xl shadow-xl text-white">
          <h1 className="text-3xl font-bold mb-2">Document Processing Analytics Report</h1>
          <p className="text-blue-100">Comprehensive analysis of AI vs Standard extraction methods</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full mx-auto">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalJobs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Extraction</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{aiJobs}</p>
                <p className="text-sm text-green-600">{aiPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Standard Extraction</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{standardJobs}</p>
                <p className="text-sm text-purple-600">{standardPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <PieChart className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Most Used Method</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{mostUsedMethod}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl w-full mx-auto">
        {/* Pie Chart */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-blue-600" />
              <span>Extraction Method Distribution</span>
            </CardTitle>
            <CardDescription>AI vs Standard extraction breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {totalJobs > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} documents`, 'Count']} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-center text-gray-500">
                  <div>
                    <p>No data available</p>
                    <p className="text-sm">Upload documents to see analytics</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span>Processing Status Distribution</span>
            </CardTitle>
            <CardDescription>Current status of all documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 capitalize">{status}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(count / totalJobs) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Actions */}
      <Card className="max-w-7xl w-full mx-auto hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-red-600" />
            <span>Report Actions</span>
          </CardTitle>
          <CardDescription>Generate and download comprehensive reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={openModal}
              className="flex-1 py-3 px-4 rounded-lg text-white font-bold shadow-md transition-all bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transform hover:scale-[1.01]"
            >
              View Full Report
            </Button>
            <Button 
              onClick={handleDownloadPdf}
              className="flex-1 py-3 px-4 rounded-lg text-white font-bold shadow-md transition-all bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 transform hover:scale-[1.01]"
            >
              Download PDF Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hidden printable content */}
      <div id="report-content" className="hidden p-6 bg-white rounded-lg">
        <div style={{ minHeight: '11in', position: 'relative' }}>
          <h1 className="text-2xl font-bold mb-2 text-black">Document Processing Analytics Report</h1>
          <p className="text-gray-600 mb-4">
            Generated on {reportDate} at {reportTime}
          </p>

          {/* Summary Statistics */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Summary</h2>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="border p-2 rounded">
                <p className="font-medium text-black">Total Documents Processed</p>
                <p className="text-xl font-bold text-black">{totalJobs}</p>
              </div>
            </div>
          </div>

          {/* Extraction Method Analysis */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Extraction Method Analysis</h2>
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium text-black">AI Extraction</td>
                  <td className="p-2 text-right">
                    <span className="bg-blue-200 px-3 py-1 rounded-full text-sm text-black">
                      {aiJobs} documents ({aiPercentage}%)
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium text-black">Standard Extraction</td>
                  <td className="p-2 text-right">
                    <span className="bg-green-200 px-3 py-1 rounded-full text-sm text-black">
                      {standardJobs} documents ({standardPercentage}%)
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium text-black">Most Used Method</td>
                  <td className="p-2 text-right">
                    <span className="bg-yellow-200 px-3 py-1 rounded-full text-sm text-black">
                      {mostUsedMethod}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Status Distribution */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Processing Status Distribution</h2>
            <table className="w-full border-collapse">
              <tbody>
                {Object.entries(statusCounts).map(([status, count]) => (
                  <tr key={status} className="border-b">
                    <td className="p-2 font-medium text-black capitalize">{status}</td>
                    <td className="p-2 text-right">
                      <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-black">
                        {count} documents
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="text-sm text-gray-600 mt-6">
            <p>This report was automatically generated by the Document Processing System.</p>
            <p>Confidential - For authorized personnel only.</p>
          </div>
        </div>
      </div>

      {/* Modal dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full sm:max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div id="modal-report-content">
                <div style={{ minHeight: '11in', position: 'relative' }}>
                  <h1 className="text-2xl font-bold mb-2 text-black">Document Processing Analytics Report</h1>
                  <p className="text-gray-600 mb-4">
                    Generated on {reportDate} at {reportTime}
                  </p>

                  {/* Summary Statistics */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Summary</h2>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div className="border p-2 rounded">
                        <p className="font-medium text-black">Total Documents Processed</p>
                        <p className="text-xl font-bold text-black">{totalJobs}</p>
                      </div>
                    </div>
                  </div>

                  {/* Extraction Method Analysis */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Extraction Method Analysis</h2>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-medium text-black">AI Extraction</td>
                          <td className="p-2 text-right">
                            <span className="bg-blue-200 px-3 py-1 rounded-full text-sm text-black">
                              {aiJobs} documents ({aiPercentage}%)
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium text-black">Standard Extraction</td>
                          <td className="p-2 text-right">
                            <span className="bg-green-200 px-3 py-1 rounded-full text-sm text-black">
                              {standardJobs} documents ({standardPercentage}%)
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium text-black">Most Used Method</td>
                          <td className="p-2 text-right">
                            <span className="bg-yellow-200 px-3 py-1 rounded-full text-sm text-black">
                              {mostUsedMethod}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Status Distribution */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Processing Status Distribution</h2>
                    <table className="w-full border-collapse">
                      <tbody>
                        {Object.entries(statusCounts).map(([status, count]) => (
                          <tr key={status} className="border-b">
                            <td className="p-2 font-medium text-black capitalize">{status}</td>
                            <td className="p-2 text-right">
                              <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-black">
                                {count} documents
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer */}
                  <div className="text-sm text-gray-600 mt-6">
                    <p>This report was automatically generated by the Document Processing System.</p>
                    <p>Confidential - For authorized personnel only.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
