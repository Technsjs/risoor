import { site } from "@/lib/site";

export function AdeFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0f0f0f] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <a href="/" className="text-sm font-semibold text-white">
            {site.name}
          </a>
          <div className="flex flex-wrap gap-5 text-xs text-[var(--ade-muted)]">
            <a href="/web" className="hover:text-white">
              Web
            </a>
            <a href="/mobile" className="hover:text-white">
              Mobile
            </a>
            <a href="/learn" className="hover:text-white">
              Learn
            </a>
            <a href="/#work" className="hover:text-white">
              Work
            </a>
            <a href="/#contact" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            &copy; 2026 {site.name}. Custom software · Web · Android · iOS
          </p>
          <div className="flex flex-wrap gap-5 text-xs text-white/40">
            <a href="/privacy" className="hover:text-white">
              Privacy
            </a>
            <a href="/terms" className="hover:text-white">
              Terms
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
