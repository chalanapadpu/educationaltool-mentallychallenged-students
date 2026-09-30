import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { 
  AccessibilitySettings, 
  StudentProfile, 
  UserRole, 
  ScheduleItem, 
  IEPGoal, 
  BehaviorLogEntry 
} from '../types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_SCHEDULE, 
  INITIAL_IEP_GOALS, 
  INITIAL_BEHAVIOR_LOGS 
} from '../data/mockData';
import { audioSynth } from '../utils/audioSynth';
import { speakText, stopSpeaking, triggerHapticFeedback } from '../utils/speech';
import confetti from 'canvas-confetti';

interface AccessibilityContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeStudent: StudentProfile;
  setActiveStudent: (student: StudentProfile) => void;
  allStudents: StudentProfile[];
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  readingRulerY: number;
  isReadingAloud: boolean;
  schedule: ScheduleItem[];
  toggleScheduleItem: (id: string) => void;
  addScheduleItem: (item: Omit<ScheduleItem, 'id'>) => void;
  reorderSchedule: (newSchedule: ScheduleItem[]) => void;
  iepGoals: IEPGoal[];
  addIEPProgress: (goalId: string, newPercentage: number, note: string) => void;
  behaviorLogs: BehaviorLogEntry[];
  addBehaviorLog: (entry: Omit<BehaviorLogEntry, 'id' | 'timestamp'>) => void;
  speak: (text: string) => void;
  stopSpeech: () => void;
  playFeedback: (type?: 'chime' | 'tap' | 'timer') => void;
  triggerCelebration: () => void;
  switchIndex: number;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('student');
  const [allStudents, setAllStudents] = useState<StudentProfile[]>(INITIAL_STUDENTS);
  const [activeStudent, setActiveStudentState] = useState<StudentProfile>(INITIAL_STUDENTS[0]);
  const [settings, setSettings] = useState<AccessibilitySettings>(INITIAL_STUDENTS[0].accessibilityPreset);
  const [readingRulerY, setReadingRulerY] = useState<number>(200);
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [iepGoals, setIEPGoals] = useState<IEPGoal[]>(INITIAL_IEP_GOALS);
  const [behaviorLogs, setBehaviorLogs] = useState<BehaviorLogEntry[]>(INITIAL_BEHAVIOR_LOGS);
  const [switchIndex, setSwitchIndex] = useState<number>(0);

  // Sync settings whenever active student changes
  const setActiveStudent = useCallback((student: StudentProfile) => {
    setActiveStudentState(student);
    setSettings(student.accessibilityPreset);
  }, []);

  const updateSettings = useCallback((newPartial: Partial<AccessibilitySettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...newPartial };
      // Also update student's saved preset
      setAllStudents(students => students.map(s => 
        s.id === activeStudent.id ? { ...s, accessibilityPreset: next } : s
      ));
      return next;
    });
  }, [activeStudent.id]);

  // Apply visual accessibility classes to body
  useEffect(() => {
    const body = document.body;
    body.classList.remove(
      'theme-high-contrast-dark', 
      'theme-high-contrast-light', 
      'theme-yellow-on-black', 
      'theme-dark', 
      'theme-calm-pastel'
    );

    if (settings.themeMode !== 'default') {
      body.classList.add(`theme-${settings.themeMode}`);
    }

    body.classList.remove('font-lexend', 'font-dyslexic');
    if (settings.fontFamily !== 'default') {
      body.classList.add(`font-${settings.fontFamily}`);
    }

    if (settings.reducedMotion) {
      body.classList.add('reduced-motion');
    } else {
      body.classList.remove('reduced-motion');
    }

    // Text scaling
    document.documentElement.style.fontSize = settings.textSize;
  }, [settings.themeMode, settings.fontFamily, settings.reducedMotion, settings.textSize]);

  // Reading Ruler cursor follower
  useEffect(() => {
    if (!settings.readingRuler) return;
    const handleMouseMove = (e: MouseEvent) => {
      setReadingRulerY(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.readingRuler]);

  // Switch Access Auto-Scanner
  const switchTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!settings.switchAccessEnabled) {
      if (switchTimerRef.current) clearInterval(switchTimerRef.current);
      // Remove any lingering highlights
      document.querySelectorAll('.switch-highlight').forEach(el => el.classList.remove('switch-highlight'));
      return;
    }

    const interval = window.setInterval(() => {
      const targets = document.querySelectorAll<HTMLElement>('[data-switch-target="true"]');
      if (targets.length === 0) return;

      setSwitchIndex(prev => {
        const nextIndex = (prev + 1) % targets.length;
        targets.forEach((el, idx) => {
          if (idx === nextIndex) {
            el.classList.add('switch-highlight');
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            if (settings.audioFeedback) {
              audioSynth.playTapSound(settings.soundVolume);
            }
          } else {
            el.classList.remove('switch-highlight');
          }
        });
        return nextIndex;
      });
    }, settings.switchScanSpeedMs || 1800);

    switchTimerRef.current = interval;
    return () => clearInterval(interval);
  }, [settings.switchAccessEnabled, settings.switchScanSpeedMs, settings.audioFeedback, settings.soundVolume]);

  // Global Switch Key Listener (Space or Enter activates highlighted target)
  useEffect(() => {
    if (!settings.switchAccessEnabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        const highlighted = document.querySelector<HTMLElement>('.switch-highlight');
        if (highlighted) {
          e.preventDefault();
          if (settings.audioFeedback) {
            audioSynth.playSuccessChime(settings.soundVolume);
          }
          if (settings.hapticFeedback) {
            triggerHapticFeedback(50);
          }
          highlighted.click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settings.switchAccessEnabled, settings.audioFeedback, settings.hapticFeedback, settings.soundVolume]);

  const speak = useCallback((text: string) => {
    setIsReadingAloud(true);
    speakText(text, {
      rate: settings.ttsSpeed,
      pitch: settings.ttsPitch,
      onEnd: () => setIsReadingAloud(false),
      onError: () => setIsReadingAloud(false)
    });
  }, [settings.ttsSpeed, settings.ttsPitch]);

  const stopSpeech = useCallback(() => {
    stopSpeaking();
    setIsReadingAloud(false);
  }, []);

  const playFeedback = useCallback((type: 'chime' | 'tap' | 'timer' = 'tap') => {
    if (!settings.audioFeedback) return;
    if (type === 'chime') {
      audioSynth.playSuccessChime(settings.soundVolume);
    } else if (type === 'timer') {
      audioSynth.playTimerAlert(settings.soundVolume);
    } else {
      audioSynth.playTapSound(settings.soundVolume);
    }

    if (settings.hapticFeedback) {
      triggerHapticFeedback([40, 50, 40]);
    }
  }, [settings.audioFeedback, settings.soundVolume, settings.hapticFeedback]);

  const triggerCelebration = useCallback(() => {
    playFeedback('chime');
    if (!settings.reducedMotion && !settings.calmMode) {
      // Gentle, slow confetti burst (avoiding aggressive strobing)
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0284c7', '#38bdf8', '#10b981', '#f59e0b', '#a855f7'],
        ticks: 200,
        gravity: 0.7,
        scalar: 1.1,
      });
    }
  }, [playFeedback, settings.reducedMotion, settings.calmMode]);

  const toggleScheduleItem = useCallback((id: string) => {
    setSchedule(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.completed;
        if (nextState) {
          triggerCelebration();
          // Add a star to the active student!
          setActiveStudentState(curr => ({
            ...curr,
            starsEarned: curr.starsEarned + 1
          }));
        } else {
          playFeedback('tap');
        }
        return { ...item, completed: nextState };
      }
      return item;
    }));
  }, [triggerCelebration, playFeedback]);

  const addScheduleItem = useCallback((item: Omit<ScheduleItem, 'id'>) => {
    const newItem: ScheduleItem = {
      ...item,
      id: `sched-${Date.now()}`
    };
    setSchedule(prev => [...prev, newItem]);
    playFeedback('tap');
  }, [playFeedback]);

  const reorderSchedule = useCallback((newSchedule: ScheduleItem[]) => {
    setSchedule(newSchedule);
  }, []);

  const addIEPProgress = useCallback((goalId: string, newPercentage: number, note: string) => {
    setIEPGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        const updatedNotes = note ? [note, ...g.notes] : g.notes;
        const status = newPercentage >= g.targetPercentage ? 'Mastered' : newPercentage > 60 ? 'In Progress' : 'Emerging';
        return {
          ...g,
          currentPercentage: newPercentage,
          status,
          notes: updatedNotes,
          lastLoggedDate: new Date().toISOString().split('T')[0]
        };
      }
      return g;
    }));
    playFeedback('chime');
  }, [playFeedback]);

  const addBehaviorLog = useCallback((entry: Omit<BehaviorLogEntry, 'id' | 'timestamp'>) => {
    const newLog: BehaviorLogEntry = {
      ...entry,
      id: `log-${Date.now()}`,
      timestamp: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    };
    setBehaviorLogs(prev => [newLog, ...prev]);
    playFeedback('tap');
  }, [playFeedback]);

  return (
    <AccessibilityContext.Provider
      value={{
        role,
        setRole,
        activeStudent,
        setActiveStudent,
        allStudents,
        settings,
        updateSettings,
        readingRulerY,
        isReadingAloud,
        schedule,
        toggleScheduleItem,
        addScheduleItem,
        reorderSchedule,
        iepGoals,
        addIEPProgress,
        behaviorLogs,
        addBehaviorLog,
        speak,
        stopSpeech,
        playFeedback,
        triggerCelebration,
        switchIndex
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
