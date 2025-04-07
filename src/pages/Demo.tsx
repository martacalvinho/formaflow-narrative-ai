
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import StudioSetup from '@/components/demo/StudioSetup';
import ProjectUpload from '@/components/demo/ProjectUpload';
import SocialAnalysis from '@/components/demo/SocialAnalysis';
import AIStrategy from '@/components/demo/AIStrategy';

// Demo steps
type DemoStep = 'welcome' | 'studio-setup' | 'project-upload' | 'social-analysis' | 'ai-strategy';

const Demo = () => {
  const [currentStep, setCurrentStep] = useState<DemoStep>('welcome');
  const [studioData, setStudioData] = useState({
    name: '',
    website: '',
    style: 'minimalist',
    logo: null as File | null
  });
  const navigate = useNavigate();

  const handleStudioSetupComplete = (data: typeof studioData) => {
    setStudioData(data);
    setCurrentStep('project-upload');
  };

  const handleProjectUploadComplete = () => {
    setCurrentStep('social-analysis');
  };

  const handleSocialAnalysisComplete = () => {
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
        return <StudioSetup onComplete={handleStudioSetupComplete} />;
      case 'project-upload':
        return <ProjectUpload studioName={studioData.name} onComplete={handleProjectUploadComplete} />;
      case 'social-analysis':
        return <SocialAnalysis onComplete={handleSocialAnalysisComplete} />;
      case 'ai-strategy':
        return <AIStrategy studioName={studioData.name} />;
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
