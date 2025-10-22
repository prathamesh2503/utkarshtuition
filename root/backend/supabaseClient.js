import { createClient } from "@supabase/supabase-js";
// create connection

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default supabase;
/** Setup Supabase Storage
 * Go to Storage → Create new bucket
 * Install Supabase Client in Backend - npm install @supabase/supabase-js
 * @supabase/supabase-js - This is the official Supabase JavaScript library, installed via npm/yarn/pnpm. It provides functions that let you connect your JavaScript/Node.js/React app to your Supabase project (database, authentication, storage, etc.).
 * createClient - This is a function exported by Supabase’s library. Its job is to initialize a connection to your Supabase backend. You call it with your Supabase URL and public API key to create a client object
 * Add env vars in .env - SUPABASE_URL=https://your-project-id.supabase.co SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
 */
