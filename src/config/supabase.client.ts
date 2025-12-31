import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
// const supabaseUrl = "https://tdmlvpjcyocwpvxzyuof.supabase.co";
// const supabaseAnonKey = "sb_publishable_sSAnpDzOZMZGf9H8yH-NVg_l5vTuEXp";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
