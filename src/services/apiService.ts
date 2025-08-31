import { UserProfile, Course, Lesson, ProgressUpdate, APIResponse, LoginRequest } from '../types/app';
import { OfflineManager } from '../utils/offlineManager';

// API Service for Tutoo - Ready for Supabase integration
export class APIService {
  private static readonly BASE_URL = process.env.VITE_API_BASE_URL || '/api';
  private static readonly TIMEOUT = 10000; // 10 seconds for Mauritanian connectivity

  // Generic request handler with offline support
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    try {
      // Check if online
      if (!navigator.onLine) {
        throw new Error('Device is offline');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

      const response = await fetch(`${this.BASE_URL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Authentication
  static async login(credentials: LoginRequest): Promise<APIResponse<{ user: UserProfile; token: string }>> {
    // Mock implementation - replace with actual Supabase auth
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.username && credentials.password) {
      const mockUser: UserProfile = {
        id: 'user_' + Date.now(),
        nickname: credentials.username,
        avatar: 'football',
        level: 1,
        xp: 0,
        xpToNextLevel: 200,
        totalXp: 0,
        streak: 0,
        badges: [],
        unlockedStickers: [],
        weeklyProgress: [],
        areasToImprove: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        success: true,
        data: {
          user: mockUser,
          token: 'mock_jwt_token_' + Date.now(),
        },
      };
    }

    return {
      success: false,
      error: 'Invalid credentials',
    };
  }

  static async logout(): Promise<APIResponse<void>> {
    // Clear auth token and user data
    localStorage.removeItem('tutoo_auth_token');
    localStorage.removeItem('tutoo_user_data');
    
    return { success: true };
  }

  // User Profile Management
  static async getUserProfile(userId: string): Promise<APIResponse<UserProfile>> {
    return this.makeRequest<UserProfile>(`/users/${userId}`);
  }

  static async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<APIResponse<UserProfile>> {
    return this.makeRequest<UserProfile>(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  // Course and Lesson Management
  static async getCourses(subject?: string): Promise<APIResponse<Course[]>> {
    const queryParam = subject ? `?subject=${subject}` : '';
    return this.makeRequest<Course[]>(`/courses${queryParam}`);
  }

  static async getCourse(courseId: string): Promise<APIResponse<Course>> {
    return this.makeRequest<Course>(`/courses/${courseId}`);
  }

  static async getLesson(lessonId: string): Promise<APIResponse<Lesson>> {
    return this.makeRequest<Lesson>(`/lessons/${lessonId}`);
  }

  // Progress Tracking
  static async updateProgress(progress: ProgressUpdate): Promise<APIResponse<void>> {
    try {
      const result = await this.makeRequest<void>('/progress', {
        method: 'POST',
        body: JSON.stringify(progress),
      });

      if (!result.success && !navigator.onLine) {
        // Store offline if request fails and we're offline
        OfflineManager.storeProgressOffline(progress);
        return { success: true, message: 'Progress stored offline' };
      }

      return result;
    } catch (error) {
      // Fallback to offline storage
      OfflineManager.storeProgressOffline(progress);
      return { success: true, message: 'Progress stored offline' };
    }
  }

  static async getProgress(userId: string): Promise<APIResponse<ProgressUpdate[]>> {
    return this.makeRequest<ProgressUpdate[]>(`/users/${userId}/progress`);
  }

  // AI Assistant Integration
  static async getAIResponse(query: string, context: any): Promise<APIResponse<string>> {
    try {
      const result = await this.makeRequest<{ response: string }>('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ query, context }),
      });

      return {
        success: result.success,
        data: result.data?.response,
        error: result.error,
      };
    } catch (error) {
      // Fallback to local AI responses when offline
      return {
        success: true,
        data: "Je suis désolé, je ne peux pas répondre en ce moment car tu es hors ligne. Essaie de te reconnecter à internet pour utiliser l'assistant IA! 🦉",
      };
    }
  }

  // Content Management for Teachers
  static async uploadLesson(lessonData: FormData): Promise<APIResponse<Lesson>> {
    return this.makeRequest<Lesson>('/lessons', {
      method: 'POST',
      body: lessonData,
      headers: {}, // Don't set Content-Type for FormData
    });
  }

  static async uploadCourse(courseData: Partial<Course>): Promise<APIResponse<Course>> {
    return this.makeRequest<Course>('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  }

  // Analytics and Reporting
  static async getAnalytics(userId: string, timeframe: 'week' | 'month' | 'year'): Promise<APIResponse<any>> {
    return this.makeRequest<any>(`/users/${userId}/analytics?timeframe=${timeframe}`);
  }

  static async getLeaderboard(type: 'class' | 'school' | 'global'): Promise<APIResponse<any[]>> {
    return this.makeRequest<any[]>(`/leaderboard?type=${type}`);
  }

  // Offline Sync
  static async syncOfflineData(): Promise<APIResponse<void>> {
    try {
      const pendingData = OfflineManager.getPendingSync();
      
      if (pendingData.length === 0) {
        return { success: true, message: 'No data to sync' };
      }

      const result = await this.makeRequest<void>('/sync', {
        method: 'POST',
        body: JSON.stringify({ updates: pendingData }),
      });

      if (result.success) {
        await OfflineManager.syncPendingData();
        return { success: true, message: `Synced ${pendingData.length} updates` };
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Sync failed: ' + (error instanceof Error ? error.message : 'Unknown error'),
      };
    }
  }

  // Network utilities for Mauritanian connectivity
  static async checkNetworkSpeed(): Promise<'slow' | 'normal' | 'fast'> {
    return OfflineManager.detectNetworkSpeed();
  }

  static async preloadContent(courseIds: string[]): Promise<APIResponse<void>> {
    try {
      // Download essential content for offline use
      const downloadPromises = courseIds.map(async (courseId) => {
        const course = await this.getCourse(courseId);
        if (course.success && course.data) {
          await OfflineManager.storeCoursesOffline([course.data]);
        }
      });

      await Promise.all(downloadPromises);
      await OfflineManager.preloadEssentialContent();

      return { success: true, message: 'Content preloaded for offline use' };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to preload content: ' + (error instanceof Error ? error.message : 'Unknown error'),
      };
    }
  }

  // Parent monitoring features
  static async getChildProgress(childId: string): Promise<APIResponse<any>> {
    return this.makeRequest<any>(`/parents/child/${childId}/progress`);
  }

  static async getChildActivity(childId: string, days: number = 7): Promise<APIResponse<any[]>> {
    return this.makeRequest<any[]>(`/parents/child/${childId}/activity?days=${days}`);
  }

  // Gamification
  static async claimBadge(userId: string, badgeId: string): Promise<APIResponse<void>> {
    return this.makeRequest<void>(`/users/${userId}/badges/${badgeId}/claim`, {
      method: 'POST',
    });
  }

  static async getAvailableBadges(userId: string): Promise<APIResponse<any[]>> {
    return this.makeRequest<any[]>(`/users/${userId}/badges/available`);
  }
}

// Utility functions for token management
export const AuthUtils = {
  setAuthToken: (token: string) => {
    localStorage.setItem('tutoo_auth_token', token);
  },

  getAuthToken: (): string | null => {
    return localStorage.getItem('tutoo_auth_token');
  },

  removeAuthToken: () => {
    localStorage.removeItem('tutoo_auth_token');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('tutoo_auth_token');
  },
};

// Error handling utility
export const handleAPIError = (error: any, language: 'fr' | 'ar' = 'fr') => {
  const messages = {
    fr: {
      offline: 'Tu es hors ligne. Tes données seront synchronisées quand tu te reconnecteras.',
      timeout: 'La connexion est lente. Essaie à nouveau.',
      server: 'Problème avec le serveur. Essaie plus tard.',
      auth: 'Tu dois te reconnecter.',
      default: 'Une erreur est survenue. Essaie à nouveau.',
    },
    ar: {
      offline: 'أنت غير متصل. ستتم مزامنة بياناتك عند إعادة الاتصال.',
      timeout: 'الاتصال بطيء. حاول مرة أخرى.',
      server: 'مشكلة في الخادم. حاول لاحقاً.',
      auth: 'يجب عليك تسجيل الدخول مرة أخرى.',
      default: 'حدث خطأ. حاول مرة أخرى.',
    },
  };

  const langMessages = messages[language];

  if (error.message?.includes('offline')) return langMessages.offline;
  if (error.message?.includes('timeout')) return langMessages.timeout;
  if (error.message?.includes('401')) return langMessages.auth;
  if (error.message?.includes('500')) return langMessages.server;
  
  return langMessages.default;
};