"use client";

import React, { useState } from "react";
import CardPanelLeft from "./CardPanelLeft";
import CardPanelRight from "./CardPanelRight";
import { VenueModal, RsvpModal, PlaylistModal } from "./Modals";
import BackgroundMusic from "./BackgroundMusic";
import CardIntroVideo from "./CardIntroVideo";
import { wedding } from "../lib/wedding";

export default function WeddingCard() {
  const [showVenue, setShowVenue] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<"groom" | "wedding">("wedding");
  const [showRsvp, setShowRsvp] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen w-full flex justify-center items-start sm:py-8 sm:px-4 bg-[#ECE7E0] relative">
      {/* 1. Cinematic Card Opening Video */}
      {showIntro && (
        <CardIntroVideo onComplete={() => setShowIntro(false)} />
      )}

      {/* 2. Main Mobile Wedding Invitation Card */}
      <main
        className={`w-full max-w-[430px] bg-[#FAF8F5] sm:rounded-3xl shadow-2xl border-0 sm:border border-[#681622]/20 overflow-hidden relative transition-all duration-1000 ease-out ${
          showIntro
            ? "opacity-0 translate-y-8 scale-[0.97] pointer-events-none"
            : "opacity-100 translate-y-0 scale-100"
        }`}
      >
        {/* Top Part of the Mobile Invitation */}
        <CardPanelLeft
          onOpenGroomLocation={() => {
            setSelectedVenue("groom");
            setShowVenue(true);
          }}
          onOpenWeddingLocation={() => {
            setSelectedVenue("wedding");
            setShowVenue(true);
          }}
          onOpenLocation={() => {
            setSelectedVenue("wedding");
            setShowVenue(true);
          }}
          isContinuous={true}
        />

        {/* Bottom Part of the Mobile Invitation */}
        <CardPanelRight
          onOpenVenue={() => {
            setSelectedVenue("wedding");
            setShowVenue(true);
          }}
          onOpenRsvp={() => setShowRsvp(true)}
          onOpenPlaylist={() => setShowPlaylist(true)}
        />
      </main>

      {/* Floating Replay Opening Video Button (visible once card is opened) */}
      {!showIntro && (
        <button
          onClick={() => setShowIntro(true)}
          title="Replay Opening Video"
          className="fixed bottom-5 left-5 z-40 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#681622]/90 hover:bg-[#681622] text-[#FDFBF7] text-xs font-serif tracking-wider shadow-lg border border-[#D4AF37]/50 backdrop-blur-md transition-all transform hover:scale-105 active:scale-95"
        >
          <span className="text-sm">🎬</span>
          <span className="hidden sm:inline">Replay Intro</span>
        </button>
      )}

      {/* Floating Background Romantic Music Button */}
      <BackgroundMusic isCardOpen={!showIntro} />

      {/* Interactive Modals */}
      <VenueModal
        isOpen={showVenue}
        onClose={() => setShowVenue(false)}
        venue={selectedVenue === "groom" ? wedding.groomVenue : wedding.venue}
      />

      <RsvpModal isOpen={showRsvp} onClose={() => setShowRsvp(false)} />

      <PlaylistModal isOpen={showPlaylist} onClose={() => setShowPlaylist(false)} />
    </div>
  );
}
