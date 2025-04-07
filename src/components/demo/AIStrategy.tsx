
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Brain, 
  Calendar, 
  Sparkles,
  ExternalLink,
  Check,
  Copy,
  Instagram,
  Image as ImageIcon,
  MessageSquare,
  Film,
  LayoutGrid
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

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
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-8 rounded-2xl text-center">
          <Brain className="w-16 h-16 text-formaflow-purple mx-auto mb-6" />
          
          <h2 className="text-2xl font-bold mb-2">
            Generating Your Content Strategy
          </h2>
          
          <p className="text-formaflow-muted-text mb-8">
            FormaFlow's AI is analyzing your project files and social media data to create a tailored content strategy.
          </p>
          
          <Progress value={generationProgress} className="h-2 mb-8" />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-gray-50">
              <Sparkles className="w-6 h-6 text-formaflow-purple mx-auto mb-2" />
              <p className="text-sm font-medium">Generating Captions</p>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-50">
              <Calendar className="w-6 h-6 text-formaflow-purple mx-auto mb-2" />
              <p className="text-sm font-medium">Creating Content Calendar</p>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-50">
              <LayoutGrid className="w-6 h-6 text-formaflow-purple mx-auto mb-2" />
              <p className="text-sm font-medium">Optimizing Content Mix</p>
            </div>
          </div>
        </div>
      </div>
    );
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
              <Calendar className="w-4 h-4 mr-2" />
              Content Calendar
            </TabsTrigger>
            <TabsTrigger value="captions">
              <MessageSquare className="w-4 h-4 mr-2" />
              AI Captions
            </TabsTrigger>
            <TabsTrigger value="formats">
              <LayoutGrid className="w-4 h-4 mr-2" />
              Content Formats
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Content Schedule</CardTitle>
                <CardDescription>
                  Optimized posting schedule based on your project phases and audience engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {mockCalendar.map((day, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-2 text-center border-b">
                        <p className="text-sm font-medium">{day.day}</p>
                      </div>
                      <div className="p-3 h-28 flex flex-col items-center justify-center text-center">
                        {day.content ? (
                          <>
                            <div className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center ${
                              day.phase === 'concept' ? 'bg-blue-100 text-blue-600' :
                              day.phase === 'inspiration' ? 'bg-purple-100 text-purple-600' :
                              day.phase === 'drawings' ? 'bg-green-100 text-green-600' :
                              day.phase === 'construction' ? 'bg-orange-100 text-orange-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {day.type === 'carousel' ? <LayoutGrid className="w-4 h-4" /> : 
                               day.type === 'image' ? <ImageIcon className="w-4 h-4" /> :
                               day.type === 'video' ? <Film className="w-4 h-4" /> :
                               <MessageSquare className="w-4 h-4" />}
                            </div>
                            <p className="text-xs">{day.content}</p>
                            <p className="text-xs text-formaflow-muted-text mt-1">
                              {day.type === 'carousel' ? 'Carousel' : 
                               day.type === 'image' ? 'Single Image' :
                               day.type === 'video' ? 'Video' : 'Post'}
                            </p>
                          </>
                        ) : (
                          <p className="text-xs text-formaflow-muted-text">No scheduled content</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Edit Schedule
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownloadStrategy}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Export to Calendar
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="captions">
            <div className="space-y-4">
              {mockCaptions.map((item, index) => (
                <Card key={index}>
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img src={item.image} alt="Project image" className="w-full h-full object-cover rounded-l-lg" />
                    </div>
                    <div className="md:w-2/3 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className={`px-2 py-1 text-xs rounded-full ${
                          item.phase === 'concept' ? 'bg-blue-100 text-blue-600' :
                          item.phase === 'inspiration' ? 'bg-purple-100 text-purple-600' :
                          item.phase === 'construction' ? 'bg-orange-100 text-orange-600' :
                          item.phase === 'final' ? 'bg-green-100 text-green-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {item.phase.charAt(0).toUpperCase() + item.phase.slice(1)} Phase
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleCopyCaption(item.caption)}>
                          <Copy className="w-4 h-4 mr-1" /> Copy
                        </Button>
                      </div>
                      <p className="text-sm mb-3">{item.caption}</p>
                      <div className="flex items-center text-xs text-formaflow-muted-text">
                        <Instagram className="w-3 h-3 mr-1" />
                        <span>Optimized for Instagram</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              <div className="flex justify-center">
                <Button variant="outline">
                  Generate More Captions
                  <Sparkles className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="formats">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommended Formats</CardTitle>
                  <CardDescription>Based on your content and audience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <LayoutGrid className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Carousels</p>
                          <p className="text-xs text-formaflow-muted-text">Show process & evolution</p>
                        </div>
                      </div>
                      <p className="text-xl font-bold">60%</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <ImageIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Single Images</p>
                          <p className="text-xs text-formaflow-muted-text">Highlight key moments</p>
                        </div>
                      </div>
                      <p className="text-xl font-bold">30%</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Film className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Videos/Reels</p>
                          <p className="text-xs text-formaflow-muted-text">Site walkthroughs</p>
                        </div>
                      </div>
                      <p className="text-xl font-bold">10%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Themes</CardTitle>
                  <CardDescription>Strategic content pillars for your studio</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Process Storytelling</p>
                        <p className="text-sm text-formaflow-muted-text">
                          Share the evolution from concept to completion to engage fellow professionals
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Technical Thursdays</p>
                        <p className="text-sm text-formaflow-muted-text">
                          Highlight technical challenges and innovative solutions in your projects
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Material Narratives</p>
                        <p className="text-sm text-formaflow-muted-text">
                          Focus on material selections, textures, and how they contribute to the project's story
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Studio Culture</p>
                        <p className="text-sm text-formaflow-muted-text">
                          Occasional behind-the-scenes content to humanize your brand
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
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
      
      <Card className="bg-gradient-to-br from-formaflow-purple to-formaflow-purple-light text-white">
        <CardContent className="p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Studio's Content Strategy?
            </h2>
            <p className="mb-8 text-white/90">
              FormaFlow helps architecture studios create consistent, compelling content from their existing workflow. Join our waitlist for early access.
            </p>
            <Button 
              onClick={handleJoinWaitlist}
              className="bg-white text-formaflow-purple hover:bg-white/90 transition-colors text-lg px-8 py-6"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIStrategy;
