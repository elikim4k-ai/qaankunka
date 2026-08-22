import { NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/mailer";
import { categoryLabels } from "@/data/careers";

const VALID_CATEGORIES = new Set([
  "quantum-research",
  "qml",
  "ai",
  "agentic",
  "creative",
  "tech-partnership",
  "research-partnership",
  "business",
]);

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_RATE_LIMIT_ENTRIES = 10_000;
const rateLimitEntries = new Map<string, { count: number; resetAt: number }>();

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  category?: unknown;
  message?: unknown;
  companyWebsite?: unknown;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();

  if (rateLimitEntries.size >= MAX_RATE_LIMIT_ENTRIES) {
    for (const [key, entry] of rateLimitEntries) {
      if (entry.resetAt <= now) rateLimitEntries.delete(key);
    }
    if (rateLimitEntries.size >= MAX_RATE_LIMIT_ENTRIES) rateLimitEntries.clear();
  }

  const entry = rateLimitEntries.get(clientKey);
  if (!entry || entry.resetAt <= now) {
    rateLimitEntries.set(clientKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

export async function POST(request: Request) {
  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(RATE_LIMIT_WINDOW_MS / 1000) } }
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const category = typeof payload.category === "string" ? payload.category : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const companyWebsite =
    typeof payload.companyWebsite === "string" ? payload.companyWebsite.trim() : "";

  // Quietly accept automated submissions caught by the hidden honeypot.
  if (companyWebsite) return NextResponse.json({ ok: true });

  if (!name || name.length > 200) {
    return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (!VALID_CATEGORIES.has(category)) {
    return NextResponse.json({ error: "Please select an enquiry category." }, { status: 400 });
  }
  if (!message || message.length > 5000) {
    return NextResponse.json({ error: "Please provide a message (max 5000 characters)." }, { status: 400 });
  }

  const smtpResult = await sendEnquiryEmail({
    subject: `[Qaankunka] ${categoryLabels[category] ?? category} — ${name}`,
    text:
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Category: ${categoryLabels[category] ?? category}\n\n` +
      `${message}`,
    replyTo: email,
  }).catch((error) => {
    console.error("[contact] Email delivery failed:", error);
    return "failed" as const;
  });

  if (smtpResult === "failed") {
    return NextResponse.json(
      { error: "Your message could not be delivered right now. Please try again later." },
      { status: 502 }
    );
  }
  if (smtpResult === "not-configured") {
    // SMTP credentials are not configured — keep the submission in server logs.
    console.warn(
      `[contact] SMTP not configured; enquiry NOT emailed. Set SMTP_HOST/PORT/USER/PASS in .env.local.\n` +
        `name: ${name}\nemail: ${email}\ncategory: ${category}\nmessage: ${message}`
    );
  } else {
    console.info(`[contact] Enquiry from ${email} forwarded.`);
  }

  return NextResponse.json({ ok: true });
}
