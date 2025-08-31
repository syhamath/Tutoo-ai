import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ArrowLeft, Play, Pause, Mic, Send, CheckCircle, XCircle, ChevronLeft, ChevronRight, PanelLeft, PanelLeftClose } from 'lucide-react';
import LessonSidebar from './LessonSidebar';
import type { Language, Course, Lesson } from '../App';

interface LessonScreenProps {
  language: Language;
  subject?: string;
  course?: Course;
  currentLesson?: Lesson;
  sidebarVisible: boolean;
  onBack: () => void;
  onLessonSelect: (lesson: Lesson) => void;
  onToggleSidebar: () => void;
}

const translations = {
  fr: {
    math: 'Mathématiques',
    french: 'Français',
    geography: 'Histoire & Géographie',
    science: 'Sciences',
    physics: 'Physique',
    chemistry: 'Chimie',
    arabic: 'Arabe',
    english: 'Anglais',
    level5: 'Niveau 5',
    notes: 'Notes de cours',
    quiz: 'Quiz',
    askAI: 'Demander à l\'IA',
    askQuestion: 'Pose ta question...',
    send: 'Envoyer',
    nextLesson: 'Leçon suivante',
    previousLesson: 'Leçon précédente',
    completed: 'Terminé!',
    question: 'Question',
    of: 'sur',
    noteContent: 'Une fraction représente une partie d\'un tout. Le numérateur (en haut) indique combien de parties nous avons, et le dénominateur (en bas) indique en combien de parties le tout est divisé.',
    quizQuestion: 'Que représente le numérateur dans une fraction?',
    optionA: 'Le nombre total de parties',
    optionB: 'Le nombre de parties que nous avons',
    optionC: 'Le résultat de la division',
    correct: 'Correct!',
    incorrect: 'Incorrect. Essaie encore!',
    backToCourse: 'Retour au cours',
    showSidebar: 'Afficher le menu',
    hideSidebar: 'Masquer le menu'
  },
  ar: {
    math: 'الرياضيات',
    french: 'الفرنسية',
    geography: 'التاريخ والجغرافيا',
    science: 'العلوم',
    physics: 'الفيزياء',
    chemistry: 'الكيمياء',
    arabic: 'اللغة العربية',
    english: 'الإنجليزية',
    level5: 'المستوى 5',
    notes: 'ملاحظات الدرس',
    quiz: 'اختبار',
    askAI: 'اسأل الذكي الاصطناعي',
    askQuestion: 'اطرح سؤالك...',
    send: 'إرسال',
    nextLesson: 'الدرس التالي',
    previousLesson: 'الدرس السابق',
    completed: 'مكتمل!',
    question: 'سؤال',
    of: 'من',
    noteContent: 'الكسر يمثل جزءاً من الكل. البسط (في الأعلى) يوضح كم جزءاً لدينا، والمقام (في الأسفل) يوضح إلى كم جزءاً قُسم الكل.',
    quizQuestion: 'ماذا يمثل البسط في الكسر؟',
    optionA: 'العدد الكلي للأجزاء',
    optionB: 'عدد الأجزاء التي لدينا',
    optionC: 'نتيجة القسمة',
    correct: 'صحيح!',
    incorrect: 'خطأ. حاول مرة أخرى!',
    backToCourse: 'العودة للدورة',
    showSidebar: 'إظهار القائمة',
    hideSidebar: 'إخفاء القائمة'
  }
};

export default function LessonScreen({ 
  language, 
  subject = 'math', 
  course,
  currentLesson,
  sidebarVisible,
  onBack, 
  onLessonSelect,
  onToggleSidebar
}: LessonScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [showAiResponse, setShowAiResponse] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  const t = translations[language];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const handleAiQuestion = () => {
    if (aiQuestion.trim()) {
      setShowAiResponse(true);
    }
  };

  const getCurrentLessonIndex = () => {
    if (!course || !currentLesson) return -1;
    return course.lessons.findIndex(lesson => lesson.id === currentLesson.id);
  };

  const getNextLesson = () => {
    if (!course) return null;
    const currentIndex = getCurrentLessonIndex();
    return currentIndex >= 0 && currentIndex < course.lessons.length - 1 
      ? course.lessons[currentIndex + 1] 
      : null;
  };

  const getPreviousLesson = () => {
    if (!course) return null;
    const currentIndex = getCurrentLessonIndex();
    return currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  };

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Aucune leçon sélectionnée</h2>
          <Button onClick={onBack}>Retour au tableau de bord</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      {sidebarVisible && (
        <LessonSidebar
          language={language}
          course={course}
          currentLesson={currentLesson}
          onLessonSelect={onLessonSelect}
          isOpen={mobileSidebarOpen}
          onToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          sidebarVisible={sidebarVisible}
        />
      )}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarVisible ? 'lg:ml-0' : ''}`}>
        <div className="p-4 space-y-4 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="rounded-full w-10 h-10 p-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            {/* Sidebar Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="rounded-full w-10 h-10 p-0"
              title={sidebarVisible ? t.hideSidebar : t.showSidebar}
            >
              {sidebarVisible ? (
                <PanelLeftClose className="w-5 h-5" />
              ) : (
                <PanelLeft className="w-5 h-5" />
              )}
            </Button>

            {/* Mobile Menu Button (only shown when sidebar is visible) */}
            {sidebarVisible && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="lg:hidden rounded-full w-10 h-10 p-0"
                style={{ backgroundColor: 'var(--murshidi-light-blue)' }}
              >
                <PanelLeft className="w-5 h-5 text-murshidi-sky-blue" />
              </Button>
            )}

            <div className="flex-1">
              <h1 className="text-lg font-semibold">{course.title}</h1>
              <p className="text-sm text-gray-600">{currentLesson.title}</p>
            </div>
            <Badge variant="secondary" className="bg-murshidi-light-green text-murshidi-green">
              {currentLesson.progress}% {t.completed}
            </Badge>
          </div>

          {/* Progress Bar */}
          <Progress value={currentLesson.progress} className="h-2" />

          {/* Video Player */}
          {currentLesson.type === 'video' && (
            <Card className="p-4 rounded-card shadow-card">
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4 relative">
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full w-16 h-16 bg-white/20 hover:bg-white/30 border-0"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white" />
                  )}
                </Button>
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  3:24 / {currentLesson.duration}
                </div>
              </div>
              <h3 className="text-lg font-semibold">{currentLesson.title}</h3>
            </Card>
          )}

          {/* Notes */}
          <Card className="p-4 rounded-card shadow-card">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              📝 {t.notes}
            </h3>
            <p className="text-gray-700 leading-relaxed">{currentLesson.description}</p>
          </Card>

          {/* Quiz */}
          {currentLesson.type === 'quiz' && (
            <Card className="p-4 rounded-card shadow-card">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                🧠 {t.quiz}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{t.question} 1 {t.of} 3</p>
              <p className="font-medium mb-4">{t.quizQuestion}</p>
              
              <div className="space-y-3">
                {['A', 'B', 'C'].map((option, index) => {
                  const options = [t.optionA, t.optionB, t.optionC];
                  const isCorrect = option === 'B';
                  const isSelected = selectedAnswer === option;
                  
                  return (
                    <Button
                      key={option}
                      variant="outline"
                      className={`w-full text-left justify-start p-4 h-auto rounded-xl ${
                        isSelected
                          ? isCorrect
                            ? 'bg-murshidi-light-green border-murshidi-green'
                            : 'bg-red-50 border-red-300'
                          : ''
                      }`}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showResult}
                    >
                      <span className="font-semibold mr-3">{option}.</span>
                      {options[index]}
                      {showResult && isSelected && (
                        isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-murshidi-green ml-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                        )
                      )}
                    </Button>
                  );
                })}
              </div>

              {showResult && (
                <div className={`mt-4 p-3 rounded-lg ${
                  selectedAnswer === 'B' 
                    ? 'bg-murshidi-light-green text-murshidi-green' 
                    : 'bg-red-50 text-red-600'
                }`}>
                  {selectedAnswer === 'B' ? t.correct : t.incorrect}
                </div>
              )}
            </Card>
          )}

          {/* AI Assistant */}
          <Card className="p-4 rounded-card shadow-card">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              🤖 {t.askAI}
            </h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder={t.askQuestion}
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-murshidi-sky-blue"
              />
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full w-12 h-12 p-0 bg-murshidi-light-blue"
              >
                <Mic className="w-5 h-5 text-murshidi-sky-blue" />
              </Button>
              <Button
                onClick={handleAiQuestion}
                className="rounded-full w-12 h-12 p-0"
                style={{ backgroundColor: 'var(--murshidi-sky-blue)' }}
              >
                <Send className="w-5 h-5 text-white" />
              </Button>
            </div>

            {showAiResponse && (
              <div className="bg-murshidi-light-blue p-3 rounded-lg">
                <p className="text-sm">
                  {language === 'fr' 
                    ? "Je suis là pour t'aider! Les fractions sont comme des parts de pizza. Si tu as une pizza coupée en 4 parts et que tu en manges 2, tu as mangé 2/4 de la pizza. Le 2 est le numérateur (ce que tu as) et le 4 est le dénominateur (le total)."
                    : "أنا هنا لمساعدتك! الكسور مثل قطع البيتزا. إذا كان لديك بيتزا مقطعة إلى 4 قطع وأكلت 2 منها، فقد أكلت 2/4 من البيتزا. الرقم 2 هو البسط (ما لديك) والرقم 4 هو المقام (الإجمالي)."
                  }
                </p>
              </div>
            )}
          </Card>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {getPreviousLesson() && (
              <Button
                onClick={() => onLessonSelect(getPreviousLesson()!)}
                variant="outline"
                className="flex-1 h-14 rounded-xl flex items-center gap-2"
              >
                {language === 'ar' ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                {t.previousLesson}
              </Button>
            )}
            
            {getNextLesson() && (
              <Button
                onClick={() => onLessonSelect(getNextLesson()!)}
                className="flex-1 h-14 rounded-xl flex items-center gap-2"
                style={{ backgroundColor: 'var(--murshidi-yellow)', color: '#000' }}
              >
                {t.nextLesson}
                {language === 'ar' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}