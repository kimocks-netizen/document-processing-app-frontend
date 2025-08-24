// src/components/results/AIPanel.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';

interface AIPanelProps {
  aiData: any;
}

const AIPanel: React.FC<AIPanelProps> = ({ aiData }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-500" />
          AI Extraction Results
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
  );
};

export default AIPanel;