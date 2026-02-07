import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, User, BarChart3, Heart, Star, Video, Calendar, CheckCircle, Plus, Minus, FileText, X } from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { BotService } from '../../services/botService';
import { AuthService } from '../../services/authService';
import { supabase } from '../../lib/supabase';
import type { BotUser, Instructor, Review, Progress, Skill } from '../../types/bot';
import type { User as AuthUser } from '@supabase/supabase-js';

const DrivingSchoolBot = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  // Determine theme mode from Material-UI theme
  const isDarkMode = theme.palette.mode === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  // All states must be declared first
  const [screen, setScreen] = useState('welcome');
  const [anxietyLevel, setAnxietyLevel] = useState(0);
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState<BotUser | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmingInstructor, setConfirmingInstructor] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false); // For System 2: progress details
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
  
  // States for counter animation (social proof)
  const [studentsCount] = useState(500);
  const [passRate, setPassRate] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  
  // Automatically save screen to localStorage on change
  useEffect(() => {
    if (user && screen !== 'welcome') {
      localStorage.setItem('bot_screen', screen);
    }
  }, [screen, user]);
  
  // Function for logout (clear data and sign out from Supabase Auth)
  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      localStorage.removeItem('bot_user_id');
      localStorage.removeItem('bot_user_name');
      localStorage.removeItem('bot_anxiety_level');
      localStorage.removeItem('bot_screen');
      setUser(null);
      setAuthUser(null);
      setUserName('');
      setAnxietyLevel(0);
      setScreen('welcome');
    } catch (err) {
      console.error('Error signing out:', err);
      // Still clear local data
      localStorage.removeItem('bot_user_id');
      localStorage.removeItem('bot_user_name');
      localStorage.removeItem('bot_anxiety_level');
      localStorage.removeItem('bot_screen');
      setUser(null);
      setAuthUser(null);
      setUserName('');
      setAnxietyLevel(0);
      setScreen('welcome');
    }
  };
  
  // Sync dark class with Material-UI theme
  useEffect(() => {
    const rootElement = document.documentElement;
    const container = containerRef.current;
    
    // Always remove class first to avoid conflicts
    rootElement.classList.remove('dark');
    if (container) {
      container.classList.remove('dark');
    }
    
    // Then add if dark theme is needed
    if (isDarkMode) {
      rootElement.classList.add('dark');
      if (container) {
        container.classList.add('dark');
      }
    }
  }, [isDarkMode]);

  // Auto scroll to top on screen change
  useEffect(() => {
    // Scroll to top when transitioning to new screen
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Also scroll bot container if it exists
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [screen]);

  // Initialize authentication and load user
  useEffect(() => {
    const initAuth = async () => {
      try {
        setAuthLoading(true);

        // If Supabase isn't configured in this environment, don't hang on auth calls.
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey && 
          supabaseUrl !== 'https://placeholder.supabase.co' && 
          supabaseKey !== 'placeholder-key');
        
        if (!isSupabaseConfigured) {
          console.error('⚠️ Supabase environment variables are not configured!');
          setError('Supabase is not configured. Please check Vercel environment variables.');
          setScreen('welcome');
          setAuthLoading(false);
          return;
        }
        
        // Handle OAuth redirect - check for token in URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const hasAccessToken = hashParams.get('access_token');
        
        if (hasAccessToken) {
          console.log('OAuth callback detected, processing...');
          // Add timeout for OAuth callback (max 20 seconds for Vercel)
          const oauthPromise = AuthService.handleOAuthCallback();
          const timeoutPromise = new Promise<{ user: null; error: Error }>((resolve) => {
            setTimeout(() => {
              resolve({ user: null, error: new Error('OAuth callback timeout - please try again') });
            }, 20000); // Увеличено до 20 секунд для Vercel
          });
          
          const oauthResult = await Promise.race([oauthPromise, timeoutPromise]);
          
          if (oauthResult.error) {
            console.error('OAuth callback error:', oauthResult.error);
            setError(oauthResult.error.message || 'Failed to authenticate. Please try again.');
            setAuthLoading(false);
            return;
          }
          
          if (oauthResult.user) {
            console.log('OAuth authentication successful:', oauthResult.user.email);
            // User successfully authenticated via OAuth
            setAuthUser(oauthResult.user);
            
            // Get or create bot profile
            try {
              const botProfile = await BotService.getOrCreateBotProfile(oauthResult.user);
              setUser(botProfile);
              setUserName(botProfile.name || oauthResult.user.email?.split('@')[0] || '');
              
              // Restore selected instructor if it was set
              if (botProfile.selected_instructor_id) {
                setSelectedInstructor(botProfile.selected_instructor_id);
              }
              
              // Restore anxiety level if it was set
              if (botProfile.anxiety_level) {
                setAnxietyLevel(botProfile.anxiety_level);
              }
              
              // Determine screen
              if (botProfile.anxiety_level && botProfile.anxiety_level > 0) {
                setScreen('menu');
              } else {
                setScreen('anxiety');
              }
            } catch (err) {
              console.error('Error loading bot profile:', err);
              setError('Failed to load profile. Please try again.');
            }
            
            setAuthLoading(false);
            return;
          } else {
            console.warn('OAuth callback processed but no user found');
          }
        }
        
        // Check current session (for regular login) with timeout
        const getUserPromise = AuthService.getCurrentUser();
        const timeoutPromise = new Promise<AuthUser | null>((resolve) => {
          setTimeout(() => {
            console.warn('getCurrentUser timeout - Supabase may not be responding');
            resolve(null);
          }, 5000); // 5 second timeout
        });
        
        const currentUser = await Promise.race([getUserPromise, timeoutPromise]);
        
        if (currentUser) {
          setAuthUser(currentUser);
          
          // Get or create bot profile
          try {
            const botProfile = await BotService.getOrCreateBotProfile(currentUser);
            setUser(botProfile);
            setUserName(botProfile.name || currentUser.email?.split('@')[0] || '');
            
            // Restore selected instructor if it was set
            if (botProfile.selected_instructor_id) {
              setSelectedInstructor(botProfile.selected_instructor_id);
            }
            
            // Restore anxiety level if it was set
            if (botProfile.anxiety_level) {
              setAnxietyLevel(botProfile.anxiety_level);
            }
            
            // Determine screen
            const savedScreen = localStorage.getItem('bot_screen');
            if (botProfile.anxiety_level && botProfile.anxiety_level > 0) {
              if (savedScreen && ['menu', 'instructors', 'progress', 'testimonials', 'support'].includes(savedScreen)) {
                setScreen(savedScreen);
              } else {
                setScreen('menu');
              }
            } else {
              setScreen('anxiety');
            }
          } catch (err) {
            console.error('Error loading bot profile:', err);
            setError('Failed to load profile. Please try again.');
          }
        } else {
          // User is not authenticated
          setScreen('welcome');
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        setScreen('welcome');
      } finally {
        setAuthLoading(false);
      }
    };

    initAuth();

    // Subscribe to authentication changes (only if Supabase is configured)
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey && 
      supabaseUrl !== 'https://placeholder.supabase.co' && 
      supabaseKey !== 'placeholder-key');
    
    if (!isSupabaseConfigured) {
      console.warn('Skipping auth state change subscription - Supabase not configured');
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      if (user) {
        setAuthUser(user);
        try {
          const botProfile = await BotService.getOrCreateBotProfile(user);
          setUser(botProfile);
          setUserName(botProfile.name || user.email?.split('@')[0] || '');
        } catch (err) {
          console.error('Error loading bot profile:', err);
        }
      } else {
        setAuthUser(null);
        setUser(null);
        setUserName('');
        setScreen('welcome');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Load instructors
  useEffect(() => {
    const loadInstructors = async () => {
      // Fallback instructor data (if failed to load from Supabase)
      const fallbackInstructors: Instructor[] = [
        {
          id: 'igor-1',
          name: 'Igor Nagorski',
          style: 'Founder and director of the driving school "Viktorija", experienced driving instructor',
          experience: 'Many years of experience',
          pass_rate: '95%',
          photo_url: '/igor-ready.png',
          reviews_count: 0,
          rating: 5.0,
          specialty: 'Founder of a driving school, professional driver training. Car: Toyota Corolla',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 'stas-1',
          name: 'Stanislav Zigadlo',
          style: 'Driving instructor, 18 years of teaching experience',
          experience: '18 aastat',
          pass_rate: '93%',
          photo_url: '/stas-ready.png',
          reviews_count: 0,
          rating: 4.9,
          specialty: 'Professional driver training. Vehicle: Skoda Octavia',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      try {
        const data = await BotService.getInstructors();
        if (data && data.length > 0) {
          setInstructors(data);
          setError(null); // Clear error on successful load
        } else {
          // If no data in DB, use fallback
          console.warn('Instructors not found in the database, using fallback data');
          setInstructors(fallbackInstructors);
          setError(null); // Don't show error if fallback data exists
        }
      } catch (err: any) {
        console.error('Error loading instructors:', err);
        
        // Check if error is a Supabase connection issue
        const isConnectionError = err?.message?.includes('Failed to fetch') || 
                                  err?.message?.includes('ERR_NAME_NOT_RESOLVED') ||
                                  err?.code === 'ENOTFOUND';
        
        if (isConnectionError) {
          const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
          const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
          
          if (!supabaseUrl || !supabaseKey) {
            console.error(`
⚠️ CRITICAL: Supabase environment variables are not set!

This usually means:
1. Variables are not configured in Vercel (Settings → Environment Variables)
2. Project was not rebuilt after adding variables
3. Variable names are incorrect (must start with VITE_)


            `);
          } else {
            console.error(`
⚠️ Supabase connection failed even though variables are set.

Check:
1. VITE_SUPABASE_URL is correct: ${supabaseUrl}
2. CORS is configured in Supabase for Vercel domain
3. Network connectivity


            `);
          }
        }
        
        // Use fallback data instead of showing error
        setInstructors(fallbackInstructors);
        setError(null); // Don't show error to user if fallback data exists
      }
    };
    loadInstructors();
  }, []);

  // Load testimonials
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await BotService.getTestimonials(10);
        setTestimonials(data);
      } catch (err: any) {
        console.error('Error loading reviews:', err);
        
        // Check if error is a Supabase connection issue
        const isConnectionError = err?.message?.includes('Failed to fetch') || 
                                  err?.message?.includes('ERR_NAME_NOT_RESOLVED') ||
                                  err?.code === 'ENOTFOUND';
        
        if (isConnectionError) {
          const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
          const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
          
          if (!supabaseUrl || !supabaseKey) {
            console.error('⚠️ Supabase environment variables are not configured. ');
          }
        }
      }
    };
    loadTestimonials();
  }, []);

  // Counter animation for social proof
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

  // Load support messages when support page opens
  useEffect(() => {
    const loadSupportMessages = async () => {
      if (!authUser || screen !== 'support') return;
      try {
        const messages = await BotService.getSupportMessages(authUser.id);
        setSupportMessages(messages);
      } catch (err) {
        console.error('Error loading support messages:', err);
      }
    };
    loadSupportMessages();
  }, [authUser, screen]);

  // Load progress when user logs in
  useEffect(() => {
    const loadProgress = async () => {
      if (!authUser) return;
      try {
        const userProgress = await BotService.getProgress(authUser.id);
        if (userProgress) {
          setProgress(userProgress);
        } else {
          // Create initial progress
          const newProgress = await BotService.upsertProgress(authUser.id, {
            theory_progress: 0,
            driving_progress: 0,
            completed_lessons: 0,
            total_lessons: 28,
          });
          setProgress(newProgress);
        }

        // Load skills
        const userSkills = await BotService.getSkills(authUser.id);
        if (userSkills.length === 0) {
          // Create initial skills
          const defaultSkills = [
            t('bot.progress.skillNames.parking'),
            t('bot.progress.skillNames.laneChange'),
            t('bot.progress.skillNames.uTurn'),
            t('bot.progress.skillNames.reverse'),
            t('bot.progress.skillNames.examRoute'),
          ];
          for (const skillName of defaultSkills) {
            await BotService.createSkill(authUser.id, skillName);
          }
          const updatedSkills = await BotService.getSkills(authUser.id);
          setSkills(updatedSkills);
        } else {
          setSkills(userSkills);
        }
      } catch (err) {
        console.error('Error loading progress:', err);
      }
    };
    loadProgress();
  }, [authUser, t]);

  // Sign in with Google
  const handleSignInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await AuthService.signInWithGoogle();
      if (error) {
        setError(error.message || 'Failed to sign in with Google');
      }
      // Redirect will happen automatically
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleAnxietySubmit = async () => {
    if (!anxietyLevel || !authUser) return;

    setLoading(true);
    try {
      await BotService.saveAnxietyTest(authUser.id, anxietyLevel);
      
      // Save anxiety level and screen to localStorage
      localStorage.setItem('bot_anxiety_level', anxietyLevel.toString());
      localStorage.setItem('bot_screen', 'menu');
      
      setScreen('menu');
    } catch (err) {
      console.error('Error saving test:', err);
      setError('Failed to save test result');
    } finally {
      setLoading(false);
    }
  };

  // Handle instructor selection
  const handleSelectInstructor = async (instructorId: string) => {
    if (!authUser) {
      setError('You must log in');
      return;
    }

    setConfirmingInstructor(instructorId);
    setShowConfirmation(true);
  };

  // Confirm instructor selection
  const handleConfirmInstructor = async () => {
    if (!confirmingInstructor || !authUser) return;

    setLoading(true);
    setError(null);

    try {
      await BotService.saveSelectedInstructor(authUser.id, confirmingInstructor);
      setSelectedInstructor(confirmingInstructor);
      setShowConfirmation(false);
      setConfirmingInstructor(null);
      
      // Update user data
      if (authUser) {
        const updatedProfile = await BotService.getOrCreateBotProfile(authUser);
        setUser(updatedProfile);
      }
    } catch (err) {
      console.error('Error saving instructor:', err);
      setError('Failed to save instructor selection. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookLesson = async () => {
    if (!authUser) {
      setError('Log in');
      return;
    }

    if (!selectedInstructor) {
      setError('First, choose an instructor');
      setScreen('instructors');
      return;
    }

    // Open booking form
    setShowBookingForm(true);
  };

  const handleSubmitBooking = async () => {
    if (!authUser || !selectedInstructor || !bookingDate || !bookingTime) {
      setError(t('bot.booking.fillAll'));
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Combine date and time
      const dateTime = new Date(`${bookingDate}T${bookingTime}`);
      
      // Check that the date is not in the past
      if (dateTime < new Date()) {
        setError('Cannot book a lesson in the past');
        setLoading(false);
        return;
      }

      await BotService.bookLesson(
        authUser.id,
        selectedInstructor,
        dateTime.toISOString(),
        bookingType
      );

      // Save booking information for confirmation screen
      const instructorName = instructors.find(i => i.id === selectedInstructor)?.name || 'Instructor';
      setBookingSuccess({
        instructorName,
        date: bookingDate,
        time: bookingTime,
        type: bookingType,
      });

      // Clear form
      setBookingDate('');
      setBookingTime('');
      setBookingType('driving');
      setShowBookingForm(false);

      // Navigate to confirmation screen
      setScreen('booking-success');
    } catch (err) {
      console.error('Error booking lesson:', err);
      setError(t('bot.errors.bookingFailed'));
    } finally {
      setLoading(false);
    }
  };

  // Localized tips (will be loaded from i18n)
  const getAnxietyTips = () => {
    try {
      return t('bot.support.tips', { returnObjects: true }) as string[];
    } catch {
      // Fallback to English tips if localization not loaded
      return [
        'Breathe deeply before starting the lesson - inhale for 4 seconds, exhale for 6 seconds',
"Remember: mistakes are part of learning, don't beat yourself up",
'Visualize successfully completing a maneuver before performing it',
"If you feel panicked, tell the instructor, we'll stop and breathe",
      ];
    }
  };

  const renderWelcome = () => {
    if (authLoading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-4">⏳</div>
            <p className="text-gray-600 dark:text-gray-400">{t('bot.common.loading')}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* ============================================
            DUAL PROCESS THEORY: System 1 (Intuitive) + System 2 (Deliberate)
            Support for both types of thinking
        ============================================ */}
        
        {/* System 1: Visual cues for quick understanding */}
        <div className="text-center space-y-4">
          {/* Visual indicator - icon for System 1 */}
          <div className="relative inline-block">
            <div className="text-4xl sm:text-5xl md:text-6xl animate-bounce">🚗</div>
            {/* Visual cue - badge for System 1 */}
            <div className="absolute -top-1 -right-1 bg-green-500 dark:bg-green-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
              {t('bot.welcome.freeBadge')}
            </div>
          </div>
          
          {/* System 1: Emotional headline for quick perception */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight px-2">
            {t('bot.welcome.title')}
          </h1>
          
          {/* System 2: Additional information for deliberate decision */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto px-2">
            {t('bot.welcome.subtitle')}
          </p>
        </div>

        {/* Main form - support for both systems */}
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-lg p-3 mb-4 flex items-start gap-2">
              <span className="text-red-500 text-lg">⚠️</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">{t('bot.common.error')}</p>
                <p className="text-xs text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          )}

          {/* System 1: Bright CTA button for Google sign in */}
          <button
            onClick={handleSignInWithGoogle}
            disabled={loading}
            className={`w-full py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg transform mb-4 ${
              !loading
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:scale-[1.02] active:scale-[0.98]'
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
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Login via Google</span>
              </span>
            )}
          </button>

          {/* System 1: Visual cues for quick scanning */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <span className="text-green-500 text-sm sm:text-base">✓</span>
              <span className="font-medium">{t('bot.welcome.free')}</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <span className="text-green-500 text-sm sm:text-base">✓</span>
              <span className="font-medium">Secure login</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <span className="text-green-500 text-sm sm:text-base">✓</span>
              <span className="font-medium">{t('bot.welcome.quickStart')}</span>
            </span>
          </div>
        </div>

        {/* System 1: Visual social proof for quick trust */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl text-center border-2 border-blue-200 dark:border-blue-700 transform hover:scale-105 transition cursor-default">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">
              {passRate}%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
              {t('bot.welcome.passFirstTime')}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
              <span>⭐</span> {t('bot.welcome.bestResult')}
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl text-center border-2 border-green-200 dark:border-green-700 transform hover:scale-105 transition cursor-default">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-1 sm:mb-2">
              {studentsCount}+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
              {t('bot.welcome.satisfiedStudents')}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
              <span>💚</span> {t('bot.welcome.highRating')}
            </div>
          </div>
        </div>

        {/* System 1: Visual urgency cue for emotional trigger */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 border-2 border-orange-300 dark:border-orange-700 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-lg sm:text-xl animate-pulse">⚡</span>
            <p className="text-xs sm:text-sm font-bold text-orange-800 dark:text-orange-200">
              {t('bot.welcome.todaySignedUp', { count: todayCount })}
            </p>
          </div>
          <p className="text-[10px] sm:text-xs text-orange-700 dark:text-orange-300">
            {t('bot.welcome.spotsLeftPrefix')} <span className="font-bold text-sm sm:text-base">5</span> {t('bot.welcome.spotsLeftSuffix')}
            </p>
        </div>

        {/* System 2: Additional information for deliberate decision (hidden by default) */}
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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Heart className="text-red-500 dark:text-red-400 flex-shrink-0" size={28} />
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">{t('bot.anxiety.title')}</h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t('bot.anxiety.subtitle')}</p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">How nervous are you about driving?</p>

        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => setAnxietyLevel(level)}
              className={`w-full p-3 sm:p-4 rounded-lg border-2 transition ${
                anxietyLevel === level
                  ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-xs sm:text-sm text-gray-800 dark:text-gray-200 text-left break-words">
                  {level === 1 && t('bot.anxiety.level1')}
                  {level === 2 && t('bot.anxiety.level2')}
                  {level === 3 && t('bot.anxiety.level3')}
                  {level === 4 && t('bot.anxiety.level4')}
                  {level === 5 && t('bot.anxiety.level5')}
                </span>
                <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
                  {[...Array(level)].map((_, i) => (
                    <Heart key={i} size={14} className="fill-red-400 dark:fill-red-500 text-red-400 dark:text-red-500" />
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleAnxietySubmit}
          disabled={!anxietyLevel || loading}
          className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-blue-700 dark:hover:bg-blue-600 transition disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          {loading ? t('bot.common.loading') : t('bot.anxiety.continue')}
        </button>
      </div>

      {/* Support phrases depending on anxiety level */}
      {anxietyLevel > 0 && (() => {
        const supportMessages = {
          1: {
            icon: '🎉',
            bgColor: 'bg-blue-50 dark:bg-blue-900/30',
            borderColor: 'border-blue-200 dark:border-blue-700',
            textColor: 'text-blue-800 dark:text-blue-200',
            message: "Excellent! You're confident. We'll help you hone your skills and become an even more confident driver."
          },
          2: {
            icon: '👍',
            bgColor: 'bg-green-50 dark:bg-green-900/30',
            borderColor: 'border-green-200 dark:border-green-700',
            textColor: 'text-green-800 dark:text-green-200',
            message: "We understand your anxiety—it's normal! Our instructors will help you feel comfortable behind the wheel."
          },
          3: {
            icon: '✅',
            bgColor: 'bg-green-50 dark:bg-green-900/30',
            borderColor: 'border-green-200 dark:border-green-700',
            textColor: 'text-green-800 dark:text-green-200',
            message: "We understand how challenging this can be. Our experienced instructors will create a safe and supportive environment for your learning. You're not alone!"
          },
          4: {
            icon: '💚',
            bgColor: 'bg-emerald-50 dark:bg-emerald-900/30',
            borderColor: 'border-emerald-200 dark:border-emerald-700',
            textColor: 'text-emerald-800 dark:text-emerald-200',
            message: "We understand how challenging this can be. Our experienced instructors will create a safe and supportive environment for your learning. You're not alone!"
          },
          5: {
            icon: '🤝',
            bgColor: 'bg-purple-50 dark:bg-purple-900/30',
            borderColor: 'border-purple-200 dark:border-purple-700',
            textColor: 'text-purple-800 dark:text-purple-200',
            message: "We deeply understand your situation. Our team has experience working with traumatic experiences. You'll receive maximum support, a personalized approach, and as much time as you need. We'll help you overcome your fears step by step."
          }
        };

        const support = supportMessages[anxietyLevel as keyof typeof supportMessages];
        if (!support) return null;

        return (
          <div className={`${support.bgColor} border ${support.borderColor} rounded-lg p-3 sm:p-4`}>
            <p className={`text-xs sm:text-sm ${support.textColor} flex items-start gap-2`}>
              <span className="text-base sm:text-lg flex-shrink-0">{support.icon}</span>
              <span className="break-words">{support.message}</span>
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
      
      {/* CUE: Bright visual signal - personalized greeting */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-500 dark:via-blue-600 dark:to-purple-500 text-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 -mt-12 sm:-mr-16 sm:-mt-16 animate-pulse"></div>
        <div className="relative pr-16 sm:pr-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl sm:text-3xl animate-bounce">👋</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold break-words">{t('bot.menu.greeting')}, {userName}!</h2>
          </div>
          <p className="text-blue-100 dark:text-blue-200 text-sm sm:text-base mb-1 font-medium">
            {t('bot.menu.greeting')}
          </p>
          <p className="text-blue-200 dark:text-blue-300 text-xs sm:text-sm">
            {t('bot.menu.simple')}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-blue-100 dark:text-blue-200 hover:text-white text-xs sm:text-sm font-medium transition-colors px-2 py-1"
          title="Sign out"
        >
          {t('bot.common.logout')}
        </button>
      </div>

      {/* REACTION: Emotional trigger - show value of actions */}
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

      {/* EVALUATION: Show benefits of each function - vertical layout */}
      <div className="space-y-4">
        <button
          onClick={() => setScreen('instructors')}
          className="w-full bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl transition-all transform hover:scale-[1.01] group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full -mr-8 -mt-8 sm:-mr-12 sm:-mt-12 group-hover:scale-150 transition-transform"></div>
          <div className="relative flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="flex-shrink-0 p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg sm:rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition">
              <User className="text-blue-600 dark:text-blue-400" size={32} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-200 mb-1">
                {t('bot.menu.selectInstructor')}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                {t('bot.menu.selectInstructorDesc')}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
                <div className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                  {t('bot.menu.selectInstructorBadge')}
                </div>
                <span className="text-blue-600 dark:text-blue-400 font-medium text-xs sm:text-sm sm:ml-auto">
                  {t('bot.menu.selectInstructorAction')} →
                </span>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setScreen('progress')}
          className="w-full bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-700 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl hover:border-green-500 dark:hover:border-green-400 hover:shadow-xl transition-all transform hover:scale-[1.01] group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-green-100 dark:bg-green-900/30 rounded-full -mr-8 -mt-8 sm:-mr-12 sm:-mt-12 group-hover:scale-150 transition-transform"></div>
          <div className="relative flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="flex-shrink-0 p-2 sm:p-3 bg-green-50 dark:bg-green-900/30 rounded-lg sm:rounded-xl group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition">
              <BarChart3 className="text-green-600 dark:text-green-400" size={32} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-200 mb-1">
                {t('bot.menu.progress')}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                {t('bot.menu.progressDesc')}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
                <div className="text-[10px] sm:text-xs text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-900/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                  {t('bot.menu.progressBadge')}
                </div>
                <span className="text-green-600 dark:text-green-400 font-medium text-xs sm:text-sm sm:ml-auto">
                  {t('bot.menu.progressAction')} →
                </span>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setScreen('testimonials')}
          className="w-full bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-700 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-xl transition-all transform hover:scale-[1.01] group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full -mr-8 -mt-8 sm:-mr-12 sm:-mt-12 group-hover:scale-150 transition-transform"></div>
          <div className="relative flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="flex-shrink-0 p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg sm:rounded-xl group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition">
              <Video className="text-purple-600 dark:text-purple-400" size={32} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-200 mb-1">
                {t('bot.menu.testimonials')}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                {t('bot.menu.testimonialsDesc')}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
                <div className="text-[10px] sm:text-xs text-purple-600 dark:text-purple-400 font-semibold bg-purple-50 dark:bg-purple-900/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                  {t('bot.menu.testimonialsBadge')}
                </div>
                <span className="text-purple-600 dark:text-purple-400 font-medium text-xs sm:text-sm sm:ml-auto">
                  {t('bot.menu.testimonialsAction')} →
                </span>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setScreen('support')}
          className="w-full bg-white dark:bg-gray-800 border-2 border-red-200 dark:border-red-700 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl hover:border-red-500 dark:hover:border-red-400 hover:shadow-xl transition-all transform hover:scale-[1.01] group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-red-100 dark:bg-red-900/30 rounded-full -mr-8 -mt-8 sm:-mr-12 sm:-mt-12 group-hover:scale-150 transition-transform"></div>
          <div className="relative flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="flex-shrink-0 p-2 sm:p-3 bg-red-50 dark:bg-red-900/30 rounded-lg sm:rounded-xl group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition">
              <Heart className="text-red-600 dark:text-red-400" size={32} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-200 mb-1">
                {t('bot.menu.support')}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                {t('bot.menu.supportDesc')}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
                <div className="text-[10px] sm:text-xs text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-900/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                  {t('bot.menu.supportBadge')}
                </div>
                <span className="text-red-600 dark:text-red-400 font-medium text-xs sm:text-sm sm:ml-auto">
                  {t('bot.menu.supportAction')} →
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* TIMING: Show that now is the right time for action */}
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

      {/* ABILITY: Show simplicity of action */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
        <p className="text-xs text-blue-800 dark:text-blue-200 text-center">
          💡 <span className="font-medium">{t('bot.menu.simple')}</span>
        </p>
      </div>

      {/* EXECUTION: Main CTA button - bright and noticeable */}
      <button
        onClick={handleBookLesson}
        className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-500 dark:via-blue-600 dark:to-purple-500 text-white py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:via-blue-700 dark:hover:to-purple-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <Calendar size={20} className="relative z-10" />
        <span className="relative z-10">{t('bot.menu.bookLesson')}</span>
        <span className="text-lg sm:text-xl md:text-2xl relative z-10">→</span>
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

        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">{t('bot.instructors.title')}</h2>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-3 text-red-800 dark:text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Confirmation of selection */}
        {showConfirmation && confirmingInstructor && (
          <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-600 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 mb-3 sm:mb-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl flex-shrink-0">✅</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-blue-900 dark:text-blue-100 mb-2">
                  Confirm instructor selection
                </h3>
                <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 mb-3 sm:mb-4 break-words">
                  Do you want to select <span className="font-semibold">{getSelectedInstructorName()}</span> as your instructor?
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={handleConfirmInstructor}
                    disabled={loading}
                    className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-700 dark:hover:bg-blue-600 transition disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : 'Yes, select'}
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmation(false);
                      setConfirmingInstructor(null);
                    }}
                    disabled={loading}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected instructor indicator */}
        {selectedInstructor && !showConfirmation && (
          <div className="bg-green-50 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-600 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl flex-shrink-0">✓</span>
              <p className="text-xs sm:text-sm text-green-800 dark:text-green-200 break-words">
                <span className="font-semibold">Selected:</span> {instructors.find(i => i.id === selectedInstructor)?.name || 'Instructor'}
              </p>
            </div>
          </div>
        )}

        {instructors.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading instructors...</div>
        ) : (
          instructors.map((instructor) => {
            const isSelected = selectedInstructor === instructor.id;
            const isConfirming = confirmingInstructor === instructor.id;

            return (
              <div
                key={instructor.id}
                className={`border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 transition ${
                  isSelected
                    ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30'
                    : isConfirming
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
                  {instructor.photo_url && (instructor.photo_url.startsWith('/') || instructor.photo_url.startsWith('http')) ? (
                    <img 
                      src={instructor.photo_url} 
                      alt={instructor.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0 mx-auto sm:mx-0"
                    />
                  ) : (
                    <div className="text-4xl sm:text-5xl flex-shrink-0 mx-auto sm:mx-0">{instructor.photo_url || '👨‍🏫'}</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100 break-words">{instructor.name}</h3>
                      {isSelected && (
                        <span className="bg-green-500 dark:bg-green-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full self-start sm:self-auto">
                          SELECTED
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 break-words">{instructor.style}</p>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
                      <span className="flex items-center gap-1">
                        <span>⭐</span>
                        <span className="font-semibold">{instructor.rating.toFixed(1)}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span>📝</span>
                        <span>{instructor.reviews_count} reviews</span>
                      </span>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
                      <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-1">Pass on first try</div>
                      <div className="font-bold text-base sm:text-lg text-green-600 dark:text-green-400">{instructor.pass_rate}</div>
                    </div>

                    {instructor.specialty && (
                      <div className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 font-medium mb-2 sm:mb-3 break-words">
                        ✨ {instructor.specialty}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  {!isSelected ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectInstructor(instructor.id);
                      }}
                      disabled={loading || showConfirmation}
                      className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-700 dark:hover:bg-blue-600 transition disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                    >
                      {isConfirming ? 'Confirming...' : 'Select instructor'}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 bg-green-600 dark:bg-green-500 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base cursor-default"
                    >
                      ✓ Selected
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Open video testimonials
                    }}
                    className="px-3 sm:px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-gray-300 dark:hover:bg-gray-600 transition"
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

  // Function to localize skill names
  const getLocalizedSkillName = (skillName: string): string => {
    const skillNameMap: { [key: string]: string } = {
      'Parking': t('bot.progress.skillNames.parking'),
      'Lane change': t('bot.progress.skillNames.laneChange'),
      'U-turn': t('bot.progress.skillNames.uTurn'),
      'Reverse driving': t('bot.progress.skillNames.reverse'),
      'Exam route': t('bot.progress.skillNames.examRoute'),
      // English versions (in case already saved)
      // Estonian versions
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

    // MOTIVATION: Motivational messages depending on progress
    const getMotivationMessage = () => {
      if (progressPercentage === 0) {
        return {
          icon: '🚀',
          title: 'Start your journey to freedom!',
          message: "Your first lesson is your first step toward independence. You're already on the right path!",
          bgClass: 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30',
          borderClass: 'border-blue-200 dark:border-blue-700'
        };
      } else if (progressPercentage < 25) {
        return {
          icon: '💪',
          title: 'Great start!',
          message: "You've already started! Every lesson brings you closer to getting your license.",
          bgClass: 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30',
          borderClass: 'border-green-200 dark:border-green-700'
        };
      } else if (progressPercentage < 50) {
        return {
          icon: '⭐',
          title: "You're a quarter of the way there.!",
          message: "Keep up the good work! You're making great progress.",
          bgClass: 'bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30',
          borderClass: 'border-purple-200 dark:border-purple-700'
        };
      } else if (progressPercentage < 75) {
        return {
          icon: '🎯',
          title: 'More than halfway through!',
          message: "You've already mastered more than half of the program. Just a little bit more to go!",
          bgClass: 'bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30',
          borderClass: 'border-orange-200 dark:border-orange-700'
        };
      } else if (progressPercentage < 100) {
        return {
          icon: '🏁',
          title: 'The finish line!',
          message: "You're almost there! Just a few more lessons until you get your license.",
          bgClass: 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30',
          borderClass: 'border-green-200 dark:border-green-700'
        };
      } else {
        return {
          icon: '🎉',
          title: 'Congratulations!',
          message: "You've completed all the lessons! Ready to take the exam and get your license!",
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
        
        {/* SYSTEM 1: Familiar pattern - "Back" button */}
        <button
          onClick={() => setScreen('menu')}
          className="text-blue-600 dark:text-blue-400 font-medium mb-1 flex items-center gap-1 hover:text-blue-700 dark:hover:text-blue-300 transition"
        >
          <span>←</span> <span>{t('bot.common.back')}</span>
        </button>

        {/* SYSTEM 1: Quick visual understanding - header with icon */}
        <div className="text-center mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
            {userName}
          </h2>
          <div className="inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <BarChart3 size={14} className="text-blue-500 dark:text-blue-400" />
            <span>{t('bot.progress.subtitle')}</span>
          </div>
        </div>

        {/* SYSTEM 1: Quick visual understanding - color status indicator */}
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* SYSTEM 1: Color indicator for instant understanding */}
              <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full animate-pulse ${
                progressPercentage === 100 
                  ? 'bg-green-500 shadow-lg shadow-green-500/50' 
                  : progressPercentage >= 50 
                    ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50'
                    : 'bg-blue-500 shadow-lg shadow-blue-500/50'
              }`}></div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">{t('bot.progress.overall')}</span>
            </div>
            {/* SYSTEM 1: Large number for quick scanning */}
            <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">{Math.round(progressPercentage)}%</div>
          </div>
          
          {/* SYSTEM 1: Visual progress bar with emotional coloring */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5 sm:h-6 md:h-7 mb-2 sm:mb-3 shadow-inner">
            <div
              className={`rounded-full h-5 sm:h-6 md:h-7 transition-all duration-700 shadow-lg ${
                progressPercentage === 100 
                  ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-600' 
                  : progressPercentage >= 50 
                    ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500'
                    : 'bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* SYSTEM 1: Quick scanning of key numbers */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0 text-xs sm:text-sm mb-2 sm:mb-3">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {progress.completed_lessons} / {progress.total_lessons} {t('bot.progress.lessons')}
            </span>
            {remainingLessons > 0 && (
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                {t('bot.progress.remaining', { count: remainingLessons })}
              </span>
            )}
          </div>

          {/* Buttons for manual progress update */}
          <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 w-full sm:w-auto">{t('bot.progress.completedLessonsLabel')}</span>
            <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-center sm:justify-start">
              <button
                onClick={async () => {
                  if (!authUser || loading || progress.completed_lessons <= 0) return;
                  try {
                    setLoading(true);
                    const updated = await BotService.updateProgress(authUser.id, {
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
                className="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Minus size={14} className="text-gray-600 dark:text-gray-400" />
              </button>
              <span className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 min-w-[2rem] text-center">
                {progress.completed_lessons}
              </span>
              <button
                onClick={async () => {
                  if (!authUser || loading || progress.completed_lessons >= progress.total_lessons) return;
                  try {
                    setLoading(true);
                    const updated = await BotService.updateProgress(authUser.id, {
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
                className="p-1.5 sm:p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Plus size={14} className="text-blue-600 dark:text-blue-400" />
              </button>
            </div>
          </div>

          {/* SYSTEM 2: Button to dive into details (optional) */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center justify-center gap-1 mt-2"
          >
            {showDetails ? t('bot.progress.hideDetails') : t('bot.progress.showDetails')}
            <span className="text-base sm:text-lg">{showDetails ? '↑' : '↓'}</span>
          </button>

          {/* SYSTEM 2: Detailed information for analytical thinking */}
          {showDetails && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-[10px] sm:text-xs">
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

        {/* SYSTEM 1: Visual cards with color cues */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition cursor-pointer">
            {/* SYSTEM 1: Icon for quick recognition */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{t('bot.progress.theory')}</span>
            </div>
            {/* SYSTEM 1: Large number for quick scanning */}
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {progress.theory_progress}%
            </div>
            {/* SYSTEM 1: Visual progress bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full h-2.5 transition-all duration-500 shadow-sm"
                style={{ width: `${progress.theory_progress}%` }}
              />
            </div>
            {/* SYSTEM 2: Detailed information on hover */}
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

        {/* SYSTEM 1 + SYSTEM 2: Skills with visual cues */}
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {/* SYSTEM 1: Icon for quick recognition */}
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t('bot.progress.skills')}</span>
            </div>
            {/* SYSTEM 1: Quick progress scanning */}
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {completedSkills}/{totalSkills}
            </span>
          </div>
          {/* Hint for user */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 italic flex items-center gap-1">
            <span>💡</span>
            <span>{t('bot.progress.skillHint')}</span>
          </p>
          {/* SYSTEM 1: Visual progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-full h-2 transition-all duration-500 shadow-sm"
              style={{ width: `${skillsPercentage}%` }}
            />
          </div>
          {/* SYSTEM 1: Checklist with visual indicators */}
          <div className="space-y-2">
            {skills.length === 0 ? (
              <div className="text-gray-400 dark:text-gray-500 text-xs text-center py-2">{t('bot.progress.loading')}</div>
            ) : (
              skills.map((skill) => (
                <div 
                  key={skill.id} 
                  onClick={async () => {
                    if (!authUser || loading) return;
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
                  {/* SYSTEM 1: Interactive checkbox for skill marking */}
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
                  {/* SYSTEM 2: Visual feedback */}
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

        {/* SYSTEM 1: Emotional motivation (quick perception) */}
        {progressPercentage < 100 && progressPercentage > 0 && (
          <div className={`${motivation.bgClass} border-2 ${motivation.borderClass} rounded-lg p-4 shadow-sm`}>
            <div className="flex items-center gap-3">
              {/* SYSTEM 1: Icon for emotional response */}
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

        {/* SYSTEM 1: Simple and clear action button */}
        {progressPercentage < 100 ? (
          <button 
            onClick={handleBookLesson}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-4 rounded-lg font-semibold text-base hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 dark:active:bg-blue-700 transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {/* SYSTEM 1: Visual cue (icon) */}
            <Calendar size={20} />
            <span>{t('bot.progress.bookLesson')}</span>
            {/* SYSTEM 1: Directional arrow */}
            <span className="text-lg">→</span>
          </button>
        ) : (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-600 rounded-lg p-5 text-center shadow-sm">
            {/* SYSTEM 1: Emotional trigger (celebration) */}
            <div className="text-4xl mb-2 animate-bounce">🎉</div>
            <p className="text-base text-green-800 dark:text-green-200 font-bold mb-1">
              {t('bot.progress.allDone')}
            </p>
            <p className="text-xs text-green-700 dark:text-green-300 mb-4">
              {t('bot.progress.readyForExam')}
            </p>
            {/* SYSTEM 1: Clear next step button */}
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
    // Get instructor names from testimonials
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

        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">{t('bot.testimonials.title')}</h2>

        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-200">
            💡 {t('bot.testimonials.motivation')}
          </p>
        </div>

        {/* Button to add review */}
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-700 dark:hover:bg-blue-600 transition flex items-center justify-center gap-2 mb-3 sm:mb-4"
        >
          <Star size={16} />
          <span>{showReviewForm ? t('bot.testimonials.hideForm') : t('bot.testimonials.leaveReview')}</span>
        </button>

        {/* Form for creating review */}
        {showReviewForm && (
          <div className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-3 sm:p-4 md:p-5 mb-3 sm:mb-4">
            <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">{t('bot.testimonials.leaveReviewTitle')}</h3>
            
            <div className="space-y-3 sm:space-y-4">
              {/* Student name */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                  {t('bot.testimonials.yourName')}
                </label>
                <input
                  type="text"
                  value={reviewStudentName}
                  onChange={(e) => setReviewStudentName(e.target.value)}
                  placeholder={t('bot.testimonials.namePlaceholder')}
                  className="w-full p-2.5 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                />
              </div>

              {/* Instructor selection */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                  {t('bot.testimonials.selectInstructor')}
                </label>
                <select
                  value={selectedInstructor || ''}
                  onChange={(e) => setSelectedInstructor(e.target.value || null)}
                  className="w-full p-2.5 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                >
                  <option value="">{t('bot.testimonials.selectInstructorPlaceholder')}</option>
                  {instructors.map((instructor) => (
                    <option key={instructor.id} value={instructor.id}>
                      {instructor.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                  {t('bot.testimonials.rating')}
                </label>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setReviewRating(rating)}
                      className={`p-1.5 sm:p-2 rounded-lg transition ${
                        reviewRating >= rating
                          ? 'bg-yellow-400 dark:bg-yellow-500 text-yellow-900'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                      }`}
                    >
                      <Star
                        size={18}
                        className={reviewRating >= rating ? 'fill-current' : ''}
                      />
                    </button>
                  ))}
                  <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {t('bot.testimonials.ratingOf', { rating: reviewRating })}
                  </span>
                </div>
              </div>

              {/* Review text */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                  {t('bot.testimonials.yourReview')}
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder={t('bot.testimonials.reviewPlaceholder')}
                  className="w-full p-2.5 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 resize-none text-sm sm:text-base"
                  rows={5}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    setShowReviewForm(false);
                    setReviewText('');
                    setReviewRating(5);
                    setReviewStudentName('');
                    setError(null);
                  }}
                  className="flex-1 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium text-sm sm:text-base"
                >
                  {t('bot.testimonials.cancel')}
                </button>
                <button
                  onClick={async () => {
                    if (!authUser || !reviewText.trim() || !reviewStudentName.trim() || !selectedInstructor || loading) {
                      setError(t('bot.errors.fillAllFields'));
                      return;
                    }
                    try {
                      setLoading(true);
                      setError(null);
                      await BotService.createReview(authUser.id, {
                        instructor_id: selectedInstructor,
                        student_name: reviewStudentName.trim(),
                        text: reviewText.trim(),
                        rating: reviewRating,
                      });
                      // Clear form
                      setReviewText('');
                      setReviewRating(5);
                      setReviewStudentName('');
                      setShowReviewForm(false);
                      // Show success message
                      alert(t('bot.testimonials.thanks'));
                      // Update reviews list
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
                  className="flex-1 py-2.5 sm:py-3 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold text-sm sm:text-base"
                >
                  {loading ? t('bot.testimonials.sending') : t('bot.testimonials.submit')}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-2 sm:p-3">
                  <p className="text-xs sm:text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {testimonials.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">{t('bot.testimonials.loading')}</div>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-3 sm:p-4 rounded-lg">
              <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="text-3xl sm:text-4xl flex-shrink-0">👤</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-100 break-words">{testimonial.student_name}</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">
                    {t('bot.testimonials.instructor', { name: getInstructorName(testimonial.instructor_id) })}
                  </div>
                </div>
                <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 dark:fill-yellow-500 text-yellow-400 dark:text-yellow-500" />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 break-words">{testimonial.text}</p>

              {testimonial.video_url && (
                <button className="w-full bg-purple-600 dark:bg-purple-500 text-white py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-purple-700 dark:hover:bg-purple-600 transition flex items-center justify-center gap-2">
                  <Video size={14} />
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
        {/* Success icon */}
        <div className="text-center">
          <div className="inline-block relative">
            <div className="text-7xl animate-bounce">🎉</div>
            <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {t('bot.bookingSuccess.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('bot.bookingSuccess.subtitle')}
          </p>
        </div>

        {/* Booking information */}
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

        {/* Information message */}
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

        {/* Back to menu button */}
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

        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Heart className="text-red-500 dark:text-red-400 flex-shrink-0" size={28} />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{t('bot.support.title')}</h2>
        </div>

        {currentAnxietyLevel > 0 && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-3 sm:p-4">
            <div className="font-bold text-sm sm:text-base text-red-900 dark:text-red-200 mb-1.5 sm:mb-2">
              {t('bot.support.anxietyLevel', { level: currentAnxietyLevel })}
            </div>
            <p className="text-xs sm:text-sm text-red-800 dark:text-red-200">
              {currentAnxietyLevel >= 4
                ? t('bot.support.highAnxiety')
                : t('bot.support.normalAnxiety')}
            </p>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-3 sm:p-4 rounded-lg">
          <h3 className="font-bold text-sm sm:text-base mb-2 sm:mb-3 text-gray-800 dark:text-gray-100">{t('bot.support.tipTitle')}</h3>
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/30 p-2.5 sm:p-3 rounded break-words">
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

        {/* Button to open message form */}
        <button 
          onClick={() => setShowSupportForm(!showSupportForm)}
          className="w-full bg-green-600 dark:bg-green-500 text-white py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-green-700 dark:hover:bg-green-600 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <MessageCircle size={18} />
          <span>{showSupportForm ? t('bot.support.hideForm') : t('bot.support.writePsychologist')}</span>
        </button>

        {/* Form for sending message to psychologist */}
        {showSupportForm && (
          <div className="bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-700 rounded-lg p-3 sm:p-4 md:p-5 mt-3 sm:mt-4">
            <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
              {t('bot.support.writeTitle')}
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              {/* Information message */}
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-2.5 sm:p-3">
                <p className="text-[10px] sm:text-xs text-blue-800 dark:text-blue-200">
                  💬 {t('bot.support.info')}
                </p>
              </div>

              {/* Message input field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                  {t('bot.support.yourMessage')}
                </label>
                <textarea
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder={t('bot.support.messagePlaceholder')}
                  className="w-full p-2.5 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 resize-none text-sm sm:text-base"
                  rows={6}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    setShowSupportForm(false);
                    setSupportMessage('');
                    setError(null);
                  }}
                  className="flex-1 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium text-sm sm:text-base"
                >
                  {t('bot.support.cancel')}
                </button>
                <button
                  onClick={async () => {
                    if (!authUser || !supportMessage.trim() || loading) {
                      setError(t('bot.errors.fillAllFields'));
                      return;
                    }
                    try {
                      setLoading(true);
                      setError(null);
                      await BotService.sendSupportMessage(authUser.id, supportMessage.trim());
                      // Clear form
                      setSupportMessage('');
                      setShowSupportForm(false);
                      // Show success message
                      alert(t('bot.support.thanks'));
                      // Load updated messages list
                      const updated = await BotService.getSupportMessages(authUser.id);
                      setSupportMessages(updated);
                    } catch (err) {
                      console.error('Error sending support message:', err);
                      setError(t('bot.errors.sendMessageFailed'));
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={!supportMessage.trim() || loading}
                  className="flex-1 py-2.5 sm:py-3 rounded-lg bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold text-sm sm:text-base"
                >
                  {loading ? t('bot.support.sending') : t('bot.support.send')}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-2.5 sm:p-3">
                  <p className="text-xs sm:text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Message history */}
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
      className="w-full max-w-md mx-auto bg-gray-50 dark:bg-[hsl(220,35%,3%)] min-h-screen p-3 sm:p-4 md:p-6 transition-colors duration-200 relative"
    >
      {screen === 'welcome' && renderWelcome()}
      {screen === 'anxiety' && renderAnxietyTest()}
      {screen === 'menu' && renderMenu()}
      {screen === 'instructors' && renderInstructors()}
      {screen === 'progress' && renderProgress()}
      {screen === 'testimonials' && renderTestimonials()}
      {screen === 'support' && renderSupport()}
      {screen === 'booking-success' && renderBookingSuccess()}

      {/* Modal window for lesson booking */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">{t('bot.booking.title')}</h3>
              <button
                onClick={() => {
                  setShowBookingForm(false);
                  setBookingDate('');
                  setBookingTime('');
                  setError(null);
                }}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {/* Instructor information */}
              {selectedInstructor && (
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-2 sm:p-3">
                  <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 break-words">
                    <span className="font-semibold">{t('bot.booking.instructorLabel')}</span>{' '}
                    {instructors.find(i => i.id === selectedInstructor)?.name || t('bot.booking.notSelected')}
                  </p>
                </div>
              )}

              {/* Lesson type */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('bot.booking.lessonType')}
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <button
                    onClick={() => setBookingType('theory')}
                    className={`p-3 sm:p-4 rounded-lg border-2 transition ${
                      bookingType === 'theory'
                        ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📚</div>
                    <div className={`font-semibold text-xs sm:text-sm ${bookingType === 'theory' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                      {t('bot.booking.theory')}
                    </div>
                  </button>
                  <button
                    onClick={() => setBookingType('driving')}
                    className={`p-3 sm:p-4 rounded-lg border-2 transition ${
                      bookingType === 'driving'
                        ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🚗</div>
                    <div className={`font-semibold text-xs sm:text-sm ${bookingType === 'driving' ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'}`}>
                      {t('bot.booking.practice')}
                    </div>
                  </button>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('bot.booking.date')}
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-2.5 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('bot.booking.time')}
                </label>
                <input
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full p-2.5 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                />
              </div>

              {/* Information */}
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-2 sm:p-3">
                <p className="text-[10px] sm:text-xs text-yellow-800 dark:text-yellow-200">
                  💡 {t('bot.booking.info')}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-2 sm:p-3">
                  <p className="text-xs sm:text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowBookingForm(false);
                    setBookingDate('');
                    setBookingTime('');
                    setError(null);
                  }}
                  className="flex-1 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium text-sm sm:text-base"
                >
                  {t('bot.booking.cancel')}
                </button>
                <button
                  onClick={handleSubmitBooking}
                  disabled={!bookingDate || !bookingTime || loading}
                  className="flex-1 py-2.5 sm:py-3 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold text-sm sm:text-base"
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
