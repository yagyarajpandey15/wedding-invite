"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
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

  // Initialize the metallic gold foil on canvas
  const initFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isRevealedRef.current || hasScratchedRef.current) return;

    // Use container layout dimensions (immune to CSS transform scale)
    const width = container.offsetWidth || 275;
    const height = container.offsetHeight || 78;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 3) : 1;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset transform to identity then scale for high-DPI crisp rendering
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.save();
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
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
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
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 1;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    // 4. Elegant typography printed on the foil
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Subtitle / Prompt
    ctx.font = "600 9px Montserrat, -apple-system, sans-serif";
    ctx.fillStyle = "#5E3E0B";
    ctx.fillText("✨ SCRATCH TO REVEAL ✨", width / 2, height / 2 - 13);

    // Main Coin / Ring prompt
    ctx.font = "bold 13px 'Playfair Display', Georgia, serif";
    ctx.fillStyle = "#432800";
    ctx.fillText("Wedding Date", width / 2, height / 2 + 4);

    // Finger / Coin prompt hint
    ctx.font = "500 8.5px Montserrat, -apple-system, sans-serif";
    ctx.fillStyle = "#6B4913";
    ctx.fillText("rub gently with finger", width / 2, height / 2 + 19);

    // Restore to identity transform so scratch erasing operations run in direct buffer coordinates
    ctx.restore();
    isInitializedRef.current = true;
  }, []);

  useEffect(() => {
    initFoil();

    // Re-verify foil size once card curtain opens / layout stabilizes
    const timer = setTimeout(() => {
      if (!hasScratchedRef.current && !isRevealedRef.current) {
        initFoil();
      }
    }, 1200);

    const handleResize = () => {
      if (!hasScratchedRef.current && !isRevealedRef.current) {
        initFoil();
      }
    };
    window.addEventListener("resize", handleResize);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        if (!hasScratchedRef.current && !isRevealedRef.current) {
          initFoil();
        }
      });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [initFoil]);

  const triggerPermanentReveal = useCallback(() => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsRevealed(true);
    setShowSparkles(true);
    setScratchProgress(100);
  }, []);

  // Compute scratch percentage
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    const step = Math.max(8, Math.round(Math.min(w, h) / 10));
    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      let transparentCount = 0;
      let totalSampled = 0;

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const index = (y * w + x) * 4 + 3; // alpha channel
          if (data[index] < 80) {
            transparentCount++;
          }
          totalSampled++;
        }
      }

      const percent = totalSampled > 0 ? Math.round((transparentCount / totalSampled) * 100) : 0;
      setScratchProgress(percent);

      // Auto reveal threshold: 28% scratched triggers complete sparkle reveal
      if (percent >= 28) {
        triggerPermanentReveal();
      }
    } catch {
      // Ignore
    }
  }, [triggerPermanentReveal]);

  // Scratch stroke handler using exact 1:1 buffer coordinates
  const scratchAtPoint = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    // Exact scale factor from client CSS pixels to canvas buffer pixels
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    hasScratchedRef.current = true;

    // Reset transform to identity so eraser coordinates correspond directly to pixel buffer
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "destination-out";

    // Generous eraser radius: 22px in CSS coordinates
    const brushRadius = 22 * scaleX;
    const brushLineWidth = 44 * scaleX;

    ctx.lineWidth = brushLineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPointRef.current = { x, y };

    strokeCounterRef.current++;
    if (strokeCounterRef.current % 3 === 0) {
      checkScratchPercentage();
    }
  }, [checkScratchPercentage]);

  // Pointer event handlers (mouse, stylus, pointer devices)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealedRef.current) return;
    isDrawingRef.current = true;
    lastPointRef.current = null;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignored if pointer capture unsupported
    }
    scratchAtPoint(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isRevealedRef.current) return;
    scratchAtPoint(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
    checkScratchPercentage();
  };

  // Touch event handlers (iOS Safari, Android WebViews)
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isRevealedRef.current || e.touches.length === 0) return;
    isDrawingRef.current = true;
    lastPointRef.current = null;
    const touch = e.touches[0];
    scratchAtPoint(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isRevealedRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    scratchAtPoint(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    checkScratchPercentage();
  };

  return (
    <div translate="no" className="notranslate relative flex flex-col items-center justify-center my-3 select-none">
      {/* Outer Card Frame with golden foil rim & drop shadow */}
      <div
        ref={containerRef}
        translate="no"
        className="notranslate relative w-[275px] sm:w-[290px] h-[78px] rounded-2xl overflow-hidden shadow-md border-2 border-[#D4AF37]/50 bg-gradient-to-r from-[#FFFDF9] via-[#FAF8F5] to-[#FFFDF9] transition-all"
        style={{
          boxShadow: isRevealed
            ? "0 0 16px rgba(212, 175, 55, 0.35), 0 4px 10px rgba(104, 22, 34, 0.12)"
            : "0 4px 12px rgba(104, 22, 34, 0.12)",
        }}
      >
        {/* Underneath Layer: Revealed Wedding Date */}
        <div
          translate="no"
          className="notranslate absolute inset-0 flex flex-col items-center justify-center p-2.5 text-center bg-radial from-white via-[#FFFBF5] to-[#F5ECE1]"
        >
          {/* Subtle floral/ring icon */}
          <div className="flex items-center gap-1.5 mb-0.5" translate="no">
            <span className="text-xs">💍</span>
            <span className="text-[9.5px] font-sans font-bold tracking-[0.3em] uppercase text-[#681622]">
              WEDDING DATE
            </span>
            <span className="text-xs">💍</span>
          </div>

          {/* Formatted Date */}
          <h3
            translate="no"
            className="notranslate font-serif text-2xl sm:text-[26px] font-bold tracking-[0.25em] text-[#681622] leading-none my-0.5 drop-shadow-xs"
          >
            {dateFormatted}
          </h3>

          {/* Full Day & Month */}
          <p translate="no" className="notranslate font-serif italic text-[11px] text-[#4A3E40] tracking-wide mt-0.5">
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
          translate="no"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className={`notranslate absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-700 ease-out ${
            isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ touchAction: "none" }}
          title="Scratch to reveal the wedding date"
        />
      </div>

      {/* Helper control below the card - only shown while unrevealed */}
      {!isRevealed && (
        <div className="mt-1.5 text-[10px] font-sans">
          <button
            type="button"
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
