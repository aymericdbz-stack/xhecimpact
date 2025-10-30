import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center">
          <Image
            src="/assets/capture-1.png"
            alt="Logo X-HEC Impact"
            width={638}
            height={391}
            className="h-12 w-auto object-contain transition group-hover:opacity-90"
            priority
          />
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
