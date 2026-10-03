import React, { useState } from 'react';
import { Villa, ActivePage } from '../types';
import { CATEGORIES } from '../data/villas';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ScrollDownHeroIndicator } from './ScrollExperience';

interface HomeViewProps {
  villas: Villa[];
  onSelectVilla: (villa: Villa) => void;
  setActivePage: (page: ActivePage) => void;
  savedVillaIds: Set<string>;
  onToggleSave: (villaId: string) => void;
  onNotify?: (title: string, description?: string) => void;
  onOpenShowcase?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  villas,
  onSelectVilla,
  setActivePage,
  savedVillaIds,
  onToggleSave,
  onNotify,
  onOpenShowcase,
}) => {
  useScrollReveal();

  const [stayMode, setStayMode] = useState<'daily' | 'monthly'>('daily');
  const [selectedDestination] = useState('کردان، البرز');
  const [selectedType] = useState('استخردار روباز');
  const [likesCount, setLikesCount] = useState(4820);
  const [isLiked, setIsLiked] = useState(false);

  const featuredVilla = villas[0]; // Lunar Oasis
  const isFeaturedSaved = savedVillaIds.has(featuredVilla.id);

  const handleLike = () => {
    if (!isLiked) {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    } else {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    }
  };

  return (
    <div className="flex flex-col w-full relative pb-16">
      {/* Top Hero Header & Welcome Tagline */}
      <div className="px-4 sm:px-6 lg:px-12 pt-4 flex flex-col gap-2 max-w-4xl scroll-reveal is-revealed">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 backdrop-blur-xl text-amber-900 border border-amber-200/60 shadow-[0_4px_16px_rgba(217,119,6,0.12)]">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
            <span className="text-xs font-bold">اقامتگاه‌های رویایی و بدون مرز</span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-700 text-xs font-semibold px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/70">
            <span className="material-symbols-outlined text-[17px] text-amber-700">verified_user</span>
            <span>ضمانت تطابق ۱۰۰٪ ویلاجا</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-tight mt-1">
          شیوه نوین زندگی و <br />
          <span className="bg-gradient-to-l from-amber-700 via-amber-600 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
            اقامت لوکس در طبیعت
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal max-w-2xl mt-1">
          مجموعه‌ای دست‌چین از مدرن‌ترین عمارت‌های کوهستانی و ویلاهای اختصاصی کشور با پشتیبانی شبانه‌روزی و تشریفات هتلی ۵ ستاره
        </p>
      </div>

      {/* Booking Mode Toggle Pills (Frosted Glass) */}
      <div className="px-4 sm:px-6 lg:px-12 mt-5 max-w-md scroll-reveal is-revealed">
        <div className="glass-panel p-1 rounded-full flex items-center justify-between">
          <button
            onClick={() => setStayMode('daily')}
            className={`flex-1 py-2 px-3 rounded-full text-center text-xs transition-all duration-300 flex items-center justify-center gap-1.5 ${
              stayMode === 'daily'
                ? 'bg-amber-600 text-white shadow-md font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">wb_sunny</span>
            <span>رزرو روزانه و پایان‌هفته</span>
          </button>

          <button
            onClick={() => setStayMode('monthly')}
            className={`flex-1 py-2 px-3 rounded-full text-center text-xs transition-all duration-300 flex items-center justify-center gap-1.5 ${
              stayMode === 'monthly'
                ? 'bg-amber-600 text-white shadow-md font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">date_range</span>
            <span>اقامت طولانی و ماهانه</span>
          </button>
        </div>
      </div>

      {/* Glassmorphic Search Bar Capsule */}
      <div className="px-4 sm:px-6 lg:px-12 mt-4 max-w-2xl scroll-reveal is-revealed">
        <div className="glass-panel rounded-2xl p-3 sm:p-4 hover:border-amber-300/60 transition-colors">
          <div className="grid grid-cols-12 gap-2 items-center">
            {/* Destination */}
            <div 
              onClick={() => setActivePage('catalog')}
              className="col-span-5 flex flex-col justify-center px-2 py-1 cursor-pointer hover:bg-white/70 rounded-xl transition-colors"
            >
              <span className="text-[10px] text-stone-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-amber-600">location_on</span>
                مقصد
              </span>
              <span className="text-xs sm:text-sm text-stone-900 font-bold truncate mt-0.5">{selectedDestination}</span>
            </div>

            <div className="col-span-1 flex justify-center items-center">
              <div className="w-px h-8 bg-stone-200/80"></div>
            </div>

            {/* Property Type */}
            <div 
              onClick={() => setActivePage('catalog')}
              className="col-span-4 flex flex-col justify-center px-2 py-1 cursor-pointer hover:bg-white/70 rounded-xl transition-colors"
            >
              <span className="text-[10px] text-stone-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-amber-600">villa</span>
                نوع ویلا
              </span>
              <span className="text-xs sm:text-sm text-stone-900 font-bold truncate mt-0.5">{selectedType}</span>
            </div>

            {/* Search Button */}
            <div className="col-span-2 flex justify-end">
              <button
                onClick={() => setActivePage('catalog')}
                aria-label="جستجوی اقامتگاه"
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 text-white flex items-center justify-center shadow-[0_6px_20px_rgba(141,75,0,0.35)] hover:scale-105 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Scroll-Down Indicator (Guiding users smoothly to the villa showcase) */}
      <div className="px-4 sm:px-6 lg:px-12 mt-2">
        <ScrollDownHeroIndicator
          targetId="featured-masterpiece"
          label="اسکرول نرم به پایین • مشاهده شاهکار هفته"
        />
      </div>

      {/* Featured Masterpiece Hero Card */}
      <div id="featured-masterpiece" className="px-4 sm:px-6 lg:px-12 mt-2 scroll-reveal">
        <div className="relative w-full rounded-3xl overflow-hidden glass-panel group">
          {/* Main Visual */}
          <div className="relative w-full h-[400px] sm:h-[480px] bg-stone-200 overflow-hidden">
            <img
              src={featuredVilla.heroImage}
              alt={featuredVilla.titleFa}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Ambient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 pointer-events-none"></div>

            {/* Floating Top Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-xl shadow-md text-stone-900 border border-white/60">
              <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                hotel_class
              </span>
              <span className="text-xs font-bold">شاهکار منتخب هفته</span>
            </div>

            {/* Floating Favorite Button */}
            <button
              onClick={() => onToggleSave(featuredVilla.id)}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-xl flex items-center justify-center text-stone-800 shadow-md active:scale-90 transition-transform hover:scale-105"
              aria-label="ذخیره اقامتگاه"
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-colors ${
                  isFeaturedSaved ? 'text-rose-600' : 'text-stone-700'
                }`}
                style={isFeaturedSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {isFeaturedSaved ? 'favorite' : 'favorite_border'}
              </span>
            </button>

            {/* Anchored Floating Glass Card */}
            <div className="absolute bottom-3 inset-x-3 sm:bottom-5 sm:inset-x-5 glass-panel rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-xl font-black text-stone-900 tracking-tight">
                      {featuredVilla.titleFa}
                    </h2>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-100/90 text-amber-900 text-[10px] font-bold border border-amber-200">
                      ویژه
                    </span>
                  </div>
                  <span className="text-xs text-stone-600 flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px] text-amber-600">pin_drop</span>
                    {featuredVilla.location}
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex flex-col items-end">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg sm:text-2xl font-black text-amber-700">۱۴.۵</span>
                    <span className="text-xs text-stone-500 font-bold">میلیون ت/شب</span>
                  </div>
                </div>
              </div>

              {/* Villa Specs Chips */}
              <div className="flex items-center justify-between bg-white/70 backdrop-blur-md rounded-xl px-3 py-2 text-stone-700 text-xs font-semibold border border-white/80">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-amber-600">square_foot</span>
                  <span>{featuredVilla.areaSqM.toLocaleString('fa-IR')} متر</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-stone-300"></div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-amber-600">bed</span>
                  <span>{featuredVilla.bedrooms.toLocaleString('fa-IR')} خواب مستر</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-stone-300"></div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-amber-600">pool</span>
                  <span>استخر ۴فصل</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-4 text-stone-600 text-xs">
                  <button
                    onClick={handleLike}
                    className="flex items-center gap-1 hover:text-amber-700 transition-colors"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] ${isLiked ? 'text-rose-500' : ''}`}
                      style={isLiked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      thumb_up
                    </span>
                    <span className="font-semibold">{(likesCount / 1000).toFixed(1)}k</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onOpenShowcase) {
                        onOpenShowcase();
                      } else if (navigator.share) {
                        navigator.share({ title: featuredVilla.titleFa, url: window.location.href });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        onNotify?.('لینک عمارت کپی شد', 'آماده جهت اشتراک‌گذاری در اینستاگرام و شبکه‌های اجتماعی');
                      }
                    }}
                    className="flex items-center gap-1 hover:text-amber-700 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                    <span className="font-semibold">ارسال</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    onSelectVilla(featuredVilla);
                    setActivePage('details');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-l from-amber-600 to-amber-500 hover:brightness-105 text-white text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(141,75,0,0.3)] flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <span>مشاهده و رزرو سریع</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar & Quick Directory Widget (+10,000 Guests) */}
      <div className="px-4 sm:px-6 lg:px-12 mt-6 scroll-reveal">
        <div className="glass-panel rounded-2xl p-4 flex items-center justify-between hover:bg-white/80 transition-colors">
          <div className="flex items-center gap-3.5">
            {/* Avatar Stack */}
            <div className="flex items-center -space-x-3 rtl:space-x-reverse">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJhUwApssaWesSxt8TU0iz2TDDjU6DhGIINpcZaJJp4qXehUMEI0cYKCNiNnnTX5E0TitByQ4pUrImAUPj9cRxiNqeuSd7v3vkygEan9KovfnApL9Ginv5dYB2wQDVfVXMQp2r5IgPvAosGonw6kGruDBfoCErDEfWiet4NNS8TJVhxzTl8EKJAB3XDztdryb1zToClec6gC4eLMzUI_QCb8YnA7symfusn6mCn3RVPh3WPJIypEwh"
                alt="مهمان ویلاجا"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTALYB-exA6FlrSk9iIEtqjDJtSTthqnW-GbzZIjURqn65Xy2t_0GhHR0j6NgXgUDSzvHhyepRvAtrnM13msMk5RSPPGijGlB8KS6nyg0SowYFDR3SjljOJKXg4jiVmIUlI4K3hWmNmdcb62cQAgrKyFj6xqoeraunLmiFPpkh8qSf0kaaEvoOvFc7kkgz1NCvMsmlj10uQkdki0mFTZKZ04KGVL1nl_bskffR005hthtpwqHMBuLl"
                alt="مهمان ویلاجا"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAQSf5QmaUX8miXnYws3oYi7TEWLrbkmQE3KQm51M0wIRaQe2Icwb9Bf80eXfJeWTubPdEMo_r5UNaywAskj3IVLvUarTK5u8j-a8spBcyIUMwzVC1pfw-iH8EvCkFFYcem4kyelHYWOtEIpSlRKt-TiiwTYUayLf-Z38oY3bkbB_pYGny7H2BpwHHPXDg9BZUhnXMBlQUa-65CLJs1Q4rbpVx5CdspN1f3Z9ueXvSunvfgWctN4I6"
                alt="مهمان ویلاجا"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-base font-black text-stone-900">+۱۰,۰۰۰</span>
                <span className="material-symbols-outlined text-amber-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="text-xs font-bold text-stone-800">۴.۹</span>
              </div>
              <span className="text-[11px] text-stone-500 font-medium">مهمان راضی از اقامت‌های تاییدشده</span>
            </div>
          </div>

          <button
            onClick={() => setActivePage('catalog')}
            aria-label="مشاهده تمام نظرات"
            className="w-10 h-10 rounded-full bg-amber-100/90 hover:bg-amber-200 text-amber-900 flex items-center justify-center transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
        </div>
      </div>

      {/* Popular Luxury Categories Carousel */}
      <div id="categories-section" className="px-4 sm:px-6 lg:px-12 mt-8 flex items-center justify-between scroll-reveal">
        <div className="flex flex-col">
          <h2 className="text-lg sm:text-xl font-bold text-stone-900">دسته‌بندی‌های اختصاصی</h2>
          <span className="text-xs text-stone-500">گلچینی بر اساس سبک معماری و امکانات</span>
        </div>
        <button
          onClick={() => setActivePage('catalog')}
          className="text-amber-700 hover:text-amber-800 text-xs font-bold flex items-center gap-0.5"
        >
          <span>مشاهده همه</span>
          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
        </button>
      </div>

      {/* Horizontal Carousel */}
      <div className="mt-4 flex overflow-x-auto gap-4 px-4 sm:px-6 lg:px-12 pb-3 no-scrollbar scroll-smooth scroll-reveal">
        {CATEGORIES.slice(1).map((category) => (
          <div
            key={category.id}
            onClick={() => setActivePage('catalog')}
            className="shrink-0 w-64 sm:w-72 rounded-2xl glass-panel p-3 flex flex-col group cursor-pointer hover:border-amber-300 transition-all hover:scale-[1.02]"
          >
            <div className="relative w-full h-36 rounded-xl overflow-hidden bg-stone-200">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-amber-800 text-[10px] font-bold shadow-sm">
                {category.count.toLocaleString('fa-IR')} اقامتگاه
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 px-1">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                  {category.title}
                </span>
                <span className="text-[11px] text-stone-500 mt-0.5">{category.subtitle}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VIP Concierge Service Banner */}
      <div className="px-4 sm:px-6 lg:px-12 mt-8 scroll-reveal">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100/95 via-white/85 to-amber-50/95 backdrop-blur-2xl p-5 shadow-[0_16px_40px_-10px_rgba(141,75,0,0.15)] border border-white/90">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
                <span className="material-symbols-outlined text-[26px]">room_service</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm sm:text-base font-bold text-stone-900">
                  سرویس تشریفات و باتلر ۲۴ ساعته
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  سرآشپز بین‌المللی، ترانسفر فرودگاهی لوکس و هماهنگی گشت‌های هوایی
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (onNotify) {
                  onNotify('درخواست تشریفات VIP ثبت شد', 'کارشناس تشریفات ویلاجا تا ۱۰ دقیقه دیگر با شما تماس خواهد گرفت.');
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md active:scale-95 transition-all shrink-0 self-end sm:self-center"
            >
              درخواست تشریفات VIP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
