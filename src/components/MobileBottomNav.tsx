import React from 'react';
import { ActivePage } from '../types';

interface MobileBottomNavProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  isInsideFrame?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activePage,
  setActivePage,
  isInsideFrame = false,
}) => {
  const navItems: { page: ActivePage; label: string; icon: string }[] = [
    { page: 'home', label: 'خانه', icon: 'cottage' },
    { page: 'catalog', label: 'کاتالوگ', icon: 'manage_search' },
    { page: 'details', label: 'ویلا', icon: 'villa' },
    { page: 'bookings', label: 'رزروها', icon: 'calendar_month' },
    { page: 'saved', label: 'نشان‌ها', icon: 'bookmark_border' },
    { page: 'profile', label: 'پروفایل', icon: 'account_circle' },
  ];

  return (
    <nav
      className={`${
        isInsideFrame
          ? 'absolute bottom-2 inset-x-0 z-40'
          : 'fixed bottom-0 inset-x-0 z-50 pb-safe md:hidden'
      } pointer-events-none`}
    >
      <div className="mx-auto px-4 pb-2 pt-1 max-w-md pointer-events-auto">
        <div className="h-16 rounded-full bg-white/90 backdrop-blur-2xl border border-white/90 shadow-[0_8px_32px_rgba(24,24,27,0.1),0_2px_12px_rgba(217,119,6,0.06)] flex items-center justify-around px-2">
          {navItems.map((item) => {
            const isActive = activePage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => setActivePage(item.page)}
                className={`flex flex-col items-center justify-center min-w-[42px] min-h-[42px] px-1.5 py-1 transition-all duration-200 ${
                  isActive
                    ? 'text-amber-700 font-bold scale-105'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <span 
                  className="material-symbols-outlined text-[20px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span className="text-[10px] mt-0.5 leading-none font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
