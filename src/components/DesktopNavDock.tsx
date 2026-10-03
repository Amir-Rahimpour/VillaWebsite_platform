import React from 'react';
import { ActivePage } from '../types';

interface DesktopNavDockProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  onOpenNotifications?: () => void;
}

export const DesktopNavDock: React.FC<DesktopNavDockProps> = ({
  activePage,
  setActivePage,
  onOpenNotifications,
}) => {
  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center py-6 px-3 glass-pill">
      <div 
        onClick={() => setActivePage('home')}
        className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center mb-6 shadow-[0_8px_20px_rgba(217,119,6,0.35)] cursor-pointer hover:scale-105 transition-transform"
        title="صفحه اصلی"
      >
        <span className="material-symbols-outlined text-white text-[20px]">holiday_village</span>
      </div>

      <nav className="flex flex-col items-center gap-3">
        <button
          onClick={() => setActivePage('catalog')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
            activePage === 'catalog'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 hover:text-amber-700 hover:bg-white/80'
          }`}
          title="کاتالوگ و جستجوی عمارت‌ها"
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>

        <button
          onClick={() => setActivePage('details')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
            activePage === 'details'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 hover:text-amber-700 hover:bg-white/80'
          }`}
          title="جزئیات عمارت و رزرو"
        >
          <span className="material-symbols-outlined text-[20px]">villa</span>
        </button>

        <button
          onClick={() => setActivePage('bookings')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
            activePage === 'bookings'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 hover:text-amber-700 hover:bg-white/80'
          }`}
          title="رزروها و فاکتورها"
        >
          <span className="material-symbols-outlined text-[20px]">credit_card</span>
        </button>

        <button
          onClick={() => setActivePage('saved')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
            activePage === 'saved'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 hover:text-amber-700 hover:bg-white/80'
          }`}
          title="نشان‌شده‌ها"
        >
          <span className="material-symbols-outlined text-[20px]">bookmark</span>
        </button>

        <div className="w-6 h-[1px] bg-stone-300/60 my-1"></div>

        <button
          onClick={() => setActivePage('profile')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
            activePage === 'profile'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 hover:text-stone-900 hover:bg-white/80'
          }`}
          title="پنل کاربری و پشتیبانی"
        >
          <span className="material-symbols-outlined text-[20px]">dashboard</span>
        </button>

        <button
          onClick={onOpenNotifications}
          className="w-11 h-11 rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white/80 transition-all duration-300 relative"
          title="اعلان‌ها"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
        </button>

        <button
          onClick={() => alert('پوسته روز روشن فعال است.')}
          className="w-11 h-11 rounded-full flex items-center justify-center text-stone-600 hover:text-amber-700 hover:bg-white/80 transition-all duration-300"
          title="پوسته نوری"
        >
          <span className="material-symbols-outlined text-[20px]">light_mode</span>
        </button>
      </nav>

      <div className="mt-6 pt-4 border-t border-stone-200/60">
        <button 
          onClick={() => setActivePage('profile')}
          className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 border border-amber-300/40 flex items-center justify-center shadow-inner hover:scale-105 transition-transform"
          title="پروفایل"
        >
          <span className="material-symbols-outlined text-[18px]">person</span>
        </button>
      </div>
    </aside>
  );
};
