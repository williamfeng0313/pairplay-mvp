export type PhotoBoothTemplate = {
    id: string;
    name: string;
    description: string;
    emoji: string;
    accent: string;
    accentSoft: string;
    background: string;
  
    photoX: number;
    photoY: number;
    photoWidth: number;
    photoHeight: number;
  
    title: string;
    subtitle: string;
  };
  
  export const PHOTO_CANVAS_WIDTH = 900;
  export const PHOTO_CANVAS_HEIGHT = 1200;
  
  export const photoBoothTemplates: PhotoBoothTemplate[] = [
    {
      id: "cute-couple",
      name: "Cute Couple",
      description: "Soft pink couple card",
      emoji: "💕",
  
      accent: "#f64678",
      accentSoft: "#ffe8ef",
      background: "#fff8fa",
  
      photoX: 70,
      photoY: 115,
      photoWidth: 760,
      photoHeight: 790,
  
      title: "YOU + ME",
      subtitle: "made for two ♡",
    },
  
    {
      id: "y2k-love",
      name: "Y2K Love",
      description: "Retro sticker-style frame",
      emoji: "✨",
  
      accent: "#7658e8",
      accentSoft: "#eee9ff",
      background: "#faf8ff",
  
      photoX: 70,
      photoY: 115,
      photoWidth: 760,
      photoHeight: 790,
  
      title: "LOVE 2K",
      subtitle: "forever looks good on us",
    },
  
    {
      id: "long-distance",
      name: "Long Distance",
      description: "For couples miles apart",
      emoji: "🌍",
  
      accent: "#3f83f8",
      accentSoft: "#e9f2ff",
      background: "#f7fbff",
  
      photoX: 70,
      photoY: 115,
      photoWidth: 760,
      photoHeight: 790,
  
      title: "STILL US",
      subtitle: "miles apart · hearts close",
    },
  
    {
      id: "besties",
      name: "Besties",
      description: "Fun friendship photo card",
      emoji: "🫶",
  
      accent: "#ff9857",
      accentSoft: "#fff0e7",
      background: "#fffaf6",
  
      photoX: 70,
      photoY: 115,
      photoWidth: 760,
      photoHeight: 790,
  
      title: "BESTIES",
      subtitle: "same chaos, different day",
    },
  ];