
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ContentPerformanceProps {
  postTypes: {
    images: number;
    carousels: number;
    videos: number;
  };
}

const ContentPerformance: React.FC<ContentPerformanceProps> = ({ postTypes }) => {
  return (
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
              <span className="text-sm font-medium">{postTypes.images}%</span>
            </div>
            <Progress value={postTypes.images} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Carousels</span>
              <span className="text-sm font-medium">{postTypes.carousels}%</span>
            </div>
            <Progress value={postTypes.carousels} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Videos</span>
              <span className="text-sm font-medium">{postTypes.videos}%</span>
            </div>
            <Progress value={postTypes.videos} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentPerformance;
