import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

let supabaseUrl = process.env.SUPABASE_URL || "https://placeholder.supabase.co";
let supabaseKey = process.env.SUPABASE_KEY || "placeholder-key";

// Ensure URL starts with http:// or https:// for SDK compatibility
if (!supabaseUrl.startsWith("http://") && !supabaseUrl.startsWith("https://")) {
  supabaseUrl = `https://${supabaseUrl}`;
}

let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseKey);
} catch (err) {
  console.warn("⚠️ Warning: Supabase client initialized with dummy credentials. Please update .env with real SUPABASE_URL and SUPABASE_KEY.");
  supabase = createClient("https://placeholder.supabase.co", "placeholder-key");
}

export default supabase;

