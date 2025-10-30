import { NextResponse } from "next/server";
import { z } from "zod";

import { sendBrevoEmail } from "@/lib/brevo";

const contactSchema = z.object({
  email: z.string().trim().email(),
});

const RECIPIENT_EMAIL = "aymeric.desbazeille@hec.edu";

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);

    if (!payload) {
      return NextResponse.json({ message: "Requête invalide." }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ message: "Merci de fournir un email valide." }, { status: 400 });
    }

    const visitorEmail = parsed.data.email.toLowerCase();

    await sendBrevoEmail({
      to: [{ email: RECIPIENT_EMAIL, name: "X-HEC Impact" }],
      subject: "Nouveau message – Contactez-nous",
      textContent: `Nouvelle demande de contact depuis le site x-hec impact.\nAdresse email : ${visitorEmail}`,
      htmlContent: `<p>Nouvelle demande de contact depuis le site x-hec impact.</p><p><strong>Email :</strong> ${visitorEmail}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Impossible d’envoyer le message pour le moment." },
      { status: 500 },
    );
  }
}
