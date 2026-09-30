import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Sparkles, 
  Volume2, 
  Star, 
  HandHelping, 
  Coffee, 
  Droplets, 
  ArrowRight, 
  CheckCircle, 
  Smile, 
  Layers, 
  Wind,
  SmilePlus,
  Calculator
} from 'lucide-react';

import owlAvatar from '../assets/images/sensory_mascot_owl_1790775602509.jpg';
import otterAvatar from '../assets/images/sensory_mascot_otter_1790775613358.jpg';
import turtleAvatar from '../assets/images/sensory_mascot_turtle_1790775624697.jpg';
import sensoryRoomBanner from '../assets/images/visual_sensory_room_1790775635620.jpg';

interface StudentRoomProps {
  onNavigate: (tab: string) => void;
}

export const StudentRoom: React.FC<StudentRoomProps> = ({ onNavigate }) => {
  const { 
    activeStudent, 
    setActiveStudent, 
    allStudents, 
    schedule, 
    toggleScheduleItem, 
    speak, 
    playFeedback, 
    triggerCelebration 
  } = useAccessibility();

  const [showAvatarPicker, setShowAvatarPicker] = useState<boolean>(false);

  const avatars = [
    { name: 'Barnaby Owl', url: owlAvatar, trait: 'Wise & Calm' },
    { name: 'Ollie Otter', url: otterAvatar, trait: 'Playful & Gentle' },
    { name: 'Toby Turtle', url: turtleAvatar, trait: 'Patient & Steady' },
  ];

  // Current upcoming task
  const nextItem = schedule.find(s => !s.completed) || schedule[0];

  const handleUrgentCard = (label: string, speech: string) => {
    playFeedback('chime');
    speak(speech);
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-6">
      
      {/* Friendly Welcome & Mascot Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-sky-500 via-teal-500 to-sky-600 p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 z-10">
          <div className="relative group">
            <img
              src={activeStudent.avatarUrl}
              alt={activeStudent.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white/90 shadow-md bg-white"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => {
                playFeedback('tap');
                setShowAvatarPicker(!showAvatarPicker);
              }}
              data-switch-target="true"
              aria-label="Change mascot avatar"
              className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-white text-sky-700 shadow-md hover:scale-105 transition-transform"
            >
              <SmilePlus className="w-4 h-4" />
            </button>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sensory Safe Learning Room</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Hello, {activeStudent.nickname || activeStudent.name}!
            </h1>
            <p className="text-sm text-sky-100 mt-1 max-w-md">
              Take your time today. Learn at your own pace with no pressure.
            </p>
          </div>
        </div>

        {/* Learner Star Tokens & Mascot Button */}
        <div className="flex items-center gap-4 z-10">
          <div className="flex flex-col items-center justify-center p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-center min-w-32">
            <div className="flex items-center gap-1 text-amber-300">
              <Star className="w-6 h-6 fill-amber-300" />
              <span className="text-2xl font-extrabold font-mono text-white">
                {activeStudent.starsEarned}
              </span>
            </div>
            <span className="text-xs uppercase font-bold tracking-wider text-sky-100 mt-1">
              Stars Collected
            </span>
          </div>

          <button
            onClick={() => speak(`Hello ${activeStudent.name}! You have collected ${activeStudent.starsEarned} stars this week. What would you like to do next?`)}
            data-switch-target="true"
            aria-label="Read greeting aloud"
            className="p-4 bg-white/25 hover:bg-white/35 backdrop-blur-md rounded-2xl border border-white/30 transition-transform active:scale-95"
          >
            <Volume2 className="w-7 h-7 text-white" />
          </button>
        </div>

        {/* Subtle Decorative Classroom Backdrop */}
        <img
          src={sensoryRoomBanner}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay pointer-events-none"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Avatar Mascot Selector Modal / Dropdown */}
      {showAvatarPicker && (
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-md flex flex-col gap-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Choose Your Friendly Sensory Companion:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {avatars.map(av => (
              <button
                key={av.name}
                onClick={() => {
                  setActiveStudent({ ...activeStudent, avatarUrl: av.url });
                  setShowAvatarPicker(false);
                  triggerCelebration();
                  speak(`You chose ${av.name}!`);
                }}
                data-switch-target="true"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-500 flex items-center gap-3 bg-slate-50 dark:bg-slate-800 transition-all text-left"
              >
                <img src={av.url} alt="" className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{av.name}</div>
                  <div className="text-xs text-slate-500">{av.trait}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Urgent Accessible Needs Bar (Large 48px+ Hit Targets) */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Quick Help & Communication Bar:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => handleUrgentCard('Help', 'I need help, please.')}
            data-switch-target="true"
            aria-label="I need help button"
            className="h-16 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-md active:scale-95 transition-transform"
          >
            <HandHelping className="w-7 h-7" />
            <span>I Need Help</span>
          </button>

          <button
            onClick={() => {
              handleUrgentCard('Break', 'I need a sensory break, please.');
              onNavigate('calm');
            }}
            data-switch-target="true"
            aria-label="I need a break button"
            className="h-16 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-md active:scale-95 transition-transform"
          >
            <Coffee className="w-7 h-7" />
            <span>I Need A Break</span>
          </button>

          <button
            onClick={() => handleUrgentCard('Water', 'I would like some water, please.')}
            data-switch-target="true"
            aria-label="Drink water button"
            className="h-16 px-6 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-md active:scale-95 transition-transform"
          >
            <Droplets className="w-7 h-7" />
            <span>Drink Water</span>
          </button>
        </div>
      </div>

      {/* Core Activity Launchers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. Next Routine Step Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-sky-600 uppercase tracking-wider">
              Current Task
            </span>
            <h2 className="text-lg font-bold mt-1 text-slate-900 dark:text-slate-100">
              {nextItem ? nextItem.title : 'All routine steps finished!'}
            </h2>
            {nextItem?.reinforcer && (
              <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">
                Reward: {nextItem.reinforcer}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {nextItem && (
              <button
                onClick={() => toggleScheduleItem(nextItem.id)}
                data-switch-target="true"
                className="flex-1 py-3 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mark Done ★</span>
              </button>
            )}
            <button
              onClick={() => onNavigate('schedule')}
              data-switch-target="true"
              className="py-3 px-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1"
            >
              <span>Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. CBLT Computer-Based Learning Lab */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider">
              Skills Lab
            </span>
            <h2 className="text-lg font-bold mt-1 text-slate-900 dark:text-slate-100">
              CBLT Learning Lab
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Step-by-step chaining, 1-to-1 ten-frame counting, and errorless learning.
            </p>
          </div>

          <button
            onClick={() => {
              playFeedback('tap');
              onNavigate('learning-lab');
            }}
            data-switch-target="true"
            className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm"
          >
            <Calculator className="w-5 h-5" />
            <span>Open CBLT Lab</span>
          </button>
        </div>

        {/* 3. Interactive Activities Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-teal-600 uppercase tracking-wider">
              Communication
            </span>
            <h2 className="text-lg font-bold mt-1 text-slate-900 dark:text-slate-100">
              AAC & Expression Board
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Speak with pictogram tiles, match expressions, and explore words.
            </p>
          </div>

          <button
            onClick={() => {
              playFeedback('tap');
              onNavigate('student');
            }}
            data-switch-target="true"
            className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm"
          >
            <Layers className="w-5 h-5" />
            <span>Play Activities</span>
          </button>
        </div>

        {/* 4. Sensory Calm Zone Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
              Rest & Reset
            </span>
            <h2 className="text-lg font-bold mt-1 text-slate-900 dark:text-slate-100">
              Sensory Starfield & Calm
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Slow down with gentle interactive starlight ripples and ocean sounds.
            </p>
          </div>

          <button
            onClick={() => {
              playFeedback('tap');
              onNavigate('calm');
            }}
            data-switch-target="true"
            className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm"
          >
            <Wind className="w-5 h-5" />
            <span>Visit Calm Corner</span>
          </button>
        </div>

      </div>

    </div>
  );
};
