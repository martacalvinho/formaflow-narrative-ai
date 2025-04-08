
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY') || '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';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectData, instagramData, projectFiles } = await req.json();
    
    console.log('Generating AI strategy with project data:', {
      projectName: projectData?.name || "Not provided",
      projectType: projectData?.project_type || "Not provided",
      filesCount: projectFiles?.length || 0,
      instagramUsername: instagramData?.username || "Not provided"
    });
    
    // For the demo, we'll use project-specific data instead of calling the actual API
    // In a real implementation, this would make a call to OpenRouter or another AI API

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Extract project information for more relevant content
    const projectName = projectData?.name || "Urban Loft";
    const projectMaterials = projectData?.materials || "concrete, wood, and steel";
    const projectType = projectData?.project_type || "residential";
    const projectConcept = projectData?.concept || "industrial character with natural light";
    
    // Group files by phase for better calendar organization
    const filesByPhase: Record<string, any[]> = {};
    if (projectFiles && projectFiles.length > 0) {
      projectFiles.forEach(file => {
        if (!filesByPhase[file.phase]) {
          filesByPhase[file.phase] = [];
        }
        filesByPhase[file.phase].push(file);
      });
    }
    
    // Create a content calendar based on available project phases
    const availablePhases = Object.keys(filesByPhase);
    
    // Determine what days to assign content based on phases
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const calendar = weekdays.map((day, index) => {
      // Assign content to Monday, Wednesday, Thursday, Friday and Sunday
      if (index === 0 || index === 2 || index === 3 || index === 4 || index === 6) {
        const phase = availablePhases[index % availablePhases.length];
        const contentType = index % 3 === 0 ? 'carousel' : (index % 3 === 1 ? 'image' : 'video');
        
        let content;
        switch (phase) {
          case 'concept':
            content = 'Concept Sketches';
            break;
          case 'inspiration':
            content = 'Weekly Inspiration';
            break;
          case 'sketches':
            content = 'Design Sketches';
            break;
          case 'drawings':
            content = 'Design Evolution';
            break;
          case 'construction':
            content = 'Material Studies';
            break;
          case 'final':
            content = 'Final Photography';
            break;
          default:
            content = 'Project Update';
        }
        
        return { day, content, type: contentType, phase };
      }
      
      return { day, content: null, type: null, phase: null };
    });
    
    // Generate captions based on project phases and their files
    const captions = Object.entries(filesByPhase).map(([phase, files]) => {
      if (files.length === 0) return null;
      
      let caption;
      switch (phase) {
        case 'concept':
          caption = `The journey of our ${projectName} project began with these initial concept sketches. We wanted to preserve the ${projectConcept}. #architecture #concept #design #${projectType}`;
          break;
        case 'construction':
          caption = `Materials tell the story of a space. For this ${projectType} project, we chose a palette of ${projectMaterials} to honor the building's history while creating a warm, livable environment. Swipe to see the material evolution. #architecture #materiality #${projectType}`;
          break;
        case 'final':
          caption = `Light transforms space. The final photographs of our ${projectName} project capture how natural light interacts with the ${projectMaterials} throughout the day, creating a constantly evolving atmosphere. #architecture #interiordesign #naturallighting`;
          break;
        case 'drawings':
          caption = `Technical drawings reveal the complexity behind ${projectName}. Every line represents a decision about space, structure, and function. #architecture #technicaldesign #${projectType}design`;
          break;
        case 'inspiration':
          caption = `Finding inspiration for ${projectName} in the relationship between light and texture. These references guided our material selection of ${projectMaterials}. #designinspiration #architecture #materialstudies`;
          break;
        case 'sketches':
          caption = `From rough concept to refined vision - the evolution of our ${projectName} design. These sketches explore different approaches to ${projectConcept}. #architecturaldesign #sketches #designprocess`;
          break;
        default:
          caption = `Our ${projectName} ${projectType} project showcases our studio's commitment to thoughtful design and quality materials like ${projectMaterials}. #architecture #design #${projectType}`;
      }
      
      return { phase, caption };
    }).filter(Boolean);
    
    // Content themes based on project type
    let themes;
    switch (projectType) {
      case 'residential':
        themes = [
          "Living Spaces & Daily Rituals",
          "Material & Texture Narratives", 
          "Light & Shadow Studies",
          "Indoor-Outdoor Connections"
        ];
        break;
      case 'commercial':
        themes = [
          "Workspace Evolution",
          "Brand & Architecture Integration", 
          "User Experience Journeys",
          "Urban Context Dialogues"
        ];
        break;
      case 'public':
        themes = [
          "Community Engagement",
          "Urban Integration Stories", 
          "Public Space Activation",
          "Sustainability Showcases"
        ];
        break;
      default:
        themes = [
          "Process Storytelling",
          "Technical Thursdays", 
          "Material Narratives",
          "Studio Culture"
        ];
    }
    
    // Generate the response with project-specific data
    const response = {
      calendar,
      captions,
      formats: {
        carousels: 60,
        images: 30,
        videos: 10
      },
      themes
    };
    
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-strategy function:', error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
