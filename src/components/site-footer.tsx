"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = email.trim();

    if (!trimmed) {
      toast("Veuillez saisir un email.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l’envoi");
        }

        toast("Message envoyé.");
        setEmail("");
      } catch (error) {
        console.error(error);
        toast("Impossible d’envoyer le message.", {
          description: "Réessayez dans quelques instants.",
        });
      }
    });
  };

  return (
    <footer className="mt-auto border-t border-[#0f2948] bg-[#153B6D] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:gap-6 sm:px-6">
        <span className="text-sm font-medium uppercase tracking-wide text-white/90">
          Contactez-nous
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md items-center gap-2"
          noValidate
        >
          <Input
            type="email"
            name="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-10 rounded-full border-white/40 bg-white/10 text-white placeholder:text-white/70 focus-visible:ring-[#F5B21A]"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="h-10 rounded-full bg-[#F5B21A] px-4 text-sm font-semibold text-[#153B6D] hover:bg-[#F5B21A]/90 focus-visible:ring-[#F5B21A]"
          >
            {isPending ? "Envoi..." : "Envoyer"}
          </Button>
        </form>
      </div>
    </footer>
  );
}
