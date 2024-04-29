// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://srernuonbutxmypelzwn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyZXJudW9uYnV0eG15cGVsenduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyNzM5MzIsImV4cCI6MjAyOTg0OTkzMn0.epp9GMi8l29qFC_BfOWWJz0xc9l6HtobbLSmuC6PhT8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
