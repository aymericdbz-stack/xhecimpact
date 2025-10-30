const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

interface SendBrevoEmailParams {
  to: { email: string; name?: string }[];
  subject: string;
  textContent: string;
  htmlContent?: string;
  replyTo?: { email: string; name?: string };
}

export async function sendBrevoEmail({
  to,
  subject,
  textContent,
  htmlContent,
  replyTo,
}: SendBrevoEmailParams) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME ?? "X-HEC Impact";

  if (!apiKey || !senderEmail) {
    throw new Error("La configuration Brevo est incomplète.");
  }

  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { email: senderEmail, name: senderName },
      to,
      subject,
      textContent,
      htmlContent: htmlContent ?? `<p>${textContent}</p>`,
      replyTo,
    }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.message ?? "Échec de l’envoi de l’email via Brevo.");
  }
}
