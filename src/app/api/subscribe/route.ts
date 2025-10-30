import { NextResponse } from "next/server";
import { z } from "zod";

import { countWords, profiles } from "@/app/hackathon/impact/schema";
import { sendBrevoEmail } from "@/lib/brevo";
import { createSupabaseAdminClient, getSubscriptionCount } from "@/lib/supabase/admin";

const EVENT_SLUG = "impact-hackathon-13-dec";

const requestSchema = z.object({
  eventSlug: z.string().optional(),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().trim().email(),
  profile: z.enum(profiles),
  motivation: z.string().trim().min(1),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);

    if (!payload) {
      return NextResponse.json({ message: "Requête invalide." }, { status: 400 });
    }

    const parsed = requestSchema.safeParse(payload);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues.at(0);
      return NextResponse.json(
        { message: firstIssue?.message ?? "Les données sont invalides." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const eventSlug = data.eventSlug ?? EVENT_SLUG;

    if (eventSlug !== EVENT_SLUG) {
      return NextResponse.json({ message: "Événement inconnu." }, { status: 400 });
    }

    const trimmedMotivation = data.motivation.trim();

    if (countWords(trimmedMotivation) > 100) {
      return NextResponse.json({ message: "La motivation doit contenir au maximum 100 mots." }, { status: 400 });
    }

    const adminClient = createSupabaseAdminClient();
    const normalizedEmail = data.email.toLowerCase();

    const { data: existing, error: existingError } = await adminClient
      .from("subscription")
      .select("id")
      .eq("event_slug", eventSlug)
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existingError) {
      console.error(existingError);
      return NextResponse.json({ message: "Erreur lors de la vérification de l’inscription." }, { status: 500 });
    }

    if (existing) {
      const count = await getSubscriptionCount(eventSlug);
      return NextResponse.json({ ok: false, count }, { status: 409 });
    }

    const { error: insertError } = await adminClient.from("subscription").insert({
      event_slug: eventSlug,
      first_name: data.firstName.trim(),
      last_name: data.lastName.trim(),
      email: normalizedEmail,
      profile: data.profile,
      motivation: trimmedMotivation,
    });

    if (insertError) {
      console.error(insertError);
      return NextResponse.json({ message: "Impossible d’enregistrer la candidature." }, { status: 500 });
    }

    const count = await getSubscriptionCount(eventSlug);

    const applicantName = `${data.firstName} ${data.lastName}`.trim();
    const textContent =
      "Merci ! Nous avons bien reçu votre demande d’inscription. Vous recevrez un email de validation. Le délai moyen est de 3 jours pour savoir si l’inscription est validée par les organisateurs.";
    const htmlContent = `
      <p>Bonjour ${data.firstName.trim()} 👋</p>
      <p>Merci ! Nous avons bien reçu votre demande d’inscription au Hackathon Impact.</p>
      <p>Notre équipe vous enverra un email de confirmation sous 3 jours ouvrés pour valider votre participation.</p>
      <hr />
      <p><strong>Résumé de votre candidature :</strong></p>
      <ul>
        <li>Prénom : ${data.firstName.trim()}</li>
        <li>Nom : ${data.lastName.trim()}</li>
        <li>Email : ${normalizedEmail}</li>
        <li>Profil : ${data.profile}</li>
      </ul>
      <p style="margin-top:16px;">À très vite,<br/>L’équipe x-hec impact</p>
    `;

    await sendBrevoEmail({
      to: [{ email: normalizedEmail, name: applicantName }],
      subject: "Confirmation de demande d’inscription – Hackathon Impact",
      textContent,
      htmlContent,
    });

    return NextResponse.json({ ok: true, count });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erreur inattendue lors du traitement de la candidature." },
      { status: 500 },
    );
  }
}
