/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { WavesLogo } from './WavesLogo';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenQuote?: () => void;
}

interface NavLink {
  id: PageId;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'journey', label: 'Journey' },
  { id: 'process', label: 'Process' },
  { id: 'ai', label: 'WhatsApp AI' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  onOpenQuote
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll and listen for Escape when mobile menu is open
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

  const handlePageClick = (pageId: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full relative z-30 pt-4 px-4 sm:px-6">
      <div className="wrap">
        <nav className="top glass" aria-label="Main Navigation">
          {/* Brand Logo with Proper Waves Logo Box */}
          <button 
            type="button"
            onClick={() => handlePageClick('home')}
            className="logo text-left focus:outline-none cursor-pointer border-0 bg-transparent p-0 flex items-center gap-3 shrink-0 group"
            title="Waves — Home"
          >
            <WavesLogo size={22} />
            <span className="disp tracking-tight font-extrabold text-xl text-white group-hover:text-[#9CD0FF] transition-colors">
              Waves
            </span>
          </button>

          {/* Desktop & Mobile Multi-Page Navigation Links */}
          <div className={`links ${mobileMenuOpen ? 'open' : ''}`} id="links">
            {NAV_LINKS.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handlePageClick(link.id)}
                  className={`text-left transition-all ${
                    isActive 
                      ? 'text-[#7CC0FF] font-bold bg-white/15 shadow-[0_0_15px_rgba(124,192,255,0.2)] border border-white/20' 
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Mobile-only CTA & Quick Info */}
            {mobileMenuOpen && (
              <div className="pt-4 border-t border-white/20 sm:hidden flex flex-col gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenQuote) onOpenQuote();
                  }}
                  className="btn btn-solid w-full text-center text-sm py-3 justify-center"
                >
                  Book a free call
                </button>
                <div className="text-[11px] text-[#A9BCDD] text-center font-mono">
                  Fast, mobile-first business websites + WhatsApp AI
                </div>
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Mobile Menu Button */}
            <button 
              className="menu" 
              id="menu" 
              aria-expanded={mobileMenuOpen} 
              aria-controls="links"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>

            {/* Desktop CTA */}
            <button 
              type="button"
              className="btn btn-solid nav-cta" 
              style={{ minHeight: '44px', padding: '0 22px', fontSize: '15px' }}
              onClick={onOpenQuote}
            >
              Book a free call
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
