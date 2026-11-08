import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>© {new Date().getFullYear()} TwoLumi. Made for two.</div>
        <div className="footer-links">
          <Link href="/days-together">Days Together</Link>
          <Link href="/games-for-new-couples">
            New Couples
          </Link>
          <Link href="/games-for-married-couples">
            Married Couples
          </Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
