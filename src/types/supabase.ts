
// Define types to match Supabase database tables
export interface Studio {
  id: string;
  name: string;
  website?: string;
  style: string;
  logo_url?: string;
  created_at: string;
  demo_pin?: string; // Added demo_pin for tracking demo sessions
}

export interface Project {
  id: string;
  studio_id: string;
  name: string;
  location?: string;
  client?: string;
  concept?: string;
  stage: string;
  materials?: string;
  project_type?: string;
  created_at: string;
  demo_pin?: string; // Added demo_pin for tracking demo sessions
}

export interface ProjectFile {
  id: string;
  project_id: string;
  file_name: string;
  file_url: string;
  phase: string;
  created_at: string;
}

export interface InstagramAccount {
  id: string;
  username: string;
  followers?: number;
  posts?: number;
  engagement?: number;
  top_posts?: any[];
  post_types?: any;
  post_timing?: any;
  created_at: string;
  demo_pin?: string; // Added demo_pin for tracking demo sessions
}

export interface Competitor {
  id: string;
  instagram_account_id: string;
  competitor_username: string;
  insights?: any;
  created_at: string;
}

export interface ContentStrategy {
  id: string;
  project_id: string;
  instagram_account_id?: string;
  calendar?: any;
  captions?: any;
  formats?: any;
  themes?: any;
  created_at: string;
  demo_pin?: string; // Added demo_pin for tracking demo sessions
}
