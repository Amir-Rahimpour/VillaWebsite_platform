import React, { useState } from 'react';
import { Villa, BookingDetails } from '../types';
import { formatPricePersian } from '../data/villas';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  villa: Villa;
  nights: number;
  guests: number;
  checkInDate: string;
  checkOutDate: string;
  onBookingConfirmed: (booking: BookingDetails) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  villa,
  nights,
  guests,
  checkInDate,
  checkOutDate,
  onBookingConfirmed,
}) => {
  const [guestName, setGuestName] = useState('امیر رحیم‌پور');
  const [guestPhone, setGuestPhone] = useState('۰۹۱۲۳۴۵۶۷۸۹');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  if (!isOpen) return null;

  const subtotal = villa.pricePerNight * nights;
  const discount = nights > 2 ? Math.round(subtotal * 0.1) : 0;
  const cleaningFee = 1200000;
  const total = subtotal - discount + cleaningFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedCode = 'VJ-' + Math.floor(100000 + Math.random() * 900000).toString();
    setBookingCode(generatedCode);

    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);

      const bookingData: BookingDetails = {
        villaId: villa.id,
        villaName: villa.titleFa,
        villaLocation: villa.location,
        checkInDate,
        checkOutDate,
        nights,
        guests,
        nightlyRate: villa.pricePerNight,
        cleaningFee,
        discount,
        totalPrice: total,
        guestName,
        guestPhone,
        bookingCode: generatedCode,
        createdAt: new Date().toLocaleDateString('fa-IR'),
      };

      onBookingConfirmed(bookingData);
    }, 1000);
  };

  const handleResetAndClose = () => {
    setIsComplete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="w-full max-w-lg rounded-3xl bg-white/95 backdrop-blur-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-2xl border border-white max-h-[90vh] overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {!isComplete ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-stone-900">تایید درخواست رزرو قطعی</h3>
                  <span className="text-xs text-stone-500 font-medium">سرویس تشریفات ویلاجا پرایم</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Villa Overview Pill */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200/60">
              <img
                src={villa.heroImage}
                alt={villa.titleFa}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-xs font-bold text-amber-800 truncate">{villa.titleFa}</span>
                <span className="text-[11px] text-stone-500 truncate mt-0.5">{villa.location}</span>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-700 font-semibold">
                  <span>{nights.toLocaleString('fa-IR')} شب</span>
                  <span>•</span>
                  <span>{guests.toLocaleString('fa-IR')} نفر مهمان</span>
                </div>
              </div>
            </div>

            {/* Dates Pill */}
            <div className="grid grid-cols-2 gap-2 bg-amber-50/70 p-3 rounded-xl border border-amber-200/60 text-xs">
              <div className="flex flex-col">
                <span className="text-stone-500 font-medium">تاریخ ورود:</span>
                <span className="font-bold text-stone-900 mt-0.5">{checkInDate} (ساعت ۱۴:۰۰)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-stone-500 font-medium">تاریخ خروج:</span>
                <span className="font-bold text-stone-900 mt-0.5">{checkOutDate} (ساعت ۱۲:۰۰)</span>
              </div>
            </div>

            {/* Guest Form */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-stone-800">اطلاعات سرپرست رزرو:</span>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] text-stone-600 font-medium">نام و نام‌خانوادگی:</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 text-xs font-semibold"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] text-stone-600 font-medium">شماره موبایل جهت هماهنگی و پیامک ورود:</label>
                <input
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 text-xs font-semibold text-left dir-ltr"
                />
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700">
              <div className="flex justify-between">
                <span>مبلغ اقامت ({nights} شب):</span>
                <span className="font-bold">{formatPricePersian(subtotal)} تومان</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>تخفیف ویژه بیش از ۲ شب (۱۰٪):</span>
                  <span>- {formatPricePersian(discount)} تومان</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>هزینه نظافت هتلی و تشریفات:</span>
                <span>{formatPricePersian(cleaningFee)} تومان</span>
              </div>
              <div className="w-full h-[1px] bg-stone-200 my-1"></div>
              <div className="flex justify-between text-sm font-black text-amber-900">
                <span>مجموع نهایی فاکتور:</span>
                <span>{formatPricePersian(total)} تومان</span>
              </div>
            </div>

            {/* Action Submit */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-105 text-white font-bold text-sm shadow-[0_8px_24px_rgba(217,119,6,0.35)] transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                    <span>درحال ثبت و ارسال به میزبان...</span>
                  </>
                ) : (
                  <>
                    <span>ثبت درخواست و دریافت پیامک ورود</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  </>
                )}
              </button>
              <span className="text-[11px] text-center text-stone-500">
                تحت ضمانت ۱۰۰٪ تطابق و بازگشت وجه ویلاجا
              </span>
            </div>
          </form>
        ) : (
          /* Confirmation Success State */
          <div className="flex flex-col items-center text-center gap-5 py-4 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-black text-stone-900">رزرو شما با موفقیت ثبت گردید!</h3>
              <p className="text-xs text-stone-600 leading-relaxed max-w-sm mt-1">
                اطلاعات اقامت و لوکیشن دقیق برای شماره <strong className="text-stone-900 dir-ltr inline-block">{guestPhone}</strong> پیامک شد. مهندس آریافر درحال آماده‌سازی واحد است.
              </p>
            </div>

            <div className="w-full bg-amber-50/80 border border-amber-200/80 p-4 rounded-2xl flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>شناسه پیگیری اقامت:</span>
                <span className="font-mono font-black text-amber-900 text-sm tracking-wider">{bookingCode}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>نام عمارت:</span>
                <span className="font-bold text-stone-900">{villa.titleFa}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>تاریخ ورود:</span>
                <span className="font-bold text-stone-900">{checkInDate}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>مبلغ تسویه اقامت:</span>
                <span className="font-bold text-stone-900">{formatPricePersian(total)} تومان</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
            >
              مشاهده و بازگشت به سامانه
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
