"use client";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { Session } from "@supabase/supabase-js";
import { ReactNode, useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

interface SupabaseProviderProps {
  children: ReactNode;
  session: Session | null;
}

export function SupabaseProvider({ children, session }: SupabaseProviderProps) {
  const [supabaseClient] = useState(() => createSupabaseBrowserClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={session}>
      {children}
    </SessionContextProvider>
  );
}
