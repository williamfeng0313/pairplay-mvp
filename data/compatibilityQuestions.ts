export type CompatibilityCategory =
  | "lifestyle"
  | "future"
  | "connection"
  | "habits";

export type CompatibilityOptionValue =
  | 0
  | 1
  | 2
  | 3;

export type CompatibilityOption = {
  value: CompatibilityOptionValue;
  label: string;
};

export type CompatibilityQuestion = {
  id: number;

  category:
    CompatibilityCategory;

  prompt: string;

  options:
    CompatibilityOption[];
};

export const compatibilityCategoryLabels:
  Record<
    CompatibilityCategory,
    string
  > = {
  lifestyle:
    "Lifestyle",

  future:
    "Future Plans",

  connection:
    "Fun & Connection",

  habits:
    "Everyday Habits",
};

export const compatibilityCategoryOrder:
  CompatibilityCategory[] = [
  "lifestyle",
  "future",
  "connection",
  "habits",
];

export const compatibilityQuestions:
  CompatibilityQuestion[] = [
  // ==============================
  // Lifestyle
  // ==============================

  {
    id: 1,
    category:
      "lifestyle",

    prompt:
      "What does your ideal weekend look like?",

    options: [
      {
        value: 0,
        label:
          "Staying home and recharging",
      },
      {
        value: 1,
        label:
          "A relaxed plan with one or two activities",
      },
      {
        value: 2,
        label:
          "Going out and doing something fun",
      },
      {
        value: 3,
        label:
          "A spontaneous adventure from morning to night",
      },
    ],
  },

  {
    id: 2,
    category:
      "lifestyle",

    prompt:
      "Where would you most enjoy living?",

    options: [
      {
        value: 0,
        label:
          "A quiet small town",
      },
      {
        value: 1,
        label:
          "A peaceful suburb",
      },
      {
        value: 2,
        label:
          "A lively city",
      },
      {
        value: 3,
        label:
          "Somewhere new every few years",
      },
    ],
  },

  {
    id: 3,
    category:
      "lifestyle",

    prompt:
      "How social do you like your free time to be?",

    options: [
      {
        value: 0,
        label:
          "Mostly just the two of us",
      },
      {
        value: 1,
        label:
          "A small circle of close friends",
      },
      {
        value: 2,
        label:
          "Regular plans with friends and family",
      },
      {
        value: 3,
        label:
          "The more people and activities, the better",
      },
    ],
  },

  {
    id: 4,
    category:
      "lifestyle",

    prompt:
      "How important is travel to your ideal lifestyle?",

    options: [
      {
        value: 0,
        label:
          "I am happiest staying close to home",
      },
      {
        value: 1,
        label:
          "One good trip a year is enough",
      },
      {
        value: 2,
        label:
          "I want to travel several times a year",
      },
      {
        value: 3,
        label:
          "Travel should be a major part of life",
      },
    ],
  },

  {
    id: 5,
    category:
      "lifestyle",

    prompt:
      "How do you prefer to spend extra money?",

    options: [
      {
        value: 0,
        label:
          "Save most of it",
      },
      {
        value: 1,
        label:
          "Mostly save, with occasional treats",
      },
      {
        value: 2,
        label:
          "Spend on experiences and things I enjoy",
      },
      {
        value: 3,
        label:
          "Enjoy it now — memories matter most",
      },
    ],
  },

  // ==============================
  // Future Plans
  // ==============================

  {
    id: 6,
    category:
      "future",

    prompt:
      "How far ahead do you like to plan your life?",

    options: [
      {
        value: 0,
        label:
          "I prefer taking life one day at a time",
      },
      {
        value: 1,
        label:
          "I usually think a few months ahead",
      },
      {
        value: 2,
        label:
          "I like having a plan for the next few years",
      },
      {
        value: 3,
        label:
          "I love detailed long-term plans",
      },
    ],
  },

  {
    id: 7,
    category:
      "future",

    prompt:
      "What matters most when choosing where to build a future?",

    options: [
      {
        value: 0,
        label:
          "Being close to family and familiar places",
      },
      {
        value: 1,
        label:
          "Comfort and stability",
      },
      {
        value: 2,
        label:
          "Career and new opportunities",
      },
      {
        value: 3,
        label:
          "Freedom to explore anywhere",
      },
    ],
  },

  {
    id: 8,
    category:
      "future",

    prompt:
      "How do you balance career goals and personal life?",

    options: [
      {
        value: 0,
        label:
          "Personal life should always come first",
      },
      {
        value: 1,
        label:
          "Mostly personal life, with room for ambition",
      },
      {
        value: 2,
        label:
          "A balanced mix of both",
      },
      {
        value: 3,
        label:
          "I am willing to make big sacrifices for career goals",
      },
    ],
  },

  {
    id: 9,
    category:
      "future",

    prompt:
      "How important is financial planning for the future?",

    options: [
      {
        value: 0,
        label:
          "I prefer not to think too far ahead",
      },
      {
        value: 1,
        label:
          "Some planning is useful",
      },
      {
        value: 2,
        label:
          "It is very important",
      },
      {
        value: 3,
        label:
          "I want detailed goals, budgets, and long-term plans",
      },
    ],
  },

  {
    id: 10,
    category:
      "future",

    prompt:
      "How important is it for a couple to share the same long-term goals?",

    options: [
      {
        value: 0,
        label:
          "We can have very different paths",
      },
      {
        value: 1,
        label:
          "Some shared direction is enough",
      },
      {
        value: 2,
        label:
          "Most major goals should align",
      },
      {
        value: 3,
        label:
          "A shared vision of the future is extremely important",
      },
    ],
  },

  // ==============================
  // Fun & Connection
  // ==============================

  {
    id: 11,
    category:
      "connection",

    prompt:
      "What sounds like the best date night?",

    options: [
      {
        value: 0,
        label:
          "A quiet night at home",
      },
      {
        value: 1,
        label:
          "Dinner somewhere comfortable",
      },
      {
        value: 2,
        label:
          "Trying a new activity together",
      },
      {
        value: 3,
        label:
          "A spontaneous adventure",
      },
    ],
  },

  {
    id: 12,
    category:
      "connection",

    prompt:
      "How do you feel about surprises from your partner?",

    options: [
      {
        value: 0,
        label:
          "I would rather know the plan",
      },
      {
        value: 1,
        label:
          "Small surprises are nice",
      },
      {
        value: 2,
        label:
          "I enjoy being surprised",
      },
      {
        value: 3,
        label:
          "I love big spontaneous surprises",
      },
    ],
  },

  {
    id: 13,
    category:
      "connection",

    prompt:
      "How important are shared hobbies in a relationship?",

    options: [
      {
        value: 0,
        label:
          "Separate hobbies are completely fine",
      },
      {
        value: 1,
        label:
          "One shared interest is enough",
      },
      {
        value: 2,
        label:
          "I like having several things we enjoy together",
      },
      {
        value: 3,
        label:
          "Shared hobbies are a huge part of feeling connected",
      },
    ],
  },

  {
    id: 14,
    category:
      "connection",

    prompt:
      "How often do you like checking in with your partner during the day?",

    options: [
      {
        value: 0,
        label:
          "A message or two is plenty",
      },
      {
        value: 1,
        label:
          "A few updates during the day",
      },
      {
        value: 2,
        label:
          "Regular messages and conversation",
      },
      {
        value: 3,
        label:
          "I love staying connected throughout the day",
      },
    ],
  },

  {
    id: 15,
    category:
      "connection",

    prompt:
      "Which kind of couple time feels best to you?",

    options: [
      {
        value: 0,
        label:
          "Quietly doing our own things together",
      },
      {
        value: 1,
        label:
          "Relaxed conversations and simple activities",
      },
      {
        value: 2,
        label:
          "Planned dates and shared experiences",
      },
      {
        value: 3,
        label:
          "Always trying something new together",
      },
    ],
  },

  // ==============================
  // Everyday Habits
  // ==============================

  {
    id: 16,
    category:
      "habits",

    prompt:
      "What is your natural daily rhythm?",

    options: [
      {
        value: 0,
        label:
          "Very much a morning person",
      },
      {
        value: 1,
        label:
          "Usually better earlier in the day",
      },
      {
        value: 2,
        label:
          "Usually better later in the day",
      },
      {
        value: 3,
        label:
          "Definitely a night owl",
      },
    ],
  },

  {
    id: 17,
    category:
      "habits",

    prompt:
      "How organized do you like your home to be?",

    options: [
      {
        value: 0,
        label:
          "Everything should have its place",
      },
      {
        value: 1,
        label:
          "Mostly tidy and organized",
      },
      {
        value: 2,
        label:
          "Comfortable with a little mess",
      },
      {
        value: 3,
        label:
          "I rarely worry about clutter",
      },
    ],
  },

  {
    id: 18,
    category:
      "habits",

    prompt:
      "What is your ideal approach to meals at home?",

    options: [
      {
        value: 0,
        label:
          "Plan meals and cook most of the time",
      },
      {
        value: 1,
        label:
          "Mostly cook with some takeout",
      },
      {
        value: 2,
        label:
          "A mix of cooking, eating out, and delivery",
      },
      {
        value: 3,
        label:
          "Keep it spontaneous — decide when we are hungry",
      },
    ],
  },

  {
    id: 19,
    category:
      "habits",

    prompt:
      "How early do you like making plans?",

    options: [
      {
        value: 0,
        label:
          "As early as possible",
      },
      {
        value: 1,
        label:
          "A few days ahead",
      },
      {
        value: 2,
        label:
          "Usually the day before",
      },
      {
        value: 3,
        label:
          "Last-minute plans are the most fun",
      },
    ],
  },

  {
    id: 20,
    category:
      "habits",

    prompt:
      "How much alone time do you usually need?",

    options: [
      {
        value: 0,
        label:
          "A lot — regular alone time is important",
      },
      {
        value: 1,
        label:
          "Some personal time every day",
      },
      {
        value: 2,
        label:
          "A little alone time now and then",
      },
      {
        value: 3,
        label:
          "I prefer spending most of my free time together",
      },
    ],
  },
];