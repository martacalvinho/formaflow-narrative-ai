
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Pencil, ImageIcon, LayoutPanelLeft, Construction, Camera } from 'lucide-react';
import ProjectDetails from './ProjectDetails';
import PhaseSelector from './project/PhaseSelector';
import FileUploader from './project/FileUploader';
import ProjectTimeline from './project/ProjectTimeline';
import { 
  saveProjectData, 
  getDemoPin, 
  getStudioByDemoPin, 
  getProjectByStudioIdAndDemoPin 
} from '@/services/supabase-service';
import { useProjectUpload, ProjectPhase } from '@/hooks/use-project-upload';
import ProjectHeader from './project/ProjectHeader';
import ProjectContinueButton from './project/ProjectContinueButton';

interface ProjectUploadProps {
  studioName: string;
  onComplete: () => void;
}

const ProjectUpload: React.FC<ProjectUploadProps> = ({ studioName, onComplete }) => {
  const { toast } = useToast();
  const [demoPin, setDemoPin] = useState<string>('');
  
  const {
    projectName,
    setProjectName,
    currentPhase,
    setCurrentPhase,
    showDetails,
    setShowDetails,
    location,
    setLocation,
    client,
    setClient,
    concept,
    setConcept,
    stage,
    setStage,
    materials,
    setMaterials,
    projectType,
    setProjectType,
    docName,
    handleDocumentUpload,
    studioId,
    projectId,
    isSaving,
    setIsSaving,
    getFilesForPhase,
    handleFileChange,
    handleSaveProjectDetails,
    uploadProjectFiles
  } = useProjectUpload(studioName);

  // Initialize demo PIN
  useEffect(() => {
    const pin = getDemoPin();
    setDemoPin(pin);
    
    // Log for debugging
    console.log(`Demo PIN: ${pin}, Studio Name: ${studioName}`);
    
    // Try to load existing project data for this demo session
    const loadExistingData = async () => {
      try {
        const studio = await getStudioByDemoPin(pin);
        
        if (studio && studio.id) {
          console.log(`Found studio with ID: ${studio.id} for PIN: ${pin}`);
          
          const project = await getProjectByStudioIdAndDemoPin(studio.id, pin);
          
          if (project) {
            // Populate form with existing project data
            setProjectName(project.name);
            setLocation(project.location || '');
            setClient(project.client || '');
            setConcept(project.concept || '');
            setStage(project.stage);
            setMaterials(project.materials || '');
            setProjectType(project.project_type || 'residential');
            
            toast({
              title: "Project data loaded",
              description: `Loaded existing project: ${project.name}`,
            });
          }
        }
      } catch (error) {
        console.error("Error loading existing project data:", error);
      }
    };
    
    loadExistingData();
  }, [studioName, setProjectName, setLocation, setClient, setConcept, setStage, setMaterials, setProjectType, toast]);

  const phases = [
    { id: 'concept', name: 'Concept', icon: <Pencil className="w-5 h-5" /> },
    { id: 'inspiration', name: 'Inspiration', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'sketches', name: 'Sketches / Renders', icon: <Pencil className="w-5 h-5" /> },
    { id: 'drawings', name: 'Design Drawings', icon: <LayoutPanelLeft className="w-5 h-5" /> },
    { id: 'construction', name: 'Construction', icon: <Construction className="w-5 h-5" /> },
    { id: 'final', name: 'Final Photography', icon: <Camera className="w-5 h-5" /> },
  ];

  const handleContinue = async () => {
    const filesForAnyPhase = phases.some(phase => 
      getFilesForPhase(phase.id as ProjectPhase).length > 0
    );
    
    if (!filesForAnyPhase) {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one file to continue. You can add up to 10 files per phase.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Ensure we have the current demo PIN
      const currentPin = getDemoPin();
      console.log(`Using demo PIN for save: ${currentPin}`);
      
      // If project details haven't been saved yet, save them
      if (!projectId && studioId) {
        console.log(`Saving project with studio ID: ${studioId}`);
        
        const projectData = await saveProjectData(studioId, {
          name: projectName,
          location,
          client,
          concept,
          stage, 
          materials,
          project_type: projectType
        });
        
        if (projectData) {
          console.log(`Project saved with ID: ${projectData.id}`);
          
          // Upload the project files
          await uploadProjectFiles(projectData.id);
        }
      } else if (projectId) {
        console.log(`Using existing project ID: ${projectId}`);
        
        // If project already exists, just upload any new files
        await uploadProjectFiles(projectId);
      }
      
      toast({
        title: "Project saved successfully",
        description: "Your project data has been saved for this demo session.",
      });
      
      // Only call onComplete after all operations are successful
      onComplete();
    } catch (error: any) {
      console.error("Error saving project:", error);
      toast({
        title: "Error",
        description: "Failed to save project: " + error.message,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-8 rounded-2xl mb-8">
        {demoPin && (
          <div className="mb-4 text-center">
            <span className="text-sm bg-formaflow-purple/10 text-formaflow-purple font-medium px-3 py-1 rounded-full">
              Demo PIN: {demoPin}
            </span>
          </div>
        )}
        
        <Collapsible open={showDetails} onOpenChange={setShowDetails} className="mb-8">
          <ProjectHeader 
            studioName={studioName}
            projectName={projectName}
            showDetails={showDetails}
            setShowDetails={setShowDetails}
          />
          
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
              projectType={projectType}
              setProjectType={setProjectType}
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
            maxFiles={10}
            remainingFiles={10 - getFilesForPhase(currentPhase).length}
          />
        </div>
        
        <ProjectContinueButton 
          onContinue={handleContinue} 
          isSaving={isSaving}
          demoPin={demoPin}
        />
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
