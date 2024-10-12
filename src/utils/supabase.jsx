import { createClient } from '@supabase/supabase-js';

const getEnvVariable = (key) => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key];
  }
  return undefined;
};

// const supabaseUrl = process.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
// const supabaseUrl = process.env.VITE_SUPABASE_URL
// const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabaseUrl = getEnvVariable('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVariable('VITE_SUPABASE_ANON_KEY');

// if (!supabaseUrl || !supabaseAnonKey) {
//   console.error('Supabase URL or Anon Key is missing');
//   throw new Error('Supabase configuration is incomplete');
// }
// if (process.env.NODE_ENV !== 'test' && (!supabaseUrl || !supabaseAnonKey)) {
//   console.error('Supabase URL or Anon Key is missing');
//   throw new Error('Supabase configuration is incomplete');
// }

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing');
  throw new Error('Supabase configuration is incomplete');
}


// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
