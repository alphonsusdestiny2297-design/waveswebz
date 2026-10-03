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
  const [isAtSlider, setIsAtSlider] = useState(true);

  // Theme management: default to system preference or saved preference
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('waves_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch {
      // safe fallback
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    try {
      localStorage.setItem('waves_theme', theme);
    } catch {
      // safe fallback
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

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

  // Track scroll position to remove navbar ONLY on PC / desktop versions (>= 768px)
  useEffect(() => {
    const handleScroll = () => {
      // Mobile devices (< 768px) use the web before this feature (navbar is never removed on mobile)
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setIsAtSlider(false);
        return;
      }
      if (currentPage !== 'home') {
        setIsAtSlider(false);
        return;
      }
      // When PC user is viewing the slider (top 60% of viewport height)
      const threshold = (window.innerHeight || 800) * 0.6;
      const atTop = window.scrollY < threshold;
      setIsAtSlider(atTop);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentPage]);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'home' && typeof window !== 'undefined' && window.innerWidth >= 768) {
      setIsAtSlider(true);
    } else {
      setIsAtSlider(false);
    }
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

  // Liquid Glass interactive cursor/touch illumination
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent | TouchEvent) => {
      const p = 'touches' in e ? e.touches[0] : (e as PointerEvent);
      if (!p) return;
      const glassElements = document.querySelectorAll<HTMLElement>('.wv-glass, .gold-card, .contact-gold-card, .site-sidebar');
      glassElements.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (p.clientX >= r.left - 60 && p.clientX <= r.right + 60 && p.clientY >= r.top - 60 && p.clientY <= r.bottom + 60) {
          el.style.setProperty('--mx', `${p.clientX - r.left}px`);
          el.style.setProperty('--my', `${p.clientY - r.top}px`);
        }
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  const hideNavbarOnSlider = currentPage === 'home' && isAtSlider;

  return (
    <div className="wv-body min-h-screen bg-[var(--wv-bg)] text-[var(--wv-text)] font-sans antialiased selection:bg-[#22E4FF]/30 selection:text-white flex flex-col justify-between relative overflow-x-hidden">
      
      {/* Background Colour Washes (Glass needs vibrant luminous colour behind it) */}
      <div className="wv-bg" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>

      {/* Sidebar Navbar (Smoothly hides when at slider to give the full picture) */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenQuote={() => handleOpenQuote()}
        hideNavbar={hideNavbarOnSlider}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area: in full-slider-mode, margin-left is 0 for an uncompromised full picture */}
      <div className={`site-main flex-1 flex flex-col justify-between ${hideNavbarOnSlider ? 'full-slider-mode' : ''}`}>
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
