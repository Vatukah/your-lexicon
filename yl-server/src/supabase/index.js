import 'dotenv/config'; // Ensure environment variables are loaded
import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://blcyblxotvgtszukckyt.supabase.co'; // Replace with your Supabase URL
const supabaseKey = process.env.SUPABASE_KEY; // Ensure you have set this in your environment variables
if (!supabaseKey) {
    throw new Error('Missing Supabase key');
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;