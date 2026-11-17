import React from "react";

export function ChurchIcon({ className = "w-9 h-9 text-[#681622]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Cross on spire */}
      <line x1="24" y1="2" x2="24" y2="8" />
      <line x1="21.5" y1="4.5" x2="26.5" y2="4.5" />
      
      {/* Steeple / roof */}
      <path d="M24 8L15 17H33L24 8Z" />
      
      {/* Upper bell tower */}
      <path d="M17 17V23H31V17" />
      <path d="M24 19V21" />
      
      {/* Main church building */}
      <path d="M11 23H37V44H11V23Z" />
      
      {/* Side roof slants */}
      <path d="M11 23L7 27V44H11" />
      <path d="M37 23L41 27V44H37" />
      
      {/* Main arched portal door */}
      <path d="M20 44V33C20 30.8 21.8 29 24 29C26.2 29 28 30.8 28 33V44" />
      <line x1="24" y1="29" x2="24" y2="44" strokeWidth="1.2" />
      
      {/* Arched windows */}
      <path d="M13 30V35C13 36 14 37 15 37C16 37 17 36 17 35V30" />
      <path d="M31 30V35C31 36 32 37 33 37C34 37 35 36 35 35V30" />
      
      {/* Rose window circle */}
      <circle cx="24" cy="26" r="1.8" strokeWidth="1.2" />
    </svg>
  );
}

export function ChampagneIcon({ className = "w-9 h-9 text-[#681622]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Left glass */}
      <g transform="rotate(-15 20 28)">
        <path d="M18 10L22 22C22.5 24 21 26 19 26C17 26 15.5 24 16 22L20 10" />
        <line x1="19" y1="26" x2="19" y2="38" />
        <path d="M14 38H24" />
        {/* Bubbles */}
        <circle cx="18.5" cy="18" r="0.8" fill="currentColor" />
        <circle cx="19.5" cy="14" r="0.8" fill="currentColor" />
      </g>
      
      {/* Right glass */}
      <g transform="rotate(15 28 28)">
        <path d="M28 10L24 22C23.5 24 25 26 27 26C29 26 30.5 24 30 22L26 10" />
        <line x1="27" y1="26" x2="27" y2="38" />
        <path d="M22 38H32" />
        {/* Bubbles */}
        <circle cx="27.5" cy="18" r="0.8" fill="currentColor" />
        <circle cx="26.5" cy="14" r="0.8" fill="currentColor" />
      </g>
      
      {/* Sparkles / cheers stars */}
      {/* Top sparkle */}
      <path d="M24 4V8M22 6H26" strokeWidth="1.3" />
      {/* Left small star */}
      <circle cx="13" cy="12" r="1" fill="currentColor" />
      {/* Right small star */}
      <circle cx="35" cy="12" r="1" fill="currentColor" />
      <path d="M33 7L34 5L35 7L37 8L35 9L34 11L33 9L31 8Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DinnerIcon({ className = "w-8 h-8 text-[#681622]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Plate outer circle */}
      <circle cx="24" cy="24" r="13" />
      {/* Plate inner circle */}
      <circle cx="24" cy="24" r="9.5" strokeDasharray="1.5 2.5" strokeWidth="1.2" />
      
      {/* Fork on left */}
      <path d="M8 14V23C8 25 9.5 26.5 11 26.5V36" />
      <line x1="11" y1="14" x2="11" y2="23" />
      <path d="M14 14V23C14 25 12.5 26.5 11 26.5" />
      
      {/* Knife on right */}
      <path d="M37 14C37 14 39.5 19 39.5 25C39.5 27 38 27.5 37 27.5V36" />
      <line x1="37" y1="14" x2="37" y2="27.5" />
    </svg>
  );
}

export function CakeIcon({ className = "w-8 h-8 text-[#681622]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Base / platter */}
      <path d="M10 42H38" strokeWidth="2" />
      
      {/* Bottom tier */}
      <path d="M13 42V33H35V42" />
      <path d="M13 36C16 38 18 38 21 36C24 38 27 38 30 36C33 38 35 36 35 36" strokeWidth="1.2" />
      
      {/* Middle tier */}
      <path d="M17 33V25H31V33" />
      <path d="M17 28C19 30 21 30 24 28C27 30 29 30 31 28" strokeWidth="1.2" />
      
      {/* Top tier */}
      <path d="M20 25V19H28V25" />
      <path d="M20 22C22 23 23 23 24 22C25 23 26 23 28 22" strokeWidth="1.2" />
      
      {/* Cake topper / candle & flame */}
      <line x1="24" y1="19" x2="24" y2="15" />
      <path d="M24 15C25.5 13.5 25.5 11.5 24 10C22.5 11.5 22.5 13.5 24 15Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HaldiIcon({ className = "w-8 h-8 text-[#681622]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Traditional Urli / Bowl of Turmeric */}
      <ellipse cx="24" cy="30" rx="16" ry="6" />
      <path d="M8 30C8 38 15 42 24 42C33 42 40 38 40 30" />
      {/* Handles */}
      <path d="M8 29C5 29 4 33 7 34" />
      <path d="M40 29C43 29 44 33 41 34" />
      {/* Haldi paste mound & radiance sparkles */}
      <path d="M14 28C17 23 31 23 34 28" strokeDasharray="1.5 2.5" />
      {/* Sun / Radiance motif */}
      <circle cx="24" cy="14" r="5" strokeWidth="1.4" />
      <line x1="24" y1="5" x2="24" y2="7.5" />
      <line x1="24" y1="20.5" x2="24" y2="23" />
      <line x1="15" y1="14" x2="17.5" y2="14" />
      <line x1="30.5" y1="14" x2="33" y2="14" />
      <line x1="17.5" y1="7.5" x2="19.5" y2="9.5" />
      <line x1="28.5" y1="18.5" x2="30.5" y2="20.5" />
      <line x1="30.5" y1="7.5" x2="28.5" y2="9.5" />
      <line x1="19.5" y1="18.5" x2="17.5" y2="20.5" />
    </svg>
  );
}

export function MocktailIcon({ className = "w-8 h-8 text-[#681622]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Elegant cocktail / mocktail glass */}
      <path d="M13 12L24 27L35 12H13Z" />
      <line x1="24" y1="27" x2="24" y2="40" />
      <path d="M16 40H32" />
      {/* Straw */}
      <line x1="26" y1="7" x2="19" y2="21" strokeWidth="1.8" />
      {/* Citrus wheel garnish */}
      <circle cx="13" cy="12" r="5" strokeWidth="1.2" />
      <line x1="13" y1="7" x2="13" y2="17" strokeWidth="1" />
      <line x1="8" y1="12" x2="18" y2="12" strokeWidth="1" />
      {/* Sparkles */}
      <path d="M37 7L38 5L39 7L41 8L39 9L38 11L37 9L35 8Z" fill="currentColor" stroke="none" />
      <circle cx="39" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

export function MoonIcon({ className = "w-8 h-8 text-[#681622]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Crescent moon */}
      <path d="M28 10C20 11 14 17.5 14 25.5C14 34 21 40 29.5 40C32.5 40 35.5 39 37.5 37.5C28.5 36 22 28.5 22 19.5C22 15.5 24 12 28 10Z" />
      
      {/* Sleeping eye */}
      <path d="M19 25C20.5 26.5 22 26.5 23 25" strokeWidth="1.3" />
      
      {/* Stars */}
      <path d="M36 12L37 10L38 12L40 13L38 14L37 16L36 14L34 13Z" fill="currentColor" stroke="none" />
      <path d="M31 6L31.5 4.5L32 6L33.5 6.5L32 7L31.5 8.5L31 7L29.5 6.5Z" fill="currentColor" stroke="none" />
      <circle cx="28" cy="33" r="1" fill="currentColor" />
    </svg>
  );
}

export function MusicIcon({ className = "w-8 h-8 text-[#681622]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Beamed eighth notes */}
      <path d="M18 36C15.8 36 14 37.3 14 39C14 40.7 15.8 42 18 42C20.2 42 22 40.7 22 39V18L34 14V33" />
      <path d="M30 30C27.8 30 26 31.3 26 33C26 34.7 27.8 36 30 36C32.2 36 34 34.7 34 33V14" />
      {/* Top connecting beam */}
      <path d="M22 18L34 14V17L22 21Z" fill="currentColor" stroke="none" />
      
      {/* Sparkles */}
      <path d="M38 20L39 17L40 20L43 21L40 22L39 25L38 22L35 21Z" fill="currentColor" stroke="none" />
      <circle cx="15" cy="22" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function RsvpIconFlow({ className = "w-16 h-8 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 36" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Envelope */}
      <rect x="6" y="10" width="24" height="17" rx="2" />
      <path d="M6 10L18 20L30 10" />
      
      {/* Arrow pointing right */}
      <line x1="38" y1="18" x2="56" y2="18" />
      <polyline points="50 13 56 18 50 23" />
      
      {/* Gift Box with envelope slot */}
      <rect x="64" y="12" width="26" height="17" rx="2" />
      <line x1="61" y1="12" x2="93" y2="12" strokeWidth="2" />
      <line x1="77" y1="12" x2="77" y2="29" />
      {/* Slot on lid */}
      <line x1="72" y1="8" x2="82" y2="8" strokeWidth="1.5" />
      <path d="M74 8L74 5L80 5L80 8" strokeWidth="1.2" />
    </svg>
  );
}

export function HeartOrnament({ className = "my-4", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className={`h-px w-12 sm:w-16 ${light ? "bg-white/40" : "bg-[#681622]/30"}`} />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={light ? "rgba(255, 255, 255, 0.7)" : "#681622"}
        strokeWidth="1.5"
        className="w-3.5 h-3.5"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span className={`h-px w-12 sm:w-16 ${light ? "bg-white/40" : "bg-[#681622]/30"}`} />
    </div>
  );
}

