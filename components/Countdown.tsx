"use client";

import React, { useEffect, useState } from "react";
import TornEdge from "./TornEdge";
import { HeartOrnament } from "./Icons";

interface CountdownProps {
  targetDate?: string;
}

export default function Countdown({ targetDate = "2027-02-11T00:00:00+05:30" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const target = new Date(targetDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="relative w-full my-6 select-none overflow-hidden burgundy-texture py-7 px-4 text-center text-white shadow-inner">
      {/* Top Torn Paper Edge: white card paper tearing down into burgundy */}
      <TornEdge direction="top" fill="#FAF8F5" className="absolute top-0 inset-x-0" />

      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      <p className="text-[11px] font-sans font-light tracking-[0.45em] text-white/90 uppercase mb-4 relative z-10">
        COUNTDOWN
      </p>

      {/* 4 Columns for Days, Hours, Minutes, Seconds */}
      <div className="grid grid-cols-4 gap-1 max-w-[320px] mx-auto text-center items-center relative z-10">
        <div className="flex flex-col items-center">
          <span className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-white drop-shadow-sm">
            {isMounted ? timeLeft.days : 88}
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-sans text-white/80 uppercase mt-1">
            DAYS
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-white drop-shadow-sm">
            {isMounted ? String(timeLeft.hours).padStart(2, "0") : "00"}
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-sans text-white/80 uppercase mt-1">
            HOURS
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-white drop-shadow-sm">
            {isMounted ? String(timeLeft.minutes).padStart(2, "0") : "00"}
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-sans text-white/80 uppercase mt-1">
            MINUTES
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-white drop-shadow-sm">
            {isMounted ? String(timeLeft.seconds).padStart(2, "0") : "00"}
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-sans text-white/80 uppercase mt-1">
            SECONDS
          </span>
        </div>
      </div>

      {/* Heart Divider Line */}
      <div className="mt-4 relative z-10">
        <HeartOrnament className="my-1" light />
      </div>

      {/* Bottom Torn Paper Edge: white card paper tearing up into burgundy */}
      <TornEdge direction="bottom" fill="#FAF8F5" className="absolute bottom-0 inset-x-0" />
    </div>
  );
}
