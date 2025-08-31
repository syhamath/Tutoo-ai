import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, X, Send } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import OwlIcon from './OwlIcon';
import { Language, AIQuery, AIResponse } from '../types/app';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';  // ← change this line

interface AIVoiceAssistantProps {
  language: Language;
  isVisible: boolean;
  onClose: () => void;
  currentContext?: {
    lesson?: string;
    subject?: string;
    userLevel?: number;
  };
}

export default function AIVoiceAssistant({
  language,
  isVisible,
  onClose,
  currentContext,
}: AIVoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{
    type: 'user' | 'ai';
    message: string;
    timestamp: Date;
  }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const recognition = useRef<SpeechRecognition | null>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);

  const isRTL = language === 'ar';

  // Text content for bilingual support
  const text = {
    fr: {
      title: 'Assistant IA Tutoo',
      subtitle: 'Pose-moi tes questions sur tes leçons!',
      listening: 'Je t\'écoute...',
      processing: 'Je réfléchis...',
      speaking: 'Je réponds...',
      tapToSpeak: 'Appuie pour parler',
      typeQuestion: 'Tape ta question ici...',
      send: 'Envoyer',
      exampleQuestions: [
        'Comment résoudre cette fraction?',
        'Explique-moi cette règle de grammaire',
        'Qu\'est-ce que la photosynthèse?',
        'Comment mémoriser les tables de multiplication?'
      ],
      helpText: 'Tu peux parler ou écrire tes questions. Je suis là pour t\'aider!',
      noMicrophone: 'Microphone non disponible',
      errorMessage: 'Désolé, je n\'ai pas bien compris. Peux-tu répéter?',
    },
    ar: {
      title: 'مساعد توتو الذكي',
      subtitle: 'اسألني عن دروسك!',
      listening: 'أستمع إليك...',
      processing: 'أفكر...',
      speaking: 'أجيب...',
      tapToSpeak: 'اضغط للتحدث',
      typeQuestion: 'اكتب سؤالك هنا...',
      send: 'إرسال',
      exampleQuestions: [
        'كيف أحل هذا الكسر؟',
        'اشرح لي هذه القاعدة النحوية',
        'ما هي عملية التمثيل الضوئي؟',
        'كيف أحفظ جداول الضرب؟'
      ],
      helpText: 'يمكنك التحدث أو الكتابة. أنا هنا لمساعدتك!',
      noMicrophone: 'الميكروفون غير متاح',
      errorMessage: 'عذراً، لم أفهم جيداً. هل يمكنك الإعادة؟',
    }
  };

  const t = text[language];

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = false;
        recognition.current.interimResults = true;
        recognition.current.lang = language === 'fr' ? 'fr-FR' : 'ar-SA';
        
        recognition.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setCurrentQuestion(transcript);
        };

        recognition.current.onend = () => {
          setIsListening(false);
          if (currentQuestion.trim()) {
            handleSubmitQuestion();
          }
        };

        recognition.current.onerror = () => {
          setIsListening(false);
          addToChatHistory('ai', t.errorMessage);
        };
      }

      synthesis.current = window.speechSynthesis;
    }

    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
      if (synthesis.current) {
        synthesis.current.cancel();
      }
    };
  }, [language]);

  // Add greeting message when assistant opens
  useEffect(() => {
    if (isVisible && chatHistory.length === 0) {
      const greeting = language === 'fr' 
        ? "Salut! Je suis ton assistant Tutoo. Comment puis-je t'aider avec tes leçons aujourd'hui? 🦉"
        : "مرحباً! أنا مساعدك توتو. كيف يمكنني مساعدتك في دروسك اليوم؟ 🦉";
      
      addToChatHistory('ai', greeting);
      speakText(greeting);
    }
  }, [isVisible]);

  const addToChatHistory = (type: 'user' | 'ai', message: string) => {
    setChatHistory(prev => [...prev, {
      type,
      message,
      timestamp: new Date()
    }]);
  };

  const speakText = (text: string) => {
    if (synthesis.current) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'fr' ? 'fr-FR' : 'ar-SA';
      utterance.rate = 0.9;
      utterance.pitch = 1.1; // Slightly higher pitch for kid-friendly voice
      
      utterance.onend = () => setIsSpeaking(false);
      synthesis.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesis.current) {
      synthesis.current.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    if (recognition.current) {
      setIsListening(true);
      setCurrentQuestion('');
      recognition.current.start();
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  const generateAIResponse = async (question: string): Promise<AIResponse> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock AI responses based on question content and language
    const responses = {
      fr: {
        math: "Pour résoudre cette fraction, commence par identifier le numérateur et le dénominateur. Ensuite, regarde si tu peux simplifier en trouvant un facteur commun. Par exemple, 6/9 peut devenir 2/3 en divisant par 3! 🧮",
        french: "Pour la grammaire française, souviens-toi que les verbes s'accordent avec le sujet. Regarde bien qui fait l'action dans la phrase. C'est comme un puzzle - chaque pièce doit être à sa place! 📚",
        science: "La photosynthèse, c'est comme si les plantes mangeaient la lumière du soleil! Elles prennent la lumière, l'eau et le CO2 pour faire leur nourriture et nous donner de l'oxygène. C'est magique! 🌱",
        default: "C'est une excellente question! Pour mieux t'aider, peux-tu me donner plus de détails sur ce que tu étudies? Je suis là pour t'expliquer tout ce que tu veux savoir! 🦉"
      },
      ar: {
        math: "لحل هذا الكسر، ابدأ بتحديد البسط والمقام. ثم انظر إن كان يمكنك التبسيط بإيجاد عامل مشترك. مثلاً، ٦/٩ يمكن أن يصبح ٢/٣ بالقسمة على ٣! 🧮",
        french: "للقواعد النحوية الفرنسية، تذكر أن الأفعال تتوافق مع الفاعل. انظر جيداً من يقوم بالفعل في الجملة. إنه مثل اللغز - كل قطعة يجب أن تكون في مكانها! 📚",
        science: "التمثيل الضوئي، كأن النباتات تأكل ضوء الشمس! تأخذ الضوء والماء وثاني أكسيد الكربون لتصنع طعامها وتعطينا الأكسجين. إنه سحري! 🌱",
        default: "سؤال ممتاز! لمساعدتك بشكل أفضل، هل يمكنك إعطائي تفاصيل أكثر عما تدرسه؟ أنا هنا لأشرح لك كل ما تريد معرفته! 🦉"
      }
    };

    const langResponses = responses[language];
    const questionLower = question.toLowerCase();

    let response: string;
    if (questionLower.includes('fraction') || questionLower.includes('math') || questionLower.includes('كسر') || questionLower.includes('رياضيات')) {
      response = langResponses.math;
    } else if (questionLower.includes('grammaire') || questionLower.includes('français') || questionLower.includes('نحو') || questionLower.includes('فرنسية')) {
      response = langResponses.french;
    } else if (questionLower.includes('photosynthèse') || questionLower.includes('science') || questionLower.includes('تمثيل ضوئي') || questionLower.includes('علوم')) {
      response = langResponses.science;
    } else {
      response = langResponses.default;
    }

    return {
      message: response,
      suggestions: [
        language === 'fr' ? 'Veux-tu que je te donne un exemple?' : 'هل تريد أن أعطيك مثالاً؟',
        language === 'fr' ? 'As-tu d\'autres questions?' : 'هل لديك أسئلة أخرى؟',
        language === 'fr' ? 'Veux-tu voir une leçon sur ce sujet?' : 'هل تريد أن ترى درساً في هذا الموضوع؟'
      ],
      relatedLessons: ['math-fractions', 'french-grammar'],
      confidence: 0.85
    };
  };

  const handleSubmitQuestion = async () => {
    if (!currentQuestion.trim()) return;

    setIsProcessing(true);
    addToChatHistory('user', currentQuestion);

    try {
      const response = await generateAIResponse(currentQuestion);
      addToChatHistory('ai', response.message);
      speakText(response.message);
    } catch (error) {
      addToChatHistory('ai', t.errorMessage);
    } finally {
      setIsProcessing(false);
      setCurrentQuestion('');
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`w-full max-w-md h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col ${isRTL ? 'rtl' : 'ltr'}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-murshidi-sky-blue to-murshidi-purple text-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <motion.div
                animate={isProcessing ? { rotate: 360 } : {}}
                transition={{ duration: 2, repeat: isProcessing ? Infinity : 0 }}
              >
                <OwlIcon size={40} className="text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold">{t.title}</h3>
                <p className="text-sm opacity-90">{t.subtitle}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Status Display */}
          {(isListening || isProcessing || isSpeaking) && (
            <div className="p-3 bg-gradient-to-r from-murshidi-light-blue to-murshidi-light-purple">
              <div className="flex items-center justify-center gap-2">
                {isListening && (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-3 h-3 bg-red-500 rounded-full"
                    />
                    <span className="text-sm font-medium">{t.listening}</span>
                  </>
                )}
                {isProcessing && (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-4 h-4 border-2 border-murshidi-sky-blue border-t-transparent rounded-full"
                    />
                    <span className="text-sm font-medium">{t.processing}</span>
                  </>
                )}
                {isSpeaking && (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Volume2 className="w-4 h-4 text-green-500" />
                    </motion.div>
                    <span className="text-sm font-medium">{t.speaking}</span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Chat History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatHistory.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">{t.helpText}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Exemples de questions:</p>
                  {t.exampleQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-auto p-2 mx-1"
                      onClick={() => {
                        setCurrentQuestion(question);
                        handleSubmitQuestion();
                      }}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {chatHistory.map((chat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    chat.type === 'user'
                      ? 'bg-murshidi-sky-blue text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{chat.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              {/* Voice Input Button */}
              <Button
                variant={isListening ? "destructive" : "default"}
                size="sm"
                onClick={isListening ? stopListening : startListening}
                disabled={!recognition.current || isProcessing}
                className="flex-shrink-0"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>

              {/* Speaker Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={isSpeaking ? stopSpeaking : () => {}}
                disabled={!synthesis.current}
                className="flex-shrink-0"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>

              {/* Text Input */}
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmitQuestion()}
                  placeholder={t.typeQuestion}
                  className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-murshidi-sky-blue"
                  disabled={isProcessing}
                />
                <Button
                  size="sm"
                  onClick={handleSubmitQuestion}
                  disabled={!currentQuestion.trim() || isProcessing}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {!recognition.current && (
              <p className="text-xs text-orange-600 mt-2">{t.noMicrophone}</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
