
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { instagramData, competitorUsernames, projectData, projectFiles } = await req.json();
    
    console.log("Analyzing Instagram data with project context:", {
      instagram: instagramData?.username || "Not provided",
      competitors: competitorUsernames || [],
      projectName: projectData?.name || "Not provided",
      filesCount: projectFiles?.length || 0
    });
    
    // In a real implementation, this would make a request to the Instagram API
    // and analyze the data with an AI. For now, we'll generate more tailored mock data
    // based on the project information provided.
    
    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Use project info for more relevant analysis
    const projectMaterials = projectData?.materials || "sustainable materials";
    const projectName = projectData?.name || "architectural project";
    const projectType = projectData?.project_type || "residential";
    
    // Generate analysis with project context
    const analysis = {
      contentRecommendations: [
        `Focus on sharing more behind-the-scenes content of your ${projectName} design process`,
        `Create carousel posts that show the evolution of ${projectName} from concept to completion`,
        `Add technical details about ${projectMaterials} in your captions to engage industry professionals`,
        `For ${projectType} projects like ${projectName}, Thursday evening posts receive the highest engagement`
      ],
      competitorInsights: competitorUsernames.map((username: string) => ({
        username,
        insights: [
          `@${username} gets higher engagement from posts featuring project process vs final result`,
          `@${username}'s carousel posts receive 35% more engagement than single images`,
          `@${username}'s content about ${projectMaterials} receives strong engagement from similar audiences`,
          `@${username} posts most frequently on weekends with good results for ${projectType} projects`
        ]
      })),
      recommendations: {
        contentFormats: {
          carousels: 45,
          images: 35,
          videos: 20
        },
        contentThemes: [
          "Design Process & Evolution",
          `${projectMaterials.charAt(0).toUpperCase() + projectMaterials.slice(1)} Details & Techniques`,
          "Space & Light Interactions",
          `${projectType.charAt(0).toUpperCase() + projectType.slice(1)} Sustainability Features`
        ],
        postingSchedule: {
          optimalDays: ["Thursday", "Sunday"],
          optimalTimes: ["7PM", "11AM"]
        }
      }
    };
    
    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-instagram function:", error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
