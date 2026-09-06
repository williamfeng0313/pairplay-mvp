export type SameAnswerCategory =
  | "fun"
  | "everyday"
  | "food"
  | "date"
  | "travel"
  | "future";

export type SameAnswerQuestion = {
  id: string;

  category:
    SameAnswerCategory;

  question: string;

  options: [
    string,
    string,
    string,
    string
  ];
};

export const sameAnswerBank:
  SameAnswerQuestion[] = [
  {
    id: "sa_001",
    category: "fun",
    question:
      "Pick a superpower.",
    options: [
      "Teleport anywhere",
      "Read minds",
      "Pause time",
      "Fly",
    ],
  },

  {
    id: "sa_002",
    category: "fun",
    question:
      "Which animal would make the funniest pet?",
    options: [
      "Penguin",
      "Monkey",
      "Otter",
      "Mini elephant",
    ],
  },

  {
    id: "sa_003",
    category: "fun",
    question:
      "What sounds most fun right now?",
    options: [
      "Game night",
      "Movie night",
      "Late-night drive",
      "Trying something random",
    ],
  },

  {
    id: "sa_004",
    category: "fun",
    question:
      "Choose our imaginary team mascot.",
    options: [
      "Capybara",
      "Duck",
      "Cat",
      "Penguin",
    ],
  },

  {
    id: "sa_005",
    category: "fun",
    question:
      "Which challenge would you rather do together?",
    options: [
      "Escape room",
      "Cooking challenge",
      "Trivia night",
      "Treasure hunt",
    ],
  },

  {
    id: "sa_006",
    category: "everyday",
    question:
      "What's the perfect lazy Sunday?",
    options: [
      "Stay in bed",
      "Watch movies",
      "Go for brunch",
      "Take a walk",
    ],
  },

  {
    id: "sa_007",
    category: "everyday",
    question:
      "What should we do when we have a free hour?",
    options: [
      "Play a game",
      "Talk",
      "Watch something",
      "Go outside",
    ],
  },

  {
    id: "sa_008",
    category: "everyday",
    question:
      "Pick the best time of day.",
    options: [
      "Early morning",
      "Afternoon",
      "Sunset",
      "Late night",
    ],
  },

  {
    id: "sa_009",
    category: "everyday",
    question:
      "What's the better way to recharge?",
    options: [
      "Sleep",
      "Music",
      "Fresh air",
      "Doing nothing together",
    ],
  },

  {
    id: "sa_010",
    category: "everyday",
    question:
      "Choose our ideal weekend pace.",
    options: [
      "Plan everything",
      "One big activity",
      "Go with the flow",
      "Do absolutely nothing",
    ],
  },

  {
    id: "sa_011",
    category: "food",
    question:
      "Pick our comfort food.",
    options: [
      "Pizza",
      "Noodles",
      "Burgers",
      "Dessert",
    ],
  },

  {
    id: "sa_012",
    category: "food",
    question:
      "Choose a midnight snack.",
    options: [
      "Chips",
      "Ice cream",
      "Instant noodles",
      "Fruit",
    ],
  },

  {
    id: "sa_013",
    category: "food",
    question:
      "Where should we eat tonight?",
    options: [
      "Street food",
      "Cozy café",
      "Nice restaurant",
      "Cook at home",
    ],
  },

  {
    id: "sa_014",
    category: "food",
    question:
      "Pick a food adventure.",
    options: [
      "Try something spicy",
      "Try a new cuisine",
      "Bake together",
      "Mystery takeaway",
    ],
  },

  {
    id: "sa_015",
    category: "food",
    question:
      "What should we share?",
    options: [
      "Fries",
      "Dessert",
      "Pizza",
      "Nothing — get your own 😄",
    ],
  },

  {
    id: "sa_016",
    category: "date",
    question:
      "Pick our ideal date night.",
    options: [
      "Movie night",
      "Dinner out",
      "Game night",
      "Try something new",
    ],
  },

  {
    id: "sa_017",
    category: "date",
    question:
      "What sounds most romantic?",
    options: [
      "Sunset walk",
      "Home-cooked dinner",
      "Surprise date",
      "Long late-night talk",
    ],
  },

  {
    id: "sa_018",
    category: "date",
    question:
      "Choose a spontaneous date.",
    options: [
      "Coffee run",
      "Picnic",
      "Arcade",
      "Explore somewhere new",
    ],
  },

  {
    id: "sa_019",
    category: "date",
    question:
      "What's our perfect cozy date?",
    options: [
      "Blanket + movie",
      "Cook together",
      "Board games",
      "Talk all night",
    ],
  },

  {
    id: "sa_020",
    category: "date",
    question:
      "Choose one date-night rule.",
    options: [
      "No phones",
      "Try something new",
      "Take lots of photos",
      "No planning allowed",
    ],
  },

  {
    id: "sa_021",
    category: "travel",
    question:
      "Pick our next trip vibe.",
    options: [
      "Beach",
      "Big city",
      "Mountains",
      "Countryside",
    ],
  },

  {
    id: "sa_022",
    category: "travel",
    question:
      "How should we travel?",
    options: [
      "Road trip",
      "Train",
      "Plane",
      "Boat",
    ],
  },

  {
    id: "sa_023",
    category: "travel",
    question:
      "Pick our vacation style.",
    options: [
      "Relax all day",
      "Explore nonstop",
      "Food trip",
      "Mix of everything",
    ],
  },

  {
    id: "sa_024",
    category: "travel",
    question:
      "Where should we wake up tomorrow?",
    options: [
      "Tokyo",
      "Paris",
      "Bali",
      "New York",
    ],
  },

  {
    id: "sa_025",
    category: "travel",
    question:
      "What would we photograph most on a trip?",
    options: [
      "Food",
      "Scenery",
      "Each other",
      "Random funny things",
    ],
  },

  {
    id: "sa_026",
    category: "future",
    question:
      "Pick our dream home.",
    options: [
      "City apartment",
      "Beach house",
      "Cozy cottage",
      "Modern house",
    ],
  },

  {
    id: "sa_027",
    category: "future",
    question:
      "Which future plan sounds best?",
    options: [
      "Travel more",
      "Build a cozy home",
      "Start a project together",
      "Try lots of new things",
    ],
  },

  {
    id: "sa_028",
    category: "future",
    question:
      "Choose something we should learn together.",
    options: [
      "Cooking",
      "A language",
      "Dancing",
      "Photography",
    ],
  },

  {
    id: "sa_029",
    category: "future",
    question:
      "What should we do more often?",
    options: [
      "Try new places",
      "Take photos",
      "Play games",
      "Have slow evenings",
    ],
  },

  {
    id: "sa_030",
    category: "future",
    question:
      "Pick something we'd love to look back on.",
    options: [
      "Trips",
      "Funny moments",
      "Photos",
      "Things we built together",
    ],
  },
];