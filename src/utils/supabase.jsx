import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


// Create a single supabase client for interacting with your database
// export const supabase = createClient(
//   // process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   // process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   // 'https://xyzcompany.supabase.co',
//   // 'public-anon-key'
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );
