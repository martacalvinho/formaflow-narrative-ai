
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
    const { projectData, instagramData } = await req.json();
    
    console.log('Generating AI strategy with project data:', projectData);
    
    // For the demo, we'll use mock data instead of calling the actual API
    // In a real implementation, this would make a call to OpenRouter

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock response
    const mockResponse = {
      calendar: [
        { day: 'Monday', content: 'Concept Sketches', type: 'carousel', phase: 'concept' },
        { day: 'Tuesday', content: null, type: null, phase: null },
        { day: 'Wednesday', content: 'Design Evolution', type: 'image', phase: 'drawings' },
        { day: 'Thursday', content: 'Material Studies', type: 'carousel', phase: 'construction' },
        { day: 'Friday', content: 'Final Photography', type: 'image', phase: 'final' },
        { day: 'Saturday', content: null, type: null, phase: null },
        { day: 'Sunday', content: 'Weekly Inspiration', type: 'carousel', phase: 'inspiration' }
      ],
      captions: [
        { 
          phase: 'concept',
          caption: "The journey of our Urban Loft project began with these initial concept sketches. We wanted to preserve the industrial character while bringing in natural light through strategic openings. #architecture #concept #design #urbanrenewal"
        },
        { 
          phase: 'construction',
          caption: "Materials tell the story of a space. For this renovation, we chose a palette of concrete, reclaimed wood, and steel to honor the building's history while creating a warm, livable environment. Swipe to see the material evolution. #architecture #materiality #renovation"
        },
        { 
          phase: 'final',
          caption: "Light transforms space. The final photographs of our Urban Loft project capture how natural light interacts with the materials throughout the day, creating a constantly evolving atmosphere. #architecture #interiordesign #naturallighting"
        }
      ],
      formats: {
        carousels: 60,
        images: 30,
        videos: 10
      },
      themes: [
        "Process Storytelling",
        "Technical Thursdays", 
        "Material Narratives",
        "Studio Culture"
      ]
    };
    
    return new Response(JSON.stringify(mockResponse), {
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
