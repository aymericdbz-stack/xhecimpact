"use client";

import { type ComponentPropsWithoutRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const magicLinkSchema = z.object({
  email: z.string().min(1, "email is required").email("enter a valid email"),
});

type MagicLinkValues = z.infer<typeof magicLinkSchema>;

type ButtonLikeProps = ComponentPropsWithoutRef<typeof Button>;

interface MagicLinkButtonProps extends ButtonLikeProps {
  label?: string;
  title?: string;
  description?: string;
  successMessage?: string;
  analyticsContext?: string;
}

export function MagicLinkButton({
  label = "sign in",
  title = "sign in",
  description = "receive a magic link in your inbox to continue",
  successMessage = "we sent you a magic link",
  analyticsContext,
  ...buttonProps
}: MagicLinkButtonProps) {
  const supabaseClient = useSupabaseClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<MagicLinkValues>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: { email: "" },
  });

  const handleSubmit = async (values: MagicLinkValues) => {
    setIsSubmitting(true);
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL;
      const emailRedirectTo = origin ? `${origin}/auth/callback` : undefined;

      const { error } = await supabaseClient.auth.signInWithOtp({
        email: values.email,
        options: {
          emailRedirectTo,
          shouldCreateUser: true,
          data: analyticsContext ? { context: analyticsContext } : undefined,
        },
      });

      if (error) {
        toast("unable to send link", { description: error.message });
        return;
      }

      toast(successMessage, {
        description: "check your inbox to finish signing in",
      });
      form.reset();
      setOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button {...buttonProps}>{label}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="lowercase">{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="magic-link-email">email</Label>
                  <FormControl>
                    <Input
                      id="magic-link-email"
                      type="email"
                      placeholder="you@email.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting} className="rounded-full">
                {isSubmitting ? "sending..." : "send magic link"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
