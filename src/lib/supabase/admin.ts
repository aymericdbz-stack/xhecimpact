import { createClient } from "@supabase/supabase-js";

import { getSupabaseConfig } from "./config";

export const createSupabaseAdminClient = () => {
  const { supabaseUrl } = getSupabaseConfig();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY n’est pas défini.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
};

export const getSubscriptionCount = async (eventSlug: string) => {
  const client = createSupabaseAdminClient();

  const { count } = await client
    .from("subscription")
    .select("id", { count: "exact", head: true })
    .eq("event_slug", eventSlug);

  return count ?? 0;
};
