
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface CompetitorInputProps {
  competitor1: string;
  competitor2: string;
  onCompetitor1Change: (value: string) => void;
  onCompetitor2Change: (value: string) => void;
  analyzingCompetitors: boolean;
  onAnalyze: () => void;
  onCancel: () => void;
}

const CompetitorInput: React.FC<CompetitorInputProps> = ({
  competitor1,
  competitor2,
  onCompetitor1Change,
  onCompetitor2Change,
  analyzingCompetitors,
  onAnalyze,
  onCancel
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="competitor1">Competitor 1 Instagram Handle</Label>
        <Input
          id="competitor1"
          value={competitor1}
          onChange={(e) => onCompetitor1Change(e.target.value)}
          placeholder="e.g., zahahadid"
          disabled={analyzingCompetitors}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="competitor2">Competitor 2 Instagram Handle</Label>
        <Input
          id="competitor2"
          value={competitor2}
          onChange={(e) => onCompetitor2Change(e.target.value)}
          placeholder="e.g., fosterandpartners"
          disabled={analyzingCompetitors}
        />
      </div>
      
      <div className="flex gap-2">
        <Button 
          onClick={onAnalyze} 
          className="btn-primary"
          disabled={analyzingCompetitors || (!competitor1 && !competitor2)}
        >
          {analyzingCompetitors ? 'Analyzing...' : 'Analyze Competitors'}
          <Search className="ml-2 w-4 h-4" />
        </Button>
        
        <Button 
          onClick={onCancel} 
          variant="outline"
          disabled={analyzingCompetitors}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CompetitorInput;
