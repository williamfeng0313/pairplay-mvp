export type Game = {
  title: string;
  href: string;
  description: string;
  emoji: string;
  iconClass: string;
};

export const games: Game[] = [
  {
    title: "Would You Rather",
    href: "/would-you-rather-questions-for-couples",
    description: "100+ fun choices",
    emoji: "♥",
    iconClass: "icon-pink"
  },
  {
    title: "This or That",
    href: "/this-or-that-for-couples",
    description: "Fast choices",
    emoji: "ϟ",
    iconClass: "icon-purple"
  },
  {
    title: "Couple Quiz",
    href: "/couple-quiz",
    description: "How well do you know each other?",
    emoji: "▣",
    iconClass: "icon-blue"
  },
  {
    title: "Compatibility Test",
    href: "/couple-compatibility-test",
    description: "Find your match",
    emoji: "♡",
    iconClass: "icon-orange"
  },
  {
    title: "Couple Questions",
    href: "/couple-questions",
    description: "Deep conversations",
    emoji: "☵",
    iconClass: "icon-purple"
  }
];
