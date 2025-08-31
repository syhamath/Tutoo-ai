import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  Edit3, 
  Save, 
  Languages, 
  Plus, 
  Trash2, 
  Copy,
  BookOpen,
  Lightbulb,
  MessageSquare,
  CheckCircle
} from 'lucide-react';
import OwlIcon from './OwlIcon';
import type { Language } from '../App';

interface TutorAIAssistantProps {
  language: Language;
  onBack: () => void;
}

interface AIQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'long-answer';
  options?: string[];
  correctAnswer?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

const translations = {
  fr: {
    title: 'Assistant IA Tutoo',
    subtitle: 'Génère des questions personnalisées pour tes leçons',
    topicLabel: 'Sujet de la leçon',
    topicPlaceholder: 'Ex: Les fractions, la conjugaison, le système solaire...',
    generateQuestions: 'Générer des Questions',
    generatedQuestions: 'Questions Générées',
    editQuestion: 'Modifier la question',
    saveQuestion: 'Sauvegarder',
    translateQuestion: 'Traduire',
    addToLesson: 'Ajouter à la Leçon',
    deleteQuestion: 'Supprimer',
    copyQuestion: 'Copier',
    questionType: 'Type de question',
    difficulty: 'Difficulté',
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
    multipleChoice: 'Choix multiple',
    trueFalse: 'Vrai/Faux',
    shortAnswer: 'Réponse courte',
    longAnswer: 'Réponse longue',
    generating: 'Génération en cours...',
    noQuestions: 'Aucune question générée pour le moment',
    startGenerating: 'Commence par entrer un sujet et clique sur "Générer des Questions"',
    aiTip: 'L\'IA peut créer des questions adaptées au niveau CE2-Terminale',
    correctAnswer: 'Réponse correcte',
    options: 'Options de réponse',
    addOption: 'Ajouter une option',
    questionSaved: 'Question sauvegardée!',
    questionTranslated: 'Question traduite!',
    questionAddedToLesson: 'Question ajoutée à la leçon!',
    questionCopied: 'Question copiée!',
    enterTopic: 'Veuillez entrer un sujet'
  },
  ar: {
    title: 'مساعد توتو الذكي',
    subtitle: 'أنشئ أسئلة مخصصة لدروسك',
    topicLabel: 'موضوع الدرس',
    topicPlaceholder: 'مثال: الكسور، التصريف، النظام الشمسي...',
    generateQuestions: 'إنشاء الأسئلة',
    generatedQuestions: 'الأسئلة المُنشأة',
    editQuestion: 'تعديل السؤال',
    saveQuestion: 'حفظ',
    translateQuestion: 'ترجمة',
    addToLesson: 'إضافة للدرس',
    deleteQuestion: 'حذف',
    copyQuestion: 'نسخ',
    questionType: 'نوع السؤال',
    difficulty: 'المستوى',
    easy: 'سهل',
    medium: 'متوسط',
    hard: 'صعب',
    multipleChoice: 'اختيار متعدد',
    trueFalse: 'صحيح/خطأ',
    shortAnswer: 'إجابة قصيرة',
    longAnswer: 'إجابة طويلة',
    generating: 'جاري الإنشاء...',
    noQuestions: 'لا توجد أسئلة منشأة حتى الآن',
    startGenerating: 'ابدأ بإدخال موضوع واضغط على "إنشاء الأسئلة"',
    aiTip: 'يمكن للذكاء الاصطناعي إنشاء أسئلة مناسبة للمستوى CE2-الثانوية',
    correctAnswer: 'الإجابة الصحيحة',
    options: 'خيارات الإجابة',
    addOption: 'إضافة خيار',
    questionSaved: 'تم حفظ السؤال!',
    questionTranslated: 'تمت ترجمة السؤال!',
    questionAddedToLesson: 'تمت إضافة السؤال للدرس!',
    questionCopied: 'تم نسخ السؤال!',
    enterTopic: 'يرجى إدخال موضوع'
  }
};

const sampleQuestions: AIQuestion[] = [
  {
    id: '1',
    question: 'Quelle est la valeur de 3/4 + 1/4 ?',
    type: 'multiple-choice',
    options: ['4/8', '1', '4/4', '3/8'],
    correctAnswer: '1',
    difficulty: 'easy',
    topic: 'fractions'
  },
  {
    id: '2',
    question: 'Une fraction représente une partie d\'un tout.',
    type: 'true-false',
    correctAnswer: 'true',
    difficulty: 'easy',
    topic: 'fractions'
  },
  {
    id: '3',
    question: 'Comment appelle-t-on le nombre du haut dans une fraction ?',
    type: 'short-answer',
    correctAnswer: 'numérateur',
    difficulty: 'medium',
    topic: 'fractions'
  }
];

export default function TutorAIAssistant({ language, onBack }: TutorAIAssistantProps) {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<AIQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const t = translations[language];

  const generateQuestions = async () => {
    if (!topic.trim()) {
      setNotification(t.enterTopic);
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const generatedQuestions = sampleQuestions.map(q => ({
        ...q,
        topic: topic.trim(),
        id: Date.now().toString() + Math.random()
      }));
      
      setQuestions(generatedQuestions);
      setIsGenerating(false);
    }, 2000);
  };

  const handleEditQuestion = (questionId: string) => {
    setEditingQuestion(editingQuestion === questionId ? null : questionId);
  };

  const handleSaveQuestion = (questionId: string) => {
    setEditingQuestion(null);
    showNotification(t.questionSaved);
  };

  const handleTranslateQuestion = (questionId: string) => {
    // Simulate translation
    showNotification(t.questionTranslated);
  };

  const handleAddToLesson = (questionId: string) => {
    showNotification(t.questionAddedToLesson);
  };

  const handleCopyQuestion = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      navigator.clipboard.writeText(question.question);
      showNotification(t.questionCopied);
    }
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'multiple-choice': return '📝';
      case 'true-false': return '✅';
      case 'short-answer': return '💭';  
      case 'long-answer': return '📄';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-yellow-100 to-green-200">
      {/* Header */}
      <div className="p-4 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="rounded-full w-10 h-10 p-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <OwlIcon size={24} />
              </div>
              {t.title}
            </h1>
            <p className="text-gray-600 text-sm">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Topic Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 rounded-3xl shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-murshidi-purple to-murshidi-sky-blue rounded-2xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{t.topicLabel}</h3>
                <p className="text-sm text-gray-600">{t.aiTip}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t.topicPlaceholder}
                className="text-lg p-4 rounded-2xl border-2 focus:border-murshidi-purple"
              />
              
              <Button
                onClick={generateQuestions}
                disabled={isGenerating || !topic.trim()}
                className="w-full h-12 rounded-2xl text-lg font-bold text-white shadow-lg transform transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                style={{ 
                  background: topic.trim() && !isGenerating
                    ? 'linear-gradient(135deg, var(--murshidi-purple), var(--murshidi-sky-blue))'
                    : 'gray'
                }}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    {t.generating}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-3" />
                    {t.generateQuestions}
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Generated Questions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 rounded-3xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-murshidi-sky-blue" />
              {t.generatedQuestions}
            </h3>

            {questions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <OwlIcon size={48} />
                </div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">{t.noQuestions}</h4>
                <p className="text-gray-500">{t.startGenerating}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 rounded-2xl border-2 hover:border-murshidi-sky-blue transition-colors">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-2xl">{getTypeIcon(question.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className={getDifficultyColor(question.difficulty)}>
                              {t[question.difficulty as keyof typeof t]}
                            </Badge>
                            <Badge variant="outline">
                              {t[question.type.replace('-', '') as keyof typeof t] || question.type}
                            </Badge>
                          </div>
                          
                          {editingQuestion === question.id ? (
                            <div className="space-y-3">
                              <Textarea
                                defaultValue={question.question}
                                className="min-h-[80px] rounded-xl"
                                placeholder="Modifiez la question..."
                              />
                              
                              {question.type === 'multiple-choice' && question.options && (
                                <div className="space-y-2">
                                  <label className="text-sm font-medium text-gray-700">{t.options}</label>
                                  {question.options.map((option, optionIndex) => (
                                    <Input
                                      key={optionIndex}
                                      defaultValue={option}
                                      className="rounded-xl"
                                      placeholder={`Option ${optionIndex + 1}`}
                                    />
                                  ))}
                                  <Button variant="outline" size="sm" className="rounded-xl">
                                    <Plus className="w-4 h-4 mr-2" />
                                    {t.addOption}
                                  </Button>
                                </div>
                              )}
                              
                              {question.correctAnswer && (
                                <div className="space-y-1">
                                  <label className="text-sm font-medium text-gray-700">{t.correctAnswer}</label>
                                  <Input
                                    defaultValue={question.correctAnswer}
                                    className="rounded-xl"
                                    placeholder="Réponse correcte"
                                  />
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <p className="text-gray-800 font-medium mb-2">{question.question}</p>
                              
                              {question.type === 'multiple-choice' && question.options && (
                                <div className="space-y-1 ml-4">
                                  {question.options.map((option, optionIndex) => (
                                    <div 
                                      key={optionIndex}
                                      className={`text-sm p-2 rounded-lg ${
                                        option === question.correctAnswer
                                          ? 'bg-green-100 text-green-700 font-medium'
                                          : 'bg-gray-50 text-gray-600'
                                      }`}
                                    >
                                      {String.fromCharCode(65 + optionIndex)}. {option}
                                      {option === question.correctAnswer && (
                                        <CheckCircle className="w-4 h-4 inline ml-2" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {question.correctAnswer && question.type !== 'multiple-choice' && (
                                <div className="mt-2 p-2 bg-green-100 text-green-700 rounded-lg text-sm">
                                  <strong>{t.correctAnswer}:</strong> {question.correctAnswer}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => 
                            editingQuestion === question.id 
                              ? handleSaveQuestion(question.id)
                              : handleEditQuestion(question.id)
                          }
                          className="rounded-xl"
                        >
                          {editingQuestion === question.id ? (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              {t.saveQuestion}
                            </>
                          ) : (
                            <>
                              <Edit3 className="w-4 h-4 mr-2" />
                              {t.editQuestion}
                            </>
                          )}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTranslateQuestion(question.id)}
                          className="rounded-xl"
                        >
                          <Languages className="w-4 h-4 mr-2" />
                          {t.translateQuestion}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyQuestion(question.id)}
                          className="rounded-xl"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          {t.copyQuestion}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAddToLesson(question.id)}
                          className="rounded-xl text-murshidi-green hover:bg-murshidi-light-green"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          {t.addToLesson}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="rounded-xl text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 left-4 right-4 z-50"
        >
          <Card className="p-4 bg-murshidi-green text-white rounded-2xl shadow-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">{notification}</span>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}