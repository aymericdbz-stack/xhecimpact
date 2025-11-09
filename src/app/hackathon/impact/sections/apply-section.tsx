import type { User } from "@supabase/supabase-js";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Subscription } from "@/types/subscription";
import { ApplyFormPanel } from "./apply-form-panel";

interface ApplySectionProps {
  user: User | null;
  emailVerified: boolean;
  existingApplication: Subscription | null;
}

const eventDetails = [
  {
    icon: CalendarDays,
    label: "date",
    value: "saturday 13 december 2025",
  },
  {
    icon: Clock,
    label: "time",
    value: "14:00 - 18:00",
  },
  {
    icon: MapPin,
    label: "location",
    value: "HEC Paris, Jouy-en-Josas",
  },
];

export function ApplySection({ user, emailVerified, existingApplication }: ApplySectionProps) {
  const firstName = (user?.user_metadata?.first_name as string | undefined) ?? "";
  const lastName = (user?.user_metadata?.last_name as string | undefined) ?? "";

  return (
    <Card className="sticky top-24 h-fit rounded-3xl border-border/80 bg-background/90 shadow-xl shadow-black/10">
      <CardHeader>
        <CardTitle className="text-lg font-semibold lowercase">event details</CardTitle>
        <CardDescription>
          saturday 13 december · 14:00 - 18:00 · HEC Paris, Jouy-en-Josas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <dl className="space-y-3 text-sm text-muted-foreground">
          {eventDetails.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                <Icon className="h-4 w-4 text-foreground" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground/70">{label}</dt>
                <dd className="text-sm text-foreground">{value}</dd>
              </div>
            </div>
          ))}
        </dl>

        <ApplyFormPanel
          isSignedIn={Boolean(user)}
          email={user?.email ?? ""}
          emailVerified={emailVerified}
          defaultFirstName={firstName}
          defaultLastName={lastName}
          existingApplication={existingApplication}
        />

        <Button variant="outline" asChild className="w-full rounded-full">
          <a href="mailto:impact@masterx-hec.com">contact organizers</a>
        </Button>
      </CardContent>
    </Card>
  );
}
