import { Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#0f2948] bg-[#153B6D] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-4 py-6 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
        <span className="text-sm font-medium uppercase tracking-wide text-white/90">
          Contactez-nous
        </span>
        <a
          href="mailto:aymeric.desbazeille@hec.edu"
          className="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B21A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#153B6D]"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          <span>aymeric.desbazeille@hec.edu</span>
        </a>
      </div>
    </footer>
  );
}
