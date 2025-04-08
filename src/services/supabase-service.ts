
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { Studio, Project, ProjectFile, InstagramAccount, Competitor, ContentStrategy } from "@/types/supabase";

// Studio Services
export const saveStudioData = async (studioData: {
  name: string;
  website?: string;
  style: string;
  logo?: File;
}) => {
  try {
    // Upload logo if provided
    let logoUrl = null;
    if (studioData.logo) {
      const fileExt = studioData.logo.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('studio-logos')
        .upload(fileName, studioData.logo);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('studio-logos')
        .getPublicUrl(fileName);
      
      logoUrl = publicUrl;
    }
    
    // Check if studio already exists by name
    const { data: existingStudios, error: queryError } = await supabase
      .from('studios')
      .select('*')
      .eq('name', studioData.name);
    
    if (queryError) throw queryError;
    
    if (existingStudios && existingStudios.length > 0) {
      // Update existing studio
      const { data, error } = await supabase
        .from('studios')
        .update({
          website: studioData.website || existingStudios[0].website,
          style: studioData.style || existingStudios[0].style,
          logo_url: logoUrl || existingStudios[0].logo_url
        })
        .eq('id', existingStudios[0].id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Studio;
    } else {
      // Create new studio
      const { data, error } = await supabase
        .from('studios')
        .insert({
          name: studioData.name,
          website: studioData.website || null,
          style: studioData.style,
          logo_url: logoUrl
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as Studio;
    }
  } catch (error) {
    console.error("Error saving studio data:", error);
    throw error;
  }
};

// Project Services
export const saveProjectData = async (
  studioId: string,
  projectData: {
    name: string;
    location?: string;
    client?: string;
    concept?: string;
    stage: string;
    materials?: string;
    project_type?: string;
  }
) => {
  try {
    // Check if a project with this name already exists for this studio
    const { data: existingProjects, error: queryError } = await supabase
      .from('projects')
      .select('*')
      .eq('studio_id', studioId)
      .eq('name', projectData.name);
    
    if (queryError) {
      console.error("Error checking for existing project:", queryError);
      throw queryError;
    }
    
    if (existingProjects && existingProjects.length > 0) {
      // Update existing project
      const { data, error } = await supabase
        .from('projects')
        .update({
          location: projectData.location || existingProjects[0].location,
          client: projectData.client || existingProjects[0].client,
          concept: projectData.concept || existingProjects[0].concept,
          stage: projectData.stage,
          materials: projectData.materials || existingProjects[0].materials,
          project_type: projectData.project_type || existingProjects[0].project_type || 'residential'
        })
        .eq('id', existingProjects[0].id)
        .select()
        .single();
      
      if (error) {
        console.error("Error updating project:", error);
        throw error;
      }
      
      return data as Project;
    } else {
      // Create new project
      const { data, error } = await supabase
        .from('projects')
        .insert({
          studio_id: studioId,
          name: projectData.name,
          location: projectData.location || null,
          client: projectData.client || null,
          concept: projectData.concept || null,
          stage: projectData.stage,
          materials: projectData.materials || null,
          project_type: projectData.project_type || 'residential'
        })
        .select()
        .single();
      
      if (error) {
        console.error("Error creating project:", error);
        throw error;
      }
      
      return data as Project;
    }
  } catch (error) {
    console.error("Error saving project data:", error);
    throw error;
  }
};

// Project Files Services
export const saveProjectFile = async (
  projectId: string,
  file: File,
  phase: string
) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('project-files')
      .upload(`${projectId}/${fileName}`, file);
    
    if (uploadError) throw uploadError;
    
    const { data: { publicUrl } } = supabase.storage
      .from('project-files')
      .getPublicUrl(`${projectId}/${fileName}`);
    
    const { data, error } = await supabase
      .from('project_files')
      .insert({
        project_id: projectId,
        file_name: file.name,
        file_url: publicUrl,
        phase: phase
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as ProjectFile;
  } catch (error) {
    console.error("Error saving project file:", error);
    throw error;
  }
};

// Instagram Services
export const saveInstagramData = async (
  username: string,
  instagramData: {
    followers: number;
    posts: number;
    engagement: number;
    topPosts: any[];
    postTypes: any;
    postTiming: any;
  }
) => {
  try {
    const { data, error } = await supabase
      .from('instagram_accounts')
      .insert({
        username,
        followers: instagramData.followers,
        posts: instagramData.posts,
        engagement: instagramData.engagement,
        top_posts: instagramData.topPosts,
        post_types: instagramData.postTypes,
        post_timing: instagramData.postTiming
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as InstagramAccount;
  } catch (error) {
    console.error("Error saving Instagram data:", error);
    throw error;
  }
};

// Competitors Services
export const saveCompetitorAnalysis = async (
  instagramAccountId: string,
  competitorUsername: string,
  insights: any
) => {
  try {
    const { data, error } = await supabase
      .from('competitors')
      .insert({
        instagram_account_id: instagramAccountId,
        competitor_username: competitorUsername,
        insights
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Competitor;
  } catch (error) {
    console.error("Error saving competitor analysis:", error);
    throw error;
  }
};

// Content Strategy Services
export const saveContentStrategy = async (
  projectId: string,
  instagramAccountId: string | null,
  strategy: {
    calendar: any;
    captions: any;
    formats: any;
    themes: any;
  }
) => {
  try {
    const { data, error } = await supabase
      .from('content_strategies')
      .insert({
        project_id: projectId,
        instagram_account_id: instagramAccountId,
        calendar: strategy.calendar,
        captions: strategy.captions,
        formats: strategy.formats,
        themes: strategy.themes
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as ContentStrategy;
  } catch (error) {
    console.error("Error saving content strategy:", error);
    throw error;
  }
};
