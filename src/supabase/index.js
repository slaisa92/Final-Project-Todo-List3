import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://polfnwftviyobbnqfsnn.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvbGZud2Z0dml5b2JibnFmc25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1OTkzMzgsImV4cCI6MjAwNzE3NTMzOH0.GqNRe4mtiWcYmmnd8CGb1aKSO6i9UKcLYxbz4LIAxVQ';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
