
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InstagramStatsProps {
  followers: number;
  posts: number;
  engagement: number;
}

const InstagramStats: React.FC<InstagramStatsProps> = ({ followers, posts, engagement }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Followers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{followers.toLocaleString()}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{posts}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Avg. Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{engagement}%</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstagramStats;
