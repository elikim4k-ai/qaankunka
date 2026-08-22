import { NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/mailer";
import { jobPostings } from "@/data/careers";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_RATE_LIMIT_ENTRIES = 10_000;
const rateLimitEntries = new Map<string, { count: number; resetAt: number }>();

interface ApplicationPayload {
  name?: unknown;
  email?: unknown;
  roleId?: unknown;
  motivation?: unknown;
  projects?: unknown;
  location?: unknown;
  links?: unknown;
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

function asString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(RATE_LIMIT_WINDOW_MS / 1000) } }
    );
  }

  let payload: ApplicationPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Quietly accept automated submissions caught by the hidden honeypot.
  if (asString(payload.companyWebsite, 200)) return NextResponse.json({ ok: true });

  const name = asString(payload.name, 200);
  const email = asString(payload.email, 200);
  const roleId = asString(payload.roleId, 100);
  const motivation = asString(payload.motivation, 5000);
  const projects = asString(payload.projects, 5000);
  const location = asString(payload.location, 200);
  const links = asString(payload.links, 500);

  const role = jobPostings.find((job) => job.id === roleId);
  if (!name) return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (!role) {
    return NextResponse.json({ error: "Please select a role." }, { status: 400 });
  }
  if (!motivation) {
    return NextResponse.json({ error: "Please tell us why you are applying." }, { status: 400 });
  }
  if (!projects) {
    return NextResponse.json({ error: "Please describe your related projects." }, { status: 400 });
  }
  if (!location) {
    return NextResponse.json({ error: "Please tell us where you currently reside." }, { status: 400 });
  }

  const text =
    `Role: ${role.title} (${role.location})\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Current location: ${location}\n` +
    (links ? `Links: ${links}\n` : "") +
    `\nWhy are you applying to this role?\n${motivation}\n` +
    `\nRelated projects:\n${projects}\n`;

  try {
    const result = await sendEnquiryEmail({
      subject: `[Qaankunka Careers] ${role.title} (${role.location}) — ${name}`,
      text,
      replyTo: email,
    });
    if (result === "not-configured") {
      console.warn(
        `[careers] SMTP not configured; application NOT emailed. Set SMTP_HOST/PORT/USER/PASS in .env.local.\n${text}`
      );
    } else {
      console.info(`[careers] Application for ${role.title} from ${email} forwarded.`);
    }
  } catch (error) {
    console.error("[careers] Email delivery failed:", error);
    return NextResponse.json(
      { error: "Your application could not be submitted right now. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
