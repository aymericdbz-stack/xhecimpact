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
        <Card className="rounded-3xl border-slate-200/80 bg-white/80">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-semibold">Mes candidatures</CardTitle>
            <CardDescription>Connectez-vous pour consulter vos candidatures.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-600">
            <p>
              Utilisez le bouton ci-dessous pour recevoir un lien magique et accéder à votre espace
              personnel.
            </p>
            <MagicLinkButton
              label="Se connecter"
              className="rounded-full"
              size="sm"
              title="Se connecter"
              description="Nous vous enverrons un lien unique."
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
        <h1 className="text-2xl font-semibold tracking-tight">Mes candidatures</h1>
        <p className="text-sm text-slate-600">
          Suivez l’avancement de vos candidatures auprès de l’équipe x-hec impact.
        </p>
      </header>

      {applications.length === 0 ? (
        <Card className="rounded-3xl border-slate-200/80 bg-white/70">
          <CardContent className="p-8 text-sm text-slate-600">
            Vous n’avez pas encore de candidature. Découvrez nos événements et déposez votre profil
            quand vous serez prêt·e.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => (
            <Card
              key={application.id}
              className="rounded-3xl border-slate-200/80 bg-white/90 shadow-sm shadow-[#153B6D0d]"
            >
              <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-900">
                    {application.event_slug.replace(/-/g, " ")}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                    <span>
                      Envoyée le{" "}
                      {new Date(application.created_at).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <Badge variant="secondary" className="uppercase tracking-wide">
                      {application.profile}
                    </Badge>
                    {application.status && (
                      <Badge variant="outline" className="uppercase tracking-wide">
                        {application.status}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-600 sm:text-right">{application.motivation}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
