# 🏰 ویلاجا (Villajah) | Luxury Stay & Villa Reservation Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Design](https://img.shields.io/badge/Design-Luminous_Glassmorphism-amber?style=flat-square)](#طراحی-بصری)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=flat-square)](LICENSE)

> پلتفرم اختصاصی رزرو لوکس‌ترین عمارت‌ها، ویلاهای استخردار و پنت‌هاوس‌های صخره‌ای ایران با سرویس تشریفات ۲۴ ساعته و زیبایی‌شناسی **Luminous Alabaster Glassmorphism**.

---

## 🌟 ویژگی‌های برجسته (Key Features)

- 💎 **طراحی تماماً شیشه‌ای لوکس (Full Frosted Glass Canvas):**
  - شکست نورهای رنگی و لایه‌های شیشه‌ای مات عمیق (`backdrop-blur-3xl saturate-180`)
  - گوی‌های نوری پویای شناور در پس‌زمینه با افکت پارالاکس سه‌بعدی هماهنگ با اسکرول
- 📱 **دو حالت نمایش اختصاصی (Dual Viewport Modes):**
  - **نمای ریسپانسیو دسکتاپ:** حذف هدر سراسری، ناوبری شناور در گوشه‌ها و داک کناری
  - **قاب گوشی موبایل اختصاصی:** شبیه‌ساز پرچمدار آیفون با Dynamic Island، دکمه‌های فیزیکی و نوارهای وضعیتی
- ⚡ **اسکرول نرم، روان و جذاب (Smooth Inertial Scrolling):**
  - نشانگر شیشه‌ای متحرک اسکرول به پایین در هیرو سکشن
  - ویجت همراه درصد زنده اسکرول و دکمه بازگشت نرم به بالای صفحه
  - پویانمایی ظهور مرحله‌ای و فیزیکی کارت‌ها (Scroll Reveal with Luxury Easing)
- 🗺️ **کاتالوگ تعاملی دوشاخه‌ای و نقشه ماهواره‌ای:**
  - فیلتر بر اساس سبک معماری (استخر آبگرم، ابر و جنگل، ساحلی صخره‌ای، رزرو آنی)
  - مرتب‌سازی بر اساس محبوبیت، امتیاز و قیمت
  - هماهنگی زنده پین‌های نقشه با کارت‌های اقامتگاه
- 🧾 **محاسبه‌گر هوشمند قیمت و صدور ووچر دیجیتال:**
  - تفکیک شب‌های اقامت، تخفیف میان‌هفته، هزینه نظافت و ضمانت بازگشت وجه
  - فرم اطلاعات مهمان، کد پیگیری اختصاصی و بارکد تحویل کلید
- 🔔 **سیستم اعلان‌ها و گفتگو با میزبان سوپرهوست:**
  - چت اختصاصی با میزبان عمارت با پیام‌های پاسخ آنی
  - مرکز اعلان‌های شیشه‌ای بدون استفاده از `alert` های سنتی مرورگر
- 💾 **ماندگاری کامل داده‌ها (LocalStorage Persistence):**
  - ذخیره‌سازی تاریخچه رزروها و عمارت‌های نشان‌شده

---

## 🚀 راهنمای نصب و اجرا (Quick Start)

### پیش‌نیازها
- Node.js نسخه 18 یا بالاتر
- npm یا pnpm یا yarn

```bash
# ۱. کلون کردن مخزن
git clone https://github.com/Amir-Rahimpour/villajah-luxury-stay.git

# ۲. ورود به دایرکتوری پروژه
cd villajah-luxury-stay

# ۳. نصب وابستگی‌ها
npm install

# ۴. اجرای سرور توسعه
npm run dev
```

پروژه به صورت پیش‌فرض روی پورت `3000` یا پورت آزاد بعدی اجرا خواهد شد.

### ساخت نسخه نهایی (Production Build)
```bash
npm run build
npm run preview
```

---

## 🏗️ ساختار پروژه (Project Structure)

```text
├── index.html                   # ورودی HTML، تایپوگرافی وزیرمتن و متاتگ‌های سئو و شبکه‌های اجتماعی
├── src/
│   ├── App.tsx                  # کنترلر اصلی نماها، مودال‌ها، ذخیره‌سازی محلی و حالت‌های ریسپانسیو
│   ├── components/
│   │   ├── GlassBackground.tsx   # بوم نوری شیشه‌ای پویا با ۴ گوی رنگی و پارالاکس اسکرول
│   │   ├── ScrollExperience.tsx # نشانگر ماوس اسکرول به پایین و دکمه درصدی شناور بازگشت به بالا
│   │   ├── Header.tsx           # هدر اصلی
│   │   ├── CornerDesktopHeader.tsx # هدرهای شناور گوشه در حالت دسکتاپ
│   │   ├── DesktopNavDock.tsx   # منوی قرصی شناور کناری دسکتاپ
│   │   ├── MobileHeader.tsx     # هدر اختصاصی موبایل با دکمه بازگشت و اعلان‌ها
│   │   ├── MobileBottomNav.tsx  # نوار ناوبری ۵ گزینه‌ای زیرین موبایل
│   │   ├── MobileFrameMockup.tsx# شاسی فیزیکی قاب موبایل با جزیره پویا
│   │   ├── HomeView.tsx         # صفحه اصلی شامل شاهکار هفته، دسته‌بندی‌ها و بنر تشریفات
│   │   ├── CatalogView.tsx      # کاتالوگ جامع با نقشه تعاملی و فیلترهای سبک اقامتگاه
│   │   ├── VillaDetailsView.tsx # دوسیه تفصیلی عمارت، گالری، مشخصات فنی و باکس رزرو
│   │   ├── BookingsView.tsx     # سوابق رزرو، ووچرهای صادره و بارکد ورود
│   │   ├── SavedVillasView.tsx  # فهرست عمارت‌های نشان‌شده و علاقه‌مندی‌ها
│   │   ├── ProfileView.tsx      # حساب کاربری مهمان و امتیازات باشگاه طلایی
│   │   ├── BookingModal.tsx     # مودال قطعی‌سازی رزرو و صدور فاکتور
│   │   ├── HostMessageModal.tsx # گفتگوی زنده با سوپرهوست
│   │   ├── FilterModal.tsx      # فیلتر دامنه قیمت و امکانات رفاهی
│   │   ├── NotificationsModal.tsx# مرکز اعلان‌های اختصاصی
│   │   ├── ShowcaseModal.tsx    # مودال اشتراک‌گذاری در اینستاگرام و گیت‌هاب
│   │   ├── Toast.tsx            # توست‌های شناور شیشه‌ای جایگزین آلرت مرورگر
│   │   └── Footer.tsx           # فوتر شیشه‌ای با لینک‌های ضمانت و بازگشت به بالا
│   ├── data/
│   │   └── villas.ts            # پایگاه داده عمارت‌های منتخب، تصاویر باکیفیت و هلپرها
│   ├── hooks/
│   │   └── useScrollReveal.ts   # هوک اسکرول نرم و IntersectionObserver
│   ├── types/
│   │   └── index.ts             # تعاریف تایپ‌های TypeScript
│   └── index.css                # تم تیل‌ویند v4، استایل‌های شیشه‌ای و انیمیشن‌ها
```

---

## 🎨 پالت رنگی و طراحی بصری (Design Tokens)

- **رنگ اصلی (Primary):** کهربایی گرم متالیک `#8D4B00` و `#B15F00`
- **پس‌زمینه مات (Glass Alabaster):** `rgba(255, 255, 255, 0.72)` با بلور `28px` و اشباع `190%`
- **حاشیه‌های شیشه‌ای (Glass Border):** `1px solid rgba(255, 255, 255, 0.85)`
- **تایپوگرافی:** وزیرمتن (`Vazirmatn`) برای متون فارسی و `Plus Jakarta Sans` برای اعداد و لاتین

---

## 📱 انتشار در شبکه‌های اجتماعی (Instagram & Social Media)

این پلتفرم به طور خاص برای ساخت تیزر، ریلز و استوری اینستاگرام و معرفی در بایو بهینه‌سازی شده است:
1. **دکمه اشتراک‌گذاری در اینستاگرام:** در گوشه بالای صفحه تعبیه شده و امکان کپی تک‌کلیکی لینک را فراهم می‌کند.
2. **پیش‌نمایش استوری استاندارد:** نسبت‌های بصری کارت‌ها کاملاً با ابعاد استوری ۹:۱۶ و پست ۴:۵ منطبق است.
3. **قاب موبایل جذاب:** برای ضبط ویدیو از روی دسکتاپ بدون نیاز به ابزارهای جانبی.

## 👨‍💻 سازنده و توسعه‌دهنده (Author & Creator)

طراحی، معماری فرانت‌اند و پیاده‌سازی کامل با ❤️ توسط **امیر رحیم‌پور** (**Amir Rahimpour**)
- **نام کاربری گیت‌هاب:** [@Amir-Rahimpour](https://github.com/Amir-Rahimpour)
- **مخزن پروژه:** [villajah-luxury-stay](https://github.com/Amir-Rahimpour/villajah-luxury-stay)
- **ایمیل ارتباطی:** [A.rahimpour1999@gmail.com](mailto:A.rahimpour1999@gmail.com)

---

## 📄 مجوز (License)

توسعه‌یافته تحت مجوز [Apache 2.0](LICENSE).
استفاده و توسعه آزاد برای پروژه‌های شخصی و پورتفولیو.
