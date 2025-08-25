// src/app/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, BarChart3, History, Brain, Cog } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-red-600" />,
      title: "AI-Powered Extraction",
      description: "Advanced AI algorithms for intelligent document data extraction and analysis"
    },
    {
      icon: <Cog className="w-8 h-8 text-red-600" />,
      title: "Standard Processing",
      description: "Reliable traditional document processing for consistent results"
    },
    {
      icon: <FileText className="w-8 h-8 text-red-600" />,
      title: "Multiple Formats",
      description: "Support for PDF, JPG, PNG and other document formats"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              DocProcessor
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Transform your documents into structured data with our advanced AI-powered extraction capabilities. 
            Process PDFs, images, and more with intelligent automation.
          </p>
          
          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/upload">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Upload className="w-6 h-6 mr-3" />
                Upload Document
              </Button>
            </Link>
            <Link href="/results">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <BarChart3 className="w-6 h-6 mr-3" />
                View Results
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need for efficient document processing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isHovered === `feature-${index}` 
                    ? 'shadow-2xl border-red-300 dark:border-red-600' 
                    : 'shadow-lg hover:shadow-xl'
                }`}
                onMouseEnter={() => setIsHovered(`feature-${index}`)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-full w-16 h-16 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Get Started Today
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link href="/documents">
              <Card 
                className={`transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isHovered === 'history' 
                    ? 'shadow-2xl border-red-300 dark:border-red-600' 
                    : 'shadow-lg hover:shadow-xl'
                }`}
                onMouseEnter={() => setIsHovered('history')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <CardContent className="p-8 text-center">
                  <History className="w-16 h-16 text-red-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Document History
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    View and manage all your previously processed documents
                  </p>
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                    View History
                  </Button>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/upload">
              <Card 
                className={`transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isHovered === 'upload' 
                    ? 'shadow-2xl border-red-300 dark:border-red-600' 
                    : 'shadow-lg hover:shadow-xl'
                }`}
                onMouseEnter={() => setIsHovered('upload')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <CardContent className="p-8 text-center">
                  <Upload className="w-16 h-16 text-red-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Process New Document
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Upload and process new documents with AI or standard extraction
                  </p>
                  <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                    Start Processing
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}