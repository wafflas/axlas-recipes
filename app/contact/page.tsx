import type { Metadata } from "next";
import HeroTitle from "../components/HeroTitle";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | AXLAS RECIPES",
  description: "Contact Axlas Recipes.",
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-[var(--color-primary)]">
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
        <ContactForm />
      </div>
    </main>
  );
}
