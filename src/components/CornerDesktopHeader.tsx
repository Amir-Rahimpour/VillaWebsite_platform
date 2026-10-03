import React from 'react';
import { ActivePage, ViewportMode } from '../types';

interface CornerDesktopHeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  onOpenNotifications?: () => void;
  onOpenShowcase?: () => void;
}

export const CornerDesktopHeader: React.FC<CornerDesktopHeaderProps> = ({
  activePage,
  setActivePage,
  viewportMode,
  setViewportMode,
  onOpenNotifications,
  onOpenShowcase,
}) => {
  return (
    <>
      {/* Right Corner: Floating Brand & Navigation Capsule */}
      <div className="fixed top-5 right-6 lg:right-10 z-40 flex items-center gap-3">
        <div className="glass-pill px-4 py-2 rounded-full flex items-center gap-4 transition-all hover:bg-white/95">
          {/* Brand Logo */}
          <div
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center shadow-[0_4px_14px_rgba(217,119,6,0.3)] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-white text-[19px]">castle</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-base font-black tracking-tight text-stone-900 leading-tight">ویلاجا</span>
              <span className="text-[8px] text-amber-700 tracking-widest font-extrabold uppercase opacity-85">LUXURY STAY</span>
            </div>
          </div>

          <div className="w-px h-5 bg-stone-200/80"></div>

          {/* Quick Nav Links */}
          <nav className="flex items-center gap-3 text-xs font-semibold">
            <button
              onClick={() => setActivePage('catalog')}
              className={`transition-colors px-2.5 py-1 rounded-full ${
                activePage === 'catalog'
                  ? 'bg-amber-100 text-amber-900 font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              کاتالوگ ویلاها
            </button>
            <button
              onClick={() => setActivePage('details')}
              className={`transition-colors px-2.5 py-1 rounded-full ${
                activePage === 'details'
                  ? 'bg-amber-100 text-amber-900 font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              عمارت‌های ویژه
            </button>
            <button
              onClick={() => setActivePage('bookings')}
              className={`transition-colors px-2.5 py-1 rounded-full ${
                activePage === 'bookings'
                  ? 'bg-amber-100 text-amber-900 font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              پیگیری رزروها
            </button>
          </nav>
        </div>
      </div>

      {/* Left Corner: Actions & Mobile Frame Switcher */}
      <div className="fixed top-5 left-6 lg:left-10 z-40 flex items-center gap-2.5">
        <div className="glass-pill p-1.5 rounded-full flex items-center gap-2">
          {/* Dedicated Button to enter Mobile Frame Mockup */}
          <button
            onClick={() => setViewportMode('mobile-mockup')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white shadow-sm transition-all active:scale-95"
            title="مشاهده در قاب موبایل اختصاصی"
          >
            <span className="material-symbols-outlined text-[16px] text-amber-400">smartphone</span>
            <span>قاب موبایل</span>
          </button>

          {/* Social & GitHub Showcase Button */}
          {onOpenShowcase && (
            <button
              onClick={onOpenShowcase}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-600 to-rose-600 hover:brightness-110 text-white shadow-sm transition-all active:scale-95"
              title="انتشار در اینستاگرام و سورس‌کد گیت‌هاب"
            >
              <span className="material-symbols-outlined text-[15px]">share</span>
              <span className="hidden sm:inline">انتشار و گیت‌هاب</span>
            </button>
          )}

          <div className="w-px h-5 bg-stone-200/80"></div>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            aria-label="اعلان‌ها"
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[19px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-600 ring-2 ring-white animate-pulse"></span>
          </button>

          {/* Profile */}
          <button
            onClick={() => setActivePage('profile')}
            aria-label="پروفایل کاربری"
            className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </>
  );
};
