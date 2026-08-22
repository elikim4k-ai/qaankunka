"use client";

import { useState, FormEvent } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setState("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          category: data.get("category"),
          message: data.get("message"),
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

  if (state === "success") {
    return (
      <div className="rounded-xl border border-accent-cyan/30 bg-accent-cyan/5 p-8 text-center">
        <h3 className="text-lg font-semibold text-text-primary">Message received</h3>
        <p className="mt-2 text-sm text-text-secondary">
          Thank you for your interest in Qaankunka. We will review your enquiry and respond accordingly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-busy={state === "submitting"}>
      {state === "error" && (
        <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Something went wrong while sending your message. Please try again, or reach out via email instead.
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-cyan/50 focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-cyan/50 focus:outline-none"
            placeholder="you@organisation.com"
          />
        </div>
      </div>

      <div className="absolute h-px w-px overflow-hidden whitespace-nowrap" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          type="text"
          id="companyWebsite"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="category" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
          Enquiry Category
        </label>
        <select
          id="category"
          name="category"
          required
          className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-sm text-text-primary focus:border-accent-cyan/50 focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="quantum-research">Quantum research</option>
          <option value="qml">QML collaboration</option>
          <option value="ai">AI collaboration</option>
          <option value="agentic">Agentic systems</option>
          <option value="creative">Creative technology</option>
          <option value="tech-partnership">Technology partnerships</option>
          <option value="research-partnership">Research partnerships</option>
          <option value="business">Business enquiries</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-y rounded-lg border border-border bg-bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-cyan/50 focus:outline-none"
          placeholder="Tell us about your interest in Quantum + AI visual intelligence..."
        />
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-lg border border-accent-cyan/40 bg-accent-cyan/15 px-6 py-3 text-sm font-medium text-accent-cyan transition-all hover:border-accent-cyan/60 hover:bg-accent-cyan/25 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {state === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
