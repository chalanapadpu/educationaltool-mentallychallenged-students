import React, { useState, useRef, useEffect } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  Circle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Layers, 
  MousePointerClick, 
  BookOpen, 
  HeartHandshake, 
  HelpCircle, 
  Star, 
  Check, 
  ListOrdered, 
  Calculator, 
  Smile, 
  Hand,
  ChevronRight,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

// ---------------- TASK ANALYSIS INTERFACES & DATA ----------------
interface TaskStep {
  stepNumber: number;
  title: string;
  instruction: string;
  iconText: string;
  reinforcementNote: string;
}

interface ChainedTask {
  id: string;
  name: string;
  category: 'Life Skills' | 'Classroom Routine' | 'Self-Care';
  steps: TaskStep[];
}

const CHAINED_TASKS: ChainedTask[] = [
  {
    id: 'task-handwash',
    name: 'Washing Hands Clean',
    category: 'Self-Care',
    steps: [
      { stepNumber: 1, title: 'Turn on Water', instruction: 'Turn the water tap on gently so the water feels comfortable.', iconText: '🚰', reinforcementNote: 'Water is flowing!' },
      { stepNumber: 2, title: 'Wet Both Hands', instruction: 'Put both hands under the running water to get them wet.', iconText: '🤲', reinforcementNote: 'Hands are wet!' },
      { stepNumber: 3, title: 'Pump Soap & Scrub', instruction: 'Push 1 pump of soap. Scrub your palms, fingers, and back of hands.', iconText: '🧼', reinforcementNote: 'Bubbles everywhere!' },
      { stepNumber: 4, title: 'Rinse Soap Off', instruction: 'Hold hands under the clean water until all bubbles are washed away.', iconText: '🌊', reinforcementNote: 'All bubbles gone!' },
      { stepNumber: 5, title: 'Dry Hands', instruction: 'Use a soft clean towel to dry your hands completely. All done!', iconText: '🧻', reinforcementNote: 'Clean and dry! ★' },
    ]
  },
  {
    id: 'task-desk-ready',
    name: 'Getting Ready to Learn',
    category: 'Classroom Routine',
    steps: [
      { stepNumber: 1, title: 'Hang Backpack', instruction: 'Hang your backpack on your classroom hook.', iconText: '🎒', reinforcementNote: 'Backpack safe and hung!' },
      { stepNumber: 2, title: 'Sit at Desk', instruction: 'Walk calmly to your chair and sit comfortably with feet on floor.', iconText: '🪑', reinforcementNote: 'Sitting safely!' },
      { stepNumber: 3, title: 'Prepare Tool', instruction: 'Place your tablet or pencil gently on your desk.', iconText: '✏️', reinforcementNote: 'Tools ready!' },
      { stepNumber: 4, title: 'Calm Breath', instruction: 'Take one slow, peaceful breath. You are ready to learn!', iconText: '🌟', reinforcementNote: 'Ready and proud! ★' },
    ]
  },
  {
    id: 'task-snack',
    name: 'Preparing Snack Time',
    category: 'Life Skills',
    steps: [
      { stepNumber: 1, title: 'Wash Hands', instruction: 'Wash your hands clean before touching food.', iconText: '🧼', reinforcementNote: 'Hands clean!' },
      { stepNumber: 2, title: 'Get Your Snack', instruction: 'Take your snack container out gently.', iconText: '🍎', reinforcementNote: 'Snack ready!' },
      { stepNumber: 3, title: 'Pour Fresh Water', instruction: 'Fill your water cup to the line.', iconText: '🥛', reinforcementNote: 'Hydration ready!' },
      { stepNumber: 4, title: 'Enjoy & Clean Up', instruction: 'Eat slowly, then place empty trash into the bin. Great job!', iconText: '🗑️', reinforcementNote: 'All cleaned up! ★' },
    ]
  }
];

// ---------------- SOCIAL STORIES DATA ----------------
interface SocialStoryPage {
  pageNumber: number;
  text: string;
  imageIcon: string;
  tip: string;
}

interface SocialStory {
  id: string;
  title: string;
  description: string;
  pages: SocialStoryPage[];
}

const SOCIAL_STORIES: SocialStory[] = [
  {
    id: 'story-overwhelm',
    title: 'When My Room Gets Too Loud',
    description: 'A comforting story about recognizing sensory overload and choosing a safe break.',
    pages: [
      {
        pageNumber: 1,
        text: 'Sometimes, the classroom or hallway gets very loud with voices, bells, or scraping chairs.',
        imageIcon: '📢',
        tip: 'Loud sounds can feel heavy in our ears and body.'
      },
      {
        pageNumber: 2,
        text: 'When it is too noisy, my head or tummy might feel tense. That is my body telling me I need a quiet moment.',
        imageIcon: '🥺',
        tip: 'It is okay to feel this way. Everyone needs quiet sometimes.'
      },
      {
        pageNumber: 3,
        text: 'I can tap the "I Need A Break" button or point to the Sensory Calm Corner.',
        imageIcon: '☕',
        tip: 'Asking for a break is a wonderful self-advocacy skill.'
      },
      {
        pageNumber: 4,
        text: 'I can breathe with the guided bubble or watch the gentle star ripples. Soon, my body feels relaxed and calm again.',
        imageIcon: '✨',
        tip: 'I am safe, calm, and ready to learn when I choose.'
      }
    ]
  },
  {
    id: 'story-sharing',
    title: 'Taking Turns with Friends',
    description: 'Learning patience and turn-taking with visual timers.',
    pages: [
      {
        pageNumber: 1,
        text: 'In our classroom, we share fun learning toys, sensory items, and tablets.',
        imageIcon: '🧩',
        tip: 'Sharing helps us make good friends.'
      },
      {
        pageNumber: 2,
        text: 'When my friend is using a toy I want, I can ask: "May I have a turn next, please?"',
        imageIcon: '🗣️',
        tip: 'Using kind words helps my friend hear me.'
      },
      {
        pageNumber: 3,
        text: 'We can set the visual sand-timer for 3 minutes. While the sand falls, I can do another fun puzzle.',
        imageIcon: '⏳',
        tip: 'Watching the sand fall makes waiting easy.'
      },
      {
        pageNumber: 4,
        text: 'When the timer rings, it is my turn! My friend is happy and I am happy too.',
        imageIcon: '🎉',
        tip: 'Taking turns is a superstar skill!'
      }
    ]
  }
];

export const CBLTLearningLab: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    speak, 
    playFeedback, 
    triggerCelebration, 
    activeStudent 
  } = useAccessibility();

  // Active sub-tool tab
  const [activeLabTab, setActiveLabTab] = useState<'chaining' | 'math' | 'cause-effect' | 'social-story' | 'choice-board'>('chaining');

  // ---------- 1. TASK ANALYSIS / CHAINING STATE ----------
  const [selectedTask, setSelectedTask] = useState<ChainedTask>(CHAINED_TASKS[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [completedStepIndices, setCompletedStepIndices] = useState<number[]>([]);
  const [taskFinished, setTaskFinished] = useState<boolean>(false);

  const activeStep = selectedTask.steps[currentStepIndex];

  const handleStepComplete = () => {
    audioSynth.playPentatonicNote(currentStepIndex);
    playFeedback('chime');
    setCompletedStepIndices(prev => [...new Set([...prev, currentStepIndex])]);

    if (currentStepIndex + 1 < selectedTask.steps.length) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      speak(`Good job! Step ${nextIndex + 1}: ${selectedTask.steps[nextIndex].title}. ${selectedTask.steps[nextIndex].instruction}`);
    } else {
      setTaskFinished(true);
      triggerCelebration();
      speak(`Superstar work! You finished all steps of ${selectedTask.name}!`);
    }
  };

  const handleResetTask = (task: ChainedTask) => {
    setSelectedTask(task);
    setCurrentStepIndex(0);
    setCompletedStepIndices([]);
    setTaskFinished(false);
    playFeedback('tap');
    speak(`Let's start ${task.name}. Step 1: ${task.steps[0].title}. ${task.steps[0].instruction}`);
  };

  // ---------- 2. CONCRETE TEN-FRAME COUNTING STATE ----------
  const [tenFrameItems, setTenFrameItems] = useState<boolean[]>(new Array(10).fill(false));
  const [tokenType, setTokenType] = useState<'star' | 'apple' | 'heart' | 'cube'>('star');
  const [targetCountGoal, setTargetCountGoal] = useState<number>(4);

  const filledCount = tenFrameItems.filter(Boolean).length;

  const handleToggleFrameBox = (index: number) => {
    const next = [...tenFrameItems];
    const willAdd = !next[index];
    next[index] = willAdd;
    setTenFrameItems(next);

    const newTotal = next.filter(Boolean).length;
    if (willAdd) {
      audioSynth.playPentatonicNote(newTotal - 1);
      speak(`${newTotal}`);
      if (newTotal === targetCountGoal) {
        setTimeout(() => {
          triggerCelebration();
          speak(`Wonderful! You made ${targetCountGoal} tokens on the ten-frame!`);
        }, 500);
      }
    } else {
      playFeedback('tap');
      speak(`${newTotal}`);
    }
  };

  const handleClearTenFrame = () => {
    setTenFrameItems(new Array(10).fill(false));
    playFeedback('tap');
    speak('Ten-frame cleared.');
  };

  // ---------- 3. CAUSE-AND-EFFECT SANDBOX STATE ----------
  const [causeEffectMode, setCauseEffectMode] = useState<'bloom' | 'target'>('bloom');
  const bloomCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [targetPosition, setTargetPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [targetHits, setTargetHits] = useState<number>(0);

  const handleBloomInteraction = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = bloomCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Play pentatonic xylophone note based on X position
    const noteIdx = Math.floor((x / canvas.width) * 7);
    audioSynth.playPentatonicNote(noteIdx);

    // Draw blooming flower / circle
    const colors = ['#38bdf8', '#34d399', '#f43f5e', '#fbbf24', '#a855f7'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];

    let radius = 10;
    const maxRadius = 45;

    const bloomInterval = window.setInterval(() => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = chosenColor;
      ctx.globalAlpha = 0.45;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      radius += 4;
      if (radius > maxRadius) {
        clearInterval(bloomInterval);
      }
    }, 25);
  };

  const moveTarget = () => {
    const newX = Math.floor(Math.random() * 70) + 15;
    const newY = Math.floor(Math.random() * 65) + 15;
    setTargetPosition({ x: newX, y: newY });
  };

  const handleHitTarget = () => {
    audioSynth.playPentatonicNote(targetHits);
    triggerCelebration();
    setTargetHits(prev => prev + 1);
    moveTarget();
    speak('You caught the smiling star!');
  };

  // ---------- 4. SOCIAL STORIES READER STATE ----------
  const [selectedStory, setSelectedStory] = useState<SocialStory>(SOCIAL_STORIES[0]);
  const [storyPage, setStoryPage] = useState<number>(0);
  const activePage = selectedStory.pages[storyPage];

  // ---------- 5. CHOICE MAKER STATE ----------
  const [chosenOption, setChosenOption] = useState<string | null>(null);
  const choiceOptions = [
    { id: 'c1', label: 'Sensory Starfield Break', icon: '✨', color: '#0d9488' },
    { id: 'c2', label: 'Listen to Gentle Music', icon: '🎵', color: '#6366f1' },
    { id: 'c3', label: 'Play with Fidget Toy', icon: '🧸', color: '#f59e0b' },
    { id: 'c4', label: 'Coloring / Drawing', icon: '🎨', color: '#ec4899' },
  ];

  const handleSelectChoice = (option: typeof choiceOptions[0]) => {
    playFeedback('chime');
    setChosenOption(option.label);
    speak(`${activeStudent.name} chooses: ${option.label}. Excellent choice!`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 py-6">
      
      {/* Header & Errorless Learning Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-sky-600" />
            <span>Computer-Based Learning Tool (CBLT) Lab</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Evidence-based cognitive interventions: step-by-step task chaining, concrete 1-to-1 counting, cause-and-effect training, and errorless learning.
          </p>
        </div>

        {/* Errorless Learning Mode Switch */}
        <div className="flex items-center gap-3 p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl">
          <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-200 text-xs font-semibold">
            <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <div className="font-bold">Errorless Learning Mode</div>
              <div className="text-[10px] text-amber-700 dark:text-amber-300">Highlights correct paths & prevents frustration</div>
            </div>
          </div>
          <button
            onClick={() => {
              playFeedback('tap');
              const nextVal = !settings.errorlessLearning;
              updateSettings({ errorlessLearning: nextVal });
              speak(nextVal ? 'Errorless learning mode is turned on.' : 'Errorless learning mode is turned off.');
            }}
            data-switch-target="true"
            aria-label="Toggle errorless learning mode"
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
              settings.errorlessLearning
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
            }`}
          >
            {settings.errorlessLearning ? 'Active ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Nav Tabs for CBLT Lab Modules */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'chaining' as const, label: 'Task Chaining & Routines', icon: ListOrdered },
          { id: 'math' as const, label: '1-to-1 Ten-Frame Math', icon: Calculator },
          { id: 'cause-effect' as const, label: 'Cause & Effect Sandbox', icon: MousePointerClick },
          { id: 'social-story' as const, label: 'Visual Social Stories', icon: BookOpen },
          { id: 'choice-board' as const, label: 'Visual Choice Maker', icon: HeartHandshake },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeLabTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playFeedback('tap');
                setActiveLabTab(tab.id);
              }}
              data-switch-target="true"
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* 1. INTERACTIVE TASK ANALYSIS & STEP-BY-STEP CHAINING MODULE    */}
      {/* ============================================================== */}
      {activeLabTab === 'chaining' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Routine Selector (1 col) */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Select Routine to Practice:
            </span>
            {CHAINED_TASKS.map(task => (
              <button
                key={task.id}
                onClick={() => handleResetTask(task)}
                data-switch-target="true"
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col gap-1 ${
                  selectedTask.id === task.id
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                  {task.category}
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {task.name}
                </div>
                <div className="text-xs text-slate-500">
                  {task.steps.length} sequential steps
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Step-by-Step Stage (2 cols) */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between gap-6">
            
            {/* Header: Routine Name & Progress Dots */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs uppercase font-extrabold text-sky-600">
                    Step {currentStepIndex + 1} of {selectedTask.steps.length}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {selectedTask.name}
                  </h2>
                </div>
                <button
                  onClick={() => handleResetTask(selectedTask)}
                  data-switch-target="true"
                  className="p-2 text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart</span>
                </button>
              </div>

              {/* Progress Dots */}
              <div className="flex items-center gap-2 mt-4">
                {selectedTask.steps.map((st, i) => {
                  const isDone = completedStepIndices.includes(i);
                  const isCurrent = i === currentStepIndex && !taskFinished;
                  return (
                    <div 
                      key={i} 
                      className={`h-2.5 flex-1 rounded-full transition-all ${
                        isDone ? 'bg-emerald-500' : isCurrent ? 'bg-sky-500 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Active Step Content Card */}
            {!taskFinished ? (
              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 flex flex-col items-center text-center gap-4">
                <span className="text-6xl my-2">{activeStep.iconText}</span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {activeStep.title}
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 max-w-md">
                  {activeStep.instruction}
                </p>

                {/* Audio Instruction Trigger */}
                <button
                  onClick={() => speak(`Step ${activeStep.stepNumber}: ${activeStep.title}. ${activeStep.instruction}`)}
                  data-switch-target="true"
                  aria-label="Read step instruction aloud"
                  className="px-4 py-2 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 text-xs font-bold text-sky-600 dark:text-sky-300 flex items-center gap-2 shadow-xs"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen to Instruction</span>
                </button>
              </div>
            ) : (
              /* Completion Celebration Card */
              <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-600 flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-extrabold text-emerald-800 dark:text-emerald-200">
                  All Steps Finished! ★
                </h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-300 max-w-md">
                  {activeStudent.name} successfully practiced {selectedTask.name} from start to finish!
                </p>
                <button
                  onClick={() => handleResetTask(selectedTask)}
                  data-switch-target="true"
                  className="mt-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-sm"
                >
                  Practice Again
                </button>
              </div>
            )}

            {/* Step Completion Action Button (Big 48px+ Hit Target) */}
            {!taskFinished && (
              <div className="flex justify-end">
                <button
                  onClick={handleStepComplete}
                  data-switch-target="true"
                  aria-label={`Mark step ${activeStep.stepNumber} complete`}
                  className={`h-16 px-8 rounded-2xl font-extrabold text-base flex items-center gap-3 text-white transition-all shadow-md active:scale-95 ${
                    settings.errorlessLearning
                      ? 'bg-emerald-600 hover:bg-emerald-700 ring-4 ring-emerald-300 dark:ring-emerald-700'
                      : 'bg-sky-600 hover:bg-sky-700'
                  }`}
                >
                  <CheckCircle2 className="w-6 h-6" />
                  <span>I Did This Step! Next Step →</span>
                </button>
              </div>
            )}

          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 2. CONCRETE 1-TO-1 TEN-FRAME MATH MANIPULATIVE MODULE          */}
      {/* ============================================================== */}
      {activeLabTab === 'math' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs uppercase font-extrabold text-sky-600">
                Visual Math Manipulatives
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Ten-Frame 1-to-1 Correspondence Counter
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Concrete representation of numbers: tap boxes to add or remove tokens with synchronized spoken numbers.
              </p>
            </div>

            {/* Target Goal Prompt */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-sky-50 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-700 rounded-xl text-center">
                <span className="text-[10px] uppercase font-bold text-sky-600 block">Goal Target:</span>
                <span className="text-lg font-extrabold font-mono text-sky-800 dark:text-sky-200">
                  {targetCountGoal} Tokens
                </span>
              </div>
              <button
                onClick={() => {
                  const nextGoal = Math.floor(Math.random() * 8) + 2;
                  setTargetCountGoal(nextGoal);
                  speak(`Can you count ${nextGoal} tokens on the ten-frame?`);
                }}
                data-switch-target="true"
                className="text-xs font-semibold px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200"
              >
                New Goal
              </button>
            </div>
          </div>

          {/* Token Shape Picker & Reset */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Token Object:</span>
              {[
                { type: 'star' as const, icon: '⭐', label: 'Stars' },
                { type: 'apple' as const, icon: '🍎', label: 'Apples' },
                { type: 'heart' as const, icon: '❤️', label: 'Hearts' },
                { type: 'cube' as const, icon: '🟦', label: 'Cubes' },
              ].map(tok => (
                <button
                  key={tok.type}
                  onClick={() => {
                    setTokenType(tok.type);
                    playFeedback('tap');
                  }}
                  data-switch-target="true"
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 border ${
                    tokenType === tok.type
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600'
                  }`}
                >
                  <span>{tok.icon}</span>
                  <span>{tok.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleClearTenFrame}
              data-switch-target="true"
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-100"
            >
              Clear Frame
            </button>
          </div>

          {/* Ten-Frame Grid (2 rows of 5 boxes) */}
          <div className="grid grid-cols-5 gap-3 max-w-3xl mx-auto w-full py-4">
            {tenFrameItems.map((filled, idx) => {
              // In errorless learning mode, highlight next box to fill if below target
              const isPromptedNext = settings.errorlessLearning && !filled && idx < targetCountGoal;

              return (
                <button
                  key={idx}
                  onClick={() => handleToggleFrameBox(idx)}
                  data-switch-target="true"
                  aria-label={`Box ${idx + 1}, ${filled ? 'contains token' : 'empty'}`}
                  className={`h-28 rounded-2xl border-4 flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 ${
                    filled
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 shadow-md'
                      : isPromptedNext
                      ? 'border-amber-400 bg-amber-50/50 dark:bg-amber-950/30 animate-pulse'
                      : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100'
                  }`}
                >
                  {filled ? (
                    <span className="text-4xl animate-bounce">
                      {tokenType === 'star' ? '⭐' : tokenType === 'apple' ? '🍎' : tokenType === 'heart' ? '❤️' : '🟦'}
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {idx + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Live Spoken Total Feedback */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold font-mono text-sky-700 dark:text-sky-300">
                {filledCount}
              </span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {filledCount === 1 ? 'Token on frame' : 'Tokens on frame'}
              </span>
            </div>

            <button
              onClick={() => speak(`There are currently ${filledCount} tokens on the ten-frame.`)}
              data-switch-target="true"
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-700 border text-xs font-bold text-sky-600 dark:text-sky-300 flex items-center gap-1.5 shadow-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>Read Total Aloud</span>
            </button>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 3. CAUSE-AND-EFFECT & TARGET ACQUISITION SANDBOX                */}
      {/* ============================================================== */}
      {activeLabTab === 'cause-effect' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs uppercase font-extrabold text-sky-600">
                Early Computer Literacy & Motor Coordination
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Cause-and-Effect Interaction Sandbox
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Reinforces the connection: "When I touch or click the screen, a pleasant harmonic sound and color blooms."
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => {
                  setCauseEffectMode('bloom');
                  playFeedback('tap');
                }}
                data-switch-target="true"
                className={`px-3 py-1.5 text-xs font-bold rounded-lg ${
                  causeEffectMode === 'bloom'
                    ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                Touch & Bloom
              </button>
              <button
                onClick={() => {
                  setCauseEffectMode('target');
                  playFeedback('tap');
                }}
                data-switch-target="true"
                className={`px-3 py-1.5 text-xs font-bold rounded-lg ${
                  causeEffectMode === 'target'
                    ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                Target Catch
              </button>
            </div>
          </div>

          {/* Mode A: Touch & Bloom Canvas */}
          {causeEffectMode === 'bloom' ? (
            <div className="relative w-full h-88 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center cursor-pointer">
              <canvas
                ref={bloomCanvasRef}
                width={800}
                height={350}
                onPointerDown={handleBloomInteraction}
                className="w-full h-full block"
              />
              <div className="absolute top-4 left-4 pointer-events-none text-xs text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
                Tap or click anywhere to play musical tones & grow colorful blooms!
              </div>
            </div>
          ) : (
            /* Mode B: Target Acquisition (Catch the Star) */
            <div className="relative w-full h-88 rounded-2xl overflow-hidden bg-radial from-slate-900 to-slate-950 border border-slate-800 flex items-center justify-center">
              <div className="absolute top-4 left-4 text-xs text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                Stars Caught: <strong className="text-amber-400">{targetHits}</strong>
              </div>

              {/* Floating Smiling Target Star (Big 64px hit target) */}
              <button
                onClick={handleHitTarget}
                data-switch-target="true"
                aria-label="Catch the smiling star"
                className="absolute w-20 h-20 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-900 flex items-center justify-center text-4xl shadow-xl transition-all active:scale-90 animate-bounce"
                style={{
                  left: `${targetPosition.x}%`,
                  top: `${targetPosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                🌟
              </button>
            </div>
          )}

        </div>
      )}

      {/* ============================================================== */}
      {/* 4. VISUAL SOCIAL STORIES READER MODULE                         */}
      {/* ============================================================== */}
      {activeLabTab === 'social-story' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs uppercase font-extrabold text-sky-600">
                Social-Emotional Scaffolding
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Picture-Supported Social Stories
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Visual scenarios (Carol Gray framework) helping students anticipate social routines and manage emotions.
              </p>
            </div>

            {/* Story Picker */}
            <div className="flex items-center gap-2">
              {SOCIAL_STORIES.map(story => (
                <button
                  key={story.id}
                  onClick={() => {
                    setSelectedStory(story);
                    setStoryPage(0);
                    playFeedback('tap');
                  }}
                  data-switch-target="true"
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    selectedStory.id === story.id
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600'
                  }`}
                >
                  {story.title}
                </button>
              ))}
            </div>
          </div>

          {/* Social Story Interactive Page Card */}
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 flex flex-col items-center text-center gap-6 max-w-2xl mx-auto w-full">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
              Page {storyPage + 1} of {selectedStory.pages.length}
            </span>

            <span className="text-7xl my-1">{activePage.imageIcon}</span>

            <p className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
              "{activePage.text}"
            </p>

            <div className="p-3 bg-sky-100/60 dark:bg-sky-950/40 rounded-xl text-xs text-sky-900 dark:text-sky-200 font-medium">
              💡 {activePage.tip}
            </div>

            {/* Read Aloud Button */}
            <button
              onClick={() => speak(activePage.text)}
              data-switch-target="true"
              aria-label="Read this page aloud"
              className="px-5 py-2.5 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 text-xs font-bold text-sky-600 dark:text-sky-300 flex items-center gap-2 shadow-xs"
            >
              <Volume2 className="w-5 h-5" />
              <span>Read Aloud</span>
            </button>
          </div>

          {/* Page Turn Actions (Big 48px+ hit targets) */}
          <div className="flex items-center justify-between max-w-2xl mx-auto w-full">
            <button
              onClick={() => {
                if (storyPage > 0) {
                  setStoryPage(prev => prev - 1);
                  playFeedback('tap');
                }
              }}
              disabled={storyPage === 0}
              data-switch-target="true"
              className="h-12 px-6 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => {
                if (storyPage + 1 < selectedStory.pages.length) {
                  setStoryPage(prev => prev + 1);
                  playFeedback('tap');
                } else {
                  triggerCelebration();
                  speak('You finished reading the story! Wonderful job!');
                }
              }}
              data-switch-target="true"
              className="h-12 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs"
            >
              <span>{storyPage + 1 === selectedStory.pages.length ? 'Finished! ★' : 'Next Page'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 5. VISUAL CHOICE BOARD (SELF-DETERMINATION TOOL)                */}
      {/* ============================================================== */}
      {activeLabTab === 'choice-board' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col gap-6">
          
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs uppercase font-extrabold text-sky-600">
              Student Self-Advocacy & Choice Making
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Visual Break & Reward Choice Board
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Building autonomy for students with intellectual disabilities by presenting clear, bounded visual options.
            </p>
          </div>

          <div className="text-center my-2">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              "What would you like to do for your break?"
            </h3>
            {chosenOption && (
              <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
                Selected Choice: {chosenOption} ★
              </p>
            )}
          </div>

          {/* Choice Grid (Big accessible cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto w-full">
            {choiceOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelectChoice(opt)}
                data-switch-target="true"
                aria-label={`Choose ${opt.label}`}
                className="h-44 p-4 rounded-3xl border-4 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-all flex flex-col items-center justify-center text-center gap-3 active:scale-95 group shadow-sm"
                style={{ borderColor: opt.color }}
              >
                <span className="text-5xl group-hover:scale-110 transition-transform">
                  {opt.icon}
                </span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
