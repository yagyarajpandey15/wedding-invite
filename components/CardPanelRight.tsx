"use client";

import React from "react";
import TornEdge from "./TornEdge";
import {
  ChurchIcon,
  DinnerIcon,
  ChampagneIcon,
  CakeIcon,
  MoonIcon,
  MusicIcon,
  HeartOrnament,
  HaldiIcon,
  MocktailIcon,
} from "./Icons";
import { wedding } from "../lib/wedding";

interface CardPanelRightProps {
  onOpenVenue: () => void;
  onOpenRsvp: () => void;
  onOpenPlaylist: () => void;
}

export default function CardPanelRight({
  onOpenVenue,
  onOpenRsvp,
  onOpenPlaylist,
}: CardPanelRightProps) {
  return (
    <div className="relative w-full paper-linen text-center overflow-hidden flex flex-col justify-between">
      {/* 2. Wedding Itinerary Timeline */}
      <div className="pt-8 pb-5 px-4 sm:px-6 relative z-0">
        <h3 className="font-serif text-2xl font-bold text-[#681622] tracking-wide mb-6">
          Wedding Itinerary
        </h3>

        {/* Vertical Timeline container with central vertical line and nodes */}
        <div className="relative max-w-[340px] sm:max-w-[360px] mx-auto py-2">
          {/* Vertical connecting line */}
          <div className="absolute left-1/2 top-3 bottom-3 w-[1.5px] bg-[#681622]/40 -translate-x-1/2" />

          {/* 1. Tilak Ceremony (Left) */}
          <div className="relative flex items-center mb-6">
            <div className="w-1/2 pr-3.5 sm:pr-5 text-right flex flex-col items-end">
              <ChampagneIcon className="w-6 h-6 text-[#681622] mb-1" />
              <span className="font-serif text-sm sm:text-[15px] font-bold text-[#681622] leading-tight">Tilak Ceremony</span>
              <span className="text-xs sm:text-[13px] text-[#3D3536] font-semibold leading-tight mt-0.5">Sun, 07 Feb 2027</span>
              <span className="text-[11px] sm:text-xs text-[#706466] leading-tight mt-0.5">Auspicious Tilak Rituals</span>
            </div>
            {/* Center dot node */}
            <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#681622] ring-2 ring-[#FAF8F5] z-10" />
            <div className="w-1/2 pl-3.5 sm:pl-5" />
          </div>

          {/* 2. Haldi Ceremony (Right) */}
          <div className="relative flex items-center mb-6">
            <div className="w-1/2 pr-3.5 sm:pr-5" />
            {/* Center dot node */}
            <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#681622] ring-2 ring-[#FAF8F5] z-10" />
            <div className="w-1/2 pl-3.5 sm:pl-5 text-left flex flex-col items-start">
              <HaldiIcon className="w-6 h-6 text-[#681622] mb-1" />
              <span className="font-serif text-sm sm:text-[15px] font-bold text-[#681622] leading-tight">Haldi Ceremony</span>
              <span className="text-xs sm:text-[13px] text-[#3D3536] font-semibold leading-tight mt-0.5">Tue, 09 Feb 2027</span>
              <span className="text-[11px] sm:text-xs text-[#706466] leading-tight mt-0.5">Ubtan, Colors &amp; Sunshine</span>
            </div>
          </div>

          {/* 3. Mehndi & Sangeet (Left) */}
          <div className="relative flex items-center mb-6">
            <div className="w-1/2 pr-3.5 sm:pr-5 text-right flex flex-col items-end">
              <MocktailIcon className="w-6 h-6 text-[#681622] mb-1" />
              <span className="font-serif text-sm sm:text-[15px] font-bold text-[#681622] leading-tight">Mehndi &amp; Sangeet</span>
              <span className="text-xs sm:text-[13px] text-[#3D3536] font-semibold leading-tight mt-0.5">Wed, 10 Feb 2027</span>
              <span className="text-[11px] sm:text-xs text-[#706466] leading-tight mt-0.5">Henna, Beats &amp; Music</span>
            </div>
            {/* Center dot node */}
            <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#681622] ring-2 ring-[#FAF8F5] z-10" />
            <div className="w-1/2 pl-3.5 sm:pl-5" />
          </div>

          {/* 4. Wedding Ceremony (Right) */}
          <div className="relative flex items-center mb-6">
            <div className="w-1/2 pr-3.5 sm:pr-5" />
            {/* Center dot node */}
            <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#681622] ring-2 ring-[#FAF8F5] z-10" />
            <div className="w-1/2 pl-3.5 sm:pl-5 text-left flex flex-col items-start">
              <ChurchIcon className="w-6 h-6 text-[#681622] mb-1" />
              <span className="font-serif text-sm sm:text-[15px] font-bold text-[#681622] leading-tight">Wedding Ceremony</span>
              <span className="text-xs sm:text-[13px] text-[#3D3536] font-semibold leading-tight mt-0.5">Thu, 11 Feb 2027</span>
              <span className="text-[11px] sm:text-xs text-[#706466] leading-tight mt-0.5">Sacred Pheras &amp; Nuptials</span>
            </div>
          </div>

          {/* 5. Reception & Dinner (Left) */}
          <div className="relative flex items-center mb-6">
            <div className="w-1/2 pr-3.5 sm:pr-5 text-right flex flex-col items-end">
              <DinnerIcon className="w-6 h-6 text-[#681622] mb-1" />
              <span className="font-serif text-sm sm:text-[15px] font-bold text-[#681622] leading-tight">Grand Feast</span>
              <span className="text-xs sm:text-[13px] text-[#3D3536] font-semibold leading-tight mt-0.5">Thu, 11 Feb 2027</span>
              <span className="text-[11px] sm:text-xs text-[#706466] leading-tight mt-0.5">Dinner &amp; Blessings</span>
            </div>
            {/* Center dot node */}
            <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#681622] ring-2 ring-[#FAF8F5] z-10" />
            <div className="w-1/2 pl-3.5 sm:pl-5" />
          </div>

          {/* 6. Vidaai (Right) */}
          <div className="relative flex items-center">
            <div className="w-1/2 pr-3.5 sm:pr-5" />
            {/* Center dot node */}
            <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#681622] ring-2 ring-[#FAF8F5] z-10" />
            <div className="w-1/2 pl-3.5 sm:pl-5 text-left flex flex-col items-start">
              <MoonIcon className="w-6 h-6 text-[#681622] mb-1" />
              <span className="font-serif text-sm sm:text-[15px] font-bold text-[#681622] leading-tight">Vidaai</span>
              <span className="text-xs sm:text-[13px] text-[#3D3536] font-semibold leading-tight mt-0.5">Fri, 12 Feb 2027</span>
              <span className="text-[11px] sm:text-xs text-[#706466] leading-tight mt-0.5">Warm Blessings</span>
            </div>
          </div>
        </div>

        {/* Traditional Royal Doli (Vidaai) Animated Procession */}
        <div className="mt-5 pt-2 flex flex-col items-center">
          <div className="w-[230px] sm:w-[260px] pointer-events-none drop-shadow-sm transform hover:scale-105 transition-transform duration-300">
            <img
              src="/card-assets/doli-all-white-loop.gif"
              alt="Royal Vidaai Doli Procession"
              className="w-full h-auto object-contain mx-auto mix-blend-multiply"
            />
          </div>
          <p className="text-[10px] font-serif italic text-[#706466] mt-1.5 tracking-wide">
            With hearts full of love &amp; blessings
          </p>
        </div>
      </div>

      {/* 3. Venue Card (“See You There”) */}
      <div className="px-5 pt-5 pb-2 relative">
        {/* Delicate Botanical bouquet on right: tucked on the right edge */}
        <div className="absolute -top-5 -right-2 w-[65px] sm:w-[75px] pointer-events-none z-10">
          <img
            src="/card-assets/flower-intact-flip.png"
            alt="Floral decoration"
            className="w-full h-auto drop-shadow-md"
          />
        </div>

        {/* Shield Pointed Container */}
        <div className="relative mx-auto max-w-[310px] bg-[#FAF8F5] pt-5 pb-6 px-6 rounded-t-xl rounded-b-[28px] border border-[#681622]/35 shadow-sm text-center">
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FAF8F5] border-r border-b border-[#681622]/35 rotate-45 pointer-events-none" />

          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#681622]">
            Venue
          </p>

          <h3 className="font-serif text-2xl font-bold text-[#681622] mt-0.5 mb-2">
            {wedding.venue.title}
          </h3>

          <p className="font-serif text-lg font-bold text-[#3D3536]">
            {wedding.venue.name}
          </p>

          <div className="mt-2 text-[11px] sm:text-xs text-[#554a4c] space-y-0.5 leading-relaxed">
            {wedding.venue.lines.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>

          <a
            href={wedding.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block px-7 py-2 rounded-full bg-[#681622] text-white text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.2em] uppercase shadow-sm hover:bg-[#50101b] transition-all transform hover:scale-105 active:scale-95"
          >
            {wedding.venue.buttonText}
          </a>
        </div>
      </div>

      {/* Google Map Location just below the venue */}
      <div className="px-5 pt-2 pb-5 relative z-10">
        <div className="relative mx-auto max-w-[310px] rounded-2xl overflow-hidden border border-[#681622]/30 bg-white shadow-md">
          {/* Header Bar */}
          <div className="bg-[#FAF8F5] px-3.5 py-2.5 border-b border-[#681622]/15 flex items-center justify-between">
            <div className="flex items-center gap-2 text-left">
              <span className="text-base leading-none">📍</span>
              <div>
                <p className="font-serif text-xs font-bold text-[#681622] leading-tight">
                  Wedding Venue, Mehan
                </p>
                <p className="text-[10px] text-[#706466] leading-tight mt-0.5">
                  Post: Dandari • PIN: 851211 • Begusarai, Bihar
                </p>
              </div>
            </div>
            <a
              href={wedding.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-full bg-[#681622] text-white text-[9px] font-sans font-semibold tracking-wider uppercase shadow-xs hover:bg-[#50101b] transition-all flex items-center gap-1"
            >
              <span>Directions</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>

          {/* Interactive Google Map Iframe */}
          <div className="relative w-full h-[190px] sm:h-[210px] bg-[#E5E3DF]">
            <iframe
              title="Google Map Location - Wedding Venue, Mehan"
              src={wedding.venue.embedMapUrl}
              className="w-full h-full border-0 filter contrast-[1.02]"
              loading="lazy"
              allowFullScreen
            />
          </div>

          {/* Bottom Tap to Navigate */}
          <a
            href={wedding.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 text-center bg-[#FAF8F5] text-[10px] sm:text-[11px] font-sans font-semibold text-[#681622] border-t border-[#681622]/15 hover:bg-[#f2ece4] transition-colors"
          >
            Open in Google Maps for Navigation &rarr;
          </a>
        </div>
      </div>

      {/* 4. Expected By Section (Vintage Placard) */}
      <div className="px-5 py-4 relative">
        {/* Delicate Botanical bouquet on left: tucked on the left edge */}
        <div className="absolute -top-5 -left-2 w-[65px] sm:w-[75px] pointer-events-none z-10">
          <img
            src="/card-assets/flower-intact.png"
            alt="Floral decoration"
            className="w-full h-auto drop-shadow-md"
          />
        </div>

        {/* Vintage baroque cartouche placard with double border */}
        <div className="vintage-placard py-7 px-6 text-center text-white relative max-w-[330px] mx-auto shadow-2xl">
          <p className="font-serif text-sm text-white/80 tracking-widest uppercase mb-1">
            ॥ दर्शनाभिलाषी ॥
          </p>

          <h3 className="font-script text-3xl sm:text-4xl text-white font-normal drop-shadow-sm mb-3">
            Expected By
          </h3>

          <div className="space-y-1.5 text-xs font-serif text-white/95 max-w-[270px] mx-auto leading-relaxed my-2">
            {wedding.expectedBy.map((person, idx) => (
              <p key={idx} className="font-medium tracking-wide">
                {person}
              </p>
            ))}
            <p className="pt-2 text-xs italic text-white/85 font-sans">
              {wedding.expectedByNote}
            </p>
          </div>

          {/* Delicate Ornamental Divider */}
          <div className="my-4 flex items-center justify-center gap-2.5 opacity-80" aria-hidden="true">
            <span className="h-px w-8 bg-white/30" />
            <span className="text-[10px] text-white/70">✦</span>
            <span className="h-px w-8 bg-white/30" />
          </div>

          {/* Well Wisher Section */}
          <div className="text-center">
            <p className="font-serif text-xs text-white/80 tracking-widest uppercase mb-0.5">
              {wedding.wellWisher.hindi}
            </p>
            <h4 className="font-script text-2xl sm:text-3xl text-white font-normal drop-shadow-sm mb-1">
              {wedding.wellWisher.title}
            </h4>
            <p className="font-serif text-sm font-semibold text-white tracking-wide">
              {wedding.wellWisher.name}
            </p>
          </div>

          <button
            onClick={onOpenRsvp}
            className="mt-4 px-7 py-2 rounded-full bg-[#FAF8F5] text-[#681622] text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.2em] uppercase shadow-md hover:bg-white transition-all transform hover:scale-105 active:scale-95"
          >
            SEND BLESSINGS / RSVP
          </button>
        </div>
      </div>

      {/* 5. Split Bottom Section: Sangeet Playlist & The Couple */}
      <div className="pt-5 pb-8 px-6 relative mt-2 border-t border-[#681622]/15">
        {/* Festive Baraat & Band Baaja Animated Procession */}
        <div className="mb-6 text-center">
          <div className="w-[250px] sm:w-[280px] mx-auto pointer-events-none drop-shadow-sm transform hover:scale-105 transition-transform duration-300">
            <img
              src="/card-assets/baraat-band-transparent-loop.gif"
              alt="Band Baaja Baraat Celebration"
              className="w-full h-auto object-contain mx-auto"
            />
          </div>

          {/* Sender / प्रेषक Details below sticker */}
          <div className="mt-3 inline-block px-5 py-2.5 rounded-2xl bg-[#681622]/5 border border-[#681622]/15 shadow-xs text-center">
            <p className="font-serif text-[11px] sm:text-xs font-bold text-[#681622] tracking-widest uppercase">
              {wedding.sender.combined}
            </p>
            <p className="font-serif text-sm sm:text-base font-bold text-[#2A1810] mt-0.5">
              {wedding.sender.name}
            </p>
            <a
              href={`tel:${wedding.sender.phone}`}
              className="inline-block text-xs text-[#681622] font-semibold font-sans mt-0.5 tracking-wide hover:underline"
            >
              Mo: {wedding.sender.phone}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 items-center">
          {/* Left Column: Sangeet Playlist */}
          <div className="text-center flex flex-col items-center pr-2">
            <MusicIcon className="w-7 h-7 text-[#681622] mb-1" />

            <h4 className="font-serif text-base sm:text-lg font-bold text-[#681622]">
              {wedding.playlist.title}
            </h4>

            <p className="text-[10px] sm:text-[11px] font-sans text-[#554a4c] leading-tight mt-1 mb-3">
              {wedding.playlist.line1}
              <br />
              {wedding.playlist.line2}
            </p>

            <button
              onClick={onOpenPlaylist}
              className="px-4 py-1.5 rounded-full bg-[#681622] text-white text-[9px] sm:text-[10px] font-sans font-semibold tracking-[0.15em] uppercase shadow-sm hover:bg-[#50101b] transition-all transform hover:scale-105 active:scale-95"
            >
              SUGGEST SONG
            </button>
          </div>

          {/* Right Column: The Couple with Circular Photo */}
          <div className="relative text-center flex flex-col items-center pl-2 border-l border-[#681622]/20">
            <h4 className="font-script text-2xl sm:text-3xl text-[#681622]">
              The Couple
            </h4>

            <HeartOrnament className="my-1.5" />

            {/* Circular Couple Photo */}
            <div className="relative mt-1 w-20 h-20 sm:w-24 sm:h-24">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#681622]/30 shadow-md">
                <img
                  src="/card-assets/couple-circle.png"
                  alt="Abhishek & Simran"
                  className="w-full h-full object-cover filter grayscale contrast-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
