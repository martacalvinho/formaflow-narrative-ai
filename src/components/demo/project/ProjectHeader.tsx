
import React from 'react';
import { Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ProjectHeaderProps {
  studioName: string;
  projectName: string;
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  studioName,
  projectName,
  showDetails,
  setShowDetails
}) => {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Folder className="w-8 h-8 text-formaflow-purple" />
        <div>
          <h2 className="text-2xl font-bold">Project Upload</h2>
          <p className="text-formaflow-muted-text">Studio: {studioName}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{projectName}</h3>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1 border-formaflow-purple text-formaflow-purple hover:bg-formaflow-purple/10">
            <Edit className="w-4 h-4" />
            <span>{showDetails ? "Hide Details" : "Add Project Details"}</span>
          </Button>
        </CollapsibleTrigger>
      </div>
    </>
  );
};

export default ProjectHeader;
