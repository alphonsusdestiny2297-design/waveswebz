/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { PageId } from '../types';
import { BRAND_TAGLINE, WHATSAPP_LINK } from '../constants';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <footer className="bg-[#0a0a0a] text-[#fff3c4]/70 pt-16 pb-12 px-6 lg:px-12 border-t border-[rgba(212,175,55,0.2)] font-serif mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        
        {/* Brand Column (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <button 
            type="button"
            onClick={() => onNavigate('home')}
            className="cursive gold-text text-4xl block text-left"
          >
            waves
          </button>
          
          <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            {BRAND_TAGLINE}
          </p>

          <p className="text-xs sm:text-sm text-[#fff3c4]/70 leading-relaxed max-w-sm">
            Waves builds fast, reliable, mobile-first business websites for Nigerian SMEs — professional digital homes that help customers discover, understand, trust, enquire, and act.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="cta text-xs py-2 px-4"
            >
              WhatsApp Direct
            </a>
            <button
              type="button"
              onClick={onOpenQuote}
              className="cta cta-secondary text-xs py-2 px-4"
            >
              Request Quote
            </button>
          </div>
        </div>

        {/* Navigation Links (3 cols) */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-serif">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs text-[#fff3c4]/80">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-[#d4af37] transition-colors">
                Home (Slider & Overview)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-[#d4af37] transition-colors">
                Digital Home & Philosophy
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('journey')} className="hover:text-[#d4af37] transition-colors">
                Customer Journey (5 Stages)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-[#d4af37] transition-colors">
                Service Levels (Launch, Growth, AI)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('process')} className="hover:text-[#d4af37] transition-colors">
                How It Works (9 Steps)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('ai')} className="hover:text-[#d4af37] transition-colors">
                Modular AI & Safety
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-[#d4af37] transition-colors">
                Contact & Scope
              </button>
            </li>
          </ul>
        </div>

        {/* Commitment (4 cols) */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-serif">
            Our Standard
          </h4>
          <blockquote className="text-xs sm:text-sm text-[#fff3c4]/90 italic leading-relaxed border-l-2 border-[#d4af37] pl-3">
            "A website should work for the business, not just look good. Simple, clear, and reliable is better than complicated and impressive-looking."
          </blockquote>
          <p className="text-[11px] text-[#fff3c4]/60 leading-relaxed pt-2">
            No false promises about magic traffic. Transparent scope, mobile-first performance, and dedicated craftsmanship.
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto pt-6 border-t border-[rgba(212,175,55,0.15)] flex flex-col sm:flex-row justify-between items-center text-xs text-[#fff3c4]/50 gap-4">
        <p>© 2026 Waves. Built for Nigerian Businesses.</p>
        <div className="flex items-center gap-4 text-[11px] tracking-wider uppercase text-[#d4af37]/80">
          <span>Mobile-First</span>
          <span>·</span>
          <span>WhatsApp Integrated</span>
          <span>·</span>
          <span>Liquid Gold Aesthetic</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
