export type CouplePuzzle = {
  id: string;
  category:
    | "Long Distance"
    | "Everyday"
    | "Travel"
    | "Connection"
    | "Wordplay";

  hostClue: string;
  guestClue: string;

  options: [
    string,
    string,
    string,
    string
  ];

  correctAnswer:
    | "0"
    | "1"
    | "2"
    | "3";

  explanation: string;
};


/*
 * V1 contains more questions than one session needs.
 * Each room deterministically receives 8 puzzles,
 * so Host and Guest always see the same order.
 */
export const couplePuzzleQuestions:
  CouplePuzzle[] = [
  {
    id: "cp-01",
    category: "Long Distance",
    hostClue:
      "I can change the hour without changing how long a day lasts.",

    guestClue:
      "Long-distance couples often check me before deciding when to call.",

    options: [
      "Calendar",
      "Timezone",
      "Alarm",
      "Sunset",
    ],

    correctAnswer:
      "1",

    explanation:
      "A timezone changes the local clock depending on where you are, which is why couples in different countries often plan calls around it.",
  },

  {
    id: "cp-02",
    category: "Connection",
    hostClue:
      "I contain many tracks, but no trains.",

    guestClue:
      "Couples can share me when they want to send feelings without writing a long message.",

    options: [
      "Playlist",
      "Calendar",
      "Photo album",
      "Podcast",
    ],

    correctAnswer:
      "0",

    explanation:
      "A playlist is made of tracks, and sharing songs can be a simple way to stay emotionally connected.",
  },

  {
    id: "cp-03",
    category: "Travel",
    hostClue:
      "I collect stamps, but I am not a post office.",

    guestClue:
      "You normally need me before crossing many international borders.",

    options: [
      "Suitcase",
      "Passport",
      "Postcard",
      "Boarding pass",
    ],

    correctAnswer:
      "1",

    explanation:
      "A passport can contain entry and exit stamps and is a key travel document for international trips.",
  },

  {
    id: "cp-04",
    category: "Everyday",
    hostClue:
      "I am invisible, but everyone notices when I disappear.",

    guestClue:
      "A bad version of me can ruin a video date in seconds.",

    options: [
      "Wi-Fi",
      "Music",
      "Battery",
      "Silence",
    ],

    correctAnswer:
      "0",

    explanation:
      "Wi-Fi is invisible, but a weak or lost connection is immediately obvious during a call or online date.",
  },

  {
    id: "cp-05",
    category: "Long Distance",
    hostClue:
      "I can show two people the same thing even when they are far apart.",

    guestClue:
      "People often use me for movies, work, or showing what is on their phone or computer.",

    options: [
      "Screen share",
      "Voice note",
      "Calendar",
      "Postcard",
    ],

    correctAnswer:
      "0",

    explanation:
      "Screen sharing lets both people look at the same content in real time, which makes it useful for remote dates and shared activities.",
  },

  {
    id: "cp-06",
    category: "Wordplay",
    hostClue:
      "I have dates, but I never go on one.",

    guestClue:
      "Couples use me to count down to visits, anniversaries, and planned calls.",

    options: [
      "Calendar",
      "Clock",
      "Map",
      "Journal",
    ],

    correctAnswer:
      "0",

    explanation:
      "A calendar contains dates and is often used to plan important moments together.",
  },

  {
    id: "cp-07",
    category: "Travel",
    hostClue:
      "I show places without taking you anywhere.",

    guestClue:
      "A long-distance couple might use me to see how many miles or countries are between them.",

    options: [
      "Ticket",
      "Map",
      "Window",
      "Compass",
    ],

    correctAnswer:
      "1",

    explanation:
      "A map represents places and distance, making it an obvious tool for understanding where two people are in relation to each other.",
  },

  {
    id: "cp-08",
    category: "Connection",
    hostClue:
      "I can be opened, but I am not a door.",

    guestClue:
      "I carry words from someone who is not physically there.",

    options: [
      "Letter",
      "Window",
      "Suitcase",
      "Camera",
    ],

    correctAnswer:
      "0",

    explanation:
      "A letter can be opened and carries written words from one person to another.",
  },

  {
    id: "cp-09",
    category: "Everyday",
    hostClue:
      "I have two cups, but you cannot drink from them.",

    guestClue:
      "I make a private call easier to hear without disturbing everyone around you.",

    options: [
      "Headphones",
      "Coffee machine",
      "Binoculars",
      "Glasses",
    ],

    correctAnswer:
      "0",

    explanation:
      "Headphones have two ear cups and are perfect for private calls, music, and shared listening.",
  },

  {
    id: "cp-10",
    category: "Travel",
    hostClue:
      "I have a handle, but I am not a door.",

    guestClue:
      "I usually appear when someone is finally packing for a visit.",

    options: [
      "Suitcase",
      "Umbrella",
      "Mug",
      "Drawer",
    ],

    correctAnswer:
      "0",

    explanation:
      "A suitcase has a handle and is one of the clearest signs that a trip or reunion is about to happen.",
  },

  {
    id: "cp-11",
    category: "Everyday",
    hostClue:
      "I can be bitter, hot, and useful after a short night of sleep.",

    guestClue:
      "Two people can still have me together on a virtual morning date.",

    options: [
      "Coffee",
      "Soup",
      "Tea towel",
      "Sunrise",
    ],

    correctAnswer:
      "0",

    explanation:
      "Coffee can be bitter and energizing, and a virtual coffee date is an easy long-distance activity.",
  },

  {
    id: "cp-12",
    category: "Long Distance",
    hostClue:
      "I interrupt sleep on purpose.",

    guestClue:
      "Someone might set me earlier than usual to catch a partner before their day begins.",

    options: [
      "Alarm",
      "Doorbell",
      "Timer",
      "Reminder note",
    ],

    correctAnswer:
      "0",

    explanation:
      "An alarm is designed to wake you, and time differences can make early calls part of a long-distance routine.",
  },

  {
    id: "cp-13",
    category: "Connection",
    hostClue:
      "I connect two sides without asking either side to move.",

    guestClue:
      "People also use my name as a metaphor for rebuilding understanding between two people.",

    options: [
      "Bridge",
      "Tunnel",
      "Road",
      "Fence",
    ],

    correctAnswer:
      "0",

    explanation:
      "A bridge physically connects two sides, and 'building a bridge' is also a common metaphor for restoring connection.",
  },

  {
    id: "cp-14",
    category: "Long Distance",
    hostClue:
      "I am a picture made without pointing a camera at the world.",

    guestClue:
      "People send me when they want to show exactly what appeared on their phone.",

    options: [
      "Screenshot",
      "Selfie",
      "Postcard",
      "Wallpaper",
    ],

    correctAnswer:
      "0",

    explanation:
      "A screenshot captures what is displayed on a device rather than photographing the physical world.",
  },

  {
    id: "cp-15",
    category: "Connection",
    hostClue:
      "People far apart can look at me at the same time without sharing a screen.",

    guestClue:
      "My shape seems to change over the month even though I am not breaking apart.",

    options: [
      "Moon",
      "Clock",
      "Map",
      "Cloud",
    ],

    correctAnswer:
      "0",

    explanation:
      "The Moon can be seen from many places on Earth, and its phases make its visible shape appear to change.",
  },

  {
    id: "cp-16",
    category: "Long Distance",
    hostClue:
      "I let you see someone who is not in the room.",

    guestClue:
      "Unlike a normal phone call, I usually include both sound and live faces.",

    options: [
      "Video call",
      "Voice note",
      "Email",
      "Photo album",
    ],

    correctAnswer:
      "0",

    explanation:
      "A video call combines live audio and video so two people can see and hear each other in real time.",
  },
];
