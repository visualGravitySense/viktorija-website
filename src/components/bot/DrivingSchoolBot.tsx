import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, User, BarChart3, Heart, Star, Video, Calendar, CheckCircle, Plus, Minus, FileText, X } from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { BotService } from '../../services/botService';
import type { BotUser, Instructor, Review, Progress, Skill } from '../../types/bot';

const DrivingSchoolBot = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  // Определяем режим темы из Material-UI темы
  const isDarkMode = theme.palette.mode === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  // Все состояния должны быть объявлены первыми
  const [screen, setScreen] = useState('welcome');
  const [anxietyLevel, setAnxietyLevel] = useState(0);
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState<BotUser | null>(null);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmingInstructor, setConfirmingInstructor] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false); // Для System 2: детали прогресса
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<any[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewStudentName, setReviewStudentName] = useState('');
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportMessages, setSupportMessages] = useState<any[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingType, setBookingType] = useState<'theory' | 'driving'>('driving');
  const [bookingSuccess, setBookingSuccess] = useState<{
    instructorName: string;
    date: string;
    time: string;
    type: 'theory' | 'driving';
  } | null>(null);
  
  // Состояния для анимации счетчиков (социальное доказательство)
  const [studentsCount] = useState(500);
  const [passRate, setPassRate] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  
  // Автоматическое сохранение экрана в localStorage при изменении
  useEffect(() => {
    if (user && screen !== 'welcome') {
      localStorage.setItem('bot_screen', screen);
    }
  }, [screen, user]);
  
  // Функция для выхода (очистка данных)
  const handleLogout = () => {
    localStorage.removeItem('bot_user_id');
    localStorage.removeItem('bot_user_name');
    localStorage.removeItem('bot_anxiety_level');
    localStorage.removeItem('bot_screen');
    setUser(null);
    setUserName('');
    setAnxietyLevel(0);
    setScreen('welcome');
  };
  
  // Синхронизация класса dark с темой Material-UI
  useEffect(() => {
    const rootElement = document.documentElement;
    const container = containerRef.current;
    
    // Всегда удаляем класс сначала, чтобы избежать конфликтов
    rootElement.classList.remove('dark');
    if (container) {
      container.classList.remove('dark');
    }
    
    // Затем добавляем, если нужна темная тема
    if (isDarkMode) {
      rootElement.classList.add('dark');
      if (container) {
        container.classList.add('dark');
      }
    }
  }, [isDarkMode]);

  // Автоматическая прокрутка вверх при изменении экрана
  useEffect(() => {
    // Прокрутка вверх при переходе на новый экран
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Также прокручиваем контейнер бота, если он есть
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [screen]);

  // Загрузка сохраненных данных пользователя при монтировании
  useEffect(() => {
    const loadSavedUser = async () => {
      try {
        const savedUserId = localStorage.getItem('bot_user_id');
        const savedUserName = localStorage.getItem('bot_user_name');
        const savedAnxietyLevel = localStorage.getItem('bot_anxiety_level');
        const savedScreen = localStorage.getItem('bot_screen');

        if (savedUserId && savedUserName) {
          // Восстанавливаем имя
          setUserName(savedUserName);
          
          // Пытаемся загрузить пользователя из базы
          try {
            const savedUser = await BotService.getOrCreateUser({
              name: savedUserName,
              platform: 'web',
            });
            setUser(savedUser);
            
            // Восстанавливаем выбранного инструктора, если он был
            if (savedUser.selected_instructor_id) {
              setSelectedInstructor(savedUser.selected_instructor_id);
            }
            
            // Восстанавливаем уровень тревожности, если он был
            if (savedAnxietyLevel) {
              const level = parseInt(savedAnxietyLevel, 10);
              setAnxietyLevel(level);
            }
            
            // Восстанавливаем экран
            if (savedAnxietyLevel && parseInt(savedAnxietyLevel, 10) > 0) {
              // Если прошел тест тревожности, используем сохраненный экран или идем в меню
              if (savedScreen && ['menu', 'instructors', 'progress', 'testimonials', 'support'].includes(savedScreen)) {
                setScreen(savedScreen);
              } else {
                setScreen('menu');
              }
            } else {
              // Если не прошел тест, идем на тест тревожности
              setScreen('anxiety');
            }
          } catch (err) {
            console.error('Ошибка загрузки пользователя:', err);
            // Если не удалось загрузить, очищаем сохраненные данные
            localStorage.removeItem('bot_user_id');
            localStorage.removeItem('bot_user_name');
            localStorage.removeItem('bot_anxiety_level');
            localStorage.removeItem('bot_screen');
          }
        }
      } catch (err) {
        console.error('Ошибка загрузки сохраненных данных:', err);
      }
    };

    loadSavedUser();
  }, []); // Запускаем только при монтировании

  // Загрузка инструкторов
  useEffect(() => {
    const loadInstructors = async () => {
      // Fallback данные инструкторов (если не удалось загрузить из Supabase)
      const fallbackInstructors: Instructor[] = [
        {
          id: 'igor-1',
          name: 'Игорь Нагорский',
          style: 'Основатель и руководитель автошколы "Viktorija", опытный инструктор по вождению',
          experience: 'Многолетний опыт',
          pass_rate: '95%',
          photo_url: '/igor-ready.png',
          reviews_count: 0,
          rating: 5.0,
          specialty: 'Основатель автошколы, профессиональная подготовка водителей. Автомобиль: Toyota Corolla',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 'stas-1',
          name: 'Станислав Зигадло',
          style: 'Инструктор по вождению, педагогический стаж 18 лет',
          experience: '18 лет',
          pass_rate: '93%',
          photo_url: '/stas-ready.png',
          reviews_count: 0,
          rating: 4.9,
          specialty: 'Профессиональная подготовка водителей. Автомобиль: Skoda Octavia',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      try {
        const data = await BotService.getInstructors();
        if (data && data.length > 0) {
          setInstructors(data);
          setError(null); // Очищаем ошибку при успешной загрузке
        } else {
          // Если данных нет в БД, используем fallback
          console.warn('Инструкторы не найдены в БД, используем fallback данные');
          setInstructors(fallbackInstructors);
          setError(null); // Не показываем ошибку, если есть fallback данные
        }
      } catch (err) {
        console.error('Ошибка загрузки инструкторов:', err);
        // Используем fallback данные вместо показа ошибки
        setInstructors(fallbackInstructors);
        setError(null); // Не показываем ошибку пользователю, если есть fallback данные
      }
    };
    loadInstructors();
  }, []);

  // Загрузка отзывов
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await BotService.getTestimonials(10);
        setTestimonials(data);
      } catch (err) {
        console.error('Ошибка загрузки отзывов:', err);
      }
    };
    loadTestimonials();
  }, []);

  // Анимация счетчиков для социального доказательства
  useEffect(() => {
    if (screen === 'welcome') {
      let currentPassRate = 0;
      let currentToday = 0;
      const interval = setInterval(() => {
        if (currentPassRate < 94) {
          currentPassRate += 2;
          setPassRate(currentPassRate);
        }
        if (currentToday < 12) {
          currentToday += 1;
          setTodayCount(currentToday);
        }
        if (currentPassRate >= 94 && currentToday >= 12) {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [screen]);

  // Загрузка сообщений поддержки при открытии страницы поддержки
  useEffect(() => {
    const loadSupportMessages = async () => {
      if (!user || screen !== 'support') return;
      try {
        const messages = await BotService.getSupportMessages(user.id);
        setSupportMessages(messages);
      } catch (err) {
        console.error('Error loading support messages:', err);
      }
    };
    loadSupportMessages();
  }, [user, screen]);

  // Загрузка прогресса при входе пользователя
  useEffect(() => {
    const loadProgress = async () => {
      if (!user) return;
      try {
        const userProgress = await BotService.getProgress(user.id);
        if (userProgress) {
          setProgress(userProgress);
        } else {
          // Создаем начальный прогресс
          const newProgress = await BotService.upsertProgress(user.id, {
            theory_progress: 0,
            driving_progress: 0,
            completed_lessons: 0,
            total_lessons: 28,
          });
          setProgress(newProgress);
        }

        // Загружаем навыки
        const userSkills = await BotService.getSkills(user.id);
        if (userSkills.length === 0) {
          // Создаем начальные навыки
          // Создаем навыки с локализованными названиями в зависимости от текущего языка
          const defaultSkills = [
            t('bot.progress.skillNames.parking'),
            t('bot.progress.skillNames.laneChange'),
            t('bot.progress.skillNames.uTurn'),
            t('bot.progress.skillNames.reverse'),
            t('bot.progress.skillNames.examRoute'),
          ];
          for (const skillName of defaultSkills) {
            await BotService.createSkill(user.id, skillName);
          }
          const updatedSkills = await BotService.getSkills(user.id);
          setSkills(updatedSkills);
        } else {
          setSkills(userSkills);
        }
      } catch (err) {
        console.error('Ошибка загрузки прогресса:', err);
      }
    };
    loadProgress();
  }, [user]);

  const handleStart = async () => {
    if (!userName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Создаем или получаем пользователя
      const newUser = await BotService.getOrCreateUser({
        name: userName,
        platform: 'web',
      });
      setUser(newUser);
      
      // Сохраняем данные пользователя в localStorage
      localStorage.setItem('bot_user_id', newUser.id);
      localStorage.setItem('bot_user_name', userName.trim());
      localStorage.setItem('bot_screen', 'anxiety');
      
      setScreen('anxiety');
    } catch (err) {
      console.error('Ошибка регистрации:', err);
      setError('Не удалось зарегистрироваться. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnxietySubmit = async () => {
    if (!anxietyLevel || !user) return;

    setLoading(true);
    try {
      await BotService.saveAnxietyTest(user.id, anxietyLevel);
      
      // Сохраняем уровень тревожности и экран в localStorage
      localStorage.setItem('bot_anxiety_level', anxietyLevel.toString());
      localStorage.setItem('bot_screen', 'menu');
      
      setScreen('menu');
    } catch (err) {
      console.error('Ошибка сохранения теста:', err);
      setError('Не удалось сохранить результат теста');
    } finally {
      setLoading(false);
    }
  };

  // Обработка выбора инструктора
  const handleSelectInstructor = async (instructorId: string) => {
    if (!user) {
      setError('Необходимо войти в систему');
      return;
    }

    setConfirmingInstructor(instructorId);
    setShowConfirmation(true);
  };

  // Подтверждение выбора инструктора
  const handleConfirmInstructor = async () => {
    if (!confirmingInstructor || !user) return;

    setLoading(true);
    setError(null);

    try {
      await BotService.saveSelectedInstructor(user.id, confirmingInstructor);
      setSelectedInstructor(confirmingInstructor);
      setShowConfirmation(false);
      setConfirmingInstructor(null);
      
      // Обновляем данные пользователя
      const updatedUser = await BotService.getOrCreateUser({
        name: userName,
        platform: 'web',
      });
      setUser(updatedUser);
    } catch (err) {
      console.error('Ошибка сохранения инструктора:', err);
      setError('Не удалось сохранить выбор инструктора. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookLesson = async () => {
    if (!user) {
      setError('Войдите в систему');
      return;
    }

    if (!selectedInstructor) {
      setError('Сначала выберите инструктора');
      setScreen('instructors');
      return;
    }

    // Открываем форму записи
    setShowBookingForm(true);
  };

  const handleSubmitBooking = async () => {
    if (!user || !selectedInstructor || !bookingDate || !bookingTime) {
      setError(t('bot.booking.fillAll'));
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Объединяем дату и время
      const dateTime = new Date(`${bookingDate}T${bookingTime}`);
      
      // Проверяем, что дата не в прошлом
      if (dateTime < new Date()) {
        setError('Нельзя записаться на занятие в прошлом');
        setLoading(false);
        return;
      }

      await BotService.bookLesson({
        user_id: user.id,
        instructor_id: selectedInstructor,
        date: dateTime.toISOString(),
        type: bookingType,
      });

      // Сохраняем информацию о записи для экрана подтверждения
      const instructorName = instructors.find(i => i.id === selectedInstructor)?.name || 'Инструктор';
      setBookingSuccess({
        instructorName,
        date: bookingDate,
        time: bookingTime,
        type: bookingType,
      });

      // Очищаем форму
      setBookingDate('');
      setBookingTime('');
      setBookingType('driving');
      setShowBookingForm(false);

      // Переходим на экран подтверждения
      setScreen('booking-success');
    } catch (err) {
      console.error('Error booking lesson:', err);
      setError(t('bot.errors.bookingFailed'));
    } finally {
      setLoading(false);
    }
  };

  // Локализованные советы (будут загружены из i18n)
  const getAnxietyTips = () => {
    try {
      return t('bot.support.tips', { returnObjects: true }) as string[];
    } catch {
      // Fallback на русские советы, если локализация не загружена
      return [
        'Глубоко дышите перед началом занятия - 4 секунды вдох, 6 секунд выдох',
        'Помните: ошибки - это часть обучения, не ругайте себя',
        'Визуализируйте успешное выполнение маневра перед его выполнением',
        'Если чувствуете панику - скажите инструктору, мы остановимся и подышим',
      ];
    }
  };

  const renderWelcome = () => {
    // Валидация для System 2 (обдуманное мышление) - визуальная обратная связь
    const isValidName = userName.trim().length >= 2;
    const isEmpty = userName.trim().length === 0;

    return (
      <div className="space-y-8">
        {/* ============================================
            DUAL PROCESS THEORY: System 1 (Intuitive) + System 2 (Deliberate)
            Поддержка обоих типов мышления
        ============================================ */}
        
        {/* System 1: Визуальные подсказки для быстрого понимания */}
        <div className="text-center space-y-4">
          {/* Визуальный индикатор - иконка для System 1 */}
          <div className="relative inline-block">
            <div className="text-6xl animate-bounce">🚗</div>
            {/* Визуальная подсказка - бейдж для System 1 */}
            <div className="absolute -top-1 -right-1 bg-green-500 dark:bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {t('bot.welcome.freeBadge')}
            </div>
          </div>
          
          {/* System 1: Эмоциональный заголовок для быстрого восприятия */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            {t('bot.welcome.title')}
          </h1>
          
          {/* System 2: Дополнительная информация для обдуманного решения */}
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {t('bot.welcome.subtitle')}
          </p>
        </div>

        {/* Основная форма - поддержка обоих систем */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 p-6 lg:p-8">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-lg p-3 mb-4 flex items-start gap-2">
              <span className="text-red-500 text-lg">⚠️</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">{t('bot.common.error')}</p>
                <p className="text-xs text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          )}

          {/* System 1: Визуальные подсказки + System 2: Четкие инструкции */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
              <span className="text-blue-500">👤</span>
              {t('bot.welcome.namePlaceholder')}
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder={t('bot.welcome.namePlaceholder')}
                className={`w-full px-4 py-3.5 border-2 rounded-lg focus:ring-2 transition-all text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                  isValidName && !isEmpty
                    ? 'border-green-400 dark:border-green-500 focus:ring-green-400 dark:focus:ring-green-500 focus:border-green-500 dark:focus:border-green-600'
                    : isEmpty
                    ? 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400'
                    : 'border-orange-300 dark:border-orange-600 focus:ring-orange-400 dark:focus:ring-orange-500 focus:border-orange-500 dark:focus:border-orange-600'
                }`}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && isValidName && handleStart()}
                disabled={loading}
                autoFocus
                maxLength={50}
              />
              {/* System 1: Визуальная обратная связь - индикатор валидности */}
              {!isEmpty && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isValidName ? (
                    <span className="text-green-500 text-xl">✓</span>
                  ) : (
                    <span className="text-orange-500 text-sm">⚠</span>
                  )}
                </div>
              )}
            </div>
            
            {/* System 2: Подробная обратная связь для обдуманного решения */}
            {!isEmpty && !isValidName && (
              <p className="mt-2 text-xs text-orange-600 dark:text-orange-400 flex items-center gap-1">
                <span>ℹ️</span> {t('bot.welcome.nameMinLength')}
              </p>
            )}
            {isValidName && (
              <p className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                <span>✓</span> {t('bot.welcome.nameValid')}
              </p>
            )}
          </div>

          {/* System 1: Яркая CTA кнопка для быстрого действия */}
          <button
            onClick={handleStart}
            disabled={!isValidName || loading}
            className={`w-full py-4 rounded-lg font-semibold text-base transition-all shadow-md hover:shadow-lg transform ${
              isValidName && !loading
                ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin text-lg">⏳</span>
                {t('bot.common.loading')}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span className="text-lg">🚀</span>
                {t('bot.welcome.startButton')}
                <span className="text-xl">→</span>
              </span>
            )}
          </button>

          {/* System 1: Визуальные подсказки для быстрого сканирования */}
          <div className="flex items-center justify-center gap-6 mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <span className="text-green-500 text-base">✓</span>
              <span className="font-medium">{t('bot.welcome.free')}</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <span className="text-green-500 text-base">✓</span>
              <span className="font-medium">{t('bot.welcome.noRegistration')}</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <span className="text-green-500 text-base">✓</span>
              <span className="font-medium">{t('bot.welcome.quickStart')}</span>
            </span>
          </div>
        </div>

        {/* System 1: Визуальное социальное доказательство для быстрого доверия */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-5 rounded-xl text-center border-2 border-blue-200 dark:border-blue-700 transform hover:scale-105 transition cursor-default">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {passRate}%
            </div>
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
              {t('bot.welcome.passFirstTime')}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
              <span>⭐</span> {t('bot.welcome.bestResult')}
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-5 rounded-xl text-center border-2 border-green-200 dark:border-green-700 transform hover:scale-105 transition cursor-default">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {studentsCount}+
            </div>
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
              {t('bot.welcome.satisfiedStudents')}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
              <span>💚</span> {t('bot.welcome.highRating')}
            </div>
          </div>
        </div>

        {/* System 1: Визуальная подсказка срочности для эмоционального триггера */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 border-2 border-orange-300 dark:border-orange-700 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xl animate-pulse">⚡</span>
            <p className="text-sm font-bold text-orange-800 dark:text-orange-200">
              {t('bot.welcome.todaySignedUp', { count: todayCount })}
            </p>
          </div>
          <p className="text-xs text-orange-700 dark:text-orange-300">
            {t('bot.welcome.spotsLeftPrefix')} <span className="font-bold text-base">5</span> {t('bot.welcome.spotsLeftSuffix')}
            </p>
        </div>

        {/* System 2: Дополнительная информация для обдуманного решения (скрыта по умолчанию) */}
        <details className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <summary className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100">
            ℹ️ {t('bot.welcome.moreAboutProcess')}
          </summary>
          <div className="mt-3 space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <p>• {t('bot.welcome.processStep1')}</p>
            <p>• {t('bot.welcome.processStep2')}</p>
            <p>• {t('bot.welcome.processStep3')}</p>
            <p>• {t('bot.welcome.processStep4')}</p>
          </div>
        </details>
      </div>
    );
  };

  const renderAnxietyTest = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="text-red-500 dark:text-red-400" size={32} />
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t('bot.anxiety.title')}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t('bot.anxiety.subtitle')}</p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">Насколько сильно вы переживаете о вождении?</p>

        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => setAnxietyLevel(level)}
              className={`w-full p-4 rounded-lg border-2 transition ${
                anxietyLevel === level
                  ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {level === 1 && t('bot.anxiety.level1')}
                  {level === 2 && t('bot.anxiety.level2')}
                  {level === 3 && t('bot.anxiety.level3')}
                  {level === 4 && t('bot.anxiety.level4')}
                  {level === 5 && t('bot.anxiety.level5')}
                </span>
                <div className="flex gap-1">
                  {[...Array(level)].map((_, i) => (
                    <Heart key={i} size={16} className="fill-red-400 dark:fill-red-500 text-red-400 dark:text-red-500" />
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleAnxietySubmit}
          disabled={!anxietyLevel || loading}
          className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          {loading ? t('bot.common.loading') : t('bot.anxiety.continue')}
        </button>
      </div>

      {/* Фразы поддержки в зависимости от уровня тревоги */}
      {anxietyLevel > 0 && (() => {
        const supportMessages = {
          1: {
            icon: '🎉',
            bgColor: 'bg-blue-50 dark:bg-blue-900/30',
            borderColor: 'border-blue-200 dark:border-blue-700',
            textColor: 'text-blue-800 dark:text-blue-200',
            message: 'Отлично! У вас уверенный настрой. Мы поможем вам отточить навыки и стать еще более уверенным водителем.'
          },
          2: {
            icon: '👍',
            bgColor: 'bg-green-50 dark:bg-green-900/30',
            borderColor: 'border-green-200 dark:border-green-700',
            textColor: 'text-green-800 dark:text-green-200',
            message: 'Понимаем ваше волнение - это нормально! Наши инструкторы помогут вам чувствовать себя комфортно за рулем.'
          },
          3: {
            icon: '✅',
            bgColor: 'bg-green-50 dark:bg-green-900/30',
            borderColor: 'border-green-200 dark:border-green-700',
            textColor: 'text-green-800 dark:text-green-200',
            message: 'Отлично! Мы специализируемся на работе с тревожными учениками. Вы получите дополнительную психологическую поддержку и терпеливого инструктора.'
          },
          4: {
            icon: '💚',
            bgColor: 'bg-emerald-50 dark:bg-emerald-900/30',
            borderColor: 'border-emerald-200 dark:border-emerald-700',
            textColor: 'text-emerald-800 dark:text-emerald-200',
            message: 'Мы понимаем, как это может быть сложно. Наши опытные инструкторы создадут безопасную и поддерживающую среду для вашего обучения. Вы не одни!'
          },
          5: {
            icon: '🤝',
            bgColor: 'bg-purple-50 dark:bg-purple-900/30',
            borderColor: 'border-purple-200 dark:border-purple-700',
            textColor: 'text-purple-800 dark:text-purple-200',
            message: 'Мы глубоко понимаем вашу ситуацию. Наша команда имеет опыт работы с травматическими переживаниями. Вы получите максимальную поддержку, индивидуальный подход и столько времени, сколько нужно. Мы поможем вам преодолеть страх шаг за шагом.'
          }
        };

        const support = supportMessages[anxietyLevel as keyof typeof supportMessages];
        if (!support) return null;

        return (
          <div className={`${support.bgColor} border ${support.borderColor} rounded-lg p-4`}>
            <p className={`text-sm ${support.textColor} flex items-start gap-2`}>
              <span className="text-lg">{support.icon}</span>
              <span>{support.message}</span>
            </p>
          </div>
        );
      })()}
    </div>
  );

  const renderMenu = () => (
    <div className="space-y-5">
      {/* ============================================
          CREATE ACTION FUNNEL: CUE, REACTION, EVALUATION, ABILITY, TIMING, EXECUTION
      ============================================ */}
      
      {/* CUE: Яркий визуальный сигнал - персонализированное приветствие */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-500 dark:via-blue-600 dark:to-purple-500 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 animate-pulse"></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl animate-bounce">👋</span>
            <h2 className="text-2xl sm:text-3xl font-bold">{t('bot.menu.greeting')}, {userName}!</h2>
          </div>
          <p className="text-blue-100 dark:text-blue-200 text-base mb-1 font-medium">
            {t('bot.menu.greeting')}
          </p>
          <p className="text-blue-200 dark:text-blue-300 text-sm">
            {t('bot.menu.simple')}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 text-blue-100 dark:text-blue-200 hover:text-white text-sm font-medium transition-colors"
          title="Выйти из аккаунта"
        >
          {t('bot.common.logout')}
        </button>
      </div>

      {/* REACTION: Эмоциональный триггер - показываем ценность действий */}
      <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 border-2 border-green-200 dark:border-green-700 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">✨</span>
          <div className="flex-1">
            <p className="font-bold text-green-800 dark:text-green-200 text-sm mb-1">
              {t('bot.menu.reactionTitle')}
            </p>
            <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
              {t('bot.menu.reactionText')}
            </p>
          </div>
        </div>
      </div>

      {/* EVALUATION: Показываем выгоды каждой функции - вертикальный layout */}
      <div className="space-y-4">
        <button
          onClick={() => setScreen('instructors')}
          className="w-full bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 p-5 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl transition-all transform hover:scale-[1.01] group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
          <div className="relative flex items-center gap-4">
            <div className="flex-shrink-0 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition">
              <User className="text-blue-600 dark:text-blue-400" size={40} />
            </div>
            <div className="flex-1 text-left">
              <div className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-1">
                {t('bot.menu.selectInstructor')}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                {t('bot.menu.selectInstructorDesc')}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                  {t('bot.menu.selectInstructorBadge')}
                </div>
                <span className="text-blue-600 dark:text-blue-400 font-medium text-sm ml-auto">
                  {t('bot.menu.selectInstructorAction')} →
                </span>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setScreen('progress')}
          className="w-full bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-700 p-5 rounded-xl hover:border-green-500 dark:hover:border-green-400 hover:shadow-xl transition-all transform hover:scale-[1.01] group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
          <div className="relative flex items-center gap-4">
            <div className="flex-shrink-0 p-3 bg-green-50 dark:bg-green-900/30 rounded-xl group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition">
              <BarChart3 className="text-green-600 dark:text-green-400" size={40} />
            </div>
            <div className="flex-1 text-left">
              <div className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-1">
                {t('bot.menu.progress')}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                {t('bot.menu.progressDesc')}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
                  {t('bot.menu.progressBadge')}
                </div>
                <span className="text-green-600 dark:text-green-400 font-medium text-sm ml-auto">
                  {t('bot.menu.progressAction')} →
                </span>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setScreen('testimonials')}
          className="w-full bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-700 p-5 rounded-xl hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-xl transition-all transform hover:scale-[1.01] group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
          <div className="relative flex items-center gap-4">
            <div className="flex-shrink-0 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition">
              <Video className="text-purple-600 dark:text-purple-400" size={40} />
            </div>
            <div className="flex-1 text-left">
              <div className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-1">
                {t('bot.menu.testimonials')}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                {t('bot.menu.testimonialsDesc')}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded">
                  {t('bot.menu.testimonialsBadge')}
                </div>
                <span className="text-purple-600 dark:text-purple-400 font-medium text-sm ml-auto">
                  {t('bot.menu.testimonialsAction')} →
                </span>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setScreen('support')}
          className="w-full bg-white dark:bg-gray-800 border-2 border-red-200 dark:border-red-700 p-5 rounded-xl hover:border-red-500 dark:hover:border-red-400 hover:shadow-xl transition-all transform hover:scale-[1.01] group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
          <div className="relative flex items-center gap-4">
            <div className="flex-shrink-0 p-3 bg-red-50 dark:bg-red-900/30 rounded-xl group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition">
              <Heart className="text-red-600 dark:text-red-400" size={40} />
            </div>
            <div className="flex-1 text-left">
              <div className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-1">
                {t('bot.menu.support')}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                {t('bot.menu.supportDesc')}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded">
                  {t('bot.menu.supportBadge')}
                </div>
                <span className="text-red-600 dark:text-red-400 font-medium text-sm ml-auto">
                  {t('bot.menu.supportAction')} →
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* TIMING: Показываем, что сейчас правильное время для действия */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-2 border-orange-200 dark:border-orange-700 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl animate-pulse">⚡</span>
          <div className="flex-1">
            <p className="font-semibold text-orange-800 dark:text-orange-200 text-sm mb-1">
              {t('bot.menu.recommendationTitle')}
            </p>
            <p className="text-xs text-orange-700 dark:text-orange-300">
              {t('bot.menu.recommendationText')}
            </p>
          </div>
        </div>
      </div>

      {/* ABILITY: Показываем простоту действия */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
        <p className="text-xs text-blue-800 dark:text-blue-200 text-center">
          💡 <span className="font-medium">{t('bot.menu.simple')}</span>
        </p>
      </div>

      {/* EXECUTION: Главная CTA кнопка - яркая и заметная */}
      <button
        onClick={handleBookLesson}
        className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-500 dark:via-blue-600 dark:to-purple-500 text-white py-5 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:via-blue-700 dark:hover:to-purple-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <Calendar size={24} className="relative z-10" />
        <span className="relative z-10">{t('bot.menu.bookLesson')}</span>
        <span className="text-2xl relative z-10">→</span>
      </button>
    </div>
  );

  const renderInstructors = () => {
    const getSelectedInstructorName = () => {
      if (!confirmingInstructor) return '';
      const instructor = instructors.find(i => i.id === confirmingInstructor);
      return instructor?.name || '';
    };

    return (
      <div className="space-y-4">
        <button
          onClick={() => setScreen('menu')}
          className="text-blue-600 dark:text-blue-400 font-medium mb-4"
        >
          ← {t('bot.common.back')}
        </button>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('bot.instructors.title')}</h2>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-3 text-red-800 dark:text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Подтверждение выбора */}
        {showConfirmation && confirmingInstructor && (
          <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-600 rounded-xl p-5 mb-4">
            <div className="flex items-start gap-3">
              <span className="text-3xl">✅</span>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                  Подтвердите выбор инструктора
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                  Вы хотите выбрать <span className="font-semibold">{getSelectedInstructorName()}</span> в качестве вашего инструктора?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleConfirmInstructor}
                    disabled={loading}
                    className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Сохранение...' : 'Да, выбрать'}
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmation(false);
                      setConfirmingInstructor(null);
                    }}
                    disabled={loading}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Индикатор выбранного инструктора */}
        {selectedInstructor && !showConfirmation && (
          <div className="bg-green-50 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-600 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">✓</span>
              <p className="text-sm text-green-800 dark:text-green-200">
                <span className="font-semibold">Выбран:</span> {instructors.find(i => i.id === selectedInstructor)?.name || 'Инструктор'}
              </p>
            </div>
          </div>
        )}

        {instructors.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">Загрузка инструкторов...</div>
        ) : (
          instructors.map((instructor) => {
            const isSelected = selectedInstructor === instructor.id;
            const isConfirming = confirmingInstructor === instructor.id;

            return (
              <div
                key={instructor.id}
                className={`border-2 rounded-xl p-5 transition ${
                  isSelected
                    ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30'
                    : isConfirming
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex gap-4 mb-4">
                  {instructor.photo_url && (instructor.photo_url.startsWith('/') || instructor.photo_url.startsWith('http')) ? (
                    <img 
                      src={instructor.photo_url} 
                      alt={instructor.name}
                      className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="text-5xl flex-shrink-0">{instructor.photo_url || '👨‍🏫'}</div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{instructor.name}</h3>
                      {isSelected && (
                        <span className="bg-green-500 dark:bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          ВЫБРАН
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{instructor.style}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <span>⭐</span>
                        <span className="font-semibold">{instructor.rating.toFixed(1)}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span>📝</span>
                        <span>{instructor.reviews_count} отзывов</span>
                      </span>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-3">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Сдают с первого раза</div>
                      <div className="font-bold text-lg text-green-600 dark:text-green-400">{instructor.pass_rate}</div>
                    </div>

                    {instructor.specialty && (
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-3">
                        ✨ {instructor.specialty}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {!isSelected ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectInstructor(instructor.id);
                      }}
                      disabled={loading || showConfirmation}
                      className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                    >
                      {isConfirming ? 'Подтверждение...' : 'Выбрать инструктора'}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 bg-green-600 dark:bg-green-500 text-white py-3 rounded-lg font-semibold cursor-default"
                    >
                      ✓ Выбран
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Открыть видеоотзывы
                    }}
                    className="px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    🎥
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  // Функция для локализации названий навыков
  const getLocalizedSkillName = (skillName: string): string => {
    const skillNameMap: { [key: string]: string } = {
      'Парковка': t('bot.progress.skillNames.parking'),
      'Перестроение': t('bot.progress.skillNames.laneChange'),
      'Разворот': t('bot.progress.skillNames.uTurn'),
      'Движение задним ходом': t('bot.progress.skillNames.reverse'),
      'Экзаменационный маршрут': t('bot.progress.skillNames.examRoute'),
      // Английские версии (на случай, если уже сохранены)
      'Parking': t('bot.progress.skillNames.parking'),
      'Lane change': t('bot.progress.skillNames.laneChange'),
      'U-turn': t('bot.progress.skillNames.uTurn'),
      'Reverse driving': t('bot.progress.skillNames.reverse'),
      'Exam route': t('bot.progress.skillNames.examRoute'),
      // Эстонские версии
      'Parkimine': t('bot.progress.skillNames.parking'),
      'Ridade vahetamine': t('bot.progress.skillNames.laneChange'),
      'Tagurpidi sõitmine': t('bot.progress.skillNames.reverse'),
      'Eksami marsruut': t('bot.progress.skillNames.examRoute'),
    };
    return skillNameMap[skillName] || skillName;
  };

  const renderProgress = () => {
    if (!progress) {
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">{t('bot.progress.loading')}</div>
      );
    }

    const progressPercentage = (progress.completed_lessons / progress.total_lessons) * 100;
    const remainingLessons = progress.total_lessons - progress.completed_lessons;
    const completedSkills = skills.filter(s => s.completed).length;
    const totalSkills = skills.length;
    const skillsPercentage = totalSkills > 0 ? (completedSkills / totalSkills) * 100 : 0;

    // MOTIVATION: Мотивационные сообщения в зависимости от прогресса
    const getMotivationMessage = () => {
      if (progressPercentage === 0) {
        return {
          icon: '🚀',
          title: 'Начните свой путь к свободе!',
          message: 'Первое занятие - это первый шаг к независимости. Вы уже на правильном пути!',
          bgClass: 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30',
          borderClass: 'border-blue-200 dark:border-blue-700'
        };
      } else if (progressPercentage < 25) {
        return {
          icon: '💪',
          title: 'Отличное начало!',
          message: 'Вы уже начали! Каждое занятие приближает вас к получению прав.',
          bgClass: 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30',
          borderClass: 'border-green-200 dark:border-green-700'
        };
      } else if (progressPercentage < 50) {
        return {
          icon: '⭐',
          title: 'Вы на четверти пути!',
          message: 'Продолжайте в том же духе! Вы делаете отличные успехи.',
          bgClass: 'bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30',
          borderClass: 'border-purple-200 dark:border-purple-700'
        };
      } else if (progressPercentage < 75) {
        return {
          icon: '🎯',
          title: 'Больше половины пройдено!',
          message: 'Вы уже освоили больше половины программы. Осталось совсем немного!',
          bgClass: 'bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30',
          borderClass: 'border-orange-200 dark:border-orange-700'
        };
      } else if (progressPercentage < 100) {
        return {
          icon: '🏁',
          title: 'Финишная прямая!',
          message: 'Вы почти у цели! Осталось всего несколько занятий до получения прав.',
          bgClass: 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30',
          borderClass: 'border-green-200 dark:border-green-700'
        };
      } else {
        return {
          icon: '🎉',
          title: 'Поздравляем!',
          message: 'Вы завершили все занятия! Готовы к экзамену и получению прав!',
          bgClass: 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30',
          borderClass: 'border-green-300 dark:border-green-600'
        };
      }
    };

    const motivation = getMotivationMessage();

    return (
      <div className="space-y-4">
        {/* ============================================
            DUAL PROCESS THEORY: System 1 (Fast) + System 2 (Deliberate)
        ============================================ */}
        
        {/* SYSTEM 1: Знакомый паттерн - кнопка "Назад" */}
        <button
          onClick={() => setScreen('menu')}
          className="text-blue-600 dark:text-blue-400 font-medium mb-1 flex items-center gap-1 hover:text-blue-700 dark:hover:text-blue-300 transition"
        >
          <span>←</span> <span>{t('bot.common.back')}</span>
        </button>

        {/* SYSTEM 1: Быстрое визуальное понимание - заголовок с иконкой */}
        <div className="text-center mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
            {userName}
          </h2>
          <div className="inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <BarChart3 size={14} className="text-blue-500 dark:text-blue-400" />
            <span>{t('bot.progress.subtitle')}</span>
          </div>
        </div>

        {/* SYSTEM 1: Быстрое визуальное понимание - цветовой индикатор статуса */}
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {/* SYSTEM 1: Цветовой индикатор для мгновенного понимания */}
              <div className={`w-4 h-4 rounded-full animate-pulse ${
                progressPercentage === 100 
                  ? 'bg-green-500 shadow-lg shadow-green-500/50' 
                  : progressPercentage >= 50 
                    ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50'
                    : 'bg-blue-500 shadow-lg shadow-blue-500/50'
              }`}></div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t('bot.progress.overall')}</span>
            </div>
            {/* SYSTEM 1: Большое число для быстрого сканирования */}
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">{Math.round(progressPercentage)}%</div>
          </div>
          
          {/* SYSTEM 1: Визуальный прогресс-бар с эмоциональной окраской */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-7 mb-3 shadow-inner">
            <div
              className={`rounded-full h-7 transition-all duration-700 shadow-lg ${
                progressPercentage === 100 
                  ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-600' 
                  : progressPercentage >= 50 
                    ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500'
                    : 'bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* SYSTEM 1: Быстрое сканирование ключевых чисел */}
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {progress.completed_lessons} / {progress.total_lessons} {t('bot.progress.lessons')}
            </span>
            {remainingLessons > 0 && (
              <span className="text-gray-500 dark:text-gray-400">
                {t('bot.progress.remaining', { count: remainingLessons })}
              </span>
            )}
          </div>

          {/* Кнопки для самостоятельного обновления прогресса */}
          <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-600 dark:text-gray-400">{t('bot.progress.completedLessonsLabel')}</span>
            <button
              onClick={async () => {
                if (!user?.id || loading || progress.completed_lessons <= 0) return;
                try {
                  setLoading(true);
                  const updated = await BotService.updateProgress(user.id, {
                    completed_lessons: Math.max(0, progress.completed_lessons - 1)
                  });
                  setProgress(updated);
                } catch (err) {
                  console.error('Error updating progress:', err);
                  setError(t('bot.errors.updateProgressFailed'));
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading || progress.completed_lessons <= 0}
              className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Minus size={14} className="text-gray-600 dark:text-gray-400" />
            </button>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 min-w-[2rem] text-center">
              {progress.completed_lessons}
            </span>
            <button
              onClick={async () => {
                if (!user?.id || loading || progress.completed_lessons >= progress.total_lessons) return;
                try {
                  setLoading(true);
                  const updated = await BotService.updateProgress(user.id, {
                    completed_lessons: Math.min(progress.total_lessons, progress.completed_lessons + 1)
                  });
                  setProgress(updated);
                } catch (err) {
                  console.error('Error updating progress:', err);
                  setError(t('bot.errors.updateProgressFailed'));
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading || progress.completed_lessons >= progress.total_lessons}
              className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Plus size={14} className="text-blue-600 dark:text-blue-400" />
            </button>
          </div>

          {/* SYSTEM 2: Кнопка для углубления в детали (опционально) */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center justify-center gap-1 mt-2"
          >
            {showDetails ? t('bot.progress.hideDetails') : t('bot.progress.showDetails')}
            <span className="text-lg">{showDetails ? '↑' : '↓'}</span>
          </button>

          {/* SYSTEM 2: Детальная информация для аналитического мышления */}
          {showDetails && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">{t('bot.progress.theoryLabel')}</span>
                  <span className="ml-1 font-semibold text-gray-700 dark:text-gray-300">{progress.theory_progress}%</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">{t('bot.progress.practiceLabel')}</span>
                  <span className="ml-1 font-semibold text-gray-700 dark:text-gray-300">{progress.driving_progress}%</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">{t('bot.progress.skillsLabel')}</span>
                  <span className="ml-1 font-semibold text-gray-700 dark:text-gray-300">{completedSkills}/{totalSkills}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">{t('bot.progress.progressLabel')}</span>
                  <span className="ml-1 font-semibold text-gray-700 dark:text-gray-300">{Math.round(progressPercentage)}%</span>
                </div>
              </div>
              {remainingLessons > 0 && (
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {t('bot.progress.remainingLessons')} <span className="font-semibold">{remainingLessons}</span> {remainingLessons === 1 ? t('bot.progress.lesson') : remainingLessons < 5 ? t('bot.progress.lessonsFew') : t('bot.progress.lessonsMany')}.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* SYSTEM 1: Визуальные карточки с цветовыми подсказками */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition cursor-pointer">
            {/* SYSTEM 1: Иконка для быстрого распознавания */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{t('bot.progress.theory')}</span>
            </div>
            {/* SYSTEM 1: Большое число для быстрого сканирования */}
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {progress.theory_progress}%
            </div>
            {/* SYSTEM 1: Визуальный прогресс-бар */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full h-2.5 transition-all duration-500 shadow-sm"
                style={{ width: `${progress.theory_progress}%` }}
              />
            </div>
            {/* SYSTEM 2: Детальная информация при наведении */}
            {progress.theory_progress < 100 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t('bot.progress.theoryRemaining', { percent: 100 - progress.theory_progress })}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{t('bot.progress.practice')}</span>
            </div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {progress.driving_progress}%
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 rounded-full h-2.5 transition-all duration-500 shadow-sm"
                style={{ width: `${progress.driving_progress}%` }}
              />
            </div>
            {progress.driving_progress < 100 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t('bot.progress.practiceRemaining', { percent: 100 - progress.driving_progress })}
              </div>
            )}
          </div>
        </div>

        {/* SYSTEM 1 + SYSTEM 2: Навыки с визуальными подсказками */}
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {/* SYSTEM 1: Иконка для быстрого распознавания */}
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t('bot.progress.skills')}</span>
            </div>
            {/* SYSTEM 1: Быстрое сканирование прогресса */}
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {completedSkills}/{totalSkills}
            </span>
          </div>
          {/* Подсказка для пользователя */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 italic flex items-center gap-1">
            <span>💡</span>
            <span>{t('bot.progress.skillHint')}</span>
          </p>
          {/* SYSTEM 1: Визуальный прогресс-бар */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-full h-2 transition-all duration-500 shadow-sm"
              style={{ width: `${skillsPercentage}%` }}
            />
          </div>
          {/* SYSTEM 1: Чеклист с визуальными индикаторами */}
          <div className="space-y-2">
            {skills.length === 0 ? (
              <div className="text-gray-400 dark:text-gray-500 text-xs text-center py-2">{t('bot.progress.loading')}</div>
            ) : (
              skills.map((skill) => (
                <div 
                  key={skill.id} 
                  onClick={async () => {
                    if (!user?.id || loading) return;
                    try {
                      setLoading(true);
                      const updated = await BotService.toggleSkill(skill.id);
                      setSkills(skills.map(s => s.id === skill.id ? updated : s));
                    } catch (err) {
                      console.error('Error toggling skill:', err);
                      setError(t('bot.errors.toggleSkillFailed'));
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className={`flex items-center gap-2 text-sm p-3 rounded-lg transition-all cursor-pointer ${
                    skill.completed 
                      ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-600' 
                      : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10'
                  } ${loading ? 'opacity-50 cursor-wait' : 'hover:shadow-sm active:scale-[0.98]'}`}
                >
                  {/* SYSTEM 1: Интерактивный чекбокс для отметки навыка */}
                  {skill.completed ? (
                    <div className="relative">
                      <CheckCircle className="text-green-500 dark:text-green-400 flex-shrink-0" size={24} />
                      <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></div>
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded flex-shrink-0 flex items-center justify-center hover:border-purple-400 dark:hover:border-purple-500 transition">
                      <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    </div>
                  )}
                  <span className={`flex-1 font-medium ${
                    skill.completed 
                      ? 'text-gray-600 dark:text-gray-400 line-through' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {getLocalizedSkillName(skill.skill_name)}
                  </span>
                  {/* SYSTEM 2: Визуальная обратная связь */}
                  {skill.completed ? (
                    <span className="text-xs text-green-600 dark:text-green-400 font-bold bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                      {t('bot.progress.completed')}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {t('bot.progress.inProgress')}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* SYSTEM 1: Эмоциональная мотивация (быстрое восприятие) */}
        {progressPercentage < 100 && progressPercentage > 0 && (
          <div className={`${motivation.bgClass} border-2 ${motivation.borderClass} rounded-lg p-4 shadow-sm`}>
            <div className="flex items-center gap-3">
              {/* SYSTEM 1: Иконка для эмоционального отклика */}
              <span className="text-2xl">{motivation.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-800 dark:text-gray-200 font-semibold mb-1">
                  {motivation.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {motivation.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM 1: Простая и понятная кнопка действия */}
        {progressPercentage < 100 ? (
          <button 
            onClick={handleBookLesson}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-4 rounded-lg font-semibold text-base hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 dark:active:bg-blue-700 transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {/* SYSTEM 1: Визуальная подсказка (иконка) */}
            <Calendar size={20} />
            <span>{t('bot.progress.bookLesson')}</span>
            {/* SYSTEM 1: Направляющая стрелка */}
            <span className="text-lg">→</span>
          </button>
        ) : (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-600 rounded-lg p-5 text-center shadow-sm">
            {/* SYSTEM 1: Эмоциональный триггер (празднование) */}
            <div className="text-4xl mb-2 animate-bounce">🎉</div>
            <p className="text-base text-green-800 dark:text-green-200 font-bold mb-1">
              {t('bot.progress.allDone')}
            </p>
            <p className="text-xs text-green-700 dark:text-green-300 mb-4">
              {t('bot.progress.readyForExam')}
            </p>
            {/* SYSTEM 1: Четкая кнопка следующего шага */}
            <button 
              onClick={() => setScreen('support')}
              className="w-full bg-green-600 dark:bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 active:bg-green-800 dark:active:bg-green-700 transition-all shadow-md hover:shadow-lg"
            >
              {t('bot.progress.examPrep')}
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderTestimonials = () => {
    // Получаем имена инструкторов из testimonials
    const getInstructorName = (instructorId: string) => {
      const instructor = instructors.find((i) => i.id === instructorId);
      return instructor?.name || t('bot.instructors.title');
    };

    return (
      <div className="space-y-4">
        <button
          onClick={() => setScreen('menu')}
          className="text-blue-600 dark:text-blue-400 font-medium mb-4"
        >
          ← {t('bot.common.back')}
        </button>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('bot.testimonials.title')}</h2>

        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            💡 {t('bot.testimonials.motivation')}
          </p>
        </div>

        {/* Кнопка для добавления отзыва */}
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition flex items-center justify-center gap-2 mb-4"
        >
          <Star size={18} />
          <span>{showReviewForm ? t('bot.testimonials.hideForm') : t('bot.testimonials.leaveReview')}</span>
        </button>

        {/* Форма для создания отзыва */}
        {showReviewForm && (
          <div className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-5 mb-4">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-4">{t('bot.testimonials.leaveReviewTitle')}</h3>
            
            <div className="space-y-4">
              {/* Имя ученика */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('bot.testimonials.yourName')}
                </label>
                <input
                  type="text"
                  value={reviewStudentName}
                  onChange={(e) => setReviewStudentName(e.target.value)}
                  placeholder={t('bot.testimonials.namePlaceholder')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </div>

              {/* Выбор инструктора */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('bot.testimonials.selectInstructor')}
                </label>
                <select
                  value={selectedInstructor || ''}
                  onChange={(e) => setSelectedInstructor(e.target.value || null)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <option value="">{t('bot.testimonials.selectInstructorPlaceholder')}</option>
                  {instructors.map((instructor) => (
                    <option key={instructor.id} value={instructor.id}>
                      {instructor.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Рейтинг */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('bot.testimonials.rating')}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setReviewRating(rating)}
                      className={`p-2 rounded-lg transition ${
                        reviewRating >= rating
                          ? 'bg-yellow-400 dark:bg-yellow-500 text-yellow-900'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                      }`}
                    >
                      <Star
                        size={24}
                        className={reviewRating >= rating ? 'fill-current' : ''}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {t('bot.testimonials.ratingOf', { rating: reviewRating })}
                  </span>
                </div>
              </div>

              {/* Текст отзыва */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('bot.testimonials.yourReview')}
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder={t('bot.testimonials.reviewPlaceholder')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 resize-none"
                  rows={5}
                />
              </div>

              {/* Кнопки */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowReviewForm(false);
                    setReviewText('');
                    setReviewRating(5);
                    setReviewStudentName('');
                    setError(null);
                  }}
                  className="flex-1 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium"
                >
                  {t('bot.testimonials.cancel')}
                </button>
                <button
                  onClick={async () => {
                    if (!user?.id || !reviewText.trim() || !reviewStudentName.trim() || !selectedInstructor || loading) {
                      setError(t('bot.errors.fillAllFields'));
                      return;
                    }
                    try {
                      setLoading(true);
                      setError(null);
                      await BotService.createReview({
                        instructor_id: selectedInstructor,
                        student_name: reviewStudentName.trim(),
                        text: reviewText.trim(),
                        rating: reviewRating,
                      });
                      // Очищаем форму
                      setReviewText('');
                      setReviewRating(5);
                      setReviewStudentName('');
                      setShowReviewForm(false);
                      // Показываем сообщение об успехе
                      alert(t('bot.testimonials.thanks'));
                      // Обновляем список отзывов
                      const updated = await BotService.getTestimonials(20);
                      setTestimonials(updated);
                    } catch (err) {
                      console.error('Error creating review:', err);
                      setError(t('bot.errors.sendReviewFailed'));
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={!reviewText.trim() || !reviewStudentName.trim() || !selectedInstructor || loading}
                  className="flex-1 py-3 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
                >
                  {loading ? t('bot.testimonials.sending') : t('bot.testimonials.submit')}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-3">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {testimonials.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">{t('bot.testimonials.loading')}</div>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-4 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-4xl">👤</div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 dark:text-gray-100">{testimonial.student_name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t('bot.testimonials.instructor', { name: getInstructorName(testimonial.instructor_id) })}
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 dark:fill-yellow-500 text-yellow-400 dark:text-yellow-500" />
                  ))}
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-3">{testimonial.text}</p>

              {testimonial.video_url && (
                <button className="w-full bg-purple-600 dark:bg-purple-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 dark:hover:bg-purple-600 transition flex items-center justify-center gap-2">
                  <Video size={16} />
                  {t('bot.testimonials.watchVideo')}
                </button>
              )}
            </div>
          ))
        )}

        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="text-blue-600 dark:text-blue-400" size={20} />
            <div className="font-bold text-blue-900 dark:text-blue-200">{t('bot.testimonials.stats.title')}</div>
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-200">
            • {t('bot.testimonials.stats.passRate')}<br />
            • {t('bot.testimonials.stats.continue')}<br />
            • {t('bot.testimonials.stats.graduates')}
          </div>
        </div>
      </div>
    );
  };

  const renderBookingSuccess = () => {
    if (!bookingSuccess) {
      return (
        <div className="space-y-4">
          <button
            onClick={() => setScreen('menu')}
            className="text-blue-600 dark:text-blue-400 font-medium mb-4"
          >
            ← {t('bot.common.back')} {t('bot.menu.greeting')}
          </button>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {t('bot.bookingSuccess.notFound')}
          </div>
        </div>
      );
    }

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const locale = i18n.language === 'ru' ? 'ru-RU' : i18n.language === 'et' ? 'et-EE' : 'en-US';
      return date.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    };

    const formatTime = (timeString: string) => {
      const [hours, minutes] = timeString.split(':');
      return `${hours}:${minutes}`;
    };

    return (
      <div className="space-y-6">
        {/* Иконка успеха */}
        <div className="text-center">
          <div className="inline-block relative">
            <div className="text-7xl animate-bounce">🎉</div>
            <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Заголовок */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {t('bot.bookingSuccess.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('bot.bookingSuccess.subtitle')}
          </p>
        </div>

        {/* Информация о записи */}
        <div className="bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-700 rounded-xl p-6 shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500 dark:text-gray-400">{t('bot.bookingSuccess.instructor')}</div>
                <div className="font-bold text-gray-800 dark:text-gray-100">{bookingSuccess.instructorName}</div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Calendar className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('bot.bookingSuccess.dateTime')}</div>
                  <div className="font-bold text-gray-800 dark:text-gray-100">
                    {formatDate(bookingSuccess.date)}, {formatTime(bookingSuccess.time)}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  bookingSuccess.type === 'theory' 
                    ? 'bg-blue-100 dark:bg-blue-900/30' 
                    : 'bg-green-100 dark:bg-green-900/30'
                }`}>
                  <span className="text-2xl">{bookingSuccess.type === 'theory' ? '📚' : '🚗'}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('bot.bookingSuccess.lessonType')}</div>
                  <div className="font-bold text-gray-800 dark:text-gray-100">
                    {bookingSuccess.type === 'theory' ? t('bot.bookingSuccess.theory') : t('bot.bookingSuccess.practice')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Информационное сообщение */}
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                {t('bot.bookingSuccess.nextSteps')}
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {t('bot.bookingSuccess.nextStepsText')}
              </p>
            </div>
          </div>
        </div>

        {/* Кнопка возврата в меню */}
        <button
          onClick={() => {
            setScreen('menu');
            setBookingSuccess(null);
          }}
          className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-500 dark:via-blue-600 dark:to-purple-500 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:via-blue-700 dark:hover:to-purple-600 transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <span>{t('bot.bookingSuccess.backToMenu')}</span>
          <span className="text-xl">→</span>
        </button>
      </div>
    );
  };

  const renderSupport = () => {
    const currentAnxietyLevel = user?.anxiety_level || anxietyLevel;

    return (
      <div className="space-y-4">
        <button
          onClick={() => setScreen('menu')}
          className="text-blue-600 dark:text-blue-400 font-medium mb-4"
        >
          ← {t('bot.common.back')}
        </button>

        <div className="flex items-center gap-3 mb-4">
          <Heart className="text-red-500 dark:text-red-400" size={32} />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('bot.support.title')}</h2>
        </div>

        {currentAnxietyLevel > 0 && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-4">
            <div className="font-bold text-red-900 dark:text-red-200 mb-2">
              {t('bot.support.anxietyLevel', { level: currentAnxietyLevel })}
            </div>
            <p className="text-sm text-red-800 dark:text-red-200">
              {currentAnxietyLevel >= 4
                ? t('bot.support.highAnxiety')
                : t('bot.support.normalAnxiety')}
            </p>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-4 rounded-lg">
          <h3 className="font-bold mb-3 text-gray-800 dark:text-gray-100">{t('bot.support.tipTitle')}</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm bg-blue-50 dark:bg-blue-900/30 p-3 rounded">
            {(() => {
              const tips = getAnxietyTips();
              return tips[Math.floor(Math.random() * tips.length)];
            })()}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-gray-800 dark:text-gray-100">{t('bot.support.faqTitle')}</h3>

          <details className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-4 rounded-lg">
            <summary className="font-medium cursor-pointer text-gray-800 dark:text-gray-200">
              {t('bot.support.panicQuestion')}
            </summary>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {t('bot.support.panicAnswer')}
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-4 rounded-lg">
            <summary className="font-medium cursor-pointer text-gray-800 dark:text-gray-200">
              {t('bot.support.examFearQuestion')}
            </summary>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {t('bot.support.examFearAnswer')}
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-4 rounded-lg">
            <summary className="font-medium cursor-pointer text-gray-800 dark:text-gray-200">{t('bot.support.changeInstructorQuestion')}</summary>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {t('bot.support.changeInstructorAnswer')}
            </p>
          </details>
        </div>

        {/* Кнопка для открытия формы сообщения */}
        <button 
          onClick={() => setShowSupportForm(!showSupportForm)}
          className="w-full bg-green-600 dark:bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <MessageCircle size={20} />
          <span>{showSupportForm ? t('bot.support.hideForm') : t('bot.support.writePsychologist')}</span>
        </button>

        {/* Форма для отправки сообщения психологу */}
        {showSupportForm && (
          <div className="bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-700 rounded-lg p-5 mt-4">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-4">
              {t('bot.support.writeTitle')}
            </h3>
            
            <div className="space-y-4">
              {/* Информационное сообщение */}
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  💬 {t('bot.support.info')}
                </p>
              </div>

              {/* Поле для ввода сообщения */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('bot.support.yourMessage')}
                </label>
                <textarea
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder={t('bot.support.messagePlaceholder')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 resize-none"
                  rows={6}
                />
              </div>

              {/* Кнопки */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSupportForm(false);
                    setSupportMessage('');
                    setError(null);
                  }}
                  className="flex-1 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium"
                >
                  {t('bot.support.cancel')}
                </button>
                <button
                  onClick={async () => {
                    if (!user?.id || !supportMessage.trim() || loading) {
                      setError(t('bot.errors.fillAllFields'));
                      return;
                    }
                    try {
                      setLoading(true);
                      setError(null);
                      await BotService.sendSupportMessage(user.id, supportMessage.trim());
                      // Очищаем форму
                      setSupportMessage('');
                      setShowSupportForm(false);
                      // Показываем сообщение об успехе
                      alert(t('bot.support.thanks'));
                      // Загружаем обновленный список сообщений
                      const updated = await BotService.getSupportMessages(user.id);
                      setSupportMessages(updated);
                    } catch (err) {
                      console.error('Error sending support message:', err);
                      setError(t('bot.errors.sendMessageFailed'));
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={!supportMessage.trim() || loading}
                  className="flex-1 py-3 rounded-lg bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
                >
                  {loading ? t('bot.support.sending') : t('bot.support.send')}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-3">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* История сообщений */}
        {supportMessages.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">{t('bot.support.yourMessages')}</h3>
            <div className="space-y-3">
              {supportMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MessageCircle size={18} className="text-blue-500 dark:text-blue-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(msg.created_at).toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : i18n.language === 'et' ? 'et-EE' : 'en-US', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      msg.status === 'answered' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : msg.status === 'pending'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {msg.status === 'answered' ? t('bot.support.answered') : msg.status === 'pending' ? t('bot.support.pending') : t('bot.support.closed')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{msg.message}</p>
                  {msg.response && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">💚</span>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-1">
                            {t('bot.support.psychologistResponse')}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 bg-green-50 dark:bg-green-900/20 p-3 rounded">
                            {msg.response}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="max-w-md mx-auto bg-gray-50 dark:bg-[hsl(220,35%,3%)] min-h-screen p-4 transition-colors duration-200 relative"
    >
      {screen === 'welcome' && renderWelcome()}
      {screen === 'anxiety' && renderAnxietyTest()}
      {screen === 'menu' && renderMenu()}
      {screen === 'instructors' && renderInstructors()}
      {screen === 'progress' && renderProgress()}
      {screen === 'testimonials' && renderTestimonials()}
      {screen === 'support' && renderSupport()}
      {screen === 'booking-success' && renderBookingSuccess()}

      {/* Модальное окно для записи на занятие */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('bot.booking.title')}</h3>
              <button
                onClick={() => {
                  setShowBookingForm(false);
                  setBookingDate('');
                  setBookingTime('');
                  setError(null);
                }}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Информация об инструкторе */}
              {selectedInstructor && (
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <span className="font-semibold">{t('bot.booking.instructorLabel')}</span>{' '}
                    {instructors.find(i => i.id === selectedInstructor)?.name || t('bot.booking.notSelected')}
                  </p>
                </div>
              )}

              {/* Тип занятия */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('bot.booking.lessonType')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setBookingType('theory')}
                    className={`p-4 rounded-lg border-2 transition ${
                      bookingType === 'theory'
                        ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">📚</div>
                    <div className={`font-semibold ${bookingType === 'theory' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                      {t('bot.booking.theory')}
                    </div>
                  </button>
                  <button
                    onClick={() => setBookingType('driving')}
                    className={`p-4 rounded-lg border-2 transition ${
                      bookingType === 'driving'
                        ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">🚗</div>
                    <div className={`font-semibold ${bookingType === 'driving' ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'}`}>
                      {t('bot.booking.practice')}
                    </div>
                  </button>
                </div>
              </div>

              {/* Дата */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('bot.booking.date')}
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </div>

              {/* Время */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('bot.booking.time')}
                </label>
                <input
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </div>

              {/* Информация */}
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  💡 {t('bot.booking.info')}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-3">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}

              {/* Кнопки */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowBookingForm(false);
                    setBookingDate('');
                    setBookingTime('');
                    setError(null);
                  }}
                  className="flex-1 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium"
                >
                  {t('bot.booking.cancel')}
                </button>
                <button
                  onClick={handleSubmitBooking}
                  disabled={!bookingDate || !bookingTime || loading}
                  className="flex-1 py-3 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
                >
                  {loading ? t('bot.booking.booking') : t('bot.booking.book')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrivingSchoolBot;
