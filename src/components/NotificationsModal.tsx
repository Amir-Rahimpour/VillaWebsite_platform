import React, { useState } from 'react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  iconBg: string;
  unread: boolean;
  category: 'booking' | 'offer' | 'system';
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'تخفیف ویژه میان‌هفته کلاردشت',
    message: 'کد تخفیف ۱۵ درصدی اختصاصی برای رزرو عمارت‌های کلاردشت در روزهای یکشنبه تا چهارشنبه فعال شد.',
    time: '۱۰ دقیقه پیش',
    icon: 'local_offer',
    iconBg: 'bg-rose-500 text-white',
    unread: true,
    category: 'offer',
  },
  {
    id: 'notif-2',
    title: 'ووچر رسمی عمارت کردان صادر شد',
    message: 'رزرو اقامتگاه پانورامای کردان نهایی گردید. بارکد تحویل کلید و لوکیشن در بخش سفرهای من در دسترس است.',
    time: '۲ ساعت پیش',
    icon: 'key',
    iconBg: 'bg-amber-600 text-white',
    unread: true,
    category: 'booking',
  },
  {
    id: 'notif-3',
    title: 'عضویت در باشگاه طلایی ویلاجا',
    message: 'به سبب رزرو موفق اخیر، حساب شما به سطح VIP Gold ارتقا یافت. از ترانسفر رایگان فرودگاهی بهره‌مند شوید.',
    time: 'دیروز',
    icon: 'workspace_premium',
    iconBg: 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-white',
    unread: false,
    category: 'system',
  },
];

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExplore: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onExplore,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'booking' | 'offer'>('all');

  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const filtered = notifications.filter(
    (n) => filter === 'all' || n.category === filter
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg glass-panel rounded-3xl p-5 sm:p-6 flex flex-col shadow-[0_24px_60px_rgba(24,24,27,0.18)] max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/60">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100/90 text-amber-900 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">notifications_active</span>
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900">اعلان‌ها و پیام‌ها</h3>
              <p className="text-[11px] text-stone-500">به‌روزرسانی‌های اختصاصی اقامت‌های شما</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllRead}
              className="text-[11px] text-amber-700 hover:text-amber-800 font-bold px-2 py-1 rounded-lg hover:bg-amber-50/80 transition-colors"
            >
              خوانده‌شدن همه
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/70 hover:bg-white text-stone-500 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 py-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white/60 text-stone-600 hover:bg-white/80'
            }`}
          >
            همه اعلان‌ها
          </button>
          <button
            onClick={() => setFilter('booking')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === 'booking'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white/60 text-stone-600 hover:bg-white/80'
            }`}
          >
            رزروها و کلید
          </button>
          <button
            onClick={() => setFilter('offer')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === 'offer'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white/60 text-stone-600 hover:bg-white/80'
            }`}
          >
            تخفیف‌ها و پیشنهادها
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex flex-col gap-2.5 overflow-y-auto pr-1 no-scrollbar my-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                item.unread
                  ? 'bg-white/90 border-amber-200/80 shadow-[0_4px_16px_rgba(217,119,6,0.06)]'
                  : 'bg-white/50 border-white/60 opacity-80'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 shadow-sm mt-0.5`}>
                  <span className="material-symbols-outlined text-[19px]">{item.icon}</span>
                </div>
                <div className="flex-1 flex flex-col text-right">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-stone-900">{item.title}</span>
                    <span className="text-[10px] text-stone-400 font-medium">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">{item.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Action */}
        <div className="pt-3 mt-auto border-t border-stone-200/60 flex items-center justify-between">
          <span className="text-[11px] text-stone-500">پشتیبانی تشریفات: ۲۴ ساعته</span>
          <button
            onClick={() => {
              onClose();
              onExplore();
            }}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
          >
            کاوش عمارت‌ها
          </button>
        </div>
      </div>
    </div>
  );
};
