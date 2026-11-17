import React, { forwardRef } from 'react';

interface LeftDoorProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * LeftDoor Component
 * 
 * Left gate panel with floral decorations that rotates along its left edge.
 * Implements Requirements 2.1, 2.5, 2.7, 8.4
 * 
 * - Position absolutely with transform origin at left center edge
 * - Dimensions: width 50vw (40vw on lg), height 90vh (85vh on md)
 * - Apply sage green background with subtle gradient
 * - Rounded borders and shadow for depth
 * - transformStyle preserve-3d for 3D transforms
 */
const LeftDoor = forwardRef<HTMLDivElement, LeftDoorProps>(
  ({ className = '', children }, ref) => {
    return (
      <div
        ref={ref}
        data-testid="left-door"
        className={`
          absolute left-1/2 top-1/2 
          w-[50vw] h-[90vh]
          md:h-[85vh]
          lg:w-[40vw]
          -translate-x-full -translate-y-1/2
          origin-left
          bg-gradient-to-br from-[#A8B5A2] to-[#8A9A82]
          rounded-r-xl
          shadow-[10px_0_30px_rgba(0,0,0,0.3)]
          ${className}
        `.trim()}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Door base with gradient background */}
        <div className="absolute inset-0 rounded-r-xl overflow-hidden">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        </div>
        
        {/* Embossed border effect */}
        <div 
          className="absolute inset-0 rounded-r-xl pointer-events-none"
          style={{
            boxShadow: 'inset -2px 0 4px rgba(255,255,255,0.2), inset 2px 0 4px rgba(0,0,0,0.1)'
          }}
        />
        {children}
      </div>
    );
  }
);

LeftDoor.displayName = 'LeftDoor';

export default LeftDoor;
