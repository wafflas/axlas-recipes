import type { Metadata } from "next";
import { Suspense } from "react";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import IntroOverlay from "./components/IntroOverlay";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AXLAS COOKS",
  description: "Modern editorial recipes and seasonal cooking.",
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      { url: "/favicon_io/favicon.ico" },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anton.className} ${anton.variable} ${inter.variable} antialiased bg-[var(--color-primary)] text-black`}
      >
        {/* IntroOverlay must render first */}
        <IntroOverlay />
        {/* Site wrapper stays hidden until IntroOverlay reveals it */}
        <div id="site" className="opacity-0">
          <Navbar />
          <div className="relative">
            <Spinner navigation minMs={1200} />
            <Suspense
              fallback={
                <div className="w-full min-h-screen flex items-center justify-center">
                  <Spinner size={320} />
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
          <Footer />
          <ScrollTop />
        </div>
      </body>
    </html>
  );
}
