/**
 * Text-to-Speech & Speech Recognition Engine for Special Education
 * Supports natural pacing, rate adjustments, and sentence highlighting.
 */

export interface SpeechOptions {
  rate?: number; // 0.6 - 1.2 (default 0.9 for SEN learners)
  pitch?: number; // 0.8 - 1.2 (default 1.0)
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

export function speakText(text: string, options: SpeechOptions = {}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser environment');
    options.onEnd?.();
    return;
  }

  // Cancel any ongoing utterance to avoid overlapping speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options.rate ?? 0.88; // Slower, clearer default rate for cognitive processing
  utterance.pitch = options.pitch ?? 1.0;
  utterance.volume = options.volume ?? 1.0;

  // Prefer natural English voices
  const voices = window.speechSynthesis.getVoices();
  const naturalVoice = voices.find(
    v => (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google')))
  ) || voices.find(v => v.lang.startsWith('en'));

  if (naturalVoice) {
    utterance.voice = naturalVoice;
  }

  utterance.onstart = () => {
    options.onStart?.();
  };

  utterance.onend = () => {
    options.onEnd?.();
  };

  utterance.onerror = (e) => {
    options.onError?.(e);
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Haptic feedback trigger with fallback
 */
export function triggerHapticFeedback(pattern: number | number[] = [40, 60, 40]) {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (_) {}
  }
}
