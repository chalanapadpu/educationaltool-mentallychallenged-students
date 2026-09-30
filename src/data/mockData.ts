import { StudentProfile, ScheduleItem, IEPGoal, BehaviorLogEntry, AACCard } from '../types';

import owlAvatar from '../assets/images/sensory_mascot_owl_1790775602509.jpg';
import otterAvatar from '../assets/images/sensory_mascot_otter_1790775613358.jpg';
import turtleAvatar from '../assets/images/sensory_mascot_turtle_1790775624697.jpg';

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'student-1',
    name: 'Maya Lin',
    nickname: 'Maya',
    avatarUrl: owlAvatar,
    gradeLevel: 'Grade 3 (Resource Room B)',
    primaryCommunicationMode: 'AAC Pictograms',
    sensoryPreference: 'Low Sensory',
    currentStreakDays: 5,
    starsEarned: 24,
    accessibilityPreset: {
      themeMode: 'default',
      fontFamily: 'lexend',
      textSize: '125%',
      reducedMotion: true,
      readingRuler: true,
      audioFeedback: true,
      soundVolume: 0.3,
      hapticFeedback: true,
      switchAccessEnabled: false,
      switchScanSpeedMs: 1500,
      ttsSpeed: 0.85,
      ttsPitch: 1.0,
      dwellClickEnabled: false,
      dwellTimeMs: 1500,
      calmMode: true,
      errorlessLearning: true,
    }
  },
  {
    id: 'student-2',
    name: 'Leo Thorne',
    nickname: 'Leo',
    avatarUrl: otterAvatar,
    gradeLevel: 'Grade 4 (Life Skills)',
    primaryCommunicationMode: 'Assisted Speech',
    sensoryPreference: 'Sensory Seeking',
    currentStreakDays: 3,
    starsEarned: 19,
    accessibilityPreset: {
      themeMode: 'yellow-on-black',
      fontFamily: 'dyslexic',
      textSize: '150%',
      reducedMotion: false,
      readingRuler: false,
      audioFeedback: true,
      soundVolume: 0.4,
      hapticFeedback: true,
      switchAccessEnabled: true,
      switchScanSpeedMs: 2000,
      ttsSpeed: 0.9,
      ttsPitch: 0.95,
      dwellClickEnabled: false,
      dwellTimeMs: 1800,
      calmMode: false,
      errorlessLearning: true,
    }
  },
  {
    id: 'student-3',
    name: 'Jordan Rivera',
    nickname: 'Jordan',
    avatarUrl: turtleAvatar,
    gradeLevel: 'Grade 2 (Inclusion)',
    primaryCommunicationMode: 'Verbal',
    sensoryPreference: 'Tactile Focused',
    currentStreakDays: 7,
    starsEarned: 32,
    accessibilityPreset: {
      themeMode: 'calm-pastel',
      fontFamily: 'default',
      textSize: '100%',
      reducedMotion: false,
      readingRuler: false,
      audioFeedback: true,
      soundVolume: 0.25,
      hapticFeedback: false,
      switchAccessEnabled: false,
      switchScanSpeedMs: 1200,
      ttsSpeed: 1.0,
      ttsPitch: 1.05,
      dwellClickEnabled: false,
      dwellTimeMs: 1500,
      calmMode: true,
      errorlessLearning: false,
    }
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sched-1',
    title: 'Morning Check-In & Calming Breathing',
    category: 'sensory',
    icon: 'Sun',
    timeSlot: '08:45 AM',
    durationMinutes: 10,
    completed: true,
    speechText: 'First, Morning Check In and Calming Breathing.',
    reinforcer: 'Choose morning sticker'
  },
  {
    id: 'sched-2',
    title: 'Phonics & Visual Word Soundboard',
    category: 'learning',
    icon: 'BookOpen',
    timeSlot: '09:00 AM',
    durationMinutes: 15,
    completed: true,
    speechText: 'Next, Phonics and Visual Word Soundboard.',
    reinforcer: '3 Star tokens'
  },
  {
    id: 'sched-3',
    title: 'Sensory Starfield & Heavy Work Break',
    category: 'sensory',
    icon: 'Sparkles',
    timeSlot: '09:30 AM',
    durationMinutes: 10,
    completed: false,
    speechText: 'Time for a sensory starfield and movement break.',
    reinforcer: 'Relaxation chime'
  },
  {
    id: 'sched-4',
    title: 'Emotion Recognition & AAC Cards',
    category: 'social',
    icon: 'Smile',
    timeSlot: '10:00 AM',
    durationMinutes: 15,
    completed: false,
    speechText: 'Now, Emotion Recognition and AAC practice.',
    reinforcer: 'Free choice quiet activity'
  },
  {
    id: 'sched-5',
    title: 'Hydration & Healthy Snack Routine',
    category: 'nutrition',
    icon: 'CupSoda',
    timeSlot: '10:30 AM',
    durationMinutes: 15,
    completed: false,
    speechText: 'Time for water and healthy snack routine.',
    reinforcer: 'Play with sensory fidget'
  }
];

export const INITIAL_IEP_GOALS: IEPGoal[] = [
  {
    id: 'iep-1',
    studentId: 'student-1',
    domain: 'Communication & Speech',
    title: 'Independent Expressive AAC Requesting',
    targetCriteria: 'Will utilize 3-symbol pictogram sequence to express primary physical need with <1 verbal prompt across 4 out of 5 consecutive days.',
    currentPercentage: 75,
    targetPercentage: 80,
    targetDate: '2026-11-15',
    lastLoggedDate: '2026-09-28',
    status: 'In Progress',
    notes: [
      'Maya successfully requested "Water + Please + Help" unprompted on Wednesday.',
      'Responds exceptionally well when visual high-contrast mode is toggled on.'
    ]
  },
  {
    id: 'iep-2',
    studentId: 'student-1',
    domain: 'Emotional Regulation',
    title: 'Self-Advocated Calming Break Initiation',
    targetCriteria: 'Will tap "I Need A Break" button or gesture to calm corner when experiencing sensory overstimulation prior to behavioral escalation in 80% of opportunities.',
    currentPercentage: 85,
    targetPercentage: 85,
    targetDate: '2026-10-30',
    lastLoggedDate: '2026-09-29',
    status: 'Mastered',
    notes: [
      'Transitioned to Starfield Breathing module independently during fire drill preparation.',
      'Mastery criterion met; progressing to maintenance phase.'
    ]
  },
  {
    id: 'iep-3',
    studentId: 'student-2',
    domain: 'Fine Motor & Adaptive',
    title: 'Single-Switch Switch-Access Mastery',
    targetCriteria: 'Will accurately time switch press during 2-second auto-scan to select desired learning activity with 80% accuracy.',
    currentPercentage: 65,
    targetPercentage: 80,
    targetDate: '2026-12-01',
    lastLoggedDate: '2026-09-27',
    status: 'Emerging',
    notes: [
      'Scan latency adjusted to 2.0s with haptic vibration confirmation.',
      'Accuracy jumped 15% when tactile audio clicks were enabled.'
    ]
  },
  {
    id: 'iep-4',
    studentId: 'student-3',
    domain: 'Literacy & Phonics',
    title: 'Phonemic Awareness Sound-Symbol Matching',
    targetCriteria: 'Will identify initial consonant sounds (/b/, /m/, /s/, /t/) with corresponding visual pictograms across 10 trials.',
    currentPercentage: 70,
    targetPercentage: 85,
    targetDate: '2026-11-20',
    lastLoggedDate: '2026-09-26',
    status: 'In Progress',
    notes: [
      'Jordan benefited strongly from audio voice repetition and visual sand-timer feedback.'
    ]
  }
];

export const INITIAL_BEHAVIOR_LOGS: BehaviorLogEntry[] = [
  {
    id: 'log-1',
    studentId: 'student-1',
    timestamp: 'Today, 09:12 AM',
    state: 'Calm & Engaged',
    triggerContext: 'Visual routine review at start of morning circle',
    supportApplied: 'Reviewed First-Then board on screen with TTS read-out',
    loggedBy: 'Ms. Sarah Henderson, M.Ed (Lead SPED Specialist)'
  },
  {
    id: 'log-2',
    studentId: 'student-1',
    timestamp: 'Yesterday, 11:20 AM',
    state: 'Mild Overwhelm',
    triggerContext: 'Loud acoustics during hallway cafeteria transition',
    supportApplied: 'Provided noise-canceling headphones & 5-min interactive Starfield calm session',
    loggedBy: 'David Kim, OT (Occupational Therapist)'
  },
  {
    id: 'log-3',
    studentId: 'student-2',
    timestamp: 'Yesterday, 01:45 PM',
    state: 'Active Communication',
    triggerContext: 'Group story listening task',
    supportApplied: 'Utilized switch scanning on AAC board to respond to character questions',
    loggedBy: 'Elena Rossi, SLP (Speech-Language Pathologist)'
  }
];

export const AAC_CARDS: AACCard[] = [
  {
    id: 'aac-help',
    label: 'I Need Help',
    category: 'needs',
    icon: 'HandHelping',
    color: '#0284c7',
    speechPrompt: 'I need help, please.'
  },
  {
    id: 'aac-break',
    label: 'I Need A Break',
    category: 'sensory',
    icon: 'Coffee',
    color: '#14b8a6',
    speechPrompt: 'I need a sensory break, please.'
  },
  {
    id: 'aac-water',
    label: 'Drink Water',
    category: 'needs',
    icon: 'Droplets',
    color: '#38bdf8',
    speechPrompt: 'I would like a drink of water.'
  },
  {
    id: 'aac-restroom',
    label: 'Restroom',
    category: 'needs',
    icon: 'DoorClosed',
    color: '#6366f1',
    speechPrompt: 'I need to use the restroom.'
  },
  {
    id: 'aac-yes',
    label: 'Yes / Agree',
    category: 'actions',
    icon: 'CheckCircle',
    color: '#16a34a',
    speechPrompt: 'Yes.'
  },
  {
    id: 'aac-no',
    label: 'No / Stop',
    category: 'actions',
    icon: 'XCircle',
    color: '#dc2626',
    speechPrompt: 'No, thank you.'
  },
  {
    id: 'aac-happy',
    label: 'Feeling Happy',
    category: 'feelings',
    icon: 'Smile',
    color: '#eab308',
    speechPrompt: 'I am feeling happy and ready.'
  },
  {
    id: 'aac-tired',
    label: 'Feeling Tired',
    category: 'feelings',
    icon: 'Moon',
    color: '#a855f7',
    speechPrompt: 'I am feeling tired.'
  },
  {
    id: 'aac-calm',
    label: 'Calm Corner',
    category: 'sensory',
    icon: 'HeartHandshake',
    color: '#10b981',
    speechPrompt: 'I would like to visit the calm corner.'
  },
  {
    id: 'aac-music',
    label: 'Play Music',
    category: 'actions',
    icon: 'Music',
    color: '#ec4899',
    speechPrompt: 'Can we listen to gentle music?'
  },
  {
    id: 'aac-more',
    label: 'More Time',
    category: 'actions',
    icon: 'Clock',
    color: '#f97316',
    speechPrompt: 'I need more time for this task.'
  },
  {
    id: 'aac-all-done',
    label: 'All Done',
    category: 'actions',
    icon: 'CheckCheck',
    color: '#059669',
    speechPrompt: 'I am all done!'
  }
];
