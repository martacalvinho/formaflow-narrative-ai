
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface AnalysisStepProps {
  label: string;
  isComplete: boolean;
}

const AnalysisStep: React.FC<AnalysisStepProps> = ({ label, isComplete }) => (
  <div className="p-4 rounded-lg bg-gray-50">
    <p className="text-sm text-formaflow-muted-text mb-1">{label}</p>
    <p className="font-medium">{isComplete ? 'Complete' : 'In Progress...'}</p>
  </div>
);

interface InstagramAnalysisProgressProps {
  analysisProgress: number;
  username: string;
}

const InstagramAnalysisProgress: React.FC<InstagramAnalysisProgressProps> = ({
  analysisProgress,
  username
}) => {
  return (
    <div className="space-y-6 py-8">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Analyzing @{username}</h3>
        <p className="text-formaflow-muted-text mb-4">
          AI is processing your Instagram content to identify patterns and opportunities.
        </p>
      </div>
      
      <Progress value={analysisProgress} className="h-2" />
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <AnalysisStep label="Analyzing Post Types" isComplete={analysisProgress >= 30} />
        <AnalysisStep label="Engagement Patterns" isComplete={analysisProgress >= 60} />
        <AnalysisStep label="Content Analysis" isComplete={analysisProgress >= 90} />
      </div>
    </div>
  );
};

export default InstagramAnalysisProgress;
