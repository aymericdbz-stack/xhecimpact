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
  hasTeam: z.boolean(),
  teamMembers: z.string().trim().nullable().optional(),
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
    const normalizedTeamMembers = data.hasTeam ? (data.teamMembers ?? "").trim() : null;

    if (data.hasTeam && (!normalizedTeamMembers || normalizedTeamMembers.length === 0)) {
      return NextResponse.json(
        { message: "Merci d’indiquer les membres de votre équipe." },
        { status: 400 },
      );
    }

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
      has_team: data.hasTeam,
      team_members: normalizedTeamMembers,
      motivation: trimmedMotivation,
    });

    if (insertError) {
      console.error(insertError);
      return NextResponse.json({ message: "Impossible d’enregistrer la candidature." }, { status: 500 });
    }

    const count = await getSubscriptionCount(eventSlug);

    const applicantName = `${data.firstName} ${data.lastName}`.trim();
    const mirrorUrl =
      process.env.SITE_PUBLIC_URL ??
      "https://x-hec-impact.fr/hackathon/impact";

    const textContent =
      "Merci ! Votre inscription au Hackathon Impact est confirmée : rendez-vous samedi 13 décembre de 08:00 à 20:00 à la Climate House, Paris.";

    const htmlContent = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />

  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif&family=Open+Sans&family=Roboto&family=Inter&family=Inter+Tight" rel="stylesheet" />
  <style>
    body,table,td,a{ -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td{ mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img{ -ms-interpolation-mode:bicubic; display:block; border:0; outline:none; text-decoration:none; }
    body{ margin:0; padding:0; width:100% !important; -webkit-font-smoothing:antialiased; }

    .email-wrapper{ width:100%; background-color:#ffffff; padding:0; margin:0; }
    .email-center{ max-width:600px; margin:0 auto; }

    .paragraph {
      color:#414141;
      font-family:Arial, Helvetica, sans-serif;
      font-size:16px;
      line-height:1.5;
      margin:0 0 16px 0;
      text-align:center;
    }

    .highlighted {
      font-size:18px;
      font-weight:bold;
      text-align:center;
      color:#414141;
    }

    .h2 {
      color:#414141;
      font-family:Arial, Helvetica, sans-serif;
      font-size:32px;
      margin:0 0 12px 0;
      line-height:1.1;
      text-align:center;
    }

    a.text-link { color:#666666; text-decoration:underline; }

    .btn {
      display:inline-block;
      text-decoration:none;
      background-color:#666666;
      color:#ffffff;
      border-radius:4px;
      padding:12px 18px;
      font-family:Arial, Helvetica, sans-serif;
      font-size:16px;
      line-height:1;
      border:0;
    }

    .footer-text {
      color:#666666;
      font-size:14px;
      font-family:Arial, Helvetica, sans-serif;
      margin:0 0 6px 0;
    }

    @media only screen and (max-width: 520px) {
      .email-center { width:100% !important; padding-left:10px !important; padding-right:10px !important; }
      .h2 { font-size:24px !important; }
      .paragraph { font-size:15px !important; text-align:center !important; }
      .btn { width:100% !important; box-sizing:border-box; text-align:center !important; display:block; padding-left:10px; padding-right:10px; }
      .logo { max-width:200px !important; height:auto !important; }
    }
  </style>
</head>
<body class="email-wrapper" style="background:#ffffff;">

  <center>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-center" style="max-width:600px; margin:0 auto;">
      <tr>
        <td style="padding:5px 30px; text-align:center;">
          <p style="margin:0; font-family: Arial, Helvetica, sans-serif; font-size:12px; color:#858588;">
            <a class="text-link" href="${mirrorUrl}" target="_blank" style="color:#858588; text-decoration:underline;">Afficher dans le navigateur</a>
          </p>
        </td>
      </tr>

      <tr>
        <td align="center" style="padding:20px 30px 10px 30px;">
          <img src="https://img.mailinblue.com/10072574/images/content_library/original/6903829a4d7cc2e53b6cbeb7.jpeg"
               alt="Logo" width="200" style="display:block; border:0; outline:none; text-decoration:none;" class="logo" />
        </td>
      </tr>

      <tr>
        <td style="padding:20px 30px 10px 30px;">
          <h2 class="h2" style="font-weight:700;">Votre inscription est bien validée&nbsp;!</h2>
        </td>
      </tr>

      <tr>
        <td style="padding:0 30px;">
          <div style="padding-top:10px; padding-bottom:10px; text-align:center;">
            <p class="paragraph">Nous sommes ravis de vous compter parmi nous le <strong>samedi 13 décembre</strong> !</p>

            <p class="paragraph">Un petit rappel du sujet sur lequel vous aurez la chance de travailler :</p>

            <p class="highlighted">Quels moyens éducatifs pour inciter à l’action environnementale&nbsp;?</p>

            <p class="paragraph">On compte sur vous pour former des équipes de 4 variant les profils.</p>
          </div>
        </td>
      </tr>

      <tr>
        <td style="padding:10px 30px 24px 30px; text-align:center;">
          <a href="https://drive.google.com/file/d/13G9ftZBJWo3-GZG0UpqnzVBymhwbkd1T/view?usp=sharing"
             target="_blank" class="btn" style="background-color:#222222; color:#ffffff; border-radius:4px; padding:12px 18px; font-family:Arial, Helvetica, sans-serif; text-decoration:none; display:inline-block;">
             Ajouter le hackathon à votre calendrier
          </a>
        </td>
      </tr>

      <tr>
        <td style="padding:0 30px 20px 30px;">
          <p class="paragraph">N'hésitez pas à nous contacter à la moindre question.</p>
        </td>
      </tr>

      <!-- Footer sans logo -->
      <tr>
        <td style="padding:10px 30px 30px 30px; border-top:1px solid #e6e6e6; text-align:center;">
          <p style="margin:0 0 6px 0; font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#000000;">
            Cordialement,
          </p>
          <p style="margin:0 0 10px 0; font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#000000;">
            <strong>L'équipe X-HEC Impact</strong>
          </p>

          <p class="footer-text" style="margin:0;">X-HEC Impact</p>
          <p class="footer-text" style="margin:6px 0 0 0;">1 Rue de la Libération, 78350 Jouy-en-Josas</p>
        </td>
      </tr>

    </table>
  </center>

</body>
</html>`;

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
