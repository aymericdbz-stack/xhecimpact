import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Subscription } from "@/types/subscription";
import { MagicLinkButton } from "@/components/auth/magic-link-button";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-16 sm:px-6">
        <Card className="rounded-3xl border-border/70 bg-background/80">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-semibold">my applications</CardTitle>
            <CardDescription>sign in to review your submissions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>use the button below to receive a magic link and access your account space.</p>
            <MagicLinkButton
              label="sign in"
              className="rounded-full"
              size="sm"
              title="sign in"
              description="we will send you a one-time link"
              analyticsContext="applications-page"
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  const { data, error } = await supabase
    .from("subscription")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  const applications = (data ?? []) as Subscription[];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-16 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">my applications</h1>
        <p className="text-sm text-muted-foreground">
          track the status of your submissions across x-hec impact events.
        </p>
      </header>

      {applications.length === 0 ? (
        <Card className="rounded-3xl border-border/70 bg-muted/40">
          <CardContent className="p-8 text-sm text-muted-foreground">
            you have not applied yet. explore our events and submit your profile when you are ready.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => (
            <Card key={application.id} className="rounded-3xl border-border/70 bg-background/80 shadow-sm">
              <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">{application.event_slug.replace(/-/g, " ")}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>
                      submitted{" "}
                      {new Date(application.created_at)
                        .toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        .toLowerCase()}
                    </span>
                    <Badge variant="secondary" className="lowercase">
                      {application.profile}
                    </Badge>
                    {application.status && (
                      <Badge variant="outline" className="lowercase">
                        {application.status}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground sm:text-right">
                  {application.motivation}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
