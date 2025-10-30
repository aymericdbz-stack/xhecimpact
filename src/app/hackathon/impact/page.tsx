import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationArea } from "./_components/registration-area";
import { getSubscriptionCount } from "@/lib/supabase/admin";

const EVENT_SLUG = "impact-hackathon-13-dec";
const TOTAL_SEATS = 80;

export default async function HackathonImpactPage() {
  const currentCount = await getSubscriptionCount(EVENT_SLUG);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 lg:gap-20">
      <section className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-10 shadow-xl shadow-[#153B6D0d] md:p-16">
        <div className="space-y-6">
          <Badge className="w-fit rounded-full bg-[#153B6D] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            Hackathon
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Hackathon Impact à HEC
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
            Samedi 13 décembre · 14:00 – 18:00 · HEC Paris, Jouy-en-Josas campus.
          </p>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <Card className="rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-semibold text-slate-900">Organisateurs</CardTitle>
            <p className="text-sm text-slate-600">L’équipe qui vous accueille.</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                <AvatarImage src="/assets/de-turckheim-edgar.jpg" alt="Portrait d’Edgar de Turckheim" />
                <AvatarFallback className="bg-[#153B6D]/10 text-[#153B6D]">ED</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base font-semibold text-slate-900">Edgar de Turckheim</p>
                <p className="text-sm text-slate-600">Président du hackathon</p>
              </div>
            </div>
            <blockquote className="rounded-3xl border border-[#153B6D]/10 bg-[#153B6D]/5 p-6 text-sm leading-relaxed text-slate-800 shadow-inner">
              « Nous sommes une équipe de 16 personnes prêts à vous recevoir le samedi 13 décembre. Nous avons comme
              seule motivation de faire que vos idées deviennent une réalité. Donc venez tenter de créer un impact majeur
              à l’échelle de la France, voire du monde. »
            </blockquote>
          </CardContent>
        </Card>

        <RegistrationArea eventSlug={EVENT_SLUG} totalSeats={TOTAL_SEATS} initialCount={currentCount} />
      </section>
    </div>
  );
}
