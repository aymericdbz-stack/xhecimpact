import { NextResponse } from "next/server";

import { getSubscriptionCount } from "@/lib/supabase/admin";

const EVENT_SLUG = "impact-hackathon-13-dec";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("eventSlug") ?? EVENT_SLUG;

    if (slug !== EVENT_SLUG) {
      return NextResponse.json({ message: "Événement inconnu." }, { status: 400 });
    }

    const count = await getSubscriptionCount(slug);

    return NextResponse.json({ count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Impossible de récupérer les places restantes." }, { status: 500 });
  }
}
