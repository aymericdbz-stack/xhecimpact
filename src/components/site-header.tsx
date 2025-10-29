import Link from "next/link";

import { HeaderAuthMenu } from "@/components/site-header/header-auth-menu";
import { NavLinks } from "@/components/site-header/nav-links";

const navigation = [
  { label: "home", href: "/" },
  { label: "impact hackathon", href: "/hackathon/impact" },
  { label: "applications", href: "/account/applications" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="font-semibold lowercase tracking-tight text-lg">
          x-hec impact
        </Link>
        <NavLinks items={navigation} />
        <HeaderAuthMenu />
      </div>
    </header>
  );
}
