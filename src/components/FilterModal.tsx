import React, { useState } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: { minPrice: number; maxPrice: number; amenities: string[] }) => void;
  totalResultsCount: number;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  totalResultsCount,
}) => {
  const [minPrice, setMinPrice] = useState(10000000);
  const [maxPrice, setMaxPrice] = useState(40000000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'استخر آبگرم',
    'چشم‌انداز پانوراما',
  ]);

  if (!isOpen) return null;

  const toggleAmenity = (name: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const handleApply = () => {
    onApply({ minPrice, maxPrice, amenities: selectedAmenities });
    onClose();
  };

  const handleReset = () => {
    setMinPrice(10000000);
    setMaxPrice(40000000);
    setSelectedAmenities([]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all">
      <div 
        className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-white/95 backdrop-blur-2xl p-6 flex flex-col gap-5 shadow-2xl border border-white max-h-[90vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar on mobile */}
        <div className="w-12 h-1.5 rounded-full bg-stone-300 self-center sm:hidden"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600 text-[24px]">tune</span>
            <h3 className="text-lg font-bold text-stone-900">فیلترهای هوشمند و لوکس</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Price Range Slider */}
        <div className="flex flex-col gap-3 bg-stone-50/80 p-4 rounded-2xl border border-stone-200/60">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-stone-700">بازه قیمت هر شب:</span>
            <span className="text-amber-800">
              {minPrice.toLocaleString('fa-IR')} تا {maxPrice.toLocaleString('fa-IR')} تومان
            </span>
          </div>

          <input
            type="range"
            min="5000000"
            max="45000000"
            step="1000000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer h-2 bg-stone-200 rounded-lg"
          />

          <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
            <span>از ۵ میلیون</span>
            <span>تا ۵۰+ میلیون تومان</span>
          </div>
        </div>

        {/* Amenities Selection */}
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-bold text-stone-800">امکانات رفاهی شاخص:</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'استخر آبگرم', label: 'استخر چهارفصل آبگرم', icon: 'pool' },
              { id: 'چشم‌انداز پانوراما', label: 'چشم‌انداز پانوراما', icon: 'landscape' },
              { id: 'سینمای اختصاصی', label: 'سینمای اختصاصی 4K', icon: 'theaters' },
              { id: 'جکوزی معلق', label: 'جکوزی معلق و سونا', icon: 'hot_tub' },
              { id: 'هلی‌پد', label: 'هلی‌پد اختصاصی', icon: 'flight' },
              { id: 'تنیس', label: 'زمین تنیس / پدل', icon: 'sports_tennis' },
            ].map((amenity) => {
              const isChecked = selectedAmenities.includes(amenity.id);
              return (
                <label
                  key={amenity.id}
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-amber-50/80 border-amber-300 text-stone-900 shadow-sm'
                      : 'bg-stone-50/70 border-stone-200/70 text-stone-700 hover:bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-0 accent-amber-600"
                  />
                  <span className="text-xs font-semibold">{amenity.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleApply}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-500 text-white font-bold text-sm shadow-md active:scale-95 transition-all text-center"
          >
            اعمال فیلترها ({totalResultsCount} ویلا)
          </button>
          <button
            onClick={handleReset}
            className="px-5 py-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs active:scale-95 transition-all"
          >
            پاک‌سازی
          </button>
        </div>
      </div>
    </div>
  );
};
