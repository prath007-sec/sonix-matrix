"use client";

import { useState, useEffect } from "react";
import DottedGrid, { TOTAL_SHAPES } from "@/components/ui/dotted-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { synthEngine } from "@/lib/audio";
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Disc,
  Headphones,
  Activity,
  Sparkles,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  SlidersHorizontal,
  Waves,
  ShieldCheck,
  Radio,
  Share2,
  Sliders,
  AudioWaveform,
} from "lucide-react";

export default function HomePage() {
  const [currentShape, setCurrentShape] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const shapesMeta = [
    {
      id: 0,
      label: "Music Logo (♫)",
      subtitle: "Iconic Beamed 16th Note",
      icon: Music,
      description: "Signature tactile illuminated music branding emblem",
    },
    {
      id: 1,
      label: "Equalizer Spectrum",
      subtitle: "7-Band Frequency",
      icon: Activity,
      description: "Real-time acoustic frequency spectrum visualizer",
    },
    {
      id: 2,
      label: "Vinyl Turntable",
      subtitle: "Grooves & Spindle",
      icon: Disc,
      description: "Analog vinyl simulation with micro-groove rotation",
    },
    {
      id: 3,
      label: "Studio Monitor",
      subtitle: "Binaural Headphones",
      icon: Headphones,
      description: "High-fidelity spatial headphone acoustic profile",
    },
    {
      id: 4,
      label: "Audio Waveform",
      subtitle: "Harmonic Oscilloscope",
      icon: Waves,
      description: "Continuous real-time analog sine & saw wave monitor",
    },
  ];

  const presets = [
    {
      id: 0,
      name: "01 / Ethereal Atmosphere",
      genre: "Ambient Pad",
      key: "F# Minor 9",
      bpm: "118 BPM",
      desc: "Warm lush harmonics filtered through simulated tube preamps.",
    },
    {
      id: 1,
      name: "02 / Neuro Bass Drive",
      genre: "Cyberpunk Sub",
      key: "D Sub Low",
      bpm: "132 BPM",
      desc: "Aggressive multi-harmonic analog sawtooth with resonant crunch.",
    },
    {
      id: 2,
      name: "03 / Analog Nostalgia",
      genre: "Lofi Vinyl Chords",
      key: "Bb Maj 7",
      bpm: "84 BPM",
      desc: "Subtle wow & flutter tape saturation with gentle pitch drift.",
    },
    {
      id: 3,
      name: "04 / Crystal Resonance",
      genre: "Spatial Lead",
      key: "C Pentatonic",
      bpm: "126 BPM",
      desc: "Prismatic high-frequency bell tones with 3D binaural reflection.",
    },
  ];

  const handleShapeSelect = (index: number) => {
    setCurrentShape(index);
    synthEngine.playPreset(index);
  };

  const handleToggleAudio = () => {
    synthEngine.toggleLoop((playing) => {
      setIsPlayingAudio(playing);
    });
  };

  const handlePresetTrigger = (index: number) => {
    setActivePreset(index);
    synthEngine.playPreset(index);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    synthEngine.setVolume(val);
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      synthEngine.setVolume(volume || 0.7);
      setIsMuted(false);
    } else {
      synthEngine.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-zinc-100">
      {/* 1. TOP NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#070709]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo with Glowing Music Dot Badge */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/90 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all hover:scale-105">
              <Music className="h-5 w-5 text-zinc-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold tracking-wider text-white">
                  SONIX
                </span>
                <span className="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-zinc-300">
                  MK-IV
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-zinc-400">
                QUANTUM MATRIX AUDIO
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#matrix-hero"
              className="text-xs font-medium text-zinc-400 transition hover:text-white"
            >
              Matrix Display
            </a>
            <a
              href="#sound-engine"
              className="text-xs font-medium text-zinc-400 transition hover:text-white"
            >
              Sound Engine
            </a>
            <a
              href="#hardware-specs"
              className="text-xs font-medium text-zinc-400 transition hover:text-white"
            >
              Hardware Units
            </a>
            <a
              href="#daw-integration"
              className="text-xs font-medium text-zinc-400 transition hover:text-white"
            >
              DAW Ecosystem
            </a>
            <a
              href="#pricing"
              className="text-xs font-medium text-zinc-400 transition hover:text-white"
            >
              Pre-Order
            </a>
          </nav>

          {/* Audio Engine Status & Interactive Player Pill */}
          <div className="flex items-center gap-3">
            {/* Live Audio Loop Button */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                isPlayingAudio
                  ? "border-emerald-500/50 bg-emerald-950/40 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.3)]"
                  : "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-700 hover:text-white"
              }`}
              title="Click to toggle live generative ambient audio"
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Playing Soundscape</span>
                  <span className="flex items-center gap-0.5">
                    <span className="h-2 w-0.5 animate-pulse bg-emerald-400" />
                    <span className="h-3 w-0.5 animate-pulse bg-emerald-400 delay-100" />
                    <span className="h-1.5 w-0.5 animate-pulse bg-emerald-400 delay-200" />
                  </span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span className="hidden sm:inline">Play Ambient Synth</span>
                </>
              )}
            </button>

            {/* CTA */}
            <a href="#pricing">
              <Button size="sm" variant="glow" className="text-xs">
                Pre-Order MK-IV
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION WITH DOTTED MATRIX CANVAS */}
      <section id="matrix-hero" className="relative w-full border-b border-zinc-800/80">
        {/* The Dotted Grid Canvas Hero Background */}
        <div className="relative h-[85vh] min-h-[640px] w-full overflow-hidden bg-black">
          <DottedGrid
            shapeIndex={currentShape}
            onShapeChange={(idx) => setCurrentShape(idx)}
            className="h-full w-full"
            spacing={24}
            baseRadius={7.0}
            mouseRadius={360}
          />

          {/* Vignette Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#070709]/40 to-[#070709]" />

          {/* Floating Hero Content Overlay (pointer events none so canvas remains interactable) */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:p-14">
            {/* Top row status banner */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-950/80 px-3 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
                  DSP CORE v3.4 • 96kHz / 32-BIT FLOAT
                </span>
              </div>

              <div className="pointer-events-auto hidden items-center gap-3 rounded-full border border-zinc-800/80 bg-zinc-950/80 px-4 py-1.5 text-xs text-zinc-400 backdrop-blur-md sm:flex">
                <Radio className="h-3.5 w-3.5 text-zinc-400" />
                <span>Interactive Canvas: Move cursor to warp • Click to morph</span>
              </div>
            </div>

            {/* Center/Bottom Hero Title & Information */}
            <div className="mx-auto max-w-4xl text-center">
              <div className="pointer-events-auto mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-white/5 px-4 py-1 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-zinc-200" />
                <span className="text-xs font-medium tracking-wide text-zinc-200">
                  Next-Generation Tactile Matrix Synthesizer
                </span>
              </div>

              <h1 className="pointer-events-auto text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Music Illuminated <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                  In Pure Silicon.
                </span>
              </h1>

              <p className="pointer-events-auto mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                Experience tactile sound design powered by a 24x24 illuminated optical micro-dot matrix.
                Featuring zero-latency neural synthesis, 64-voice polyphony, and spatial acoustic projection.
              </p>

              {/* Action Buttons */}
              <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  variant="glow"
                  onClick={handleToggleAudio}
                  className="gap-2"
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="h-4 w-4" /> Pause Soundscape
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 fill-current" /> Audition Synth Engine
                    </>
                  )}
                </Button>

                <a href="#interactive-synth">
                  <Button size="lg" variant="outline" className="gap-2 border-zinc-700">
                    <Sliders className="h-4 w-4" /> Sound Presets
                  </Button>
                </a>
              </div>
            </div>

            {/* Bottom Floating Visualizer Switcher Bar */}
            <div className="pointer-events-auto mx-auto mt-6 w-full max-w-2xl">
              <div className="rounded-2xl border border-zinc-800/90 bg-zinc-950/90 p-2 shadow-2xl backdrop-blur-xl">
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5">
                  {shapesMeta.map((s) => {
                    const Icon = s.icon;
                    const isActive = currentShape === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => handleShapeSelect(s.id)}
                        className={`group relative flex flex-col items-center justify-center rounded-xl p-2.5 transition-all cursor-pointer ${
                          isActive
                            ? "bg-zinc-800/90 text-white shadow-[0_0_14px_rgba(255,255,255,0.12)] border border-zinc-700"
                            : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent"
                        }`}
                      >
                        <Icon className={`h-4 w-4 mb-1 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-zinc-400"}`} />
                        <span className="text-[11px] font-semibold leading-tight">{s.label}</span>
                        <span className="text-[9px] text-zinc-400 hidden sm:block">{s.subtitle}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SOUND DESIGN & PRESET LAB */}
      <section id="interactive-synth" className="border-b border-zinc-800/80 bg-[#0a0a0e] py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <Badge variant="secondary" className="mb-3 font-mono tracking-wider">
                REAL-TIME WEB AUDIO ENGINE
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Neural Sound Presets & Audition
              </h2>
              <p className="mt-2 text-sm text-zinc-400 max-w-xl">
                Click any preset below to trigger synthesized micro-chords and harmonics generated directly via our browser DSP engine.
              </p>
            </div>

            {/* Master Volume Controls */}
            <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 px-4">
              <button
                onClick={toggleMute}
                className="text-zinc-400 hover:text-white transition cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-5 w-5 text-red-400" />
                ) : (
                  <Volume2 className="h-5 w-5 text-zinc-300" />
                )}
              </button>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>MASTER GAIN</span>
                  <span>{isMuted ? "0%" : `${Math.round(volume * 100)}%`}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="h-1.5 w-32 cursor-pointer appearance-none rounded-lg bg-zinc-700 accent-white"
                />
              </div>
            </div>
          </div>

          {/* Presets Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {presets.map((preset) => {
              const isActive = activePreset === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => handlePresetTrigger(preset.id)}
                  className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all cursor-pointer ${
                    isActive
                      ? "border-zinc-500 bg-zinc-900/90 shadow-[0_0_24px_rgba(255,255,255,0.08)] scale-[1.02]"
                      : "border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-zinc-400">{preset.genre}</span>
                      <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-300">
                        {preset.bpm}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-zinc-100">
                      {preset.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                      {preset.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-zinc-300">
                      Key: {preset.key}
                    </span>
                    <Button
                      size="sm"
                      variant={isActive ? "default" : "outline"}
                      className="h-8 gap-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePresetTrigger(preset.id);
                      }}
                    >
                      <Play className="h-3 w-3 fill-current" /> Trigger
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HARDWARE & SOUND ENGINE SHOWCASE (UNSPLASH IMAGERY) */}
      <section id="sound-engine" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-3 font-mono">
              ARCHITECTURE & ENGINEERING
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Engineered For Physical Expression.
            </h2>
            <p className="mt-4 text-base text-zinc-400 leading-relaxed">
              Every curve, circuit trace, and illuminated optical dot is calibrated to bridge physical human intuition with computational neural audio synthesis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950/60 transition-all hover:border-zinc-700">
              <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop"
                  alt="Professional Recording Studio Console"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border-zinc-700">
                  PRECISION DSP
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  FPGA Neural Synthesizer Core
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Dedicated field-programmable gate array running at 96kHz, delivering 64 voices of analog circuit simulation with instantaneous tactile parameter tracking.
                </p>
                <div className="mt-4 flex items-center gap-2 font-mono text-xs text-zinc-300">
                  <Cpu className="h-4 w-4" /> &lt;1.2ms Roundtrip Latency
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950/60 transition-all hover:border-zinc-700">
              <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop"
                  alt="High-fidelity studio headphones"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border-zinc-700">
                  SPATIAL 3D
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Binaural Acoustic Room Engine
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Generates photorealistic head-related transfer functions (HRTF) and 7.1.4 Dolby Atmos bed spatialization for immersive live performance monitoring.
                </p>
                <div className="mt-4 flex items-center gap-2 font-mono text-xs text-zinc-300">
                  <Headphones className="h-4 w-4" /> 7.1.4 Spatial Bed
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950/60 transition-all hover:border-zinc-700">
              <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop"
                  alt="Electronic keyboard synthesizer"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border-zinc-700">
                  PHYSICAL MATRIX
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Tactile Quantum Dot Interface
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  24x24 optical micro-array with per-pixel capacitive pressure sensitivity. Swipe, tap, and sculpt audio wave envelopes with sub-millimeter precision.
                </p>
                <div className="mt-4 flex items-center gap-2 font-mono text-xs text-zinc-300">
                  <Layers className="h-4 w-4" /> Polyphonic Aftertouch
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HARDWARE TECHNICAL SPECIFICATIONS */}
      <section id="hardware-specs" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80 bg-[#09090d]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-3 font-mono">
                MILLED AEROSPACE CHASSIS
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Precision CNC Aluminum. Uncompromising Specs.
              </h2>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                Machined from a single solid billet of 6061-T6 aerospace anodized aluminum. Designed to endure decades of world tours, studio sessions, and late-night creative marathons.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Dual ESS Sabre Pro DACs</h4>
                    <p className="text-xs text-zinc-400">132dB dynamic range with ultra-low -120dB THD+N distortion rating.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Full Physical & Digital I/O</h4>
                    <p className="text-xs text-zinc-400">Balanced 1/4" TRS outputs, 5-pin DIN MIDI In/Out/Thru, USB-C Audio Class 2.0, CV/Gate analog outputs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">12-Hour Li-Ion Battery Architecture</h4>
                    <p className="text-xs text-zinc-400">Completely standalone portable production with fast USB-PD 65W charging.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Spec Table Card */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
              <div className="border-b border-zinc-800 pb-4 mb-6 flex justify-between items-center">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                  SYSTEM ARCHITECTURE
                </span>
                <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-200">
                  REV 4.2 FINAL
                </span>
              </div>

              <div className="divide-y divide-zinc-800/60 font-mono text-xs">
                <div className="py-3 flex justify-between">
                  <span className="text-zinc-400">Processor Core</span>
                  <span className="text-zinc-200">Dual-Core ARM Cortex-A53 + FPGA Audio DSP</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-zinc-400">Sample Rate</span>
                  <span className="text-zinc-200">96kHz / 32-Bit Floating Point</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-zinc-400">Polyphony</span>
                  <span className="text-zinc-200">64 Simultaneous Stereophonic Voices</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-zinc-400">Matrix Display</span>
                  <span className="text-zinc-200">24 × 24 Quantum Optical Micro-LED Array</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-zinc-400">MIDI Standard</span>
                  <span className="text-zinc-200">MIDI 2.0 High-Resolution Expression (MPE)</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-zinc-400">Dimensions</span>
                  <span className="text-zinc-200">280 mm × 210 mm × 18 mm (840g)</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-400">Designed & calibrated in Berlin & Tokyo</span>
                <a href="#pricing">
                  <Button size="sm" variant="glow" className="text-xs">
                    Order Unit
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DAW INTEGRATION & PLUGINS */}
      <section id="daw-integration" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80">
        <div className="mx-auto max-w-7xl text-center">
          <Badge variant="outline" className="mb-3 font-mono">
            ECOSYSTEM COMPATIBILITY
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Seamlessly Bridges Into Your DAW
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-xl mx-auto">
            Includes the companion VST3, Audio Unit, and AAX software plugin. Parameter automation flows bidirectionally with zero configuration required.
          </p>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              "Ableton Live 12",
              "Apple Logic Pro",
              "Pro Tools Studio",
              "FL Studio 24",
              "Bitwig Studio",
              "Cubase 13",
            ].map((daw) => (
              <div
                key={daw}
                className="flex flex-col items-center justify-center p-6 rounded-2xl border border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 transition"
              >
                <SlidersHorizontal className="h-6 w-6 text-zinc-300 mb-2" />
                <span className="text-xs font-semibold text-zinc-200">{daw}</span>
                <span className="text-[10px] text-zinc-400 mt-1">Plug & Play</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRE-ORDER & PRICING */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80 bg-[#0a0a0f]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-3 font-mono">
              PRODUCTION BATCH 01
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Reserve Your Device
            </h2>
            <p className="mt-4 text-base text-zinc-400">
              Limited to 500 numbered units for Batch 01 worldwide. Ships with custom travel case, companion plugin suite, and lifetime firmware updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Standard */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                  CORE EDITION
                </span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">$899</span>
                  <span className="text-xs text-zinc-400">USD</span>
                </div>
                <p className="mt-3 text-xs text-zinc-400">
                  Full standalone hardware unit, standard black anodized aluminum finish.
                </p>

                <ul className="mt-8 space-y-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 24x24 Quantum Micro-Dot Matrix
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 64-Voice Neural Sound Engine
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> VST3 / AU / AAX Companion Plugin
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Standard USB-C Braided Cable
                  </li>
                </ul>
              </div>

              <Button variant="outline" className="mt-8 w-full border-zinc-700">
                Pre-Order Core
              </Button>
            </div>

            {/* Studio Master (Highlighted) */}
            <div className="relative rounded-3xl border-2 border-white/80 bg-zinc-900/90 p-8 flex flex-col justify-between shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black font-semibold">
                MOST POPULAR • BATCH 01
              </Badge>

              <div>
                <span className="font-mono text-xs text-zinc-300 uppercase tracking-widest">
                  STUDIO MASTER EDITION
                </span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">$1,299</span>
                  <span className="text-xs text-zinc-400">USD</span>
                </div>
                <p className="mt-3 text-xs text-zinc-300">
                  Matte obsidian ceramic finish, custom travel vault, balanced audio snakes, and expansion sound banks.
                </p>

                <ul className="mt-8 space-y-3 text-xs text-zinc-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Everything in Core Edition
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Custom CNC Pelican Hard Case
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Mogami Balanced 1/4" TRS Cables
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 2,000+ Exclusive Sound Presets
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Priority Batch 01 Shipping
                  </li>
                </ul>
              </div>

              <Button variant="glow" className="mt-8 w-full">
                Reserve Studio Master
              </Button>
            </div>

            {/* Tour Rig */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                  TOUR RIG BUNDLE
                </span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">$2,499</span>
                  <span className="text-xs text-zinc-400">USD</span>
                </div>
                <p className="mt-3 text-xs text-zinc-400">
                  Dual linked MK-IV units for multi-performer live sets with rackmount docking chassis.
                </p>

                <ul className="mt-8 space-y-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 2× SONIX MATRIX MK-IV Units
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 19" 2U Rackmount Docking Station
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Dante Audio-over-IP Interface
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 24/7 Dedicated Tour Support
                  </li>
                </ul>
              </div>

              <Button variant="outline" className="mt-8 w-full border-zinc-700">
                Pre-Order Tour Rig
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3 font-mono">
              FREQUENTLY ASKED
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Questions & Answers
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What makes the Quantum Dot Matrix different from traditional LED grids?",
                a: "Unlike passive illumination grids, the SONIX 24x24 matrix combines sub-millimeter optical emitters with multi-point capacitive pressure sensors beneath each dot. It detects continuous Z-axis pressure and X/Y glide velocities simultaneously for unprecedented expressive nuance.",
              },
              {
                q: "Can I use the MK-IV as a standalone synthesizer without a computer?",
                a: "Yes. The unit contains an onboard FPGA DSP core and dual ESS Sabre DACs, alongside a 12-hour rechargeable Li-Ion battery. Connect headphones or studio monitors directly to the balanced analog outputs.",
              },
              {
                q: "Is it compatible with my existing MIDI gear and modular synthesizers?",
                a: "Fully compatible. It features 5-pin DIN MIDI In/Out/Thru, high-resolution MIDI 2.0 via USB-C, and four dedicated 3.5mm analog CV/Gate outputs for modular Eurorack rigs.",
              },
              {
                q: "When does Batch 01 begin shipping?",
                a: "Batch 01 production units are slated for delivery in Q4 2026. Every pre-order customer receives regular build diary updates and guaranteed priority dispatch with tracking.",
              },
            ].map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/60 overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-900/40 transition"
                  >
                    <span className="text-base font-semibold text-white">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-zinc-400 transition-transform ${
                        isOpen ? "rotate-180 text-white" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-[#050508] text-zinc-400 border-t border-zinc-800/80">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
              <Music className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="font-mono text-sm font-bold text-white">
                SONIX MATRIX LABS
              </span>
              <p className="text-[10px] text-zinc-400">
                Crafting tactile instruments for the next sonic century.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-xs">
            <a href="#matrix-hero" className="hover:text-white transition">Matrix Display</a>
            <a href="#sound-engine" className="hover:text-white transition">Sound Engine</a>
            <a href="#hardware-specs" className="hover:text-white transition">Hardware Specs</a>
            <a href="#daw-integration" className="hover:text-white transition">DAW Plugins</a>
            <a href="#pricing" className="hover:text-white transition">Batch 01 Pre-Order</a>
          </div>

          <div className="text-xs text-zinc-400">
            © 2026 Sonix Audio Technologies Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
