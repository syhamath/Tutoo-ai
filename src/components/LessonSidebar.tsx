import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Clock, 
  FileQuestion, 
  BookOpen,
  X
} from 'lucide-react';
import type { Language, Course, Lesson } from '../App';

interface LessonSidebarProps {
  language: Language;
  course?: Course;
  currentLesson?: Lesson;
  onLessonSelect: (lesson: Lesson) => void;
  isOpen: boolean;
  onToggle: () => void;
  sidebarVisible: boolean;
}

const translations = {
  fr: {
    course: 'Cours',
    lessons: 'Leçons',
    progress: 'Progrès',
    completed: 'Terminé',
    inProgress: 'En cours',
    notStarted: 'Pas commencé',
    video: 'Vidéo',
    quiz: 'Quiz',
    exercise: 'Exercice',
    duration: 'Durée',
    closeSidebar: 'Fermer le menu'
  },
  ar: {
    course: 'الدورة',
    lessons: 'الدروس',
    progress: 'التقدم',
    completed: 'مكتمل',
    inProgress: 'جاري',
    notStarted: 'لم يبدأ',
    video: 'فيديو',
    quiz: 'اختبار',
    exercise: 'تمرين',
    duration: 'المدة',
    closeSidebar: 'إغلاق القائمة'
  }
};

const getLessonIcon = (type: string) => {
  switch (type) {
    case 'video':
      return Play;
    case 'quiz':
      return FileQuestion;
    case 'exercise':
      return BookOpen;
    default:
      return Play;
  }
};

const getLessonStatus = (lesson: Lesson, t: any) => {
  if (lesson.completed) {
    return { status: t.completed, color: 'text-murshidi-green', bgColor: 'bg-murshidi-light-green' };
  } else if (lesson.progress > 0) {
    return { status: t.inProgress, color: 'text-murshidi-yellow', bgColor: 'bg-murshidi-light-yellow' };
  } else {
    return { status: t.notStarted, color: 'text-gray-500', bgColor: 'bg-gray-100' };
  }
};

export default function LessonSidebar({ 
  language, 
  course, 
  currentLesson, 
  onLessonSelect, 
  isOpen, 
  onToggle,
  sidebarVisible
}: LessonSidebarProps) {
  const t = translations[language];

  if (!course || !sidebarVisible) return null;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-full 
        w-80 bg-white shadow-xl z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : (language === 'ar' ? 'translate-x-full' : '-translate-x-full')}
        lg:relative lg:translate-x-0 lg:z-auto lg:shadow-card
      `}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800">{t.course}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="lg:hidden rounded-full w-8 h-8 p-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <h3 className="font-medium text-murshidi-sky-blue mb-2">{course.title}</h3>
            
            {/* Course Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t.progress}</span>
                <span className="font-medium">{course.totalProgress}%</span>
              </div>
              <Progress value={course.totalProgress} className="h-2" />
            </div>
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                {t.lessons} ({course.lessons.length})
              </h4>
              
              <div className="space-y-2">
                {course.lessons.map((lesson, index) => {
                  const Icon = getLessonIcon(lesson.type);
                  const status = getLessonStatus(lesson, t);
                  const isActive = currentLesson?.id === lesson.id;
                  
                  return (
                    <Card
                      key={lesson.id}
                      className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                        isActive 
                          ? 'ring-2 ring-murshidi-sky-blue bg-murshidi-light-blue' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => onLessonSelect(lesson)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Lesson Number & Icon */}
                        <div className="flex flex-col items-center gap-1">
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
                            ${lesson.completed 
                              ? 'bg-murshidi-green text-white' 
                              : lesson.progress > 0 
                                ? 'bg-murshidi-yellow text-white'
                                : 'bg-gray-200 text-gray-600'
                            }
                          `}>
                            {lesson.completed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          
                          {/* Connection line to next lesson */}
                          {index < course.lessons.length - 1 && (
                            <div className="w-0.5 h-4 bg-gray-200"></div>
                          )}
                        </div>

                        {/* Lesson Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <span className="text-xs text-gray-500 uppercase tracking-wide">
                              {t[lesson.type as keyof typeof t] as string}
                            </span>
                          </div>
                          
                          <h5 className="font-medium text-gray-800 mb-1 leading-tight">
                            {lesson.title}
                          </h5>
                          
                          <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                            {lesson.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{lesson.duration}</span>
                            </div>
                            
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${status.bgColor} ${status.color} border-0`}
                            >
                              {status.status}
                            </Badge>
                          </div>
                          
                          {/* Progress bar for in-progress lessons */}
                          {lesson.progress > 0 && !lesson.completed && (
                            <div className="mt-2">
                              <Progress value={lesson.progress} className="h-1" />
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}