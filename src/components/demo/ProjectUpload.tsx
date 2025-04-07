
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Folder, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { supabase } from '@/integrations/supabase/client';
import ProjectDetails from './ProjectDetails';
import PhaseSelector from './project/PhaseSelector';
import FileUploader from './project/FileUploader';
import ProjectTimeline from './project/ProjectTimeline';
import { saveProjectData, saveProjectFile } from '@/services/supabase-service';
import { Pencil, ImageIcon, LayoutPanelLeft, Construction, Camera } from 'lucide-react';
import { Studio, Project } from '@/types/supabase';

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
  file?: File; // Original file object for upload
}

const ProjectUpload: React.FC<ProjectUploadProps> = ({ studioName, onComplete }) => {
  const [projectName, setProjectName] = useState('Urban Loft Conversion');
  const [currentPhase, setCurrentPhase] = useState<ProjectPhase>('concept');
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [location, setLocation] = useState('');
  const [client, setClient] = useState('');
  const [concept, setConcept] = useState('');
  const [stage, setStage] = useState('concept');
  const [materials, setMaterials] = useState('');
  const [docName, setDocName] = useState<string | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [studioId, setStudioId] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Get the studio ID when the component mounts
  useEffect(() => {
    const getStudioId = async () => {
      try {
        const { data, error } = await supabase
          .from('studios')
          .select('id')
          .eq('name', studioName)
          .single();
        
        if (data) {
          setStudioId((data as Studio).id);
        } else if (error) {
          console.error("Error fetching studio:", error);
          toast({
            title: "Error",
            description: "Could not find the studio information",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error in getStudioId:", error);
      }
    };
    
    if (studioName) {
      getStudioId();
    }
  }, [studioName, toast]);

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
        url: URL.createObjectURL(file),
        file: file // Store the original file
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
      
      toast({
        title: "Files uploaded",
        description: `${newFiles.length} files added to ${phases.find(p => p.id === currentPhase)?.name} phase`
      });
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDocName(file.name);
      setDocFile(file);
    }
  };

  const getFilesForPhase = (phase: ProjectPhase) => {
    return files.filter(file => file.phase === phase);
  };

  const handleSaveProjectDetails = async () => {
    if (!studioId) {
      toast({
        title: "Error",
        description: "Studio information is missing",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Save project details to Supabase
      const projectData = await saveProjectData(studioId, {
        name: projectName,
        location,
        client,
        concept,
        stage,
        materials
      });
      
      if (projectData) {
        setProjectId(projectData.id);
        
        // Upload document if exists
        if (docFile) {
          const fileExt = docFile.name.split('.').pop();
          const fileName = `${projectData.id}/document.${fileExt}`;
          
          await supabase.storage
            .from('project-files')
            .upload(fileName, docFile);
        }
        
        setShowDetails(false);
        toast({
          title: "Project details saved",
          description: "Your project information has been updated"
        });
      }
    } catch (error) {
      console.error("Error saving project details:", error);
      toast({
        title: "Error",
        description: "Failed to save project details",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleContinue = async () => {
    if (files.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one file to continue",
        variant: "destructive"
      });
      return;
    }
    
    // If project details haven't been saved yet, save them
    if (!projectId && studioId) {
      try {
        const projectData = await saveProjectData(studioId, {
          name: projectName,
          location,
          client,
          concept,
          stage,
          materials
        });
        
        if (projectData) {
          setProjectId(projectData.id);
          
          // Upload the project files
          await uploadProjectFiles(projectData.id);
          
          onComplete();
        }
      } catch (error) {
        console.error("Error saving project:", error);
        toast({
          title: "Error",
          description: "Failed to save project",
          variant: "destructive"
        });
      }
    } else if (projectId) {
      // If project already exists, just upload any new files
      await uploadProjectFiles(projectId);
      onComplete();
    }
  };

  const uploadProjectFiles = async (projectId: string) => {
    const filesToUpload = files.filter(file => file.file); // Only upload files that have the original File object
    
    if (filesToUpload.length === 0) return;
    
    setIsSaving(true);
    toast({
      title: "Uploading files",
      description: "Your project files are being uploaded"
    });
    
    try {
      for (const fileData of filesToUpload) {
        if (fileData.file) {
          await saveProjectFile(projectId, fileData.file, fileData.phase);
        }
      }
      
      // Clear the file.file property since they've been uploaded
      setFiles(prev => prev.map(file => ({
        ...file,
        file: undefined
      })));
      
      toast({
        title: "Files uploaded",
        description: "All project files have been uploaded successfully"
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      toast({
        title: "Error",
        description: "Failed to upload some files",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
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
        
        <Collapsible open={showDetails} onOpenChange={setShowDetails} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{projectName}</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Info className="w-4 h-4" />
                <span>{showDetails ? "Hide Details" : "Project Details"}</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm mt-4">
            <ProjectDetails 
              projectName={projectName} 
              setProjectName={setProjectName}
              location={location}
              setLocation={setLocation}
              client={client}
              setClient={setClient}
              concept={concept}
              setConcept={setConcept}
              stage={stage}
              setStage={setStage}
              materials={materials}
              setMaterials={setMaterials}
              docName={docName}
              handleDocumentUpload={handleDocumentUpload}
              onSave={handleSaveProjectDetails}
              isSaving={isSaving}
            />
          </CollapsibleContent>
        </Collapsible>
          
        <div className="mb-8">
          <PhaseSelector 
            currentPhase={currentPhase}
            phases={phases}
            filesCount={(phaseId) => getFilesForPhase(phaseId as ProjectPhase).length}
            onChange={(phaseId) => setCurrentPhase(phaseId as ProjectPhase)}
          />
        </div>
        
        <div className="mb-8">
          <FileUploader 
            files={getFilesForPhase(currentPhase)}
            currentPhase={currentPhase}
            onFileChange={handleFileChange}
          />
        </div>
        
        <Button 
          onClick={handleContinue} 
          className="btn-primary w-full"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Continue to Social Analysis"}
          {!isSaving && <ArrowRight className="ml-2 w-4 h-4" />}
        </Button>
      </div>
      
      <ProjectTimeline 
        phases={phases}
        currentPhase={currentPhase}
        getFilesForPhase={(phaseId) => getFilesForPhase(phaseId as ProjectPhase)}
      />
    </div>
  );
};

export default ProjectUpload;
