import React from "react";

// [x, y, rotation] for leaves along the vine
const LEAVES: [number, number, number][] = [
  [62, 540, -30], [48, 500, 150], [80, 450, -50], [40, 400, 160],
  [76, 350, -40], [50, 300, 150], [82, 240, -45], [52, 190, 155],
  [84, 140, -40], [70, 90, 150],
];
// [x, y, scale] for flowers
const FLOWERS: [number, number, number][] = [
  [100, 470, 1], [30, 330, 0.8], [96, 210, 1.1], [60, 60, 0.9],
];

const GOLD = "#D4AF37";

/** Gold-foil vine and flowers; `mirror` flips it for the right door. */
export default function DoorPattern({ mirror = false }: { mirror?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 600"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        transform: mirror ? "scaleX(-1)" : undefined,
        filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.25))",
      }}
      fill="none"
      stroke={GOLD}
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <rect x="12" y="12" width="176" height="576" rx="10" opacity="0.6" />
      <rect x="20" y="20" width="160" height="560" rx="6" opacity="0.3" />
      <path d="M60 588 C110 520 20 450 70 380 S30 230 80 150 S60 40 100 12" strokeWidth="2" />
      {LEAVES.map(([x, y, r], i) => (
        <path
          key={i}
          d="M0 0 C10 -12 28 -12 38 0 C28 12 10 12 0 0Z"
          transform={`translate(${x} ${y}) rotate(${r})`}
          fill={GOLD}
          fillOpacity="0.18"
        />
      ))}
      {FLOWERS.map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx="0" cy="-11" rx="5" ry="11" transform={`rotate(${a})`} fill={GOLD} fillOpacity="0.15" />
          ))}
          <circle r="3.5" fill={GOLD} />
        </g>
      ))}
    </svg>
  );
}
