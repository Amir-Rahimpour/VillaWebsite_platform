import React from 'react';
import { BookingDetails } from '../types';
import { formatPricePersian } from '../data/villas';

interface BookingsViewProps {
  bookings: BookingDetails[];
  onExplore: () => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({ bookings, onExplore }) => {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-8 pb-32">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900">سفرهای من و رزروها</h1>
          <p className="text-xs text-stone-500 mt-1">مشاهده وضعیت تایید، فاکتور و اطلاعات تحویل کلید اقامتگاه</p>
        </div>
        <button
          onClick={onExplore}
          className="px-4 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-sm"
        >
          رزرو اقامتگاه جدید
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 rounded-3xl bg-white/80 backdrop-blur-xl border border-white text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[32px]">calendar_month</span>
          </div>
          <h3 className="text-base font-bold text-stone-900">هنوز سفری ثبت نشده است</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-xs">
            لوکس‌ترین عمارت‌های کردان، کلاردشت و رامسر را کاوش کنید و یک آخر هفته رویایی رزرو نمایید.
          </p>
          <button
            onClick={onExplore}
            className="mt-5 px-6 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition-all"
          >
            مشاهده کاتالوگ عمارت‌ها
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.bookingCode}
              className="p-5 rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-sm flex flex-col sm:flex-row justify-between gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    رزرو قطعی تایید شده
                  </span>
                  <span className="text-xs text-stone-400 font-mono">کد پیگیری: {booking.bookingCode}</span>
                </div>
                <h3 className="text-base font-bold text-stone-900">{booking.villaName}</h3>
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-amber-600">location_on</span>
                  {booking.villaLocation}
                </span>

                <div className="flex items-center gap-3 text-xs text-stone-700 font-semibold mt-2">
                  <span>ورود: {booking.checkInDate}</span>
                  <span>•</span>
                  <span>خروج: {booking.checkOutDate}</span>
                  <span>•</span>
                  <span>{booking.nights} شب</span>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-200">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-stone-500">مجموع پرداختی</span>
                  <span className="text-base font-black text-amber-800">
                    {formatPricePersian(booking.totalPrice)} تومان
                  </span>
                </div>
                <button
                  onClick={() => alert(`ووچر و فاکتور رسمی اقامتگاه ${booking.villaName} آماده چاپ است.`)}
                  className="mt-2 px-4 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-all"
                >
                  دریافت ووچر رسمی
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
