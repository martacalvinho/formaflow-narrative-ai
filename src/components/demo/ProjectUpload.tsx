
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Plus, 
  Folder, 
  Image as ImageIcon, 
  Pencil, 
  LayoutPanelLeft, 
  Construction, 
  Camera 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectUploadProps {
  studioName: string;
  onComplete: () => void;
}

type ProjectPhase = 'concept' | 'inspiration' | 'sketches' | 'drawings' | 'construction' | 'final';

interface ProjectFile {
  id: string;
  name: string;
  phase: ProjectPhase;
  url: string;
}

const ProjectUpload: React.FC<ProjectUploadProps> = ({ studioName, onComplete }) => {
  const [projectName, setProjectName] = useState('Urban Loft Conversion');
  const [currentPhase, setCurrentPhase] = useState<ProjectPhase>('concept');
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const { toast } = useToast();

  const phases = [
    { id: 'concept', name: 'Concept', icon: <Pencil className="w-5 h-5" /> },
    { id: 'inspiration', name: 'Inspiration', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'sketches', name: 'Sketches', icon: <Pencil className="w-5 h-5" /> },
    { id: 'drawings', name: 'Design Drawings', icon: <LayoutPanelLeft className="w-5 h-5" /> },
    { id: 'construction', name: 'Construction', icon: <Construction className="w-5 h-5" /> },
    { id: 'final', name: 'Final Photography', icon: <Camera className="w-5 h-5" /> },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        phase: currentPhase,
        url: URL.createObjectURL(file)
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
      
      toast({
        title: "Files uploaded",
        description: `${newFiles.length} files added to ${phases.find(p => p.id === currentPhase)?.name} phase`
      });
    }
  };

  const getFilesForPhase = (phase: ProjectPhase) => {
    return files.filter(file => file.phase === phase);
  };

  const handleContinue = () => {
    if (files.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one file to continue",
        variant: "destructive"
      });
      return;
    }
    
    onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-8 rounded-2xl mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Folder className="w-8 h-8 text-formaflow-purple" />
          <div>
            <h2 className="text-2xl font-bold">Project Upload</h2>
            <p className="text-formaflow-muted-text">Studio: {studioName}</p>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{projectName}</h3>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Pencil className="w-3 h-3" />
              <span>Edit</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {phases.map((phase) => (
              <Button
                key={phase.id}
                variant="outline"
                className={`flex flex-col items-center justify-center h-24 gap-2 p-2 ${currentPhase === phase.id ? 'border-formaflow-purple bg-formaflow-purple/5 text-formaflow-purple' : ''}`}
                onClick={() => setCurrentPhase(phase.id as ProjectPhase)}
              >
                <div className={`rounded-full p-1 ${currentPhase === phase.id ? 'bg-formaflow-purple/10' : 'bg-gray-100'}`}>
                  {phase.icon}
                </div>
                <span className="text-xs">{phase.name}</span>
                <span className="text-xs text-gray-500">
                  {getFilesForPhase(phase.id as ProjectPhase).length} files
                </span>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {phases.find(p => p.id === currentPhase)?.name} Files
            </h3>
            <label htmlFor="file-upload" className="btn-secondary flex items-center gap-2 cursor-pointer text-sm py-2">
              <Plus className="w-4 h-4" />
              <span>Add Files</span>
              <input 
                type="file" 
                id="file-upload" 
                multiple 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {getFilesForPhase(currentPhase).length > 0 ? (
              getFilesForPhase(currentPhase).map(file => (
                <div key={file.id} className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50 relative group">
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs truncate">{file.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full h-40 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
                <p className="text-sm text-gray-500">No files in this phase yet</p>
                <label htmlFor="empty-upload" className="text-formaflow-purple text-sm mt-2 cursor-pointer">
                  Upload Files
                  <input 
                    type="file" 
                    id="empty-upload" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
        
        <Button onClick={handleContinue} className="btn-primary w-full">
          Continue to Social Analysis
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Project Timeline Progress</CardTitle>
          <CardDescription>Your project will be analyzed for a complete narrative</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {phases.map((phase, index) => {
              const fileCount = getFilesForPhase(phase.id as ProjectPhase).length;
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
                    <div className={`transition-opacity duration-300`}>
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
    </div>
  );
};

export default ProjectUpload;
