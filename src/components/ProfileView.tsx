import React from 'react';

interface ProfileViewProps {
  onExplore: () => void;
  onNotify?: (title: string, description?: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onExplore, onNotify }) => {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-8 pb-32">
      {/* Profile Header */}
      <div className="glass-panel p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
        <div className="flex items-center gap-4 text-center sm:text-right flex-col sm:flex-row">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 p-1 shadow-md">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-amber-800 font-black text-2xl">
              ا.ر
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-xl font-black text-stone-900">امیر رحیم‌پور</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                عضو پرایم VIP
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-900 text-white text-[10px] font-bold font-mono">
                Developer (@Amir-Rahimpour)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 flex-wrap justify-center sm:justify-start">
              <span className="text-xs text-stone-500 font-medium">A.rahimpour1999@gmail.com</span>
              <span className="text-stone-300">•</span>
              <a
                href="https://github.com/Amir-Rahimpour"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-700 hover:text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 transition-colors"
              >
                <span>GitHub:</span>
                <span>@Amir-Rahimpour</span>
                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-center">
            <span className="text-[10px] text-stone-500 block">امتیاز باشگاه</span>
            <span className="text-base font-black text-amber-800">۲,۴۵۰</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white/70 border border-stone-200/80 text-center">
            <span className="text-[10px] text-stone-500 block">تعداد سفرها</span>
            <span className="text-base font-black text-stone-900">۴ سفر</span>
          </div>
        </div>
      </div>

      {/* Concierge & Prime Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-100/70 to-white/90 border border-white shadow-sm flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow">
            <span className="material-symbols-outlined text-[20px]">room_service</span>
          </div>
          <h3 className="text-sm font-bold text-stone-900">سرویس باتلر و تشریفات اختصاصی</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            به عنوان عضو پرایم ویلاجا، ترانسفر فرودگاهی و گشت شهری در تمام اقامتگاه‌های طلایی با ۵۰٪ تخفیف ارائه می‌شود.
          </p>
          <button
            onClick={() => onNotify?.('تماس تشریفات VIP', 'پشتیبان اختصاصی VIP ظرف ۵ دقیقه آینده با شما تماس خواهد گرفت.')}
            className="mt-2 text-xs font-bold text-amber-800 hover:underline self-start flex items-center gap-1"
          >
            <span>تماس با پشتیبان اختصاصی VIP</span>
            <span className="material-symbols-outlined text-[15px]">arrow_back</span>
          </button>
        </div>

        <div className="p-5 rounded-3xl glass-panel flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-stone-800 text-white flex items-center justify-center shadow">
            <span className="material-symbols-outlined text-[20px]">security</span>
          </div>
          <h3 className="text-sm font-bold text-stone-900">ضمانت بیمه و جبران خسارت ۱۰۰٪</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            تمام اقامت‌ها تا سقف ۳ میلیارد تومان تحت پوشش بیمه مسئولیت مدنی و تضمین بازگشت وجه کامل ویلاجا هستند.
          </p>
          <button
            onClick={onExplore}
            className="mt-2 text-xs font-bold text-stone-800 hover:text-amber-700 self-start flex items-center gap-1"
          >
            <span>مشاهده اقامتگاه‌های تحت پوشش</span>
            <span className="material-symbols-outlined text-[15px]">arrow_back</span>
          </button>
        </div>
      </div>

      {/* Account Settings & Quick Links */}
      <div className="glass-panel rounded-3xl p-5 flex flex-col gap-3">
        <h3 className="text-sm font-bold text-stone-900 px-2">تنظیمات و دسترسی‌های سریع</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button 
            onClick={() => onNotify?.('کیف پول ویلاجا', 'موجودی فعلی کیف پول شما ۵,۰۰۰,۰۰۰ تومان است.')}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/80 transition-colors text-right"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-stone-600 text-[20px]">account_balance_wallet</span>
              <span className="text-xs font-semibold text-stone-800">کیف پول و اعتبارات نقدی</span>
            </div>
            <span className="text-xs text-amber-700 font-bold">۵ م ت</span>
          </button>

          <button 
            onClick={() => onNotify?.('احراز هویت', 'مدارک هویتی شما قبلاً بررسی و با نشان سبز تایید شده است.')}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/80 transition-colors text-right"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-stone-600 text-[20px]">verified_user</span>
              <span className="text-xs font-semibold text-stone-800">احراز هویت و مدارک میهمان</span>
            </div>
            <span className="text-xs text-emerald-600 font-bold">تایید شده</span>
          </button>

          <a 
            href="https://github.com/Amir-Rahimpour/villajah-luxury-stay"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/80 transition-colors text-right col-span-1 sm:col-span-2"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-stone-600 text-[20px]">code</span>
              <span className="text-xs font-semibold text-stone-800">سورس‌کد مخزن در گیت‌هاب (Developer Profile)</span>
            </div>
            <span className="text-xs text-stone-500 font-mono">@Amir-Rahimpour</span>
          </a>
        </div>
      </div>
    </div>
  );
};
