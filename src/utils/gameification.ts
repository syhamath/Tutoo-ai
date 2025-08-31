import { Badge, UserProfile } from '../types/app';

// Enhanced gamification utilities for Tutoo
export class GameificationEngine {
  
  // Calculate XP requirements for each level
  static calculateXPForLevel(level: number): number {
    return level * 200 + (level - 1) * 50; // Progressive XP requirement
  }

  // Check if user deserves new badges
  static checkBadgeEligibility(userProfile: UserProfile): Badge[] {
    const newBadges: Badge[] = [];
    const earnedBadgeIds = userProfile.badges
      .filter(b => b.earned)
      .map(b => b.id);

    // First lesson badge
    if (!earnedBadgeIds.includes('first-lesson') && userProfile.totalXp > 0) {
      newBadges.push({
        id: 'first-lesson',
        name: 'Premier Pas',
        description: 'Première leçon terminée!',
        icon: '🎯',
        earned: true,
        earnedDate: new Date().toISOString(),
        category: 'progress',
        rarity: 'common'
      });
    }

    // Streak badges
    if (!earnedBadgeIds.includes('streak-3') && userProfile.streak >= 3) {
      newBadges.push({
        id: 'streak-3',
        name: 'Constance',
        description: '3 jours consécutifs!',
        icon: '🔥',
        earned: true,
        earnedDate: new Date().toISOString(),
        category: 'streak',
        rarity: 'common'
      });
    }

    if (!earnedBadgeIds.includes('streak-7') && userProfile.streak >= 7) {
      newBadges.push({
        id: 'streak-7',
        name: 'Régularité',
        description: '7 jours d\'apprentissage consécutifs',
        icon: '🔥',
        earned: true,
        earnedDate: new Date().toISOString(),
        category: 'streak',
        rarity: 'rare'
      });
    }

    if (!earnedBadgeIds.includes('streak-30') && userProfile.streak >= 30) {
      newBadges.push({
        id: 'streak-30',
        name: 'Maître de la Discipline',
        description: '30 jours consécutifs - Incroyable!',
        icon: '👑',
        earned: true,
        earnedDate: new Date().toISOString(),
        category: 'streak',
        rarity: 'legendary'
      });
    }

    // Level badges
    if (!earnedBadgeIds.includes('level-5') && userProfile.level >= 5) {
      newBadges.push({
        id: 'level-5',
        name: 'Explorateur',
        description: 'Niveau 5 atteint!',
        icon: '🗺️',
        earned: true,
        earnedDate: new Date().toISOString(),
        category: 'progress',
        rarity: 'common'
      });
    }

    if (!earnedBadgeIds.includes('level-10') && userProfile.level >= 10) {
      newBadges.push({
        id: 'level-10',
        name: 'Aventurier',
        description: 'Niveau 10 - Tu progresses bien!',
        icon: '⚔️',
        earned: true,
        earnedDate: new Date().toISOString(),
        category: 'progress',
        rarity: 'rare'
      });
    }

    // XP milestone badges
    if (!earnedBadgeIds.includes('xp-1000') && userProfile.totalXp >= 1000) {
      newBadges.push({
        id: 'xp-1000',
        name: 'Collecteur d\'XP',
        description: '1000 XP collectés!',
        icon: '💎',
        earned: true,
        earnedDate: new Date().toISOString(),
        category: 'mastery',
        rarity: 'rare'
      });
    }

    return newBadges;
  }

  // Generate motivational messages based on progress
  static getMotivationalMessage(userProfile: UserProfile, language: 'fr' | 'ar'): string {
    const messages = {
      fr: [
        `Bravo ${userProfile.nickname}! Tu es au niveau ${userProfile.level}! 🌟`,
        `${userProfile.streak} jours consécutifs - Continue comme ça! 🔥`,
        `Plus que ${userProfile.xpToNextLevel - userProfile.xp} XP pour le niveau suivant! 💪`,
        `Tu as déjà gagné ${userProfile.badges.filter(b => b.earned).length} badges! 🏆`,
        `Tes progrès sont fantastiques! Continue à apprendre! 📚`
      ],
      ar: [
        `أحسنت ${userProfile.nickname}! أنت في المستوى ${userProfile.level}! 🌟`,
        `${userProfile.streak} أيام متتالية - استمر هكذا! 🔥`,
        `${userProfile.xpToNextLevel - userProfile.xp} نقطة فقط للمستوى التالي! 💪`,
        `لقد حصلت على ${userProfile.badges.filter(b => b.earned).length} شارة! 🏆`,
        `تقدمك رائع! استمر في التعلم! 📚`
      ]
    };

    const languageMessages = messages[language];
    return languageMessages[Math.floor(Math.random() * languageMessages.length)];
  }

  // Calculate weekly goal progress
  static calculateWeeklyGoals(weeklyProgress: any[]): {
    lessonsGoal: { current: number; target: number; percentage: number };
    xpGoal: { current: number; target: number; percentage: number };
  } {
    const currentWeekLessons = weeklyProgress.reduce((sum, day) => sum + day.lessonsCompleted, 0);
    const currentWeekXP = weeklyProgress.reduce((sum, day) => sum + day.xpEarned, 0);
    
    const lessonsTarget = 15; // 15 lessons per week goal
    const xpTarget = 1000; // 1000 XP per week goal

    return {
      lessonsGoal: {
        current: currentWeekLessons,
        target: lessonsTarget,
        percentage: Math.min((currentWeekLessons / lessonsTarget) * 100, 100)
      },
      xpGoal: {
        current: currentWeekXP,
        target: xpTarget,
        percentage: Math.min((currentWeekXP / xpTarget) * 100, 100)
      }
    };
  }

  // Generate achievement celebration effects
  static createCelebrationEffect(achievementType: 'badge' | 'levelup' | 'streak' | 'goal'): string[] {
    const effects = {
      badge: ['🎉', '🏆', '⭐', '🎊', '✨'],
      levelup: ['🎆', '🌟', '💫', '🎇', '✨'],
      streak: ['🔥', '💪', '⚡', '🌟', '🎯'],
      goal: ['🎊', '🏁', '🎉', '🏆', '💎']
    };

    return effects[achievementType];
  }

  // Smart lesson recommendation based on progress
  static recommendNextLesson(userProfile: UserProfile, availableLessons: any[]): any | null {
    // Prioritize improvement areas
    const weakAreas = userProfile.areasToImprove
      .filter(area => area.score < 70)
      .sort((a, b) => a.score - b.score);

    if (weakAreas.length > 0) {
      const weakestArea = weakAreas[0];
      const matchingLesson = availableLessons.find(lesson => 
        lesson.subject === weakestArea.subject
      );
      if (matchingLesson) return matchingLesson;
    }

    // Find next incomplete lesson
    return availableLessons.find(lesson => !lesson.completed) || null;
  }
}

// Utility functions for animations and effects
export const animationUtils = {
  triggerCelebration: (element: HTMLElement) => {
    element.classList.add('celebrate');
    setTimeout(() => element.classList.remove('celebrate'), 600);
  },

  triggerStarTrail: (element: HTMLElement) => {
    element.classList.add('star-trail');
    setTimeout(() => element.classList.remove('star-trail'), 2000);
  },

  triggerGentleBounce: (element: HTMLElement) => {
    element.classList.add('bounce-gentle');
    setTimeout(() => element.classList.remove('bounce-gentle'), 2000);
  }
};