import React, { useState, useEffect } from 'react';
import { smoothScrollTo, smoothScrollToTop } from '../hooks/useScrollReveal';

/**
 * Animated Frosted Glass Scroll-Down Indicator for Hero sections
 */
interface ScrollDownHeroIndicatorProps {
  targetId?: string;
  label?: string;
  onClick?: () => void;
}

export const ScrollDownHeroIndicator: React.FC<ScrollDownHeroIndicatorProps> = ({
  targetId = 'featured-masterpiece',
  label = 'اسکرول به پایین • کاوش عمارت‌ها',
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      smoothScrollTo(targetId, 80);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-6 group cursor-pointer" onClick={handleClick}>
      {/* Outer Floating Frosted Pill */}
      <div className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_8px_30px_rgba(141,75,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all duration-300 group-hover:bg-white/90 group-hover:scale-105 group-hover:shadow-[0_12px_36px_rgba(141,75,0,0.16)]">
        {/* Animated Glass Mouse Icon */}
        <div className="relative w-5 h-8 rounded-full border-2 border-amber-700/60 flex items-start justify-center p-1 bg-amber-50/40">
          <div className="w-1.5 h-2 rounded-full bg-amber-600 animate-scroll-wheel shadow-sm" />
        </div>

        {/* Text Prompt */}
        <span className="text-xs font-bold text-stone-800 tracking-tight flex items-center gap-1.5">
          <span>{label}</span>
          <span className="material-symbols-outlined text-[16px] text-amber-600 animate-bounce">
            keyboard_arrow_down
          </span>
        </span>

        {/* Pulsing Concentric Ripple Glow */}
        <span className="absolute -inset-1 rounded-full border border-amber-400/30 animate-pulse-ring pointer-events-none" />
      </div>
    </div>
  );
};

/**
 * Floating Frosted Glass Companion: Shows live scroll progress percentage,
 * and lets user effortlessly glide back to top or next section with smooth inertia.
 */
export const FloatingScrollCompanion: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;

          if (totalHeight > 0) {
            const progress = Math.min(Math.round((currentScroll / totalHeight) * 100), 100);
            setScrollProgress(progress);
          }

          setIsVisible(currentScroll > 280);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  // Circular progress calculation (Circumference of r=18 is 2 * PI * 18 ~= 113)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <aside
      aria-label="کنترل اسکرول نرم و بازگشت به بالا"
      className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 transition-all duration-500 transform animate-in fade-in slide-in-from-bottom-4"
    >
      <button
        onClick={smoothScrollToTop}
        className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/80 hover:bg-white/95 backdrop-blur-2xl border border-white/90 shadow-[0_12px_36px_rgba(24,24,27,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] text-stone-800 transition-all duration-300 hover:scale-105 active:scale-95"
        title="اسکرول نرم به بالای صفحه"
        aria-label="بازگشت به ابتدای صفحه"
      >
        {/* Circular Progress Ring */}
        <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
          <svg className="w-9 h-9 transform -rotate-90">
            {/* Background Track */}
            <circle
              cx="18"
              cy="18"
              r={radius}
              className="text-stone-200/80"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Active Amber Progress */}
            <circle
              cx="18"
              cy="18"
              r={radius}
              className="text-amber-600 transition-all duration-200"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          <span className="material-symbols-outlined text-[17px] text-amber-700 absolute transition-transform group-hover:-translate-y-0.5">
            arrow_upward
          </span>
        </div>

        {/* Scroll Percent & Label */}
        <div className="flex flex-col text-right pl-1">
          <span className="text-[11px] font-black text-stone-900 leading-tight">
            {scrollProgress.toLocaleString('fa-IR')}٪
          </span>
          <span className="text-[9px] text-stone-500 font-bold group-hover:text-amber-700 transition-colors">
            بازگشت به بالا
          </span>
        </div>
      </button>
    </aside>
  );
};
