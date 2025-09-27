import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function sanitize(input: unknown): string {
  return String(input ?? "")
    .toString()
    .trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = sanitize(body?.email);
    const name = sanitize(body?.name);
    const subject = sanitize(body?.subject);
    const message = sanitize(body?.message);

    if (!email || !name || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (subject.length > 180) {
      return NextResponse.json({ error: "Subject too long" }, { status: 400 });
    }

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const to = process.env.CONTACT_TO || user;
    if (!user || !pass || !to) {
      return NextResponse.json(
        { error: "Email not configured" },
        { status: 500 }
      );
    }

    // Use Gmail service with EMAIL_USER/PASS only
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
    const html = `
      <h3>Σας έστειλαν μήνυμα απο το website με θέμα: ${subject}</h3>
      <p><strong>Όνομα:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Θέμα:</strong> ${subject}</p>
      <p><strong>Μήνυμα:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `;
    const text = `Νέο μήνυμα απο το website\n\nΌνομα: ${name}\nEmail: ${email}\nΘέμα: ${subject}\n\nΜήνυμα:\n${message}`;

    await transporter.sendMail({
      from: user,
      to,
      subject: `Νέο μήνυμα απο το website με θέμα: ${subject}`,
      html,
      text,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
