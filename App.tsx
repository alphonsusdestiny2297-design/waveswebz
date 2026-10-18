/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuoteRequest from './components/QuoteRequest';
import Assistant from './components/Assistant';
import FloatingActions from './components/FloatingActions';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import JourneyPage from './pages/JourneyPage';
import ServicesPage from './pages/ServicesPage';
import ProcessPage from './pages/ProcessPage';
import AIPage from './pages/AIPage';
import ContactPage from './pages/ContactPage';
import { PageId, ServiceLevelId } from './types';
import { OfflineIndicator } from './components/OfflineIndicator';

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<ServiceLevelId>('growth');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Sync with browser history and hash routing on mount
  useEffect(() => {
    const parsePageFromHash = (): PageId => {
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      const path = window.location.pathname.replace(/^\//, '').split('/')[0].trim();
      const validPages: PageId[] = ['home', 'about', 'journey', 'services', 'process', 'ai', 'contact'];
      if (validPages.includes(hash as PageId)) {
        return hash as PageId;
      }
      if (validPages.includes(path as PageId)) {
        return path as PageId;
      }
      return 'home';
    };

    setCurrentPage(parsePageFromHash());

    const handlePopState = () => {
      setCurrentPage(parsePageFromHash());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState(null, '', `#/${page}`);
    } catch {
      // Safe fallback in restricted iframe environments
    }
  };

  const handleOpenQuote = (levelId?: ServiceLevelId) => {
    if (levelId) setSelectedLevel(levelId);
    setIsQuoteOpen(true);
  };

  // Liquid Glass interactive cursor/touch illumination (Optimized with requestAnimationFrame for 60-120fps efficiency)
  useEffect(() => {
    let animationFrameId: number | null = null;
    let latestPointer: { x: number; y: number } | null = null;

    const updateGlow = () => {
      if (!latestPointer) return;
      const { x, y } = latestPointer;
      const glassElements = document.querySelectorAll<HTMLElement>('.glass, .card, .wv-glass, .gold-card');
      glassElements.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (x >= r.left - 60 && x <= r.right + 60 && y >= r.top - 60 && y <= r.bottom + 60) {
          el.style.setProperty('--mx', `${x - r.left}px`);
          el.style.setProperty('--my', `${y - r.top}px`);
        }
      });
      animationFrameId = null;
    };

    const handlePointerMove = (e: PointerEvent | TouchEvent) => {
      const p = 'touches' in e ? e.touches[0] : (e as PointerEvent);
      if (!p) return;
      latestPointer = { x: p.clientX, y: p.clientY };
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateGlow);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <div className="wv-body min-h-screen text-[var(--wv-text)] font-sans antialiased selection:bg-[#2F7BFF]/30 selection:text-white flex flex-col justify-between relative overflow-x-hidden">
      
      {/* Top Floating Glass Navigation Bar (from uploaded UI) */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Main Content Area */}
      <div className="site-main flex-1 flex flex-col justify-between w-full">
        <main className="flex-1 flex flex-col">
          <div key={currentPage} className="page-view-fade flex-1 flex flex-col">
            {currentPage === 'home' && (
              <HomePage 
                onNavigate={navigateTo}
                onOpenQuote={handleOpenQuote}
                onOpenChat={() => setIsChatOpen(true)}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage 
                onOpenQuote={() => handleOpenQuote()}
              />
            )}

            {currentPage === 'journey' && (
              <JourneyPage 
                onOpenQuote={() => handleOpenQuote()}
              />
            )}

            {currentPage === 'services' && (
              <ServicesPage 
                onOpenQuote={handleOpenQuote}
              />
            )}

            {currentPage === 'process' && (
              <ProcessPage 
                onOpenQuote={() => handleOpenQuote()}
              />
            )}

            {currentPage === 'ai' && (
              <AIPage 
                onOpenChat={() => setIsChatOpen(true)}
                onOpenQuote={() => handleOpenQuote()}
              />
            )}

            {currentPage === 'contact' && (
              <ContactPage />
            )}
          </div>
        </main>

        {/* Global Footer */}
        <Footer 
          onNavigate={navigateTo}
          onOpenQuote={() => handleOpenQuote()}
        />
      </div>

      {/* Floating Action Buttons: WhatsApp & Get a Quote */}
      <FloatingActions 
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Interactive Quote Request Modal */}
      <QuoteRequest 
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialLevel={selectedLevel}
      />

      {/* Waves AI Website Concierge & Quote Assistant */}
      <Assistant 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpen={() => setIsChatOpen(true)}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* PWA Offline Connectivity Indicator */}
      <OfflineIndicator />

    </div>
  );
}

export default App;
