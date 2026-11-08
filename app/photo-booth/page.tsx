import type { Metadata } from "next";
import PhotoBoothStudio from "@/components/photo-booth/PhotoBoothStudio";

export const metadata: Metadata = {
  title:
    "Free Online Photo Booth for Couples — Photo Cards & 4-Cut Strips",
  description:
    "Make a cute couple photo card or a classic 4-cut photo strip in your browser. On-device AI background cutout, draggable stickers, retro filters and a date stamp. Free, no signup, no upload.",
  alternates: {
    canonical: "https://twolumi.com/photo-booth",
  },
  openGraph: {
    title: "Photo Booth for Couples | TwoLumi",
    description:
      "Photo cards and classic 4-cut strips, with AI cutout, stickers and retro filters — all processed in your browser.",
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

          <h1>Your Own Photo Booth, Right in the Browser</h1>

          <p>
            Make a cute photo card from one picture, or shoot a classic
            four-photo strip. Cut out the background on your device, drag
            on stickers, add a retro filter, and download a JPG — free,
            with no upload and no signup.
          </p>

          <div className="photo-booth-pills">
            <span>📷 Upload or shoot four</span>
            <span>✂️ On-device AI cutout</span>
            <span>🎞️ Classic 4-cut strip</span>
            <span>✨ Draggable stickers</span>
            <span>🔒 Photo stays on your device</span>
          </div>
        </section>

        <PhotoBoothStudio />

        <section className="photo-booth-seo">
          <div className="content-card">
            <div className="game-kicker">HOW IT WORKS</div>

            <h2>Two Ways to Make Something Worth Keeping</h2>

            <div className="photo-booth-steps">
              <div>
                <strong>1. Pick a mode</strong>
                <p>
                  A single photo card with couple templates, or a tall
                  four-shot photo booth strip.
                </p>
              </div>

              <div>
                <strong>2. Add photos</strong>
                <p>
                  Upload one photo, upload four at once, or use the
                  3-2-1 camera countdown.
                </p>
              </div>

              <div>
                <strong>3. Make it yours</strong>
                <p>
                  Cut out the background, add a sticker outline, drag
                  on stickers, and try a retro film filter.
                </p>
              </div>

              <div>
                <strong>4. Download &amp; share</strong>
                <p>
                  Save a full-resolution JPG with no watermark and send
                  it to your person.
                </p>
              </div>
            </div>

            <p className="photo-booth-seo-note">
              Everything runs locally in your browser. Photos are never
              uploaded to a server, and the only network request is a
              small public AI model on first use of the background
              cutout. All stickers are original artwork drawn for
              TwoLumi.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
