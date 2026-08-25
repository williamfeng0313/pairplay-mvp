export type LongDistanceQuestionCategory =
  | "fun"
  | "deep"
  | "daily-life"
  | "future"
  | "relationship"
  | "date-night"
  | "silly";

export type LongDistanceQuestionGroup = {
  key: LongDistanceQuestionCategory;
  title: string;
  description: string;
  questions: string[];
};

export const longDistanceQuestionGroups: LongDistanceQuestionGroup[] = [
  {
    key: "fun",
    title: "Fun Questions for Long Distance Couples",
    description:
      "Easy questions for relaxed calls, texting, and moments when you just want to laugh and enjoy each other's company.",
    questions: [
      "What is one thing that always makes you laugh?",
      "If we could teleport anywhere for dinner tonight, where would we go?",
      "What song would you choose as the soundtrack for our relationship?",
      "What is the funniest thing that happened to you this week?",
      "If we had a completely free weekend together, what would you want to do first?",
      "Which movie or TV couple reminds you most of us?",
      "What food would you want us to try together?",
      "What is one place you would love to show me in your city?",
      "If we could learn a new hobby together, what would you choose?",
      "What is your favorite memory of us laughing together?",
      "Which game would you most want us to play on a video call?",
      "What small thing instantly improves your mood?",
      "If we planned a surprise day for each other, what would yours include?",
      "What is something you have always wanted us to try together?",
      "If we could relive one day together, which day would you choose?",
    ],
  },

  {
    key: "deep",
    title: "Deep Questions for Long Distance Couples",
    description:
      "Thoughtful questions for conversations that go beyond daily updates and help you understand each other more deeply.",
    questions: [
      "What makes you feel most understood in a relationship?",
      "What has this relationship taught you about yourself?",
      "When do you feel closest to me even though we are apart?",
      "What kind of support matters most to you when you are stressed?",
      "What is something you wish people understood better about you?",
      "What does emotional safety in a relationship mean to you?",
      "What is one fear you find difficult to talk about?",
      "What makes you feel genuinely appreciated?",
      "What experience has shaped who you are the most?",
      "What does trust look like to you in a long distance relationship?",
      "When you are having a difficult day, what do you need most from me?",
      "What is something you have changed your mind about in the last few years?",
      "What makes a relationship feel like a true partnership to you?",
      "What is something you hope we never stop doing for each other?",
      "What do you think has made our relationship stronger?",
    ],
  },

  {
    key: "daily-life",
    title: "Daily Life Questions for Long Distance Couples",
    description:
      "Questions that help you stay involved in each other's ordinary routines, not just the big moments.",
    questions: [
      "What was the best part of your day today?",
      "What was the most tiring part of your day?",
      "What are you looking forward to this week?",
      "What is something small that happened today that you have not told me yet?",
      "What meal have you been enjoying lately?",
      "What part of your daily routine would you like to change?",
      "What time of day do you usually feel most energetic?",
      "What is something around you right now that reminds you of me?",
      "What has been taking up most of your attention lately?",
      "What is one thing I could ask you about more often?",
      "What is your favorite way to relax after a long day?",
      "What is something you accomplished recently that you are proud of?",
      "What is one ordinary activity you wish we could do together today?",
      "What has been making life easier for you recently?",
      "What is one thing you want to get done before the end of this week?",
    ],
  },

  {
    key: "future",
    title: "Future Questions for Long Distance Couples",
    description:
      "Use these questions to talk about travel, plans, priorities, and what eventually being in the same place might look like.",
    questions: [
      "Where would you most like us to travel together?",
      "What does your ideal life look like five years from now?",
      "What is one goal you would love for us to achieve together?",
      "What city or country could you imagine us living in?",
      "What kind of home would make you happiest?",
      "What would your ideal normal weekend together look like?",
      "What is something you want to learn or accomplish in the next year?",
      "How important is travel in the future you imagine?",
      "What traditions would you like us to create together?",
      "What is one future experience you are especially excited to share with me?",
      "What does a good balance between work and personal life look like to you?",
      "What is one financial goal you think is important for the future?",
      "How would you like our daily routines to look if we lived in the same place?",
      "What would make closing the distance feel successful to you?",
      "What is one thing about our future that you feel most optimistic about?",
    ],
  },

  {
    key: "relationship",
    title: "Relationship Questions for Long Distance Couples",
    description:
      "Questions about communication, affection, expectations, and the habits that help a long distance relationship stay connected.",
    questions: [
      "What makes you feel most loved when we are apart?",
      "How often do you ideally like us to communicate during the day?",
      "What type of message from me makes you happiest?",
      "What do you think we do especially well as a couple?",
      "What is one thing we could improve about our communication?",
      "When we disagree, what helps you feel heard?",
      "What makes you feel reassured when distance feels difficult?",
      "Which of our relationship habits do you value the most?",
      "What is one thing I do that makes you feel appreciated?",
      "How do you prefer to deal with misunderstandings?",
      "What helps you stay connected when we are both busy?",
      "What does quality time mean to you when we cannot be together physically?",
      "What is one relationship boundary that is especially important to you?",
      "How can we make visits or reunions feel less stressful?",
      "What is something you think every long distance couple should talk about?",
    ],
  },

  {
    key: "date-night",
    title: "Date Night Questions for Long Distance Couples",
    description:
      "Save these for virtual dates, long video calls, or evenings when you want the conversation to feel a little more intentional.",
    questions: [
      "What would your perfect virtual date night look like?",
      "What restaurant would you choose if we were having dinner together tonight?",
      "Which movie should we watch together next?",
      "What drink or snack should we both get for our next video date?",
      "If we could recreate one of our past dates, which would you choose?",
      "What kind of date have we never tried but should?",
      "Would you rather plan our next date or let me surprise you?",
      "What playlist would you make for a virtual date together?",
      "What would be a fun theme for our next video call?",
      "Which place would make the perfect first date after our next reunion?",
      "What is the most memorable date we have had so far?",
      "Would you rather have a quiet night together or go somewhere new?",
      "What question have you been wanting to ask me but never found the right moment for?",
      "What is one simple date we could realistically do even while long distance?",
      "What should we put on our future date-night bucket list?",
    ],
  },

  {
    key: "silly",
    title: "Silly Questions for Long Distance Couples",
    description:
      "Not every conversation needs to be serious. These are for the wonderfully pointless debates that somehow become unforgettable.",
    questions: [
      "If I were a snack, what snack would I be?",
      "Which animal best matches my personality?",
      "If we switched lives for one day, what would surprise you most?",
      "If our relationship were a movie genre, what would it be?",
      "Which one of us would survive longer on a deserted island?",
      "If we opened a restaurant together, what would we call it?",
      "Which one of us would be more likely to accidentally miss a flight?",
      "If we had to wear matching outfits for a week, what should they look like?",
      "What completely useless superpower would suit me best?",
      "If our relationship had a mascot, what should it be?",
    ],
  },
];

export const longDistanceQuestionCount =
  longDistanceQuestionGroups.reduce(
    (total, group) =>
      total + group.questions.length,
    0
  );