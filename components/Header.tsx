"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setGamesOpen(false);
    setQuestionsOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo */}
        <Link
          href="/"
          className="site-logo"
          onClick={closeMobileMenu}
        >
          TwoLumi
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {/* Games Dropdown */}
          <div className="nav-dropdown">
            <button
              type="button"
              className={`nav-link nav-dropdown-trigger ${
                isActive("/games") ||
                isActive("/couple-puzzle") ||
                isActive("/couple-card-game") ||
                isActive("/would-you-rather-questions-for-couples") ||
                isActive("/this-or-that-for-couples") ||
                isActive("/couple-quiz")
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setGamesOpen((previous) => !previous);
                setQuestionsOpen(false);
              }}
              aria-expanded={gamesOpen}
            >
              Games
              <span className="dropdown-arrow">⌄</span>
            </button>

            {gamesOpen ? (
              <div className="dropdown-menu">
                <Link
                  href="/games"
                  className={isActive("/games") ? "active" : ""}
                  onClick={closeMobileMenu}
                >
                  All Games
                </Link>

                <Link
                  href="/would-you-rather-questions-for-couples"
                  className={
                    isActive(
                      "/would-you-rather-questions-for-couples"
                    )
                      ? "active"
                      : ""
                  }
                  onClick={closeMobileMenu}
                >
                  Would You Rather
                </Link>

                <Link
                  href="/couple-puzzle"
                  className={
                    isActive("/couple-puzzle") ? "active" : ""
                  }
                  onClick={closeMobileMenu}
                >
                  Couple Puzzle
                </Link>

                <Link
                  href="/couple-card-game"
                  className={
                    isActive("/couple-card-game") ? "active" : ""
                  }
                  onClick={closeMobileMenu}
                >
                  Couple Cards
                </Link>

                <Link
                  href="/this-or-that-for-couples"
                  className={
                    isActive("/this-or-that-for-couples")
                      ? "active"
                      : ""
                  }
                  onClick={closeMobileMenu}
                >
                  This or That
                </Link>

                <Link
                  href="/couple-quiz"
                  className={
                    isActive("/couple-quiz") ? "active" : ""
                  }
                  onClick={closeMobileMenu}
                >
                  Couple Quiz
                </Link>

                <Link
                  href="/photo-booth"
                  className={
                    isActive("/photo-booth") ? "active" : ""
                  }
                  onClick={closeMobileMenu}
                >
                  Photo Booth
                </Link>
              </div>
            ) : null}
          </div>

          {/* Questions Dropdown */}
          <div className="nav-dropdown">
            <button
              type="button"
              className={`nav-link nav-dropdown-trigger ${
                isActive("/couple-questions") ||
                isActive("/questions-for-long-distance-couples") ||
                isActive("/long-distance-couple-games")
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setQuestionsOpen((previous) => !previous);
                setGamesOpen(false);
              }}
              aria-expanded={questionsOpen}
            >
              Questions
              <span className="dropdown-arrow">⌄</span>
            </button>

            {questionsOpen ? (
              <div className="dropdown-menu">
                <Link
                  href="/couple-questions"
                  className={
                    isActive("/couple-questions") ? "active" : ""
                  }
                  onClick={closeMobileMenu}
                >
                  Couple Questions
                </Link>

                <Link
                  href="/questions-for-long-distance-couples"
                  className={
                    isActive(
                      "/questions-for-long-distance-couples"
                    )
                      ? "active"
                      : ""
                  }
                  onClick={closeMobileMenu}
                >
                  Long Distance Questions
                </Link>

                <Link
                  href="/long-distance-couple-games"
                  className={
                    isActive("/long-distance-couple-games")
                      ? "active"
                      : ""
                  }
                  onClick={closeMobileMenu}
                >
                  Long Distance Games
                </Link>
              </div>
            ) : null}
          </div>

          {/* About */}
          <Link
            href="/about"
            className={`nav-link ${
              isActive("/about") ? "active" : ""
            }`}
          >
            About
          </Link>
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/games"
          className="header-cta desktop-cta"
        >
          Play Together
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMobileOpen((previous) => !previous)}
          aria-label={
            mobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen ? (
        <div className="mobile-nav">
          <div className="mobile-nav-inner">
            <button
              type="button"
              className="mobile-nav-section"
              onClick={() => setGamesOpen((previous) => !previous)}
              aria-expanded={gamesOpen}
            >
              <span>Games</span>
              <span>{gamesOpen ? "−" : "+"}</span>
            </button>

            {gamesOpen ? (
              <div className="mobile-subnav">
                <Link href="/games" onClick={closeMobileMenu}>
                  All Games
                </Link>

                <Link
                  href="/would-you-rather-questions-for-couples"
                  onClick={closeMobileMenu}
                >
                  Would You Rather
                </Link>

                <Link
                  href="/couple-puzzle"
                  onClick={closeMobileMenu}
                >
                  Couple Puzzle
                </Link>

                <Link
                  href="/couple-card-game"
                  onClick={closeMobileMenu}
                >
                  Couple Cards
                </Link>

                <Link
                  href="/this-or-that-for-couples"
                  onClick={closeMobileMenu}
                >
                  This or That
                </Link>

                <Link
                  href="/couple-quiz"
                  onClick={closeMobileMenu}
                >
                  Couple Quiz
                </Link>
              
                <Link
                  href="/photo-booth"
                  onClick={closeMobileMenu}
                >
                  Photo Booth
                </Link>

              </div>
            ) : null}

            <button
              type="button"
              className="mobile-nav-section"
              onClick={() =>
                setQuestionsOpen((previous) => !previous)
              }
              aria-expanded={questionsOpen}
            >
              <span>Questions</span>
              <span>{questionsOpen ? "−" : "+"}</span>
            </button>

            {questionsOpen ? (
              <div className="mobile-subnav">
                <Link
                  href="/couple-questions"
                  onClick={closeMobileMenu}
                >
                  Couple Questions
                </Link>

                <Link
                  href="/questions-for-long-distance-couples"
                  onClick={closeMobileMenu}
                >
                  Long Distance Questions
                </Link>

                <Link
                  href="/long-distance-couple-games"
                  onClick={closeMobileMenu}
                >
                  Long Distance Games
                </Link>
              </div>
            ) : null}

            <Link
              href="/about"
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              About
            </Link>

            <Link
              href="/games"
              className="mobile-header-cta"
              onClick={closeMobileMenu}
            >
              Play Together
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}