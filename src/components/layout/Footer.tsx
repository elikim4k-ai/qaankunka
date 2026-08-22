import Link from "next/link";
import { footerLinks, siteConfig } from "@/data/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="container-wide section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link
              href="/"
              className="flex items-center gap-3 font-mono text-sm font-semibold tracking-[0.2em] text-text-primary"
            >
              <Logo size={28} />
              <span>QAANKUNKA</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-accent-cyan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Focus
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>Quantum Machine Learning</li>
              <li>Quantum Optimization</li>
              <li>Agentic Orchestration</li>
              <li>Visual Intelligence</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Qaankunka. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Quantum + AI technology for imagery and video.
          </p>
        </div>
      </div>
    </footer>
  );
}
