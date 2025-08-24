// src/components/results/CompareView.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Brain } from 'lucide-react';

interface CompareViewProps {
  standardText: string;
  aiData: any;
}

const CompareView: React.FC<CompareViewProps> = ({ standardText, aiData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-500" />
            Standard Extraction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {standardText || 'No text extracted'}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-500" />
            AI Extraction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {aiData ? JSON.stringify(aiData, null, 2) : 'No AI data available'}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompareView;