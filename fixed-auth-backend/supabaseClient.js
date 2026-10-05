import { createClient } from "@supabase/supabase-js";
import process from "node:process";

// console.log("Key defined?", Boolean(key));
// console.log("Parts count (should be 3):", key?.split(".").length);
// console.log("Last 5 chars:", key?.slice(-5));
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export default supabase;
