import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://twolumi.com"),
  title: {
    default: "TwoLumi — Online Games for Couples",
    template: "%s | TwoLumi"
  },
  description:
    "Free online games, questions and quizzes for couples. No signup, no download — just play together.",
  openGraph: {
    title: "TwoLumi — Online Games for Couples",
    description:
      "Free online games, questions and quizzes for couples. No signup, no download.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />

        {process.env.NEXT_PUBLIC_GA_ID ? (
      <GoogleAnalytics
      gaId={process.env.NEXT_PUBLIC_GA_ID}
     />
     ) : null}
      </body>
    </html>
  );
}
