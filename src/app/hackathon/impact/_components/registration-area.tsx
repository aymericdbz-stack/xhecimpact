"use client";

import { useState } from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRemainingSeats } from "@/hooks/use-remaining-seats";

import { RegistrationForm } from "./registration-form";

interface RegistrationAreaProps {
  eventSlug: string;
  totalSeats: number;
  initialCount: number;
}

const details = [
  {
    icon: CalendarDays,
    label: "Date",
    value: "Samedi 13 décembre 2025",
  },
  {
    icon: Clock,
    label: "Heure",
    value: "08:00 – 20:00",
  },
  {
    icon: MapPin,
    label: "Lieu",
    value: "Climate House, Paris",
  },
];

export function RegistrationArea({ eventSlug, totalSeats, initialCount }: RegistrationAreaProps) {
  const [formVisible, setFormVisible] = useState(false);
  const { remainingSeats, currentCount, setCount } = useRemainingSeats({
    eventSlug,
    totalSeats,
    initialCount,
  });

  const handleSuccess = (nextCount: number) => {
    setCount(nextCount);
  };

  return (
    <>
      <Card className="rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg font-semibold text-slate-900">Participants</CardTitle>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Places restantes :</span>
            <Badge className="rounded-full bg-[#F5B21A] px-3 py-1 text-xs font-semibold text-[#153B6D]">
              {remainingSeats}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-end justify-between rounded-2xl border border-[#153B6D]/10 bg-[#153B6D]/5 px-4 py-3">
            <p className="text-sm font-medium text-slate-600">Participants inscrits</p>
            <span className="flex items-baseline gap-2 text-[#153B6D]">
              <span className="text-3xl font-semibold leading-none">{currentCount}</span>
              <span className="text-sm font-medium text-slate-500">
                inscrit{currentCount > 1 ? "s" : ""}
              </span>
            </span>
          </div>
          <Separator className="bg-slate-200" />
          <p className="text-sm leading-relaxed text-slate-700">
            Nous accueillons des étudiants de toutes disciplines. Apportez votre curiosité, votre énergie créative
            et votre envie de prototyper des idées audacieuses.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-lg shadow-[#153B6D0d]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg font-semibold text-slate-900">Détails de l’événement</CardTitle>
          <p className="text-sm text-slate-600">
            Samedi 13 décembre · 08:00 – 20:00 · Climate House, Paris.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="space-y-4 text-sm text-slate-700">
            {details.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#153B6D]/10 text-[#153B6D]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
                  <p className="font-medium text-slate-800">{value}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-4 rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-inner">
            {!formVisible && (
              <Button
                onClick={() => setFormVisible(true)}
                className="w-full rounded-full bg-[#153B6D] text-white hover:bg-[#153B6D]/90 focus-visible:ring-[#153B6D]"
              >
                Inscris-toi
              </Button>
            )}
            {formVisible && <RegistrationForm eventSlug={eventSlug} onSuccess={handleSuccess} />}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
