import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseConfig } from "./config";

export const createSupabaseBrowserClient = () => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};
