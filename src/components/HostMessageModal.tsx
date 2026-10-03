import React, { useState } from 'react';
import { Villa } from '../types';

interface HostMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  villa: Villa;
}

export const HostMessageModal: React.FC<HostMessageModalProps> = ({
  isOpen,
  onClose,
  villa,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'host'; text: string; time: string }>>([
    {
      sender: 'host',
      text: `درود و احترام، بنده ${villa.host.name} هستم. آماده پاسخگویی به هرگونه سوال درباره امکانات، تشریفات و اقامت در ${villa.titleFa} می‌باشم.`,
      time: 'هم‌اکنون',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const now = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { sender: 'user', text: userText, time: now }]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'host',
          text: 'پیام شما دریافت شد. سیستم گرمایش استخر و تشریفات اختصاصی پیش از ورود شما کاملاً آماده و تنظیم خواهند بود.',
          time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-2xl flex flex-col h-[520px] shadow-2xl border border-white overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Host Header */}
        <div className="p-4 bg-amber-50/80 border-b border-amber-200/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={villa.host.avatar}
                alt={villa.host.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-400/50 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-sm font-bold text-stone-900">{villa.host.name}</span>
              <span className="text-[11px] text-amber-800 font-semibold">{villa.host.title}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-stone-600 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5]/50 flex flex-col">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[80%] ${
                msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-600 text-white rounded-br-none shadow-sm'
                    : 'bg-white border border-stone-200 text-stone-800 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-stone-400 mt-1 px-1">{msg.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="self-start flex items-center gap-1.5 p-2.5 rounded-2xl bg-white border border-stone-200 text-stone-500 text-xs shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[10px] mr-1">میزبان در حال نوشتن...</span>
            </div>
          )}
        </div>

        {/* Input Field */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="پیام خود را برای میزبان بنویسید..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-600 text-xs"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px] rtl:rotate-180">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
