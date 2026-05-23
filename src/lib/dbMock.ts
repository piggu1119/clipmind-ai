// In-browser LocalStorage-based Mock Database for ClipMind AI
// Allows the application to run fully client-side out-of-the-box

export interface SavedClip {
  id: string;
  url: string;
  title: string;
  transcript: string;
  viralScore: number;
  hooks: string[];
  editingSuggestions: {
    time: string;
    action: string;
    description: string;
  }[];
  subtitleStyle: string;
  mode: string;
  createdAt: string;
}

export interface UserSubscription {
  tier: 'Free' | 'Pro' | 'Agency';
  analysesLeftToday: number;
  maxAnalysesPerDay: number;
  streakDays: number;
  lastAnalysisDate: string | null;
}

const DEFAULT_SUBSCRIPTION: UserSubscription = {
  tier: 'Free',
  analysesLeftToday: 3,
  maxAnalysesPerDay: 3,
  streakDays: 3, // Start with a 3-day streak for game feel
  lastAnalysisDate: null,
};

export const getMockUser = () => {
  if (typeof window === 'undefined') return { email: 'creator@clipmind.ai' };
  const user = localStorage.getItem('clipmind_user');
  if (!user) {
    const newUser = { email: 'creator@clipmind.ai', id: 'usr_' + Math.random().toString(36).substr(2, 9) };
    localStorage.setItem('clipmind_user', JSON.stringify(newUser));
    return newUser;
  }
  return JSON.parse(user);
};

export const getMockSubscription = (): UserSubscription => {
  if (typeof window === 'undefined') return DEFAULT_SUBSCRIPTION;
  const sub = localStorage.getItem('clipmind_subscription');
  if (!sub) {
    localStorage.setItem('clipmind_subscription', JSON.stringify(DEFAULT_SUBSCRIPTION));
    return DEFAULT_SUBSCRIPTION;
  }
  const parsed = JSON.parse(sub) as UserSubscription;
  
  // Reset daily limit if it's a new day
  const today = new Date().toDateString();
  if (parsed.lastAnalysisDate !== today) {
    parsed.analysesLeftToday = parsed.tier === 'Free' ? 3 : 9999;
    saveMockSubscription(parsed);
  }
  return parsed;
};

export const saveMockSubscription = (sub: UserSubscription) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('clipmind_subscription', JSON.stringify(sub));
};

export const upgradeSubscription = (tier: 'Free' | 'Pro' | 'Agency') => {
  const current = getMockSubscription();
  current.tier = tier;
  current.maxAnalysesPerDay = tier === 'Free' ? 3 : tier === 'Pro' ? 9999 : 99999;
  current.analysesLeftToday = current.maxAnalysesPerDay;
  saveMockSubscription(current);
  return current;
};

export const getSavedClips = (): SavedClip[] => {
  if (typeof window === 'undefined') return [];
  const clips = localStorage.getItem('clipmind_saved_clips');
  return clips ? JSON.parse(clips) : [];
};

export const saveClip = (clip: Omit<SavedClip, 'id' | 'createdAt'>) => {
  if (typeof window === 'undefined') return null;
  const clips = getSavedClips();
  const newClip: SavedClip = {
    ...clip,
    id: 'clip_' + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };
  clips.unshift(newClip);
  localStorage.setItem('clipmind_saved_clips', JSON.stringify(clips));
  
  // Track streaks
  const sub = getMockSubscription();
  const today = new Date().toDateString();
  if (sub.lastAnalysisDate !== today) {
    if (sub.lastAnalysisDate) {
      const lastDate = new Date(sub.lastAnalysisDate);
      const diffTime = Math.abs(new Date().getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        sub.streakDays += 1;
      } else if (diffDays > 1) {
        sub.streakDays = 1;
      }
    } else {
      sub.streakDays = 1;
    }
    sub.lastAnalysisDate = today;
  }
  
  if (sub.tier === 'Free') {
    sub.analysesLeftToday = Math.max(0, sub.analysesLeftToday - 1);
  }
  saveMockSubscription(sub);
  
  return newClip;
};

export const deleteSavedClip = (id: string) => {
  if (typeof window === 'undefined') return;
  const clips = getSavedClips();
  const filtered = clips.filter(c => c.id !== id);
  localStorage.setItem('clipmind_saved_clips', JSON.stringify(filtered));
};
