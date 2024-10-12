// import { vi } from 'vitest';
import "@testing-library/jest-dom";

import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

// dotenvの設定
// require("dotenv").config();
// Vite の環境変数をモック
// vi.mock('import.meta.env', () => ({
//   VITE_SUPABASE_URL: 'https://vbmjvzuzqtdlpvqtcaou.supabase.co',
//   VITE_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZibWp2enV6cXRkbHB2cXRjYW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MTkxMjEsImV4cCI6MjA0MjQ5NTEyMX0.kkVzQarJee8SCvkfzNECtONCNS36WuQ5dhzmL1e3oDc',
// }), { virtual: true });

// global.import = {
//   meta: {
//     env: {
//       VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL || 'https://vbmjvzuzqtdlpvqtcaou.supabase.co',
//       VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZibWp2enV6cXRkbHB2cXRjYW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MTkxMjEsImV4cCI6MjA0MjQ5NTEyMX0.kkVzQarJee8SCvkfzNECtONCNS36WuQ5dhzmL1e3oDc'
//     }
//   }
// };

if (process.env.NODE_ENV === 'test') {
  process.env.VITE_SUPABASE_URL = 'https://vbmjvzuzqtdlpvqtcaou.supabase.co';
  process.env.VITE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZibWp2enV6cXRkbHB2cXRjYW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MTkxMjEsImV4cCI6MjA0MjQ5NTEyMX0.kkVzQarJee8SCvkfzNECtONCNS36WuQ5dhzmL1e3oDc';
}


// process.env.VITE_SUPABASE_URL = 'https://vbmjvzuzqtdlpvqtcaou.supabase.co';
// process.env.VITE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZibWp2enV6cXRkbHB2cXRjYW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MTkxMjEsImV4cCI6MjA0MjQ5NTEyMX0.kkVzQarJee8SCvkfzNECtONCNS36WuQ5dhzmL1e3oDc';

jest.mock('../src/style.css', () => ({}), { virtual: true });
