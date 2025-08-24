// src/components/results/StandardPanel.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface StandardPanelProps {
  rawText: string;
}

const StandardPanel: React.FC<StandardPanelProps> = ({ rawText }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-500" />
          Standard Extraction Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md max-h-96 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm font-mono">
            {rawText || 'No text extracted'}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default StandardPanel;