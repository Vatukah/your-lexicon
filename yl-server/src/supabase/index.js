import {CreateClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'your-anon-key'; // Replace with your Supabase anon key
const supabase = CreateClient(supabaseUrl, supabaseKey);      

export default supabase;