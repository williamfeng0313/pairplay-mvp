export type RelationshipCheckInStageKey =
  | "connection"
  | "communication"
  | "effort"
  | "needs"
  | "future"
  | "repair";

export type RelationshipCheckInQuestion = {
  id: string;
  stage: RelationshipCheckInStageKey;
  prompt: string;
  preview: string;
  options: [string, string, string, string];
  discussionPrompt: string;
};

export const relationshipCheckInStages: Array<{
  key: RelationshipCheckInStageKey;
  title: string;
  description: string;
  icon: string;
}> = [
  {
    key: "connection",
    title: "Connection",
    description: "How the relationship feels emotionally right now.",
    icon: "💛",
  },
  {
    key: "communication",
    title: "Communication",
    description: "Whether both people feel heard and able to solve problems.",
    icon: "💬",
  },
  {
    key: "effort",
    title: "Effort",
    description: "Whether there is still willingness to work on the relationship.",
    icon: "🌱",
  },
  {
    key: "needs",
    title: "Needs",
    description: "What feels missing or most important right now.",
    icon: "🧭",
  },
  {
    key: "future",
    title: "Future",
    description: "How each person sees the road ahead.",
    icon: "🛤️",
  },
  {
    key: "repair",
    title: "Repair",
    description: "What would need to change for the relationship to feel healthier.",
    icon: "🫶",
  },
];

export const relationshipCheckInQuestions: RelationshipCheckInQuestion[] = [
  {
    id: "rci-01",
    stage: "connection",
    prompt: "How emotionally connected do you feel to this relationship right now?",
    preview: "How emotionally connected do you feel right now?",
    options: [
      "Very connected",
      "Somewhat connected",
      "A little distant",
      "Very distant",
    ],
    discussionPrompt:
      "What has made you feel more connected or more distant lately?",
  },
  {
    id: "rci-02",
    stage: "connection",
    prompt: "When you think about us lately, which feeling is strongest?",
    preview: "When you think about us, what feeling is strongest?",
    options: [
      "Hopeful",
      "Mostly okay",
      "Mixed and uncertain",
      "Tired or discouraged",
    ],
    discussionPrompt:
      "What is one recent moment that shaped that feeling for you?",
  },
  {
    id: "rci-03",
    stage: "communication",
    prompt: "When something important is bothering you, how heard do you usually feel?",
    preview: "How heard do you feel when something important is wrong?",
    options: [
      "Usually heard",
      "Sometimes heard",
      "Rarely heard",
      "I often avoid bringing it up",
    ],
    discussionPrompt:
      "What helps you feel listened to instead of defended against?",
  },
  {
    id: "rci-04",
    stage: "communication",
    prompt: "How do relationship problems usually feel right now?",
    preview: "Do you feel like you solve problems or repeat them?",
    options: [
      "We usually solve them together",
      "Some repeat, but we make progress",
      "We repeat many of the same problems",
      "We feel stuck",
    ],
    discussionPrompt:
      "Which repeated problem would make the biggest difference if it improved?",
  },
  {
    id: "rci-05",
    stage: "effort",
    prompt: "Do you still want to make an effort to improve this relationship?",
    preview: "Do you still want to make an effort to improve the relationship?",
    options: [
      "Yes, definitely",
      "Yes, but I need changes too",
      "I'm not sure yet",
      "Not right now",
    ],
    discussionPrompt:
      "What would make trying again feel worthwhile for each of you?",
  },
  {
    id: "rci-06",
    stage: "effort",
    prompt: "If one important thing between you genuinely improved, how would that affect your desire to keep trying?",
    preview: "Would one meaningful change affect your desire to keep trying?",
    options: [
      "A lot",
      "Somewhat",
      "I'm not sure",
      "Probably not",
    ],
    discussionPrompt:
      "What is the one change that would matter most to you?",
  },
  {
    id: "rci-07",
    stage: "needs",
    prompt: "What feels most missing from the relationship right now?",
    preview: "What feels most missing right now?",
    options: [
      "Quality time",
      "Trust and reassurance",
      "Affection and closeness",
      "Communication and understanding",
    ],
    discussionPrompt:
      "What would a small improvement in that area look like this week?",
  },
  {
    id: "rci-08",
    stage: "needs",
    prompt: "How comfortable do you feel being fully honest about difficult feelings with your partner?",
    preview: "How comfortable are you being honest about difficult feelings?",
    options: [
      "Very comfortable",
      "Usually comfortable",
      "Sometimes I hold back",
      "I often don't feel able to say it",
    ],
    discussionPrompt:
      "What would make difficult conversations feel safer and calmer for you?",
  },
  {
    id: "rci-09",
    stage: "future",
    prompt: "Can you still imagine a future together that feels good for both of you?",
    preview: "Can you still imagine a future together that feels good?",
    options: [
      "Yes, clearly",
      "Yes, but some things need to change",
      "I'm uncertain",
      "I don't really see it right now",
    ],
    discussionPrompt:
      "What part of the future feels most possible, and what part feels hardest?",
  },
  {
    id: "rci-10",
    stage: "future",
    prompt: "How aligned do your long-term priorities feel right now?",
    preview: "How aligned do your long-term priorities feel?",
    options: [
      "Very aligned",
      "Mostly aligned",
      "We have some important differences",
      "We want very different things",
    ],
    discussionPrompt:
      "Which future priority is most important for both of you to understand?",
  },
  {
    id: "rci-11",
    stage: "repair",
    prompt: "How ready do you feel to work on the relationship together?",
    preview: "How ready are you to work on the relationship together?",
    options: [
      "Ready now",
      "Willing, but slowly",
      "Only if something specific changes",
      "Not ready right now",
    ],
    discussionPrompt:
      "What would a realistic first step look like — not a perfect solution?",
  },
  {
    id: "rci-12",
    stage: "repair",
    prompt: "What feels like the healthiest next step for you right now?",
    preview: "What feels like the healthiest next step?",
    options: [
      "Keep trying together",
      "Try again with one clear change",
      "Take some space and reflect",
      "Have an honest conversation about whether to continue",
    ],
    discussionPrompt:
      "What would help the next step feel respectful and clear for both of you?",
  },
];
