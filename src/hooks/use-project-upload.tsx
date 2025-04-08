
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Studio, Project } from '@/types/supabase';
import { saveProjectData } from '@/services/supabase-service';

export type ProjectPhase = 'concept' | 'inspiration' | 'sketches' | 'drawings' | 'construction' | 'final';

export interface ProjectFile {
  id: string;
  name: string;
  phase: ProjectPhase;
  url: string;
  file?: File; // Original file object for upload
}

export function useProjectUpload(studioName: string) {
  const [projectName, setProjectName] = useState('Urban Loft Conversion');
  const [currentPhase, setCurrentPhase] = useState<ProjectPhase>('concept');
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [location, setLocation] = useState('');
  const [client, setClient] = useState('');
  const [concept, setConcept] = useState('');
  const [stage, setStage] = useState('concept');
  const [materials, setMaterials] = useState('');
  const [projectType, setProjectType] = useState('residential');
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
        // Create a demo studio if one doesn't exist with this name
        const { data: existingStudios, error: queryError } = await supabase
          .from('studios')
          .select('id')
          .eq('name', studioName);
        
        if (queryError) {
          console.error("Error fetching studio:", queryError);
          throw queryError;
        }
        
        if (existingStudios && existingStudios.length > 0) {
          setStudioId(existingStudios[0].id);
        } else {
          // No studio found, create a demo one
          const { data: newStudio, error: insertError } = await supabase
            .from('studios')
            .insert({
              name: studioName,
              style: 'minimalist',
              website: 'https://example.com'
            })
            .select()
            .single();
          
          if (insertError) {
            console.error("Error creating studio:", insertError);
            throw insertError;
          }
          
          if (newStudio) {
            setStudioId(newStudio.id);
          }
        }
      } catch (error) {
        console.error("Error in getStudioId:", error);
        toast({
          title: "Error",
          description: "Could not find or create the studio information. Please try again.",
          variant: "destructive"
        });
      }
    };
    
    if (studioName) {
      getStudioId();
    }
  }, [studioName, toast]);

  const getFilesForPhase = (phase: ProjectPhase) => {
    return files.filter(file => file.phase === phase);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Get current files for this phase
      const currentPhaseFiles = files.filter(file => file.phase === currentPhase);
      
      // Check if adding more files would exceed the limit
      if (currentPhaseFiles.length >= 10) {
        toast({
          title: "Upload limit reached",
          description: `You can only upload a maximum of 10 images per phase.`,
          variant: "destructive"
        });
        return;
      }
      
      // Calculate how many more files we can add
      const remainingSlots = 10 - currentPhaseFiles.length;
      const filesToAdd = Array.from(e.target.files).slice(0, remainingSlots);
      
      if (filesToAdd.length === 0) return;
      
      const newFiles = filesToAdd.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        phase: currentPhase,
        url: URL.createObjectURL(file),
        file: file // Store the original file
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
      
      toast({
        title: "Files uploaded",
        description: `${newFiles.length} files added to ${currentPhase} phase`
      });
      
      // Warn if some files were not added due to the limit
      if (filesToAdd.length < e.target.files.length) {
        toast({
          title: "Upload limit reached",
          description: `${e.target.files.length - filesToAdd.length} files were not added due to the 10 image limit per phase.`,
          variant: "default"
        });
      }
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDocName(file.name);
      setDocFile(file);
    }
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
        materials,
        project_type: projectType
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
    } catch (error: any) {
      console.error("Error saving project details:", error);
      toast({
        title: "Error",
        description: "Failed to save project details: " + error.message,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const uploadProjectFiles = async (projectId: string) => {
    const filesToUpload = files.filter(file => file.file); // Only upload files that have the original File object
    
    if (filesToUpload.length === 0) return;
    
    toast({
      title: "Uploading files",
      description: "Your project files are being uploaded"
    });
    
    try {
      for (const fileData of filesToUpload) {
        if (fileData.file) {
          // Create a unique filename
          const fileExt = fileData.file.name.split('.').pop();
          const fileName = `${projectId}/${fileData.phase}/${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          
          // Upload the file to Supabase storage
          const { error: uploadError } = await supabase.storage
            .from('project-files')
            .upload(fileName, fileData.file);
          
          if (uploadError) {
            console.error("Error uploading file:", uploadError);
            throw uploadError;
          }
          
          // Get the public URL
          const { data: { publicUrl } } = supabase.storage
            .from('project-files')
            .getPublicUrl(fileName);
          
          // Insert record into project_files table
          const { error: insertError } = await supabase
            .from('project_files')
            .insert({
              project_id: projectId,
              file_name: fileData.name,
              file_url: publicUrl,
              phase: fileData.phase
            });
          
          if (insertError) {
            console.error("Error inserting file record:", insertError);
            throw insertError;
          }
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
    } catch (error: any) {
      console.error("Error uploading files:", error);
      toast({
        title: "Error",
        description: "Failed to upload some files: " + error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    projectName,
    setProjectName,
    currentPhase,
    setCurrentPhase,
    files,
    setFiles,
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
    setDocName,
    docFile,
    setDocFile,
    studioId,
    projectId,
    isSaving,
    setIsSaving,
    getFilesForPhase,
    handleFileChange,
    handleDocumentUpload,
    handleSaveProjectDetails,
    uploadProjectFiles
  };
}
