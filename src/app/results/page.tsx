//results/[jobId]/page.tsx 
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Processing Results</h1>
        <div className="text-center py-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Processing Results</h1>
      
      {jobs.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No documents processed yet.</p>
          <Link 
            href="/" 
            className="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Upload Document
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.jobId} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FileText className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                  <div>
                    <h3 className="font-semibold text-lg">{job.fileName}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{job.fullName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(job.createdAt).toLocaleDateString()} • {job.processingMethod}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(job.status)}
                    <span className="capitalize">{job.status}</span>
                  </div>
                  <Link
                    href={`/results/${job.jobId}`}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}