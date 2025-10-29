"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { CheckCircle2, MailWarning } from "lucide-react";

import { MagicLinkButton } from "@/components/auth/magic-link-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import type { Subscription } from "@/types/subscription";

import { ApplicationForm } from "./application-form";

interface ApplyFormPanelProps {
  isSignedIn: boolean;
  emailVerified: boolean;
  email: string;
  defaultFirstName: string;
  defaultLastName: string;
  existingApplication: Subscription | null;
}

export function ApplyFormPanel({
  isSignedIn,
  emailVerified,
  email,
  defaultFirstName,
  defaultLastName,
  existingApplication,
}: ApplyFormPanelProps) {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const [hasSubmitted, setHasSubmitted] = useState(Boolean(existingApplication));
  const [isResending, setIsResending] = useState(false);

  const handleSuccess = () => {
    setHasSubmitted(true);
    toast("application received", {
      description: "we will get back to you with next steps soon",
    });
    router.refresh();
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      const { error } = await supabaseClient.auth.resend({
        type: "signup",
        email,
      });

      if (error) {
        toast("could not send verification", { description: error.message });
        return;
      }

      toast("verification email sent", {
        description: "check your inbox to confirm your address",
      });
    } finally {
      setIsResending(false);
    }
  };

  if (!isSignedIn) {
    return (
      <Card className="rounded-2xl border-border/60 bg-muted/60">
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="space-y-1 text-sm">
            <p className="font-medium text-foreground">sign in to apply</p>
            <p className="text-muted-foreground">
              use your student email to receive a magic link and unlock the one-click form.
            </p>
          </div>
          <MagicLinkButton
            size="sm"
            className="rounded-full"
            label="sign in to apply"
            title="sign in to apply"
            description="we will send a one-time link to your inbox"
            analyticsContext="apply-card"
          />
        </CardContent>
      </Card>
    );
  }

  if (!emailVerified) {
    return (
      <Card className="rounded-2xl border-destructive/40 bg-destructive/5">
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="flex items-start gap-3 text-sm">
            <MailWarning className="mt-0.5 h-5 w-5 text-destructive" aria-hidden="true" />
            <div className="space-y-1">
              <p className="font-medium text-foreground">verify your email to continue</p>
              <p className="text-muted-foreground">
                confirm the email address you used to sign up. resend the verification email if you cannot find it.
              </p>
            </div>
          </div>
          <Button
            onClick={handleResendVerification}
            disabled={isResending}
            className="w-full rounded-full"
            variant="outline"
          >
            {isResending ? "sending..." : "resend verification email"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (hasSubmitted && existingApplication) {
    const submittedAt = new Date(existingApplication.created_at)
      .toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .toLowerCase();

    return (
      <Card className="rounded-2xl border-emerald-500/20 bg-emerald-500/10">
        <CardContent className="flex items-start gap-3 p-5">
          <CheckCircle2 className="mt-0.5 h-6 w-6 text-emerald-600" aria-hidden="true" />
          <div className="space-y-1 text-sm">
            <p className="font-medium text-foreground">application received</p>
            <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
              <span>submitted</span>
              <Badge variant="secondary" className="lowercase">
                {submittedAt}
              </Badge>
              {existingApplication.status && (
                <Badge variant="outline" className="lowercase">
                  {existingApplication.status}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              we will notify you by email once selections are confirmed. reach out if you need to update your details.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <ApplicationForm
      email={email}
      defaultFirstName={defaultFirstName}
      defaultLastName={defaultLastName}
      onSuccess={handleSuccess}
    />
  );
}
