export type PartnerQuizCategory =
  | "food"
  | "habits"
  | "favorites"
  | "relationship"
  | "future";

export type PartnerQuizOptionValue =
  | 0
  | 1
  | 2
  | 3;

export type PartnerQuizOption = {
  value: PartnerQuizOptionValue;
  label: string;
};

export type PartnerQuizQuestion = {
  id: number;

  category: PartnerQuizCategory;

  /*
   * 第一轮：
   * Quiz Taker 预测 Partner 会怎么回答
   */
  predictionPrompt: string;

  /*
   * 第二轮：
   * Partner 自己回答
   */
  partnerPrompt: string;

  options: PartnerQuizOption[];
};

/* ==============================
   Category Labels
============================== */

export const partnerQuizCategoryLabels: Record<
  PartnerQuizCategory,
  string
> = {
  food: "Food & Drinks",
  habits: "Everyday Habits",
  favorites: "Favorites & Fun",
  relationship:
    "Memories & Relationship",
  future: "Future & Dreams",
};

export const partnerQuizCategoryOrder: PartnerQuizCategory[] =
  [
    "food",
    "habits",
    "favorites",
    "relationship",
    "future",
  ];

/* ==============================
   20 Questions
   5 categories × 4 questions
============================== */

export const partnerQuizQuestions: PartnerQuizQuestion[] =
  [
    /* ==============================
       Food & Drinks
       1–4
    ============================== */

    {
      id: 1,

      category: "food",

      predictionPrompt:
        "What would your partner choose for breakfast?",

      partnerPrompt:
        "What would you choose for breakfast?",

      options: [
        {
          value: 0,
          label:
            "Something sweet",
        },
        {
          value: 1,
          label:
            "Something savory",
        },
        {
          value: 2,
          label:
            "Coffee is enough",
        },
        {
          value: 3,
          label:
            "Skip breakfast",
        },
      ],
    },

    {
      id: 2,

      category: "food",

      predictionPrompt:
        "Which kind of dinner would your partner prefer?",

      partnerPrompt:
        "Which kind of dinner would you prefer?",

      options: [
        {
          value: 0,
          label:
            "Home-cooked meal",
        },
        {
          value: 1,
          label:
            "Casual takeout",
        },
        {
          value: 2,
          label:
            "Nice restaurant",
        },
        {
          value: 3,
          label:
            "Try somewhere completely new",
        },
      ],
    },

    {
      id: 3,

      category: "food",

      predictionPrompt:
        "What drink would your partner choose most often?",

      partnerPrompt:
        "What drink would you choose most often?",

      options: [
        {
          value: 0,
          label: "Coffee",
        },
        {
          value: 1,
          label: "Tea",
        },
        {
          value: 2,
          label:
            "Soft drink or juice",
        },
        {
          value: 3,
          label: "Water",
        },
      ],
    },

    {
      id: 4,

      category: "food",

      predictionPrompt:
        "When choosing food, what matters most to your partner?",

      partnerPrompt:
        "When choosing food, what matters most to you?",

      options: [
        {
          value: 0,
          label: "Taste",
        },
        {
          value: 1,
          label: "Health",
        },
        {
          value: 2,
          label: "Price",
        },
        {
          value: 3,
          label:
            "Trying something new",
        },
      ],
    },

    /* ==============================
       Everyday Habits
       5–8
    ============================== */

    {
      id: 5,

      category: "habits",

      predictionPrompt:
        "What time of day is your partner usually happiest?",

      partnerPrompt:
        "What time of day are you usually happiest?",

      options: [
        {
          value: 0,
          label:
            "Early morning",
        },
        {
          value: 1,
          label:
            "Late morning",
        },
        {
          value: 2,
          label: "Afternoon",
        },
        {
          value: 3,
          label: "Evening",
        },
      ],
    },

    {
      id: 6,

      category: "habits",

      predictionPrompt:
        "How does your partner usually plan things?",

      partnerPrompt:
        "How do you usually plan things?",

      options: [
        {
          value: 0,
          label:
            "Far in advance",
        },
        {
          value: 1,
          label:
            "A few days ahead",
        },
        {
          value: 2,
          label:
            "The day before",
        },
        {
          value: 3,
          label:
            "At the last minute",
        },
      ],
    },

    {
      id: 7,

      category: "habits",

      predictionPrompt:
        "What does your partner usually do when they have free time?",

      partnerPrompt:
        "What do you usually do when you have free time?",

      options: [
        {
          value: 0,
          label:
            "Relax alone",
        },
        {
          value: 1,
          label:
            "Watch something",
        },
        {
          value: 2,
          label: "Go out",
        },
        {
          value: 3,
          label:
            "Spend time with people",
        },
      ],
    },

    {
      id: 8,

      category: "habits",

      predictionPrompt:
        "How tidy is your partner normally?",

      partnerPrompt:
        "How tidy are you normally?",

      options: [
        {
          value: 0,
          label:
            "Very organized",
        },
        {
          value: 1,
          label:
            "Mostly tidy",
        },
        {
          value: 2,
          label:
            "A little messy",
        },
        {
          value: 3,
          label:
            "Chaos is fine",
        },
      ],
    },

    /* ==============================
       Favorites & Fun
       9–12
    ============================== */

    {
      id: 9,

      category: "favorites",

      predictionPrompt:
        "What kind of date would your partner enjoy most?",

      partnerPrompt:
        "What kind of date would you enjoy most?",

      options: [
        {
          value: 0,
          label:
            "Quiet night at home",
        },
        {
          value: 1,
          label:
            "Dinner together",
        },
        {
          value: 2,
          label:
            "Fun activity",
        },
        {
          value: 3,
          label:
            "Spontaneous adventure",
        },
      ],
    },

    {
      id: 10,

      category: "favorites",

      predictionPrompt:
        "What type of trip would your partner choose?",

      partnerPrompt:
        "What type of trip would you choose?",

      options: [
        {
          value: 0,
          label: "Beach",
        },
        {
          value: 1,
          label: "City",
        },
        {
          value: 2,
          label: "Nature",
        },
        {
          value: 3,
          label:
            "Road trip",
        },
      ],
    },

    {
      id: 11,

      category: "favorites",

      predictionPrompt:
        "What kind of entertainment does your partner prefer?",

      partnerPrompt:
        "What kind of entertainment do you prefer?",

      options: [
        {
          value: 0,
          label: "Movies",
        },
        {
          value: 1,
          label: "Games",
        },
        {
          value: 2,
          label: "Music",
        },
        {
          value: 3,
          label:
            "Going out",
        },
      ],
    },

    {
      id: 12,

      category: "favorites",

      predictionPrompt:
        "What kind of gift would your partner appreciate most?",

      partnerPrompt:
        "What kind of gift would you appreciate most?",

      options: [
        {
          value: 0,
          label:
            "Something useful",
        },
        {
          value: 1,
          label:
            "Something personal",
        },
        {
          value: 2,
          label:
            "An experience",
        },
        {
          value: 3,
          label:
            "A surprise",
        },
      ],
    },

    /* ==============================
       Memories & Relationship
       13–16
    ============================== */

    {
      id: 13,

      category: "relationship",

      predictionPrompt:
        "Which kind of couple memory would your partner most want to relive?",

      partnerPrompt:
        "Which kind of couple memory would you most want to relive?",

      options: [
        {
          value: 0,
          label:
            "A quiet day together",
        },
        {
          value: 1,
          label:
            "A special date",
        },
        {
          value: 2,
          label: "A trip",
        },
        {
          value: 3,
          label:
            "A funny unexpected moment",
        },
      ],
    },

    {
      id: 14,

      category: "relationship",

      predictionPrompt:
        "What makes your partner feel most appreciated?",

      partnerPrompt:
        "What makes you feel most appreciated?",

      options: [
        {
          value: 0,
          label:
            "Kind words",
        },
        {
          value: 1,
          label:
            "Quality time",
        },
        {
          value: 2,
          label:
            "Helpful actions",
        },
        {
          value: 3,
          label:
            "Thoughtful surprises",
        },
      ],
    },

    {
      id: 15,

      category: "relationship",

      predictionPrompt:
        "When your partner has a difficult day, what do they usually want most?",

      partnerPrompt:
        "When you have a difficult day, what do you usually want most?",

      options: [
        {
          value: 0,
          label: "Space",
        },
        {
          value: 1,
          label:
            "Someone to listen",
        },
        {
          value: 2,
          label: "Advice",
        },
        {
          value: 3,
          label:
            "Comfort and reassurance",
        },
      ],
    },

    {
      id: 16,

      category: "relationship",

      predictionPrompt:
        "What makes your partner feel most connected to you?",

      partnerPrompt:
        "What makes you feel most connected to your partner?",

      options: [
        {
          value: 0,
          label: "Talking",
        },
        {
          value: 1,
          label:
            "Doing things together",
        },
        {
          value: 2,
          label:
            "Affection and closeness",
        },
        {
          value: 3,
          label:
            "Laughing and having fun",
        },
      ],
    },

    /* ==============================
       Future & Dreams
       17–20
    ============================== */

    {
      id: 17,

      category: "future",

      predictionPrompt:
        "Where would your partner most like to live someday?",

      partnerPrompt:
        "Where would you most like to live someday?",

      options: [
        {
          value: 0,
          label: "Big city",
        },
        {
          value: 1,
          label:
            "Quiet suburb",
        },
        {
          value: 2,
          label:
            "Small town",
        },
        {
          value: 3,
          label:
            "Somewhere completely new",
        },
      ],
    },

    {
      id: 18,

      category: "future",

      predictionPrompt:
        "What would your partner prioritize most in the future?",

      partnerPrompt:
        "What would you prioritize most in the future?",

      options: [
        {
          value: 0,
          label: "Career",
        },
        {
          value: 1,
          label:
            "Financial security",
        },
        {
          value: 2,
          label:
            "Experiences",
        },
        {
          value: 3,
          label:
            "Time with people they love",
        },
      ],
    },

    {
      id: 19,

      category: "future",

      predictionPrompt:
        "What would your partner most want to spend extra money on?",

      partnerPrompt:
        "What would you most want to spend extra money on?",

      options: [
        {
          value: 0,
          label: "Home",
        },
        {
          value: 1,
          label: "Travel",
        },
        {
          value: 2,
          label: "Hobbies",
        },
        {
          value: 3,
          label: "Savings",
        },
      ],
    },

    {
      id: 20,

      category: "future",

      predictionPrompt:
        "What would your partner want your future together to have more of?",

      partnerPrompt:
        "What would you want your future together to have more of?",

      options: [
        {
          value: 0,
          label: "Stability",
        },
        {
          value: 1,
          label:
            "Adventure",
        },
        {
          value: 2,
          label:
            "Shared goals",
        },
        {
          value: 3,
          label:
            "Free time together",
        },
      ],
    },
  ];

export const partnerQuizQuestionCount =
  partnerQuizQuestions.length;