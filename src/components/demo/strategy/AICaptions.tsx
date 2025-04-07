
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Instagram } from 'lucide-react';

interface CaptionItem {
  image: string;
  caption: string;
  phase: string;
}

interface AICaptionsProps {
  captions: CaptionItem[];
  onCopyCaption: (caption: string) => void;
}

const AICaptions: React.FC<AICaptionsProps> = ({ captions, onCopyCaption }) => {
  return (
    <div className="space-y-4">
      {captions.map((item, index) => (
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
                <Button variant="ghost" size="sm" onClick={() => onCopyCaption(item.caption)}>
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
          <Copy className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AICaptions;
