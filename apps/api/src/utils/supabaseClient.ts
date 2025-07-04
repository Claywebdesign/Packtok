import { createClient } from "@supabase/supabase-js";
import config from "../config";

const supabase = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${config.supabase.serviceRoleKey}`,
      },
    },
  }
);

export default supabase;
