"use client";

import React, { useState, useRef } from "react";

interface CardIntroVideoProps {
  onComplete: () => void;
}

export default function CardIntroVideo({ onComplete }: CardIntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  // Handle user clicking anywhere on the screen to play
  const handleClickScreen = () => {
    if (!videoRef.current) return;

    if (!isPlaying) {
      videoRef.current.muted = false; // User gesture enables unmuted audio
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Autoplay with audio blocked, falling back to muted:", err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().then(() => setIsPlaying(true));
          }
        });
    } else {
      // If already playing, tapping toggles pause/resume
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Trigger smooth transition when video ends
  const handleVideoEnded = () => {
    setIsEnding(true);
    setTimeout(() => {
      onComplete();
    }, 1000); // 1000ms smooth curtain / fade transition
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1F070E] transition-all duration-1000 ease-out select-none cursor-pointer ${
        isEnding
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      onClick={handleClickScreen}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial from-[#681622]/40 via-transparent to-black pointer-events-none" />

      {/* Video Container (Mobile centered view) */}
      <div className="relative w-full max-w-[430px] h-full sm:h-auto sm:max-h-[92vh] sm:aspect-[9/16] flex flex-col justify-center items-center overflow-hidden bg-black shadow-2xl sm:rounded-3xl sm:border border-[#D4AF37]/30">
        <video
          ref={videoRef}
          src="/card-assets/card-opening.mp4"
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          className="w-full h-full object-contain sm:object-cover"
        />

        {/* ONLY "tap to open..." at the place of the play button over the center wax seal */}
        {!isPlaying && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-[2px] border border-[#D4AF37]/50 shadow-2xl animate-pulse">
              <p className="font-serif italic text-xs sm:text-sm text-[#FDFBF7] tracking-wider drop-shadow-md">
                tap to open...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
