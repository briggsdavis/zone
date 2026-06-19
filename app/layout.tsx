import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import ConvexClientProvider from "./ConvexClientProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "1ZONE — Whole-case spaces, built exactly as designed.",
  description:
    "1ZONE (一境) is a boutique turnkey design-and-build atelier for high-net-worth clients — villas, large flats, and private clubhouses. Ten projects a year.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );

  // The Convex auth provider requires a live deployment URL. While the
  // marketing front end is built without one, render the plain tree; the
  // provider is re-enabled automatically once NEXT_PUBLIC_CONVEX_URL is set.
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    return tree;
  }

  return (
    <ConvexAuthNextjsServerProvider>{tree}</ConvexAuthNextjsServerProvider>
  );
}
