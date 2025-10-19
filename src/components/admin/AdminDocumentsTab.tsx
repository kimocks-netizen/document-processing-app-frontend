'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { MoreHorizontal, Search, Eye, Trash2, FileText, User } from 'lucide-react';
import { apiRequest } from '../../services/auth';

interface Document {
  id: number;
  job_id: string;
  file_name: string;
  first_name: string;
  last_name: string;
  processing_method: 'standard' | 'ai';
  status: 'processing' | 'completed' | 'failed';
  created_at: string;
  completed_at?: string;
  users?: {
    id: string;
    name: string;
    email: string;
  };
}

export const AdminDocumentsTab: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await apiRequest<{ documents: Document[] }>('/admin/documents');
      
      if (response.success && response.data) {
        setDocuments(response.data.documents);
      } else {
        setError('Failed to fetch documents');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDocument = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(jobId);
      const response = await apiRequest(`/api/results/${jobId}`, {
        method: 'DELETE',
      });
      
      if (response.success) {
        setDocuments(documents.filter(doc => doc.job_id !== jobId));
      } else {
        alert('Failed to delete document');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document');
    } finally {
      setActionLoading(null);
    }
  };

  const handleViewDocument = (jobId: string) => {
    window.open(`/results/${jobId}`, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'ai':
        return 'bg-blue-100 text-blue-800';
      case 'standard':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredDocuments = documents.filter(doc =>
    doc.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.users?.name && doc.users.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (doc.users?.email && doc.users.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button 
              onClick={fetchDocuments}
              className="mt-2 text-blue-600 hover:text-blue-800"
            >
              Try again
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>
        <div className="text-sm text-gray-600">
          {filteredDocuments.length} of {documents.length} documents
        </div>
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>All Documents</CardTitle>
          <CardDescription>
            View and manage all processed documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.job_id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium truncate">{doc.file_name}</h3>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                      <Badge className={getMethodColor(doc.processing_method)}>
                        {doc.processing_method}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {doc.first_name} {doc.last_name}
                    </p>
                    {doc.users && (
                      <p className="text-xs text-gray-500">
                        User: {doc.users.name} ({doc.users.email})
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Created: {formatDate(doc.created_at)}
                      {doc.completed_at && ` • Completed: ${formatDate(doc.completed_at)}`}
                    </p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" disabled={actionLoading === doc.job_id}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleViewDocument(doc.job_id)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Document
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteDocument(doc.job_id)}
                      disabled={actionLoading === doc.job_id}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Document
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}

            {filteredDocuments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'No documents found matching your search.' : 'No documents found.'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
