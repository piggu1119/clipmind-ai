import { 
  Trophy, 
  Gamepad2, 
  Mic2, 
  Tv2, 
  Flame, 
  Radio 
} from 'lucide-react';

export const CREATOR_MODES = [
  {
    id: 'football',
    name: 'Football Mode',
    icon: Trophy,
    color: 'from-green-500 to-emerald-700',
    shadow: 'shadow-neon-cyan',
    subtitleStyle: {
      font: 'Impact, sans-serif',
      color: 'text-yellow-400',
      case: 'uppercase',
      glow: 'shadow-neon-cyan',
      example: 'GOAL OF THE CENTURY!'
    },
    hooks: [
      'Ronaldo DESTROYS defender in 2 seconds...',
      'This angle of Messi\'s pass makes NO SENSE.',
      'The moment everyone realized he was a superstar...'
    ],
    sounds: ['Stadium Bass Hype', 'Referee whistle drop', 'Crowd gasp + sub-bass'],
    edits: [
      { time: '00:02', action: 'Fast Zoom-in', description: 'Zoom on the ball or face before contact' },
      { time: '00:05', action: 'Shake Effect + Sound Drop', description: 'Trigger heavy bass as ball hits net' },
      { time: '00:08', action: 'Slow Motion', description: 'Enable 50% speed for reaction' }
    ]
  },
  {
    id: 'gaming',
    name: 'Gaming Mode',
    icon: Gamepad2,
    color: 'from-cyan-500 to-blue-600',
    shadow: 'shadow-neon-cyan',
    subtitleStyle: {
      font: 'Inter, Bold',
      color: 'text-cyan-400',
      case: 'uppercase',
      glow: 'shadow-neon-cyan',
      example: 'UNBELIEVABLE 1v5 CLUTCH!'
    },
    hooks: [
      'He tried this glitch in a $10,000 tournament...',
      'This 1v5 clutch will go down in history.',
      'I was literally screaming when this happened...'
    ],
    sounds: ['Kill sound confirmation', 'Glitch transition sound', 'Suspense riser SFX'],
    edits: [
      { time: '00:01', action: 'Meme Popup', description: 'Show confused face meme' },
      { time: '00:03', action: 'Color Flash', description: 'Flash red on final kill' },
      { time: '00:07', action: 'Camera shake + high pitch filter', description: 'Hype peak zoom' }
    ]
  },
  {
    id: 'podcast',
    name: 'Podcast Mode',
    icon: Mic2,
    color: 'from-purple-500 to-indigo-700',
    shadow: 'shadow-neon-purple',
    subtitleStyle: {
      font: 'Montserrat, Black',
      color: 'text-white',
      case: 'capitalize',
      glow: 'shadow-neon-purple',
      example: 'The Truth About the Pyramids'
    },
    hooks: [
      'This is the scariest theory about AI I\'ve ever heard...',
      'She exposed the truth behind this secret organization.',
      '99% of people don\'t realize this is happening right now.'
    ],
    sounds: ['Dramatic single hit', 'Deep synth rumble', 'Retro typing sound'],
    edits: [
      { time: '00:01', action: 'Split Screen B-roll', description: 'Show stock drone footage on bottom half' },
      { time: '00:04', action: 'Slow Zoom-out', description: 'Widen camera as tension builds' },
      { time: '00:10', action: 'Caption pop + bell ring', description: 'Highlight keyword' }
    ]
  },
  {
    id: 'anime',
    name: 'Anime Mode',
    icon: Tv2,
    color: 'from-pink-500 to-rose-600',
    shadow: 'shadow-neon-pink',
    subtitleStyle: {
      font: 'Krona One, sans-serif',
      color: 'text-pink-500',
      case: 'uppercase',
      glow: 'shadow-neon-pink',
      example: 'GEAR 5 DEBUT!'
    },
    hooks: [
      'This single frame cost them the entire budget...',
      'The moment he broke his limits was legendary.',
      'This anime ending left millions in tears...'
    ],
    sounds: ['Sward slash swoosh', 'Anime power charge sound', 'Impact explosion drum'],
    edits: [
      { time: '00:02', action: 'Glitch Transition', description: 'Flash custom color aberration overlay' },
      { time: '00:05', action: 'Radial blur zoom', description: 'Simulate high speed flight movement' },
      { time: '00:09', action: 'Warp Speed frame pass', description: 'Anime style frame speedup' }
    ]
  },
  {
    id: 'motivational',
    name: 'Motivational Mode',
    icon: Flame,
    color: 'from-amber-500 to-orange-600',
    shadow: 'shadow-neon-purple',
    subtitleStyle: {
      font: 'Lora, Italic',
      color: 'text-amber-300',
      case: 'none',
      glow: 'shadow-neon-purple',
      example: 'Nobody will save you. Save yourself.'
    },
    hooks: [
      'You are exactly one decision away from a different life...',
      'They laughed at his plan, but look who is laughing now.',
      'If you\'re feeling lost, watch this for 30 seconds.'
    ],
    sounds: ['Ambient emotional pad', 'Heartbeat build', 'Soft piano drop'],
    edits: [
      { time: '00:00', action: 'Desaturate color', description: 'Start in black and white' },
      { time: '00:05', action: 'Color Fade-in', description: 'Slowly return color saturation as music climbs' },
      { time: '00:12', action: 'Smooth cross-dissolve', description: 'Gentle transition to horizon shot' }
    ]
  },
  {
    id: 'streamer',
    name: 'Streamer Mode',
    icon: Radio,
    color: 'from-red-500 to-rose-700',
    shadow: 'shadow-neon-pink',
    subtitleStyle: {
      font: 'Arial Black',
      color: 'text-green-400',
      case: 'uppercase',
      glow: 'shadow-neon-pink',
      example: 'CHAT REACTION WAS INSANE!'
    },
    hooks: [
      'He did not realize the stream was still live...',
      'The exact moment chat went absolutely wild.',
      'He broke his setup after this happened...'
    ],
    sounds: ['Discord join/leave SFX', 'Facepalm slap', 'Chat TTS spam voice'],
    edits: [
      { time: '00:02', action: 'Facecam Crop', description: 'Crop facecam to fill 80% screen' },
      { time: '00:04', action: 'Chat overlay popup', description: 'Show scrolling green screen chat' },
      { time: '00:09', action: 'Earrape gain boost + Red Tint', description: 'Screaming highlight zoom' }
    ]
  }
];

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free Plan',
    price: '$0',
    period: 'forever',
    description: 'Perfect for casual creators testing their hooks.',
    features: [
      'Basic analyzer access',
      'Limited features',
    ],
    cta: 'Start Free',
    popular: false,
    gradient: 'from-zinc-800 to-zinc-900',
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '$9',
    period: 'month',
    description: 'For active creators looking to go viral daily.',
    features: [
      'Full analyzer access',
      'Viral moment detection',
      'Hook generator',
      'Subtitle styles',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
    gradient: 'from-purple-900/60 to-indigo-950/60 border-purple-500/50',
  }
];

export const FAQS = [
  {
    question: 'Does ClipMind AI edit the videos for me?',
    answer: 'No, ClipMind AI acts as your professional editing blueprint. It doesn\'t directly render video files, which allows it to remain lightning-fast. Instead, it parses transcripts and dialogue to tell you the EXACT timestamps, hooks, subtitle styles, and editing prompts (like cuts, meme SFX, and zoom placements) needed to create high-retention shorts. You do the rendering in your favorite tool (CapCut, Premiere, etc.) using our script.'
  },
  {
    question: 'Does it support direct YouTube and TikTok link pasting?',
    answer: 'Absolutely! You can paste any public YouTube, Shorts, or TikTok link. Our engine extracts the transcript, or you can paste your own transcript/dialogue if you are in pre-production.'
  },
  {
    question: 'Can I export the editing scripts and hooks?',
    answer: 'Yes! We support exporting to plain text (.TXT), structured JSON (.JSON) containing timestamp mappings, or quick clipboard copy-pasting.'
  },
  {
    question: 'Is there a free trial or free version?',
    answer: 'Yes, our Free Starter plan gives you 3 video analyses every single day. Upgrading to Pro gives you unlimited analyses and unlocks gaming/football style presets.'
  }
];

export const TRENDING_SOUNDS = [
  { name: 'Phonk Bass Drop (Heavy)', count: '452K videos this week', tag: 'Hype' },
  { name: 'Minecraft Eating sound effect', count: '128K videos this week', tag: 'Funny' },
  { name: 'Sub-woofer vine boom (x5)', count: '315K videos this week', tag: 'Meme' },
  { name: 'Anime swoosh slash speedup', count: '94K videos this week', tag: 'Anime' },
  { name: 'Cinematic riser suspenseful 8s', count: '210K videos this week', tag: 'Podcast' },
];

export const DAILY_VIRAL_TIPS = [
  "Use a 0.5s visual zoom-in at your hook. If you wait until 2.0s, retention drops by 20%.",
  "Highlight keywords in yellow, green, and red. Never use standard white subtitles for gaming or hype edits.",
  "Sound effects should trigger exactly 1 frame BEFORE the video transition to build sub-conscious anticipation.",
  "Controversial statements at 0:03 drive comment section activity, which is the #1 weight factor in the TikTok algorithm."
];
