// src/app/results/[jobId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, User, Brain, ArrowLeft, RefreshCw, FileText, Mail, Phone, MapPin, IdCard, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProgressBar from '@/components/common/ProgressBar';
import ErrorBanner from '@/components/common/ErrorBanner';
import StandardPanel from '@/components/results/StandardPanel';
import AIPanel from '@/components/results/AIPanel';
import CompareView from '@/components/results/CompareView';

interface ProcessingResult {
  jobId: string;
  status: 'processing' | 'completed' | 'failed';
  fullName: string;
  age: number;
  rawText: string;
  aiExtractedData?: any;
  processingMethod: 'standard' | 'ai';
  progress?: number;
  fileName?: string;
}

interface AIExtractedData {
  personalInfo?: {
    fullName?: string;
    dateOfBirth?: string;
    age?: number;
  };
  contactInfo?: {
    emails?: string[];
    phoneNumbers?: string[];
  };
  addresses?: string[];
  identificationNumbers?: string[];
  keyDates?: string[];
  summary?: string;
}

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.jobId as string;
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/results/${jobId}`);
      if (response.ok) {
        const data = await response.json();
        setResult(data);
        setError(null);
      } else {
        throw new Error('Failed to fetch results');
      }
    } catch (err) {
      setError('Error loading results. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();

    // Set up polling if still processing
    if (!result || result.status === 'processing') {
      const interval = setInterval(fetchResults, 3000);
      return () => clearInterval(interval);
    }
  }, [jobId, result?.status]);

  const renderAIResults = (aiData: AIExtractedData) => {
    if (!aiData) return null;

    return (
      <div className="space-y-6">
        {/* Personal Info */}
        {aiData.personalInfo && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiData.personalInfo.fullName && (
                  <div>
                    <span className="text-sm text-gray-500">Full Name</span>
                    <p className="font-medium">{aiData.personalInfo.fullName}</p>
                  </div>
                )}
                {aiData.personalInfo.dateOfBirth && (
                  <div>
                    <span className="text-sm text-gray-500">Date of Birth</span>
                    <p className="font-medium">{aiData.personalInfo.dateOfBirth}</p>
                  </div>
                )}
                {aiData.personalInfo.age && (
                  <div>
                    <span className="text-sm text-gray-500">Age</span>
                    <p className="font-medium">{aiData.personalInfo.age} years</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Info */}
        {aiData.contactInfo && 
         ((aiData.contactInfo.emails && aiData.contactInfo.emails.length > 0) || 
          (aiData.contactInfo.phoneNumbers && aiData.contactInfo.phoneNumbers.length > 0)) && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-green-500" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiData.contactInfo.emails && aiData.contactInfo.emails.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-500">Email Addresses</span>
                    <div className="space-y-1">
                      {aiData.contactInfo.emails.map((email, index) => (
                        <p key={index} className="font-medium">{email}</p>
                      ))}
                    </div>
                  </div>
                )}
                {aiData.contactInfo.phoneNumbers && aiData.contactInfo.phoneNumbers.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-500">Phone Numbers</span>
                    <div className="space-y-1">
                      {aiData.contactInfo.phoneNumbers.map((phone, index) => (
                        <p key={index} className="font-medium">{phone}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Addresses */}
        {aiData.addresses && aiData.addresses.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-500" />
                Addresses
              </h3>
              <div className="space-y-2">
                {aiData.addresses.map((address, index) => (
                  <p key={index} className="font-medium">{address}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Identification Numbers */}
        {aiData.identificationNumbers && aiData.identificationNumbers.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <IdCard className="w-5 h-5 mr-2 text-purple-500" />
                Identification Numbers
              </h3>
              <div className="space-y-2">
                {aiData.identificationNumbers.map((id, index) => (
                  <p key={index} className="font-medium">{id}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Dates */}
        {aiData.keyDates && aiData.keyDates.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-500" />
                Important Dates
              </h3>
              <div className="space-y-2">
                {aiData.keyDates.map((date, index) => (
                  <p key={index} className="font-medium">{date}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary */}
        {aiData.summary && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-gray-500" />
                Document Summary
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{aiData.summary}</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => router.push('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Upload
        </Button>
        
        <Card>
          <CardContent className="flex justify-center items-center min-h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your results...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => router.push('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Upload
        </Button>
        
        <ErrorBanner
          title="Error Loading Results"
          message={error}
          onRetry={fetchResults}
        />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => router.push('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Upload
        </Button>
        
        <ErrorBanner
          title="Results Not Found"
          message="The requested results could not be found. Please check the job ID and try again."
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Button variant="outline" onClick={() => router.push('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Upload
        </Button>
        
        {result.status === 'processing' && (
          <Button variant="outline" onClick={fetchResults}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        )}
      </div>

      {result.status === 'processing' && (
        <ProgressBar 
          progress={result.progress || 0} 
          status="Extracting text from document..."
          isPdf={result.fileName?.endsWith?.('.pdf')}
        />
      )}

      {result.status === 'completed' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardContent className="flex items-center pt-6">
                <User className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                  <p className="text-lg font-semibold">{result.fullName}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <CardContent className="flex items-center pt-6">
                <Calendar className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Age</p>
                  <p className="text-lg font-semibold">{result.age} years</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <CardContent className="flex items-center pt-6">
                <Brain className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Processing Method</p>
                  <p className="text-lg font-semibold capitalize">{result.processingMethod}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {result.processingMethod === 'ai' && result.aiExtractedData ? (
            <>
              <h2 className="text-2xl font-bold mt-8">AI Extraction Results</h2>
              {renderAIResults(result.aiExtractedData)}
              
              <h2 className="text-2xl font-bold mt-8">Raw Extracted Text</h2>
              <StandardPanel rawText={result.rawText} />
            </>
          ) : (
            <StandardPanel rawText={result.rawText} />
          )}
        </>
      )}

      {result.status === 'failed' && (
        <ErrorBanner
          title="Processing Failed"
          message="We encountered an error while processing your document. Please try uploading again."
        />
      )}
    </div>
  );
}