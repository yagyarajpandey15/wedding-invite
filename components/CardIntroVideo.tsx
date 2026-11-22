"use client";

import React, { useState, useRef, useEffect } from "react";

interface CardIntroVideoProps {
  onComplete: () => void;
}

export default function CardIntroVideo({ onComplete }: CardIntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnding, setIsEnding] = useState(false);

  // Auto-play video directly and immediately on load
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn("Direct video autoplay failed:", err);
      });
    }
  }, []);

  const handleUserInteraction = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wedding:user-gesture"));
    }
  };

  // Trigger smooth transition when video ends or when user skips
  const handleVideoEnded = () => {
    if (isEnding) return;
    setIsEnding(true);
    setTimeout(() => {
      onComplete();
    }, 800); // 800ms smooth curtain / fade transition
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1F070E] transition-all duration-700 ease-out select-none ${
        isEnding
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      onClick={handleUserInteraction}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial from-[#681622]/40 via-transparent to-black pointer-events-none" />

      {/* Video Container (Mobile centered view) */}
      <div className="relative w-full max-w-[430px] h-full sm:h-auto sm:max-h-[92vh] sm:aspect-[9/16] flex flex-col justify-center items-center overflow-hidden bg-[#1F070E] shadow-2xl sm:rounded-3xl sm:border border-[#D4AF37]/30">
        <video
          ref={videoRef}
          src="/card-assets/card-opening.mp4"
          poster="/card-assets/envelope-poster-mobile.webp"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          className="w-full h-full object-contain sm:object-cover relative z-0"
        >
          <source src="/card-assets/card-opening.mp4" type="video/mp4" />
        </video>

        {/* Quick Skip button in top right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleUserInteraction();
            handleVideoEnded();
          }}
          className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/45 backdrop-blur-sm border border-[#D4AF37]/40 text-[#FDFBF7] text-[10px] sm:text-xs font-serif tracking-wider shadow-lg hover:bg-black/70 transition-all cursor-pointer"
        >
          Skip &rarr;
        </button>

        {/* Sender / प्रेषक details in bottom right (Active during opening video only) */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 pointer-events-none text-right">
          <div className="bg-black/55 backdrop-blur-[3px] border border-[#D4AF37]/45 rounded-xl px-3.5 py-2 shadow-2xl text-right">
            <p className="text-[11px] sm:text-xs font-semibold text-[#D4AF37] tracking-wider">
              प्रेषक <span className="text-[#D4AF37]/60">/</span> Sender
            </p>
            <p className="font-serif text-xs sm:text-sm font-bold text-[#FFFDF8] tracking-wide mt-0.5">
              Vidyanand Kumar
            </p>
            <p className="text-[11px] sm:text-xs text-[#E8D7C8] font-sans tracking-wider mt-0.5">
              9910202346
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
