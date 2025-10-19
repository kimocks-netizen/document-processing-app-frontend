'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Users, FileText, TrendingUp, Calendar } from 'lucide-react';
import { apiRequest } from '../../services/auth';

interface AdminStats {
  totalUsers: number;
  totalDocuments: number;
  recentUsers: number;
  recentDocuments: number;
  methodCounts: {
    standard?: number;
    ai?: number;
  };
}

export const AdminStatsTab: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await apiRequest<{ stats: AdminStats }>('/admin/stats');
      
      if (response.success && response.data) {
        setStats(response.data.stats);
      } else {
        setError('Failed to fetch statistics');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button 
              onClick={fetchStats}
              className="mt-2 text-blue-600 hover:text-blue-800"
            >
              Try again
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  const standardCount = stats.methodCounts.standard || 0;
  const aiCount = stats.methodCounts.ai || 0;
  const totalProcessed = standardCount + aiCount;
  const standardPercentage = totalProcessed > 0 ? Math.round((standardCount / totalProcessed) * 100) : 0;
  const aiPercentage = totalProcessed > 0 ? Math.round((aiCount / totalProcessed) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.recentUsers} new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">
              {stats.recentDocuments} processed this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Standard Processing</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{standardCount}</div>
            <p className="text-xs text-muted-foreground">
              {standardPercentage}% of all processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Processing</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiCount}</div>
            <p className="text-xs text-muted-foreground">
              {aiPercentage}% of all processing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Processing Method Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Processing Method Distribution</CardTitle>
          <CardDescription>
            Breakdown of documents processed by method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Standard Extraction</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{standardCount}</div>
                <div className="text-xs text-muted-foreground">{standardPercentage}%</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${standardPercentage}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">AI Extraction</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{aiCount}</div>
                <div className="text-xs text-muted-foreground">{aiPercentage}%</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${aiPercentage}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Recent Users</span>
            </CardTitle>
            <CardDescription>
              New users registered this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.recentUsers}</div>
            <p className="text-sm text-muted-foreground mt-2">
              {stats.totalUsers > 0 ? Math.round((stats.recentUsers / stats.totalUsers) * 100) : 0}% of total users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Recent Documents</span>
            </CardTitle>
            <CardDescription>
              Documents processed this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.recentDocuments}</div>
            <p className="text-sm text-muted-foreground mt-2">
              {stats.totalDocuments > 0 ? Math.round((stats.recentDocuments / stats.totalDocuments) * 100) : 0}% of total documents
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
