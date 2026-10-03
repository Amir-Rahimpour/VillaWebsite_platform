import React, { useState, useEffect } from 'react';
import { Villa, ActivePage, ViewportMode, BookingDetails } from './types';
import { VILLAS } from './data/villas';
import { CornerDesktopHeader } from './components/CornerDesktopHeader';
import { MobileHeader } from './components/MobileHeader';
import { DesktopNavDock } from './components/DesktopNavDock';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileFrameMockup } from './components/MobileFrameMockup';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { VillaDetailsView } from './components/VillaDetailsView';
import { BookingsView } from './components/BookingsView';
import { SavedVillasView } from './components/SavedVillasView';
import { ProfileView } from './components/ProfileView';
import { BookingModal } from './components/BookingModal';
import { FilterModal } from './components/FilterModal';
import { HostMessageModal } from './components/HostMessageModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ShowcaseModal } from './components/ShowcaseModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';
import { GlassBackground } from './components/GlassBackground';
import { FloatingScrollCompanion } from './components/ScrollExperience';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [activeVilla, setActiveVilla] = useState<Villa>(VILLAS[0]);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('responsive');

  // Modals state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isHostChatOpen, setIsHostChatOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, description, type }]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const [bookingParams, setBookingParams] = useState({
    nights: 3,
    guests: 4,
    checkInDate: 'پنجشنبه، ۱۵ آذر',
    checkOutDate: 'یکشنبه، ۱۸ آذر',
  });

  // Saved/Bookmarked villas
  const [savedVillaIds, setSavedVillaIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('villajah_saved');
      return saved ? new Set(JSON.parse(saved)) : new Set(['kordan-lunar-oasis']);
    } catch {
      return new Set(['kordan-lunar-oasis']);
    }
  });

  // Confirmed bookings list
  const [bookings, setBookings] = useState<BookingDetails[]>(() => {
    try {
      const saved = localStorage.getItem('villajah_bookings');
      return saved
        ? JSON.parse(saved)
        : [
            {
              villaId: 'kordan-lunar-oasis',
              villaName: 'عمارت پانورامای کردان (لونار)',
              villaLocation: 'کردان، کوهسار، انتهای بلوار کاج، شهرک ویلایی افق',
              checkInDate: 'پنجشنبه، ۱۵ آذر',
              checkOutDate: 'یکشنبه، ۱۸ آذر',
              nights: 3,
              guests: 4,
              nightlyRate: 14500000,
              cleaningFee: 1200000,
              discount: 4350000,
              totalPrice: 40350000,
              guestName: 'امیر رحیم‌پور',
              guestPhone: '۰۹۱۲۳۴۵۶۷۸۹',
              bookingCode: 'VJ-9820-RES',
              createdAt: '۱۴۰۳/۰۸/۲۴',
            },
          ];
    } catch {
      return [];
    }
  });

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('villajah_saved', JSON.stringify(Array.from(savedVillaIds)));
    } catch {}
  }, [savedVillaIds]);

  // Persist bookings
  useEffect(() => {
    try {
      localStorage.setItem('villajah_bookings', JSON.stringify(bookings));
    } catch {}
  }, [bookings]);

  const handleToggleSave = (villaId: string) => {
    setSavedVillaIds((prev) => {
      const next = new Set(prev);
      if (next.has(villaId)) {
        next.delete(villaId);
        showToast('از نشان‌شده‌ها حذف شد', 'عمارت از لیست منتخب شما برداشته شد.', 'info');
      } else {
        next.add(villaId);
        showToast('به نشان‌شده‌ها اضافه شد', 'می‌توانید در برگه نشان‌ها آن را مرور نمایید.', 'success');
      }
      return next;
    });
  };

  const handleSelectVilla = (villa: Villa) => {
    setActiveVilla(villa);
    setActivePage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (nights: number, guests: number, checkInDate: string, checkOutDate: string) => {
    setBookingParams({ nights, guests, checkInDate, checkOutDate });
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirmed = (newBooking: BookingDetails) => {
    setBookings((prev) => [newBooking, ...prev]);
    showToast('رزرو شما با موفقیت قطعی شد!', `کد پیگیری ووچر: ${newBooking.bookingCode}`, 'success');
  };

  const handleOpenNotifications = () => {
    setIsNotificationsOpen(true);
  };

  const handleOpenShowcase = () => {
    setIsShowcaseOpen(true);
  };

  // Render core views
  const renderCurrentView = (isInsideFrame = false) => {
    switch (activePage) {
      case 'home':
        return (
          <HomeView
            villas={VILLAS}
            onSelectVilla={handleSelectVilla}
            setActivePage={setActivePage}
            savedVillaIds={savedVillaIds}
            onToggleSave={handleToggleSave}
            onNotify={showToast}
            onOpenShowcase={handleOpenShowcase}
          />
        );
      case 'catalog':
        return (
          <CatalogView
            villas={VILLAS}
            onSelectVilla={handleSelectVilla}
            setActivePage={setActivePage}
            savedVillaIds={savedVillaIds}
            onToggleSave={handleToggleSave}
            onOpenFilterModal={() => setIsFilterModalOpen(true)}
            isInsideFrame={isInsideFrame}
          />
        );
      case 'details':
        return (
          <VillaDetailsView
            villa={activeVilla}
            onOpenBookingModal={handleOpenBooking}
            onOpenHostChat={() => setIsHostChatOpen(true)}
            savedVillaIds={savedVillaIds}
            onToggleSave={handleToggleSave}
            onBack={() => setActivePage('catalog')}
            isInsideFrame={isInsideFrame}
          />
        );
      case 'bookings':
        return (
          <BookingsView
            bookings={bookings}
            onExplore={() => setActivePage('catalog')}
          />
        );
      case 'saved':
        return (
          <SavedVillasView
            villas={VILLAS}
            savedVillaIds={savedVillaIds}
            onSelectVilla={handleSelectVilla}
            onToggleSave={handleToggleSave}
            onExplore={() => setActivePage('catalog')}
          />
        );
      case 'profile':
        return <ProfileView onExplore={() => setActivePage('catalog')} onNotify={showToast} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-[#1B1B1E] flex flex-col relative selection:bg-amber-500 selection:text-white overflow-x-hidden">
      {/* Full Frosted Glass Crystalline Canvas with Ambient Shifting Lights */}
      <GlassBackground />

      {/* Mode 1: Dedicated Smartphone Mockup Frame */}
      {viewportMode === 'mobile-mockup' ? (
        <MobileFrameMockup
          activePage={activePage}
          setActivePage={setActivePage}
          activeVilla={activeVilla}
          setViewportMode={setViewportMode}
          onOpenNotifications={handleOpenNotifications}
          onOpenShowcase={handleOpenShowcase}
        >
          {renderCurrentView(true)}
        </MobileFrameMockup>
      ) : (
        /* Mode 2: Responsive Mode */
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* On Desktop: Top header bar is REMOVED from the top; navigation is kept floating in the corners! */}
          <div className="hidden md:block">
            <CornerDesktopHeader
              activePage={activePage}
              setActivePage={setActivePage}
              viewportMode={viewportMode}
              setViewportMode={setViewportMode}
              onOpenNotifications={handleOpenNotifications}
              onOpenShowcase={handleOpenShowcase}
            />

            {/* Desktop Floating Right Navigation Dock */}
            <DesktopNavDock
              activePage={activePage}
              setActivePage={setActivePage}
              onOpenNotifications={handleOpenNotifications}
            />
          </div>

          {/* On Real Mobile Screen (< md): Native Mobile Header fixed at top */}
          <div className="block md:hidden">
            <MobileHeader
              activePage={activePage}
              setActivePage={setActivePage}
              villaTitle={activeVilla.titleFa}
              onOpenNotifications={handleOpenNotifications}
              onBack={() => setActivePage('catalog')}
            />
          </div>

          {/* Main Viewport Content */}
          <main className="flex-1 w-full pt-16 md:pt-8 xl:pr-24">
            {renderCurrentView(false)}
          </main>

          {/* Mobile Bottom Navigation Bar (Visible on mobile viewports only) */}
          <div className="block md:hidden">
            <MobileBottomNav activePage={activePage} setActivePage={setActivePage} />
          </div>

          {/* Footer (On responsive desktop view) */}
          <div className="hidden md:block">
            <Footer onNotify={showToast} />
          </div>
        </div>
      )}

      {/* Global Modals */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        villa={activeVilla}
        nights={bookingParams.nights}
        guests={bookingParams.guests}
        checkInDate={bookingParams.checkInDate}
        checkOutDate={bookingParams.checkOutDate}
        onBookingConfirmed={handleBookingConfirmed}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={({ maxPrice, amenities }) => {
          showToast('فیلترها اعمال شد', `حداکثر ${maxPrice.toLocaleString('fa-IR')} تومان و ${amenities.length} امکان رفاهی.`);
        }}
        totalResultsCount={VILLAS.length}
      />

      <HostMessageModal
        isOpen={isHostChatOpen}
        onClose={() => setIsHostChatOpen(false)}
        villa={activeVilla}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onExplore={() => {
          setIsNotificationsOpen(false);
          setActivePage('catalog');
        }}
      />

      <ShowcaseModal
        isOpen={isShowcaseOpen}
        onClose={() => setIsShowcaseOpen(false)}
        onNotify={showToast}
      />

      {/* Floating Glass Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Floating Glass Scroll Progress & Back-to-Top Companion */}
      <FloatingScrollCompanion />
    </div>
  );
}
