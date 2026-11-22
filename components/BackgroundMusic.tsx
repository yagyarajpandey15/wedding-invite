"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface BackgroundMusicProps {
  isCardOpen?: boolean;
}

export default function BackgroundMusic({ isCardOpen = true }: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isManuallyPausedRef = useRef(false);

  // Play function ensuring loop and full volume
  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1.0;
    audio.loop = true;

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        // Autoplay may be restricted until first card interaction
        console.log("Audio waiting for user interaction:", err?.message || err);
      });
  }, []);

  // Pause function
  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  // When user clicks the floating music button
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // User explicitly paused -> do NOT auto-resume
      isManuallyPausedRef.current = true;
      pauseAudio();
    } else {
      // User explicitly resumed -> play continuously
      isManuallyPausedRef.current = false;
      playAudio();
    }
  };

  // Prime audio when envelope is tapped
  useEffect(() => {
    const handleGesture = () => {
      if (audioRef.current) {
        audioRef.current.load();
      }
    };

    window.addEventListener("wedding:user-gesture", handleGesture);
    return () => {
      window.removeEventListener("wedding:user-gesture", handleGesture);
    };
  }, []);

  // When card opens, automatically start playing continuously
  useEffect(() => {
    if (isCardOpen && !isManuallyPausedRef.current) {
      playAudio();
    } else if (!isCardOpen) {
      pauseAudio();
    }
  }, [isCardOpen, playAudio, pauseAudio]);

  // Ensure playback starts on first touch/interaction on the opened card if initial autoplay was blocked
  useEffect(() => {
    const handleUserInteraction = () => {
      if (isCardOpen && !isManuallyPausedRef.current) {
        const audio = audioRef.current;
        if (audio && audio.paused) {
          playAudio();
        }
      }
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);
    window.addEventListener("pointerdown", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("pointerdown", handleUserInteraction);
    };
  }, [isCardOpen, playAudio]);

  // Sync state with native audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      // Continuous loop guarantee
      if (!isManuallyPausedRef.current) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <>
      {/* Hidden audio element loading the Bengali wedding song */}
      <audio
        ref={audioRef}
        src="/card-assets/wedding-song.mp3"
        preload="auto"
        loop
        playsInline
      />

      {/* Floating Music Control Button */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {/* Subtle tooltip invite only when manually paused */}
        {!isPlaying && isCardOpen && isManuallyPausedRef.current && (
          <div
            onClick={toggleMusic}
            className="cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5]/90 border border-[#D4AF37]/50 shadow-md backdrop-blur-sm text-[11px] font-serif text-[#681622] hover:bg-white transition-all animate-bounce"
          >
            <span>🎵</span>
            <span>Resume Music</span>
          </div>
        )}

        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
          title={isPlaying ? "Pause music" : "Play Bengali wedding song"}
          className={`relative flex items-center justify-center w-12 h-12 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            isPlaying
              ? "bg-[#681622] text-[#FDFBF7] ring-4 ring-[#D4AF37]/40 shadow-[#681622]/40"
              : "bg-[#FAF8F5] text-[#681622] border-2 border-[#D4AF37]/60 hover:bg-white"
          }`}
        >
          {isPlaying ? (
            /* Animated Equalizer sound waves */
            <span className="flex items-center gap-[3px] h-5">
              <span className="w-[3px] h-3 bg-[#FDFBF7] rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
              <span className="w-[3px] h-5 bg-[#D4AF37] rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.15s]" />
              <span className="w-[3px] h-4 bg-[#FDFBF7] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.3s]" />
              <span className="w-[3px] h-2 bg-[#D4AF37] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.1s]" />
            </span>
          ) : (
            /* Musical note icon */
            <svg
              className="w-5 h-5 text-[#681622] transform -rotate-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
