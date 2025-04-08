import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

console.log('Instagram API function starting...');

// --- Environment Variables ---
// Ensure these are set in your Supabase project settings for this function
const INSTAGRAM_ACCESS_TOKEN = Deno.env.get('INSTAGRAM_ACCESS_TOKEN');
const INSTAGRAM_USER_ID = Deno.env.get('INSTAGRAM_USER_ID') || '17841401331403029'; // Default or fetched from ENV

if (!INSTAGRAM_ACCESS_TOKEN) {
  console.error("FATAL: INSTAGRAM_ACCESS_TOKEN environment variable not set.");
  // In a real scenario, you might want to prevent the function from serving
  // or return an error immediately, but for now, we'll let it proceed
  // and potentially fail during the fetch calls.
}

serve(async (req: Request) => {
  console.log('Handling request:', req.method, req.url);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // --- Get Action and Parameters ---
    const url = new URL(req.url);
    const action = url.searchParams.get('action');
    const username = url.searchParams.get('username') || 'demo_pin'; // Fallback username

    console.log(`Action: ${action}, Username: ${username}`);

    if (!action) {
      console.error('Action parameter is missing');
      return new Response(JSON.stringify({ error: 'Action parameter is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // --- Action: Get User Profile ---
    if (action === 'getUserProfile') {
      console.log('Action: getUserProfile');

      if (!INSTAGRAM_ACCESS_TOKEN) {
        console.error('getUserProfile: INSTAGRAM_ACCESS_TOKEN missing.');
        throw new Error('Instagram Access Token not configured.');
      }

      const userIdToFetch = INSTAGRAM_USER_ID;
      const profileFields = 'id,username,account_type,media_count'; // Basic fields, add followers_count if permission granted
      const profileUrl = `https://graph.facebook.com/v19.0/${userIdToFetch}?fields=${profileFields}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

      console.log(`Fetching profile from: ${profileUrl.replace(INSTAGRAM_ACCESS_TOKEN, '********')}`); // Avoid logging token

      const profileResponse = await fetch(profileUrl);
      if (!profileResponse.ok) {
        const errorText = await profileResponse.text();
        console.error(`Instagram API Error (Profile - ${profileResponse.status}): ${errorText}`);
        throw new Error(`Failed to fetch Instagram profile: ${profileResponse.statusText} - ${errorText}`);
      }
      const profileApiData = await profileResponse.json();
      console.log("Raw Profile API Data:", profileApiData);


      // --- Handle Followers Count ---
      // TODO: Fetch Followers Count Separately if needed & permission exists.
      // The 'followers_count' field requires higher permissions.
      // Assuming 5284 as a fallback for now.
      const followersCount = profileApiData.followers_count || 5284;

      // Format the data for your frontend
      const userData = {
        username: profileApiData.username || username, // Fallback to input username if API one is missing
        followers: followersCount,
        posts: profileApiData.media_count || 158, // Fallback
      };

      console.log("Formatted User Profile Data:", userData);
      return new Response(JSON.stringify(userData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // --- Action: Get Posts & Analytics ---
    else if (action === 'getPosts') {
      console.log('Action: getPosts');

      if (!INSTAGRAM_ACCESS_TOKEN) {
        console.error('getPosts: INSTAGRAM_ACCESS_TOKEN missing.');
        throw new Error('Instagram Access Token not configured.');
      }

      const userIdToFetch = INSTAGRAM_USER_ID;
      const mediaFields = 'id,caption,media_type,media_url,thumbnail_url,timestamp,like_count,comments_count,children{media_url,media_type,thumbnail_url}'; // Added thumbnail_url for children
      const mediaUrl = `https://graph.facebook.com/v19.0/${userIdToFetch}/media?fields=${mediaFields}&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=25`; // Get more posts

      console.log(`Fetching media from: ${mediaUrl.replace(INSTAGRAM_ACCESS_TOKEN, '********')}`); // Avoid logging token

      const mediaResponse = await fetch(mediaUrl);
      if (!mediaResponse.ok) {
        const errorText = await mediaResponse.text();
        console.error(`Instagram API Error (Media - ${mediaResponse.status}): ${errorText}`);
        throw new Error(`Failed to fetch Instagram media: ${mediaResponse.statusText} - ${errorText}`);
      }
      const mediaApiData = await mediaResponse.json();
      const postsRaw: any[] = mediaApiData.data || []; // Ensure type safety
      console.log(`Raw Media API Data Received: ${postsRaw.length} posts`);


      // --- Process Posts and Calculate Analytics ---
      let imageCount = 0;
      let carouselCount = 0;
      let videoCount = 0;
      let totalLikes = 0;
      let totalComments = 0;

      const processedPosts = postsRaw.map((post: any) => {
        totalLikes += post.like_count || 0;
        totalComments += post.comments_count || 0;

        let imageUrl = post.media_url;
        // Determine image URL based on type
        if (post.media_type === 'VIDEO') {
          imageUrl = post.thumbnail_url || '/placeholder.svg'; // Use video thumbnail
          videoCount++;
        } else if (post.media_type === 'CAROUSEL_ALBUM') {
          // Use the first child's media URL or thumbnail URL
          const firstChild = post.children?.data?.[0];
          if (firstChild) {
            imageUrl = (firstChild.media_type === 'VIDEO' ? firstChild.thumbnail_url : firstChild.media_url) || post.media_url || '/placeholder.svg';
          } else {
            imageUrl = '/placeholder.svg'; // Fallback if no children data
          }
          carouselCount++;
        } else { // IMAGE
          imageCount++;
          imageUrl = post.media_url || '/placeholder.svg';
        }


        return {
          id: post.id,
          imageUrl: imageUrl,
          caption: post.caption || '',
          likes: post.like_count || 0,
          comments: post.comments_count || 0,
          timestamp: post.timestamp,
          type: post.media_type,
        };
        // Sort by engagement (higher engagement first)
      }).sort((a: any, b: any) => (b.likes + b.comments) - (a.likes + a.comments));

      const totalPosts = imageCount + carouselCount + videoCount;
      console.log(`Post Type Counts: Images=${imageCount}, Carousels=${carouselCount}, Videos=${videoCount}, Total=${totalPosts}`);
      console.log(`Total Engagement: Likes=${totalLikes}, Comments=${totalComments}`);


      // Calculate Post Type Percentages
      let postTypesPercentage = { images: 0, carousels: 0, videos: 0 };
      if (totalPosts > 0) {
        postTypesPercentage = {
          images: Math.round((imageCount / totalPosts) * 100),
          carousels: Math.round((carouselCount / totalPosts) * 100),
          videos: Math.round((videoCount / totalPosts) * 100),
        };

         // Normalize percentages to sum to 100 (due to rounding)
        let sum = postTypesPercentage.images + postTypesPercentage.carousels + postTypesPercentage.videos;
        if (sum !== 100 && sum > 0) { // Avoid adjusting if sum is 0
            const diff = 100 - sum;
            // Add difference to the largest category (simple normalization)
             if (postTypesPercentage.images >= postTypesPercentage.carousels && postTypesPercentage.images >= postTypesPercentage.videos) postTypesPercentage.images += diff;
             else if (postTypesPercentage.carousels >= postTypesPercentage.images && postTypesPercentage.carousels >= postTypesPercentage.videos) postTypesPercentage.carousels += diff;
             else postTypesPercentage.videos += diff;
            // Ensure no category goes below 0 after adjustment (edge case)
             postTypesPercentage.images = Math.max(0, postTypesPercentage.images);
             postTypesPercentage.carousels = Math.max(0, postTypesPercentage.carousels);
             postTypesPercentage.videos = Math.max(0, postTypesPercentage.videos);
            // Final check for 100% sum after normalization
             sum = postTypesPercentage.images + postTypesPercentage.carousels + postTypesPercentage.videos;
             if (sum !== 100 && totalPosts > 0) { // If still not 100, add leftover to the first non-zero category
                 const finalDiff = 100 - sum;
                 if (postTypesPercentage.images > 0) postTypesPercentage.images += finalDiff;
                 else if (postTypesPercentage.carousels > 0) postTypesPercentage.carousels += finalDiff;
                 else if (postTypesPercentage.videos > 0) postTypesPercentage.videos += finalDiff;
             }
        }
      }

      // --- TODO: Implement Engagement Rate and Post Timing Analysis ---
      // Basic Engagement Calculation (Example: average per post, requires follower count)
      // const followersCount = ??? // Need followers from getUserProfile or passed differently
      // const engagementRate = totalPosts > 0 && followersCount > 0 ? (((totalLikes + totalComments) / totalPosts) / followersCount) * 100 : 0;

      // Simple Post Timing Analysis Placeholder
      // const postTiming = analyzePostTimestamps(postsRaw); // Implement this helper
      const postTimingPlaceholder = { weekday: 'Thursday', time: '7PM' };

      const analytics = {
        postTypes: postTypesPercentage,
        postTiming: postTimingPlaceholder,
        // engagementRate: engagementRate ? engagementRate.toFixed(1) : 'N/A' // Requires followers
        avgLikes: totalPosts > 0 ? Math.round(totalLikes / totalPosts) : 0,
        avgComments: totalPosts > 0 ? Math.round(totalComments / totalPosts) : 0,
      };

      console.log("Calculated Analytics:", analytics);
      console.log(`Returning ${Math.min(processedPosts.length, 12)} posts for display.`);

      return new Response(JSON.stringify({
        posts: processedPosts.slice(0, 12), // Return top 12 for display
        analytics: analytics,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // --- Unknown Action ---
    else {
      console.warn(`Unknown action received: ${action}`);
      return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500, // Internal Server Error
    });
  }
});

console.log('Instagram API function initialized.');
