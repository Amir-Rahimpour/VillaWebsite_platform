import React, { useEffect } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="assertive"
      className="fixed top-5 inset-x-0 z-[100] flex flex-col items-center pointer-events-none px-4 gap-2.5 transition-all"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return { name: 'check_circle', color: 'text-emerald-600 bg-emerald-100/80' };
      case 'warning':
        return { name: 'priority_high', color: 'text-amber-600 bg-amber-100/80' };
      default:
        return { name: 'info', color: 'text-blue-600 bg-blue-100/80' };
    }
  };

  const iconInfo = getIcon();

  return (
    <div className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl glass-panel shadow-[0_16px_40px_rgba(24,24,27,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] border border-white/90 max-w-md w-full animate-in fade-in slide-in-from-top-3 duration-300">
      <div className={`w-8 h-8 rounded-xl ${iconInfo.color} flex items-center justify-center shrink-0 shadow-sm`}>
        <span className="material-symbols-outlined text-[19px]">{iconInfo.name}</span>
      </div>

      <div className="flex flex-col flex-1 text-right">
        <span className="text-xs font-bold text-stone-900 leading-snug">{toast.title}</span>
        {toast.description && (
          <span className="text-[11px] text-stone-600 font-medium leading-normal mt-0.5">
            {toast.description}
          </span>
        )}
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="بستن اعلان"
        className="text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100/60 transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};
