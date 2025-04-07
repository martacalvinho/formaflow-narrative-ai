
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Instagram, Link } from 'lucide-react';

interface InstagramConnectorProps {
  instagramUsername: string;
  onUsernameChange: (username: string) => void;
  isConnecting: boolean;
  onConnect: () => void;
}

const InstagramConnector: React.FC<InstagramConnectorProps> = ({
  instagramUsername,
  onUsernameChange,
  isConnecting,
  onConnect
}) => {
  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <Input
          value={instagramUsername}
          onChange={(e) => onUsernameChange(e.target.value)}
          placeholder="Your Instagram handle"
          className="flex-1"
          disabled={isConnecting}
        />
        <Button 
          onClick={onConnect} 
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
  );
};

export default InstagramConnector;
