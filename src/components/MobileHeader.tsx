import React from 'react';
import { ActivePage } from '../types';

interface MobileHeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  villaTitle?: string;
  onOpenNotifications?: () => void;
  onBack?: () => void;
  isInsideFrame?: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  activePage,
  setActivePage,
  villaTitle = 'Villa Details',
  onOpenNotifications,
  onBack,
  isInsideFrame = false,
}) => {
  const isDetails = activePage === 'details';

  return (
    <header
      className={`${
        isInsideFrame ? 'absolute top-10 inset-x-0' : 'fixed top-0 inset-x-0'
      } z-40 h-16 px-4 bg-white/85 backdrop-blur-2xl border-b border-white/70 shadow-[0_1px_8px_rgba(0,0,0,0.03)] flex items-center justify-between transition-all`}
    >
      {isDetails ? (
        /* Details View Header (matches Screenshot 7) */
        <div className="flex items-center gap-2">
          <button
            onClick={onBack || (() => setActivePage('catalog'))}
            aria-label="بازگشت"
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center text-stone-800 hover:text-amber-800 transition-colors bg-white/70 backdrop-blur-md shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_forward_ios</span>
          </button>
          <h1 className="text-sm font-bold text-stone-900 truncate max-w-[210px]">
            {villaTitle}
          </h1>
        </div>
      ) : (
        /* Standard Mobile Header (matches Screenshot 1 & 5) */
        <div
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="flex flex-col text-right">
            <span className="text-xl font-black text-amber-800 tracking-tight leading-none">
              ویلاجا
            </span>
            <span className="text-[9px] text-stone-500 font-bold tracking-widest uppercase opacity-75 mt-0.5">
              LUXURY STAY
            </span>
          </div>
        </div>
      )}

      {/* Left Action Buttons */}
      <div className="flex items-center gap-2">
        {!isDetails && (
          <button
            onClick={onOpenNotifications}
            aria-label="اعلان‌ها"
            className="relative w-10 h-10 min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center text-stone-700 bg-white/80 backdrop-blur-md shadow-sm active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[21px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-600 ring-2 ring-white"></span>
          </button>
        )}

        <button
          onClick={() => setActivePage('profile')}
          aria-label="پروفایل"
          className="w-8 h-8 rounded-full bg-amber-700 text-white flex items-center justify-center shadow-[0_2px_8px_rgba(141,75,0,0.25)] active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">person</span>
        </button>
      </div>
    </header>
  );
};
