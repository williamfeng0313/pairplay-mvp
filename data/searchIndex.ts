export type SearchIndexItem = {
  title: string;
  description: string;
  href: string;
  keywords: string[];
  type: "game" | "questions" | "quiz" | "guide";
};

export const searchIndex: SearchIndexItem[] = [
  {
    title: "Would You Rather Questions for Couples",
    description: "Fun and revealing Would You Rather questions for couples to answer together.",
    href: "/would-you-rather-questions-for-couples",
    keywords: ["would you rather", "would you rather questions", "couple questions", "fun questions", "relationship questions"],
    type: "questions",
  },
  {
    title: "Couple Puzzle",
    description: "Solve clues together and see how well you think as a team.",
    href: "/couple-puzzle",
    keywords: ["couple puzzle", "relationship puzzle", "couples puzzle", "puzzle game", "couple game"],
    type: "game",
  },
  {
    title: "Couple Cards",
    description: "Conversation cards for couples to play together and start meaningful conversations.",
    href: "/couple-card-game",
    keywords: ["couple cards", "relationship cards", "conversation cards", "couple conversation", "card game for couples"],
    type: "game",
  },
  {
    title: "Couple Questions",
    description: "Fun, meaningful, and conversation-starting questions to ask your partner.",
    href: "/couple-questions",
    keywords: ["couple questions", "relationship questions", "questions for couples", "questions to ask your partner", "conversation starters", "deep questions", "funny questions"],
    type: "questions",
  },
  {
    title: "100 Questions for Long Distance Couples",
    description: "Questions designed to help long-distance couples stay connected and keep conversations going.",
    href: "/questions-for-long-distance-couples",
    keywords: ["long distance", "long distance questions", "long distance relationship", "ldr questions", "questions for long distance couples"],
    type: "questions",
  },
  {
    title: "Long Distance Couple Games",
    description: "Online games and activities for couples who are apart.",
    href: "/long-distance-couple-games",
    keywords: ["long distance", "long distance games", "ldr games", "long distance relationship games", "couples apart"],
    type: "game",
  },
  {
    title: "This or That Questions for Couples",
    description: "Quick this-or-that choices for couples, from funny preferences to relationship topics.",
    href: "/this-or-that-for-couples",
    keywords: ["this or that", "this or that questions", "couple choices", "couple questions", "relationship questions"],
    type: "questions",
  },
  {
    title: "How Well Do You Know Your Partner? Couple Quiz",
    description: "A couple quiz to test how well you know your partner.",
    href: "/couple-quiz",
    keywords: ["couple quiz", "relationship quiz", "partner quiz", "how well do you know your partner", "boyfriend quiz", "girlfriend quiz"],
    type: "quiz",
  },
  {
    title: "Couple Compatibility Test",
    description: "Explore relationship compatibility through questions and shared answers.",
    href: "/couple-compatibility-test",
    keywords: ["couple compatibility", "compatibility test", "relationship compatibility", "couples test", "relationship test"],
    type: "quiz",
  },
  {
    title: "Date Night Games",
    description: "Games and activities to make date night more fun and meaningful.",
    href: "/date-night-games",
    keywords: ["date night", "date night games", "couple date", "romantic games", "things to do as a couple"],
    type: "game",
  },
  {
    title: "Relationship Check-In",
    description: "A private guided check-in for couples to talk through what matters.",
    href: "/relationship-check-in",
    keywords: ["relationship check in", "relationship check-in", "couple check in", "relationship conversation", "deeper conversations"],
    type: "game",
  },
  {
    title: "About TwoLumi",
    description: "Learn more about TwoLumi and the games, questions, and activities we create for couples.",
    href: "/about",
    keywords: ["about twolumi", "about", "who is twolumi"],
    type: "guide",
  },
];

function normalize(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function scoreItem(item: SearchIndexItem, query: string) {
  const q = normalize(query);
  if (!q) return 0;

  const title = normalize(item.title);
  const description = normalize(item.description);
  const keywords = item.keywords.map(normalize);
  let score = 0;

  if (title === q) score += 100;
  if (title.includes(q)) score += 60;

  for (const keyword of keywords) {
    if (keyword === q) score += 50;
    else if (keyword.includes(q)) score += 25;
  }

  if (description.includes(q)) score += 15;

  for (const term of q.split(" ").filter(Boolean)) {
    if (title.includes(term)) score += 12;
    if (description.includes(term)) score += 4;
    if (keywords.some((keyword) => keyword.includes(term))) score += 8;
  }

  return score;
}

export function searchTwoLumi(query: string) {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  return searchIndex
    .map((item) => ({ item, score: scoreItem(item, trimmedQuery) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);
}
