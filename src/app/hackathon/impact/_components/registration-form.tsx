"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { countWords, registrationSchema, type RegistrationSchema } from "../schema";

interface RegistrationFormProps {
  eventSlug: string;
  onSuccess: (nextCount: number) => void;
}

export function RegistrationForm({ eventSlug, onSuccess }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const form = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      profile: "tech",
      motivation: "",
    },
  });

  const motivationValue = form.watch("motivation");
  const wordCount = useMemo(() => countWords(motivationValue ?? ""), [motivationValue]);
  const remainingWords = Math.max(0, 100 - wordCount);

  const handleSubmit = async (values: RegistrationSchema) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventSlug,
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim().toLowerCase(),
          profile: values.profile,
          motivation: values.motivation.trim(),
        }),
      });

      if (response.status === 409) {
        const conflictData = await response.json().catch(() => null);
        if (conflictData && typeof conflictData.count === "number") {
          onSuccess(conflictData.count);
        }
        toast("Cette adresse email est déjà enregistrée pour cet événement.");
        setIsComplete(true);
        return;
      }

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message ?? "Une erreur inattendue est survenue.");
      }

      const data = (await response.json()) as { ok: boolean; count: number };
      if (!data.ok) {
        throw new Error("Réponse invalide du serveur.");
      }

      onSuccess(data.count);
      setIsComplete(true);
      toast("Candidature reçue.");
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Impossible d’envoyer votre candidature.";
      toast("Erreur lors de l’envoi.", { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-800 shadow-inner">
        <p className="text-lg font-semibold">Candidature reçue.</p>
        <p className="mt-2 text-sm">
          Merci ! Nous reviendrons vers vous après l’étude de votre demande. Le délai moyen est de trois jours ouvrés.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Camille" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Durand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="prenom.nom@hec.edu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer l’Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Confirmez votre email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="profile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profil</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un profil" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="motivation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivation</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder="Partagez vos motivations en 100 mots maximum." {...field} />
              </FormControl>
              <div className="text-xs text-slate-600">
                100 mots maximum. Il reste {remainingWords} mots.
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-[#153B6D] text-white hover:bg-[#153B6D]/90 focus-visible:ring-[#153B6D]"
        >
          {isSubmitting ? "Envoi en cours..." : "Postuler maintenant"}
        </Button>
      </form>
    </Form>
  );
}
