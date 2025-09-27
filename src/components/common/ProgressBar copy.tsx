// src/components/common/ProgressBar.tsx
import { Card, CardContent } from '@/components/ui/card';

interface ProgressBarProps {
  progress: number;
  status: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, status }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Processing</span>
            <span className="text-gray-500">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-red-600 to-red-800 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{status}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressBar;