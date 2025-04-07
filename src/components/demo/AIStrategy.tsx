
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import StrategyGenerator from './strategy/StrategyGenerator';
import ContentCalendar from './strategy/ContentCalendar';
import AICaptions from './strategy/AICaptions';
import ContentFormats from './strategy/ContentFormats';
import CTACard from './strategy/CTACard';

interface AIStrategyProps {
  studioName: string;
}

const mockProjectImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea',
  'https://images.unsplash.com/photo-1600573472556-e636c2acda88',
  'https://images.unsplash.com/photo-1600585154526-990dced4db3d',
  'https://images.unsplash.com/photo-1601760561441-16420502c7e0'
];

const mockCalendar = [
  { day: 'Monday', content: 'Concept Sketches', type: 'carousel', phase: 'concept' },
  { day: 'Tuesday', content: null, type: null, phase: null },
  { day: 'Wednesday', content: 'Design Evolution', type: 'image', phase: 'drawings' },
  { day: 'Thursday', content: 'Material Studies', type: 'carousel', phase: 'construction' },
  { day: 'Friday', content: 'Final Photography', type: 'image', phase: 'final' },
  { day: 'Saturday', content: null, type: null, phase: null },
  { day: 'Sunday', content: 'Weekly Inspiration', type: 'carousel', phase: 'inspiration' }
];

const mockCaptions = [
  { 
    image: mockProjectImages[0],
    caption: "The journey of our Urban Loft project began with these initial concept sketches. We wanted to preserve the industrial character while bringing in natural light through strategic openings. #architecture #concept #design #urbanrenewal",
    phase: 'concept'
  },
  { 
    image: mockProjectImages[1],
    caption: "Materials tell the story of a space. For this renovation, we chose a palette of concrete, reclaimed wood, and steel to honor the building's history while creating a warm, livable environment. Swipe to see the material evolution. #architecture #materiality #renovation",
    phase: 'construction'
  },
  { 
    image: mockProjectImages[2],
    caption: "Light transforms space. The final photographs of our Urban Loft project capture how natural light interacts with the materials throughout the day, creating a constantly evolving atmosphere. #architecture #interiordesign #naturallighting",
    phase: 'final'
  }
];

const mockThemes = [
  "Process Storytelling",
  "Technical Thursdays", 
  "Material Narratives",
  "Studio Culture"
];

const AIStrategy: React.FC<AIStrategyProps> = ({ studioName }) => {
  const [generatingStrategy, setGeneratingStrategy] = useState(true);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedTab, setSelectedTab] = useState('calendar');
  const { toast } = useToast();

  useEffect(() => {
    // Simulate AI generation progress
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setGeneratingStrategy(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleCopyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption);
    toast({
      title: "Caption copied",
      description: "The caption has been copied to your clipboard."
    });
  };

  const handleDownloadStrategy = () => {
    toast({
      title: "Strategy ready for download",
      description: "Your content strategy would be downloaded in a real implementation."
    });
  };

  const handleJoinWaitlist = () => {
    window.location.href = "#";
    toast({
      title: "Thanks for your interest!",
      description: "In a real implementation, you would be directed to the waitlist form."
    });
  };

  if (generatingStrategy) {
    return <StrategyGenerator progress={generationProgress} />;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-card p-8 rounded-2xl mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-8 h-8 text-formaflow-purple" />
          <div>
            <h2 className="text-2xl font-bold">Your AI Content Strategy</h2>
            <p className="text-formaflow-muted-text">Customized for {studioName}</p>
          </div>
        </div>
        
        <Tabs defaultValue="calendar" className="mb-6" onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="calendar">
              Content Calendar
            </TabsTrigger>
            <TabsTrigger value="captions">
              AI Captions
            </TabsTrigger>
            <TabsTrigger value="formats">
              Content Formats
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <ContentCalendar 
              calendar={mockCalendar}
              onExport={handleDownloadStrategy}
            />
          </TabsContent>
          
          <TabsContent value="captions">
            <AICaptions 
              captions={mockCaptions}
              onCopyCaption={handleCopyCaption}
            />
          </TabsContent>
          
          <TabsContent value="formats">
            <ContentFormats 
              formats={{ carousels: 60, images: 30, videos: 10 }}
              themes={mockThemes}
            />
          </TabsContent>
        </Tabs>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button onClick={handleDownloadStrategy} className="flex-1">
            Download Full Strategy
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="outline" className="flex-1">
            Try Another Project
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <CTACard onJoinWaitlist={handleJoinWaitlist} />
    </div>
  );
};

export default AIStrategy;
