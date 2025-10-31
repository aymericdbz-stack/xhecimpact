import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogoCarousel } from "@/components/logo-carousel";

const teamFaces = [
  { name: "Cassandre Arminjon", src: "/assets/team/arminjon-cassandre.jpg", className: "scale-110" },
  { name: "Macky Dabo", src: "/assets/team/dabo-macky.jpg", className: "scale-110" },
  { name: "Joseph de Solages", src: "/assets/team/de-solages-joseph.jpg" },
  { name: "Edgar de Turckheim", src: "/assets/team/de-turckheim-edgar-sd.jpg" },
  { name: "Aymeric Desbazeille", src: "/assets/team/desbazeille-aymeric.jpg" },
  { name: "Solene Duval", src: "/assets/team/duval-solene.jpg" },
  { name: "Marie-Lou Gosselet", src: "/assets/team/gosselet-marie-lou.jpg" },
  { name: "Vianney Hartmann", src: "/assets/team/hartmann-vianney.jpg" },
  { name: "Adama Kanate", src: "/assets/team/kanate-adama.jpg" },
  { name: "Florentin Koch", src: "/assets/team/koch-florentin.jpg" },
  { name: "Sacha Lellouche", src: "/assets/team/lellouche-sacha.jpg" },
  { name: "Augustin Liang", src: "/assets/team/liang-augustin.jpg" },
  { name: "Amelie Prudhomme", src: "/assets/team/prudhomme-amelie.jpg" },
  { name: "Mathis Romanet", src: "/assets/team/romanet-mathis.jpg" },
  { name: "Suzanne Tedeschi", src: "/assets/team/tedeschi-suzanne.jpg" },
  { name: "Marc-Florent Touati", src: "/assets/team/touati-marc-florent.jpg" },
];

export default function HomePage() {
  return (
    <div className="flex w-full flex-col py-16 sm:py-20">
      <div className="flex w-full flex-col gap-8 sm:gap-12">
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Link
            href="/hackathon/impact"
            className="block rounded-[2.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B21A]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-50"
          >
            <Card className="group rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-xl shadow-[#153B6D0d] transition hover:-translate-y-1 hover:shadow-2xl md:p-12">
              <CardContent className="grid gap-10 p-0 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
                <div className="space-y-6">
                  <Badge className="w-fit rounded-full bg-[#153B6D] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm">
                    Hackathon
                  </Badge>
                  <div className="space-y-4">
                    <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                      Hackathon Impact de X-HEC
                    </h1>
                    <p className="max-w-xl text-base text-slate-600 sm:text-lg">
                      Samedi 13 décembre · 08:00 – 20:00 · Climate House, Paris.
                    </p>
                  </div>
                </div>
                <Card className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-inner transition group-hover:shadow-lg">
                  <div className="space-y-4 text-slate-700">
                    <p className="text-sm font-medium uppercase tracking-wide text-[#153B6D]">
                      Hackathon Impact de X-HEC
                    </p>
                    <p className="text-sm">
                      Samedi 13 décembre · 08:00 – 20:00 · Climate House, Paris.
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full bg-[#F5B21A] px-5 text-[#153B6D] shadow-sm hover:bg-[#F5B21A]/90"
                    >
                      <span>Nous rejoindre</span>
                    </Button>
                  </div>
                </Card>
              </CardContent>
            </Card>
          </Link>
        </section>

        <LogoCarousel />

        <section id="a-propos" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-sm md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:p-12">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                À propos de nous
              </h2>
              <p className="text-base leading-relaxed text-slate-700">
                Cette association a pour objet de fédérer, d’accompagner et de connecter les acteurs
                engagés dans des projets à impact social et environnemental, en particulier ceux issus
                du Master Entrepreneur X-HEC (École Polytechnique et HEC Paris).
              </p>
              <div className="flex flex-col gap-6 rounded-3xl border border-[#153B6D]/10 bg-[#153B6D]/5 p-6 text-slate-800 shadow-inner">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#153B6D]">
                  Mot du Président
                </p>
                <blockquote className="mt-3 text-base leading-relaxed">
                  Bienvenue à toutes et tous. Nous sommes convaincus que chaque idée audacieuse peut se
                  transformer en action concrète et créer un impact durable.
                </blockquote>
                <div className="flex w-full items-center justify-center">
                  <Image
                    src="/assets/social-environmental.jpg"
                    alt="Étudiants travaillant sur un projet à impact social et environnemental"
                    width={240}
                    height={130}
                    className="h-auto w-40 object-contain sm:w-48"
                  />
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-inner">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {teamFaces.map((member) => (
                  <div key={member.src} className="flex items-center justify-center">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
                      <Image
                        src={member.src}
                        alt={member.name}
                        width={96}
                        height={96}
                        className={`h-full w-full object-cover ${member.className ?? ""}`}
                        sizes="96px"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
