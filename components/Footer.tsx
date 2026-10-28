/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId } from '../types';
import { WHATSAPP_LINK } from '../constants';
import { WavesLogo } from './WavesLogo';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  const handlePageClick = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-foot">
      <div className="wrap flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
        {/* Brand with Proper Waves Logo Box */}
        <div className="space-y-2">
          <button 
            type="button"
            onClick={() => handlePageClick('home')}
            className="logo text-left cursor-pointer border-0 bg-transparent p-0 flex items-center gap-3 group"
            style={{ color: '#fff', fontSize: '20px' }}
            title="Waves — Back to top"
          >
            <WavesLogo size={20} />
            <span className="disp font-extrabold tracking-tight group-hover:text-[#9CD0FF] transition-colors">
              Waves
            </span>
          </button>
          <p className="text-xs text-[#A9BCDD] max-w-sm font-sans leading-relaxed">
            Fast, mobile-first business websites + WhatsApp AI for Nigerian SMEs. Establishing credibility, answering customers, and converting leads.
          </p>
        </div>

        {/* Multi-Page Navigation */}
        <nav aria-label="Footer Navigation" className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm">
          <button type="button" onClick={() => handlePageClick('home')} className="text-white/85 hover:text-white transition-colors">
            Home
          </button>
          <button type="button" onClick={() => handlePageClick('about')} className="text-white/85 hover:text-white transition-colors">
            About
          </button>
          <button type="button" onClick={() => handlePageClick('services')} className="text-white/85 hover:text-white transition-colors">
            Services
          </button>
          <button type="button" onClick={() => handlePageClick('journey')} className="text-white/85 hover:text-white transition-colors">
            Journey
          </button>
          <button type="button" onClick={() => handlePageClick('process')} className="text-white/85 hover:text-white transition-colors">
            Process
          </button>
          <button type="button" onClick={() => handlePageClick('ai')} className="text-white/85 hover:text-white transition-colors">
            WhatsApp AI
          </button>
          <button type="button" onClick={() => handlePageClick('contact')} className="text-white/85 hover:text-white transition-colors">
            Contact
          </button>
          <button type="button" onClick={onOpenQuote} className="text-[#7CC0FF] font-bold hover:underline">
            Request Quote
          </button>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[#1FAE5B] font-bold hover:underline">
            WhatsApp Direct
          </a>
        </nav>
      </div>

      <div className="wrap mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#C9DDFA]/65">
        <span>© {new Date().getFullYear()} Waves. Your business. Your digital home.</span>
        <span>Nationwide delivery across Lagos, Abuja, Port Harcourt & all commercial centers.</span>
      </div>
    </footer>
  );
};

export default Footer;
