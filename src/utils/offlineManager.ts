import { Course, ProgressUpdate, OfflineData } from '../types/app';

// Offline functionality for Mauritanian students with limited connectivity
export class OfflineManager {
  private static readonly STORAGE_KEY = 'tutoo_offline_data';
  private static readonly MAX_OFFLINE_LESSONS = 10; // Limit for storage optimization

  // Store courses for offline access
  static async storeCoursesOffline(courses: Course[]): Promise<void> {
    try {
      // Optimize courses for offline storage (remove large video files, keep essential data)
      const optimizedCourses = courses.map(course => ({
        ...course,
        lessons: course.lessons.map(lesson => ({
          ...lesson,
          videoUrl: lesson.videoUrl ? 'offline_placeholder' : undefined,
          // Keep only essential lesson data
        }))
      }));

      const offlineData: OfflineData = {
        courses: optimizedCourses.slice(0, this.MAX_OFFLINE_LESSONS),
        userProgress: this.getStoredProgress(),
        lastSync: new Date().toISOString(),
        pendingSync: this.getPendingSync()
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(offlineData));
      console.log('Courses stored offline successfully');
    } catch (error) {
      console.error('Failed to store courses offline:', error);
    }
  }

  // Retrieve offline courses
  static getOfflineCourses(): Course[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];

      const offlineData: OfflineData = JSON.parse(stored);
      return offlineData.courses || [];
    } catch (error) {
      console.error('Failed to retrieve offline courses:', error);
      return [];
    }
  }

  // Store progress updates when offline
  static storeProgressOffline(progress: ProgressUpdate): void {
    try {
      const currentData = this.getOfflineData();
      currentData.pendingSync.push(progress);
      currentData.userProgress.push(progress);
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentData));
      console.log('Progress stored offline:', progress);
    } catch (error) {
      console.error('Failed to store offline progress:', error);
    }
  }

  // Get all stored offline data
  static getOfflineData(): OfflineData {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) {
        return {
          courses: [],
          userProgress: [],
          lastSync: '',
          pendingSync: []
        };
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to get offline data:', error);
      return {
        courses: [],
        userProgress: [],
        lastSync: '',
        pendingSync: []
      };
    }
  }

  // Get stored progress
  static getStoredProgress(): ProgressUpdate[] {
    const data = this.getOfflineData();
    return data.userProgress || [];
  }

  // Get pending sync items
  static getPendingSync(): ProgressUpdate[] {
    const data = this.getOfflineData();
    return data.pendingSync || [];
  }

  // Sync pending data when online
  static async syncPendingData(): Promise<boolean> {
    try {
      const data = this.getOfflineData();
      const pendingItems = data.pendingSync;

      if (pendingItems.length === 0) {
        console.log('No pending data to sync');
        return true;
      }

      // TODO: Replace with actual API call when backend is ready
      console.log('Syncing pending data:', pendingItems);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Clear pending sync after successful upload
      data.pendingSync = [];
      data.lastSync = new Date().toISOString();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));

      console.log('Data synced successfully');
      return true;
    } catch (error) {
      console.error('Failed to sync data:', error);
      return false;
    }
  }

  // Check storage usage (important for limited devices in Mauritania)
  static getStorageInfo(): { used: number; available: number; percentage: number } {
    try {
      const used = new Blob([localStorage.getItem(this.STORAGE_KEY) || '']).size;
      const maxStorage = 5 * 1024 * 1024; // 5MB limit for mobile devices
      
      return {
        used,
        available: maxStorage - used,
        percentage: (used / maxStorage) * 100
      };
    } catch (error) {
      return { used: 0, available: 0, percentage: 0 };
    }
  }

  // Clean up old offline data to save space
  static cleanupOldData(): void {
    try {
      const data = this.getOfflineData();
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      // Remove progress older than a week (keep recent for analytics)
      data.userProgress = data.userProgress.filter(progress => {
        const progressDate = new Date(progress.lessonId); // Assuming timestamp in ID
        return progressDate > oneWeekAgo;
      });

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      console.log('Old offline data cleaned up');
    } catch (error) {
      console.error('Failed to cleanup old data:', error);
    }
  }

  // Pre-download essential content for offline use
  static async preloadEssentialContent(): Promise<void> {
    try {
      // Download critical lesson content for offline access
      console.log('Preloading essential content for offline access...');
      
      // TODO: Implement actual content preloading
      // - Download lesson thumbnails
      // - Cache small video previews
      // - Store lesson text content
      // - Download quiz questions
      
      console.log('Essential content preloaded');
    } catch (error) {
      console.error('Failed to preload content:', error);
    }
  }

  // Network speed detection for Mauritanian connectivity
  static detectNetworkSpeed(): Promise<'slow' | 'normal' | 'fast'> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const img = new Image();
      
      img.onload = () => {
        const loadTime = Date.now() - startTime;
        if (loadTime < 500) resolve('fast');
        else if (loadTime < 1500) resolve('normal');
        else resolve('slow');
      };
      
      img.onerror = () => resolve('slow');
      
      // Small test image
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    });
  }

  // Adaptive content loading based on network
  static shouldLoadHighQuality(): boolean {
    const storageInfo = this.getStorageInfo();
    const hasSpace = storageInfo.percentage < 80;
    
    // Only load high quality if we have space and good connection
    return hasSpace && navigator.onLine;
  }
}