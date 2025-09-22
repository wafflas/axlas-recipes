import Link from "next/link";
import HeroTitle from "./components/HeroTitle";

export default function NotFound() {
  return (
    <main className="w-full min-h-screen">
      <HeroTitle title="NOT FOUND" />
      <div className="max-w-6xl mx-auto text-center text-black px-6">
        <p className="text-base md:text-lg opacity-85">
          We couldn’t find the page you were looking for.
        </p>
        <p className="text-base md:text-lg opacity-85">
          Try the navigation above or head back home.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="uppercase bg-black text-white px-6 py-3 rounded inline-block hover:bg-gray-800 transition"
            style={{ fontFamily: "var(--font-anton), Arial, sans-serif" }}
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
