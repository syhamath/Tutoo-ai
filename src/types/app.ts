// Core types for Tutoo app
export type Screen =
  | "splash"
  | "onboarding"
  | "login"
  | "dashboard"
  | "lesson"
  | "upload"
  | "parent"
  | "profile"
  | "progress"
  | "achievements"
  | "settings";

export type Language = "fr" | "ar";
export type Theme = "football" | "wizard" | "dragon" | "space";
export type UserType = "student" | "teacher" | "parent";

export interface UserProfile {
  id?: string;
  nickname: string;
  avatar: Theme;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalXp: number;
  streak: number;
  badges: Badge[];
  unlockedStickers: string[];
  weeklyProgress: WeeklyProgress[];
  areasToImprove: ImprovementArea[];
  createdAt?: string;
  updatedAt?: string;
}

export interface WeeklyProgress {
  date: string;
  lessonsCompleted: number;
  xpEarned: number;
  day: string;
  timeSpent?: number; // in minutes
}

export interface ImprovementArea {
  subject: string;
  topic: string;
  score: number;
  icon: string;
  color: string;
  suggestedLessons?: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  category: "progress" | "streak" | "mastery" | "special";
  rarity?: "common" | "rare" | "epic" | "legendary";
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  progress: number;
  type: "video" | "quiz" | "exercise" | "interactive";
  videoUrl?: string;
  description: string;
  xpReward: number;
  stars: number; // 0-3 stars earned
  difficulty: "easy" | "medium" | "hard";
  prerequisites?: string[];
  tags?: string[];
  aiHints?: string[];
}

export interface Course {
  id: string;
  subject: string;
  title: string;
  lessons: Lesson[];
  totalProgress: number;
  icon: string;
  color: string;
  unlocked: boolean;
  estimatedTime?: string;
  difficulty: "easy" | "medium" | "hard";
  description?: string;
  ageGroup?: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  courses: Course[];
  isAvailable: boolean;
  requiresUnlock?: boolean;
}

export interface AppState {
  currentScreen: Screen;
  language: Language;
  selectedSubject?: string;
  selectedCourse?: Course;
  selectedLesson?: Lesson;
  userType: UserType;
  isOffline: boolean;
  sidebarVisible: boolean;
  userProfile?: UserProfile;
  isAuthenticated: boolean;
  deviceType?: "mobile" | "tablet" | "desktop";
  networkSpeed?: "slow" | "normal" | "fast";
}

// API Response types for future backend integration
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  userType: UserType;
}

export interface ProgressUpdate {
  lessonId: string;
  completed: boolean;
  stars: number;
  timeSpent: number;
  xpEarned: number;
}

// Offline data types
export interface OfflineData {
  courses: Course[];
  userProgress: ProgressUpdate[];
  lastSync: string;
  pendingSync: ProgressUpdate[];
}

// AI Assistant types
export interface AIResponse {
  message: string;
  suggestions?: string[];
  relatedLessons?: string[];
  confidence: number;
}

export interface AIQuery {
  question: string;
  context: {
    currentLesson?: string;
    subject?: string;
    userLevel?: number;
  };
  language: Language;
}