import type { Metadata } from "next";
import HeroTitle from "../components/HeroTitle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | AXLAS RECIPES",
  description: "Contact Axlas Recipes.",
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen">
      <HeroTitle title="CONTACT" />
      <div
        className="max-w-2xl mx-auto flex flex-col items-center text-black"
        style={{
          fontFamily:
            "var(--font-inter), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        <div className="text-center text-medium leading-7 px-6">
          <p>Collaborations, questions, or just want to say hi?</p>
          <p>Send me a note — I read every message.</p>
        </div>

        <form className="w-full mt-8 space-y-5 px-6">
          <div>
            <label htmlFor="name" className="block text-medium mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full h-10 rounded border border-black/40 bg-[#fbf7ea] px-3 outline-none focus:border-black transition"
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
              className="w-full h-10 rounded border border-black/40 bg-[#fbf7ea] px-3 outline-none focus:border-black transition"
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
              className="w-full rounded border border-black/40 bg-#fbf7ea] p-3 outline-none focus:border-black transition"
            />
          </div>
          <div className="w-full flex justify-center pt-2">
            <button
              type="submit"
              className="uppercase bg-black text-white px-6 py-3 rounded cursor-pointer hover:bg-gray-800 transition"
              style={{ fontFamily: "var(--font-anton), Arial, sans-serif" }}
            >
              SEND MESSAGE
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
