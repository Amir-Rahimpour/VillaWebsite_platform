import React, { useState } from 'react';
import { Villa, ActivePage } from '../types';
import { CATEGORIES, formatPricePersian } from '../data/villas';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface CatalogViewProps {
  villas: Villa[];
  onSelectVilla: (villa: Villa) => void;
  setActivePage: (page: ActivePage) => void;
  savedVillaIds: Set<string>;
  onToggleSave: (villaId: string) => void;
  onOpenFilterModal: () => void;
  isInsideFrame?: boolean;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  villas,
  onSelectVilla,
  setActivePage,
  savedVillaIds,
  onToggleSave,
  onOpenFilterModal,
  isInsideFrame = false,
}) => {
  useScrollReveal();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [viewLayout, setViewLayout] = useState<'split' | 'grid'>('split');
  const [selectedMapPin, setSelectedMapPin] = useState<string | null>('kordan-lunar-oasis');
  const [isMobileMapOpen, setIsMobileMapOpen] = useState(false);

  // Filter villas based on search and category
  const filteredVillas = villas.filter((villa) => {
    const matchesSearch =
      villa.titleFa.includes(searchQuery) ||
      villa.location.includes(searchQuery) ||
      villa.city.includes(searchQuery);

    if (!matchesSearch) return false;

    if (selectedCategory === 'heated-pool') {
      return villa.amenities.some((a) => a.title.includes('استخر') || a.title.includes('جکوزی'));
    }
    if (selectedCategory === 'forest-cloud') {
      return villa.city === 'کلاردشت' || villa.view.includes('جنگل');
    }
    if (selectedCategory === 'cliff-beach') {
      return villa.city === 'رامسر' || villa.view.includes('دریا');
    }
    if (selectedCategory === 'instant-vip') {
      return villa.instantBook;
    }
    return true;
  });

  // Sort villas
  const sortedVillas = [...filteredVillas].sort((a, b) => {
    if (selectedSort === 'price-asc') return a.pricePerNight - b.pricePerNight;
    if (selectedSort === 'price-desc') return b.pricePerNight - a.pricePerNight;
    if (selectedSort === 'rating') return b.rating - a.rating;
    return b.reviewCount - a.reviewCount; // popular
  });

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-12 py-6 relative">
      {/* Dynamic Ambient Blur Pods */}
      <div className="absolute -top-10 -right-6 w-64 h-64 rounded-full bg-amber-200/40 blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-24 -left-10 w-64 h-64 rounded-full bg-amber-100/35 blur-3xl pointer-events-none -z-10"></div>

      {/* 1. Architectural Header */}
      <div className="flex flex-col gap-2 pt-1 mb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              مجموعه ویلاهای رویایی
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight mt-0.5">
              کاوش و رزرو اقامتگاه
            </h1>
          </div>

          {/* Desktop Layout Switcher */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center p-1 rounded-full bg-white/80 border border-white/90 shadow-sm">
              <button
                onClick={() => setViewLayout('grid')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  viewLayout === 'grid'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">grid_view</span>
                <span>نمای شبکه</span>
              </button>
              <button
                onClick={() => setViewLayout('split')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  viewLayout === 'split'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">map</span>
                <span>کاتالوگ + نقشه</span>
              </button>
            </div>

            <button
              onClick={() => setIsMobileMapOpen((prev) => !prev)}
              aria-label="نمایش نقشه"
              className="sm:hidden w-11 h-11 rounded-xl bg-white/90 backdrop-blur-xl shadow-sm flex items-center justify-center text-stone-700 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">
                {isMobileMapOpen ? 'format_list_bulleted' : 'map'}
              </span>
            </button>
          </div>
        </div>

        {/* Glassmorphic Search Bar Capsule */}
        <div className="w-full mt-2 p-2 sm:p-2.5 rounded-2xl bg-white/90 backdrop-blur-2xl shadow-[0_10px_30px_rgba(24,24,27,0.04)] border border-white flex flex-col gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200/60">
            <span className="material-symbols-outlined text-amber-600 text-[22px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="کردان، نمک‌آبرود، کلاردشت، لواسان، رامسر..."
              className="w-full bg-transparent border-none text-right text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-1 text-stone-400 hover:text-stone-700">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Calendar Selector Capsule */}
            <button
              type="button"
              onClick={() => alert('تقویم انتخاب تاریخ: رزرو برای آخر هفته جاری (پنج‌شنبه الی جمعه) به عنوان پیش‌فرض اعمال شد.')}
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-stone-50/80 hover:bg-stone-100 active:scale-95 transition-all text-right border border-stone-200/50"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600 text-[18px]">calendar_today</span>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-stone-500 leading-none">تاریخ اقامت</span>
                  <span className="text-xs text-stone-800 font-bold mt-0.5">پنج‌شنبه الی جمعه</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[16px] text-stone-400">expand_more</span>
            </button>

            {/* Guests & Advanced Filter Button */}
            <button
              type="button"
              onClick={onOpenFilterModal}
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-stone-50/80 hover:bg-stone-100 active:scale-95 transition-all text-right border border-stone-200/50"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600 text-[18px]">tune</span>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-stone-500 leading-none">فیلترهای خاص</span>
                  <span className="text-xs text-stone-800 font-bold mt-0.5">۳ فیلتر فعال</span>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Fast Filter Badges / Glass Chips Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 mb-4">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap active:scale-95 transition-all shadow-sm ${
                isActive
                  ? 'bg-amber-600 text-white shadow-[0_4px_14px_rgba(141,75,0,0.25)] font-bold'
                  : 'bg-white/80 backdrop-blur-xl text-stone-700 hover:text-amber-800 border border-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
              <span>{cat.title}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold mr-0.5 ${
                  isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {cat.count.toLocaleString('fa-IR')}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Results Status Bar & Sort Selection */}
      <div className="flex items-center justify-between px-1 mb-6 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse"></span>
          <span className="text-xs sm:text-sm font-bold text-stone-900">
            {sortedVillas.length.toLocaleString('fa-IR')} عمارت آماده تحویل
          </span>
          <span className="text-xs text-stone-500">در این آخر هفته</span>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 hidden sm:inline">مرتب‌سازی:</span>
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as any)}
              className="appearance-none bg-white/90 text-stone-800 font-semibold text-xs py-2 pr-4 pl-8 rounded-full border border-stone-200/70 shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              <option value="popular">محبوب‌ترین و برگزیده مهمانان</option>
              <option value="rating">بالاترین امتیاز رضایت</option>
              <option value="price-desc">گران‌ترین و مجلل‌ترین</option>
              <option value="price-asc">مناسب‌ترین نرخ روزانه</option>
            </select>
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none text-[16px]">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* 4. Main Layout Grid (Cards List + Live Map) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Villas Cards Column */}
        <div className={isInsideFrame ? 'flex flex-col gap-6' : viewLayout === 'split' ? 'xl:col-span-7 flex flex-col gap-6' : 'xl:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
          {sortedVillas.map((villa) => {
            const isSaved = savedVillaIds.has(villa.id);
            const isDiscounted = villa.originalPrice && villa.originalPrice > villa.pricePerNight;

            return (
              <article
                key={villa.id}
                className="group relative flex flex-col rounded-3xl glass-panel hover:border-amber-300 transition-all duration-500 overflow-hidden scroll-reveal"
              >
                {/* Media Image Box */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-stone-200">
                  <img
                    src={villa.heroImage}
                    alt={villa.titleFa}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-black/30 pointer-events-none"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {villa.badges[0] && (
                        <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur-md text-amber-800 text-[11px] font-bold shadow-sm flex items-center gap-1 border border-white/60">
                          <span className="material-symbols-outlined text-[14px] text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                            hotel_class
                          </span>
                          {villa.badges[0]}
                        </span>
                      )}
                      {villa.instantBook && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[11px] font-bold shadow-sm flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px]">bolt</span>
                          آنی
                        </span>
                      )}
                      {isDiscounted && (
                        <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-[11px] font-bold shadow-sm">
                          ۱۵٪ تخفیف ویژه
                        </span>
                      )}
                    </div>

                    {/* Bookmark Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(villa.id);
                      }}
                      className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-rose-600 active:scale-90 transition-all shadow-md"
                    >
                      <span
                        className={`material-symbols-outlined text-[20px] ${isSaved ? 'text-rose-600' : ''}`}
                        style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        {isSaved ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>
                  </div>

                  {/* Floating Bottom Specs Pill over Image */}
                  <div className="absolute bottom-3 inset-x-3.5 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3 text-[11px] font-medium bg-stone-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">square_foot</span>
                        {villa.areaSqM.toLocaleString('fa-IR')} متر
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/40"></span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">bed</span>
                        {villa.bedrooms.toLocaleString('fa-IR')} خواب مستر
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/40"></span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">pool</span>
                        استخر آبگرم
                      </span>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-xs font-bold shadow-sm">
                      <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span>{villa.rating.toFixed(2)}</span>
                      <span className="text-[10px] text-stone-500 font-normal">({villa.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Details Bottom Container */}
                <div className="p-4 sm:p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col text-right">
                      <h2
                        onClick={() => {
                          onSelectVilla(villa);
                          setActivePage('details');
                        }}
                        className="text-base sm:text-lg font-bold text-stone-900 leading-tight hover:text-amber-700 cursor-pointer transition-colors"
                      >
                        {villa.titleFa}
                      </h2>
                      <div className="flex items-center gap-1 text-stone-600 text-xs mt-1">
                        <span className="material-symbols-outlined text-[16px] text-amber-600">location_on</span>
                        <span>{villa.location}</span>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-2xl bg-amber-100/80 text-amber-800 flex-shrink-0 flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">villa</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {villa.description}
                  </p>

                  <div className="w-full h-px bg-stone-200/70 my-0.5"></div>

                  {/* Price & Booking CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col text-right">
                      {isDiscounted && (
                        <span className="text-[10px] text-stone-400 line-through">
                          {formatPricePersian(villa.originalPrice!)} تومان
                        </span>
                      )}
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-lg sm:text-xl font-black text-amber-700">
                          {formatPricePersian(villa.pricePerNight)}
                        </span>
                        <span className="text-[11px] text-stone-500 font-semibold">تومان / شب</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectVilla(villa);
                        setActivePage('details');
                      }}
                      className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:brightness-105 text-white text-xs font-bold shadow-[0_6px_20px_rgba(141,75,0,0.3)] active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <span>مشاهده و رزرو</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* 5. Sticky Live Interactive Map (Split View on Desktop or Expanded on Mobile) */}
        {((!isInsideFrame && viewLayout === 'split') || isMobileMapOpen) && (
          <div className={`xl:col-span-5 sticky top-28 flex flex-col gap-6 ${isMobileMapOpen ? 'fixed inset-0 z-50 bg-white p-4 sm:p-6' : ''}`}>
            {isMobileMapOpen && (
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 sm:hidden">
                <span className="font-bold text-sm">نقشه زنده اقامتگاه‌های لوکس</span>
                <button
                  onClick={() => setIsMobileMapOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            )}

            <div className="relative w-full h-[580px] rounded-3xl overflow-hidden shadow-[0_16px_40px_-10px_rgba(0,0,0,0.08)] bg-stone-100 border border-white/80">
              {/* Light Map Photographic Canvas */}
              <div
                className="w-full h-full bg-cover bg-center filter saturate-105 brightness-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAkqh2V8YKBmVR-UtoChkQeyv9h6QpgjdTRYN_xtWq5L7ydu_I_mp2M2oNv3UHpIUeomYCBhitGxWxQ4Mlj4nFVozne8eJLAm3IWqM2MJjbU28mFoh02ws4y95MPndz4RXmmkw3bD3G97qmAp_3jFmZ0FSuFwHFIJXVrIu-MvRcsYYmmo9Na8EtjmohCxSngFI4-5Sd6_FgFvIXE-j12EUWVQ2DCFafk5VgfLRcYRsRdGgrO9DsIrVs')`,
                }}
              ></div>

              <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] pointer-events-none"></div>

              {/* Map Floating Header Pill */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-white shadow-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                  <span className="text-xs text-stone-800 font-semibold">جستجو همگام با جابجایی نقشه</span>
                </div>

                <div className="pointer-events-auto flex items-center gap-1 bg-white/95 backdrop-blur-xl p-1 rounded-full shadow-md border border-white">
                  <button
                    onClick={() => alert('بزرگ‌نمایی نقشه')}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[17px]">add</span>
                  </button>
                  <button
                    onClick={() => alert('کوچک‌نمایی نقشه')}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[17px]">remove</span>
                  </button>
                </div>
              </div>

              {/* Interactive Price Markers */}
              {villas.map((villa) => {
                const isSelected = selectedMapPin === villa.id;

                return (
                  <div
                    key={villa.id}
                    onClick={() => setSelectedMapPin(villa.id)}
                    style={{
                      top: `${villa.coordinates.yPercent}%`,
                      right: `${villa.coordinates.xPercent}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  >
                    <div
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1 shadow-md hover:scale-110 ${
                        isSelected
                          ? 'bg-amber-600 text-white border-amber-400 shadow-[0_6px_20px_rgba(217,119,6,0.45)] scale-105'
                          : 'bg-white/95 text-stone-900 border-white hover:bg-amber-600 hover:text-white'
                      }`}
                    >
                      <span>{villa.mapPriceShort}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-amber-500'}`}></span>
                    </div>

                    {/* Popover Preview Card */}
                    {isSelected && (
                      <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 flex flex-col w-60 p-2.5 rounded-2xl bg-white/95 backdrop-blur-2xl shadow-xl border border-white z-30">
                        <div className="h-28 w-full rounded-xl overflow-hidden mb-2">
                          <img
                            src={villa.heroImage}
                            alt={villa.titleFa}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-bold text-stone-900 truncate">{villa.titleFa}</span>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[11px] text-amber-800 font-extrabold">
                            {formatPricePersian(villa.pricePerNight)} ت/شب
                          </span>
                          <button
                            onClick={() => {
                              onSelectVilla(villa);
                              setActivePage('details');
                            }}
                            className="text-[10px] text-white bg-amber-600 px-2 py-0.5 rounded-full font-bold"
                          >
                            مشاهده
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Bottom Floating Region Summary Box inside Map */}
              <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-2xl border border-white shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">explore</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-stone-900">ناحیه کردان شمالی و برغان</span>
                    <span className="text-[10px] text-stone-500">میانگین قیمت: ۱۶,۸۰۰,۰۰۰ تومان</span>
                  </div>
                </div>

                <button
                  onClick={() => alert('منطقه ییلاقی کردان با بیش از ۴۰ عمارت سوپرلوکس، نزدیک‌ترین پناهگاه طبیعی به پایتخت با آب و هوای کوهستانی پاکیزه است.')}
                  className="px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-all"
                >
                  جزئیات منطقه
                </button>
              </div>
            </div>

            {/* VIP Concierge Card in Sidebar */}
            <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_12px_36px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[22px]">support_agent</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-stone-900">سرویس تشریفات و باتلر اختصاصی</span>
                  <span className="text-[11px] text-amber-700 font-semibold">۲۴ ساعته در تمامی مراحل اقامت</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                با رزرو هریک از ویلاهای نشان طلایی ویلاجا، ترانسفر فرودگاهی لوکس، سرآشپز بین‌المللی و هتلینگ اختصاصی را دریافت نمایید.
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('مشاور VIP ویلاجا جهت هماهنگی با شما ارتباط خواهد گرفت.')}
                  className="flex-1 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-sm"
                >
                  درخواست مشاوره VIP
                </button>
                <a
                  href="tel:02191000000"
                  className="px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  تماس
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Pill on Mobile: Live Map Explorer */}
      <div className={`${isInsideFrame ? 'absolute bottom-20 inset-x-0' : 'fixed bottom-20 inset-x-0 md:hidden'} flex justify-center z-40 pointer-events-none`}>
        <button
          onClick={() => setIsMobileMapOpen((prev) => !prev)}
          className="pointer-events-auto flex items-center gap-2 px-5 py-3 rounded-full bg-stone-900/90 text-white backdrop-blur-2xl shadow-[0_12px_32px_rgba(24,24,27,0.3)] active:scale-95 transition-all hover:bg-stone-900"
        >
          <span className="material-symbols-outlined text-amber-400 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            map
          </span>
          <span className="text-xs font-bold">
            {isMobileMapOpen ? 'نمایش لیست اقامتگاه‌ها' : 'نقشه زنده اقامتگاه‌ها'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        </button>
      </div>
    </div>
  );
};
