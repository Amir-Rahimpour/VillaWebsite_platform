import React from 'react';
import { ActivePage, ViewportMode } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  onOpenNotifications?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  viewportMode,
  setViewportMode,
  onOpenNotifications,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/75 backdrop-blur-2xl border-b border-white/70 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div 
          onClick={() => setActivePage('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center shadow-[0_6px_20px_rgba(217,119,6,0.3)] group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-white text-[22px]">castle</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-xl md:text-2xl font-black tracking-tight text-stone-900 leading-tight">ویلاجا</span>
            <span className="text-[9px] md:text-[10px] text-amber-700 tracking-widest font-bold uppercase opacity-85">LUXURY STAY</span>
          </div>
        </div>

        {/* Center: Frosted Glass Capsule (Desktop Only) */}
        <div className="hidden lg:flex items-center bg-white/85 backdrop-blur-xl rounded-full p-1.5 border border-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <button 
            onClick={() => setActivePage('catalog')}
            className="flex items-center px-4 py-1.5 gap-2 text-stone-800 hover:bg-stone-50/80 rounded-full transition-colors text-right"
          >
            <span className="material-symbols-outlined text-amber-600 text-[18px]">location_on</span>
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-stone-500 font-medium">مقصد</span>
              <span className="text-[12px] text-stone-900 font-bold">کردان، نمک‌آبرود...</span>
            </div>
          </button>
          
          <div className="w-[1px] h-6 bg-stone-200"></div>

          <button 
            onClick={() => setActivePage('catalog')}
            className="flex items-center px-4 py-1.5 gap-2 text-stone-800 hover:bg-stone-50/80 rounded-full transition-colors text-right"
          >
            <span className="material-symbols-outlined text-amber-600 text-[18px]">house</span>
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-stone-500 font-medium">نوع ویلا</span>
              <span className="text-[12px] text-stone-900 font-bold">عمارت استخردار</span>
            </div>
          </button>

          <div className="w-[1px] h-6 bg-stone-200"></div>

          <button 
            onClick={() => setActivePage('catalog')}
            className="flex items-center px-4 py-1.5 gap-2 text-stone-800 hover:bg-stone-50/80 rounded-full transition-colors text-right"
          >
            <span className="material-symbols-outlined text-amber-600 text-[18px]">calendar_month</span>
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-stone-500 font-medium">بازه اقامت</span>
              <span className="text-[12px] text-stone-900 font-bold">آخر هفته جاری</span>
            </div>
          </button>

          <button 
            onClick={() => setActivePage('catalog')}
            aria-label="جستجو"
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center mr-2 hover:scale-105 transition-all shadow-[0_4px_16px_rgba(217,119,6,0.3)]"
          >
            <span className="material-symbols-outlined text-[19px]">search</span>
          </button>
        </div>

        {/* Left Side Actions & Viewport Controls */}
        <div className="flex items-center gap-2.5 md:gap-4 shrink-0">
          {/* Navigation Links for Desktop */}
          <nav className="hidden xl:flex items-center gap-5 text-[13px] font-medium">
            <button 
              onClick={() => setActivePage('catalog')}
              className={`transition-colors py-1 ${activePage === 'catalog' ? 'text-amber-700 font-bold border-b-2 border-amber-600' : 'text-stone-600 hover:text-stone-900'}`}
            >
              کاتالوگ ویلاها
            </button>
            <button 
              onClick={() => setActivePage('details')}
              className={`transition-colors py-1 ${activePage === 'details' ? 'text-amber-700 font-bold border-b-2 border-amber-600' : 'text-stone-600 hover:text-stone-900'}`}
            >
              عمارت‌های ویژه
            </button>
            <button 
              onClick={() => setActivePage('bookings')}
              className={`transition-colors py-1 ${activePage === 'bookings' ? 'text-amber-700 font-bold border-b-2 border-amber-600' : 'text-stone-600 hover:text-stone-900'}`}
            >
              پیگیری رزروها
            </button>
          </nav>

          {/* Viewport Frame Toggle Switch (Lets user preview mobile frame vs full desktop) */}
          <div className="hidden sm:flex items-center bg-stone-100/90 rounded-full p-1 border border-stone-200/70 shadow-inner">
            <button
              onClick={() => setViewportMode('responsive')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                viewportMode === 'responsive'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="نمایش خودکار بر اساس ابعاد نمایشگر"
            >
              ریسپانسیو
            </button>
            <button
              onClick={() => setViewportMode('mobile-mockup')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 ${
                viewportMode === 'mobile-mockup'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="شبیه‌سازی قاب موبایل ویلاجا"
            >
              <span className="material-symbols-outlined text-[14px]">smartphone</span>
              <span>قاب موبایل</span>
            </button>
          </div>

          {/* Notifications Button */}
          <button 
            onClick={onOpenNotifications}
            aria-label="اعلان‌ها"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-stone-700 bg-white/80 hover:bg-white border border-white/90 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white animate-pulse"></span>
          </button>

          {/* Profile Hub Avatar */}
          <button 
            onClick={() => setActivePage('profile')}
            aria-label="پروفایل کاربری"
            className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 flex items-center justify-center shadow-sm hover:scale-105 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
