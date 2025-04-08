
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import StrategyGenerator from './strategy/StrategyGenerator';
import ContentCalendar from './strategy/ContentCalendar';
import AICaptions from './strategy/AICaptions';
import ContentFormats from './strategy/ContentFormats';
import CTACard from './strategy/CTACard';

interface AIStrategyProps {
  studioName: string;
  demoPin: string; // Added demoPin to the interface
}

const AIStrategy: React.FC<AIStrategyProps> = ({ studioName, demoPin }) => {
  const [generatingStrategy, setGeneratingStrategy] = useState(true);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedTab, setSelectedTab] = useState('calendar');
  const [projectData, setProjectData] = useState<any>(null);
  const [projectFiles, setProjectFiles] = useState<any[]>([]);
  const [instagramData, setInstagramData] = useState<any>(null);
  const [aiStrategy, setAiStrategy] = useState<any>({
    calendar: [],
    captions: [],
    formats: { carousels: 60, images: 30, videos: 10 },
    themes: []
  });
  const { toast } = useToast();

  // Load project and Instagram data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // First get studio ID using demo PIN
        const { data: studioData } = await supabase
          .from('studios')
          .select('id')
          .eq('demo_pin', demoPin)
          .single();
        
        if (studioData) {
          // Get the project data
          const { data: projects } = await supabase
            .from('projects')
            .select('*')
            .eq('studio_id', studioData.id)
            .eq('demo_pin', demoPin);
          
          if (projects && projects.length > 0) {
            const project = projects[0];
            setProjectData(project);
            
            // Fetch project files
            const { data: files } = await supabase
              .from('project_files')
              .select('*')
              .eq('project_id', project.id);
            
            if (files && files.length > 0) {
              setProjectFiles(files);
              console.log(`Found ${files.length} files for project analysis`);
            }
            
            // Get Instagram data
            const { data: instagram } = await supabase
              .from('instagram_accounts')
              .select('*')
              .eq('demo_pin', demoPin)
              .order('created_at', { ascending: false })
              .limit(1);
              
            if (instagram && instagram.length > 0) {
              setInstagramData(instagram[0]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    
    if (demoPin) {
      fetchData();
    }
  }, [demoPin]);

  // Generate AI strategy
  useEffect(() => {
    if (!projectData || !projectFiles.length) return;
    
    // Simulate AI generation progress
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            generateAIStrategy();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [projectData, projectFiles]);
  
  const generateAIStrategy = async () => {
    try {
      // Call the ai-strategy edge function
      const response = await fetch('/api/ai-strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectData,
          instagramData,
          projectFiles
        })
      });
      
      const strategyData = await response.json();
      
      // Create captions with actual project images
      const captions = projectFiles.length > 0 
        ? projectFiles.slice(0, 3).map(file => ({
            image: file.file_url,
            caption: strategyData.captions ? 
              strategyData.captions.find((c: any) => c.phase === file.phase)?.caption || 
              `This ${file.phase} phase of our ${projectData.name} project highlights our approach to design using ${projectData.materials || 'quality materials'}.` : 
              `This ${file.phase} phase of our ${projectData.name} project highlights our approach to design.`,
            phase: file.phase
          }))
        : strategyData.captions || [];
      
      // Update AI strategy with the generated data and project files
      setAiStrategy({
        calendar: strategyData.calendar || [],
        captions,
        formats: strategyData.formats || { carousels: 60, images: 30, videos: 10 },
        themes: strategyData.themes || [
          "Process Storytelling",
          "Technical Thursdays", 
          "Material Narratives",
          "Studio Culture"
        ]
      });
      
      // Store the strategy in Supabase
      if (projectData && projectData.id) {
        await supabase
          .from('content_strategies')
          .upsert({
            project_id: projectData.id,
            instagram_account_id: instagramData?.id || null,
            calendar: strategyData.calendar,
            captions: strategyData.captions,
            formats: strategyData.formats,
            themes: strategyData.themes,
            demo_pin: demoPin
          });
      }
      
      setGeneratingStrategy(false);
    } catch (error) {
      console.error("Error generating AI strategy:", error);
      // Fall back to mock data if the API call fails
      setGeneratingStrategy(false);
    }
  };

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
        
        {demoPin && (
          <div className="mb-4 text-center">
            <span className="text-sm bg-formaflow-purple/10 text-formaflow-purple font-medium px-3 py-1 rounded-full">
              Demo PIN: {demoPin}
            </span>
          </div>
        )}
        
        {projectData && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium">Project: {projectData.name}</p>
            <p className="text-xs text-gray-500">
              {projectFiles.length} files analyzed from concept to completion
            </p>
          </div>
        )}
        
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
              calendar={aiStrategy.calendar}
              onExport={handleDownloadStrategy}
            />
          </TabsContent>
          
          <TabsContent value="captions">
            <AICaptions 
              captions={aiStrategy.captions}
              onCopyCaption={handleCopyCaption}
            />
          </TabsContent>
          
          <TabsContent value="formats">
            <ContentFormats 
              formats={aiStrategy.formats}
              themes={aiStrategy.themes}
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
