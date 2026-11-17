/**
 * Tailwind Demo Component
 * Demonstrates all custom theme configurations
 */

export default function TailwindDemo() {
  return (
    <div className="p-8 bg-sage-400 min-h-screen">
      {/* Color Palette Demo */}
      <section className="mb-8">
        <h2 className="text-3xl font-serif text-gold-400 mb-4">
          Color Palettes
        </h2>
        
        {/* Sage Green Palette */}
        <div className="mb-6">
          <h3 className="text-xl font-sans text-white mb-2">Sage Green</h3>
          <div className="flex flex-wrap gap-2">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
              <div
                key={`sage-${shade}`}
                className={`w-20 h-20 bg-sage-${shade} rounded-lg shadow-md flex items-center justify-center`}
              >
                <span className="text-xs font-sans text-white mix-blend-difference">
                  {shade}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gold Palette */}
        <div>
          <h3 className="text-xl font-sans text-white mb-2">Gold</h3>
          <div className="flex flex-wrap gap-2">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
              <div
                key={`gold-${shade}`}
                className={`w-20 h-20 bg-gold-${shade} rounded-lg shadow-md flex items-center justify-center`}
              >
                <span className="text-xs font-sans text-white mix-blend-difference">
                  {shade}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Font Families Demo */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-serif text-sage-800 mb-4">
          Font Families
        </h2>
        <p className="text-2xl font-serif text-gold-700 mb-3">
          Playfair Display - Elegant Serif Font
        </p>
        <p className="text-lg font-sans text-sage-600">
          Montserrat - Clean Sans-Serif Font for Body Text
        </p>
      </section>

      {/* Responsive Breakpoints Demo */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-serif text-sage-800 mb-4">
          Responsive Breakpoints
        </h2>
        <div className="space-y-2">
          <div className="xs:bg-gold-100 sm:bg-gold-200 md:bg-gold-300 lg:bg-gold-400 p-4 rounded">
            <p className="font-sans text-sage-900">
              <span className="font-bold">Current breakpoint:</span>{' '}
              <span className="xs:inline sm:hidden">xs (320px+)</span>
              <span className="hidden sm:inline md:hidden">sm (640px+)</span>
              <span className="hidden md:inline lg:hidden">md (768px+)</span>
              <span className="hidden lg:inline">lg (1024px+)</span>
            </p>
          </div>
        </div>
      </section>

      {/* 3D Perspective Demo */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-xl overflow-hidden">
        <h2 className="text-3xl font-serif text-sage-800 mb-4">
          3D Perspective Utilities
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1000px perspective */}
          <div className="perspective-1000">
            <div 
              className="w-32 h-32 bg-sage-400 rounded-lg transform-style-3d hover:rotate-y-45 transition-transform duration-500 flex items-center justify-center shadow-lg"
              style={{ transform: 'rotateY(20deg)' }}
            >
              <span className="font-sans text-white font-bold">1000px</span>
            </div>
          </div>

          {/* 1500px perspective */}
          <div className="perspective-1500">
            <div 
              className="w-32 h-32 bg-gold-400 rounded-lg transform-style-3d hover:rotate-y-45 transition-transform duration-500 flex items-center justify-center shadow-lg"
              style={{ transform: 'rotateY(20deg)' }}
            >
              <span className="font-sans text-white font-bold">1500px</span>
            </div>
          </div>

          {/* 2000px perspective */}
          <div className="perspective-2000">
            <div 
              className="w-32 h-32 bg-sage-700 rounded-lg transform-style-3d hover:rotate-y-45 transition-transform duration-500 flex items-center justify-center shadow-lg"
              style={{ transform: 'rotateY(20deg)' }}
            >
              <span className="font-sans text-white font-bold">2000px</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm font-sans text-sage-600 mt-4">
          Hover over the boxes to see 3D rotation with different perspective values
        </p>
      </section>

      {/* Custom Utilities Demo */}
      <section className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-serif text-sage-800 mb-4">
          Custom Utilities
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-sage-100 rounded">
            <code className="font-mono text-sm text-sage-900">
              .perspective-1000, .perspective-1500, .perspective-2000
            </code>
            <p className="font-sans text-sage-600 mt-2 text-sm">
              Custom perspective values for 3D transforms
            </p>
          </div>
          
          <div className="p-4 bg-gold-100 rounded">
            <code className="font-mono text-sm text-sage-900">
              .transform-style-3d, .backface-hidden
            </code>
            <p className="font-sans text-sage-600 mt-2 text-sm">
              3D transform utilities for complex animations
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
