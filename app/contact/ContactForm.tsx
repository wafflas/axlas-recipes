"use client";
import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.error || "Failed to send message");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setErrorMsg("Network error");
      setStatus("error");
    }
  };

  return (
    <>
      <form className="w-full mt-8 space-y-5 px-6" onSubmit={onSubmit}>
        <div>
          <label htmlFor="name" className="block text-medium mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full h-10 rounded border border-black/40 bg-[var(--color-primary)] px-3 outline-none focus:border-black transition"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-medium mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full h-10 rounded border border-black/40 bg-[var(--color-primary)] px-3 outline-none focus:border-black transition"
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-medium mb-2">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            className="w-full h-10 rounded border border-black/40 bg-[var(--color-primary)] px-3 outline-none focus:border-black transition"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full rounded border border-black/40 bg-[var(--color-primary)] p-3 outline-none focus:border-black transition"
            required
          />
        </div>
        <div className="w-full flex justify-center pt-2">
          <button
            type="submit"
            className="uppercase bg-black text-white px-6 py-3 rounded cursor-pointer hover:bg-gray-800 transition"
            style={{ fontFamily: "var(--font-anton), Arial, sans-serif" }}
            disabled={status === "loading"}
          >
            {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
          </button>
        </div>
      </form>

      {/* Notifications */}
      <div className="w-full px-6 mt-4" aria-live="polite" aria-atomic="true">
        {status === "success" && (
          <div className="rounded border border-green-600/30 bg-green-100 text-green-900 px-4 py-3">
            Your message has been sent. I’ll get back to you soon.
          </div>
        )}
        {status === "error" && (
          <div className="rounded border border-red-600/30 bg-red-100 text-red-900 px-4 py-3">
            {errorMsg || "Something went wrong. Please try again."}
          </div>
        )}
      </div>
    </>
  );
}
