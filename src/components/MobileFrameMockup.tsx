import React from 'react';
import { ActivePage, ViewportMode, Villa } from '../types';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { GlassBackground } from './GlassBackground';

interface MobileFrameMockupProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  activeVilla: Villa;
  setViewportMode: (mode: ViewportMode) => void;
  onOpenNotifications?: () => void;
  onOpenShowcase?: () => void;
  children: React.ReactNode;
}

export const MobileFrameMockup: React.FC<MobileFrameMockupProps> = ({
  activePage,
  setActivePage,
  activeVilla,
  setViewportMode,
  onOpenNotifications,
  onOpenShowcase,
  children,
}) => {
  return (
    <div className="relative z-20 flex-1 min-h-screen flex flex-col items-center justify-center p-3 sm:p-8 bg-stone-900/10 backdrop-blur-md">
      {/* Floating Corner Indicator on Desktop Screen */}
      <div className="fixed top-5 left-6 z-50 flex items-center gap-2">
        <div className="bg-stone-900/90 text-white backdrop-blur-2xl px-4 py-2 rounded-full border border-stone-700 shadow-xl flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs font-bold">قاب موبایل اختصاصی</span>
          </div>

          <div className="w-px h-4 bg-stone-700"></div>

          <button
            onClick={() => setViewportMode('responsive')}
            className="flex items-center gap-1 text-xs text-amber-300 hover:text-white font-bold transition-colors"
            title="بازگشت به نمای تمام‌صفحه ریسپانسیو"
          >
            <span className="material-symbols-outlined text-[16px]">fullscreen</span>
            <span>نمای ریسپانسیو</span>
          </button>

          {onOpenShowcase && (
            <>
              <div className="w-px h-4 bg-stone-700"></div>
              <button
                onClick={onOpenShowcase}
                className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-bold transition-colors"
                title="اشتراک در اینستاگرام و گیت‌هاب"
              >
                <span className="material-symbols-outlined text-[15px]">share</span>
                <span>انتشار</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Flagship Mobile Chassis (Designed specifically for mobile view) */}
      <div className="relative w-full max-w-[420px] h-[870px] rounded-[52px] bg-gradient-to-b from-[#2B2927] to-[#1A1816] p-3.5 shadow-[0_30px_90px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-black flex flex-col my-auto transition-transform">
        {/* Physical Side Buttons simulation */}
        <div className="absolute -left-[3px] top-28 w-[3px] h-12 bg-stone-600 rounded-l-sm"></div>
        <div className="absolute -left-[3px] top-44 w-[3px] h-12 bg-stone-600 rounded-l-sm"></div>
        <div className="absolute -right-[3px] top-36 w-[3px] h-16 bg-stone-600 rounded-r-sm"></div>

        {/* Screen Bezel & Dynamic Island Area with Frosted Glass Canvas */}
        <div className="relative w-full h-full rounded-[42px] overflow-hidden flex flex-col shadow-inner select-none">
          <GlassBackground isInsideFrame={true} />
          {/* Top Status Bar (09:41, Dynamic Island, Battery, WiFi) */}
          <div className="h-10 w-full px-6 flex items-center justify-between z-50 text-[12px] font-bold text-stone-900 bg-white/70 backdrop-blur-md shrink-0">
            {/* Clock */}
            <span className="tracking-tight font-mono font-black">۰۹:۴۱</span>

            {/* Dynamic Island Notch */}
            <div className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-3 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-900 ring-1 ring-stone-800"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#111] ring-1 ring-blue-900/30"></div>
            </div>

            {/* Icons: WiFi, Signal, Battery */}
            <div className="flex items-center gap-1.5 text-stone-900">
              <span className="material-symbols-outlined text-[15px]">signal_cellular_alt</span>
              <span className="material-symbols-outlined text-[15px]">wifi</span>
              <div className="w-5 h-2.5 rounded-sm border border-stone-800 p-0.5 flex items-center">
                <div className="h-full w-3.5 bg-stone-900 rounded-2xs"></div>
              </div>
            </div>
          </div>

          {/* Internal Mobile Top Header */}
          <MobileHeader
            activePage={activePage}
            setActivePage={setActivePage}
            villaTitle={activeVilla.titleFa}
            onOpenNotifications={onOpenNotifications}
            onBack={() => setActivePage('catalog')}
            isInsideFrame={true}
          />

          {/* Scrollable Mobile Viewport Content */}
          <div className="flex-1 w-full overflow-y-auto no-scrollbar scroll-smooth relative z-10 pt-16 pb-24">
            {children}
          </div>

          {/* Internal Mobile Bottom Navigation Bar */}
          <MobileBottomNav
            activePage={activePage}
            setActivePage={setActivePage}
            isInsideFrame={true}
          />

          {/* Bottom iOS Home Indicator Pill */}
          <div className="absolute bottom-1 inset-x-0 mx-auto w-32 h-1 bg-stone-900/40 rounded-full z-50 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};
