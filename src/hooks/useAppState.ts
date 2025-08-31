import { useState, useEffect, useCallback } from 'react';
import { AppState, Screen, Language, UserProfile, Course, Lesson } from '../types/app';

// Enhanced state management hook for Tutoo
export function useAppState() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: "splash",
    language: "fr",
    userType: "student",
    isOffline: false,
    sidebarVisible: true,
    isAuthenticated: false,
  });

  // Check if device is offline
  useEffect(() => {
    const handleOnline = () => setAppState(prev => ({ ...prev, isOffline: false }));
    const handleOffline = () => setAppState(prev => ({ ...prev, isOffline: true }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Navigation function
  const navigateToScreen = useCallback((screen: Screen, data?: any) => {
    setAppState(prev => ({
      ...prev,
      currentScreen: screen,
      ...data,
    }));
  }, []);

  // Language management
  const setLanguage = useCallback((language: Language) => {
    setAppState(prev => ({ ...prev, language }));
    // Save to localStorage for persistence
    localStorage.setItem('tutoo_language', language);
  }, []);

  // User profile management
  const updateUserProfile = useCallback((updates: Partial<UserProfile>) => {
    setAppState(prev => ({
      ...prev,
      userProfile: prev.userProfile
        ? { ...prev.userProfile, ...updates }
        : undefined,
    }));
  }, []);

  // XP and gamification
  const addXP = useCallback((amount: number) => {
    if (!appState.userProfile) return;

    const newXp = appState.userProfile.xp + amount;
    const newTotalXp = appState.userProfile.totalXp + amount;

    // Level up logic
    let newLevel = appState.userProfile.level;
    let remainingXp = newXp;
    const xpToNextLevel = newLevel * 200;

    while (remainingXp >= xpToNextLevel) {
      remainingXp -= xpToNextLevel;
      newLevel++;
    }

    updateUserProfile({
      xp: remainingXp,
      level: newLevel,
      totalXp: newTotalXp,
      xpToNextLevel: newLevel * 200,
    });

    // Trigger celebration animation if level up occurred
    if (newLevel > appState.userProfile.level) {
      // Could emit an event or show notification here
      console.log(`Level up! New level: ${newLevel}`);
    }
  }, [appState.userProfile, updateUserProfile]);

  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      sidebarVisible: !prev.sidebarVisible,
    }));
  }, []);

  // Authentication
  const login = useCallback((userType: "student" | "teacher" | "parent", profile?: UserProfile) => {
    setAppState(prev => ({
      ...prev,
      userType,
      isAuthenticated: true,
      userProfile: profile,
    }));
  }, []);

  const logout = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      isAuthenticated: false,
      userProfile: undefined,
      currentScreen: "login",
    }));
  }, []);

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('tutoo_language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, [setLanguage]);

  return {
    appState,
    navigateToScreen,
    setLanguage,
    updateUserProfile,
    addXP,
    toggleSidebar,
    login,
    logout,
  };
}