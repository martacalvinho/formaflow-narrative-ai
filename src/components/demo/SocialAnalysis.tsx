
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Instagram, Link, BarChart2, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { saveInstagramData, saveCompetitorAnalysis } from '@/services/supabase-service';

interface SocialAnalysisProps {
  onComplete: () => void;
}

// Mock data for Instagram
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

// Mock data for competitors
const mockCompetitorsData = {
  'zahahadid': {
    followers: 187000,
    engagement: 4.2,
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
    engagement: 3.8,
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
    engagement: 5.1,
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
          <div className="space-y-6">
            <div className="flex gap-3">
              <Input
                value={instagramUsername}
                onChange={(e) => setInstagramUsername(e.target.value)}
                placeholder="Your Instagram handle"
                className="flex-1"
                disabled={isConnecting}
              />
              <Button 
                onClick={handleConnectInstagram} 
                className="btn-primary"
                disabled={isConnecting || !instagramUsername}
              >
                {isConnecting ? 'Connecting...' : 'Connect'}
                <Link className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center bg-gray-50 rounded-xl p-8 border border-dashed border-gray-200">
              <Instagram className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">Connect Your Instagram</h3>
              <p className="text-formaflow-muted-text mb-4">
                FormaFlow will analyze your content to identify trends, engagement patterns, and optimal posting strategies.
              </p>
            </div>
          </div>
        ) : (
          <div>
            {!analysisComplete ? (
              <div className="space-y-6 py-8">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Analyzing @{instagramUsername}</h3>
                  <p className="text-formaflow-muted-text mb-4">
                    AI is processing your Instagram content to identify patterns and opportunities.
                  </p>
                </div>
                
                <Progress value={analysisProgress} className="h-2" />
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-sm text-formaflow-muted-text mb-1">Analyzing Post Types</p>
                    <p className="font-medium">{analysisProgress >= 30 ? 'Complete' : 'In Progress...'}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-sm text-formaflow-muted-text mb-1">Engagement Patterns</p>
                    <p className="font-medium">{analysisProgress >= 60 ? 'Complete' : 'In Progress...'}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-sm text-formaflow-muted-text mb-1">Content Analysis</p>
                    <p className="font-medium">{analysisProgress >= 90 ? 'Complete' : 'In Progress...'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Followers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{instagramData.followers.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{instagramData.posts}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Avg. Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{instagramData.engagement}%</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Content Performance</CardTitle>
                    <CardDescription>Your best performing content by format</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Images</span>
                          <span className="text-sm font-medium">{instagramData.postTypes.images}%</span>
                        </div>
                        <Progress value={instagramData.postTypes.images} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Carousels</span>
                          <span className="text-sm font-medium">{instagramData.postTypes.carousels}%</span>
                        </div>
                        <Progress value={instagramData.postTypes.carousels} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Videos</span>
                          <span className="text-sm font-medium">{instagramData.postTypes.videos}%</span>
                        </div>
                        <Progress value={instagramData.postTypes.videos} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Top Performing Posts</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {instagramData.topPosts.map(post => (
                      <div key={post.id} className="aspect-square rounded-lg overflow-hidden relative group">
                        <img src={post.imageUrl} alt="Instagram post" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <div className="text-center">
                            <p className="text-sm font-bold">{post.likes} likes</p>
                            <p className="text-xs">{post.comments} comments</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
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
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="competitor1">Competitor 1 Instagram Handle</Label>
                          <Input
                            id="competitor1"
                            value={competitor1}
                            onChange={(e) => setCompetitor1(e.target.value)}
                            placeholder="e.g., zahahadid"
                            disabled={analyzingCompetitors}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="competitor2">Competitor 2 Instagram Handle</Label>
                          <Input
                            id="competitor2"
                            value={competitor2}
                            onChange={(e) => setCompetitor2(e.target.value)}
                            placeholder="e.g., fosterandpartners"
                            disabled={analyzingCompetitors}
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            onClick={handleAnalyzeCompetitors} 
                            className="btn-primary"
                            disabled={analyzingCompetitors || (!competitor1 && !competitor2)}
                          >
                            {analyzingCompetitors ? 'Analyzing...' : 'Analyze Competitors'}
                            <Search className="ml-2 w-4 h-4" />
                          </Button>
                          
                          <Button 
                            onClick={() => setShowCompetitorInput(false)} 
                            variant="outline"
                            disabled={analyzingCompetitors}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : competitorsAnalyzed.length > 0 ? (
                      <div className="space-y-6">
                        {competitorsAnalyzed.map(competitor => (
                          <div key={competitor} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-semibold">@{competitor}</h3>
                              <div className="text-sm text-gray-500">
                                {competitorsData[competitor]?.followers.toLocaleString()} followers
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <h4 className="text-sm font-medium mb-2">Content Mix</h4>
                              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                                <div className="bg-gray-50 p-2 rounded">
                                  <p className="font-bold">{competitorsData[competitor]?.postTypes.images}%</p>
                                  <p className="text-xs text-gray-500">Images</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                  <p className="font-bold">{competitorsData[competitor]?.postTypes.carousels}%</p>
                                  <p className="text-xs text-gray-500">Carousels</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                  <p className="font-bold">{competitorsData[competitor]?.postTypes.videos}%</p>
                                  <p className="text-xs text-gray-500">Videos</p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-2">Key Insights</h4>
                              <ul className="space-y-1 text-sm">
                                {competitorsData[competitor]?.insights.map((insight: string, index: number) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <div className="w-1 h-1 rounded-full bg-formaflow-purple mt-2" />
                                    <p>{insight}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
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
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5" />
            <span>Instagram Insights</span>
          </CardTitle>
          <CardDescription>
            FormaFlow analyzes your existing content to improve your new strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-formaflow-purple mt-2" />
              <p>Your audience engages most with architectural process photos rather than just final shots</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-formaflow-purple mt-2" />
              <p>Carousel posts showing the evolution of a project get 43% more saves than single images</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-formaflow-purple mt-2" />
              <p>Posts with technical details in captions receive more comments from fellow professionals</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-formaflow-purple mt-2" />
              <p>Optimal posting time based on your audience is {isConnected ? instagramData.postTiming.weekday : 'Thursday'} at {isConnected ? instagramData.postTiming.time : '7PM'}</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialAnalysis;
