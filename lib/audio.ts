// Web Audio API Synthesizer Engine for AURA MATRIX
// Provides real-time synthesized ambient pads, arpeggios, and chords without external audio files.

class SynthEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private activeNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  private masterGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private timer: number | null = null;
  private currentPreset: number = 0;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime, 0.05);
    }
  }

  public playPreset(index: number) {
    this.initContext();
    if (!this.ctx || !this.filter) return;
    this.currentPreset = index;

    // Trigger a single rich musical chord/sound based on preset
    const now = this.ctx.currentTime;
    const chords: { freqs: number[]; type: OscillatorType; decay: number }[] = [
      // 0: AURA Ambience (F#m9 ethereal)
      { freqs: [185.0, 277.18, 329.63, 440.0, 554.37], type: "sine", decay: 2.8 },
      // 1: Spectrum Bass (Punchy saw)
      { freqs: [55.0, 110.0, 164.81], type: "sawtooth", decay: 1.5 },
      // 2: Vinyl Nostalgia (Lofi Triangle)
      { freqs: [146.83, 220.0, 293.66, 369.99], type: "triangle", decay: 2.4 },
      // 3: Studio Monitor Clarity (Crystal Sine chord)
      { freqs: [261.63, 329.63, 392.0, 523.25, 659.25], type: "sine", decay: 3.0 },
      // 4: Harmonic Waveform (Sweeping pulse)
      { freqs: [130.81, 196.0, 261.63, 392.0], type: "sine", decay: 2.2 },
    ];

    const preset = chords[index % chords.length];

    preset.freqs.forEach((freq, i) => {
      if (!this.ctx || !this.filter) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = preset.type;
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.18 / preset.freqs.length, now + 0.08 + i * 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + preset.decay);

      osc.connect(gain);
      gain.connect(this.filter);

      osc.start(now + i * 0.02);
      osc.stop(now + preset.decay + 0.1);
    });
  }

  public toggleLoop(onStateChange?: (playing: boolean) => void) {
    this.initContext();
    if (!this.ctx) return;

    if (this.isPlaying) {
      this.stopLoop();
      onStateChange?.(false);
    } else {
      this.isPlaying = true;
      onStateChange?.(true);

      const notes = [
        [185.0, 277.18, 440.0],
        [220.0, 329.63, 554.37],
        [246.94, 369.99, 493.88],
        [185.0, 293.66, 440.0],
      ];
      let step = 0;

      const triggerStep = () => {
        if (!this.isPlaying || !this.ctx || !this.filter) return;
        const now = this.ctx.currentTime;
        const chord = notes[step % notes.length];
        step++;

        chord.forEach((freq) => {
          if (!this.ctx || !this.filter) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.06, now + 0.3);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

          osc.connect(gain);
          gain.connect(this.filter);

          osc.start(now);
          osc.stop(now + 2.3);
        });

        this.timer = window.setTimeout(triggerStep, 1800);
      };

      triggerStep();
    }
  }

  public stopLoop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.activeNodes.forEach(({ osc, gain }) => {
      try {
        osc.stop();
        osc.disconnect();
        gain.disconnect();
      } catch {
        // Ignored
      }
    });
    this.activeNodes = [];
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const synthEngine = new SynthEngine();
