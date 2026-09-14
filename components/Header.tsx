import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container nav">

        <Link
          href="/"
          className="brand"
          aria-label="TwoLumi home"
        >
          <span className="brand-mark">
            ♥
          </span>

          <span>
            TwoLumi
          </span>
        </Link>


        <nav
          className="nav-links"
          aria-label="Primary navigation"
        >

          <Link href="/games">
            Games
          </Link>

          <Link href="/couple-puzzle">
            Puzzle
          </Link>

          <Link href="/couple-questions">
            Questions
          </Link>

          <Link href="/couple-quiz">
            Quiz
          </Link>

          <Link href="/couple-compatibility-test">
            Compatibility
          </Link>

          <Link
            href="/#popular"
            className="nav-cta"
          >
            Start Playing
          </Link>

        </nav>

      </div>
    </header>
  );
}