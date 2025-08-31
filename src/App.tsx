import React from "react";
import SplashScreen from "./components/SplashScreen";
import LoginScreen from "./components/LoginScreen";
import AuthScreen from "./components/AuthScreen";
import OnboardingScreen from "./components/OnboardingScreen";
import StudentDashboard from "./components/StudentDashboard";
import EnhancedStudentDashboard from "./components/EnhancedStudentDashboard";
import LessonScreen from "./components/LessonScreen";
import TeacherUpload from "./components/TeacherUpload";
import ParentView from "./components/ParentView";
import OfflineIndicator from "./components/OfflineIndicator";
import ConnectionStatus from "./components/ConnectionStatus";
import Navigation from "./components/Navigation";
import AIVoiceAssistant from "./components/AIVoiceAssistant";
import { useAppState } from "./hooks/useAppState";
import { SupabaseService } from "./utils/supabaseService";
import {
  Screen,
  Language,
  Theme,
  UserProfile,
  Course,
  Lesson,
  AppState,
  Badge,
  WeeklyProgress,
  ImprovementArea,
} from "./types/app";

// Types moved to /types/app.ts

// Interfaces moved to /types/app.ts for better organization

// Sample badges
const sampleBadges: Badge[] = [
  {
    id: "first-lesson",
    name: "Premier Pas",
    description: "Première leçon terminée!",
    icon: "🎯",
    earned: true,
    earnedDate: "2025-01-15",
    category: "progress",
  },
  {
    id: "math-master",
    name: "As des Maths",
    description: "Terminé 10 leçons de mathématiques",
    icon: "🧮",
    earned: true,
    earnedDate: "2025-01-18",
    category: "mastery",
  },
  {
    id: "streak-7",
    name: "Régularité",
    description: "7 jours d'apprentissage consécutifs",
    icon: "🔥",
    earned: true,
    earnedDate: "2025-01-20",
    category: "streak",
  },
  {
    id: "quiz-champion",
    name: "Champion des Quiz",
    description: "Réussi 20 quiz parfaits",
    icon: "🏆",
    earned: false,
    category: "mastery",
  },
  {
    id: "speed-learner",
    name: "Apprenant Rapide",
    description: "Terminé 5 leçons en une journée",
    icon: "⚡",
    earned: true,
    earnedDate: "2025-01-16",
    category: "special",
  },
  {
    id: "perfect-week",
    name: "Semaine Parfaite",
    description: "Appris tous les jours de la semaine",
    icon: "🌟",
    earned: false,
    category: "streak",
  },
];

// Sample weekly progress data
const sampleWeeklyProgress: WeeklyProgress[] = [
  {
    date: "2025-01-15",
    lessonsCompleted: 3,
    xpEarned: 150,
    day: "Lun",
  },
  {
    date: "2025-01-16",
    lessonsCompleted: 2,
    xpEarned: 100,
    day: "Mar",
  },
  {
    date: "2025-01-17",
    lessonsCompleted: 4,
    xpEarned: 200,
    day: "Mer",
  },
  {
    date: "2025-01-18",
    lessonsCompleted: 1,
    xpEarned: 50,
    day: "Jeu",
  },
  {
    date: "2025-01-19",
    lessonsCompleted: 3,
    xpEarned: 175,
    day: "Ven",
  },
  {
    date: "2025-01-20",
    lessonsCompleted: 2,
    xpEarned: 125,
    day: "Sam",
  },
  {
    date: "2025-01-21",
    lessonsCompleted: 0,
    xpEarned: 0,
    day: "Dim",
  },
];

// Sample improvement areas
const sampleImprovementAreas: ImprovementArea[] = [
  {
    subject: "math",
    topic: "Fractions complexes",
    score: 65,
    icon: "🧮",
    color: "bg-orange-100 text-orange-700",
  },
  {
    subject: "french",
    topic: "Conjugaison passé",
    score: 58,
    icon: "📚",
    color: "bg-red-100 text-red-700",
  },
  {
    subject: "science",
    topic: "Système solaire",
    score: 72,
    icon: "🌍",
    color: "bg-yellow-100 text-yellow-700",
  },
];

// Sample user profile
const defaultProfile: UserProfile = {
  nickname: "",
  avatar: "football",
  level: 3,
  xp: 150,
  xpToNextLevel: 200,
  totalXp: 1250,
  streak: 5,
  badges: sampleBadges,
  unlockedStickers: ["star", "trophy", "medal", "crown"],
  weeklyProgress: sampleWeeklyProgress,
  areasToImprove: sampleImprovementAreas,
};

// Enhanced course data with gamification
const sampleCourses: Record<string, Course[]> = {
  math: [
    {
      id: "fractions-course",
      subject: "math",
      title: "Les Fractions Magiques",
      icon: "🧮",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      unlocked: true,
      totalProgress: 65,
      lessons: [
        {
          id: "fraction-intro",
          title: "La Magie des Fractions",
          duration: "7:30",
          completed: true,
          progress: 100,
          type: "video",
          description:
            "Découvre le monde magique des fractions!",
          xpReward: 50,
          stars: 3,
        },
        {
          id: "fraction-parts",
          title: "Diviser pour Régner",
          duration: "5:45",
          completed: true,
          progress: 100,
          type: "video",
          description: "Comment partager équitablement",
          xpReward: 40,
          stars: 2,
        },
        {
          id: "fraction-quiz1",
          title: "Défi des Fractions",
          duration: "3:00",
          completed: false,
          progress: 50,
          type: "quiz",
          description: "Teste tes pouvoirs magiques!",
          xpReward: 75,
          stars: 0,
        },
      ],
    },
  ],
  french: [
    {
      id: "reading-course",
      subject: "french",
      title: "Aventures Littéraires",
      icon: "📚",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      unlocked: true,
      totalProgress: 30,
      lessons: [
        {
          id: "reading-intro",
          title: "Les Héros des Histoires",
          duration: "6:20",
          completed: true,
          progress: 100,
          type: "video",
          description: "Rencontre tes héros préférés",
          xpReward: 45,
          stars: 3,
        },
      ],
    },
  ],
  science: [
    {
      id: "space-course",
      subject: "science",
      title: "Mission Spatiale",
      icon: "🚀",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      unlocked: false,
      totalProgress: 0,
      lessons: [],
    },
  ],
};

export default function App() {
  // Use the new enhanced state management hook
  const {
    appState,
    navigateToScreen,
    setLanguage,
    updateUserProfile,
    addXP,
    toggleSidebar,
    login,
    logout,
  } = useAppState();

  const [showAIAssistant, setShowAIAssistant] =
    React.useState(false);
  const [isInitialized, setIsInitialized] =
    React.useState(false);
  const [initializationStatus, setInitializationStatus] =
    React.useState("Initialisation...");

  // Initialize app and check for existing session
  React.useEffect(() => {
    const initializeApp = async () => {
      setIsInitialized(false);
      setInitializationStatus(
        appState.language === "fr"
          ? "Initialisation..."
          : "جاري التهيئة...",
      );

      try {
        // Check for existing user data in local storage first
        setInitializationStatus(
          appState.language === "fr"
            ? "Vérification des données locales..."
            : "فحص البيانات المحلية...",
        );

        const localUserData = SupabaseService.getCurrentUser();
        const localToken = localStorage.getItem(
          "tutoo_auth_token",
        );

        if (localUserData && localToken) {
          // User has local session data
          setInitializationStatus(
            appState.language === "fr"
              ? "Connexion automatique..."
              : "تسجيل دخول تلقائي...",
          );
          login("student", localUserData);
          setTimeout(() => {
            navigateToScreen("dashboard");
          }, 1000);
          return;
        }

        // Try to check Supabase session if local data is not available
        setInitializationStatus(
          appState.language === "fr"
            ? "Vérification de la connexion..."
            : "فحص الاتصال...",
        );

        try {
          const sessionResult =
            await SupabaseService.getCurrentSession();

          if (sessionResult.success && sessionResult.data) {
            // User has an active session
            const userProfile =
              SupabaseService.getCurrentUser();
            if (userProfile) {
              setInitializationStatus(
                appState.language === "fr"
                  ? "Connexion réussie!"
                  : "تم تسجيل الدخول بنجاح!",
              );
              login("student", userProfile);
              setTimeout(() => {
                navigateToScreen("dashboard");
              }, 1000);
              return;
            }
          }
        } catch (sessionError) {
          console.warn(
            "Session check failed, continuing with normal flow:",
            sessionError,
          );
          setInitializationStatus(
            appState.language === "fr"
              ? "Mode hors ligne activé"
              : "تم تفعيل الوضع غير المتصل",
          );
        }

        // No active session or connection failed, show splash then login
        setInitializationStatus(
          appState.language === "fr" ? "Prêt!" : "جاهز!",
        );
        setTimeout(() => {
          navigateToScreen("login");
        }, 2000);
      } catch (error) {
        console.error("App initialization error:", error);
        setInitializationStatus(
          appState.language === "fr"
            ? "Erreur - Mode démo"
            : "خطأ - الوضع التجريبي",
        );
        // Always fallback to normal flow
        setTimeout(() => {
          navigateToScreen("login");
        }, 2000);
      } finally {
        setTimeout(() => {
          setIsInitialized(true);
        }, 500);
      }
    };

    initializeApp();
  }, [login, navigateToScreen, appState.language]);

  // Initialize user profile with default data
  React.useEffect(() => {
    if (!appState.userProfile && appState.isAuthenticated) {
      updateUserProfile(defaultProfile);
    }
  }, [
    appState.isAuthenticated,
    appState.userProfile,
    updateUserProfile,
  ]);

  const selectSubjectAndCourse = (subject: string) => {
    const courses = sampleCourses[subject] || [];
    const firstCourse = courses[0];
    const firstLesson = firstCourse?.lessons[0];

    navigateToScreen("lesson", {
      selectedSubject: subject,
      selectedCourse: firstCourse,
      selectedLesson: firstLesson,
    });
  };

  const selectLesson = (lesson: Lesson) => {
    // Navigate to lesson with updated selection
    navigateToScreen("lesson", {
      selectedLesson: lesson,
    });
  };

  const completeLesson = async (
    lesson: Lesson,
    stars: number,
  ) => {
    // Add XP for completing lesson
    addXP(lesson.xpReward * stars);

    // Track progress in Supabase (with offline fallback)
    if (appState.userProfile) {
      try {
        const progressData = {
          lessonId: lesson.id,
          completed: true,
          stars,
          timeSpent: 0, // Could be tracked from lesson screen
          xpEarned: lesson.xpReward * stars,
        };

        const result =
          await SupabaseService.trackProgress(progressData);

        if (!result.success) {
          console.warn(
            "Progress tracking failed, storing offline:",
            result.error,
          );
          // Store progress locally for later sync
          const offlineProgress = JSON.parse(
            localStorage.getItem("tutoo_offline_progress") ||
              "[]",
          );
          offlineProgress.push({
            ...progressData,
            timestamp: new Date().toISOString(),
            userId: appState.userProfile.id,
          });
          localStorage.setItem(
            "tutoo_offline_progress",
            JSON.stringify(offlineProgress),
          );
        }
      } catch (error) {
        console.error("Failed to track progress:", error);
      }
    }

    // Update lesson progress locally
    const updatedLesson = {
      ...lesson,
      completed: true,
      stars,
      progress: 100,
    };

    navigateToScreen("lesson", {
      selectedLesson: updatedLesson,
    });
  };

  const renderCurrentScreen = () => {
    switch (appState.currentScreen) {
      case "splash":
        return (
          <SplashScreen
            onComplete={() => navigateToScreen("onboarding")}
            status={initializationStatus}
            language={appState.language}
          />
        );
      case "onboarding":
        return (
          <OnboardingScreen
            language={appState.language}
            setLanguage={setLanguage}
            onComplete={(userType) => {
              // Set user type and navigate to login
              navigateToScreen("login", { userType });
            }}
          />
        );
      case "login":
        return (
          <AuthScreen
            language={appState.language}
            onLogin={(userType, profile) => {
              login(userType, profile || defaultProfile);
              navigateToScreen("dashboard");
            }}
            onBack={() => navigateToScreen("onboarding")}
          />
        );
      case "dashboard":
        return (
          <EnhancedStudentDashboard
            language={appState.language}
            userProfile={appState.userProfile}
            courses={sampleCourses}
            onSubjectSelect={selectSubjectAndCourse}
            onContinueAdventure={() => {
              // Find next incomplete lesson
              const firstIncompleteLesson = Object.values(
                sampleCourses,
              )
                .flat()
                .find((course) =>
                  course.lessons.some(
                    (lesson) => !lesson.completed,
                  ),
                );

              if (firstIncompleteLesson) {
                const lesson =
                  firstIncompleteLesson.lessons.find(
                    (l) => !l.completed,
                  );
                if (lesson) {
                  navigateToScreen("lesson", {
                    selectedSubject:
                      firstIncompleteLesson.subject,
                    selectedCourse: firstIncompleteLesson,
                    selectedLesson: lesson,
                  });
                }
              }
            }}
          />
        );
      case "lesson":
        return (
          <LessonScreen
            language={appState.language}
            subject={appState.selectedSubject}
            course={appState.selectedCourse}
            currentLesson={appState.selectedLesson}
            userProfile={appState.userProfile}
            sidebarVisible={appState.sidebarVisible}
            onBack={() => navigateToScreen("dashboard")}
            onLessonSelect={selectLesson}
            onToggleSidebar={toggleSidebar}
            onLessonComplete={completeLesson}
          />
        );
      case "upload":
        return (
          <TeacherUpload
            language={appState.language}
            onBack={() => navigateToScreen("dashboard")}
          />
        );
      case "parent":
        return (
          <ParentView
            language={appState.language}
            onBack={() => navigateToScreen("dashboard")}
          />
        );
      default:
        return (
          <StudentDashboard
            language={appState.language}
            userProfile={appState.userProfile}
            courses={sampleCourses}
            onSubjectSelect={selectSubjectAndCourse}
            onContinueAdventure={() =>
              navigateToScreen("dashboard")
            }
          />
        );
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-sky-200 via-yellow-100 to-green-200 ${appState.language === "ar" ? "rtl" : "ltr"}`}
    >
      {appState.isOffline && (
        <OfflineIndicator language={appState.language} />
      )}

      <ConnectionStatus language={appState.language} />

      <main className="pb-20">{renderCurrentScreen()}</main>

      {!["splash", "onboarding", "login"].includes(
        appState.currentScreen,
      ) && (
        <Navigation
          currentScreen={appState.currentScreen}
          language={appState.language}
          userType={appState.userType}
          userProfile={appState.userProfile}
          onNavigate={navigateToScreen}
        />
      )}

      <AIVoiceAssistant
        language={appState.language}
        isVisible={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        currentContext={{
          lesson: appState.selectedLesson?.title,
          subject: appState.selectedSubject,
          userLevel: appState.userProfile?.level,
        }}
      />
    </div>
  );
}