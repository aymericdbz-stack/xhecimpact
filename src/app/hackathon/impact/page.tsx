import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationArea } from "./_components/registration-area";
import { getSubscriptionCount } from "@/lib/supabase/admin";

const EVENT_SLUG = "impact-hackathon-13-dec";
const TOTAL_SEATS = 80;

const PROGRAM_SCHEDULE = [
  {
    time: "8h30",
    title: "Accueil & Keynote",
    description: "Petit-déj, présentation & formation des équipes",
  },
  {
    time: "9h00",
    title: "Lancement",
    description: "Brainstorm, mentorat & cadrage du projet",
  },
  {
    time: "12h00",
    title: "Déjeuner",
    description: "Pause rapide, ambiance haute intensité",
  },
  {
    time: "13h00",
    title: "Prototypage",
    description: "Travail en équipe, mentorat, UX & design. Finalisation du prototype et préparation du pitch",
  },
  {
    time: "18h15",
    title: "Pitchs finaux",
    description: "Présentation devant les jurys, sélection des 5 meilleures équipes",
  },
];

export default async function HackathonImpactPage() {
  const currentCount = await getSubscriptionCount(EVENT_SLUG);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 lg:gap-20">
      <section className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-10 shadow-xl shadow-[#153B6D0d] md:p-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-stretch">
          <div className="space-y-6">
            <Badge className="w-fit rounded-full bg-[#153B6D] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
              Hackathon
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Hackathon Impact
              <br />
              <span className="block text-2xl sm:text-3xl font-normal">
                X-HEC Entrepreneurs
              </span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
              Samedi 13 décembre · 08:30 – 20:00 · Grande salle à Mouzaïa - 62 Rue de Mouzaïa, 75019 Paris.
            </p>
          </div>
          <div className="relative h-48 overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-inner sm:h-56 md:h-full">
            <Image
              src="/assets/mouzaia.jpg"
              alt="Façade de Mouzaia"
              fill
              sizes="(min-width: 768px) 320px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/80 bg-gradient-to-br from-white via-white to-[#153B6D0a] p-8 text-center shadow-lg shadow-[#153B6D0d] md:p-12">
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-[1.5rem]">
          Thème
        </h2>
        <p className="mt-3 text-2xl text-[#153B6D] sm:text-[1.75rem]">
          Quels moyens éducatifs pour inciter à l’action environnementale&nbsp;?
        </p>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-10 shadow-lg shadow-[#153B6D0d] md:p-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-900">Programme</h2>
          </div>
        </div>
        <div className="mt-8 space-y-2">
          {PROGRAM_SCHEDULE.map((slot, index) => (
            <div
              key={`${slot.time}-${slot.title}`}
              className="grid gap-1 rounded-2xl border border-slate-100 bg-white/70 p-2 shadow-sm transition hover:shadow-md sm:grid-cols-[70px_minmax(0,1fr)]"
            >
              <div className="text-lg font-semibold text-[#153B6D] leading-tight">
                {slot.time}
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-slate-900 leading-tight">
                  {slot.title}
                </p>
                <p className="text-[10px] text-slate-600 leading-snug">
                  {slot.description}
                </p>
              </div>

              {index !== PROGRAM_SCHEDULE.length - 1 && (
                <div className="pointer-events-none sm:col-span-2" aria-hidden>
                  <div className="mt-2 border-t border-dashed border-slate-200" />
                </div>
              )}
            </div>
          ))}
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
              <Avatar className="h-16 w-16 overflow-hidden border-2 border-white shadow-sm">
                <AvatarImage
                  src="/assets/team/de-turckheim-edgar-sd.jpg"
                  alt="Portrait d’Edgar de Turckheim"
                  className="h-full w-full object-cover"
                />
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
              à l’échelle de la France, voire du monde.&nbsp;»
            </blockquote>
          </CardContent>
        </Card>

        <RegistrationArea eventSlug={EVENT_SLUG} totalSeats={TOTAL_SEATS} initialCount={currentCount} />
      </section>
    </div>
  );
}
