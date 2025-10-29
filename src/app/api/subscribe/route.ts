import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

import { applicationSchema } from "@/app/hackathon/impact/schema";

const EVENT_SLUG = "impact-hackathon-13-dec";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ message: "authentication required" }, { status: 401 });
  }

  const emailVerified = Boolean(
    user.email_confirmed_at ||
      user.identities?.some((identity) => identity.provider === "email" && identity.last_sign_in_at),
  );

  if (!emailVerified) {
    return NextResponse.json({ message: "please verify your email before applying" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ message: "invalid request payload" }, { status: 400 });
  }

  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json({ message: firstIssue?.message ?? "invalid form data" }, { status: 400 });
  }

  const data = parsed.data;

  if (data.email.toLowerCase() !== (user.email ?? "").toLowerCase()) {
    return NextResponse.json({ message: "email does not match authenticated user" }, { status: 400 });
  }

  const { data: existing } = await supabase
    .from("subscription")
    .select("id")
    .eq("user_id", user.id)
    .eq("event_slug", EVENT_SLUG)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ message: "application already submitted" }, { status: 409 });
  }

  const { error } = await supabase.from("subscription").insert({
    user_id: user.id,
    event_slug: EVENT_SLUG,
    first_name: data.firstName.trim(),
    last_name: data.lastName.trim(),
    email: user.email,
    profile: data.profile,
    motivation: data.motivation.trim(),
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "application saved" }, { status: 200 });
}
