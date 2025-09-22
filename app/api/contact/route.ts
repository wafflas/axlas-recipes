import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email, name, subject, message } = await request.json();

    if (!email || !name || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    if (!user || !pass) {
      return NextResponse.json(
        { error: "Email not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: user,
      to: process.env.CONTACT_TO || user,
      subject: `Νέο μήνυμα απο το website με θέμα: ${subject}`,
      html: `
        <h3>Σας έστειλαν μήνυμα απο το website με θέμα: ${subject}</h3>
        <p><strong>Όνομα:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Θέμα:</strong> ${subject}</p>
        <p><strong>Μήνυμα:</strong></p>
        <p>${String(message).replace(/\n/g, "<br/>")}</p>
      `,
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
