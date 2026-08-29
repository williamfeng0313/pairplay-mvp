import type { Metadata } from "next";

import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import {
  GoogleAnalytics,
} from "@next/third-parties/google";

/* =========================================================
   Metadata
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://twolumi.com"
  ),

  title: {
    default:
      "TwoLumi — Online Games for Couples",

    template:
      "%s | TwoLumi",
  },

  description:
    "Free online games, questions and quizzes for couples. No signup, no download — just play together.",

  openGraph: {
    title:
      "TwoLumi — Online Games for Couples",

    description:
      "Free online games, questions and quizzes for couples. No signup, no download.",

    type:
      "website",
  },
};

/* =========================================================
   Root Layout
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* =======================================================
     Google Analytics

     Only load GA4 on the real Vercel Production environment.

     localhost:
     VERCEL_ENV is undefined
     → GA4 disabled

     Vercel Preview:
     VERCEL_ENV = "preview"
     → GA4 disabled

     Vercel Production:
     VERCEL_ENV = "production"
     → GA4 enabled
  ======================================================= */

  const gaId =
    process.env.NEXT_PUBLIC_GA_ID;

  const isProduction =
    process.env.VERCEL_ENV ===
    "production";

  return (
    <html lang="en">

      <body>

        <Header />

        {children}

        <Footer />

        {/* ===============================================
            Production-only Google Analytics
        =============================================== */}

        {isProduction && gaId ? (
          <GoogleAnalytics
            gaId={gaId}
          />
        ) : null}

      </body>

    </html>
  );
}