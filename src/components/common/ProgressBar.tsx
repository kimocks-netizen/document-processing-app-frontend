// src/components/common/ProgressBar.tsx
import { Card, CardContent } from '@/components/ui/card';

interface ProgressBarProps {
  progress: number;
  status: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, status }) => {
  const isProcessing = progress > 0 && progress < 100;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium flex items-center">
              {isProcessing && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
              )}
              Processing Document
            </span>
            <span className="text-gray-500 font-mono">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ease-out ${
                isProcessing 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse' 
                  : progress === 100 
                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                    : 'bg-gradient-to-r from-red-500 to-red-600'
              }`}
              style={{ width: `${Math.max(progress, 5)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            {status}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressBar;