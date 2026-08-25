export type ThisOrThatCategory =
  | "fun"
  | "everyday"
  | "date-night"
  | "relationship"
  | "future";

export type ThisOrThatQuestion = {
  id: number;
  category: ThisOrThatCategory;
  left: string;
  right: string;
};

export const thisOrThatCategoryOrder: ThisOrThatCategory[] = [
  "fun",
  "everyday",
  "date-night",
  "relationship",
  "future",
];

export const thisOrThatCategoryLabels: Record<
  ThisOrThatCategory,
  string
> = {
  fun: "Fun",
  everyday: "Everyday Life",
  "date-night": "Date Night",
  relationship: "Relationship",
  future: "Future",
};

export const thisOrThatCategoryDescriptions: Record<
  ThisOrThatCategory,
  string
> = {
  fun:
    "Light and playful This or That questions for couples who want an easy conversation or a quick laugh.",

  everyday:
    "Simple choices about routines, food, habits, weekends, and the little things that make up everyday life.",

  "date-night":
    "Date-night choices for couples deciding how they would rather spend time together.",

  relationship:
    "Relationship-focused choices about affection, communication, quality time, and being together.",

  future:
    "Future-focused choices about travel, lifestyle, goals, and the life you might want to build together.",
};

export const thisOrThatQuestions: ThisOrThatQuestion[] = [
  /* ==============================
     FUN 1–16
  ============================== */

  {
    id: 1,
    category: "fun",
    left: "Movie night",
    right: "Game night",
  },
  {
    id: 2,
    category: "fun",
    left: "Beach vacation",
    right: "Mountain getaway",
  },
  {
    id: 3,
    category: "fun",
    left: "Coffee",
    right: "Tea",
  },
  {
    id: 4,
    category: "fun",
    left: "Sunrise",
    right: "Sunset",
  },
  {
    id: 5,
    category: "fun",
    left: "Comedy movie",
    right: "Mystery movie",
  },
  {
    id: 6,
    category: "fun",
    left: "Road trip",
    right: "Flight somewhere new",
  },
  {
    id: 7,
    category: "fun",
    left: "Board games",
    right: "Video games",
  },
  {
    id: 8,
    category: "fun",
    left: "Sweet snacks",
    right: "Salty snacks",
  },
  {
    id: 9,
    category: "fun",
    left: "Concert",
    right: "Comedy show",
  },
  {
    id: 10,
    category: "fun",
    left: "Theme park",
    right: "Water park",
  },
  {
    id: 11,
    category: "fun",
    left: "Dogs",
    right: "Cats",
  },
  {
    id: 12,
    category: "fun",
    left: "Summer",
    right: "Winter",
  },
  {
    id: 13,
    category: "fun",
    left: "City adventure",
    right: "Nature adventure",
  },
  {
    id: 14,
    category: "fun",
    left: "Sing together",
    right: "Dance together",
  },
  {
    id: 15,
    category: "fun",
    left: "Take photos",
    right: "Just enjoy the moment",
  },
  {
    id: 16,
    category: "fun",
    left: "Plan the whole day",
    right: "Be completely spontaneous",
  },

  /* ==============================
     EVERYDAY 17–32
  ============================== */

  {
    id: 17,
    category: "everyday",
    left: "Wake up early",
    right: "Stay up late",
  },
  {
    id: 18,
    category: "everyday",
    left: "Cook at home",
    right: "Order takeout",
  },
  {
    id: 19,
    category: "everyday",
    left: "Clean as you go",
    right: "Clean everything later",
  },
  {
    id: 20,
    category: "everyday",
    left: "Breakfast date",
    right: "Dinner date",
  },
  {
    id: 21,
    category: "everyday",
    left: "Text throughout the day",
    right: "One long conversation later",
  },
  {
    id: 22,
    category: "everyday",
    left: "Always arrive early",
    right: "Arrive exactly on time",
  },
  {
    id: 23,
    category: "everyday",
    left: "Save money",
    right: "Spend on experiences",
  },
  {
    id: 24,
    category: "everyday",
    left: "Quiet morning",
    right: "Busy morning",
  },
  {
    id: 25,
    category: "everyday",
    left: "Music while working",
    right: "Complete silence",
  },
  {
    id: 26,
    category: "everyday",
    left: "Big social circle",
    right: "Small close circle",
  },
  {
    id: 27,
    category: "everyday",
    left: "Plan meals",
    right: "Decide when hungry",
  },
  {
    id: 28,
    category: "everyday",
    left: "Keep everything organized",
    right: "A little mess is fine",
  },
  {
    id: 29,
    category: "everyday",
    left: "Exercise together",
    right: "Exercise separately",
  },
  {
    id: 30,
    category: "everyday",
    left: "Busy weekend",
    right: "Lazy weekend",
  },
  {
    id: 31,
    category: "everyday",
    left: "Phone call",
    right: "Text messages",
  },
  {
    id: 32,
    category: "everyday",
    left: "Do errands together",
    right: "Divide and conquer",
  },

  /* ==============================
     DATE NIGHT 33–48
  ============================== */

  {
    id: 33,
    category: "date-night",
    left: "Fancy dinner",
    right: "Casual street food",
  },
  {
    id: 34,
    category: "date-night",
    left: "Movie theater",
    right: "Movie at home",
  },
  {
    id: 35,
    category: "date-night",
    left: "Picnic",
    right: "Restaurant",
  },
  {
    id: 36,
    category: "date-night",
    left: "Museum",
    right: "Live music",
  },
  {
    id: 37,
    category: "date-night",
    left: "Double date",
    right: "Just the two of us",
  },
  {
    id: 38,
    category: "date-night",
    left: "Try somewhere new",
    right: "Return to our favorite place",
  },
  {
    id: 39,
    category: "date-night",
    left: "Dress up",
    right: "Keep it casual",
  },
  {
    id: 40,
    category: "date-night",
    left: "Daytime date",
    right: "Nighttime date",
  },
  {
    id: 41,
    category: "date-night",
    left: "Cook dinner together",
    right: "Go out for dinner",
  },
  {
    id: 42,
    category: "date-night",
    left: "Bowling",
    right: "Mini golf",
  },
  {
    id: 43,
    category: "date-night",
    left: "Watch the sunset",
    right: "Look at the stars",
  },
  {
    id: 44,
    category: "date-night",
    left: "Plan the date together",
    right: "One person surprises the other",
  },
  {
    id: 45,
    category: "date-night",
    left: "Explore the city",
    right: "Escape somewhere quiet",
  },
  {
    id: 46,
    category: "date-night",
    left: "Coffee date",
    right: "Dessert date",
  },
  {
    id: 47,
    category: "date-night",
    left: "Take lots of pictures",
    right: "Put the phones away",
  },
  {
    id: 48,
    category: "date-night",
    left: "Short spontaneous date",
    right: "Full-day planned date",
  },

  /* ==============================
     RELATIONSHIP 49–64
  ============================== */

  {
    id: 49,
    category: "relationship",
    left: "Lots of small messages",
    right: "One meaningful conversation",
  },
  {
    id: 50,
    category: "relationship",
    left: "Words of encouragement",
    right: "Helpful actions",
  },
  {
    id: 51,
    category: "relationship",
    left: "Celebrate every milestone",
    right: "Keep milestones simple",
  },
  {
    id: 52,
    category: "relationship",
    left: "Share most hobbies",
    right: "Have separate hobbies",
  },
  {
    id: 53,
    category: "relationship",
    left: "Talk things out immediately",
    right: "Take time before talking",
  },
  {
    id: 54,
    category: "relationship",
    left: "Give surprise gifts",
    right: "Plan experiences together",
  },
  {
    id: 55,
    category: "relationship",
    left: "Spend most free time together",
    right: "Keep plenty of personal time",
  },
  {
    id: 56,
    category: "relationship",
    left: "Share everything",
    right: "Keep some things private",
  },
  {
    id: 57,
    category: "relationship",
    left: "Make plans far ahead",
    right: "Decide closer to the day",
  },
  {
    id: 58,
    category: "relationship",
    left: "Talk every day",
    right: "Quality matters more than frequency",
  },
  {
    id: 59,
    category: "relationship",
    left: "Show affection privately",
    right: "Show affection openly",
  },
  {
    id: 60,
    category: "relationship",
    left: "Solve problems together",
    right: "Try individually first",
  },
  {
    id: 61,
    category: "relationship",
    left: "Similar personalities",
    right: "Opposite personalities",
  },
  {
    id: 62,
    category: "relationship",
    left: "Shared routines",
    right: "Flexible routines",
  },
  {
    id: 63,
    category: "relationship",
    left: "Give advice",
    right: "Just listen",
  },
  {
    id: 64,
    category: "relationship",
    left: "Lots of traditions",
    right: "Keep creating new experiences",
  },

  /* ==============================
     FUTURE 65–80
  ============================== */

  {
    id: 65,
    category: "future",
    left: "Live in a big city",
    right: "Live somewhere quiet",
  },
  {
    id: 66,
    category: "future",
    left: "Own a home",
    right: "Stay flexible and rent",
  },
  {
    id: 67,
    category: "future",
    left: "Travel often",
    right: "Build a comfortable home base",
  },
  {
    id: 68,
    category: "future",
    left: "Plan five years ahead",
    right: "Take life year by year",
  },
  {
    id: 69,
    category: "future",
    left: "Prioritize career growth",
    right: "Prioritize lifestyle freedom",
  },
  {
    id: 70,
    category: "future",
    left: "Save for big goals",
    right: "Spend more on experiences now",
  },
  {
    id: 71,
    category: "future",
    left: "Live near family",
    right: "Move somewhere completely new",
  },
  {
    id: 72,
    category: "future",
    left: "One dream destination",
    right: "Visit as many places as possible",
  },
  {
    id: 73,
    category: "future",
    left: "Stable routine",
    right: "Flexible lifestyle",
  },
  {
    id: 74,
    category: "future",
    left: "Plan vacations early",
    right: "Book trips spontaneously",
  },
  {
    id: 75,
    category: "future",
    left: "Work from one place",
    right: "Work while traveling",
  },
  {
    id: 76,
    category: "future",
    left: "Build one long-term home",
    right: "Live in different places over time",
  },
  {
    id: 77,
    category: "future",
    left: "Detailed shared goals",
    right: "General direction and flexibility",
  },
  {
    id: 78,
    category: "future",
    left: "Retire somewhere peaceful",
    right: "Retire somewhere exciting",
  },
  {
    id: 79,
    category: "future",
    left: "Spend more time at home",
    right: "Spend more time exploring",
  },
  {
    id: 80,
    category: "future",
    left: "Know exactly what comes next",
    right: "See where life takes us",
  },
];

export const thisOrThatQuestionCount =
  thisOrThatQuestions.length;