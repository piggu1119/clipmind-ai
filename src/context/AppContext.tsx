"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMockUser, getMockSubscription, UserSubscription, upgradeSubscription, getSavedClips, SavedClip } from '@/lib/dbMock';

interface AppContextProps {
  user: any;
  subscription: UserSubscription;
  savedClips: SavedClip[];
  refreshData: () => void;
  upgradeTier: (tier: 'Free' | 'Pro' | 'Agency') => void;
  isSettingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<UserSubscription>({
    tier: 'Free',
    analysesLeftToday: 3,
    maxAnalysesPerDay: 3,
    streakDays: 3,
    lastAnalysisDate: null,
  });
  const [savedClips, setSavedClips] = useState<SavedClip[]>([]);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const refreshData = () => {
    setUser(getMockUser());
    setSubscription(getMockSubscription());
    setSavedClips(getSavedClips());
  };

  const upgradeTier = (tier: 'Free' | 'Pro' | 'Agency') => {
    const updated = upgradeSubscription(tier);
    setSubscription(updated);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <AppContext.Provider value={{
      user,
      subscription,
      savedClips,
      refreshData,
      upgradeTier,
      isSettingsOpen,
      setSettingsOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
