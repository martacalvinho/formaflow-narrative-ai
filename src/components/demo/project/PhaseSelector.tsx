
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Pencil, 
  Image as ImageIcon, 
  LayoutPanelLeft, 
  Construction, 
  Camera
} from 'lucide-react';

interface PhaseSelectorProps {
  currentPhase: string;
  phases: {
    id: string;
    name: string;
    icon: React.ReactNode;
  }[];
  filesCount: (phaseId: string) => number;
  onChange: (phaseId: string) => void;
}

const PhaseSelector: React.FC<PhaseSelectorProps> = ({ 
  currentPhase, 
  phases, 
  filesCount, 
  onChange 
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
      {phases.map((phase) => (
        <Button
          key={phase.id}
          variant="outline"
          className={`flex flex-col items-center justify-center h-24 gap-2 p-2 ${
            currentPhase === phase.id 
              ? 'border-formaflow-purple bg-formaflow-purple/5 text-formaflow-purple' 
              : ''
          }`}
          onClick={() => onChange(phase.id)}
        >
          <div className={`rounded-full p-1 ${
            currentPhase === phase.id 
              ? 'bg-formaflow-purple/10' 
              : 'bg-gray-100'
          }`}>
            {phase.icon}
          </div>
          <span className="text-xs">{phase.name}</span>
          <span className="text-xs text-gray-500">
            {filesCount(phase.id)} files
          </span>
        </Button>
      ))}
    </div>
  );
};

export default PhaseSelector;
