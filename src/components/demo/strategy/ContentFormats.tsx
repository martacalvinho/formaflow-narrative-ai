
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutGrid, ImageIcon, Film, Check } from 'lucide-react';

interface ContentFormatsProps {
  formats: {
    carousels: number;
    images: number;
    videos: number;
  };
  themes: string[];
}

const ContentFormats: React.FC<ContentFormatsProps> = ({ formats, themes }) => {
  return (
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
              <p className="text-xl font-bold">{formats.carousels}%</p>
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
              <p className="text-xl font-bold">{formats.images}%</p>
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
              <p className="text-xl font-bold">{formats.videos}%</p>
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
            {themes.map((theme, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{theme}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentFormats;
