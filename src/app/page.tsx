import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogoCarousel } from "@/components/logo-carousel";

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
                      Hackathon Impact à HEC
                    </h1>
                    <p className="max-w-xl text-base text-slate-600 sm:text-lg">
                      Samedi 13 décembre · 08:00 – 20:00 · Climate House, Paris.
                    </p>
                  </div>
                </div>
                <Card className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-inner transition group-hover:shadow-lg">
                  <div className="space-y-4 text-slate-700">
                    <p className="text-sm font-medium uppercase tracking-wide text-[#153B6D]">
                      Hackathon Impact à HEC
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
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                À propos de nous
              </h2>
              <p className="text-base leading-relaxed text-slate-700">
                Cette association a pour objet de fédérer, d’accompagner et de connecter les acteurs
                engagés dans des projets à impact social et environnemental, en particulier ceux issus
                du Master Entrepreneur X-HEC (École Polytechnique et HEC Paris).
              </p>
              <div className="rounded-3xl border border-[#153B6D]/10 bg-[#153B6D]/5 p-6 text-slate-800 shadow-inner">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#153B6D]">
                  Mot du Président
                </p>
                <blockquote className="mt-3 text-base leading-relaxed">
                  Bienvenue à toutes et tous. Nous sommes convaincus que chaque idée audacieuse peut se
                  transformer en action concrète et créer un impact durable.
                </blockquote>
              </div>
            </div>
            <div className="relative h-72 w-full overflow-hidden rounded-3xl md:h-full">
              <Image
                src="/assets/hec-fond.jpeg"
                alt="Façade du campus HEC au crépuscule"
                fill
                sizes="(min-width: 768px) 480px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
