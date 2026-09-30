export type UserRole = 'student' | 'educator' | 'caregiver';

export type ThemeMode = 'default' | 'high-contrast-dark' | 'high-contrast-light' | 'yellow-on-black' | 'dark' | 'calm-pastel';
export type FontFamilyMode = 'default' | 'lexend' | 'dyslexic';
export type TextSizeMode = '100%' | '125%' | '150%' | '175%' | '200%';

export interface AccessibilitySettings {
  themeMode: ThemeMode;
  fontFamily: FontFamilyMode;
  textSize: TextSizeMode;
  reducedMotion: boolean;
  readingRuler: boolean;
  audioFeedback: boolean;
  soundVolume: number;
  hapticFeedback: boolean;
  switchAccessEnabled: boolean;
  switchScanSpeedMs: number;
  ttsSpeed: number;
  ttsPitch: number;
  dwellClickEnabled: boolean;
  dwellTimeMs: number;
  calmMode: boolean;
  errorlessLearning: boolean;
}

export interface StudentProfile {
  id: string;
  name: string;
  nickname?: string;
  avatarUrl: string;
  gradeLevel: string;
  primaryCommunicationMode: 'Verbal' | 'AAC Pictograms' | 'Sign / Gestures' | 'Assisted Speech';
  sensoryPreference: 'Low Sensory' | 'Sensory Seeking' | 'Balanced' | 'Tactile Focused';
  accessibilityPreset: AccessibilitySettings;
  currentStreakDays: number;
  starsEarned: number;
}

export interface ScheduleItem {
  id: string;
  title: string;
  category: 'learning' | 'sensory' | 'movement' | 'nutrition' | 'social';
  icon: string;
  timeSlot?: string;
  durationMinutes: number;
  completed: boolean;
  speechText: string;
  reinforcer?: string;
}

export interface IEPGoal {
  id: string;
  studentId: string;
  domain: 'Communication & Speech' | 'Emotional Regulation' | 'Fine Motor & Adaptive' | 'Literacy & Phonics' | 'Social Engagement';
  title: string;
  targetCriteria: string;
  currentPercentage: number;
  targetPercentage: number;
  targetDate: string;
  lastLoggedDate: string;
  status: 'In Progress' | 'Mastered' | 'Emerging' | 'Needs Review';
  notes: string[];
}

export interface BehaviorLogEntry {
  id: string;
  studentId: string;
  timestamp: string;
  state: 'Calm & Engaged' | 'Seeking Sensory Input' | 'Mild Overwhelm' | 'Regulated after Break' | 'Active Communication';
  triggerContext?: string;
  supportApplied: string;
  loggedBy: string;
}

export interface AACCard {
  id: string;
  label: string;
  category: 'needs' | 'feelings' | 'actions' | 'people' | 'sensory';
  icon: string;
  color: string;
  speechPrompt: string;
}

export interface MatchingCard {
  id: string;
  pairId: string;
  type: 'word' | 'image' | 'emotion';
  label: string;
  icon?: string;
  hint: string;
  isMatched?: boolean;
}
