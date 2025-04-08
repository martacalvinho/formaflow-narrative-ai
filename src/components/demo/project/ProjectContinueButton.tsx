
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProjectContinueButtonProps {
  onContinue: () => void;
  isSaving: boolean;
  demoPin?: string;
}

const ProjectContinueButton: React.FC<ProjectContinueButtonProps> = ({ 
  onContinue, 
  isSaving,
  demoPin 
}) => {
  const { toast } = useToast();
  
  const handleContinue = () => {
    // Store the demo PIN in localStorage if available
    if (demoPin) {
      localStorage.setItem('formaflow_demo_pin', demoPin);
      
      toast({
        title: "Demo session saved",
        description: `Your demo PIN is: ${demoPin}. This links all your project data.`,
        duration: 5000,
      });
    }
    
    // Continue to the next step
    onContinue();
  };
  
  return (
    <Button 
      onClick={handleContinue} 
      className="btn-primary w-full"
      disabled={isSaving}
    >
      {isSaving ? "Saving..." : "Continue to Social Analysis"}
      {!isSaving && <ArrowRight className="ml-2 w-4 h-4" />}
    </Button>
  );
};

export default ProjectContinueButton;
