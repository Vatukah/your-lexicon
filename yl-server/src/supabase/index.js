import 'dotenv/config'; // Ensure environment variables are loaded
import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://blcyblxotvgtszukckyt.supabase.co'; // Replace with your Supabase URL
const supabaseKey = process.env.SUPABASE_KEY; // Ensure you have set this in your environment variables
if (!supabaseKey) {
    throw new Error('Missing Supabase key');
}
const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceRoleKey) {
    throw new Error('Missing Supabase service role key');
}
const supabaseService = createClient(supabaseUrl, supabaseServiceRoleKey);


export { supabase, supabaseService };