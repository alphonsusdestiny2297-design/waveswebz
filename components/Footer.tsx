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
    <footer className="bg-[#040914]/85 backdrop-blur-2xl text-[#A9BBDA] pt-16 pb-12 px-6 lg:px-12 border-t border-[rgba(255,255,255,0.18)] font-sans mt-16 relative z-10 shadow-2xl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        
        {/* Brand Column (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <button 
            type="button"
            onClick={() => onNavigate('home')}
            className="font-display font-black uppercase tracking-[0.16em] neon-text text-3xl block text-left"
          >
            waves
          </button>
          
          <p className="text-xs uppercase tracking-[0.25em] text-[#22E4FF] font-mono">
            {BRAND_TAGLINE}
          </p>

          <p className="text-xs sm:text-sm text-[#A9BBDA] leading-relaxed max-w-sm">
            Waves builds fast, reliable, mobile-first business websites for Nigerian SMEs — professional digital homes that help customers discover, understand, trust, enquire, and act.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="wv-btn wv-btn--primary text-xs py-2 px-4"
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
            <a
              href="/waves-website.zip"
              download="waves-website.zip"
              className="cta cta-secondary text-xs py-2 px-4 flex items-center gap-1.5"
              title="Download full project folder archive (.zip)"
            >
              <svg className="w-3.5 h-3.5 text-[#22E4FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download ZIP</span>
            </a>
          </div>
        </div>

        {/* Navigation Links (3 cols) */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-[#22E4FF] font-mono">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs text-[#F2F7FF]/80">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-[#22E4FF] transition-colors">
                Home (Slider & Overview)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-[#22E4FF] transition-colors">
                Digital Home & Philosophy
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('journey')} className="hover:text-[#22E4FF] transition-colors">
                Customer Journey (5 Stages)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-[#22E4FF] transition-colors">
                Service Levels (Launch, Growth, AI)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('process')} className="hover:text-[#22E4FF] transition-colors">
                How It Works (9 Steps)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('ai')} className="hover:text-[#22E4FF] transition-colors">
                Modular AI & Safety
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-[#22E4FF] transition-colors">
                Contact & Scope
              </button>
            </li>
          </ul>
        </div>

        {/* Commitment (4 cols) */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-[#22E4FF] font-mono">
            Our Standard
          </h4>
          <blockquote className="text-xs sm:text-sm text-[#F2F7FF] italic leading-relaxed border-l-2 border-[#22E4FF] pl-3">
            "A website should work for the business, not just look good. Simple, clear, and reliable is better than complicated and impressive-looking."
          </blockquote>
          <p className="text-[11px] text-[#A9BBDA] leading-relaxed pt-2 font-mono">
            No false promises about magic traffic. Transparent scope, mobile-first performance, and dedicated craftsmanship.
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto pt-6 border-t border-[rgba(255,255,255,0.15)] flex flex-col sm:flex-row justify-between items-center text-xs text-[#A9BBDA]/70 gap-4">
        <p>© 2026 Waves. Built for Nigerian Businesses.</p>
        <div className="flex items-center gap-4 text-[11px] tracking-wider uppercase text-[#22E4FF] font-mono">
          <span>Mobile-First</span>
          <span>·</span>
          <span>WhatsApp Integrated</span>
          <span>·</span>
          <span>Liquid Glass UI</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
