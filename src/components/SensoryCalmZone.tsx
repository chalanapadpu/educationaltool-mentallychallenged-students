import React, { useState, useEffect, useRef } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Sparkles, 
  Wind, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Heart, 
  Compass, 
  Waves, 
  CloudRain, 
  BellRing 
} from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface StarParticle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
}

export const SensoryCalmZone: React.FC = () => {
  const { playFeedback, speak } = useAccessibility();

  // Ambient sound selector
  const [activeSound, setActiveSound] = useState<'none' | 'ocean' | 'rain' | 'bowl'>('none');
  const [ambientVolume, setAmbientVolume] = useState<number>(0.25);

  // Breathing state
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathSeconds, setBreathSeconds] = useState<number>(4);

  // Canvas ref for particle field
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<StarParticle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Guided breathing loop
  useEffect(() => {
    let timer: number;
    let phase = 0; // 0: Inhale (4s), 1: Hold (4s), 2: Exhale (4s)
    let count = 4;

    timer = window.setInterval(() => {
      count -= 1;
      if (count <= 0) {
        phase = (phase + 1) % 3;
        if (phase === 0) {
          setBreathingPhase('Inhale');
          count = 4;
        } else if (phase === 1) {
          setBreathingPhase('Hold');
          count = 4;
        } else {
          setBreathingPhase('Exhale');
          count = 4;
        }
      }
      setBreathSeconds(count);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Ambient sound management
  const handleToggleSound = (type: 'ocean' | 'rain' | 'bowl') => {
    playFeedback('tap');
    if (activeSound === type) {
      audioSynth.stopAmbientSound();
      setActiveSound('none');
    } else {
      audioSynth.startAmbientSound(type, ambientVolume);
      setActiveSound(type);
    }
  };

  useEffect(() => {
    return () => {
      audioSynth.stopAmbientSound();
    };
  }, []);

  // Particle & Starfield Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = 360;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initial gentle ambient stars
    particlesRef.current = [];
    for (let i = 0; i < 40; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: ['#38bdf8', '#818cf8', '#34d399', '#f472b6', '#fcd34d'][Math.floor(Math.random() * 5)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges gently
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Spawn ripple particles on pointer move or touch
  const handlePointerInteraction = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spawn 2-3 gentle glow orbs
    const colors = ['#38bdf8', '#a78bfa', '#6ee7b7', '#fde047'];
    for (let i = 0; i < 3; i++) {
      if (particlesRef.current.length > 70) {
        particlesRef.current.shift();
      }
      particlesRef.current.push({
        x,
        y,
        radius: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        alpha: 0.8
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Sensory Calm-Down Space</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Regulate sensory load with interactive fluid starfields, paced breathing, and calming acoustic soundscapes.
          </p>
        </div>

        <button
          onClick={() => {
            speak('Welcome to your calm space. Relax your shoulders and breathe gently.');
            playFeedback('tap');
          }}
          data-switch-target="true"
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 shadow-xs"
        >
          <Sparkles className="w-4 h-4" />
          <span>Voice Calming Guide</span>
        </button>
      </div>

      {/* Main Grid: Interactive Starfield + Paced Breathing Bubble */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Interactive Starfield & Tactile Ripple Canvas (2 cols) */}
        <div className="lg:col-span-2 bg-slate-950 rounded-3xl p-6 text-white flex flex-col gap-4 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              <h2 className="text-base font-bold text-slate-100">Interactive Soothing Ripple Field</h2>
            </div>
            <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
              Touch or drag mouse across the stars
            </span>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden bg-radial from-slate-900 to-black h-88 flex items-center justify-center cursor-crosshair">
            <canvas
              ref={canvasRef}
              onPointerMove={handlePointerInteraction}
              onPointerDown={handlePointerInteraction}
              className="w-full h-full block"
            />
            <div className="absolute bottom-4 left-4 pointer-events-none text-xs text-slate-400/80">
              Gentle starlight drifts with zero sudden flashes.
            </div>
          </div>

          {/* Sound Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-800 z-10">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-sky-400" />
              Calm Soundscapes (Synthesized Web Audio):
            </span>

            <div className="flex items-center gap-2">
              {[
                { type: 'ocean' as const, label: 'Ocean Surf', icon: Waves },
                { type: 'rain' as const, label: 'Gentle Rain', icon: CloudRain },
                { type: 'bowl' as const, label: 'Singing Bowl', icon: BellRing },
              ].map(item => {
                const Icon = item.icon;
                const isActive = activeSound === item.type;
                return (
                  <button
                    key={item.type}
                    onClick={() => handleToggleSound(item.type)}
                    data-switch-target="true"
                    className={`px-3 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {activeSound !== 'none' && (
                <button
                  onClick={() => {
                    audioSynth.stopAmbientSound();
                    setActiveSound('none');
                  }}
                  className="p-2 rounded-xl bg-slate-800 text-rose-400 hover:bg-slate-700"
                  title="Mute Sound"
                >
                  <VolumeX className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Guided Breathing Visualizer (1 col) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col items-center justify-between gap-6">
          <div className="w-full text-center">
            <span className="text-xs uppercase font-extrabold tracking-wider text-teal-600 dark:text-teal-400">
              Paced Rhythm
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Guided Breathing Bubble
            </h2>
          </div>

          {/* Animated Expanding Breathing Ring */}
          <div className="relative w-56 h-56 flex items-center justify-center my-4">
            {/* Outer Pulsing Glow */}
            <div 
              className={`absolute rounded-full transition-all duration-1000 ease-in-out ${
                breathingPhase === 'Inhale' 
                  ? 'w-52 h-52 bg-teal-100 dark:bg-teal-950/60 scale-105' 
                  : breathingPhase === 'Hold'
                  ? 'w-52 h-52 bg-sky-100 dark:bg-sky-950/60 scale-100'
                  : 'w-36 h-36 bg-slate-100 dark:bg-slate-800 scale-90'
              }`}
            />
            {/* Inner Ring */}
            <div 
              className={`relative z-10 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 shadow-md ${
                breathingPhase === 'Inhale'
                  ? 'w-44 h-44 border-teal-500 bg-teal-500/20 text-teal-900 dark:text-teal-200'
                  : breathingPhase === 'Hold'
                  ? 'w-44 h-44 border-sky-500 bg-sky-500/20 text-sky-900 dark:text-sky-200'
                  : 'w-32 h-32 border-slate-400 bg-slate-400/20 text-slate-800 dark:text-slate-200'
              }`}
            >
              <Wind className="w-8 h-8 mb-1 animate-pulse" />
              <span className="text-xl font-extrabold tracking-tight">
                {breathingPhase}
              </span>
              <span className="text-xs font-mono font-bold">
                {breathSeconds}s
              </span>
            </div>
          </div>

          {/* Calming Guidance Tip */}
          <div className="w-full p-4 bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-2xl text-center">
            <p className="text-xs font-medium text-teal-800 dark:text-teal-200">
              {breathingPhase === 'Inhale' && 'Slowly breathe in through your nose...'}
              {breathingPhase === 'Hold' && 'Hold gently and stay relaxed...'}
              {breathingPhase === 'Exhale' && 'Slowly breathe out like blowing out a candle...'}
            </p>
          </div>

          {/* Quick Grounding 5-4-3-2-1 Sensory Card */}
          <div className="w-full pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 text-center">
            Need more support? Reach for your tactile fidget or signal your teacher.
          </div>

        </div>

      </div>

    </div>
  );
};
