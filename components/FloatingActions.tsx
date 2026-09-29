/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { WHATSAPP_LINK } from '../constants';

interface FloatingActionsProps {
  onOpenQuote: () => void;
}

const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenQuote }) => {
  return (
    <>
      {/* Floating Get a Quote Button */}
      <button
        type="button"
        onClick={onOpenQuote}
        className="quote-float-btn group"
        aria-label="Request a quote"
        title="Request a Project Quote"
      >
        <svg 
          className="w-4 h-4 text-[#d4af37] group-hover:rotate-12 transition-transform" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={2}
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <span>Get a Quote</span>
      </button>

      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        aria-label="Chat with Waves on WhatsApp"
        title="Chat on WhatsApp (+234 810 046 1332)"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.06 8.06 0 0 1-1.24-4.28c0-4.45 3.62-8.07 8.16-8.07 4.45 0 8.07 3.62 8.07 8.07s-3.62 8.12-8.07 8.12zm4.43-6.05c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.95-1.21-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.11-.5.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.54-1.31-.74-1.79-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.65.31-.22.24-.84.83-.84 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.13 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.43-.59 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.11-.22-.17-.46-.29z"/>
        </svg>
      </a>
    </>
  );
};

export default FloatingActions;
