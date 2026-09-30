/**
 * Web Audio API synthesizer for sensory-friendly feedback
 * Provides gentle, non-jarring acoustic feedback tailored for neurodivergent learners.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private ambientSource: { stop: () => void } | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Plays a calm, melodic chord (C-E-G-C) for task completion
   */
  public playSuccessChime(volume = 0.3) {
    const ctx = this.getContext();
    if (!ctx) return;

    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const startTime = ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine'; // pure, gentle tone
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, startTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(volume * 0.25, startTime + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + idx * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + idx * 0.08);
      osc.stop(startTime + idx * 0.08 + 0.65);
    });
  }

  /**
   * Play a peaceful pentatonic note (C4, D4, E4, G4, A4, C5, D5, E5) for cause-and-effect interaction
   */
  public playPentatonicNote(noteIndex = 0, volume = 0.25) {
    const ctx = this.getContext();
    if (!ctx) return;

    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    const freq = scale[Math.abs(noteIndex) % scale.length];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume * 0.35, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.85);
  }

  /**
   * Subtle click for navigation & switch access
   */
  public playTapSound(volume = 0.15) {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(volume * 0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }

  /**
   * Gentle completion chime when visual timer ends
   */
  public playTimerAlert(volume = 0.3) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    [440, 554.37, 659.25].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.15);

      gain.gain.setValueAtTime(0.001, now + i * 0.15);
      gain.gain.linearRampToValueAtTime(volume * 0.3, now + i * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.15 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 0.85);
    });
  }

  /**
   * Ambient sound generator for calm-down zone
   */
  public startAmbientSound(type: 'ocean' | 'rain' | 'bowl', volume = 0.2) {
    this.stopAmbientSound();
    const ctx = this.getContext();
    if (!ctx) return;

    if (type === 'bowl') {
      // Tibetan singing bowl harmonic drone
      const baseFreq = 216; // 432Hz harmonic base
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseFreq * 2.76, ctx.currentTime); // natural overtone

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume * 0.15, ctx.currentTime + 1.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      this.ambientSource = {
        stop: () => {
          gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.0);
          setTimeout(() => {
            try {
              osc1.stop();
              osc2.stop();
            } catch (_) {}
          }, 1100);
        }
      };
      return;
    }

    // Noise buffer for rain or ocean
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    const masterGain = ctx.createGain();

    if (type === 'ocean') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      // Create an LFO to modulate ocean swells
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 8 second wave cycle
      lfoGain.gain.setValueAtTime(200, ctx.currentTime);

      lfo.connect(filter.frequency);
      lfo.start();

      masterGain.gain.setValueAtTime(volume * 0.25, ctx.currentTime);
      whiteNoise.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);
      whiteNoise.start();

      this.ambientSource = {
        stop: () => {
          masterGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
          setTimeout(() => {
            try {
              whiteNoise.stop();
              lfo.stop();
            } catch (_) {}
          }, 900);
        }
      };
    } else {
      // Rain sound: bandpass filter with higher cutoff
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);

      masterGain.gain.setValueAtTime(volume * 0.2, ctx.currentTime);
      whiteNoise.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);
      whiteNoise.start();

      this.ambientSource = {
        stop: () => {
          masterGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
          setTimeout(() => {
            try {
              whiteNoise.stop();
            } catch (_) {}
          }, 900);
        }
      };
    }
  }

  public stopAmbientSound() {
    if (this.ambientSource) {
      this.ambientSource.stop();
      this.ambientSource = null;
    }
  }
}

export const audioSynth = new AudioSynthesizer();
