import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  X, 
  Volume2, 
  Eye, 
  Sliders, 
  Type, 
  Sparkles, 
  Zap, 
  RefreshCw, 
  Speech,
  Smartphone
} from 'lucide-react';
import { ThemeMode, FontFamilyMode, TextSizeMode } from '../types';

interface AccessibilityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityDrawer: React.FC<AccessibilityDrawerProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings, speak, playFeedback, activeStudent } = useAccessibility();

  if (!isOpen) return null;

  const themes: { id: ThemeMode; label: string; previewClass: string }[] = [
    { id: 'default', label: 'Balanced Soft', previewClass: 'bg-slate-50 text-slate-800 border-slate-300' },
    { id: 'calm-pastel', label: 'Sensory Pastel', previewClass: 'bg-emerald-50 text-teal-900 border-teal-200' },
    { id: 'high-contrast-dark', label: 'High Contrast (Dark)', previewClass: 'bg-black text-white border-white' },
    { id: 'yellow-on-black', label: 'Yellow on Black (Low Vision)', previewClass: 'bg-black text-yellow-300 border-yellow-400' },
    { id: 'high-contrast-light', label: 'High Contrast (Light)', previewClass: 'bg-white text-black border-black' },
    { id: 'dark', label: 'Muted Slate Dark', previewClass: 'bg-slate-900 text-slate-100 border-slate-700' }
  ];

  const fonts: { id: FontFamilyMode; label: string; desc: string }[] = [
    { id: 'default', label: 'Standard Clean', desc: 'Plus Jakarta Sans' },
    { id: 'lexend', label: 'Lexend', desc: 'Engineered for reading fluency' },
    { id: 'dyslexic', label: 'Dyslexia Friendly', desc: 'Weighted baselines & open counters' }
  ];

  const textSizes: TextSizeMode[] = ['100%', '125%', '150%', '175%', '200%'];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 flex justify-end">
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Accessibility & Sensory Settings"
        className="w-full max-w-md bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 h-full overflow-y-auto shadow-2xl p-6 flex flex-col gap-6 border-l border-slate-200 dark:border-slate-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            <h2 className="text-xl font-bold tracking-tight">Sensory & Access Deck</h2>
          </div>
          <button
            onClick={() => {
              playFeedback('tap');
              onClose();
            }}
            data-switch-target="true"
            aria-label="Close settings drawer"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Student Preset Badge */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Active Profile</div>
            <div className="font-semibold text-slate-900 dark:text-slate-100">{activeStudent.name}</div>
          </div>
          <span className="text-xs px-2.5 py-1 bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-medium rounded-md">
            {activeStudent.sensoryPreference}
          </span>
        </div>

        {/* Contrast & Color Modes */}
        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-semibold flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
            <Eye className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            Contrast & Palette Mode
          </label>
          <div className="grid grid-cols-2 gap-2">
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => {
                  playFeedback('tap');
                  updateSettings({ themeMode: t.id });
                }}
                data-switch-target="true"
                className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${t.previewClass} ${
                  settings.themeMode === t.id ? 'ring-2 ring-sky-500 shadow-sm' : 'opacity-85 hover:opacity-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-semibold flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
            <Type className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            Reading & Typography Typeface
          </label>
          <div className="flex flex-col gap-1.5">
            {fonts.map(f => (
              <button
                key={f.id}
                onClick={() => {
                  playFeedback('tap');
                  updateSettings({ fontFamily: f.id });
                }}
                data-switch-target="true"
                className={`p-3 rounded-lg border text-left transition-all ${
                  settings.fontFamily === f.id
                    ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="text-sm">{f.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-normal">{f.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Text Scale */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Text & Interface Scale
            </label>
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">{settings.textSize}</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {textSizes.map(size => (
              <button
                key={size}
                onClick={() => {
                  playFeedback('tap');
                  updateSettings({ textSize: size });
                }}
                data-switch-target="true"
                className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                  settings.textSize === size
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Cognitive & Sensory Toggles */}
        <div className="flex flex-col gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Sensory & Assistive Aids</div>

          {/* Reading Ruler */}
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
            <div>
              <div className="text-sm font-medium">Focus Reading Ruler</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Yellow focus strip follows cursor to isolate text lines</div>
            </div>
            <input
              type="checkbox"
              checked={settings.readingRuler}
              onChange={(e) => updateSettings({ readingRuler: e.target.checked })}
              className="w-5 h-5 text-sky-600 rounded"
            />
          </label>

          {/* Reduced Motion */}
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
            <div>
              <div className="text-sm font-medium">Reduced Motion & Calming Mode</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Eliminates sudden movement and rapid transitions</div>
            </div>
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => updateSettings({ reducedMotion: e.target.checked })}
              className="w-5 h-5 text-sky-600 rounded"
            />
          </label>

          {/* Switch Access Support */}
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Switch-Access Scanning
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Auto-steps focus; Spacebar / Enter triggers action</div>
              </div>
              <input
                type="checkbox"
                checked={settings.switchAccessEnabled}
                onChange={(e) => updateSettings({ switchAccessEnabled: e.target.checked })}
                className="w-5 h-5 text-amber-500 rounded"
              />
            </div>
            {settings.switchAccessEnabled && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
                <span>Scan Delay</span>
                <div className="flex items-center gap-1">
                  {[1200, 1800, 2500].map(speed => (
                    <button
                      key={speed}
                      onClick={() => updateSettings({ switchScanSpeedMs: speed })}
                      className={`px-2 py-1 rounded text-xs ${
                        settings.switchScanSpeedMs === speed
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800'
                      }`}
                    >
                      {speed / 1000}s
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sound & Speech Settings */}
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-sky-600" />
                Auditory Chimes & Cues
              </span>
              <input
                type="checkbox"
                checked={settings.audioFeedback}
                onChange={(e) => updateSettings({ audioFeedback: e.target.checked })}
                className="w-5 h-5 text-sky-600 rounded"
              />
            </div>
            {settings.audioFeedback && (
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.1"
                  value={settings.soundVolume}
                  onChange={(e) => updateSettings({ soundVolume: parseFloat(e.target.value) })}
                  className="w-full"
                  aria-label="Sound volume"
                />
                <button
                  onClick={() => playFeedback('chime')}
                  className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded font-medium shrink-0"
                >
                  Test Chime
                </button>
              </div>
            )}
          </div>

          {/* Speech Rate & Pitch */}
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-1.5">
                <Speech className="w-4 h-4 text-emerald-600" />
                Text-to-Speech Pace
              </span>
              <button
                onClick={() => speak('Hello! This is your clear learning voice speaking.')}
                className="text-xs px-2 py-0.5 text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 rounded"
              >
                Sample Voice
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[
                { label: 'Gentle (0.75x)', rate: 0.75 },
                { label: 'Standard (0.9x)', rate: 0.9 },
                { label: 'Quick (1.1x)', rate: 1.1 },
              ].map(opt => (
                <button
                  key={opt.rate}
                  onClick={() => updateSettings({ ttsSpeed: opt.rate })}
                  className={`py-1.5 rounded border transition-all ${
                    settings.ttsSpeed === opt.rate
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Reset */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <button
            onClick={() => {
              playFeedback('tap');
              updateSettings({
                themeMode: 'default',
                fontFamily: 'lexend',
                textSize: '125%',
                reducedMotion: false,
                readingRuler: false,
                audioFeedback: true,
                soundVolume: 0.3,
                ttsSpeed: 0.85,
                switchAccessEnabled: false,
              });
            }}
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset to Standard Accessible Defaults
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-sky-600 text-white font-medium text-xs rounded-lg hover:bg-sky-700"
          >
            Apply & Save
          </button>
        </div>
      </div>
    </div>
  );
};
