import nodemailer from "nodemailer";

export function getSmtpConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;
  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    to: CONTACT_TO || SMTP_USER,
  };
}

export async function sendEnquiryEmail(
  options: { subject: string; text: string; replyTo?: string },
  smtp = getSmtpConfig()
): Promise<"sent" | "not-configured"> {
  if (!smtp) return "not-configured";
  const transporter = nodemailer.createTransport(smtp);
  await transporter.sendMail({
    from: `Qaankunka Website <${smtp.auth.user}>`,
    to: smtp.to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
  });
  return "sent";
}
