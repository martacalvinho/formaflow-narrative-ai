
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Instagram, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { saveInstagramData, saveCompetitorAnalysis } from '@/services/supabase-service';
import InstagramConnector from './social/InstagramConnector';
import InstagramAnalysisProgress from './social/InstagramAnalysisProgress';
import InstagramStats from './social/InstagramStats';
import ContentPerformance from './social/ContentPerformance';
import TopPosts from './social/TopPosts';
import CompetitorInput from './social/CompetitorInput';
import CompetitorAnalysis from './social/CompetitorAnalysis';
import InstagramInsights from './social/InstagramInsights';

interface SocialAnalysisProps {
  onComplete: () => void;
}

const mockInstagramData = {
  username: 'martacalvinho',
  followers: 24823,
  posts: 217,
  engagement: 6.8,
  topPosts: [
    { id: 1, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', likes: 952, comments: 42 },
    { id: 2, imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea', likes: 874, comments: 39 },
    { id: 3, imageUrl: 'https://images.unsplash.com/photo-1600573472556-e636c2acda88', likes: 836, comments: 37 },
    { id: 4, imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db3d', likes: 801, comments: 33 },
    { id: 5, imageUrl: 'https://images.unsplash.com/photo-1601760561441-16420502c7e0', likes: 768, comments: 28 },
    { id: 6, imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0', likes: 742, comments: 31 },
  ],
  postTypes: { images: 65, carousels: 30, videos: 5 },
  postTiming: { weekday: 'Thursday', time: '7PM' }
};

const mockCompetitorsData = {
  'zahahadid': {
    followers: 187000,
    postTypes: { images: 45, carousels: 40, videos: 15 },
    topContent: 'Project reveals and in-progress models',
    insights: [
      'Posts with 3D renderings get 30% more engagement',
      'Behind-the-scenes videos of model making are saved most frequently',
      'Posts about architectural theory receive the most comments',
      'Optimal posting time is weekday mornings'
    ]
  },
  'fosterandpartners': {
    followers: 315000,
    postTypes: { images: 55, carousels: 35, videos: 10 },
    topContent: 'Completed projects and awards',
    insights: [
      'Aerial views of completed projects get the highest engagement',
      'Posts highlighting sustainability features receive the most shares',
      'Employee spotlights humanize the brand and increase follower growth',
      'Most active audience engagement occurs on Tuesdays'
    ]
  },
  'big_builds': {
    followers: 98500,
    postTypes: { images: 50, carousels: 25, videos: 25 },
    topContent: 'Innovative concepts and design process',
    insights: [
      'Concept sketches get 40% more saves than finished renders',
      'Reels explaining design concepts receive the highest view completion',
      'Material studies and detail shots drive specialist engagement',
      'Weekend posts perform better than weekday content'
    ]
  }
};

const defaultInsights = [
  { text: 'Your audience engages most with architectural process photos rather than just final shots' },
  { text: 'Carousel posts showing the evolution of a project get 43% more saves than single images' },
  { text: 'Posts with technical details in captions receive more comments from fellow professionals' }
];

const SocialAnalysis: React.FC<SocialAnalysisProps> = ({ onComplete }) => {
  const [instagramUsername, setInstagramUsername] = useState('martacalvinho');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [instagramData, setInstagramData] = useState(mockInstagramData);
  const [savedInstagramId, setSavedInstagramId] = useState<string | null>(null);
  
  // Competitor analysis
  const [showCompetitorInput, setShowCompetitorInput] = useState(false);
  const [competitor1, setCompetitor1] = useState('');
  const [competitor2, setCompetitor2] = useState('');
  const [analyzingCompetitors, setAnalyzingCompetitors] = useState(false);
  const [competitorsAnalyzed, setCompetitorsAnalyzed] = useState<string[]>([]);
  const [competitorsData, setCompetitorsData] = useState<Record<string, any>>({});
  
  const { toast } = useToast();

  const handleConnectInstagram = async () => {
    if (!instagramUsername) return;
    
    setIsConnecting(true);
    
    // Simulate connection and analysis
    setTimeout(() => {
      setIsConnected(true);
      
      // Start progress simulation
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setAnalysisComplete(true);
              
              // Save Instagram data to Supabase
              saveInstagramData(instagramUsername, {
                followers: instagramData.followers,
                posts: instagramData.posts,
                engagement: instagramData.engagement,
                topPosts: instagramData.topPosts,
                postTypes: instagramData.postTypes,
                postTiming: instagramData.postTiming
              }).then(data => {
                if (data) {
                  setSavedInstagramId(data.id);
                }
              }).catch(error => {
                console.error("Error saving Instagram data:", error);
              });
            }, 500);
            return 100;
          }
          return newProgress;
        });
      }, 300);
    }, 1500);
  };

  const handleAddCompetitor = () => {
    setShowCompetitorInput(true);
  };

  const handleAnalyzeCompetitors = async () => {
    if (!competitor1 && !competitor2) {
      toast({
        title: "No competitors",
        description: "Please enter at least one competitor Instagram handle",
        variant: "destructive"
      });
      return;
    }
    
    setAnalyzingCompetitors(true);
    
    // Simulated analysis
    setTimeout(() => {
      const newCompetitors: string[] = [];
      const newCompetitorsData: Record<string, any> = { ...competitorsData };
      
      if (competitor1 && !competitorsAnalyzed.includes(competitor1)) {
        newCompetitors.push(competitor1);
        
        // Get mock data or use a default
        const mockData = mockCompetitorsData[competitor1 as keyof typeof mockCompetitorsData] || 
          mockCompetitorsData.big_builds;
        
        newCompetitorsData[competitor1] = mockData;
        
        // If connected to Supabase, save the competitor analysis
        if (savedInstagramId) {
          saveCompetitorAnalysis(savedInstagramId, competitor1, mockData)
            .catch(error => console.error("Error saving competitor analysis:", error));
        }
      }
      
      if (competitor2 && !competitorsAnalyzed.includes(competitor2)) {
        newCompetitors.push(competitor2);
        
        // Get mock data or use a default
        const mockData = mockCompetitorsData[competitor2 as keyof typeof mockCompetitorsData] || 
          mockCompetitorsData.zahahadid;
        
        newCompetitorsData[competitor2] = mockData;
        
        // If connected to Supabase, save the competitor analysis
        if (savedInstagramId) {
          saveCompetitorAnalysis(savedInstagramId, competitor2, mockData)
            .catch(error => console.error("Error saving competitor analysis:", error));
        }
      }
      
      setCompetitorsAnalyzed(prev => [...prev, ...newCompetitors]);
      setCompetitorsData(newCompetitorsData);
      setShowCompetitorInput(false);
      setAnalyzingCompetitors(false);
      
      toast({
        title: "Competitors Analyzed",
        description: `Successfully analyzed ${newCompetitors.length} competitor accounts`
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-8 rounded-2xl mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Instagram className="w-8 h-8 text-formaflow-purple" />
          <div>
            <h2 className="text-2xl font-bold">Social Media Analysis</h2>
            <p className="text-formaflow-muted-text">Connect your Instagram account for AI analysis</p>
          </div>
        </div>
        
        {!isConnected ? (
          <InstagramConnector 
            instagramUsername={instagramUsername}
            onUsernameChange={setInstagramUsername}
            isConnecting={isConnecting}
            onConnect={handleConnectInstagram}
          />
        ) : (
          <div>
            {!analysisComplete ? (
              <InstagramAnalysisProgress 
                analysisProgress={analysisProgress}
                username={instagramUsername}
              />
            ) : (
              <div className="space-y-6">
                <InstagramStats 
                  followers={instagramData.followers}
                  posts={instagramData.posts}
                  engagement={instagramData.engagement}
                />
                
                <ContentPerformance postTypes={instagramData.postTypes} />
                
                <TopPosts posts={instagramData.topPosts} />
                
                {/* Competitor Analysis Section */}
                <Card className="mt-8">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Competitor Analysis</CardTitle>
                      <Button 
                        onClick={handleAddCompetitor} 
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                        disabled={analyzingCompetitors || competitorsAnalyzed.length >= 2 || showCompetitorInput}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Competitor</span>
                      </Button>
                    </div>
                    <CardDescription>
                      Compare your performance against industry competitors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {showCompetitorInput ? (
                      <CompetitorInput 
                        competitor1={competitor1}
                        competitor2={competitor2}
                        onCompetitor1Change={setCompetitor1}
                        onCompetitor2Change={setCompetitor2}
                        analyzingCompetitors={analyzingCompetitors}
                        onAnalyze={handleAnalyzeCompetitors}
                        onCancel={() => setShowCompetitorInput(false)}
                      />
                    ) : competitorsAnalyzed.length > 0 ? (
                      <div className="space-y-6">
                        {competitorsAnalyzed.map(competitor => (
                          <CompetitorAnalysis 
                            key={competitor}
                            competitor={competitor}
                            data={competitorsData[competitor]}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-500 mb-2">
                          Add competitors to compare your Instagram performance
                        </p>
                        <p className="text-sm text-gray-400">
                          Analyze up to 2 competitor Instagram accounts
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Button onClick={onComplete} className="btn-primary w-full">
                  Continue to AI Strategy
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <InstagramInsights 
        insights={defaultInsights}
        postingTime={isConnected ? instagramData.postTiming : { weekday: 'Thursday', time: '7PM' }}
      />
    </div>
  );
};

export default SocialAnalysis;
