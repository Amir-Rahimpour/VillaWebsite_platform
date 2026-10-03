import React, { useState } from 'react';

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (title: string, description?: string) => void;
}

export const ShowcaseModal: React.FC<ShowcaseModalProps> = ({
  isOpen,
  onClose,
  onNotify,
}) => {
  const [activeTab, setActiveTab] = useState<'social' | 'deploy' | 'github'>('social');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPublicLink, setCopiedPublicLink] = useState(false);
  const [copiedGitCmd, setCopiedGitCmd] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  if (!isOpen) return null;

  // The permanent public shared URL served on Google Cloud - completely open to anyone without AI Studio login
  const PUBLIC_APP_URL = 'https://ais-pre-atpx6232y6s2dsowyoubxa-295019131917.europe-west2.run.app';
  const currentUrl = window.location.href;
  const effectiveShareUrl = PUBLIC_APP_URL;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(effectiveShareUrl);
    setCopiedLink(true);
    onNotify('لینک عمومی کپی شد', 'این لینک برای همه کاربران بدون نیاز به هیچ‌گونه لاگین یا حساب کاربری قابل مشاهده است.');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyPublicDirect = () => {
    navigator.clipboard.writeText(PUBLIC_APP_URL);
    setCopiedPublicLink(true);
    onNotify('آدرس عمومی ابری کپی شد', 'آماده قرار دادن در بایو اینستاگرام، رزومه یا تلگرام.');
    setTimeout(() => setCopiedPublicLink(false), 2500);
  };

  const instagramCaption = `🏰 پلتفرم اختصاصی رزرو عمارت‌های مجلل و ویلاهای لوکس «ویلاجا» (Villajah)
✨ طراحی مدرن تمام شیشه‌ای (Frosted Glassmorphism)، انیمیشن‌های روان فیزیکی و فیلتر پیشرفته
📱 بهینه‌سازی ۱۰۰٪ برای موبایل، تبلت و دسکتاپ

👨‍💻 طراحی و برنامه‌نویسی کامل توسط: امیر رحیم‌پور
💻 گیت‌هاب: @Amir-Rahimpour
🔗 لینک وب‌سایت در بایو (Bio) پیج قرار گرفت
⭐ سورس‌کد کامل پروژه در گیت‌هاب: github.com/Amir-Rahimpour/villajah-luxury-stay

#amir_rahimpour #react #tailwindcss #frontend #uiux #webdeveloper #programming #طراحی_سایت #برنامه_نویسی #ویلاجا`;

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(instagramCaption);
    setCopiedCaption(true);
    onNotify('متن کپشن اینستاگرام کپی شد', 'کپشن آماده حاوی نام شما (امیر رحیم‌پور) و آیدی گیت‌هاب کپی شد.');
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  const handleCopyGit = () => {
    const cmd = `git clone https://github.com/Amir-Rahimpour/villajah-luxury-stay.git\ncd villajah-luxury-stay\nnpm install\nnpm run dev`;
    navigator.clipboard.writeText(cmd);
    setCopiedGitCmd(true);
    onNotify('دستورات گیت‌هاب کپی شد', 'آماده پیست در ترمینال جهت اجرای لوکال.');
    setTimeout(() => setCopiedGitCmd(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/45 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl glass-panel rounded-3xl p-5 sm:p-7 flex flex-col shadow-[0_24px_60px_rgba(24,24,27,0.22)] max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[22px]">rocket_launch</span>
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900">انتشار و اشتراک‌گذاری پروژه</h3>
              <p className="text-[11px] text-stone-500">مشاهده برای همه کاربران، اینستاگرام و استقرار مستقل</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="بستن"
            className="w-8 h-8 rounded-full bg-white/70 hover:bg-white text-stone-500 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 mt-4 p-1.5 rounded-2xl bg-stone-100/80 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('social')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'social'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span className="material-symbols-outlined text-[17px] text-rose-500">camera</span>
            <span>اینستاگرام و اشتراک</span>
          </button>

          <button
            onClick={() => setActiveTab('deploy')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'deploy'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span className="material-symbols-outlined text-[17px] text-emerald-600">public</span>
            <span>لینک عمومی و هاست</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'github'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span className="material-symbols-outlined text-[17px] text-stone-800">code</span>
            <span>گیت‌هاب و کد</span>
          </button>
        </div>

        {/* Tab 1: Instagram & Social Media */}
        {activeTab === 'social' && (
          <div className="flex flex-col gap-4 mt-5">
            {/* Public Link Notice */}
            <div className="p-3 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0 mt-0.5">verified_user</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-emerald-950">لینک عمومی اختصاصی (بدون نیاز به ورود به AI Studio)</span>
                <span className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                  هر کاربری که این لینک را باز کند، مستقیماً بدون نیاز به هیچ حساب یا لاگینی وارد سایت شما می‌شود.
                </span>
              </div>
            </div>

            {/* Instagram Story & Bio Card Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-white/80 p-4 bg-gradient-to-br from-amber-500/10 via-white/80 to-rose-500/10 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-xs font-bold text-stone-900">پیش‌نمایش کارت استوری و ریلز</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                  Instagram Ready
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden aspect-[16/9] shadow-md bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Villajah Preview"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-black/40 to-transparent flex flex-col justify-end p-4 text-right">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold w-fit mb-1">
                    ویلاجا • اثر امیر رحیم‌پور
                  </div>
                  <h4 className="text-white text-sm sm:text-base font-black">
                    پلتفرم اختصاصی رزرو عمارت‌ها و ویلاهای لوکس ایران
                  </h4>
                  <p className="text-stone-300 text-[11px] mt-0.5">
                    طراحی اختصاصی شیشه‌ای مات، رزرو پویا و سازگاری کامل موبایل
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Bio Link Copy */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-800">لینک مستقیم برای قرار دادن در بایو اینستاگرام و استوری:</label>
              <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel">
                <input
                  type="text"
                  readOnly
                  value={effectiveShareUrl}
                  className="flex-1 bg-transparent px-3 py-1 text-xs text-stone-700 outline-none font-mono text-left"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1 shrink-0"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedLink ? 'done' : 'content_copy'}
                  </span>
                  <span>{copiedLink ? 'کپی شد' : 'کپی لینک'}</span>
                </button>
              </div>
            </div>

            {/* Instagram Ready-Made Caption Box */}
            <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-200/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-amber-700">edit_note</span>
                  <span>کپشن آماده برای پست و ریلز اینستاگرام (با نام شما و آیدی گیت‌هاب):</span>
                </span>
                <button
                  onClick={handleCopyCaption}
                  className="px-3 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold shadow-xs transition-all active:scale-95 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedCaption ? 'done' : 'content_copy'}
                  </span>
                  <span>{copiedCaption ? 'کپی شد!' : 'کپی کپشن'}</span>
                </button>
              </div>
              <div className="mt-1.5 p-2.5 rounded-xl bg-white/90 border border-amber-100 font-sans text-[11px] text-stone-700 leading-relaxed max-h-24 overflow-y-auto no-scrollbar whitespace-pre-line text-right">
                {instagramCaption}
              </div>
            </div>

            {/* Social Share Shortcuts */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(effectiveShareUrl)}&text=${encodeURIComponent('پلتفرم اختصاصی رزرو لوکس‌ترین عمارت‌های ایران (ویلاجا) - اثر امیر رحیم‌پور')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs border border-sky-200/60 transition-colors"
              >
                <span className="material-symbols-outlined text-[17px]">send</span>
                <span>تلگرام</span>
              </a>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`ویلاجا | پلتفرم رزرو لوکس‌ترین عمارت‌ها اثر امیر رحیم‌پور: ${effectiveShareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200/60 transition-colors"
              >
                <span className="material-symbols-outlined text-[17px]">chat</span>
                <span>واتساپ</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(effectiveShareUrl)}&text=${encodeURIComponent('طراحی لوکس پلتفرم رزرو ویلاجا اثر امیر رحیم‌پور (@Amir-Rahimpour) با ری‌اکت ۱۹ و تیل‌ویند v4')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs border border-stone-200 transition-colors"
              >
                <span className="material-symbols-outlined text-[17px]">tag</span>
                <span>توییتر / X</span>
              </a>
            </div>
          </div>
        )}

        {/* Tab 2: Deploy & Public Hosting (Independent of AI Studio) */}
        {activeTab === 'deploy' && (
          <div className="flex flex-col gap-4 mt-5">
            {/* Option 1: Instant Live Public URL */}
            <div className="p-4 rounded-2xl bg-white/80 border border-white shadow-sm flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>گزینه ۱: لینک ابری عمومی زنده (آماده و فعال همین الان)</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  آماده استفاده
                </span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                این لینک مستقیماً روی کانتینر Google Cloud مستقر است و بدون نیاز به ورود به اکانت برای همه در دسترس است:
              </p>
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-stone-50 border border-stone-200/70">
                <input
                  type="text"
                  readOnly
                  value={PUBLIC_APP_URL}
                  className="flex-1 bg-transparent px-2 text-xs text-stone-800 outline-none font-mono text-left select-all"
                />
                <button
                  onClick={handleCopyPublicDirect}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1 shrink-0"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedPublicLink ? 'done' : 'content_copy'}
                  </span>
                  <span>{copiedPublicLink ? 'کپی شد' : 'کپی'}</span>
                </button>
              </div>
            </div>

            {/* Option 2: Deploy to Vercel (Recommended for custom domains & portfolio) */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-white/80 to-emerald-500/10 border border-white shadow-sm flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-amber-600">star</span>
                  <span>گزینه ۲: استقرار در ورسل (Vercel) با دامنه دلخواه رایگان</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
                  پیشنهاد ویژه
                </span>
              </div>
              <ol className="text-[11px] text-stone-600 space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>وارد <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-amber-800 underline font-bold">Vercel.com</a> شوید و با اکانت گیت‌هاب <strong className="text-stone-900">@Amir-Rahimpour</strong> لاگین کنید.</li>
                <li>روی دکمه <strong className="text-stone-900">Add New Project</strong> کلیک کرده و مخزن <strong className="text-stone-900">villajah-luxury-stay</strong> را انتخاب کنید.</li>
                <li>فایل تنظیمات <code className="bg-stone-100 px-1 rounded font-mono text-[10px]">vercel.json</code> از قبل آماده شده است. تنها با کلیک روی <strong className="text-emerald-700">Deploy</strong> در ۳۰ ثانیه سایت شما با دامنه دلخواه (مثلاً <span className="font-mono text-stone-800">villajah.vercel.app</span>) آماده و دائمی خواهد بود.</li>
              </ol>
            </div>

            {/* Option 3: GitHub Pages */}
            <div className="p-4 rounded-2xl bg-white/80 border border-white shadow-sm flex flex-col gap-2.5">
              <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-stone-700">terminal</span>
                <span>گزینه ۳: انتشار روی GitHub Pages</span>
              </span>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                فایل اکشنز خودکار <code className="bg-stone-100 px-1 rounded font-mono text-[10px]">.github/workflows/deploy.yml</code> به پروژه اضافه شد. کافیست در تنظیمات ریپازیتوری گیت‌هاب به بخش <strong className="text-stone-900">Settings &gt; Pages</strong> رفته و منبع را روی <strong className="text-stone-900">GitHub Actions</strong> بگذارید.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: GitHub Repository & Technical Overview */}
        {activeTab === 'github' && (
          <div className="flex flex-col gap-4 mt-5">
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-[11px] font-bold border border-cyan-200">
                React 19
              </span>
              <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-[11px] font-bold border border-sky-200">
                Tailwind CSS v4
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-[11px] font-bold border border-blue-200">
                TypeScript
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold border border-amber-200">
                Frosted Glass UI
              </span>
            </div>

            {/* Quick Clone & Run Terminal Snippet */}
            <div className="p-3.5 rounded-2xl bg-stone-900 text-stone-200 text-xs font-mono shadow-md flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <span className="text-[11px] text-stone-400">Terminal (کلون و اجرای سریع)</span>
                <button
                  onClick={handleCopyGit}
                  className="text-stone-300 hover:text-white flex items-center gap-1 text-[11px] bg-stone-800 hover:bg-stone-700 px-2 py-0.5 rounded-md transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedGitCmd ? 'done' : 'content_copy'}
                  </span>
                  <span>{copiedGitCmd ? 'کپی شد' : 'کپی'}</span>
                </button>
              </div>
              <div className="space-y-1 text-stone-300 text-[11px] select-all">
                <div className="text-amber-400"># دستورات کلون مخزن گیت‌هاب امیر رحیم‌پور:</div>
                <div>git clone https://github.com/Amir-Rahimpour/villajah-luxury-stay.git</div>
                <div>cd villajah-luxury-stay</div>
                <div>npm install</div>
                <div className="text-emerald-400">npm run dev</div>
              </div>
            </div>

            {/* Developer / Author Profile Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-white/80 to-rose-500/10 border border-white shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center font-black text-sm shadow-md">
                  ا.ر
                </div>
                <div className="flex flex-col text-right">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-stone-900">امیر رحیم‌پور</span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-100 text-amber-900 font-bold">
                      Author / Creator
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 font-mono mt-0.5">Amir Rahimpour (@Amir-Rahimpour)</span>
                </div>
              </div>

              <a
                href="https://github.com/Amir-Rahimpour"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1.5 shrink-0"
              >
                <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                <span>پروفایل گیت‌هاب</span>
              </a>
            </div>

            {/* Architecture Highlights */}
            <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-sm flex flex-col gap-2">
              <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-amber-600">verified</span>
                <span>ویژگی‌های کلیدی برای ارائه در گیتهاب و نمونه‌کار:</span>
              </h4>
              <ul className="text-stone-600 text-[11px] space-y-1.5 list-disc list-inside">
                <li>طراحی اختصاصی با نظام زیبایی‌شناسی Luminous Alabaster Living و شیشه‌ای کامل</li>
                <li>دو حالت نمایش همزمان: نمای تمام‌صفحه ریسپانسیو و قاب شبیه‌ساز اختصاصی آیفون ۱۶ پرو</li>
                <li>محاسبه‌گر پیشرفته و آنی هزینه اقامت با تفکیک شب‌ها، تخفیف، هزینه نظافت و صدور ووچر</li>
                <li>کاتالوگ تعاملی دوشاخه‌ای با نقشه ماهواره‌ای و فیلترهای سبک معماری و امکانات</li>
                <li>سیستم ذخیره‌سازی محلی (LocalStorage) برای علاقه‌مندی‌ها و تاریخچه رزروها</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
