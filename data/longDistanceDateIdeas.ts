export type LongDistanceDateCategoryKey =
  | "play-together"
  | "solve-together"
  | "move-together"
  | "eat-together"
  | "watch-together"
  | "same-sky"
  | "talk-connect"
  | "everyday-life";

export type LongDistanceDateMood =
  | "Playful"
  | "Cozy"
  | "Curious"
  | "Active"
  | "Meaningful";

export type LongDistanceDateDuration =
  | "Quick"
  | "Medium"
  | "Long";

export type LongDistanceDateBudget =
  | "Free"
  | "Low-cost";

export type LongDistanceDateIdea = {
  id: string;
  category: LongDistanceDateCategoryKey;
  title: string;
  description: string;
  icon: string;
  mood: LongDistanceDateMood;
  duration: LongDistanceDateDuration;
  durationLabel: string;
  budget: LongDistanceDateBudget;
  href?: string;
  cta?: string;
};

export type LongDistanceDateCategory = {
  key: LongDistanceDateCategoryKey;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
};

export const longDistanceDateCategories: LongDistanceDateCategory[] = [
  {
    key: "play-together",
    title: "Play Together",
    shortTitle: "Play",
    icon: "🎮",
    description:
      "Turn an ordinary call into a small game night with quick choices, quizzes, challenges, and two-device activities.",
  },
  {
    key: "solve-together",
    title: "Solve Something Together",
    shortTitle: "Solve",
    icon: "🧩",
    description:
      "Work on the same little problem, clue, puzzle, or challenge so the date feels cooperative instead of passive.",
  },
  {
    key: "move-together",
    title: "Move Together",
    shortTitle: "Move",
    icon: "🚶",
    description:
      "Use a call as company while you walk, stretch, explore, or do something active in your own locations.",
  },
  {
    key: "eat-together",
    title: "Eat Together",
    shortTitle: "Eat",
    icon: "🍜",
    description:
      "Share a meal, snack, recipe, or tiny food challenge so you can still have some of the rhythm of eating together.",
  },
  {
    key: "watch-together",
    title: "Watch Together",
    shortTitle: "Watch",
    icon: "📺",
    description:
      "Watch something short enough to discuss instead of defaulting to another full movie every time.",
  },
  {
    key: "same-sky",
    title: "Look at the Same Sky",
    shortTitle: "Same Sky",
    icon: "🌙",
    description:
      "Use the moon, sunset, stars, weather, or sky as a small shared moment even when you are far apart.",
  },
  {
    key: "talk-connect",
    title: "Talk & Connect",
    shortTitle: "Talk",
    icon: "💬",
    description:
      "Use one good prompt, memory, or future question when you want the date to feel more personal without becoming heavy.",
  },
  {
    key: "everyday-life",
    title: "Do Everyday Life Together",
    shortTitle: "Everyday",
    icon: "☕",
    description:
      "Share normal routines such as chores, errands, studying, or quiet company so distance feels a little less formal.",
  },
];

export const longDistanceDateIdeas: LongDistanceDateIdea[] = [
  // =======================================================
  // Play Together
  // =======================================================
  {
    id: "private-would-you-rather-room",
    category: "play-together",
    title: "Start a Private Would You Rather Room",
    description:
      "Create a TwoLumi room, share the six-character code, answer privately on separate devices, and reveal your choices together.",
    icon: "⚖️",
    mood: "Playful",
    duration: "Medium",
    durationLabel: "15–25 min",
    budget: "Free",
    href: "/would-you-rather-questions-for-couples",
    cta: "Play Would You Rather",
  },
  {
    id: "this-or-that-sprint",
    category: "play-together",
    title: "Do a This or That Sprint",
    description:
      "Pick ten fast choices, explain only the surprising answers, and keep the whole date light and easy.",
    icon: "↔️",
    mood: "Playful",
    duration: "Quick",
    durationLabel: "10–15 min",
    budget: "Free",
    href: "/this-or-that-for-couples",
    cta: "Play This or That",
  },
  {
    id: "partner-quiz-swap",
    category: "play-together",
    title: "Take a Partner Quiz",
    description:
      "Predict each other’s answers, compare the score, and use the missed answers as conversation starters.",
    icon: "🧠",
    mood: "Curious",
    duration: "Medium",
    durationLabel: "15–25 min",
    budget: "Free",
    href: "/couple-quiz",
    cta: "Take the Couple Quiz",
  },
  {
    id: "compatibility-night",
    category: "play-together",
    title: "Compare Your Preferences",
    description:
      "Take a light compatibility test and talk about the categories where your answers line up or differ.",
    icon: "💞",
    mood: "Curious",
    duration: "Medium",
    durationLabel: "15–25 min",
    budget: "Free",
    href: "/couple-compatibility-test",
    cta: "Try the Compatibility Test",
  },
  {
    id: "three-game-mini-tournament",
    category: "play-together",
    title: "Make a Three-Game Mini Tournament",
    description:
      "Choose three short couple games, give one point for each round winner, and let the final winner pick your next date idea.",
    icon: "🏆",
    mood: "Playful",
    duration: "Long",
    durationLabel: "30–45 min",
    budget: "Free",
    href: "/games",
    cta: "Browse Couple Games",
  },
  {
    id: "emoji-story-challenge",
    category: "play-together",
    title: "Tell a Story Using Only Emoji",
    description:
      "One person sends five emoji that describe a memory, place, movie, or future plan. The other person has to guess the story.",
    icon: "😄",
    mood: "Playful",
    duration: "Quick",
    durationLabel: "10–15 min",
    budget: "Free",
  },
  {
    id: "camera-object-guess",
    category: "play-together",
    title: "Play Guess the Object on Camera",
    description:
      "Show only a tiny part of an object near you and let your partner ask yes-or-no questions until they guess it.",
    icon: "🔎",
    mood: "Playful",
    duration: "Quick",
    durationLabel: "10–20 min",
    budget: "Free",
  },

  // =======================================================
  // Solve Together
  // =======================================================
  {
    id: "same-crossword",
    category: "solve-together",
    title: "Work on the Same Crossword",
    description:
      "Open the same crossword or word puzzle, share your screen or read clues aloud, and solve it as one team.",
    icon: "📝",
    mood: "Curious",
    duration: "Medium",
    durationLabel: "20–30 min",
    budget: "Free",
  },
  {
    id: "mini-escape-room",
    category: "solve-together",
    title: "Try a Mini Online Escape Puzzle",
    description:
      "Pick a short browser puzzle and talk through every clue together instead of splitting up the work.",
    icon: "🔐",
    mood: "Curious",
    duration: "Long",
    durationLabel: "30–60 min",
    budget: "Free",
  },
  {
    id: "five-clues-one-answer",
    category: "solve-together",
    title: "Play Five Clues, One Answer",
    description:
      "Choose a person, place, object, or memory. Give one clue at a time and see how early your partner can solve it.",
    icon: "5️⃣",
    mood: "Playful",
    duration: "Quick",
    durationLabel: "10–20 min",
    budget: "Free",
  },
  {
    id: "shared-jigsaw",
    category: "solve-together",
    title: "Build a Jigsaw Together",
    description:
      "Use a shared online jigsaw, stay on a call, and treat the finished picture as the goal for the date.",
    icon: "🧩",
    mood: "Cozy",
    duration: "Long",
    durationLabel: "30–60 min",
    budget: "Free",
  },
  {
    id: "zoomed-photo-mystery",
    category: "solve-together",
    title: "Make a Zoomed-In Photo Mystery",
    description:
      "Crop a photo from your day until it is hard to recognize, then let your partner guess what they are looking at.",
    icon: "📷",
    mood: "Curious",
    duration: "Quick",
    durationLabel: "10–15 min",
    budget: "Free",
  },
  {
    id: "logic-clue-night",
    category: "solve-together",
    title: "Solve One Logic Puzzle Together",
    description:
      "Pick one logic problem and narrate your thought process. The fun is hearing how the other person approaches the same problem.",
    icon: "🧠",
    mood: "Curious",
    duration: "Medium",
    durationLabel: "15–30 min",
    budget: "Free",
  },
  {
    id: "plan-trip-budget-challenge",
    category: "solve-together",
    title: "Plan a Dream Trip With a Fake Budget",
    description:
      "Give yourselves a pretend budget and one destination. Work together to choose transport, food, and one activity.",
    icon: "🗺️",
    mood: "Meaningful",
    duration: "Long",
    durationLabel: "30–45 min",
    budget: "Free",
  },

  // =======================================================
  // Move Together
  // =======================================================
  {
    id: "walk-and-talk",
    category: "move-together",
    title: "Take a Walk-and-Talk Date",
    description:
      "Put on headphones and each walk around your own neighborhood while staying on the same call.",
    icon: "🚶",
    mood: "Active",
    duration: "Long",
    durationLabel: "30–45 min",
    budget: "Free",
  },
  {
    id: "ten-minute-stretch",
    category: "move-together",
    title: "Do a Ten-Minute Stretch Together",
    description:
      "Choose a simple stretch routine, start at the same time, and laugh about who is less flexible.",
    icon: "🧘",
    mood: "Active",
    duration: "Quick",
    durationLabel: "10–15 min",
    budget: "Free",
  },
  {
    id: "step-count-date",
    category: "move-together",
    title: "Set a Shared Step Goal",
    description:
      "Pick a small target for the next thirty minutes and walk while you talk. Compare your totals at the end.",
    icon: "👟",
    mood: "Active",
    duration: "Long",
    durationLabel: "30–45 min",
    budget: "Free",
  },
  {
    id: "teach-one-move",
    category: "move-together",
    title: "Teach Each Other One Move",
    description:
      "Each person teaches one stretch, dance move, exercise, or silly movement the other person has to copy.",
    icon: "🕺",
    mood: "Playful",
    duration: "Quick",
    durationLabel: "10–20 min",
    budget: "Free",
  },
  {
    id: "same-song-dance",
    category: "move-together",
    title: "Play the Same Song and Move",
    description:
      "Choose one song, press play at roughly the same time, and dance, clean, or just move around while you stay on video.",
    icon: "🎵",
    mood: "Playful",
    duration: "Quick",
    durationLabel: "10–15 min",
    budget: "Free",
  },
  {
    id: "neighborhood-scavenger-walk",
    category: "move-together",
    title: "Do a Neighborhood Scavenger Walk",
    description:
      "Make a five-item list such as something red, something old, a dog, a flower, and a funny sign. Find them while on a call.",
    icon: "🔍",
    mood: "Active",
    duration: "Long",
    durationLabel: "30–45 min",
    budget: "Free",
  },
  {
    id: "sunset-walk",
    category: "move-together",
    title: "Schedule a Sunset Walk",
    description:
      "If your time zones allow it, both go outside near sunset and share what your side of the world looks like.",
    icon: "🌅",
    mood: "Cozy",
    duration: "Medium",
    durationLabel: "20–30 min",
    budget: "Free",
  },

  // =======================================================
  // Eat Together
  // =======================================================
  {
    id: "same-snack",
    category: "eat-together",
    title: "Buy the Same Kind of Snack",
    description:
      "Pick a snack both of you can find locally, open it together, and compare whether it actually tastes the same.",
    icon: "🍪",
    mood: "Cozy",
    duration: "Quick",
    durationLabel: "10–20 min",
    budget: "Low-cost",
  },
  {
    id: "same-recipe",
    category: "eat-together",
    title: "Cook the Same Simple Recipe",
    description:
      "Choose something forgiving, keep the call running while you cook, then sit down and compare the results.",
    icon: "🍳",
    mood: "Cozy",
    duration: "Long",
    durationLabel: "45–60 min",
    budget: "Low-cost",
  },
  {
    id: "blind-taste-description",
    category: "eat-together",
    title: "Describe a Mystery Food",
    description:
      "Each person chooses something to eat without naming it and describes the taste, texture, and smell until the other person guesses.",
    icon: "😋",
    mood: "Playful",
    duration: "Quick",
    durationLabel: "10–20 min",
    budget: "Low-cost",
  },
  {
    id: "breakfast-call",
    category: "eat-together",
    title: "Have Breakfast Together",
    description:
      "Instead of another evening call, meet over breakfast or coffee and start the day together.",
    icon: "🥐",
    mood: "Cozy",
    duration: "Medium",
    durationLabel: "20–30 min",
    budget: "Low-cost",
  },
  {
    id: "coffee-review",
    category: "eat-together",
    title: "Do a Tiny Coffee or Tea Review",
    description:
      "Each person makes or buys a drink, gives it a ridiculous score out of ten, and explains the rating.",
    icon: "☕",
    mood: "Cozy",
    duration: "Quick",
    durationLabel: "10–20 min",
    budget: "Low-cost",
  },
  {
    id: "pantry-challenge",
    category: "eat-together",
    title: "Make Something From What You Already Have",
    description:
      "Give yourselves fifteen minutes to create a snack from whatever is already in the kitchen, then reveal the result.",
    icon: "🥣",
    mood: "Playful",
    duration: "Medium",
    durationLabel: "20–30 min",
    budget: "Free",
  },
  {
    id: "favorite-local-food",
    category: "eat-together",
    title: "Try Each Other’s Favorite Local Food",
    description:
      "Find the closest local equivalent to something your partner loves and compare how similar or different it is.",
    icon: "🍜",
    mood: "Curious",
    duration: "Long",
    durationLabel: "30–60 min",
    budget: "Low-cost",
  },

  // =======================================================
  // Watch Together
  // =======================================================
  {
    id: "three-short-videos",
    category: "watch-together",
    title: "Swap Three Short Videos",
    description:
      "Each person brings three short videos. Watch them together and explain why each one was worth sharing.",
    icon: "▶️",
    mood: "Playful",
    duration: "Medium",
    durationLabel: "20–30 min",
    budget: "Free",
  },
  {
    id: "pilot-episode",
    category: "watch-together",
    title: "Try One Pilot Episode",
    description:
      "Pick a show neither of you has seen, watch only the first episode, then decide together whether it earns episode two.",
    icon: "📺",
    mood: "Cozy",
    duration: "Long",
    durationLabel: "30–60 min",
    budget: "Free",
  },
  {
    id: "mini-documentary",
    category: "watch-together",
    title: "Watch a Mini Documentary",
    description:
      "Choose a short documentary or explainer about something neither of you knows much about and compare what surprised you.",
    icon: "🌍",
    mood: "Curious",
    duration: "Medium",
    durationLabel: "20–30 min",
    budget: "Free",
  },
  {
    id: "music-video-swap",
    category: "watch-together",
    title: "Swap Music Videos",
    description:
      "Each choose two songs the other person does not know. Watch the videos and explain the story or memory behind the choice.",
    icon: "🎧",
    mood: "Meaningful",
    duration: "Medium",
    durationLabel: "20–30 min",
    budget: "Free",
  },
  {
    id: "photo-slideshow",
    category: "watch-together",
    title: "Make a Five-Photo Slideshow of Your Week",
    description:
      "Pick five photos from your week and take turns telling the story behind each one.",
    icon: "🖼️",
    mood: "Meaningful",
    duration: "Medium",
    durationLabel: "15–25 min",
    budget: "Free",
  },
  {
    id: "trailer-guessing",
    category: "watch-together",
    title: "Play Movie Trailer Guessing",
    description:
      "Play a trailer with the title hidden and let your partner guess the genre, plot, or whether they would watch it.",
    icon: "🎬",
    mood: "Playful",
    duration: "Quick",
    durationLabel: "10–20 min",
    budget: "Free",
  },
  {
    id: "live-event-check-in",
    category: "watch-together",
    title: "Watch the Same Live Event",
    description:
      "Pick a public livestream, sports moment, launch, performance, or event that both of you can watch and react to in real time.",
    icon: "📡",
    mood: "Playful",
    duration: "Long",
    durationLabel: "30–60 min",
    budget: "Free",
  },

  // =======================================================
  // Look at the Same Sky
  // =======================================================
  {
    id: "moon-check-in",
    category: "same-sky",
    title: "Find the Moon at the Same Time",
    description:
      "Step outside, look for the moon, and send a photo from each location. It is simple, but it creates a literal shared point of view.",
    icon: "🌙",
    mood: "Cozy",
    duration: "Quick",
    durationLabel: "10–15 min",
    budget: "Free",
  },
  {
    id: "constellation-hunt",
    category: "same-sky",
    title: "Do a Constellation Hunt",
    description:
      "Use a star map and see whether both of you can identify one constellation from your own locations.",
    icon: "✨",
    mood: "Curious",
    duration: "Medium",
    durationLabel: "20–30 min",
    budget: "Free",
  },
  {
    id: "sunset-photo",
    category: "same-sky",
    title: "Trade Sunset Photos",
    description:
      "Take one photo around sunset from each location and compare the colors, clouds, streets, or skyline.",
    icon: "🌇",
    mood: "Cozy",
    duration: "Quick",
    durationLabel: "10–15 min",
    budget: "Free",
  },
  {
    id: "weather-report",
    category: "same-sky",
    title: "Give Each Other a Two-Minute Weather Report",
    description:
      "Step outside and describe the temperature, sounds, wind, sky, and what people around you are doing.",
    icon: "☁️",
    mood: "Playful",
    duration: "Quick",
    durationLabel: "10–15 min",
    budget: "Free",
  },
  {
    id: "star-map-challenge",
    category: "same-sky",
    title: "Compare What Is Visible in Each Sky",
    description:
      "Open a sky map, choose one planet or bright star, and see whether it is visible from both locations.",
    icon: "🪐",
    mood: "Curious",
    duration: "Medium",
    durationLabel: "15–25 min",
    budget: "Free",
  },
  {
    id: "astronomy-event-date",
    category: "same-sky",
    title: "Plan Around an Astronomy Event",
    description:
      "Put a meteor shower, eclipse, moon phase, or other sky event on your shared calendar and turn it into a future date.",
    icon: "🌠",
    mood: "Meaningful",
    duration: "Medium",
    durationLabel: "20–30 min",
    budget: "Free",
  },
  {
    id: "cloud-shape-competition",
    category: "same-sky",
    title: "Have a Cloud Shape Competition",
    description:
      "If it is daytime, each person finds the strangest cloud they can see and explains what it looks like.",
    icon: "☁️",
    mood: "Playful",
    duration: "Quick",
    durationLabel: "10–15 min",
    budget: "Free",
  },

  // =======================================================
  // Talk & Connect
  // =======================================================
  {
    id: "long-distance-question",
    category: "talk-connect",
    title: "Pick One Long Distance Question",
    description:
      "Choose one question instead of forcing a full list. Stay with the answer if it opens up a better conversation.",
    icon: "📱",
    mood: "Meaningful",
    duration: "Quick",
    durationLabel: "10–20 min",
    budget: "Free",
    href: "/questions-for-long-distance-couples",
    cta: "Browse Long Distance Questions",
  },
  {
    id: "random-couple-question",
    category: "talk-connect",
    title: "Use the Random Couple Question Generator",
    description:
      "Let TwoLumi choose a question for you when neither person knows what to talk about next.",
    icon: "💬",
    mood: "Curious",
    duration: "Quick",
    durationLabel: "10–20 min",
    budget: "Free",
    href: "/couple-questions",
    cta: "Pick a Couple Question",
  },
  {
    id: "future-trip-question",
    category: "talk-connect",
    title: "Plan One Detail of Your Next Trip",
    description:
      "Do not plan the whole visit. Pick one restaurant, walk, day trip, breakfast, or tiny thing you want to do together.",
    icon: "✈️",
    mood: "Meaningful",
    duration: "Medium",
    durationLabel: "15–25 min",
    budget: "Free",
  },
  {
    id: "memory-minute",
    category: "talk-connect",
    title: "Tell the Same Memory From Both Sides",
    description:
      "Pick a shared memory and each describe what you remember first, what you noticed, and what made it stick.",
    icon: "📸",
    mood: "Meaningful",
    duration: "Medium",
    durationLabel: "15–25 min",
    budget: "Free",
  },
  {
    id: "high-low-grateful",
    category: "talk-connect",
    title: "Share a High, a Low, and One Good Thing",
    description:
      "Each person shares one good moment, one difficult moment, and one thing they appreciated that day.",
    icon: "🌤️",
    mood: "Meaningful",
    duration: "Quick",
    durationLabel: "10–20 min",
    budget: "Free",
  },
  {
    id: "voice-note-story",
    category: "talk-connect",
    title: "Exchange a Two-Minute Voice Story",
    description:
      "Before the date, each person records one small story from the week. Listen together and ask one follow-up question.",
    icon: "🎙️",
    mood: "Cozy",
    duration: "Quick",
    durationLabel: "10–20 min",
    budget: "Free",
  },
  {
    id: "perfect-next-visit",
    category: "talk-connect",
    title: "Describe One Perfect Hour of Your Next Visit",
    description:
      "Imagine only one hour together. Where are you, what are you doing, and what would make that hour feel perfect?",
    icon: "💗",
    mood: "Meaningful",
    duration: "Medium",
    durationLabel: "15–25 min",
    budget: "Free",
  },

  // =======================================================
  // Everyday Life Together
  // =======================================================
  {
    id: "quiet-cowork",
    category: "everyday-life",
    title: "Do a Quiet Co-Working Date",
    description:
      "Keep a call open while each person studies, works, reads, or handles a small task. Check in only at the start and end.",
    icon: "💻",
    mood: "Cozy",
    duration: "Long",
    durationLabel: "30–60 min",
    budget: "Free",
  },
  {
    id: "chores-on-call",
    category: "everyday-life",
    title: "Do Chores While You Talk",
    description:
      "Fold laundry, clean a desk, wash dishes, or tidy a room while keeping each other company on the call.",
    icon: "🧺",
    mood: "Cozy",
    duration: "Long",
    durationLabel: "30–45 min",
    budget: "Free",
  },
  {
    id: "grocery-aisle-date",
    category: "everyday-life",
    title: "Take Each Other Grocery Shopping",
    description:
      "Call from the store and show your partner what is normal, weird, cheap, expensive, or new where you live.",
    icon: "🛒",
    mood: "Curious",
    duration: "Long",
    durationLabel: "30–45 min",
    budget: "Low-cost",
  },
  {
    id: "commute-together",
    category: "everyday-life",
    title: "Share Part of Your Commute",
    description:
      "If it is safe and practical, use an audio call during a walk or public-transit commute so your partner hears part of your normal day.",
    icon: "🚇",
    mood: "Cozy",
    duration: "Medium",
    durationLabel: "15–30 min",
    budget: "Free",
  },
  {
    id: "morning-routine",
    category: "everyday-life",
    title: "Do a Morning Routine Call",
    description:
      "Try a short call while making coffee, getting ready, or starting work instead of saving every conversation for nighttime.",
    icon: "🌤️",
    mood: "Cozy",
    duration: "Quick",
    durationLabel: "10–20 min",
    budget: "Free",
  },
  {
    id: "focus-sprint",
    category: "everyday-life",
    title: "Do a 25-Minute Focus Sprint",
    description:
      "Choose one task each, work silently for twenty-five minutes, then come back and tell each other what you finished.",
    icon: "⏱️",
    mood: "Curious",
    duration: "Medium",
    durationLabel: "25–35 min",
    budget: "Free",
  },
  {
    id: "tiny-room-tour",
    category: "everyday-life",
    title: "Give a Tiny Room Tour",
    description:
      "Show one shelf, desk corner, drawer, or object that changed recently and tell the story behind it.",
    icon: "🏠",
    mood: "Cozy",
    duration: "Quick",
    durationLabel: "10–15 min",
    budget: "Free",
  },
];

export const longDistanceDateIdeaCount =
  longDistanceDateIdeas.length;
