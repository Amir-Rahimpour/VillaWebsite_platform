import React, { useState } from 'react';
import { Villa } from '../types';
import { formatPricePersian } from '../data/villas';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface VillaDetailsViewProps {
  villa: Villa;
  onOpenBookingModal: (nights: number, guests: number, checkInDate: string, checkOutDate: string) => void;
  onOpenHostChat: () => void;
  savedVillaIds: Set<string>;
  onToggleSave: (villaId: string) => void;
  onBack: () => void;
  isInsideFrame?: boolean;
}

export const VillaDetailsView: React.FC<VillaDetailsViewProps> = ({
  villa,
  onOpenBookingModal,
  onOpenHostChat,
  savedVillaIds,
  onToggleSave,
  onBack,
  isInsideFrame = false,
}) => {
  useScrollReveal();

  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(4);
  const [checkInDate] = useState('پنجشنبه، ۱۵ آذر');
  const [checkOutDate] = useState('یکشنبه، ۱۸ آذر');
  const [isNarrativeExpanded, setIsNarrativeExpanded] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);

  const isSaved = savedVillaIds.has(villa.id);

  // Dynamic cost math
  const subtotal = villa.pricePerNight * nights;
  const discount = nights > 2 ? Math.round(subtotal * 0.1) : 0;
  const cleaningFee = 1200000;
  const total = subtotal - discount + cleaningFee;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${villa.titleFa} | ویلاجا`,
        text: `مشاهده عمارت فوق‌لوکس ${villa.titleFa} در ویلاجا`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert(`لینک اقامتگاه «${villa.titleFa}» در حافظه کپی شد.`);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 relative pb-32">
      {/* Top Breadcrumb & Share Actions */}
      <section className="flex flex-col gap-3 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <button onClick={onBack} className="hover:text-amber-800 transition-colors flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              <span>اقامتگاه‌های لوکس</span>
            </button>
            <span>/</span>
            <span>استان {villa.province}</span>
            <span>/</span>
            <span className="text-stone-900 font-bold">{villa.city}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-stone-700 text-xs font-semibold border border-white shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span>اشتراک‌گذاری</span>
            </button>

            <button
              onClick={() => onToggleSave(villa.id)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-stone-700 text-xs font-semibold border border-white shadow-sm transition-all"
            >
              <span
                className={`material-symbols-outlined text-[18px] ${isSaved ? 'text-rose-600' : 'text-stone-500'}`}
                style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {isSaved ? 'favorite' : 'favorite_border'}
              </span>
              <span>{isSaved ? 'ذخیره در برگزیده‌ها' : 'نشان کردن'}</span>
            </button>
          </div>
        </div>

        {/* Title & Trust Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mt-1">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold border border-amber-200 shadow-sm">
                <span className="material-symbols-outlined text-[15px] text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                سوپرمیزبان طلایی
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-stone-800 text-xs font-semibold border border-stone-200/70 shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">verified_user</span>
                تضمین ۱۰۰٪ تطابق اقامتگاه با ویلاجا
              </span>
              <span className="text-xs text-stone-500 font-medium">کد ملک: {villa.code}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight leading-tight mt-1">
              {villa.titleFa}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 font-semibold">
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                <span className="material-symbols-outlined text-amber-500 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="font-bold text-stone-900">{villa.rating.toFixed(2)}</span>
                <span className="text-stone-500 font-normal">({villa.reviewCount.toLocaleString('fa-IR')} نظر)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-amber-600">location_on</span>
                <span>{villa.location}</span>
              </div>
            </div>
          </div>

          {/* Architectural Style Glass Capsule */}
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-white p-2.5 rounded-2xl shadow-sm">
            <div className="px-3 py-1 flex flex-col items-center">
              <span className="text-[10px] text-stone-500">سبک بنا</span>
              <span className="text-xs font-black text-amber-800">{villa.architecturalStyle}</span>
            </div>
            <div className="w-px h-7 bg-stone-200"></div>
            <div className="px-3 py-1 flex flex-col items-center">
              <span className="text-[10px] text-stone-500">چشم‌انداز</span>
              <span className="text-xs font-bold text-stone-800">{villa.view}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Photo Gallery Mosaic with 360° Virtual Tour */}
      <section className="relative mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-3 h-[420px] sm:h-[500px] rounded-3xl overflow-hidden p-2.5 bg-white/70 backdrop-blur-2xl border border-white shadow-[0_20px_60px_rgba(160,130,100,0.08)]">
          {/* Main Giant View (7 cols) */}
          <div 
            onClick={() => setShowFullGallery(true)}
            className="md:col-span-2 lg:col-span-7 relative h-full rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-stone-200"
          >
            <img
              src={villa.galleryImages[activeImageIdx] || villa.heroImage}
              alt={villa.titleFa}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-black/25 pointer-events-none"></div>

            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xl text-stone-900 text-xs font-bold flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                رزرو آنی VIP
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-4 inset-x-4 p-3 sm:p-4 rounded-xl bg-white/90 backdrop-blur-2xl border border-white/90 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">pool</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-stone-900">استخر اینفینیتی چهارفصل روباز</span>
                  <span className="text-[10px] sm:text-xs text-stone-600">مجهز به سیستم تصفیه اوزون و گرمایش تا ۴۲ درجه</span>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  alert('تور مجازی ۳۶۰ درجه به صورت شبیه‌سازی لود شد.');
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-600 text-white text-xs font-bold shadow-md hover:bg-amber-700 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">360</span>
                <span>تور ۳۶۰°</span>
              </button>
            </div>
          </div>

          {/* 4 Secondary Thumbnails (5 cols) */}
          <div className="md:col-span-2 lg:col-span-5 grid grid-cols-2 gap-3 h-full">
            {villa.galleryImages.slice(1, 4).map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImageIdx(i + 1)}
                className="relative rounded-2xl overflow-hidden group cursor-pointer h-full shadow-sm bg-stone-200"
              >
                <img
                  src={img}
                  alt={`نمای ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent"></div>
                <span className="absolute bottom-2.5 right-2.5 text-[10px] text-white px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                  {i === 0 ? 'سالن نشیمن اصلی' : i === 1 ? 'مستر روم کینگ' : 'سینمای ۱۲ نفره'}
                </span>
              </div>
            ))}

            {/* 4th Thumbnail opens full gallery */}
            <div
              onClick={() => setShowFullGallery(true)}
              className="relative rounded-2xl overflow-hidden group cursor-pointer h-full shadow-sm bg-stone-900"
            >
              <img
                src={villa.galleryImages[4] || villa.heroImage}
                alt="گالری"
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm group-hover:bg-stone-950/45 transition-all flex flex-col items-center justify-center gap-1.5 text-center p-2">
                <span className="material-symbols-outlined text-white text-[24px]">photo_library</span>
                <span className="text-xs font-bold text-white">مشاهده همه ۲۸ عکس</span>
                <span className="text-[10px] text-amber-200">همراه با ویدیو ۳۶۰°</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Left Column = Booking Card; Right Column = Villa Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Right Dossier Area (7-8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
          {/* Key Architectural Specs */}
          <section className="bg-white/80 backdrop-blur-2xl border border-white/90 p-6 rounded-3xl shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900">مشخصات کلیدی ملک</h2>
              <span className="text-xs text-amber-800 bg-amber-100 px-3 py-1 rounded-full font-bold">
                سند تک‌برگ اعیان
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-stone-50 border border-stone-200/60 text-center">
                <span className="material-symbols-outlined text-amber-600 text-[24px] mb-1">square_foot</span>
                <span className="text-base font-black text-stone-900">{villa.areaSqM.toLocaleString('fa-IR')} متر</span>
                <span className="text-[11px] text-stone-500">متراژ دوبلکس</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-stone-50 border border-stone-200/60 text-center">
                <span className="material-symbols-outlined text-amber-600 text-[24px] mb-1">bed</span>
                <span className="text-base font-black text-stone-900">{villa.bedrooms.toLocaleString('fa-IR')} خواب</span>
                <span className="text-[11px] text-stone-500">مستر کینگ</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-stone-50 border border-stone-200/60 text-center">
                <span className="material-symbols-outlined text-amber-600 text-[24px] mb-1">groups</span>
                <span className="text-base font-black text-stone-900">{villa.guestCapacity.toLocaleString('fa-IR')} نفر</span>
                <span className="text-[11px] text-stone-500">ظرفیت استاندارد</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-stone-50 border border-stone-200/60 text-center">
                <span className="material-symbols-outlined text-amber-600 text-[24px] mb-1">bathtub</span>
                <span className="text-base font-black text-stone-900">{villa.bathrooms.toLocaleString('fa-IR')} حمام</span>
                <span className="text-[11px] text-stone-500">سرویس و جکوزی</span>
              </div>

              <div className="col-span-2 sm:col-span-2 flex items-center justify-between px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200/60">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-amber-600 text-[24px]">garage_home</span>
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-stone-900">
                      {villa.parkingSpaces.toLocaleString('fa-IR')} خودرو مسقف امن
                    </span>
                    <span className="text-[10px] text-stone-500">پارکینگ با درب ریموت اتوماتیک</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
              </div>
            </div>
          </section>

          {/* Superhost Card */}
          <section className="bg-white/80 backdrop-blur-2xl border border-white/90 p-5 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={villa.host.avatar}
                  alt={villa.host.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-400/50 shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-stone-900">{villa.host.name}</h3>
                  <span className="material-symbols-outlined text-amber-600 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                </div>
                <span className="text-xs text-stone-500 mt-0.5">{villa.host.title}</span>
                <div className="flex items-center gap-3 text-[11px] text-stone-600 mt-1">
                  <span>{villa.host.experience}</span>
                  <span>•</span>
                  <span>نرخ پذیرش: <strong className="text-stone-900">{villa.host.responseRate}</strong></span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenHostChat}
              className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-all self-end sm:self-center"
            >
              <span className="material-symbols-outlined text-[17px] text-amber-700">chat</span>
              <span>گفتگو با میزبان</span>
            </button>
          </section>

          {/* Luxury Amenities Grid */}
          <section className="bg-white/80 backdrop-blur-2xl border border-white/90 p-6 rounded-3xl shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900">امکانات فوق‌لوکس اقامتگاه</h2>
              <span className="text-xs text-amber-800 font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                {villa.amenities.length.toLocaleString('fa-IR')} مورد اختصاصی
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {villa.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200/60"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">{amenity.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-stone-900 truncate">{amenity.title}</span>
                    <span className="text-[10px] text-stone-500 truncate mt-0.5">{amenity.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Architectural Narrative */}
          <section className="bg-white/80 backdrop-blur-2xl border border-white/90 p-6 rounded-3xl shadow-sm flex flex-col gap-3">
            <h2 className="text-base font-bold text-stone-900">روایت معماری و فضا</h2>
            <p className={`text-xs text-stone-600 leading-relaxed ${isNarrativeExpanded ? '' : 'line-clamp-3'}`}>
              {villa.narrative}
            </p>
            <button
              onClick={() => setIsNarrativeExpanded((prev) => !prev)}
              className="text-amber-800 hover:text-amber-900 text-xs font-bold flex items-center gap-1 self-start"
            >
              <span>{isNarrativeExpanded ? 'بستن متن' : 'نمایش بیشتر جزئیات'}</span>
              <span className="material-symbols-outlined text-[16px]">
                {isNarrativeExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </section>

          {/* Location & Routing */}
          <section className="bg-white/80 backdrop-blur-2xl border border-white/90 p-6 rounded-3xl shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-stone-900">موقعیت و حریم دسترسی</h2>
                <span className="text-xs text-stone-500 mt-0.5">امنیت ۲۴ ساعته گیت ورود شهرک</span>
              </div>
              <button
                onClick={() => alert(`مسیریابی به سمت ${villa.titleFa} در اپلیکیشن نشان/بلد شبیه‌سازی شد.`)}
                className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200 transition-colors"
              >
                مسیریابی
              </button>
            </div>

            <div className="w-full h-52 rounded-2xl relative overflow-hidden bg-cover bg-center border border-stone-200"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJ9QMU1RhjSg9Hf6NPfhtTDTlmI8zPBPKAOWJuJGxLnHkyeoapBLWNhLjLG_NzQPPikgLfqLAri1a_HXOk7_OALBkfcNNzd1op--yhcsQWGtkTcTmoRNa7HEQ9G-xLM62JZz60V9bbpeVgcNDY_UkjdHC-Q_MJKO039VT_V0zx-5dX0urgFOTYzEoJAeQ2czW8JMJCM9Cf4zW8LPzrEnWjbB3NbCJQOig5tN1aJdskTbUjSC5KApBV')`,
              }}
            >
              <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-[0.5px]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-xl animate-bounce">
                  <span className="material-symbols-outlined text-[22px]">villa</span>
                </div>
                <span className="mt-1 px-3 py-0.5 rounded-full bg-white/95 text-[11px] font-bold text-stone-900 shadow">
                  محدوده {villa.city}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] text-stone-700 shadow font-medium">
                آدرس دقیق پس از رزرو نهایی ارسال می‌شود
              </div>
            </div>
          </section>

          {/* Verified Guest Reviews */}
          <section className="bg-white/80 backdrop-blur-2xl border border-white/90 p-6 rounded-3xl shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-stone-900">دیدگاه مهمانان ویژه</h2>
                <span className="text-xs text-stone-500">۱۰۰٪ مهمانان این ویلا را توصیه کرده‌اند</span>
              </div>
              <div className="text-center px-3.5 py-1 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-base font-black text-amber-700">{villa.rating.toFixed(2)}</span>
                <span className="text-[10px] text-stone-500 block">از ۵</span>
              </div>
            </div>

            {/* Ratings Breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-stone-700">
                <span>نظافت فوق‌العاده و بهداشت هتلی</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 rounded-full bg-stone-200 overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="font-bold">۵.۰</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-stone-700">
                <span>تطابق تصاویر با واقعیت</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 rounded-full bg-stone-200 overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                  <span className="font-bold">۴.۹</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-stone-700">
                <span>رفتار میزبان و تشریفات پذیرش</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 rounded-full bg-stone-200 overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="font-bold">۵.۰</span>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-3 pt-2">
              {villa.reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={rev.avatar} alt={rev.author} className="w-8 h-8 rounded-full object-cover" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-stone-900">{rev.author}</span>
                        <span className="text-[10px] text-stone-500">{rev.date} • {rev.duration}</span>
                      </div>
                    </div>
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">{rev.comment}</p>
                  <span className="text-[10px] text-amber-800 font-semibold self-start flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-amber-600">verified</span>
                    {rev.tag}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* House Rules & Policies */}
          <section className="bg-white/80 backdrop-blur-2xl border border-white/90 p-6 rounded-3xl shadow-sm flex flex-col gap-4">
            <h2 className="text-base font-bold text-stone-900">مقررات اقامت و کنسلی</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/50 flex flex-col gap-1 text-xs">
                <span className="font-bold text-stone-900 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-amber-600">schedule</span>
                  ورود و خروج
                </span>
                <span className="text-[11px] text-stone-600">تحویل کلید: ساعت ۱۴:۰۰</span>
                <span className="text-[11px] text-stone-600">تخلیه واحد: ساعت ۱۲:۰۰</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/50 flex flex-col gap-1 text-xs">
                <span className="font-bold text-stone-900 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-amber-600">rule</span>
                  قوانین عمارت
                </span>
                <span className="text-[11px] text-stone-600">دخانیات فقط در تراس</span>
                <span className="text-[11px] text-stone-600">برگزاری دورهمی خانوادگی مجاز</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/50 flex flex-col gap-1 text-xs">
                <span className="font-bold text-stone-900 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-amber-600">cancel</span>
                  سیاست کنسلی
                </span>
                <span className="text-[11px] text-stone-600">تا ۷۲ ساعت قبل: ۱۰۰٪ عودت</span>
                <span className="text-[11px] text-stone-600">تحت پوشش بیمه خسارت</span>
              </div>
            </div>
          </section>
        </div>

        {/* Left Column: Sticky Luminous Glass Booking Card (Desktop only) */}
        {!isInsideFrame && (
          <aside className="lg:col-span-5 xl:col-span-4 sticky top-28 z-30">
          <div className="relative bg-white/85 backdrop-blur-3xl border border-white p-6 sm:p-7 rounded-3xl shadow-[0_25px_60px_-15px_rgba(180,140,90,0.18)] flex flex-col gap-5 overflow-hidden">
            {/* Ambient Warm Inner Flare */}
            <div className="absolute -top-20 -left-20 w-44 h-44 bg-amber-200/35 rounded-full blur-3xl pointer-events-none"></div>

            {/* Price Header */}
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-amber-800 tracking-tight">
                  {formatPricePersian(villa.pricePerNight)}
                </span>
                <span className="text-xs text-stone-500 font-semibold">تومان / هر شب</span>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-stone-800">
                <span className="material-symbols-outlined text-amber-500 text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span>{villa.rating.toFixed(2)}</span>
              </div>
            </div>

            {/* Interactive Selector Pill */}
            <div className="bg-stone-50/80 p-3 rounded-2xl border border-stone-200/60 flex flex-col gap-2.5">
              {/* Dates */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-white rounded-xl border border-stone-200 flex flex-col">
                  <span className="text-[10px] text-stone-500 font-medium">تاریخ ورود</span>
                  <span className="font-bold text-stone-900 mt-0.5">{checkInDate}</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-stone-200 flex flex-col">
                  <span className="text-[10px] text-stone-500 font-medium">تاریخ خروج</span>
                  <span className="font-bold text-stone-900 mt-0.5">{checkOutDate}</span>
                </div>
              </div>

              {/* Nights Stepper */}
              <div className="flex items-center justify-between px-3 py-2 bg-amber-50/80 rounded-xl border border-amber-200/60 text-xs">
                <span className="text-stone-700 font-bold">مدت زمان اقامت:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => nights > 1 && setNights(nights - 1)}
                    className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-stone-800 hover:bg-amber-600 hover:text-white transition-all active:scale-95"
                  >
                    -
                  </button>
                  <span className="font-black text-amber-900 min-w-[32px] text-center">
                    {nights.toLocaleString('fa-IR')} شب
                  </span>
                  <button
                    onClick={() => nights < 30 && setNights(nights + 1)}
                    className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-stone-800 hover:bg-amber-600 hover:text-white transition-all active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Guests Stepper */}
              <div className="flex items-center justify-between px-3 py-2 bg-white rounded-xl border border-stone-200 text-xs">
                <span className="text-stone-700 font-bold">تعداد مهمانان:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => guests > 1 && setGuests(guests - 1)}
                    className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-800 hover:bg-amber-600 hover:text-white transition-all active:scale-95"
                  >
                    -
                  </button>
                  <span className="font-black text-stone-900 min-w-[32px] text-center">
                    {guests.toLocaleString('fa-IR')} نفر
                  </span>
                  <button
                    onClick={() => guests < villa.maxGuests && setGuests(guests + 1)}
                    className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-800 hover:bg-amber-600 hover:text-white transition-all active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price Ledger */}
            <div className="flex flex-col gap-2 text-xs text-stone-600">
              <div className="flex items-center justify-between">
                <span>{formatPricePersian(villa.pricePerNight)} تومان × {nights} شب</span>
                <span className="text-stone-900 font-bold">{formatPricePersian(subtotal)} تومان</span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-semibold">
                  <span>تخفیف ویژه بیش از ۲ شب (۱۰٪)</span>
                  <span>- {formatPricePersian(discount)} تومان</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>هزینه نظافت و خدمات هتلینگ VIP</span>
                <span className="text-stone-900 font-bold">{formatPricePersian(cleaningFee)} تومان</span>
              </div>

              <div className="flex items-center justify-between">
                <span>بیمه اختصاصی اقامت و مسئولیت</span>
                <span className="text-amber-800 font-bold">رایگان ویلاجا</span>
              </div>

              <div className="w-full h-px bg-stone-200 my-1"></div>

              <div className="flex items-center justify-between text-stone-900">
                <span className="font-bold text-sm">مجموع قابل پرداخت:</span>
                <span className="text-base sm:text-lg font-black text-amber-800">
                  {formatPricePersian(total)} تومان
                </span>
              </div>
            </div>

            {/* Booking CTA Button */}
            <button
              onClick={() => onOpenBookingModal(nights, guests, checkInDate, checkOutDate)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-105 text-white font-bold text-sm shadow-[0_10px_25px_rgba(217,119,6,0.35)] active:scale-95 transition-all flex items-center justify-between px-5"
            >
              <span>درخواست رزرو قطعی</span>
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>

            <span className="text-[10px] text-center text-stone-500">
              در این مرحله مبلغی از حساب شما کسر نخواهد شد
            </span>

            {/* Concierge Note */}
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/60 text-xs">
              <span className="material-symbols-outlined text-amber-700 text-[20px]">room_service</span>
              <div className="flex flex-col">
                <span className="font-bold text-amber-950">خدمات تشریفات اختصاصی</span>
                <span className="text-[10px] text-stone-600">امکان سفارش سرآشپز و ترانسفر پس از ثبت رزرو</span>
              </div>
            </div>
          </div>
        </aside>
      )}
      </div>

      {/* Sticky Bottom Glass Bar on Mobile (or inside mobile mockup) */}
      <div className={`${isInsideFrame ? 'sticky bottom-0 inset-x-0' : 'fixed bottom-0 inset-x-0 lg:hidden'} z-40 bg-white/95 backdrop-blur-2xl p-3.5 shadow-2xl border-t border-white`}>
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black text-amber-700">{formatPricePersian(total)}</span>
              <span className="text-[10px] text-stone-500 font-semibold">تومان ({nights} شب)</span>
            </div>
            <span className="text-[10px] text-stone-500">{checkInDate}</span>
          </div>

          <button
            onClick={() => onOpenBookingModal(nights, guests, checkInDate, checkOutDate)}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span>درخواست رزرو قطعی</span>
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
