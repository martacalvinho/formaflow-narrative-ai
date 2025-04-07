
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Instagram, Search, Link, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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

const SocialAnalysis: React.FC<SocialAnalysisProps> = ({ onComplete }) => {
  const [instagramUsername, setInstagramUsername] = useState('martacalvinho');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [instagramData, setInstagramData] = useState(mockInstagramData);

  const handleConnectInstagram = () => {
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
            }, 500);
            return 100;
          }
          return newProgress;
        });
      }, 300);
    }, 1500);
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
