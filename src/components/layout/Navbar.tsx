"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "@/data/site";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border/60 bg-bg-primary/75 backdrop-blur-2xl">
      <nav
        className="container-wide flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-3 font-mono text-[13px] font-semibold tracking-[0.24em] text-text-primary transition-colors hover:text-accent-cyan"
        >
          <Logo size={28} />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-2 text-sm transition-colors hover:text-text-primary ${
                pathname === item.href ? "text-text-primary" : "text-text-secondary"
              }`}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute right-0 bottom-0 left-0 h-px bg-accent-cyan" aria-hidden="true" />
              )}
            </Link>
          ))}
          <Link
            href="/contact"
            className="border border-accent-cyan/50 px-4 py-2 text-sm font-medium text-accent-cyan transition-all hover:bg-accent-cyan hover:text-bg-primary"
          >
            Connect
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-border md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          <svg
            className="h-5 w-5 text-text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border/50 bg-bg-primary/95 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-l px-3 py-2.5 text-sm transition-colors ${
                    pathname === item.href
                      ? "border-accent-cyan bg-accent-cyan/5 text-text-primary"
                      : "border-transparent text-text-secondary hover:border-border-accent hover:bg-bg-elevated hover:text-text-primary"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-3 border border-accent-cyan/50 bg-accent-cyan px-3 py-2.5 text-center text-sm font-semibold text-bg-primary"
                onClick={() => setMobileOpen(false)}
              >
                Connect
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
