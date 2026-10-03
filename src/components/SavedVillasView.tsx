import React from 'react';
import { Villa } from '../types';
import { formatPricePersian } from '../data/villas';

interface SavedVillasViewProps {
  villas: Villa[];
  savedVillaIds: Set<string>;
  onSelectVilla: (villa: Villa) => void;
  onToggleSave: (villaId: string) => void;
  onExplore: () => void;
}

export const SavedVillasView: React.FC<SavedVillasViewProps> = ({
  villas,
  savedVillaIds,
  onSelectVilla,
  onToggleSave,
  onExplore,
}) => {
  const savedVillas = villas.filter((v) => savedVillaIds.has(v.id));

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8 pb-32">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900">اقامتگاه‌های نشان‌شده</h1>
          <p className="text-xs text-stone-500 mt-1">ویلاهای برگزیده برای برنامه‌ریزی سفرهای آینده</p>
        </div>
      </div>

      {savedVillas.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 rounded-3xl bg-white/80 backdrop-blur-xl border border-white text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[32px]">favorite_border</span>
          </div>
          <h3 className="text-base font-bold text-stone-900">هنوز اقامتگاهی را نشان نکرده‌اید</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-xs">
            با کلیک بر روی آیکون قلب روی هر ویلا، آن را به لیست برگزیده‌های خود بیفزایید.
          </p>
          <button
            onClick={onExplore}
            className="mt-5 px-6 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition-all"
          >
            مشاهده عمارت‌ها
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedVillas.map((villa) => (
            <div
              key={villa.id}
              className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-sm overflow-hidden flex flex-col group"
            >
              <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden">
                <img
                  src={villa.heroImage}
                  alt={villa.titleFa}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => onToggleSave(villa.id)}
                  className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-rose-600 shadow"
                >
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    favorite
                  </span>
                </button>
              </div>

              <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
                <div>
                  <h3
                    onClick={() => onSelectVilla(villa)}
                    className="text-sm font-bold text-stone-900 hover:text-amber-700 cursor-pointer"
                  >
                    {villa.titleFa}
                  </h3>
                  <span className="text-[11px] text-stone-500">{villa.location}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <span className="text-xs font-black text-amber-800">
                    {formatPricePersian(villa.pricePerNight)} ت/شب
                  </span>
                  <button
                    onClick={() => onSelectVilla(villa)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold"
                  >
                    رزرو
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
