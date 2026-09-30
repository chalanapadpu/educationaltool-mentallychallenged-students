import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Heart, 
  Printer, 
  Sparkles, 
  Calendar, 
  Home, 
  Smile, 
  CheckCircle, 
  Clock, 
  Volume2, 
  ExternalLink 
} from 'lucide-react';

interface PrintableCard {
  id: string;
  title: string;
  iconText: string;
  prompt: string;
  color: string;
}

const DEFAULT_PRINTABLE_CARDS: PrintableCard[] = [
  { id: 'p1', title: 'Brush Teeth', iconText: '🪥', prompt: 'Time to brush teeth gently', color: '#0284c7' },
  { id: 'p2', title: 'Eat Healthy Meal', iconText: '🍽️', prompt: 'Time for breakfast or dinner', color: '#16a34a' },
  { id: 'p3', title: 'Put Shoes On', iconText: '👟', prompt: 'Put shoes on for leaving', color: '#eab308' },
  { id: 'p4', title: 'Quiet Reading', iconText: '📖', prompt: 'Cozy quiet book reading time', color: '#8b5cf6' },
  { id: 'p5', title: 'Sensory Hug / Break', iconText: '🧸', prompt: 'Time for cozy calm break', color: '#ec4899' },
  { id: 'p6', title: 'Sleep / Bedtime', iconText: '🌙', prompt: 'Time to rest in bed peacefully', color: '#334155' }
];

export const ParentPortal: React.FC = () => {
  const { activeStudent, speak, playFeedback } = useAccessibility();
  const [printCards, setPrintCards] = useState<PrintableCard[]>(DEFAULT_PRINTABLE_CARDS);
  const [customCardTitle, setCustomCardTitle] = useState<string>('');

  const handlePrint = () => {
    playFeedback('tap');
    window.print();
  };

  const handleAddCustomPrintCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCardTitle.trim()) return;
    const newCard: PrintableCard = {
      id: `print-${Date.now()}`,
      title: customCardTitle.trim(),
      iconText: '⭐',
      prompt: customCardTitle.trim(),
      color: '#0284c7'
    };
    setPrintCards(prev => [...prev, newCard]);
    setCustomCardTitle('');
    playFeedback('tap');
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 no-print">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500" />
            <span>Parent & Caregiver Continuity Portal</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Strengthening school-to-home consistency with printable visual aids and celebration recaps for {activeStudent.name}.
          </p>
        </div>

        <button
          onClick={handlePrint}
          data-switch-target="true"
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Print Schedule & Cards</span>
        </button>
      </div>

      {/* Highlights & Home Routine Bridges (No print) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 no-print">
        
        {/* Weekly Celebrations Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-sm font-bold uppercase tracking-wider">Weekly Milestone Highlight</h2>
          </div>
          <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
            {activeStudent.name} achieved <strong className="text-sky-600 dark:text-sky-400">{activeStudent.starsEarned} star tokens</strong> this week!
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Showed wonderful self-regulation during morning circle transitions by asking for a 3-minute sensory timer.
          </p>
          <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-xs text-amber-800 dark:text-amber-300 font-semibold">
            Tip for Home: Acknowledge effort with high fives or star stickers!
          </div>
        </div>

        {/* Accommodation Continuity */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
            <Home className="w-5 h-5" />
            <h2 className="text-sm font-bold uppercase tracking-wider">Home Consistency Guide</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Classroom visual strategies tailored for {activeStudent.nickname || activeStudent.name}:
          </p>
          <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
            <li>Give a 2-minute visual warning before bedtime.</li>
            <li>Use the "First — Then" structure for daily chores.</li>
            <li>Reinforce emotional labeling ("I see you are feeling tired").</li>
          </ul>
        </div>

        {/* Quick Voice Prompt Player */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
            <Volume2 className="w-5 h-5" />
            <h2 className="text-sm font-bold uppercase tracking-wider">Audio Routine Prompts</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Play clear, calibrated voice instructions directly on a smartphone or tablet:
          </p>
          <div className="flex flex-col gap-2 mt-1">
            <button
              onClick={() => speak('It is dinner time now. Let us sit together.')}
              data-switch-target="true"
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold rounded-lg text-left text-slate-700 dark:text-slate-300 flex items-center justify-between"
            >
              <span>"Time for Dinner"</span>
              <Volume2 className="w-3.5 h-3.5 text-sky-600" />
            </button>
            <button
              onClick={() => speak('Great job today. Time to get cozy and rest.')}
              data-switch-target="true"
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold rounded-lg text-left text-slate-700 dark:text-slate-300 flex items-center justify-between"
            >
              <span>"Bedtime Transition"</span>
              <Volume2 className="w-3.5 h-3.5 text-sky-600" />
            </button>
          </div>
        </div>

      </div>

      {/* Printable Visual Flashcards & Routine Strip Section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Printable Home & Classroom Visual Cards
            </h2>
            <p className="text-xs text-slate-500">
              Standard PECS-style cards formatted with clear cutting borders for home routine boards.
            </p>
          </div>

          <form onSubmit={handleAddCustomPrintCard} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add custom home card..."
              value={customCardTitle}
              onChange={(e) => setCustomCardTitle(e.target.value)}
              className="px-3 py-2 text-xs border rounded-xl dark:bg-slate-800 dark:border-slate-700"
            />
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold bg-sky-600 text-white rounded-xl hover:bg-sky-700 shrink-0"
            >
              + Add
            </button>
          </form>
        </div>

        {/* Printable Grid of Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {printCards.map(card => (
            <div 
              key={card.id}
              className="print-card p-4 rounded-2xl border-4 bg-white text-slate-900 flex flex-col items-center justify-center text-center gap-2 min-h-44 shadow-sm"
              style={{ borderColor: card.color }}
            >
              <span className="text-5xl">{card.iconText}</span>
              <span className="text-sm font-extrabold leading-tight mt-2 text-black">
                {card.title}
              </span>
              <button
                onClick={() => speak(card.prompt)}
                className="no-print mt-2 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                aria-label={`Read ${card.title}`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-slate-400 no-print">
          💡 Click "Print Schedule & Cards" above to generate a printer-friendly layout for scissors & laminating.
        </div>
      </div>

    </div>
  );
};
