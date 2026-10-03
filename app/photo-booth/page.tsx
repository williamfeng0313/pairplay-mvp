import type { Metadata } from "next";
import PhotoBooth from "@/components/photo-booth/PhotoBooth";

export const metadata: Metadata = {
  title: "Photo Booth for Couples — Make a Cute Photo Card",
  description:
    "Upload a photo, choose a cute couple template, adjust the crop, and download a shareable photo card. Free and browser-based.",
  alternates: {
    canonical: "https://twolumi.com/photo-booth",
  },
  openGraph: {
    title: "Photo Booth for Couples | TwoLumi",
    description:
      "Turn one photo into a cute couple photo card with TwoLumi Photo Booth.",
    url: "https://twolumi.com/photo-booth",
    siteName: "TwoLumi",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PhotoBoothPage() {
  return (
    <main className="photo-booth-page">
      <div className="container">
        <section className="photo-booth-header">
          <div className="game-kicker">TWOLUMI PHOTO BOOTH</div>

          <h1>Turn a Photo Into a Cute Couple Card</h1>

          <p>
            Upload one photo, pick a template, make a few quick adjustments,
            and download a shareable photo card. No signup and no app
            installation.
          </p>

          <div className="photo-booth-pills">
            <span>📷 Upload or take a photo</span>
            <span>💕 Couple templates</span>
            <span>⚡ Instant browser editing</span>
            <span>🔒 Photo stays in your browser</span>
          </div>
        </section>

        <PhotoBooth />

        <section className="photo-booth-seo">
          <div className="content-card">
            <div className="game-kicker">HOW IT WORKS</div>

            <h2>Make a Photo Booth Card in Seconds</h2>

            <div className="photo-booth-steps">
              <div>
                <strong>1. Upload</strong>
                <p>
                  Choose a photo from your phone or computer.
                </p>
              </div>

              <div>
                <strong>2. Pick a style</strong>
                <p>
                  Choose a couple, Y2K, long-distance, or bestie template.
                </p>
              </div>

              <div>
                <strong>3. Adjust</strong>
                <p>
                  Move and zoom the photo until the crop looks right.
                </p>
              </div>

              <div>
                <strong>4. Download</strong>
                <p>
                  Save the finished JPG and share it with your person.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}