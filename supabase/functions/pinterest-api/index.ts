
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const PINTEREST_API_KEY = Deno.env.get('PINTEREST_API_KEY') || 'pina_AMA2SJQXADMAWAAAGBANQAF7YNK7PFIBQBIQDRL3SMLTZ2OOQ25VZESOBXLZMSIP6D4FNR7OSCXMP2NUDCKNNGU3VK5BCDIA';

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
    const { action, boardId } = await req.json();
    
    if (action === 'getBoards') {
      // Get user boards (simplified for the demo)
      const mockBoards = [
        { id: 'architecture-inspiration', name: 'Architecture Inspiration', pin_count: 54 },
        { id: 'material-studies', name: 'Material Studies', pin_count: 28 },
        { id: 'urban-renewal', name: 'Urban Renewal Projects', pin_count: 36 }
      ];
      
      return new Response(JSON.stringify({ boards: mockBoards }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } 
    else if (action === 'getPins' && boardId) {
      // Get pins from a specific board (simplified for the demo)
      const mockPins = [
        { id: 'pin1', image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', title: 'Modern Loft Design' },
        { id: 'pin2', image_url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea', title: 'Industrial Space' },
        { id: 'pin3', image_url: 'https://images.unsplash.com/photo-1600573472556-e636c2acda88', title: 'Light Study' },
        { id: 'pin4', image_url: 'https://images.unsplash.com/photo-1600585154526-990dced4db3d', title: 'Material Contrast' },
        { id: 'pin5', image_url: 'https://images.unsplash.com/photo-1601760561441-16420502c7e0', title: 'Open Plan Concept' },
        { id: 'pin6', image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0', title: 'Circulation Study' },
      ];
      
      return new Response(JSON.stringify({ pins: mockPins }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ error: 'Invalid action or missing boardId' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in pinterest-api function:', error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
