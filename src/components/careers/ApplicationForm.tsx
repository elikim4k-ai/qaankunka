"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { jobPostings } from "@/data/careers";

type FormState = "idle" | "submitting" | "success" | "error";

export function ApplicationForm() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const [selectedRole, setSelectedRole] = useState<string>(
    jobPostings.some((job) => job.id === roleParam) ? (roleParam as string) : (jobPostings[0]?.id ?? "")
  );
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    setState("submitting");
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          roleId: data.get("roleId"),
          motivation: data.get("motivation"),
          projects: data.get("projects"),
          location: data.get("location"),
          links: data.get("links"),
          companyWebsite: data.get("companyWebsite"),
        }),
      });
      if (!response.ok) {
        setState("error");
        return;
      }
      setState("success");
    } catch {
      setState("error");
    }
  };

  const selectedJob = jobPostings.find((job) => job.id === selectedRole);

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/careers"
        className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent-cyan"
      >
        <span aria-hidden="true">←</span> Back to open positions
      </Link>

      <div className="mt-6 rounded-xl border border-border bg-bg-card p-6 sm:p-8">
        {selectedJob && (
          <p className="font-mono text-xs uppercase tracking-wider text-accent-cyan">
            {selectedJob.title} — {selectedJob.location}
          </p>
        )}
        <h2 className="mt-2 text-lg font-semibold text-text-primary">Apply</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Tell us about yourself. Applications are sent directly to the Qaankunka team.
        </p>

        {state === "success" ? (
          <div className="mt-6 rounded-xl border border-accent-cyan/30 bg-accent-cyan/5 p-6 text-center">
            <h3 className="text-base font-semibold text-text-primary">Application received</h3>
            <p className="mt-2 text-sm text-text-secondary">
              Thank you for applying to Qaankunka. We will review your application and respond accordingly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5" aria-busy={state === "submitting"}>
            {state === "error" && (
              <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                Something went wrong while submitting your application. Please try again.
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="apply-name" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
                  Full Name
                </label>
                <input
                  type="text"
                  id="apply-name"
                  name="name"
                  required
                  maxLength={200}
                  className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-cyan/50 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="apply-email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
                  Email
                </label>
                <input
                  type="email"
                  id="apply-email"
                  name="email"
                  required
                  maxLength={200}
                  className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-cyan/50 focus:outline-none"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="apply-role" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
                Role
              </label>
              <select
                id="apply-role"
                name="roleId"
                required
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-text-primary focus:border-accent-cyan/50 focus:outline-none"
              >
                {jobPostings.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title} — {job.location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="apply-motivation" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
                Why are you applying to this role?
              </label>
              <textarea
                id="apply-motivation"
                name="motivation"
                required
                rows={4}
                maxLength={5000}
                className="w-full resize-y rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-cyan/50 focus:outline-none"
                placeholder="What draws you to this role and to Qaankunka?"
              />
            </div>

            <div>
              <label htmlFor="apply-projects" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
                What are some related projects you&apos;ve done?
              </label>
              <textarea
                id="apply-projects"
                name="projects"
                required
                rows={4}
                maxLength={5000}
                className="w-full resize-y rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-cyan/50 focus:outline-none"
                placeholder="Describe relevant projects, research, or work experience."
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="apply-location" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
                  Where do you currently reside?
                </label>
                <input
                  type="text"
                  id="apply-location"
                  name="location"
                  required
                  maxLength={200}
                  className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-cyan/50 focus:outline-none"
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label htmlFor="apply-links" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
                  Portfolio / LinkedIn (optional)
                </label>
                <input
                  type="text"
                  id="apply-links"
                  name="links"
                  maxLength={500}
                  className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-cyan/50 focus:outline-none"
                  placeholder="Links to your work"
                />
              </div>
            </div>

            <div className="absolute h-px w-px overflow-hidden whitespace-nowrap" aria-hidden="true">
              <label htmlFor="apply-companyWebsite">Company website</label>
              <input type="text" id="apply-companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
            </div>

            <button
              type="submit"
              disabled={state === "submitting"}
              className="w-full rounded-lg border border-accent-cyan/40 bg-accent-cyan/15 px-6 py-3 text-sm font-medium text-accent-cyan transition-all hover:border-accent-cyan/60 hover:bg-accent-cyan/25 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {state === "submitting" ? "Submitting…" : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
