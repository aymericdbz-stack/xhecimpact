import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
            <Image
              src="/assets/x-hec-impact-logo.png"
              alt=""
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </span>
          <span className="font-semibold lowercase tracking-tight text-lg text-slate-900 transition group-hover:text-slate-700">
            x-hec impact
          </span>
        </Link>
        <Button
          asChild
          size="lg"
          className="rounded-full bg-[#153B6D] px-6 text-base font-semibold text-white shadow-sm hover:bg-[#153B6D]/90 focus-visible:ring-[#153B6D]"
        >
          <Link href="/hackathon/impact">S’inscrire au hackathon</Link>
        </Button>
      </div>
    </header>
  );
}
