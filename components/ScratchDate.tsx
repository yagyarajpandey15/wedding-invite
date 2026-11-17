"use client";

import React, { useRef, useEffect, useState } from "react";
import { wedding } from "../lib/wedding";

interface ScratchDateProps {
  dateFormatted?: string;
  fullDate?: string;
}

export default function ScratchDate({
  dateFormatted = wedding.dateFormatted,
  fullDate = "Thursday, 11 February 2027",
}: ScratchDateProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const strokeCounterRef = useRef(0);
  const isInitializedRef = useRef(false);
  const isRevealedRef = useRef(false);
  const hasScratchedRef = useRef(false);

  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);

  // Initialize the metallic gold foil on canvas - ONCE per page load
  const initFoil = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isRevealedRef.current) return;

    const rect = container.getBoundingClientRect();
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const width = rect.width || 275;
    const height = rect.height || 78;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = "source-over";

    // 1. Rich metallic gold foil brushed gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#C99738");
    grad.addColorStop(0.2, "#E5BF67");
    grad.addColorStop(0.4, "#FFF1BD");
    grad.addColorStop(0.6, "#D4A340");
    grad.addColorStop(0.85, "#E8C87A");
    grad.addColorStop(1, "#B38226");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle metallic shimmer specks / noise
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    for (let i = 0; i < 90; i++) {
      const rx = (Math.sin(i * 997) * 0.5 + 0.5) * width;
      const ry = (Math.cos(i * 733) * 0.5 + 0.5) * height;
      const size = i % 3 === 0 ? 1.5 : 1;
      ctx.fillRect(rx, ry, size, size);
    }

    ctx.fillStyle = "rgba(100, 60, 10, 0.15)";
    for (let i = 0; i < 60; i++) {
      const rx = (Math.cos(i * 541) * 0.5 + 0.5) * width;
      const ry = (Math.sin(i * 317) * 0.5 + 0.5) * height;
      ctx.fillRect(rx, ry, 1, 1);
    }

    // 3. Delicate golden border inside foil
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 1;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    // 4. Elegant typography printed on the foil
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Subtitle / Prompt
    ctx.font = "600 9px Montserrat, sans-serif";
    ctx.fillStyle = "#5E3E0B";
    ctx.letterSpacing = "2px";
    ctx.fillText("✨ SCRATCH TO REVEAL ✨", width / 2, height / 2 - 12);

    // Main Coin / Ring prompt
    ctx.font = "bold 13px 'Playfair Display', Georgia, serif";
    ctx.fillStyle = "#432800";
    ctx.letterSpacing = "1px";
    ctx.fillText("Wedding Date", width / 2, height / 2 + 5);

    // Finger / Coin prompt hint
    ctx.font = "400 8.5px Montserrat, sans-serif";
    ctx.fillStyle = "#6B4913";
    ctx.letterSpacing = "1.5px";
    ctx.fillText("rub gently with finger", width / 2, height / 2 + 20);

    isInitializedRef.current = true;
  };

  useEffect(() => {
    // Only initialize ONCE when mounted. Never re-initialize during page life!
    if (!isInitializedRef.current && !isRevealedRef.current) {
      initFoil();
    }
  }, []);

  // Compute scratch percentage
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const step = 12;
    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      let transparentCount = 0;
      let totalSampled = 0;

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const index = (y * w + x) * 4 + 3; // alpha channel
          if (data[index] < 40) {
            transparentCount++;
          }
          totalSampled++;
        }
      }

      const percent = Math.round((transparentCount / totalSampled) * 100);
      setScratchProgress(percent);

      if (percent >= 38) {
        triggerPermanentReveal();
      }
    } catch {
      // Ignore
    }
  };

  const triggerPermanentReveal = () => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsRevealed(true);
    setShowSparkles(true);
    setScratchProgress(100);
  };

  // Scratch stroke handler
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;

    hasScratchedRef.current = true;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 36 * dpr;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 18 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPointRef.current = { x, y };

    strokeCounterRef.current++;
    if (strokeCounterRef.current % 3 === 0) {
      checkScratchPercentage();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealedRef.current) return;
    isDrawingRef.current = true;
    lastPointRef.current = null;
    e.currentTarget.setPointerCapture(e.pointerId);
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isRevealedRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    checkScratchPercentage();
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-3 select-none">
      {/* Outer Card Frame with golden foil rim & drop shadow */}
      <div
        ref={containerRef}
        className="relative w-[275px] sm:w-[290px] h-[78px] rounded-2xl overflow-hidden shadow-md border-2 border-[#D4AF37]/50 bg-gradient-to-r from-[#FFFDF9] via-[#FAF8F5] to-[#FFFDF9] transition-all"
        style={{
          boxShadow: isRevealed
            ? "0 0 16px rgba(212, 175, 55, 0.35), 0 4px 10px rgba(104, 22, 34, 0.12)"
            : "0 4px 12px rgba(104, 22, 34, 0.12)",
        }}
      >
        {/* Underneath Layer: Revealed Wedding Date */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2.5 text-center bg-radial from-white via-[#FFFBF5] to-[#F5ECE1]">
          {/* Subtle floral/ring icon */}
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-xs">💍</span>
            <span className="text-[9.5px] font-sans font-bold tracking-[0.3em] uppercase text-[#681622]">
              WEDDING DATE
            </span>
            <span className="text-xs">💍</span>
          </div>

          {/* Formatted Date */}
          <h3 className="font-serif text-2xl sm:text-[26px] font-bold tracking-[0.25em] text-[#681622] leading-none my-0.5 drop-shadow-xs">
            {dateFormatted}
          </h3>

          {/* Full Day & Month */}
          <p className="font-serif italic text-[11px] text-[#4A3E40] tracking-wide mt-0.5">
            {fullDate}
          </p>

          {/* Confetti Sparkles Animation */}
          {showSparkles && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              <span className="absolute top-1 left-3 text-xs animate-ping">✨</span>
              <span className="absolute bottom-2 right-4 text-xs animate-ping delay-150">✨</span>
              <span className="absolute top-2 right-6 text-[10px] animate-bounce">💖</span>
              <span className="absolute bottom-1 left-5 text-[10px] animate-bounce delay-100">🎉</span>
            </div>
          )}
        </div>

        {/* Top Canvas Layer: Golden Scratch-Off Foil */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`absolute inset-0 cursor-pointer touch-none transition-opacity duration-700 ${
            isRevealed ? "opacity-0 pointer-events-none hidden" : "opacity-100"
          }`}
          style={{ touchAction: "none" }}
          title="Scratch to reveal the wedding date"
        />
      </div>

      {/* Helper control below the card - only shown while unrevealed */}
      {!isRevealed && (
        <div className="mt-1.5 text-[10px] font-sans">
          <button
            onClick={triggerPermanentReveal}
            className="text-[#681622]/80 hover:text-[#681622] underline underline-offset-2 transition-colors cursor-pointer"
          >
            {scratchProgress > 0 ? `Scratched ${scratchProgress}% • Tap to reveal` : "Tap to reveal directly"}
          </button>
        </div>
      )}
    </div>
  );
}
