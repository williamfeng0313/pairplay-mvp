import Link from "next/link";

const updates = [
  {
    text: "New: Couple Cards is now live",
    href: "/couple-card-game",
  },
  {
    text: "Explore our latest couple questions",
    href: "/couple-questions",
  },
  {
    text: "Try our Couple Puzzle game",
    href: "/couple-puzzle",
  },
  {
    text: "More games and relationship features are coming soon",
    href: "/games",
  },
];

function UpdateGroup({
  duplicate = false,
}: {
  duplicate?: boolean;
}) {
  return (
    <div
      className="announcement-bar-group"
      aria-hidden={duplicate}
    >
      {updates.map((update, index) => (
        <span
          className="announcement-item"
          key={`${duplicate ? "duplicate" : "primary"}-${update.href}`}
        >
          <Link
            href={update.href}
            tabIndex={duplicate ? -1 : undefined}
          >
            {update.text}
          </Link>

          {index < updates.length - 1 ? (
            <span
              className="announcement-separator"
              aria-hidden="true"
            >
              •
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

export default function AnnouncementBar() {
  return (
    <div
      className="announcement-bar"
      role="region"
      aria-label="Website updates"
    >
      <div className="announcement-bar-viewport">
        <div className="announcement-bar-track">
          <UpdateGroup />
          <UpdateGroup duplicate />
        </div>
      </div>
    </div>
  );
}