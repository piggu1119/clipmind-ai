// Helper to communicate with OpenRouter / Gemini API, or simulate outputs based on keyword analysis

import { CREATOR_MODES } from './constants';

export interface AnalysisResult {
  viralScore: number;
  moments: {
    timestamp: string;
    duration: string;
    viralScore: number;
    title: string;
    hook: string;
    rationale: string;
    subtitleStyle: string;
    edits: { time: string; action: string; description: string }[];
    sounds: string[];
    subtitlePreview: string;
  }[];
}

// Simulated intelligence based on transcript scanning
export const generateMockAnalysis = (input: string, modeId: string): AnalysisResult => {
  const content = input.toLowerCase();
  const activeMode = CREATOR_MODES.find(m => m.id === modeId) || CREATOR_MODES[2]; // Fallback to podcast

  // Detect context keywords to customize the simulation
  let topic = "Video Clip";
  let specificHooks: string[] = [];
  let clipsTitle = "Viral Moment Detetected";
  
  if (content.includes("ronaldo") || content.includes("messi") || content.includes("football") || content.includes("goal")) {
    topic = "Football Showcase";
    specificHooks = [
      "Cristiano Ronaldo did something NOBODY expected here...",
      "The exact second Lionel Messi broke the defense's ankles.",
      "Is this the single greatest football play of 2026?"
    ];
    clipsTitle = "Ronaldo/Messi Magic Highlight";
  } else if (content.includes("luffy") || content.includes("anime") || content.includes("goku") || content.includes("naruto")) {
    topic = "Anime Epic Edit";
    specificHooks = [
      "They spent 90% of the anime budget on this 5-second scene...",
      "The animation frame rate went crazy in this epic fight.",
      "How this anime character broke the internet..."
    ];
    clipsTitle = "Ultimate Anime Powerup Clash";
  } else if (content.includes("rogan") || content.includes("podcast") || content.includes("alien") || content.includes("conspiracy")) {
    topic = "Podcast Debate";
    specificHooks = [
      "Joe Rogan just reacted to the scariest theory of 2026...",
      "He completely silent-mode deactivated his opponent in 10 seconds.",
      "This dark secret will change how you look at the sky..."
    ];
    clipsTitle = "Mind-Bending Podcast Secret Revealed";
  } else if (content.includes("valorant") || content.includes("fortnite") || content.includes("minecraft") || content.includes("twitch") || content.includes("gaming")) {
    topic = "Gaming Clutch";
    specificHooks = [
      "He attempted a 1v5 clutch in a $50,000 gaming finals...",
      "This fortnite trick is literally banned in 15 countries.",
      "I was crying tears of joy after hitting this insane shot..."
    ];
    clipsTitle = "Epic Gaming Clutch Play of the Week";
  } else if (content.includes("success") || content.includes("motivation") || content.includes("money") || content.includes("hustle")) {
    topic = "Motivational Speech";
    specificHooks = [
      "If you watch this for 15 seconds, your mindset will shift...",
      "They said he would fail, but look at his bank account now.",
      "The hard truth about success that school never taught you..."
    ];
    clipsTitle = "No-Excuses Hustle Mindset Wakeup Call";
  } else {
    // General fallback using mode recommendations
    topic = activeMode.name;
    specificHooks = activeMode.hooks;
    clipsTitle = `High-Energy ${activeMode.name} Clip`;
  }

  // Generate 2 moments
  return {
    viralScore: Math.floor(Math.random() * 20) + 78, // High-scoring: 78 to 98
    moments: [
      {
        timestamp: "00:12 - 00:38",
        duration: "26s",
        viralScore: Math.floor(Math.random() * 10) + 88,
        title: `${clipsTitle} (Part 1)`,
        hook: specificHooks[0] || activeMode.hooks[0],
        rationale: "High emotional tension combined with rapid back-and-forth dialogue. Perfect for holding viewer attention beyond the critical 3-second mark.",
        subtitleStyle: activeMode.name.split(' ')[0],
        edits: activeMode.edits,
        sounds: activeMode.sounds,
        subtitlePreview: activeMode.subtitleStyle.example,
      },
      {
        timestamp: "01:05 - 01:28",
        duration: "23s",
        viralScore: Math.floor(Math.random() * 15) + 75,
        title: `${clipsTitle} (Part 2)`,
        hook: specificHooks[1] || activeMode.hooks[1] || activeMode.hooks[0],
        rationale: "Strong narrative payoff. The resolution or punchline is placed right at the end of this clip segment, forcing users to finish watching to see the ending.",
        subtitleStyle: activeMode.name.split(' ')[0],
        edits: activeMode.edits.map(e => ({
          ...e,
          time: `01:${e.time.split(':')[1]}`
        })),
        sounds: [activeMode.sounds[1], "Whoosh transition", activeMode.sounds[0]].filter(Boolean),
        subtitlePreview: activeMode.subtitleStyle.example,
      }
    ]
  };
};

export const callLLMAnalysis = async (
  input: string, 
  modeId: string, 
  apiKey?: string
): Promise<AnalysisResult> => {
  // If we have an API key, we could call an actual endpoint (simulated here as a POST to API route)
  if (apiKey || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY) {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input, modeId, apiKey })
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.error("API analysis failed, falling back to mock:", e);
    }
  }

  // Fallback to offline generation
  await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate AI processing delay
  return generateMockAnalysis(input, modeId);
};
