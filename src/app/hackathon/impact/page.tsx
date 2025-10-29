import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ApplySection } from "./sections/apply-section";
import type { Subscription } from "@/types/subscription";
import type { UserIdentity } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const organizers = [
  {
    name: "claire morel",
    role: "co-president",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=128&q=80",
  },
  {
    name: "mathis dupont",
    role: "program lead",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=128&q=80",
  },
  {
    name: "salomé girard",
    role: "operations",
    avatar: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=128&q=80",
  },
];

const participantsPreview = [
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=96&q=80",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=96&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=96&q=80",
];

export default async function HackathonImpactPage() {
  const supabase = createSupabaseServerClient();
  const [sessionResponse, userResponse] = await Promise.all([
    supabase.auth.getSession(),
    supabase.auth.getUser(),
  ]);

  const session = sessionResponse.data.session;
  const user = userResponse.data.user ?? session?.user ?? null;

  const emailVerified = Boolean(
    user?.email_confirmed_at ||
      user?.identities?.some(
        (identity: UserIdentity) => identity.provider === "email" && identity.last_sign_in_at,
      ),
  );

  let existingApplication: Subscription | null = null;

  if (user) {
    const { data: existing } = await supabase
      .from("subscription")
      .select("*")
      .eq("user_id", user.id)
      .eq("event_slug", "impact-hackathon-13-dec")
      .maybeSingle();

    if (existing) {
      existingApplication = existing as Subscription;
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
      <div className="space-y-10">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-gradient-to-br from-emerald-100 via-white to-sky-100 p-8 shadow-inner">
          <div className="max-w-xl space-y-4">
            <Badge variant="outline" className="rounded-full px-4 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
              hackathon
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              impact hackathon at HEC
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              saturday 13 december · 14:00 - 18:00 · HEC Paris, Jouy-en-Josas campus.
            </p>
          </div>
          <div className="absolute inset-y-0 right-0 hidden w-1/2 rounded-l-full bg-gradient-to-r from-transparent to-primary/30 lg:block" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border-border/70 bg-background/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">organizers</CardTitle>
              <CardDescription>people guiding the experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {organizers.map((organizer) => (
                <div key={organizer.name} className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={organizer.avatar} alt={organizer.name} />
                    <AvatarFallback>{organizer.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{organizer.name}</p>
                    <p className="text-xs text-muted-foreground">{organizer.role}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/70 bg-background/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">participants</CardTitle>
              <CardDescription>a glimpse of who&apos;s already in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex -space-x-3">
                {participantsPreview.map((src, index) => (
                  <Avatar key={src} className="border-2 border-background">
                    <AvatarImage src={src} alt={`participant ${index + 1}`} />
                    <AvatarFallback>p{index + 1}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-border/70 bg-muted/50 text-sm text-muted-foreground">
                  +48
                </div>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">
                we welcome students across disciplines. bring your curiosity, creative energy, and willingness to prototype bold ideas fast.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <ApplySection emailVerified={emailVerified} user={user} existingApplication={existingApplication} />
    </div>
  );
}
