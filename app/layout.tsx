import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "PairPlay — Online Games for Couples",
    template: "%s | PairPlay"
  },
  description:
    "Free online games, questions and quizzes for couples. No signup, no download — just play together.",
  openGraph: {
    title: "PairPlay — Online Games for Couples",
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
      </body>
    </html>
  );
}
