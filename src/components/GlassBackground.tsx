import React, { useEffect, useState } from 'react';

interface GlassBackgroundProps {
  isInsideFrame?: boolean;
}

export const GlassBackground: React.FC<GlassBackgroundProps> = ({ isInsideFrame = false }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax offsets for glass refraction
  const parallax1 = scrollY * 0.12;
  const parallax2 = -scrollY * 0.08;
  const parallax3 = scrollY * 0.06;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${
        isInsideFrame ? 'absolute' : 'fixed'
      }`}
      aria-hidden="true"
    >
      {/* Base Frosted Alabaster Canvas with Subtle Glass Tint */}
      <div className="absolute inset-0 bg-[#FDFBF7]" />

      {/* Layer 1: Ambient Glowing Light Orbs under the Glass */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[140px] opacity-75 animate-float-orb-1"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, rgba(251, 191, 36, 0.25) 50%, transparent 70%)',
          top: `calc(-15% + ${parallax1}px)`,
          right: '-10%',
        }}
      />

      <div
        className="absolute w-[750px] h-[750px] rounded-full blur-[150px] opacity-70 animate-float-orb-2"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(147, 197, 253, 0.2) 50%, transparent 70%)',
          top: `calc(35% + ${parallax2}px)`,
          left: '-15%',
        }}
      />

      <div
        className="absolute w-[680px] h-[680px] rounded-full blur-[130px] opacity-65 animate-float-orb-3"
        style={{
          background: 'radial-gradient(circle, rgba(251, 113, 133, 0.35) 0%, rgba(253, 164, 175, 0.18) 50%, transparent 70%)',
          top: `calc(65% + ${parallax3}px)`,
          right: '5%',
        }}
      />

      <div
        className="absolute w-[620px] h-[620px] rounded-full blur-[140px] opacity-60 animate-float-orb-4"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.28) 0%, rgba(110, 231, 183, 0.15) 50%, transparent 70%)',
          bottom: '-10%',
          left: '20%',
        }}
      />

      {/* Layer 2: Subtle Optical Architectural Glass Grid Pattern */}
      <div className="absolute inset-0 glass-grid-pattern opacity-40" />

      {/* Layer 3: Master Frosted Glass Diffusion & Refraction Screen */}
      <div className="absolute inset-0 bg-white/45 backdrop-blur-[70px] backdrop-saturate-[180%]" />

      {/* Layer 4: Specular Glass Prismatic Lighting Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-amber-500/[0.04]" />
    </div>
  );
};
