
import React from 'react';
import { Brain, Sparkles, Calendar, LayoutGrid } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface StrategyGeneratorProps {
  progress: number;
}

const StrategyGenerator: React.FC<StrategyGeneratorProps> = ({ progress }) => {
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
        
        <Progress value={progress} className="h-2 mb-8" />
        
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
};

export default StrategyGenerator;
