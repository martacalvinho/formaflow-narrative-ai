
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import StudioSetup from '@/components/demo/StudioSetup';
import ProjectUpload from '@/components/demo/ProjectUpload';
import SocialAnalysis from '@/components/demo/SocialAnalysis';
import AIStrategy from '@/components/demo/AIStrategy';
import { getDemoPin } from '@/services/supabase-service';
import { useToast } from '@/hooks/use-toast';

// Demo steps
type DemoStep = 'welcome' | 'studio-setup' | 'project-upload' | 'social-analysis' | 'ai-strategy';

const Demo = () => {
  const [currentStep, setCurrentStep] = useState<DemoStep>('welcome');
  const [demoPin, setDemoPin] = useState<string>('');
  const [studioData, setStudioData] = useState({
    name: '',
    website: '',
    style: 'minimalist',
    logo: null as File | null
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize the demo PIN
  useEffect(() => {
    const pin = getDemoPin();
    setDemoPin(pin);
    
    console.log(`Demo initialized with PIN: ${pin}`);
  }, []);

  const handleStudioSetupComplete = (data: typeof studioData) => {
    setStudioData(data);
    
    // Update demo PIN in localStorage and state if needed
    const currentPin = getDemoPin();
    if (currentPin !== demoPin) {
      setDemoPin(currentPin);
    }
    
    toast({
      title: "Studio setup complete",
      description: `Your demo session is linked with PIN: ${currentPin}`,
    });
    
    setCurrentStep('project-upload');
  };

  const handleProjectUploadComplete = () => {
    // Ensure demo PIN is consistent
    const currentPin = getDemoPin();
    if (currentPin !== demoPin) {
      setDemoPin(currentPin);
    }
    
    setCurrentStep('social-analysis');
  };

  const handleSocialAnalysisComplete = () => {
    // Ensure demo PIN is consistent
    const currentPin = getDemoPin();
    if (currentPin !== demoPin) {
      setDemoPin(currentPin);
    }
    
    setCurrentStep('ai-strategy');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-16">
            <div className="glass-purple p-8 rounded-2xl w-full">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Experience FormaFlow <span className="text-formaflow-purple">In Action</span>
              </h1>
              <p className="text-lg mb-8">
                This interactive demo walks you through how FormaFlow helps architecture studios 
                transform their design process into compelling marketing content.
              </p>
              {demoPin && (
                <div className="mb-4 p-3 bg-formaflow-purple/10 rounded-lg">
                  <p className="text-sm">
                    Your demo session PIN: <span className="font-bold">{demoPin}</span>
                  </p>
                  <p className="text-xs mt-1 text-gray-500">
                    This PIN links all your data throughout the demo experience
                  </p>
                </div>
              )}
              <Button 
                className="btn-primary px-8 py-6 text-lg"
                onClick={() => setCurrentStep('studio-setup')}
              >
                Start the Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        );
      case 'studio-setup':
        return <StudioSetup onComplete={handleStudioSetupComplete} demoPin={demoPin} />;
      case 'project-upload':
        return <ProjectUpload studioName={studioData.name} onComplete={handleProjectUploadComplete} />;
      case 'social-analysis':
        return <SocialAnalysis onComplete={handleSocialAnalysisComplete} demoPin={demoPin} />;
      case 'ai-strategy':
        return <AIStrategy studioName={studioData.name} demoPin={demoPin} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-formaflow-background">
      <Navbar />
      <main className="container max-w-7xl mx-auto px-4 py-8">
        {renderStep()}
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
