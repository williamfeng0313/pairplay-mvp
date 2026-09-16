import type { Metadata } from "next";

import "./globals.css";

import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import MicrosoftClarity from "@/components/MicrosoftClarity";

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
     Analytics Environment Variables
  ======================================================= */

  const gaId =
    process.env.NEXT_PUBLIC_GA_ID;

  const clarityId =
    process.env.NEXT_PUBLIC_CLARITY_ID;

  const isProduction =
    process.env.VERCEL_ENV ===
    "production";


  return (
    <html lang="en">

      <body>
       
       <AnnouncementBar />

        <Header />

        {children}

        <Footer />


        {/* ===============================================
            Production-only Google Analytics

            localhost:
            VERCEL_ENV undefined
            → GA4 disabled

            Vercel Preview:
            VERCEL_ENV = "preview"
            → GA4 disabled

            Vercel Production:
            VERCEL_ENV = "production"
            → GA4 enabled
        =============================================== */}

        {isProduction && gaId ? (
          <GoogleAnalytics
            gaId={gaId}
          />
        ) : null}


        {/* ===============================================
            Production-only Microsoft Clarity

            localhost:
            → Clarity disabled

            Vercel Preview:
            → Clarity disabled

            Vercel Production:
            → Clarity enabled
        =============================================== */}

        {isProduction && clarityId ? (
          <MicrosoftClarity
            projectId={clarityId}
          />
        ) : null}

      </body>

    </html>
  );
}