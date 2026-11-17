"use client";

import React, { useState, useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play a soft, beautiful romantic acoustic harp / music box melody
  const startMelody = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Romantic chord notes in Hz (Canon in D / Wedding romantic progression)
      const notes = [
        293.66, 369.99, 440.0, 587.33, // D major
        220.0, 277.18, 329.63, 440.0,  // A major
        246.94, 293.66, 369.99, 493.88, // B minor
        185.0, 220.0, 277.18, 369.99,  // F# minor
        196.0, 246.94, 293.66, 392.0,  // G major
        146.83, 185.0, 220.0, 293.66,  // D major
        196.0, 246.94, 293.66, 392.0,  // G major
        220.0, 277.18, 329.63, 440.0   // A major
      ];

      let step = 0;

      const playNextNote = () => {
        if (!audioCtxRef.current) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Music box / chime timbre with gentle sine/triangle wave
        osc.type = "sine";
        osc.frequency.setValueAtTime(notes[step % notes.length], now);

        // Gentle envelope (soft attack, bell-like decay)
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.2);

        step++;
      };

      // Play note every 380ms
      playNextNote();
      timerRef.current = setInterval(playNextNote, 380);
      setIsPlaying(true);
    } catch (e) {
      console.warn("Audio playback not allowed without user gesture", e);
    }
  };

  const stopMelody = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMelody();
    } else {
      startMelody();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música romántica"}
        title={isPlaying ? "Pausar música" : "Reproducir música romántica"}
        className={`relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all transform hover:scale-110 active:scale-95 ${
          isPlaying
            ? "bg-[#681622] text-white ring-4 ring-[#681622]/20 animate-pulse"
            : "bg-white/95 text-[#681622] border border-[#681622]/30 hover:bg-white"
        }`}
      >
        {isPlaying ? (
          <span className="flex items-center gap-0.5 h-4">
            <span className="w-0.5 h-4 bg-white animate-pulse" />
            <span className="w-0.5 h-3 bg-white animate-pulse delay-75" />
            <span className="w-0.5 h-5 bg-white animate-pulse delay-150" />
            <span className="w-0.5 h-2 bg-white animate-pulse" />
          </span>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        )}
      </button>
    </div>
  );
}

