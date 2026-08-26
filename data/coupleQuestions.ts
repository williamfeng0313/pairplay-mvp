/* =========================================================
   Couple Questions
   100 questions / 5 categories
========================================================= */

export type CoupleQuestionCategory =
  | "fun"
  | "get-to-know"
  | "deep"
  | "relationship"
  | "future";

export type CoupleQuestion = {
  id: number;
  category: CoupleQuestionCategory;
  question: string;
};

/* =========================================================
   Category Order
========================================================= */

export const coupleQuestionCategoryOrder: CoupleQuestionCategory[] =
  [
    "fun",
    "get-to-know",
    "deep",
    "relationship",
    "future",
  ];

/* =========================================================
   Category Labels
========================================================= */

export const coupleQuestionCategoryLabels: Record<
  CoupleQuestionCategory,
  string
> = {
  fun: "Fun",
  "get-to-know": "Get to Know",
  deep: "Deep",
  relationship: "Relationship",
  future: "Future",
};

/* =========================================================
   Category Full Titles
   用于以后 page.tsx 的 H2
========================================================= */

export const coupleQuestionCategoryTitles: Record<
  CoupleQuestionCategory,
  string
> = {
  fun:
    "20 Fun Questions to Ask Your Partner",

  "get-to-know":
    "20 Questions to Get to Know Your Partner Better",

  deep:
    "20 Deep Questions to Ask Your Partner",

  relationship:
    "20 Relationship Questions for Couples",

  future:
    "20 Future Questions for Couples",
};

/* =========================================================
   Category Descriptions
========================================================= */

export const coupleQuestionCategoryDescriptions: Record<
  CoupleQuestionCategory,
  string
> = {
  fun:
    "Light, playful questions for laughing together, sharing favorites, and starting easy conversations.",

  "get-to-know":
    "Questions about personality, habits, preferences, and the little things that help you understand each other better.",

  deep:
    "Thoughtful questions about feelings, values, experiences, and the things that shape who you are.",

  relationship:
    "Questions about your relationship, shared memories, connection, appreciation, and how you work together.",

  future:
    "Questions about dreams, priorities, experiences, and what you hope the future might look like together.",
};

/* =========================================================
   Questions
========================================================= */

export const coupleQuestions: CoupleQuestion[] = [
  /* =======================================================
     FUN
     1–20
  ======================================================= */

  {
    id: 1,
    category: "fun",
    question:
      "If we could take a spontaneous trip tomorrow, where would you want to go?",
  },

  {
    id: 2,
    category: "fun",
    question:
      "What is one silly thing that always makes you laugh?",
  },

  {
    id: 3,
    category: "fun",
    question:
      "If we had an entire day with no plans, how would you want to spend it?",
  },

  {
    id: 4,
    category: "fun",
    question:
      "What fictional world would you want us to visit together?",
  },

  {
    id: 5,
    category: "fun",
    question:
      "What food could you happily eat every week without getting bored?",
  },

  {
    id: 6,
    category: "fun",
    question:
      "If we started a ridiculous business together, what would we sell?",
  },

  {
    id: 7,
    category: "fun",
    question:
      "What song instantly puts you in a better mood?",
  },

  {
    id: 8,
    category: "fun",
    question:
      "If you could instantly become great at one hobby, which would you choose?",
  },

  {
    id: 9,
    category: "fun",
    question:
      "What would your perfect lazy Sunday look like?",
  },

  {
    id: 10,
    category: "fun",
    question:
      "If we entered a game show together, which type would we have the best chance of winning?",
  },

  {
    id: 11,
    category: "fun",
    question:
      "What is the funniest thing you remember us doing together?",
  },

  {
    id: 12,
    category: "fun",
    question:
      "If you could only keep three apps on your phone, which ones would survive?",
  },

  {
    id: 13,
    category: "fun",
    question:
      "What is one small luxury you never feel guilty spending money on?",
  },

  {
    id: 14,
    category: "fun",
    question:
      "If you could have dinner with any fictional character, who would you choose?",
  },

  {
    id: 15,
    category: "fun",
    question:
      "What is something completely ordinary that you are strangely picky about?",
  },

  {
    id: 16,
    category: "fun",
    question:
      "If we could instantly learn one new skill together, what should it be?",
  },

  {
    id: 17,
    category: "fun",
    question:
      "Which holiday would you happily celebrate twice a year?",
  },

  {
    id: 18,
    category: "fun",
    question:
      "What is your ideal snack for a movie night?",
  },

  {
    id: 19,
    category: "fun",
    question:
      "If our relationship had a theme song, what kind of song would it be?",
  },

  {
    id: 20,
    category: "fun",
    question:
      "What harmless competition do you think you could definitely beat me at?",
  },

  /* =======================================================
     GET TO KNOW
     21–40
  ======================================================= */

  {
    id: 21,
    category: "get-to-know",
    question:
      "What is something people often misunderstand about you?",
  },

  {
    id: 22,
    category: "get-to-know",
    question:
      "What small thing can instantly improve your day?",
  },

  {
    id: 23,
    category: "get-to-know",
    question:
      "When you need to recharge, do you prefer being alone or being around people?",
  },

  {
    id: 24,
    category: "get-to-know",
    question:
      "What kind of compliment means the most to you?",
  },

  {
    id: 25,
    category: "get-to-know",
    question:
      "What is something you wish you had more time for?",
  },

  {
    id: 26,
    category: "get-to-know",
    question:
      "Are you usually someone who plans ahead or decides things at the last minute?",
  },

  {
    id: 27,
    category: "get-to-know",
    question:
      "What is one habit you are proud of having built?",
  },

  {
    id: 28,
    category: "get-to-know",
    question:
      "What kind of environment helps you feel most relaxed?",
  },

  {
    id: 29,
    category: "get-to-know",
    question:
      "What is something you are better at than most people realize?",
  },

  {
    id: 30,
    category: "get-to-know",
    question:
      "When you are stressed, what helps you feel like yourself again?",
  },

  {
    id: 31,
    category: "get-to-know",
    question:
      "What is one everyday thing you really look forward to?",
  },

  {
    id: 32,
    category: "get-to-know",
    question:
      "What usually motivates you more: excitement, responsibility, competition, or curiosity?",
  },

  {
    id: 33,
    category: "get-to-know",
    question:
      "What is something you have changed your mind about in the last few years?",
  },

  {
    id: 34,
    category: "get-to-know",
    question:
      "What kind of people make you feel comfortable quickly?",
  },

  {
    id: 35,
    category: "get-to-know",
    question:
      "What is one decision you usually take a long time to make?",
  },

  {
    id: 36,
    category: "get-to-know",
    question:
      "What part of your daily routine feels most important to you?",
  },

  {
    id: 37,
    category: "get-to-know",
    question:
      "What makes you feel genuinely appreciated?",
  },

  {
    id: 38,
    category: "get-to-know",
    question:
      "When you learn something new, do you prefer figuring it out yourself or having someone show you?",
  },

  {
    id: 39,
    category: "get-to-know",
    question:
      "What is one quality you admire in other people?",
  },

  {
    id: 40,
    category: "get-to-know",
    question:
      "What is something you would love for me to understand better about you?",
  },

  /* =======================================================
     DEEP
     41–60
  ======================================================= */

  {
    id: 41,
    category: "deep",
    question:
      "What makes you feel most understood by another person?",
  },

  {
    id: 42,
    category: "deep",
    question:
      "What is something you wish people asked you about more often?",
  },

  {
    id: 43,
    category: "deep",
    question:
      "What experience has shaped the way you see life the most?",
  },

  {
    id: 44,
    category: "deep",
    question:
      "What does feeling emotionally safe with someone mean to you?",
  },

  {
    id: 45,
    category: "deep",
    question:
      "What personal value would be hardest for you to compromise on?",
  },

  {
    id: 46,
    category: "deep",
    question:
      "What is something you have learned about yourself recently?",
  },

  {
    id: 47,
    category: "deep",
    question:
      "When do you feel most confident in who you are?",
  },

  {
    id: 48,
    category: "deep",
    question:
      "What is one lesson you learned the hard way but are grateful to know now?",
  },

  {
    id: 49,
    category: "deep",
    question:
      "What does a meaningful life look like to you?",
  },

  {
    id: 50,
    category: "deep",
    question:
      "What do you think people need most when they are going through a difficult time?",
  },

  {
    id: 51,
    category: "deep",
    question:
      "What is something you are still learning to be more patient with?",
  },

  {
    id: 52,
    category: "deep",
    question:
      "What kind of change is hardest for you to deal with?",
  },

  {
    id: 53,
    category: "deep",
    question:
      "What makes you feel most proud of the person you are becoming?",
  },

  {
    id: 54,
    category: "deep",
    question:
      "What does success mean to you now compared with a few years ago?",
  },

  {
    id: 55,
    category: "deep",
    question:
      "What is something you hope you never take for granted?",
  },

  {
    id: 56,
    category: "deep",
    question:
      "What belief or value has become more important to you as you have gotten older?",
  },

  {
    id: 57,
    category: "deep",
    question:
      "When life feels uncertain, what helps you stay grounded?",
  },

  {
    id: 58,
    category: "deep",
    question:
      "What is something you hope people remember about you?",
  },

  {
    id: 59,
    category: "deep",
    question:
      "What is one part of yourself you have learned to appreciate more over time?",
  },

  {
    id: 60,
    category: "deep",
    question:
      "What kind of conversation makes you feel truly close to someone?",
  },

  /* =======================================================
     RELATIONSHIP
     61–80
  ======================================================= */

  {
    id: 61,
    category: "relationship",
    question:
      "What is one memory of us that still makes you smile?",
  },

  {
    id: 62,
    category: "relationship",
    question:
      "What is something we have gotten better at as a couple?",
  },

  {
    id: 63,
    category: "relationship",
    question:
      "What small thing I do makes you feel appreciated?",
  },

  {
    id: 64,
    category: "relationship",
    question:
      "When do you feel most connected to me?",
  },

  {
    id: 65,
    category: "relationship",
    question:
      "What is one thing you think we do especially well together?",
  },

  {
    id: 66,
    category: "relationship",
    question:
      "What kind of quality time feels most meaningful to you?",
  },

  {
    id: 67,
    category: "relationship",
    question:
      "What is something you would like us to do more often together?",
  },

  {
    id: 68,
    category: "relationship",
    question:
      "What is one thing you appreciate about the way we handle differences?",
  },

  {
    id: 69,
    category: "relationship",
    question:
      "What moment made you feel especially proud of us as a couple?",
  },

  {
    id: 70,
    category: "relationship",
    question:
      "What helps you feel supported when you have had a difficult day?",
  },

  {
    id: 71,
    category: "relationship",
    question:
      "What is one tradition you would enjoy creating together?",
  },

  {
    id: 72,
    category: "relationship",
    question:
      "What is something about our relationship that feels uniquely ours?",
  },

  {
    id: 73,
    category: "relationship",
    question:
      "What do you think makes a couple feel like a real team?",
  },

  {
    id: 74,
    category: "relationship",
    question:
      "What is one way we could make ordinary days together more enjoyable?",
  },

  {
    id: 75,
    category: "relationship",
    question:
      "What is something you have learned from being in this relationship?",
  },

  {
    id: 76,
    category: "relationship",
    question:
      "What kind of support from a partner feels most helpful to you?",
  },

  {
    id: 77,
    category: "relationship",
    question:
      "What is one thing you hope we always make time for?",
  },

  {
    id: 78,
    category: "relationship",
    question:
      "What is one of your favorite ordinary moments we have shared?",
  },

  {
    id: 79,
    category: "relationship",
    question:
      "What does being a good partner mean to you?",
  },

  {
    id: 80,
    category: "relationship",
    question:
      "What is something about us that you hope never changes?",
  },

  /* =======================================================
     FUTURE
     81–100
  ======================================================= */

  {
    id: 81,
    category: "future",
    question:
      "What would an ideal ordinary day together look like five years from now?",
  },

  {
    id: 82,
    category: "future",
    question:
      "What is one experience you would love for us to have together?",
  },

  {
    id: 83,
    category: "future",
    question:
      "What place would you most like us to visit someday?",
  },

  {
    id: 84,
    category: "future",
    question:
      "What is one shared goal you think would be exciting for us to work toward?",
  },

  {
    id: 85,
    category: "future",
    question:
      "What kind of home environment would make you happiest in the future?",
  },

  {
    id: 86,
    category: "future",
    question:
      "What is something new you hope we learn or try together someday?",
  },

  {
    id: 87,
    category: "future",
    question:
      "What do you hope we have more time for in the future?",
  },

  {
    id: 88,
    category: "future",
    question:
      "What future milestone are you most excited about reaching?",
  },

  {
    id: 89,
    category: "future",
    question:
      "What kind of adventures would you like our future to include?",
  },

  {
    id: 90,
    category: "future",
    question:
      "What is one financial goal you think would feel rewarding to achieve together?",
  },

  {
    id: 91,
    category: "future",
    question:
      "What would you like our weekends to look like a few years from now?",
  },

  {
    id: 92,
    category: "future",
    question:
      "What is one tradition you would like us to still have years from now?",
  },

  {
    id: 93,
    category: "future",
    question:
      "What personal dream would you most like me to support you in pursuing?",
  },

  {
    id: 94,
    category: "future",
    question:
      "What is something you hope we become better at together over time?",
  },

  {
    id: 95,
    category: "future",
    question:
      "If we could live somewhere different for one year, where would you choose?",
  },

  {
    id: 96,
    category: "future",
    question:
      "What is one thing you hope our future always has room for?",
  },

  {
    id: 97,
    category: "future",
    question:
      "How would you like us to celebrate important milestones in the future?",
  },

  {
    id: 98,
    category: "future",
    question:
      "What kind of lifestyle would make you feel most fulfilled in the long run?",
  },

  {
    id: 99,
    category: "future",
    question:
      "What is one dream trip you would love for us to plan someday?",
  },

  {
    id: 100,
    category: "future",
    question:
      "When you imagine us years from now, what do you hope we are still doing together?",
  },
];

/* =========================================================
   Counts
========================================================= */

export const coupleQuestionCount =
  coupleQuestions.length;