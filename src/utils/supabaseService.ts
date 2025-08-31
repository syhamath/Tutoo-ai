// src/utils/supabaseService.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  UserProfile,
  Course,
  Lesson,
  ProgressUpdate,
  APIResponse,
  LoginRequest
} from '../types/app';
import { supabaseUrl, publicAnonKey, projectId, serverBase } from './supabase/info';

// Supabase integration for Tutoo
export class SupabaseService {
  private static supabase: SupabaseClient | null = null;
  private static isSupabaseAvailable = false;

  // Base for your API (Supabase Edge Functions or Cloudflare Pages Functions)
  // Example final URLs produced by makeRequest:
  //   - Supabase Edge: https://<project>.supabase.co/functions/v1/auth/signup
  //   - Cloudflare Pages: /api/auth/signup   (if VITE_API_BASE=/api)
 // private static readonly SERVER_URL = `${serverBase}`;
  // Example inside supabaseService.ts
private static readonly SERVER_URL = `${serverBase}/make-server-ad5853f1`;


  // Initialize Supabase client with error handling
  private static initializeSupabase() {
    try {
      if (!this.supabase) {
        if (!supabaseUrl || !publicAnonKey) {
          console.warn('Missing Supabase URL or Anon key — running in offline mode.');
          this.isSupabaseAvailable = false;
          return;
        }
        this.supabase = createClient(supabaseUrl, publicAnonKey);
        this.isSupabaseAvailable = true;
      }
    } catch (error) {
      console.warn('Supabase initialization failed:', error);
      this.isSupabaseAvailable = false;
    }
  }

  // Check if Supabase is available
  private static checkSupabaseAvailability(): boolean {
    if (!this.isSupabaseAvailable) {
      console.warn('Supabase is not available. Running in offline mode.');
      return false;
    }
    return true;
  }

  // Helper method for API requests with better error handling
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    try {
      // Check network connectivity
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        return {
          success: false,
          error: 'No internet connection. Please check your network and try again.',
        };
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${this.SERVER_URL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
          ...(options.headers || {}),
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        let errorData: any;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText || `HTTP ${response.status}` };
        }
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Supabase request failed:', error);
      let userMessage = 'Connection failed. ';
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          userMessage += 'Request timed out. Please check your internet connection.';
        } else if (error.message.includes('Failed to fetch')) {
          userMessage += 'Cannot reach server. Please check your internet connection and try again.';
        } else {
          userMessage += error.message;
        }
      } else {
        userMessage += 'Please try again later.';
      }
      return { success: false, error: userMessage };
    }
  }

  // Authentication methods
  static async signUp(
    email: string,
    password: string,
    nickname: string,
    userType: 'student' | 'teacher' | 'parent' = 'student'
  ): Promise<APIResponse<{ user: any; profile: UserProfile }>> {
    this.initializeSupabase();
    try {
      const result = await this.makeRequest<{ user: any; profile: UserProfile }>(
        '/auth/signup',
        {
          method: 'POST',
          body: JSON.stringify({ email, password, nickname, userType }),
        }
      );

      if (result.success && result.data) {
        localStorage.setItem('tutoo_auth_token', 'supabase_session');
        localStorage.setItem('tutoo_user_data', JSON.stringify(result.data.profile));
        return result;
      }
      return this.createMockUser(email, nickname, userType);
    } catch (error) {
      console.warn('Supabase signup failed, creating mock user:', error);
      return this.createMockUser(email, nickname, userType);
    }
  }

  // Create a mock user for offline mode
  private static createMockUser(
    email: string,
    nickname: string,
    userType: 'student' | 'teacher' | 'parent'
  ): APIResponse<{ user: any; profile: UserProfile }> {
    const mockProfile: UserProfile = {
      id: 'mock_' + Date.now(),
      nickname,
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

    const mockUser = {
      id: mockProfile.id,
      email,
      user_metadata: { nickname, userType },
    };

    localStorage.setItem('tutoo_auth_token', 'mock_session_' + Date.now());
    localStorage.setItem('tutoo_user_data', JSON.stringify(mockProfile));

    return { success: true, data: { user: mockUser, profile: mockProfile } };
    }

  static async signIn(
    email: string,
    password: string
  ): Promise<APIResponse<{ user: any; session: any }>> {
    this.initializeSupabase();
    try {
      if (this.checkSupabaseAvailability() && this.supabase) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error && data) {
          localStorage.setItem('tutoo_auth_token', data.session.access_token);
          try {
            const profileResult = await this.getUserProfile(data.user.id);
            if (profileResult.success && profileResult.data) {
              localStorage.setItem('tutoo_user_data', JSON.stringify(profileResult.data));
            }
          } catch (profileError) {
            console.warn('Failed to load user profile, but sign in succeeded:', profileError);
          }
          return { success: true, data: { user: data.user, session: data.session } };
        }
        if (error) console.warn('Supabase sign in failed:', error.message);
      }

      // Fallback: mock for demo/offline mode
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }
      return this.createMockUser(email, email.split('@')[0] || 'Student', 'student');

    } catch (error) {
      console.warn('Sign in error, using mock authentication:', error);
      return this.createMockUser(email, email.split('@')[0] || 'Student', 'student');
    }
  }

  static async signOut(): Promise<APIResponse<void>> {
    try {
      if (this.supabase) {
        const { error } = await this.supabase.auth.signOut();
        if (error) return { success: false, error: error.message };
      }
      localStorage.removeItem('tutoo_auth_token');
      localStorage.removeItem('tutoo_user_data');
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Sign out failed: ' + (error instanceof Error ? error.message : 'Unknown error') };
    }
  }

  static async getCurrentSession(): Promise<APIResponse<any>> {
    this.initializeSupabase();

    if (!this.checkSupabaseAvailability() || !this.supabase) {
      const localToken = localStorage.getItem('tutoo_auth_token');
      if (localToken) return { success: true, data: { access_token: localToken } };
      return { success: false, error: 'Authentication service unavailable' };
    }

    try {
      const { data: { session }, error } = await this.supabase.auth.getSession();
      if (error) {
        const localToken = localStorage.getItem('tutoo_auth_token');
        if (localToken) return { success: true, data: { access_token: localToken } };
        return { success: false, error: error.message };
      }
      return { success: true, data: session };
    } catch (error) {
      const localToken = localStorage.getItem('tutoo_auth_token');
      if (localToken) return { success: true, data: { access_token: localToken } };
      return { success: false, error: 'Session check failed: ' + (error instanceof Error ? error.message : 'Network error') };
    }
  }

  // ---- User profile ----
  static async getUserProfile(userId: string): Promise<APIResponse<UserProfile>> {
    const token = localStorage.getItem('tutoo_auth_token');
    return this.makeRequest<UserProfile>(`/users/${userId}/profile`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  }

  static async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<APIResponse<UserProfile>> {
    const token = localStorage.getItem('tutoo_auth_token');
    const result = await this.makeRequest<UserProfile>(`/users/${userId}/profile`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(updates),
    });
    if (result.success && result.data) {
      localStorage.setItem('tutoo_user_data', JSON.stringify(result.data));
    }
    return result;
  }

  // ---- Progress ----
  static async trackProgress(progress: ProgressUpdate): Promise<APIResponse<any>> {
    const token = localStorage.getItem('tutoo_auth_token');
    return this.makeRequest<any>('/progress', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(progress),
    });
  }

  static async getUserProgress(userId: string): Promise<APIResponse<ProgressUpdate[]>> {
    const token = localStorage.getItem('tutoo_auth_token');
    return this.makeRequest<ProgressUpdate[]>(`/users/${userId}/progress`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  }

  // ---- Courses ----
  static async getCourses(subject?: string): Promise<APIResponse<Course[]>> {
    const queryParam = subject ? `?subject=${subject}` : '';
    return this.makeRequest<Course[]>(`/courses${queryParam}`);
  }

  static async createCourse(courseData: Partial<Course>): Promise<APIResponse<Course>> {
    const token = localStorage.getItem('tutoo_auth_token');
    return this.makeRequest<Course>('/courses', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(courseData),
    });
  }

  // ---- AI Assistant ----
  static async getAIResponse(
    query: string,
    context: any,
    language: 'fr' | 'ar' = 'fr'
  ): Promise<APIResponse<{ response: string; suggestions: string[] }>> {
    return this.makeRequest<{ response: string; suggestions: string[] }>(
      '/ai/chat',
      {
        method: 'POST',
        body: JSON.stringify({ query, context, language }),
      }
    );
  }

  // ---- Analytics ----
  static async getAnalytics(userId: string, timeframe: 'week' | 'month' | 'year' = 'week'): Promise<APIResponse<any>> {
    const token = localStorage.getItem('tutoo_auth_token');
    return this.makeRequest<any>(`/users/${userId}/analytics?timeframe=${timeframe}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  }

  // ---- Sync offline data ----
  static async syncOfflineData(updates: any[]): Promise<APIResponse<void>> {
    const token = localStorage.getItem('tutoo_auth_token');
    return this.makeRequest<void>('/sync', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ updates }),
    });
  }

  // ---- Badges ----
  static async claimBadge(userId: string, badgeId: string): Promise<APIResponse<any>> {
    const token = localStorage.getItem('tutoo_auth_token');
    return this.makeRequest<any>(`/users/${userId}/badges/${badgeId}/claim`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    });
  }

  // ---- Utilities ----
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('tutoo_auth_token');
  }

  static getCurrentUser(): UserProfile | null {
    const userData = localStorage.getItem('tutoo_user_data');
    return userData ? JSON.parse(userData) : null;
  }

  static async checkServerHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.SERVER_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error('Server health check failed:', error);
      return false;
    }
  }
}
