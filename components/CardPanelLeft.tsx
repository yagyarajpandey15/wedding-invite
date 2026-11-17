"use client";

import React from "react";
import Countdown from "./Countdown";
import TornEdge from "./TornEdge";
import ScratchDate from "./ScratchDate";
import { ChurchIcon, ChampagneIcon, HeartOrnament, HaldiIcon, MocktailIcon } from "./Icons";
import { wedding } from "../lib/wedding";

interface CardPanelLeftProps {
  onOpenLocation: () => void;
  isContinuous?: boolean;
}

export default function CardPanelLeft({ onOpenLocation, isContinuous = false }: CardPanelLeftProps) {
  return (
    <div className="relative w-full paper-linen text-center overflow-hidden flex flex-col justify-between">
      {/* 1. Hero Photo Section */}
      <div className="relative w-full z-20">
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#2D2526]">
          {/* Black & White Couple Photo: Abhishek & Simran */}
          <img
            src="/card-assets/hero-photo.png"
            alt="Abhishek & Simran"
            className="w-full h-full object-cover object-top filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

          {/* Seamless torn paper capping bottom of photo */}
          <TornEdge direction="bottom" fill="#FAF8F5" className="absolute bottom-0 inset-x-0" />
        </div>

        {/* Delicate, perfectly proportioned botanical bouquet in corner */}
        <div className="absolute -bottom-8 left-1 sm:left-2 w-[75px] sm:w-[85px] pointer-events-none z-30">
          <img
            src="/card-assets/flower-intact.png"
            alt="Floral decoration"
            className="w-full h-auto drop-shadow-md"
          />
        </div>
      </div>

      {/* 2. Names & Date Header: Abhishek weds Simran */}
      <div className="pt-6 pb-3 px-6 relative z-10">
        <p className="text-[11px] font-serif tracking-[0.25em] text-[#681622]/80 uppercase mb-1">
          ॥ श्री गणेशाय नमः ॥
        </p>

        <p className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.35em] text-[#6e6163] mb-2">
          TOGETHER WITH THEIR FAMILIES
        </p>

        {/* Abhishek weds Simran - Clean stacked layout for flawless mobile display */}
        <div className="my-2 select-none">
          <h1 className="font-script text-5xl sm:text-6xl text-[#681622] leading-none drop-shadow-sm">
            <span className="text-[1.14em] inline-block align-baseline">A</span>bhishek
          </h1>

          <div className="flex items-center justify-center gap-3 my-2" aria-hidden="true">
            <span className="h-px w-8 sm:w-12 bg-[#681622]/30" />
            <span className="font-serif italic text-base sm:text-lg text-[#681622] tracking-[0.2em] lowercase font-normal">
              weds
            </span>
            <span className="h-px w-8 sm:w-12 bg-[#681622]/30" />
          </div>

          <h2 className="font-script text-5xl sm:text-6xl text-[#681622] leading-none drop-shadow-sm">
            <span className="text-[1.14em] inline-block align-baseline">S</span>imran
          </h2>
        </div>

        {/* Save The Date Couple Animated Illustration - Placed right above the scratch date */}
        <div className="w-[165px] sm:w-[190px] mx-auto mt-4 mb-2 pointer-events-none drop-shadow-md transform hover:scale-105 transition-transform duration-300">
          <img
            src="/card-assets/save-the-date-loop.gif"
            alt="Abhishek & Simran - Save The Date"
            className="w-full h-auto object-contain mx-auto"
          />
        </div>

        {/* Interactive Scratch-to-Reveal Wedding Date Foil Card */}
        <div className="mt-1">
          <ScratchDate
            dateFormatted={wedding.dateFormatted}
            fullDate={`${wedding.ceremony.weekday}, ${wedding.ceremony.date}`}
          />
        </div>
      </div>

      {/* 3. The Groom & The Bride Cards */}
      <div className="px-5 py-3 space-y-3.5 relative z-10">
        {/* Groom Card */}
        <div className="rounded-2xl border border-[#681622]/20 bg-white/70 backdrop-blur-sm p-4 text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-[#681622]/40" />
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#681622]">
            The Groom
          </p>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3D3536] mt-0.5">
            {wedding.groom.full}
          </h3>
          <p className="text-[11px] text-[#6e6163] mt-1.5">
            Son of <span className="font-semibold text-[#4A3E40]">{wedding.groom.father}</span> &amp; <span className="font-semibold text-[#4A3E40]">{wedding.groom.mother}</span>
          </p>
          <p className="text-[11px] text-[#6e6163] mt-0.5">
            Grandson of <span className="font-semibold text-[#4A3E40]">{wedding.groom.grandfather}</span>
          </p>
        </div>

        {/* Bride Card */}
        <div className="rounded-2xl border border-[#681622]/20 bg-white/70 backdrop-blur-sm p-4 text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-[#681622]/40" />
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#681622]">
            The Bride
          </p>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3D3536] mt-0.5">
            {wedding.bride.full}
          </h3>
          <p className="text-[11px] text-[#6e6163] mt-1.5">
            Daughter of <span className="font-semibold text-[#4A3E40]">{wedding.bride.father}</span> &amp; <span className="font-semibold text-[#4A3E40]">{wedding.bride.mother}</span>
          </p>
        </div>
      </div>

      {/* 4. Burgundy Countdown Banner */}
      <div className="w-full">
        <Countdown targetDate={wedding.weddingDate} />
      </div>

      {/* 5. Invitation Message */}
      <div className="px-6 py-4 flex flex-col items-center">
        <p className="font-serif italic text-sm sm:text-base text-[#4A3E40] leading-relaxed max-w-xs mx-auto text-center">
          Request the pleasure of your gracious company
          <br />
          to celebrate and bless the auspicious occasion
        </p>
        <HeartOrnament className="mt-3" />
      </div>

      {/* 6. Tilak Card (Itinerary) */}
      <div className="px-6 py-3 flex flex-col items-center">
        <div className="p-2.5 rounded-full bg-[#681622]/5 mb-1 text-[#681622]">
          <ChampagneIcon className="w-8 h-8 sm:w-9 sm:h-9" />
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#681622] tracking-wide">
          {wedding.tilak.title}
        </h3>

        <p className="text-xs sm:text-sm font-semibold text-[#3D3536] mt-1">
          {wedding.tilak.weekday}, {wedding.tilak.date}
        </p>

        <p className="text-xs sm:text-sm text-[#554a4c] mt-0.5">
          Auspicious Tilak &amp; Ring Ceremony
        </p>

        <button
          onClick={onOpenLocation}
          className="mt-3 px-6 py-1.5 sm:py-2 rounded-full bg-[#681622] text-white text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.2em] uppercase shadow-sm hover:bg-[#50101b] transition-all transform hover:scale-105 active:scale-95"
        >
          {wedding.venue.buttonText}
        </button>
      </div>

      {/* Haldi Ceremony Card */}
      <div className="px-6 py-3 flex flex-col items-center">
        {/* Animated Haldi Video Badge / Royal Arched Frame */}
        <div className="w-[125px] sm:w-[140px] aspect-[9/15] rounded-t-full rounded-b-2xl overflow-hidden shadow-md border-2 border-[#D4AF37]/60 my-1.5 bg-[#FFF9E6] relative transform hover:scale-105 transition-transform duration-300">
          <video
            src="/card-assets/haldi-ceremony.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none rounded-t-full rounded-b-2xl" />
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#681622] tracking-wide mt-1">
          {wedding.haldi.title}
        </h3>

        <p className="text-xs sm:text-sm font-semibold text-[#3D3536] mt-1">
          {wedding.haldi.weekday}, {wedding.haldi.date}
        </p>

        <p className="text-xs sm:text-sm text-[#554a4c] mt-0.5">
          {wedding.haldi.subtitle}
        </p>

        <button
          onClick={onOpenLocation}
          className="mt-3 px-6 py-1.5 sm:py-2 rounded-full bg-[#681622] text-white text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.2em] uppercase shadow-sm hover:bg-[#50101b] transition-all transform hover:scale-105 active:scale-95"
        >
          {wedding.venue.buttonText}
        </button>
      </div>

      {/* Mehndi & Mocktail Party Card */}
      <div className="px-6 py-3 flex flex-col items-center">
        <div className="p-2.5 rounded-full bg-[#681622]/5 mb-1 text-[#681622]">
          <MocktailIcon className="w-8 h-8 sm:w-9 sm:h-9" />
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#681622] tracking-wide">
          {wedding.mehndi.title}
        </h3>

        <p className="text-xs sm:text-sm font-semibold text-[#3D3536] mt-1">
          {wedding.mehndi.weekday}, {wedding.mehndi.date}
        </p>

        <p className="text-xs sm:text-sm text-[#554a4c] mt-0.5">
          {wedding.mehndi.subtitle}
        </p>

        <button
          onClick={onOpenLocation}
          className="mt-3 px-6 py-1.5 sm:py-2 rounded-full bg-[#681622] text-white text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.2em] uppercase shadow-sm hover:bg-[#50101b] transition-all transform hover:scale-105 active:scale-95"
        >
          {wedding.venue.buttonText}
        </button>
      </div>

      {/* 7. Wedding Card (Itinerary) */}
      <div className="px-6 pt-2 pb-5 flex flex-col items-center">
        {/* Sacred Jaimala / Varmala Ceremony Animated Loop */}
        <div className="w-[130px] sm:w-[150px] my-1 pointer-events-none drop-shadow-sm transform hover:scale-105 transition-transform duration-300">
          <img
            src="/card-assets/jaimala-transparent-loop.gif"
            alt="Sacred Varmala Ritual"
            className="w-full h-auto object-contain mx-auto"
          />
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#681622] tracking-wide">
          {wedding.ceremony.title}
        </h3>

        <p className="text-xs sm:text-sm font-semibold text-[#3D3536] mt-1">
          {wedding.ceremony.weekday}, {wedding.ceremony.date}
        </p>

        <p className="text-xs sm:text-sm text-[#554a4c] mt-0.5">
          Sacred Wedding Nuptials &amp; Pheras
        </p>

        <button
          onClick={onOpenLocation}
          className="mt-3 px-6 py-1.5 sm:py-2 rounded-full bg-[#681622] text-white text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.2em] uppercase shadow-sm hover:bg-[#50101b] transition-all transform hover:scale-105 active:scale-95"
        >
          {wedding.venue.buttonText}
        </button>
      </div>

      {/* 8. Mid Couple Walking Photo (at the end of panel 1) */}
      <div className="relative w-full mt-4 z-20">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#2D2526]">
          <img
            src="/card-assets/walking-photo.png"
            alt="Abhishek & Simran"
            className="w-full h-full object-cover object-center filter grayscale contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Top torn edge into photo */}
          <TornEdge direction="top" fill="#FAF8F5" className="absolute top-0 inset-x-0" />

          {/* Bottom torn edge */}
          <TornEdge direction="bottom" fill={isContinuous ? "#681622" : "#FAF8F5"} className="absolute bottom-0 inset-x-0" />
        </div>

        {/* Complete Botanical Bouquet on bottom right */}
        <div className="absolute -bottom-8 right-1 sm:right-2 w-[75px] sm:w-[85px] pointer-events-none z-30">
          <img
            src="/card-assets/flower-intact-flip.png"
            alt="Floral decoration"
            className="w-full h-auto drop-shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
