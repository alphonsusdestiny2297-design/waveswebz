/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenQuote?: () => void;
  hideNavbar?: boolean;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

const MIN_WIDTH = 64; // Collapsible down until only the logos show
const MAX_WIDTH = 380;
const DEFAULT_WIDTH = 230;
const COLLAPSE_THRESHOLD = 138;

interface NavItem {
  id: PageId;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  hideNavbar = false,
  theme = 'dark',
  onToggleTheme
}) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('waves_sidebar_width');
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val) && val >= MIN_WIDTH && val <= MAX_WIDTH) {
          return val;
        }
      }
    } catch {
      // safe fallback
    }
    return DEFAULT_WIDTH;
  });

  const [isDragging, setIsDragging] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  // Lock body scroll and listen for Escape when mobile drawer is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Sync with CSS variable --nav-w
  useEffect(() => {
    document.documentElement.style.setProperty('--nav-w', `${sidebarWidth}px`);
    try {
      localStorage.setItem('waves_sidebar_width', sidebarWidth.toString());
    } catch {
      // safe fallback
    }
  }, [sidebarWidth]);

  // Pointer drag handler for resizing
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const calculatedWidth = Math.min(Math.max(clientX, MIN_WIDTH), MAX_WIDTH);
      setSidebarWidth(calculatedWidth);
    };

    const handlePointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    if (isDragging) {
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging]);

  const handleStartDrag = (e: React.PointerEvent | React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Nav Items with Custom Designed Luxury Gold SVG Logos
  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: (active) => (
        <svg 
          className={`w-5 h-5 shrink-0 transition-colors ${active ? 'text-[#22E4FF] drop-shadow-[0_0_8px_#22E4FF]' : 'text-[#A9BBDA] group-hover:text-[#22E4FF]'}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={1.8}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5v9.75a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 20.25V10.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9" />
        </svg>
      )
    },
    {
      id: 'about',
      label: 'Digital Home',
      icon: (active) => (
        <svg 
          className={`w-5 h-5 shrink-0 transition-colors ${active ? 'text-[#22E4FF] drop-shadow-[0_0_8px_#22E4FF]' : 'text-[#A9BBDA] group-hover:text-[#22E4FF]'}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={1.8}
        >
          {/* Classical architecture pillar / digital home foundation crest */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 18h16M5 7l7-4 7 4M6 7v11M10 7v11M14 7v11M18 7v11" />
        </svg>
      )
    },
    {
      id: 'journey',
      label: 'Customer Journey',
      icon: (active) => (
        <svg 
          className={`w-5 h-5 shrink-0 transition-colors ${active ? 'text-[#22E4FF] drop-shadow-[0_0_8px_#22E4FF]' : 'text-[#A9BBDA] group-hover:text-[#22E4FF]'}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={1.8}
        >
          {/* Journey compass beacon & milestone path */}
          <circle cx="12" cy="12" r="9" />
          <polygon points="12 8 15 15 12 13 9 15 12 8" fill="currentColor" fillOpacity={active ? 0.3 : 0.2} />
        </svg>
      )
    },
    {
      id: 'services',
      label: 'Service Levels',
      icon: (active) => (
        <svg 
          className={`w-5 h-5 shrink-0 transition-colors ${active ? 'text-[#22E4FF] drop-shadow-[0_0_8px_#22E4FF]' : 'text-[#A9BBDA] group-hover:text-[#22E4FF]'}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={1.8}
        >
          {/* Tier layers / stacked diamonds */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 17l10 5 10-5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 12l10 5 10-5" />
        </svg>
      )
    },
    {
      id: 'process',
      label: 'How It Works',
      icon: (active) => (
        <svg 
          className={`w-5 h-5 shrink-0 transition-colors ${active ? 'text-[#22E4FF] drop-shadow-[0_0_8px_#22E4FF]' : 'text-[#A9BBDA] group-hover:text-[#22E4FF]'}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={1.8}
        >
          {/* Workflow nodes & sequential precision gear */}
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 8.5l7 7M6 9v9h9" />
        </svg>
      )
    },
    {
      id: 'ai',
      label: 'AI Modules',
      icon: (active) => (
        <svg 
          className={`w-5 h-5 shrink-0 transition-colors ${active ? 'text-[#22E4FF] drop-shadow-[0_0_8px_#22E4FF]' : 'text-[#A9BBDA] group-hover:text-[#22E4FF]'}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={1.8}
        >
          {/* Neural sparkle intellect chip */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      )
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: (active) => (
        <svg 
          className={`w-5 h-5 shrink-0 transition-colors ${active ? 'text-[#22E4FF] drop-shadow-[0_0_8px_#22E4FF]' : 'text-[#A9BBDA] group-hover:text-[#22E4FF]'}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={1.8}
        >
          {/* Luxury letter seal / correspondence envelope */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      )
    },
  ];

  const handleNavClick = (page: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  // Determine if collapsed to icon-only mode
  const isIconOnly = sidebarWidth < COLLAPSE_THRESHOLD;

  return (
    <>
      {/* ============================================================
          MOBILE STICKY TOPBAR WITH ACCESSIBLE HAMBURGER (< 768px)
          Always visible on mobile as requested
         ============================================================ */}
      <header className="md:hidden sticky top-0 left-0 right-0 z-40 bg-[#040914]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.18)] px-4 py-3 flex items-center justify-between shadow-lg">
        {/* Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[#22E4FF] hover:text-[#fff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22E4FF] rounded-lg transition-colors"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="text-xl font-display focus:outline-none"
        >
          <span className="font-display font-black uppercase tracking-[0.16em] neon-text inline-block">waves</span>
        </button>

        {/* Right side: Theme toggle and mobile subtitle tag */}
        <div className="flex items-center gap-2.5">
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-1.5 rounded-lg border border-[var(--wv-glass-border)] bg-[rgba(255,255,255,0.08)] text-[var(--wv-cyan)] hover:bg-[rgba(34,228,255,0.15)] transition-colors"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? (
                <svg className="w-4 h-4 text-[#0077B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[#22E4FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          )}
          <span className="text-[10px] tracking-widest uppercase text-[var(--wv-cyan)] font-mono">
            Liquid Glass
          </span>
        </div>
      </header>

      {/* ============================================================
          MOBILE SLIDE-OUT DRAWER OVERLAY (< 768px)
         ============================================================ */}
      <div 
        className={`fixed inset-0 z-50 md:hidden bg-black/75 backdrop-blur-md transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 left-0 w-4/5 max-w-xs h-full bg-[#040914]/95 border-r border-[rgba(255,255,255,0.22)] shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-5 border-b border-[rgba(255,255,255,0.18)]">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className="text-2xl font-display text-left focus:outline-none"
              >
                <span className="font-display font-black uppercase tracking-[0.16em] neon-text inline-block">waves</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#A9BBDA] hover:text-[#22E4FF] transition-colors rounded-lg"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Nav Links with Logos */}
            <nav className="flex flex-col space-y-2 py-6">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-3.5 py-3 rounded-lg text-sm transition-colors flex items-center gap-3 ${
                      isActive 
                        ? 'bg-[rgba(34,228,255,0.14)] text-[#F2F7FF] border-l-2 border-[#22E4FF] font-semibold' 
                        : 'text-[#A9BBDA] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F2F7FF]'
                    }`}
                  >
                    {item.icon(isActive)}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-[rgba(255,255,255,0.15)] flex flex-col gap-4 text-center">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-[var(--wv-glass-border)] bg-[rgba(255,255,255,0.06)] text-[var(--wv-text)] text-xs font-mono tracking-wider uppercase transition-colors"
              >
                {theme === 'light' ? (
                  <>
                    <svg className="w-4 h-4 text-[#0077B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>Switch to Dark Mode</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-[#22E4FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span>Switch to Light Mode</span>
                  </>
                )}
              </button>
            )}

            <p className="text-[11px] tracking-widest uppercase text-[#A9BBDA]/75 font-mono leading-relaxed">
              Your Business. <br />
              <span className="text-[#22E4FF]">Your Digital Home.</span>
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================
          DESKTOP RESIZABLE SIDEBAR (>= 768px)
          Resizable down to 64px (icon-only logo mode)
         ============================================================ */}
      <aside 
        ref={sidebarRef}
        className={`site-sidebar hidden md:flex ${isIconOnly ? 'icon-only' : ''} ${
          hideNavbar ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'
        } transition-all duration-500 ease-out`}
        style={{ width: `${sidebarWidth}px` }}
      >
        {/* Drag handle for resizing */}
        <div
          className={`drag-handle ${isDragging ? 'active' : ''}`}
          onMouseDown={handleStartDrag}
          onTouchStart={handleStartDrag}
          role="separator"
          aria-orientation="vertical"
          aria-label="Drag horizontally to resize navigation sidebar"
          title={`Drag to resize (${sidebarWidth}px). Drag left for icon-only mode.`}
        />

        {/* Top brand */}
        <div className="w-full">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`nav-brand text-left block focus:outline-none w-full ${isIconOnly ? 'mb-6 text-center' : 'mb-8'}`}
            aria-label="Waves Home"
            title="Waves Home"
          >
            {isIconOnly ? (
              <span className="font-display font-black uppercase tracking-wider neon-text inline-block text-2xl">w</span>
            ) : (
              <span className="font-display font-black uppercase tracking-[0.16em] neon-text inline-block text-3xl">waves</span>
            )}
          </button>

          {/* Navigation links with logos */}
          <nav className="nav-links">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`nav-btn group relative ${isActive ? 'active' : ''} ${isIconOnly ? 'justify-center px-0' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  title={item.label}
                >
                  {/* SVG Logo */}
                  {item.icon(isActive)}

                  {/* Text Label (shown when width >= 138px) */}
                  {!isIconOnly && (
                    <span className="truncate">{item.label}</span>
                  )}

                  {/* Tooltip on Icon-Only Mode */}
                  {isIconOnly && (
                    <span className="pointer-events-none absolute left-full ml-3 z-50 whitespace-nowrap rounded-md bg-[#040914] px-2.5 py-1 text-xs text-[#F2F7FF] border border-[rgba(34,228,255,0.4)] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar footer with Theme Toggle & tagline */}
        <div className={`pt-4 border-t border-[rgba(255,255,255,0.15)] w-full flex flex-col gap-3.5 ${isIconOnly ? 'items-center' : ''}`}>
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all font-mono text-xs border border-[var(--wv-glass-border)] bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(34,228,255,0.12)] text-[var(--wv-text)] hover:text-[var(--wv-cyan)] ${
                isIconOnly ? 'p-2 justify-center' : 'w-full justify-start'
              }`}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? (
                <>
                  <svg className="w-4 h-4 text-[#0077B6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {!isIconOnly && <span className="font-semibold truncate">Light Mode</span>}
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-[#22E4FF] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  {!isIconOnly && <span className="font-semibold truncate">Dark Mode</span>}
                </>
              )}
            </button>
          )}

          {isIconOnly ? (
            <span className="text-[#22E4FF] text-xs font-mono block">●</span>
          ) : (
            <p className="text-[11px] tracking-widest uppercase text-[#A9BBDA]/75 font-mono leading-relaxed">
              Your Business. <br />
              <span className="text-[#22E4FF]">Your Digital Home.</span>
            </p>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
