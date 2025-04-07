
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectTimelineProps {
  phases: {
    id: string;
    name: string;
    icon: React.ReactNode;
  }[];
  currentPhase: string;
  getFilesForPhase: (phaseId: string) => any[];
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ 
  phases, 
  currentPhase, 
  getFilesForPhase 
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Project Timeline Progress</CardTitle>
        <CardDescription>Your project will be analyzed for a complete narrative</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {phases.map((phase, index) => {
            const fileCount = getFilesForPhase(phase.id).length;
            const isActive = currentPhase === phase.id;
            
            return (
              <div key={phase.id} className="relative">
                <div className="flex items-start space-x-3">
                  {/* Timeline connector */}
                  {index < phases.length - 1 && (
                    <div className="absolute top-6 left-[1.15rem] h-full w-0.5 bg-gray-200" />
                  )}
                  
                  {/* Timeline node */}
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      fileCount > 0 
                        ? "bg-green-100 text-green-600" 
                        : isActive
                          ? "border-2 border-formaflow-purple bg-formaflow-purple/10"
                          : "border-2 border-gray-200 bg-white"
                    }`}
                  >
                    {fileCount > 0 ? (
                      <span className="text-xs font-bold">{fileCount}</span>
                    ) : (
                      phase.icon
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="transition-opacity duration-300">
                    <p className="font-medium text-formaflow-graphite">{phase.name}</p>
                    <p className="text-sm text-formaflow-muted-text">
                      {fileCount > 0 
                        ? `${fileCount} files uploaded` 
                        : "No files yet"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTimeline;
