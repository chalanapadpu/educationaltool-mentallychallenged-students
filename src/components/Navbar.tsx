import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { Sliders, Volume2, Sparkles, User, School, Heart } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenSettings }) => {
  const { role, setRole, activeStudent, allStudents, setActiveStudent, playFeedback, isReadingAloud, stopSpeech, speak } = useAccessibility();

  const handleRoleChange = (newRole: UserRole) => {
    playFeedback('tap');
    setRole(newRole);
  };

  const navItems = [
    { id: 'student', label: 'Student Room' },
    { id: 'schedule', label: 'Visual Schedule' },
    { id: 'learning-lab', label: 'CBLT Learning Lab' },
    { id: 'calm', label: 'Sensory Calm' },
    { id: 'educator', label: 'Educator IEP' },
    { id: 'caregiver', label: 'Caregiver Portal' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            playFeedback('tap');
            onSelectTab('student');
          }}
          className="text-xl font-bold tracking-tight text-sky-700 dark:text-sky-400 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-sky-500 rounded-md"
        >
          <span>AuraAble</span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playFeedback('tap');
                onSelectTab(item.id);
              }}
              data-switch-target="true"
              className={`transition-colors pb-1 relative whitespace-nowrap text-sm ${
                currentTab === item.id
                  ? 'text-sky-700 dark:text-sky-300 font-bold border-b-2 border-sky-600 dark:border-sky-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions (Accessibility Deck + Role & Profile Switcher) */}
        <div className="flex items-center gap-3">
          
          {/* Active Student Quick Picker (if in educator or student view) */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400 pl-2">Learner:</span>
            <select
              value={activeStudent.id}
              onChange={(e) => {
                const s = allStudents.find(st => st.id === e.target.value);
                if (s) {
                  setActiveStudent(s);
                  playFeedback('tap');
                }
              }}
              className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 border-none focus:ring-0 cursor-pointer pr-2"
              aria-label="Select active student"
            >
              {allStudents.map(student => (
                <option key={student.id} value={student.id} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Read Page Button */}
          <button
            onClick={() => {
              if (isReadingAloud) {
                stopSpeech();
              } else {
                speak(`You are on the ${currentTab} view for learner ${activeStudent.name}.`);
              }
            }}
            data-switch-target="true"
            aria-label={isReadingAloud ? 'Stop audio narration' : 'Read view aloud'}
            title="Read view aloud"
            className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            <Volume2 className={`w-5 h-5 ${isReadingAloud ? 'text-emerald-600 animate-pulse' : ''}`} />
          </button>

          {/* Sensory & Access Deck Toggle */}
          <button
            onClick={() => {
              playFeedback('tap');
              onOpenSettings();
            }}
            data-switch-target="true"
            aria-label="Open Sensory and Accessibility Settings"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-700 shadow-sm transition-colors whitespace-nowrap"
          >
            <Sliders className="w-4 h-4" aria-hidden="true" />
            <span>Access Deck</span>
          </button>

        </div>
      </div>

      {/* Mobile Subnav */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 dark:border-slate-800 py-2 px-2 overflow-x-auto gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              playFeedback('tap');
              onSelectTab(item.id);
            }}
            data-switch-target="true"
            className={`text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap ${
              currentTab === item.id
                ? 'bg-sky-600 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
