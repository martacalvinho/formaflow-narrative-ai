
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

// Generate a unique demo PIN for tracking the demo session
export const generateDemoPin = (): string => {
  // Generate a 6-digit PIN
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Get the current demo PIN from localStorage or generate a new one
export const getDemoPin = (): string => {
  let pin = localStorage.getItem('formaflow_demo_pin');
  if (!pin) {
    pin = generateDemoPin();
    localStorage.setItem('formaflow_demo_pin', pin);
  }
  return pin;
};

// Studio Services
export const saveStudioData = async (studioData: {
  name: string;
  website?: string;
  style: string;
  logo?: File;
}) => {
  try {
    // Get or generate demo PIN
    const demoPin = getDemoPin();
    
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
    
    // Check if studio already exists by name AND demo PIN
    const { data: existingStudiosPin, error: queryErrorPin } = await supabase
      .from('studios')
      .select('*')
      .eq('name', studioData.name)
      .eq('demo_pin', demoPin);
    
    // If not found by PIN, check just by name (backward compatibility)
    const { data: existingStudios, error: queryError } = await supabase
      .from('studios')
      .select('*')
      .eq('name', studioData.name);
    
    if (queryErrorPin) throw queryErrorPin;
    
    // Prioritize finding by PIN
    const existingStudio = existingStudiosPin && existingStudiosPin.length > 0 
      ? existingStudiosPin[0] 
      : existingStudios && existingStudios.length > 0 ? existingStudios[0] : null;
    
    if (existingStudio) {
      // Update existing studio
      const { data, error } = await supabase
        .from('studios')
        .update({
          website: studioData.website || existingStudio.website,
          style: studioData.style || existingStudio.style,
          logo_url: logoUrl || existingStudio.logo_url,
          demo_pin: demoPin // Ensure the demo_pin is set
        })
        .eq('id', existingStudio.id)
        .select();
      
      if (error) throw error;
      return data[0];
    } else {
      // Create new studio
      const { data, error } = await supabase
        .from('studios')
        .insert({
          name: studioData.name,
          website: studioData.website || null,
          style: studioData.style,
          logo_url: logoUrl,
          demo_pin: demoPin // Set the demo_pin
        })
        .select();
      
      if (error) throw error;
      return data[0];
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
    // Get current demo PIN
    const demoPin = getDemoPin();
    
    // Check if a project with this name already exists for this studio and demo PIN
    const { data: existingPinProjects, error: pinQueryError } = await supabase
      .from('projects')
      .select('*')
      .eq('studio_id', studioId)
      .eq('name', projectData.name)
      .eq('demo_pin', demoPin);
    
    // If not found by PIN, fallback to just name and studio_id (backward compatibility)
    const { data: existingProjects, error: queryError } = await supabase
      .from('projects')
      .select('*')
      .eq('studio_id', studioId)
      .eq('name', projectData.name);
    
    if (pinQueryError) {
      console.error("Error checking for existing project by PIN:", pinQueryError);
      throw pinQueryError;
    }
    
    // Prioritize finding by PIN
    const existingProject = existingPinProjects && existingPinProjects.length > 0 
      ? existingPinProjects[0] 
      : existingProjects && existingProjects.length > 0 ? existingProjects[0] : null;
    
    if (existingProject) {
      // Update existing project
      const { data, error } = await supabase
        .from('projects')
        .update({
          location: projectData.location || existingProject.location,
          client: projectData.client || existingProject.client,
          concept: projectData.concept || existingProject.concept,
          stage: projectData.stage,
          materials: projectData.materials || existingProject.materials,
          project_type: projectData.project_type || existingProject.project_type || 'residential',
          demo_pin: demoPin // Ensure the demo_pin is set
        })
        .eq('id', existingProject.id)
        .select();
      
      if (error) {
        console.error("Error updating project:", error);
        throw error;
      }
      
      return data[0];
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
          project_type: projectData.project_type || 'residential',
          demo_pin: demoPin // Set the demo_pin
        })
        .select();
      
      if (error) {
        console.error("Error creating project:", error);
        throw error;
      }
      
      return data[0];
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
    
    // Get the current demo PIN
    const demoPin = getDemoPin();
    
    const { data, error } = await supabase
      .from('project_files')
      .insert({
        project_id: projectId,
        file_name: file.name,
        file_url: publicUrl,
        phase: phase
      })
      .select();
    
    if (error) throw error;
    return data[0];
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
    // Get the current demo PIN
    const demoPin = getDemoPin();
    
    // Check if account already exists for this demo session
    const { data: existingAccounts, error: queryError } = await supabase
      .from('instagram_accounts')
      .select('*')
      .eq('username', username)
      .eq('demo_pin', demoPin);
    
    if (queryError) throw queryError;
    
    if (existingAccounts && existingAccounts.length > 0) {
      // Update existing account
      const { data, error } = await supabase
        .from('instagram_accounts')
        .update({
          followers: instagramData.followers,
          posts: instagramData.posts,
          engagement: instagramData.engagement,
          top_posts: instagramData.topPosts,
          post_types: instagramData.postTypes,
          post_timing: instagramData.postTiming,
          demo_pin: demoPin
        })
        .eq('id', existingAccounts[0].id)
        .select();
      
      if (error) throw error;
      return data[0];
    } else {
      // Create new account
      const { data, error } = await supabase
        .from('instagram_accounts')
        .insert({
          username,
          followers: instagramData.followers,
          posts: instagramData.posts,
          engagement: instagramData.engagement,
          top_posts: instagramData.topPosts,
          post_types: instagramData.postTypes,
          post_timing: instagramData.postTiming,
          demo_pin: demoPin // Set the demo_pin
        })
        .select();
      
      if (error) throw error;
      return data[0];
    }
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
    // Check if competitor already exists
    const { data: existingCompetitors, error: queryError } = await supabase
      .from('competitors')
      .select('*')
      .eq('instagram_account_id', instagramAccountId)
      .eq('competitor_username', competitorUsername);
    
    if (queryError) throw queryError;
    
    if (existingCompetitors && existingCompetitors.length > 0) {
      // Update existing competitor
      const { data, error } = await supabase
        .from('competitors')
        .update({
          insights
        })
        .eq('id', existingCompetitors[0].id)
        .select();
      
      if (error) throw error;
      return data[0];
    } else {
      // Create new competitor
      const { data, error } = await supabase
        .from('competitors')
        .insert({
          instagram_account_id: instagramAccountId,
          competitor_username: competitorUsername,
          insights
        })
        .select();
      
      if (error) throw error;
      return data[0];
    }
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
    // Get the current demo PIN
    const demoPin = getDemoPin();
    
    // Check if a strategy for this project and demo session already exists
    const { data: existingStrategies, error: queryError } = await supabase
      .from('content_strategies')
      .select('*')
      .eq('project_id', projectId)
      .eq('demo_pin', demoPin);
    
    if (queryError) throw queryError;
    
    if (existingStrategies && existingStrategies.length > 0) {
      // Update existing strategy
      const { data, error } = await supabase
        .from('content_strategies')
        .update({
          instagram_account_id: instagramAccountId,
          calendar: strategy.calendar,
          captions: strategy.captions,
          formats: strategy.formats,
          themes: strategy.themes
        })
        .eq('id', existingStrategies[0].id)
        .select();
      
      if (error) throw error;
      return data[0];
    } else {
      // Create new strategy
      const { data, error } = await supabase
        .from('content_strategies')
        .insert({
          project_id: projectId,
          instagram_account_id: instagramAccountId,
          calendar: strategy.calendar,
          captions: strategy.captions,
          formats: strategy.formats,
          themes: strategy.themes,
          demo_pin: demoPin // Set the demo_pin
        })
        .select();
      
      if (error) throw error;
      return data[0];
    }
  } catch (error) {
    console.error("Error saving content strategy:", error);
    throw error;
  }
};

// Get Studio by Demo PIN
export const getStudioByDemoPin = async (demoPin: string) => {
  try {
    const { data, error } = await supabase
      .from('studios')
      .select('*')
      .eq('demo_pin', demoPin)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error getting studio by demo PIN:", error);
    return null;
  }
};

// Get Project by Studio ID and Demo PIN
export const getProjectByStudioIdAndDemoPin = async (studioId: string, demoPin: string) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('studio_id', studioId)
      .eq('demo_pin', demoPin)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error getting project by studio ID and demo PIN:", error);
    return null;
  }
};
