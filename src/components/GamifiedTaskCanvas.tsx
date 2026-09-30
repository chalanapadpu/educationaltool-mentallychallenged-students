import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Sparkles, 
  Smile, 
  Volume2, 
  Star, 
  RotateCcw, 
  CheckCircle, 
  HelpCircle, 
  Layers, 
  Speech, 
  Send,
  Trash2,
  Heart,
  Droplets,
  Coffee,
  XCircle,
  Clock,
  Music,
  CheckCheck
} from 'lucide-react';
import { AAC_CARDS } from '../data/mockData';
import { AACCard } from '../types';

interface EmotionPair {
  id: string;
  name: string;
  emoji: string;
  description: string;
  prompt: string;
}

const EMOTIONS_DATA: EmotionPair[] = [
  { id: 'happy', name: 'Happy', emoji: '😊', description: 'Smiling face with calm energy', prompt: 'I feel happy and comfortable.' },
  { id: 'calm', name: 'Calm', emoji: '😌', description: 'Peaceful relaxed face', prompt: 'I feel calm and regulated.' },
  { id: 'tired', name: 'Tired', emoji: '🥱', description: 'Yawning face with soft eyes', prompt: 'I feel tired and need rest.' },
  { id: 'overwhelmed', name: 'Overwhelmed', emoji: '😵‍💫', description: 'Sensory overload feeling', prompt: 'Too much noise or light, I need quiet.' },
  { id: 'excited', name: 'Excited', emoji: '🤩', description: 'Star-eyed energized face', prompt: 'I feel excited and ready to learn.' },
  { id: 'frustrated', name: 'Frustrated', emoji: '😤', description: 'Needs a helping hand or break', prompt: 'I need some help or a quick pause.' }
];

export const GamifiedTaskCanvas: React.FC = () => {
  const { 
    speak, 
    playFeedback, 
    triggerCelebration, 
    activeStudent 
  } = useAccessibility();

  const [activeActivityTab, setActiveActivityTab] = useState<'aac' | 'emotions' | 'sorting'>('aac');

  // AAC Phrase Builder Strip State
  const [selectedAACSequence, setSelectedAACSequence] = useState<AACCard[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Emotion Matcher Game State
  const [targetEmotion, setTargetEmotion] = useState<EmotionPair>(EMOTIONS_DATA[0]);
  const [matchedCount, setMatchedCount] = useState<number>(0);
  const [emotionFeedback, setEmotionFeedback] = useState<string | null>(null);

  // Sorting Activity State
  const [sortItems, setSortItems] = useState([
    { id: 's1', label: 'Apple', category: 'Food', icon: '🍎' },
    { id: 's2', label: 'Crayon', category: 'School', icon: '🖍️' },
    { id: 's3', label: 'Stress Ball', category: 'Sensory', icon: '🟢' },
    { id: 's4', label: 'Banana', category: 'Food', icon: '🍌' },
    { id: 's5', label: 'Notebook', category: 'School', icon: '📓' },
    { id: 's6', label: 'Weighted Blanket', category: 'Sensory', icon: '🛋️' }
  ]);
  const [sortedItems, setSortedItems] = useState<{ [key: string]: string[] }>({
    Food: [],
    School: [],
    Sensory: []
  });

  // AAC Card Tap
  const handleCardClick = (card: AACCard) => {
    playFeedback('tap');
    speak(card.speechPrompt);
    setSelectedAACSequence(prev => [...prev, card]);
  };

  const handleSpeakFullSentence = () => {
    if (selectedAACSequence.length === 0) return;
    const sentence = selectedAACSequence.map(c => c.label).join(' ');
    speak(sentence);
    playFeedback('chime');
  };

  const clearSentence = () => {
    playFeedback('tap');
    setSelectedAACSequence([]);
  };

  // Emotion Match Check
  const handleEmotionSelect = (chosen: EmotionPair) => {
    if (chosen.id === targetEmotion.id) {
      setEmotionFeedback(`Great job! That is ${chosen.name}.`);
      triggerCelebration();
      setMatchedCount(prev => prev + 1);
      // Pick next emotion
      setTimeout(() => {
        const next = EMOTIONS_DATA[Math.floor(Math.random() * EMOTIONS_DATA.length)];
        setTargetEmotion(next);
        setEmotionFeedback(null);
      }, 1500);
    } else {
      playFeedback('tap');
      setEmotionFeedback(`That is ${chosen.name}. Look for ${targetEmotion.name}.`);
      speak(`Try again. Let's find ${targetEmotion.name}.`);
    }
  };

  // Category Sort Item Click
  const handleSortItem = (item: { id: string; label: string; category: string; icon: string }, targetCat: string) => {
    if (item.category === targetCat) {
      triggerCelebration();
      setSortedItems(prev => ({
        ...prev,
        [targetCat]: [...prev[targetCat], `${item.icon} ${item.label}`]
      }));
      setSortItems(prev => prev.filter(i => i.id !== item.id));
    } else {
      playFeedback('tap');
      speak(`Almost! ${item.label} belongs to another category.`);
    }
  };

  const filteredAAC = filterCategory === 'all' 
    ? AAC_CARDS 
    : AAC_CARDS.filter(c => c.category === filterCategory);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 py-6">
      
      {/* Activity Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Gamified Interactive Task Canvas</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Self-paced, low-pressure cognitive exercises with speech output & high-contrast symbols.
          </p>
        </div>

        {/* Stars Earned Indicator */}
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-800 dark:text-amber-200">
          <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
          <span className="text-xs font-bold uppercase tracking-wider">Learner Stars:</span>
          <span className="text-base font-extrabold font-mono">{activeStudent.starsEarned + matchedCount}</span>
        </div>
      </div>

      {/* Activity Navigation Segmented Control */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl max-w-md">
        <button
          onClick={() => {
            playFeedback('tap');
            setActiveActivityTab('aac');
          }}
          data-switch-target="true"
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeActivityTab === 'aac'
              ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          AAC Speech Board
        </button>
        <button
          onClick={() => {
            playFeedback('tap');
            setActiveActivityTab('emotions');
          }}
          data-switch-target="true"
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeActivityTab === 'emotions'
              ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Emotion Matcher
        </button>
        <button
          onClick={() => {
            playFeedback('tap');
            setActiveActivityTab('sorting');
          }}
          data-switch-target="true"
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeActivityTab === 'sorting'
              ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Category Sorter
        </button>
      </div>

      {/* ==================== TAB 1: AAC COMMUNICATION BOARD ==================== */}
      {activeActivityTab === 'aac' && (
        <div className="flex flex-col gap-6">
          
          {/* Live Sentence Strip (Visual Communication Ribbon) */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                Current Message Strip
              </span>
              <div className="min-h-14 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-2 mt-1">
                {selectedAACSequence.length === 0 ? (
                  <span className="text-xs text-slate-400 italic px-2">
                    Tap communication cards below to build your sentence...
                  </span>
                ) : (
                  selectedAACSequence.map((card, i) => (
                    <span 
                      key={`${card.id}-${i}`}
                      className="px-3 py-1.5 bg-white dark:bg-slate-700 rounded-lg shadow-xs border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5"
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: card.color }} />
                      {card.label}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Actions: Speak sentence & Clear */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleSpeakFullSentence}
                disabled={selectedAACSequence.length === 0}
                data-switch-target="true"
                aria-label="Speak constructed sentence"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Speech className="w-5 h-5" />
                <span>Speak Out</span>
              </button>
              <button
                onClick={clearSentence}
                disabled={selectedAACSequence.length === 0}
                data-switch-target="true"
                aria-label="Clear sentence strip"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 disabled:opacity-40"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['all', 'needs', 'feelings', 'actions', 'sensory'].map(cat => (
              <button
                key={cat}
                onClick={() => {
                  playFeedback('tap');
                  setFilterCategory(cat);
                }}
                data-switch-target="true"
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors whitespace-nowrap ${
                  filterCategory === cat
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Big Accessible AAC Symbol Grid (Minimum 48px hit target; generous 120px+ cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredAAC.map(card => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                data-switch-target="true"
                aria-label={`${card.label}: ${card.speechPrompt}`}
                className="h-32 p-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-400 shadow-sm hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-center text-center gap-2 group"
                style={{ borderTopColor: card.color, borderTopWidth: '6px' }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: card.color }}
                >
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                  {card.label}
                </span>
              </button>
            ))}
          </div>

        </div>
      )}

      {/* ==================== TAB 2: EMOTION MATCHER ==================== */}
      {activeActivityTab === 'emotions' && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 flex flex-col gap-8 shadow-sm">
          
          <div className="text-center max-w-lg mx-auto">
            <span className="text-xs uppercase font-extrabold tracking-wider text-sky-600 dark:text-sky-400">
              Expression Identification
            </span>
            <h2 className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">
              Find the face that feels:
            </h2>
            <div className="mt-3 inline-flex items-center gap-2 px-6 py-2.5 bg-sky-50 dark:bg-sky-950/60 border-2 border-sky-400 dark:border-sky-600 rounded-2xl">
              <span className="text-2xl font-extrabold text-sky-700 dark:text-sky-300">
                "{targetEmotion.name}"
              </span>
              <button
                onClick={() => speak(`Find the face that is feeling ${targetEmotion.name}. ${targetEmotion.prompt}`)}
                data-switch-target="true"
                aria-label={`Listen to prompt for ${targetEmotion.name}`}
                className="p-1.5 rounded-lg bg-sky-200 dark:bg-sky-800 text-sky-800 dark:text-sky-200"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            {emotionFeedback && (
              <p className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 animate-pulse">
                {emotionFeedback}
              </p>
            )}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto w-full">
            {EMOTIONS_DATA.map(emotion => (
              <button
                key={emotion.id}
                onClick={() => handleEmotionSelect(emotion)}
                data-switch-target="true"
                aria-label={`${emotion.name}: ${emotion.description}`}
                className="h-36 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-sky-50 dark:hover:bg-sky-950/30 hover:border-sky-500 transition-all flex flex-col items-center justify-center p-3 text-center gap-2 group active:scale-95"
              >
                <span className="text-5xl group-hover:scale-110 transition-transform">
                  {emotion.emoji}
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {emotion.name}
                </span>
              </button>
            ))}
          </div>

          <div className="text-center text-xs text-slate-500">
            Score: <strong className="text-slate-800 dark:text-slate-200">{matchedCount}</strong> completed emotions in this session
          </div>

        </div>
      )}

      {/* ==================== TAB 3: CATEGORY SORTER ==================== */}
      {activeActivityTab === 'sorting' && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 flex flex-col gap-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Interactive Object Sorting
            </h2>
            <p className="text-xs text-slate-500">
              Select an item below, then tap its matching container box.
            </p>
          </div>

          {/* Items waiting to be sorted */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Unsorted Items ({sortItems.length})
            </span>
            {sortItems.length === 0 ? (
              <div className="py-6 text-center text-emerald-600 font-bold text-sm">
                All items sorted perfectly! ★
              </div>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {sortItems.map(item => (
                  <div 
                    key={item.id} 
                    className="p-3 bg-white dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-600 flex items-center gap-2 shadow-xs"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.label}</span>
                    <div className="flex items-center gap-1 pl-2 border-l border-slate-200 dark:border-slate-600">
                      {['Food', 'School', 'Sensory'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => handleSortItem(item, cat)}
                          data-switch-target="true"
                          className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white text-xs font-semibold"
                        >
                          → {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Destination Buckets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { cat: 'Food', color: 'border-amber-400 bg-amber-50/40 dark:bg-amber-950/20' },
              { cat: 'School', color: 'border-sky-400 bg-sky-50/40 dark:bg-sky-950/20' },
              { cat: 'Sensory', color: 'border-teal-400 bg-teal-50/40 dark:bg-teal-950/20' },
            ].map(bucket => (
              <div 
                key={bucket.cat}
                className={`p-4 rounded-2xl border-2 ${bucket.color} min-h-40 flex flex-col`}
              >
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                  {bucket.cat} Bin
                </h3>
                <div className="flex flex-col gap-1.5 mt-3 flex-1">
                  {sortedItems[bucket.cat].map((name, i) => (
                    <span key={i} className="text-xs font-semibold px-2 py-1 bg-white/80 dark:bg-slate-800/80 rounded-md">
                      {name}
                    </span>
                  ))}
                  {sortedItems[bucket.cat].length === 0 && (
                    <span className="text-xs text-slate-400 italic">Empty</span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
