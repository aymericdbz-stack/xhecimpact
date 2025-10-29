"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { CircleUserRound, LogOut } from "lucide-react";

import { MagicLinkButton } from "@/components/auth/magic-link-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

export function HeaderAuthMenu() {
  const session = useSession();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const user = session?.user ?? null;

  const initials = useMemo(() => {
    if (!user) return "me";
    const first = (user.user_metadata?.first_name as string | undefined) ?? user.email?.[0] ?? "m";
    const last = (user.user_metadata?.last_name as string | undefined) ?? "e";
    return `${first.slice(0, 1)}${last.slice(0, 1)}`.toLowerCase();
  }, [user]);

  if (!user) {
    return (
      <MagicLinkButton
        size="sm"
        className="rounded-full"
        analyticsContext="header"
        label="sign in"
        title="sign in"
        description="receive a magic link in your inbox to join the event"
      />
    );
  }

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
    router.refresh();
    toast("signed out", {
      description: "come back soon to discover new initiatives",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full px-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={(user.user_metadata?.avatar_url as string | undefined) ?? undefined} />
            <AvatarFallback className="uppercase">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal text-sm">
          <p className="text-muted-foreground">signed in as</p>
          <p className="truncate font-medium lowercase">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account/applications" className="flex items-center gap-2 text-sm">
            <CircleUserRound className="h-4 w-4" /> my applications
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 focus:text-red-500"
          onSelect={(event) => {
            event.preventDefault();
            void handleSignOut();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" /> sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
