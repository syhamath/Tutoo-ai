import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Upload, Plus, Trash2, CheckCircle } from 'lucide-react';
import type { Language } from '../App';

interface TeacherUploadProps {
  language: Language;
  onBack: () => void;
}

const translations = {
  fr: {
    newLesson: 'Nouvelle Leçon',
    lessonTitle: 'Titre de la leçon',
    subject: 'Matière',
    grade: 'Niveau',
    selectSubject: 'Sélectionner une matière',
    selectGrade: 'Sélectionner un niveau',
    math: 'Mathématiques',
    french: 'Français',
    geography: 'Histoire & Géographie',
    science: 'Sciences',
    physics: 'Physique',
    chemistry: 'Chimie',
    arabic: 'Arabe',
    english: 'Anglais',
    uploadVideo: 'Télécharger la vidéo',
    chooseFile: 'Choisir un fichier',
    notes: 'Notes explicatives',
    quiz: 'Questions du quiz',
    addQuestion: 'Ajouter une question',
    question: 'Question',
    correctAnswer: 'Réponse correcte',
    wrongAnswer: 'Réponse incorrecte',
    save: 'Sauvegarder la leçon',
    uploading: 'Téléchargement...',
    success: 'Leçon créée avec succès!',
    titlePlaceholder: 'Ex: Introduction aux fractions',
    notesPlaceholder: 'Ajoutez des explications détaillées...',
    questionPlaceholder: 'Tapez votre question ici...',
    answerPlaceholder: 'Réponse...'
  },
  ar: {
    newLesson: 'درس جديد',
    lessonTitle: 'عنوان الدرس',
    subject: 'المادة',
    grade: 'المستوى',
    selectSubject: 'اختر المادة',
    selectGrade: 'اختر المستوى',
    math: 'الرياضيات',
    french: 'الفرنسية',
    geography: 'التاريخ والجغرافيا',
    science: 'العلوم',
    physics: 'الفيزياء',
    chemistry: 'الكيمياء',
    arabic: 'اللغة العربية',
    english: 'الإنجليزية',
    uploadVideo: 'رفع الفيديو',
    chooseFile: 'اختر ملف',
    notes: 'ملاحظات توضيحية',
    quiz: 'أسئلة الاختبار',
    addQuestion: 'أضف سؤال',
    question: 'السؤال',
    correctAnswer: 'الإجابة الصحيحة',
    wrongAnswer: 'إجابة خاطئة',
    save: 'حفظ الدرس',
    uploading: 'جاري الرفع...',
    success: 'تم إنشاء الدرس بنجاح!',
    titlePlaceholder: 'مثال: مقدمة في الكسور',
    notesPlaceholder: 'أضف شروحات مفصلة...',
    questionPlaceholder: 'اكتب سؤالك هنا...',
    answerPlaceholder: 'الإجابة...'
  }
};

interface QuizQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
}

export default function TeacherUpload({ language, onBack }: TeacherUploadProps) {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    grade: '',
    video: null as File | null,
    notes: ''
  });
  
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const t = translations[language];

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      question: '',
      correctAnswer: '',
      wrongAnswers: ['', '']
    };
    setQuizQuestions([...quizQuestions, newQuestion]);
  };

  const updateQuestion = (id: string, field: string, value: string, index?: number) => {
    setQuizQuestions(prev => prev.map(q => {
      if (q.id === id) {
        if (field === 'wrongAnswers' && index !== undefined) {
          const newWrongAnswers = [...q.wrongAnswers];
          newWrongAnswers[index] = value;
          return { ...q, wrongAnswers: newWrongAnswers };
        }
        return { ...q, [field]: value };
      }
      return q;
    }));
  };

  const removeQuestion = (id: string) => {
    setQuizQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, video: file }));
    }
  };

  const handleSave = async () => {
    setIsUploading(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      onBack();
    }, 1500);
  };

  if (uploadSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-8 text-center rounded-card shadow-card">
          <CheckCircle className="w-16 h-16 text-murshidi-green mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-murshidi-green">{t.success}</h2>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-24">
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
        <h1 className="text-xl font-semibold">{t.newLesson}</h1>
      </div>

      {/* Basic Info */}
      <Card className="p-4 rounded-card shadow-card">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t.lessonTitle}</label>
            <Input
              placeholder={t.titlePlaceholder}
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t.subject}</label>
              <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder={t.selectSubject} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">{t.math}</SelectItem>
                  <SelectItem value="french">{t.french}</SelectItem>
                  <SelectItem value="geography">{t.geography}</SelectItem>
                  <SelectItem value="science">{t.science}</SelectItem>
                  <SelectItem value="physics">{t.physics}</SelectItem>
                  <SelectItem value="chemistry">{t.chemistry}</SelectItem>
                  <SelectItem value="arabic">{t.arabic}</SelectItem>
                  <SelectItem value="english">{t.english}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t.grade}</label>
              <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder={t.selectGrade} />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
                    <SelectItem key={grade} value={grade.toString()}>
                      {language === 'fr' ? `Niveau ${grade}` : `المستوى ${grade}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Video Upload */}
      <Card className="p-4 rounded-card shadow-card">
        <label className="block text-sm font-medium mb-3">{t.uploadVideo}</label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="cursor-pointer"
          >
            <Button variant="outline" className="rounded-xl">
              {t.chooseFile}
            </Button>
          </label>
          {formData.video && (
            <p className="mt-2 text-sm text-gray-600">{formData.video.name}</p>
          )}
        </div>
      </Card>

      {/* Notes */}
      <Card className="p-4 rounded-card shadow-card">
        <label className="block text-sm font-medium mb-3">{t.notes}</label>
        <Textarea
          placeholder={t.notesPlaceholder}
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          className="min-h-24 rounded-xl"
        />
      </Card>

      {/* Quiz Questions */}
      <Card className="p-4 rounded-card shadow-card">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium">{t.quiz}</label>
          <Button
            variant="outline"
            size="sm"
            onClick={addQuestion}
            className="rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.addQuestion}
          </Button>
        </div>

        <div className="space-y-4">
          {quizQuestions.map((question, index) => (
            <div key={question.id} className="border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">{t.question} {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeQuestion(question.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <Input
                  placeholder={t.questionPlaceholder}
                  value={question.question}
                  onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                  className="rounded-xl"
                />

                <div className="grid gap-2">
                  <div>
                    <label className="text-xs text-murshidi-green font-medium">{t.correctAnswer}</label>
                    <Input
                      placeholder={t.answerPlaceholder}
                      value={question.correctAnswer}
                      onChange={(e) => updateQuestion(question.id, 'correctAnswer', e.target.value)}
                      className="rounded-xl border-murshidi-green"
                    />
                  </div>

                  {question.wrongAnswers.map((answer, answerIndex) => (
                    <div key={answerIndex}>
                      <label className="text-xs text-gray-500 font-medium">{t.wrongAnswer} {answerIndex + 1}</label>
                      <Input
                        placeholder={t.answerPlaceholder}
                        value={answer}
                        onChange={(e) => updateQuestion(question.id, 'wrongAnswers', e.target.value, answerIndex)}
                        className="rounded-xl"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        disabled={isUploading || !formData.title || !formData.subject || !formData.grade}
        className="w-full h-14 rounded-xl"
        style={{ backgroundColor: 'var(--murshidi-yellow)', color: '#000' }}
      >
        {isUploading ? t.uploading : t.save}
      </Button>
    </div>
  );
}