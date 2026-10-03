import React from 'react';

interface FooterProps {
  onNotify?: (title: string, description?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNotify }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 w-full glass-panel border-t border-b-0 border-x-0 border-white/80 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 flex flex-col gap-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-800">
              <span className="material-symbols-outlined text-[18px]">castle</span>
            </div>
            <p className="text-xs text-stone-600 font-medium text-center sm:text-right">
              © تمامی حقوق مادی و معنوی برای پلتفرم تجملاتی اقامت «ویلاجا» محفوظ است.
            </p>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-xs text-stone-600 font-medium flex-wrap justify-center">
            <button 
              onClick={() => onNotify?.('پشتیبانی ۲۴ ساعته تشریفات', 'مرکز تماس VIP به شماره ۰۲۱۹۱۰۰۰۰۰۰ آماده پاسخگویی به مهمانان گرامی است.')}
              className="hover:text-amber-700 transition-colors"
            >
              پشتیبانی VIP اختصاصی
            </button>
            <span className="text-stone-300">•</span>
            <button 
              onClick={() => onNotify?.('ضمانت اصالت ۱۰۰٪', 'تمامی تصاویر توسط عکاسان رسمی ویلاجا تهیه و با کارشناسی حضوری تایید شده است.')}
              className="hover:text-amber-700 transition-colors"
            >
              ضمانت اصالت ویلا
            </button>
            <span className="text-stone-300">•</span>
            <button 
              onClick={() => onNotify?.('حفظ محرمانگی مهمانان', 'اطلاعات اقامت، اسامی و شماره تماس مهمانان کاملاً محرمانه تلقی می‌گردد.')}
              className="hover:text-amber-700 transition-colors"
            >
              قوانین محرمانگی
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 text-stone-700 hover:text-amber-800 hover:bg-white transition-all text-xs font-semibold border border-white shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">north</span>
            <span>بازگشت به بالا</span>
          </button>
        </div>

        {/* Developer Credit Signature */}
        <div className="pt-4 border-t border-stone-200/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <span>طراحی و معماری فرانت‌اند با ❤️ توسط</span>
            <a
              href="https://github.com/Amir-Rahimpour"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-stone-900 hover:text-amber-700 transition-colors inline-flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-full border border-stone-200/60 shadow-xs"
            >
              <span>امیر رحیم‌پور</span>
              <span className="font-mono text-amber-700 text-[10px]">(@Amir-Rahimpour)</span>
            </a>
          </div>

          <a
            href="https://github.com/Amir-Rahimpour/villajah-luxury-stay"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">code</span>
            <span>مشاهده سورس‌کد در GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
