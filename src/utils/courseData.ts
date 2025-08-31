import { Course, Lesson } from '../types/app';

// Enhanced course data for Mauritanian curriculum
export const mauritanianCourses: Record<string, Course[]> = {
  math: [
    {
      id: "arithmetic-basics",
      subject: "math",
      title: "Arithmétique de Base",
      icon: "🧮",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      unlocked: true,
      totalProgress: 45,
      estimatedTime: "2 semaines",
      difficulty: "easy",
      description: "Maîtrise les opérations de base avec des nombres entiers",
      ageGroup: "8-12 ans",
      lessons: [
        {
          id: "addition-basics",
          title: "Addition Magique",
          duration: "8:00",
          completed: true,
          progress: 100,
          type: "video",
          description: "Apprends à additionner comme un champion!",
          xpReward: 50,
          stars: 3,
          difficulty: "easy",
          aiHints: [
            "Commence par les unités, puis les dizaines",
            "Utilise tes doigts si nécessaire",
            "Vérifie ton résultat en comptant"
          ]
        },
        {
          id: "subtraction-fun",
          title: "Soustraction Amusante",
          duration: "7:30",
          completed: true,
          progress: 100,
          type: "video",
          description: "La soustraction n'a jamais été aussi simple!",
          xpReward: 50,
          stars: 2,
          difficulty: "easy",
          prerequisites: ["addition-basics"]
        },
        {
          id: "multiplication-intro",
          title: "Tables de Multiplication",
          duration: "10:00",
          completed: false,
          progress: 30,
          type: "interactive",
          description: "Découvre le secret des tables de multiplication",
          xpReward: 75,
          stars: 0,
          difficulty: "medium",
          prerequisites: ["addition-basics", "subtraction-fun"]
        },
        {
          id: "division-basics",
          title: "Division Équitable",
          duration: "9:15",
          completed: false,
          progress: 0,
          type: "video",
          description: "Partage équitablement avec la division",
          xpReward: 75,
          stars: 0,
          difficulty: "medium"
        },
        {
          id: "arithmetic-quiz",
          title: "Quiz des Champions",
          duration: "15:00",
          completed: false,
          progress: 0,
          type: "quiz",
          description: "Teste toutes tes connaissances arithmétiques!",
          xpReward: 100,
          stars: 0,
          difficulty: "medium"
        }
      ]
    },
    {
      id: "fractions-course",
      subject: "math",
      title: "Monde des Fractions",
      icon: "🥧",
      color: "bg-gradient-to-br from-orange-400 to-red-500",
      unlocked: false,
      totalProgress: 0,
      estimatedTime: "3 semaines",
      difficulty: "medium",
      description: "Comprends les fractions avec des exemples concrets",
      ageGroup: "10-14 ans",
      lessons: [
        {
          id: "fraction-intro",
          title: "Qu'est-ce qu'une Fraction?",
          duration: "6:45",
          completed: false,
          progress: 0,
          type: "video",
          description: "Découvre ce que sont les fractions dans la vie réelle",
          xpReward: 60,
          stars: 0,
          difficulty: "easy"
        }
      ]
    }
  ],
  
  french: [
    {
      id: "reading-fundamentals",
      subject: "french",
      title: "Lecture Fondamentale",
      icon: "📖",
      color: "bg-gradient-to-br from-green-400 to-blue-500",
      unlocked: true,
      totalProgress: 65,
      estimatedTime: "4 semaines",
      difficulty: "easy",
      description: "Développe tes compétences de lecture en français",
      ageGroup: "6-10 ans",
      lessons: [
        {
          id: "alphabet-sounds",
          title: "Sons de l'Alphabet",
          duration: "12:00",
          completed: true,
          progress: 100,
          type: "interactive",
          description: "Apprends les sons de chaque lettre",
          xpReward: 40,
          stars: 3,
          difficulty: "easy"
        },
        {
          id: "simple-words",
          title: "Mes Premiers Mots",
          duration: "8:30",
          completed: true,
          progress: 100,
          type: "video",
          description: "Lis tes premiers mots en français",
          xpReward: 50,
          stars: 3,
          difficulty: "easy"
        },
        {
          id: "sentence-reading",
          title: "Lire des Phrases",
          duration: "10:00",
          completed: false,
          progress: 60,
          type: "video",
          description: "Combine des mots pour faire des phrases",
          xpReward: 60,
          stars: 0,
          difficulty: "medium"
        }
      ]
    },
    {
      id: "grammar-basics",
      subject: "french",
      title: "Grammaire Amusante",
      icon: "✏️",
      color: "bg-gradient-to-br from-pink-400 to-purple-500",
      unlocked: true,
      totalProgress: 25,
      estimatedTime: "6 semaines",
      difficulty: "medium",
      description: "Maîtrise les règles de grammaire française",
      ageGroup: "8-12 ans",
      lessons: [
        {
          id: "nouns-intro",
          title: "Les Noms Autour de Nous",
          duration: "7:00",
          completed: true,
          progress: 100,
          type: "video",
          description: "Identifie les noms dans ton environnement",
          xpReward: 45,
          stars: 2,
          difficulty: "easy"
        }
      ]
    }
  ],

  science: [
    {
      id: "nature-discovery",
      subject: "science",
      title: "Découverte de la Nature",
      icon: "🌱",
      color: "bg-gradient-to-br from-green-500 to-teal-600",
      unlocked: true,
      totalProgress: 30,
      estimatedTime: "5 semaines",
      difficulty: "easy",
      description: "Explore le monde naturel qui t'entoure",
      ageGroup: "6-10 ans",
      lessons: [
        {
          id: "plants-life",
          title: "La Vie des Plantes",
          duration: "9:00",
          completed: true,
          progress: 100,
          type: "video",
          description: "Comment les plantes grandissent et vivent",
          xpReward: 55,
          stars: 3,
          difficulty: "easy"
        },
        {
          id: "animal-habitats",
          title: "Maisons des Animaux",
          duration: "8:45",
          completed: false,
          progress: 0,
          type: "interactive",
          description: "Découvre où vivent les différents animaux",
          xpReward: 60,
          stars: 0,
          difficulty: "easy"
        }
      ]
    },
    {
      id: "physics-intro",
      subject: "science",
      title: "Physique pour Débutants",
      icon: "⚛️",
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
      unlocked: false,
      totalProgress: 0,
      estimatedTime: "8 semaines",
      difficulty: "hard",
      description: "Introduction aux concepts physiques de base",
      ageGroup: "12-16 ans",
      lessons: [
        {
          id: "gravity-intro",
          title: "Qu'est-ce que la Gravité?",
          duration: "11:00",
          completed: false,
          progress: 0,
          type: "video",
          description: "Comprends pourquoi les objets tombent",
          xpReward: 80,
          stars: 0,
          difficulty: "medium"
        }
      ]
    }
  ],

  history: [
    {
      id: "mauritania-history",
      subject: "history",
      title: "Histoire de la Mauritanie",
      icon: "🏛️",
      color: "bg-gradient-to-br from-yellow-500 to-orange-600",
      unlocked: true,
      totalProgress: 20,
      estimatedTime: "6 semaines",
      difficulty: "medium",
      description: "Découvre la riche histoire de ton pays",
      ageGroup: "10-16 ans",
      lessons: [
        {
          id: "ancient-mauritania",
          title: "Mauritanie Ancienne",
          duration: "13:00",
          completed: false,
          progress: 20,
          type: "video",
          description: "Les premiers habitants de la Mauritanie",
          xpReward: 70,
          stars: 0,
          difficulty: "medium"
        },
        {
          id: "independence-day",
          title: "Jour de l'Indépendance",
          duration: "10:30",
          completed: false,
          progress: 0,
          type: "video",
          description: "Comment la Mauritanie est devenue indépendante",
          xpReward: 65,
          stars: 0,
          difficulty: "medium"
        }
      ]
    }
  ],

  geography: [
    {
      id: "mauritania-geography",
      subject: "geography",
      title: "Géographie Mauritanienne",
      icon: "🗺️",
      color: "bg-gradient-to-br from-teal-500 to-cyan-600",
      unlocked: true,
      totalProgress: 40,
      estimatedTime: "4 semaines",
      difficulty: "easy",
      description: "Explore les régions et villes de Mauritanie",
      ageGroup: "8-14 ans",
      lessons: [
        {
          id: "mauritania-regions",
          title: "Les Régions de Mauritanie",
          duration: "11:30",
          completed: true,
          progress: 100,
          type: "interactive",
          description: "Découvre les 15 régions du pays",
          xpReward: 60,
          stars: 2,
          difficulty: "easy"
        },
        {
          id: "capital-cities",
          title: "Nouakchott et les Grandes Villes",
          duration: "9:00",
          completed: false,
          progress: 50,
          type: "video",
          description: "Visite virtuelle des principales villes",
          xpReward: 55,
          stars: 0,
          difficulty: "easy"
        }
      ]
    },
    {
      id: "world-geography",
      subject: "geography",
      title: "Géographie Mondiale",
      icon: "🌍",
      color: "bg-gradient-to-br from-indigo-500 to-purple-600",
      unlocked: false,
      totalProgress: 0,
      estimatedTime: "10 semaines",
      difficulty: "medium",
      description: "Explore les continents et océans du monde",
      ageGroup: "10-16 ans",
      lessons: [
        {
          id: "continents-intro",
          title: "Les Cinq Continents",
          duration: "12:00",
          completed: false,
          progress: 0,
          type: "video",
          description: "Tour du monde des continents",
          xpReward: 75,
          stars: 0,
          difficulty: "medium"
        }
      ]
    }
  ]
};

// Function to get courses by subject with progress tracking
export function getCoursesBySubject(subject: string): Course[] {
  return mauritanianCourses[subject] || [];
}

// Function to get all available subjects
export function getAllSubjects(): string[] {
  return Object.keys(mauritanianCourses);
}

// Function to get next recommended lesson based on user progress
export function getRecommendedLesson(userLevel: number, completedLessons: string[]): Lesson | null {
  const allCourses = Object.values(mauritanianCourses).flat();
  
  for (const course of allCourses) {
    if (!course.unlocked) continue;
    
    for (const lesson of course.lessons) {
      if (completedLessons.includes(lesson.id)) continue;
      
      // Check prerequisites
      if (lesson.prerequisites) {
        const hasPrerequisites = lesson.prerequisites.every(prereq => 
          completedLessons.includes(prereq)
        );
        if (!hasPrerequisites) continue;
      }
      
      // Check difficulty vs user level
      const difficultyLevel = { easy: 1, medium: 3, hard: 5 }[lesson.difficulty || 'easy'];
      if (difficultyLevel > userLevel + 2) continue;
      
      return lesson;
    }
  }
  
  return null;
}

// Function to calculate total progress across all courses
export function calculateTotalProgress(completedLessons: string[]): number {
  const allCourses = Object.values(mauritanianCourses).flat();
  const totalLessons = allCourses.reduce((sum, course) => sum + course.lessons.length, 0);
  const completedCount = completedLessons.length;
  
  return totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
}