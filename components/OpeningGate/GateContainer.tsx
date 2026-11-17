import React from 'react';

interface GateContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * GateContainer - 3D perspective parent container for door panels
 * 
 * This component establishes the 3D rendering context for the gate opening animation.
 * It provides perspective depth, centers child elements, and maintains the sage green
 * background color consistent with the luxury wedding invitation aesthetic.
 * 
 * Requirements: 1.1, 2.7, 8.1, 8.2, 8.3, 11.7
 * 
 * - 1.1: Sage green background (#A8B5A2)
 * - 2.7: 3D perspective transforms for physical door simulation
 * - 8.1: Mobile viewport support (320px+)
 * - 8.2: Tablet viewport support (768px+)
 * - 8.3: Desktop viewport support (1024px+)
 * - 11.7: Perspective property on parent container for 3D rendering
 */
const GateContainer: React.FC<GateContainerProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`
        relative w-full h-screen overflow-hidden
        perspective-1500 lg:perspective-2000
        bg-sage-400
        flex items-center justify-center
        ${className}
      `}
      style={{
        perspectiveOrigin: '50% 50%', // Centered vanishing point (Req 11.7)
      }}
    >
      {children}
    </div>
  );
};

export default GateContainer;
