
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Instagram API credentials
const INSTAGRAM_ACCESS_TOKEN = Deno.env.get('INSTAGRAM_ACCESS_TOKEN') || 'IGAAS9GW3RO6tBZAE1hVEZArcElXSFpjeEhSR2pKUVdFcGFfQ0N5RkpwSGJXYjFlSFJfdFNKMlc1TFBEaWd4SWZAnNXV4VlJ4OVdHQzgwWE03QlZATR0haczdqd0U0ZAEtxVHdhLXJUSV83YS1zUkVzUDhsSVY1Q2ZAaMHN4T2c2RTluawZDZD';
const INSTAGRAM_USER_ID = '17841401331403029'; // Demo account

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
    const { action, username } = await req.json();
    
    if (action === 'getUserProfile') {
      // Mock data for the demo
      const userData = {
        username: username || 'martacalvinho',
        followers: 5284,
        posts: 158,
        engagement: 4.3,
        bio: 'Architecture & Interior Design Studio | Lisbon, Portugal'
      };
      
      return new Response(JSON.stringify(userData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } 
    else if (action === 'getPosts') {
      // For the demo, we'll use mock data instead of real API calls
      const mockPosts = [
        {
          id: 'post1',
          image_url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
          caption: 'Light study for our latest residential project #architecture #interiordesign',
          likes: 328,
          comments: 24,
          timestamp: '2023-01-15T09:23:00Z',
          type: 'image'
        },
        {
          id: 'post2',
          image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
          caption: 'Materials exploration for the urban loft project. Combining concrete and wood creates a stunning contrast.',
          likes: 452,
          comments: 41,
          timestamp: '2023-02-03T14:15:00Z',
          type: 'carousel'
        },
        {
          id: 'post3',
          image_url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea',
          caption: 'Site visit at our current construction project. Progress is looking good!',
          likes: 197,
          comments: 15,
          timestamp: '2023-02-10T11:30:00Z',
          type: 'image'
        },
        {
          id: 'post4',
          image_url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
          caption: 'Model making in the studio today. Getting ready for client presentation tomorrow.',
          likes: 384,
          comments: 32,
          timestamp: '2023-02-20T16:45:00Z',
          type: 'image'
        },
        {
          id: 'post5',
          image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c349279',
          caption: 'Final photos of the completed Riverside House project.',
          likes: 723,
          comments: 89,
          timestamp: '2023-03-05T10:20:00Z',
          type: 'carousel'
        },
        {
          id: 'post6',
          image_url: 'https://images.unsplash.com/photo-1600607687644-c7531e71d2e3',
          caption: 'Behind the scenes: Construction phase of our latest commercial project.',
          likes: 251,
          comments: 18,
          timestamp: '2023-03-15T13:40:00Z',
          type: 'video'
        },
        {
          id: 'post7',
          image_url: 'https://images.unsplash.com/photo-1600607688066-89c6a7272f2e',
          caption: 'Sketching session with the team. Many ideas for the new cultural center.',
          likes: 302,
          comments: 27,
          timestamp: '2023-03-22T15:10:00Z',
          type: 'image'
        },
        {
          id: 'post8',
          image_url: 'https://images.unsplash.com/photo-1600607688066-89c6a7272f2e',
          caption: 'Concept development for a sustainable housing project #sustainability',
          likes: 415,
          comments: 36,
          timestamp: '2023-04-01T09:30:00Z',
          type: 'image'
        },
        {
          id: 'post9',
          image_url: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311',
          caption: 'Exploring the relationship between interior spaces and natural light',
          likes: 518,
          comments: 45,
          timestamp: '2023-04-10T11:15:00Z',
          type: 'carousel'
        },
        {
          id: 'post10',
          image_url: 'https://images.unsplash.com/photo-1600585154526-990dced4db3d',
          caption: 'Material selections for our luxury apartment renovation',
          likes: 289,
          comments: 22,
          timestamp: '2023-04-18T14:50:00Z',
          type: 'image'
        },
        {
          id: 'post11',
          image_url: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099',
          caption: 'Urban context analysis for our new city center project',
          likes: 345,
          comments: 31,
          timestamp: '2023-04-27T16:20:00Z',
          type: 'image'
        },
        {
          id: 'post12',
          image_url: 'https://images.unsplash.com/photo-1600573472432-27195c041e5f',
          caption: 'Office tour: Our newly designed studio space is finally complete!',
          likes: 632,
          comments: 74,
          timestamp: '2023-05-05T10:40:00Z',
          type: 'video'
        }
      ];
      
      // Analytics 
      const postTypes = {
        image: 8,
        carousel: 3,
        video: 2
      };
      
      const postTiming = {
        weekdays: {
          Monday: 2,
          Tuesday: 3,
          Wednesday: 1,
          Thursday: 2,
          Friday: 3,
          Saturday: 1,
          Sunday: 0
        },
        times: {
          morning: 5,
          afternoon: 7,
          evening: 0
        }
      };
      
      return new Response(JSON.stringify({ 
        posts: mockPosts,
        analytics: {
          postTypes,
          postTiming
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    else if (action === 'getCompetitors') {
      // Mock competitor data
      const competitors = [
        {
          username: 'studioarchitectura',
          followers: 12500,
          posts: 320,
          engagement: 6.2,
          topPostTypes: { image: 60, carousel: 35, video: 5 },
          postFrequency: 'Daily'
        },
        {
          username: 'modernspaces',
          followers: 8700,
          posts: 215,
          engagement: 5.1,
          topPostTypes: { image: 45, carousel: 40, video: 15 },
          postFrequency: '3-4 per week'
        },
        {
          username: 'designatelier',
          followers: 15300,
          posts: 412,
          engagement: 7.8,
          topPostTypes: { image: 30, carousel: 50, video: 20 },
          postFrequency: '5 per week'
        }
      ];
      
      return new Response(JSON.stringify({ competitors }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in instagram-api function:', error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
