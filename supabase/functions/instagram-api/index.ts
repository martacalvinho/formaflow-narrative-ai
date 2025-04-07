
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const INSTAGRAM_TOKEN = Deno.env.get('INSTAGRAM_TOKEN') || 'IGAAS9GW3RO6tBZAE1hVEZArcElXSFpjeEhSR2pKUVdFcGFfQ0N5RkpwSGJXYjFlSFJfdFNKMlc1TFBEaWd4SWZAnNXV4VlJ4OVdHQzgwWE03QlZATR0haczdqd0U0ZAEtxVHdhLXJUSV83YS1zUkVzUDhsSVY1Q2ZAaMHN4T2c2RTluawZDZD';
const DEFAULT_ACCOUNT_ID = '17841401331403029';

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
    const { accountId = DEFAULT_ACCOUNT_ID } = await req.json();
    console.log(`Fetching Instagram data for account: ${accountId}`);

    // Get recent media
    const mediaResponse = await fetch(
      `https://graph.instagram.com/${accountId}/media?fields=id,caption,media_url,timestamp,like_count,comments_count&access_token=${INSTAGRAM_TOKEN}`,
      { method: 'GET' }
    );
    
    if (!mediaResponse.ok) {
      const errorText = await mediaResponse.text();
      console.error('Instagram API error:', errorText);
      throw new Error(`Instagram API error: ${errorText}`);
    }
    
    const mediaData = await mediaResponse.json();
    
    // Process the data to extract insights
    const posts = mediaData.data || [];
    
    // Sort posts by likes to find top performing
    const sortedByLikes = [...posts].sort((a, b) => 
      (b.like_count || 0) - (a.like_count || 0)
    );
    
    // Calculate engagement rates
    const totalLikes = posts.reduce((sum, post) => sum + (post.like_count || 0), 0);
    const totalComments = posts.reduce((sum, post) => sum + (post.comments_count || 0), 0);
    const avgEngagement = posts.length ? ((totalLikes + totalComments) / posts.length) / 24823 * 100 : 0;
    
    // Analyze post types (simplified for demo)
    const postTypes = {
      images: 65,
      carousels: 30,
      videos: 5
    };
    
    // Format the data for client consumption
    const analysisResults = {
      posts: posts.length,
      followers: 24823, // Mocked for the demo
      engagement: avgEngagement.toFixed(1),
      topPosts: sortedByLikes.slice(0, 6).map(post => ({
        id: post.id,
        imageUrl: post.media_url,
        likes: post.like_count || 0,
        comments: post.comments_count || 0
      })),
      postTypes,
      postTiming: { weekday: 'Thursday', time: '7PM' } // Mocked for the demo
    };
    
    return new Response(JSON.stringify(analysisResults), {
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
