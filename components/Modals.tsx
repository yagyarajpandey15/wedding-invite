"use client";

import React, { useState } from "react";
import { wedding } from "../lib/wedding";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function BaseModal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-sm rounded-2xl bg-[#FAF8F5] p-6 text-center shadow-2xl border border-[#681622]/20 paper-linen"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#681622]/60 hover:text-[#681622] transition-colors p-1"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="font-serif text-2xl font-bold text-[#681622] mb-3">{title}</h3>
        {children}
      </div>
    </div>
  );
}

// 1. Venue & How to Reach Modal
export interface VenueInfo {
  name: string;
  title?: string;
  forEvents?: string;
  lines: string[];
  mapUrl: string;
  embedMapUrl: string;
  plusCode?: string;
}

export function VenueModal({
  isOpen,
  onClose,
  venue = wedding.venue,
}: {
  isOpen: boolean;
  onClose: () => void;
  venue?: VenueInfo;
}) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={venue.name}>
      <div className="space-y-3.5 my-2 text-sm text-[#4A3E40]">
        <div className="bg-white/80 p-3.5 rounded-xl border border-[#681622]/15 shadow-sm text-center">
          {venue.forEvents && (
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-1">
              {venue.forEvents}
            </p>
          )}
          <p className="font-serif text-lg font-semibold text-[#681622]">{venue.name}</p>
          <div className="text-xs text-[#706466] mt-1.5 space-y-0.5">
            {venue.lines.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
        </div>

        {/* Embedded Interactive Map */}
        <div className="rounded-xl overflow-hidden border border-[#681622]/20 shadow-sm h-[170px] bg-[#E5E3DF]">
          <iframe
            title={`Google Map - ${venue.name}`}
            src={venue.embedMapUrl}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>

        <a
          href={venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full px-6 py-2.5 rounded-full bg-[#681622] text-white text-xs font-semibold tracking-widest uppercase shadow-md hover:bg-[#50101b] transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Open in Google Maps
        </a>
      </div>
    </BaseModal>
  );
}

// 2. RSVP & Blessings Modal
export function RsvpModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("yes");
  const [guestsCount, setGuestsCount] = useState("1");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsapp = () => {
    const text = `Namaste! Heartiest congratulations to Abhishek & Simran! From: ${name || "[My Name]"}. ${
      attending === "yes" ? `We will joyfully attend with ${guestsCount} guest(s).` : "Sending our heartfelt blessings and best wishes!"
    } ${notes ? `Wishes: ${notes}` : ""}`;
    const url = `https://wa.me/${wedding.rsvp.whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="RSVP & Blessings">
      {submitted ? (
        <div className="py-8 space-y-3 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-green-100 text-green-700 flex items-center justify-center text-2xl font-bold">
            ✓
          </div>
          <p className="font-serif text-lg text-[#681622]">Thank you for your blessings!</p>
          <p className="text-xs text-[#706466]">The family looks forward to welcoming you.</p>
        </div>
      ) : (
        <form onSubmit={handleLocalSubmit} className="space-y-3.5 text-left text-xs">
          <div>
            <label className="block text-[#554a4c] font-medium mb-1">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh Kumar & Family"
              className="w-full px-3 py-2 rounded-lg border border-[#ECE7E0] bg-white text-[#3D3536] focus:outline-none focus:border-[#681622]"
            />
          </div>

          <div>
            <label className="block text-[#554a4c] font-medium mb-1">Will you attend the wedding?</label>
            <div className="grid grid-cols-2 gap-2">
              <label className={`flex items-center justify-center p-2 rounded-lg border cursor-pointer font-medium transition-all ${attending === "yes" ? "bg-[#681622] text-white border-[#681622]" : "bg-white text-[#554a4c] border-[#ECE7E0]"}`}>
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={attending === "yes"}
                  onChange={() => setAttending("yes")}
                  className="hidden"
                />
                Joyfully Attend
              </label>

              <label className={`flex items-center justify-center p-2 rounded-lg border cursor-pointer font-medium transition-all ${attending === "no" ? "bg-[#681622] text-white border-[#681622]" : "bg-white text-[#554a4c] border-[#ECE7E0]"}`}>
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={attending === "no"}
                  onChange={() => setAttending("no")}
                  className="hidden"
                />
                Sending Wishes
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[#554a4c] font-medium mb-1">Number of Guests</label>
            <input
              type="number"
              min="1"
              max="10"
              value={guestsCount}
              onChange={(e) => setGuestsCount(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#ECE7E0] bg-white text-[#3D3536] focus:outline-none focus:border-[#681622]"
            />
          </div>

          <div>
            <label className="block text-[#554a4c] font-medium mb-1">Blessings / Wishes for the Couple</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Wishing you a lifetime of love and happiness!"
              className="w-full px-3 py-2 rounded-lg border border-[#ECE7E0] bg-white text-[#3D3536] focus:outline-none focus:border-[#681622] resize-none"
            />
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-[#681622] text-white font-semibold text-xs tracking-widest uppercase shadow hover:bg-[#50101b] transition-all hover:scale-[1.01]"
            >
              Confirm RSVP
            </button>

            <button
              type="button"
              onClick={handleWhatsapp}
              className="w-full py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-[#20ba5a] shadow transition-all hover:scale-[1.01]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              <span>RSVP via WhatsApp</span>
            </button>

            <a
              href={`tel:${wedding.rsvp.phoneClean}`}
              className="w-full py-2 rounded-full border border-[#681622]/30 text-[#681622] font-semibold text-xs tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#681622]/5 transition-colors"
            >
              <span>📞 Call: {wedding.rsvp.phone}</span>
            </a>
          </div>
        </form>
      )}
    </BaseModal>
  );
}

// 3. Sangeet Song Suggestion Modal
export function PlaylistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [from, setFrom] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setSong("");
      setArtist("");
      onClose();
    }, 2200);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Suggest a Song">
      {sent ? (
        <div className="py-6 space-y-2 text-center">
          <div className="text-3xl">🎵</div>
          <p className="font-serif text-lg text-[#681622]">Song added to Sangeet Playlist!</p>
          <p className="text-xs text-[#706466]">See you on the dance floor!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 text-left text-xs">
          <p className="text-xs text-[#554a4c] mb-2 text-center">
            Help us build the ultimate Sangeet dance playlist! What song must play?
          </p>

          <div>
            <label className="block text-[#554a4c] font-medium mb-1">Song Name</label>
            <input
              type="text"
              required
              value={song}
              onChange={(e) => setSong(e.target.value)}
              placeholder="e.g. Gallan Goodiyan, London Thumakda"
              className="w-full px-3 py-2 rounded-lg border border-[#ECE7E0] bg-white text-[#3D3536] focus:outline-none focus:border-[#681622]"
            />
          </div>

          <div>
            <label className="block text-[#554a4c] font-medium mb-1">Artist / Movie</label>
            <input
              type="text"
              required
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="e.g. Dil Dhadakne Do"
              className="w-full px-3 py-2 rounded-lg border border-[#ECE7E0] bg-white text-[#3D3536] focus:outline-none focus:border-[#681622]"
            />
          </div>

          <div>
            <label className="block text-[#554a4c] font-medium mb-1">Your Name (optional)</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="e.g. Ankit"
              className="w-full px-3 py-2 rounded-lg border border-[#ECE7E0] bg-white text-[#3D3536] focus:outline-none focus:border-[#681622]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-[#681622] text-white font-semibold text-xs tracking-widest uppercase shadow hover:bg-[#50101b] transition-all hover:scale-[1.01]"
            >
              Add to Playlist
            </button>
          </div>
        </form>
      )}
    </BaseModal>
  );
}
