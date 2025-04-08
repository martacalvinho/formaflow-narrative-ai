
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ProjectContinueButtonProps {
  onContinue: () => void;
  isSaving: boolean;
}

const ProjectContinueButton: React.FC<ProjectContinueButtonProps> = ({ onContinue, isSaving }) => {
  return (
    <Button 
      onClick={onContinue} 
      className="btn-primary w-full"
      disabled={isSaving}
    >
      {isSaving ? "Saving..." : "Continue to Social Analysis"}
      {!isSaving && <ArrowRight className="ml-2 w-4 h-4" />}
    </Button>
  );
};

export default ProjectContinueButton;
