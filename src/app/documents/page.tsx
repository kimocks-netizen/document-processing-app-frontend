// src/app/documents/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, Calendar, User, Download } from 'lucide-react';

// Mock data for demonstration
const mockDocuments = [
  {
    id: '1',
    fileName: 'document1.pdf',
    uploadDate: '2024-01-15',
    processedDate: '2024-01-15',
    status: 'completed',
    processingMethod: 'standard',
    fullName: 'John Doe',
    fileSize: '2.4 MB'
  },
  {
    id: '2',
    fileName: 'id_photo.jpg',
    uploadDate: '2024-01-14',
    processedDate: '2024-01-14',
    status: 'completed',
    processingMethod: 'ai',
    fullName: 'Jane Smith',
    fileSize: '1.8 MB'
  },
  {
    id: '3',
    fileName: 'contract.pdf',
    uploadDate: '2024-01-13',
    processedDate: '2024-01-13',
    status: 'completed',
    processingMethod: 'standard',
    fullName: 'Robert Johnson',
    fileSize: '3.2 MB'
  },
];

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
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

      <Card>
        <CardHeader>
          <CardTitle>Document History</CardTitle>
          <CardDescription>
            {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.fileName}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {doc.fileSize} • {doc.processingMethod.toUpperCase()} processing
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm">
                        View Results
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center text-sm">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      {doc.fullName}
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      Uploaded on {doc.uploadDate}
                    </div>
                    <div className="flex items-center text-sm">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        doc.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No documents found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm ? 'Try adjusting your search terms' : 'Upload your first document to get started'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}