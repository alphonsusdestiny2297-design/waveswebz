/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { WHATSAPP_LINK } from '../constants';

interface FloatingActionsProps {
  onOpenQuote: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenQuote }) => {
  return (
    <>
      {/* Mobile Floating Action Button (Exact from uploaded file) */}
      <a 
        className="btn btn-wa fab shadow-2xl" 
        id="fab" 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Waves on WhatsApp"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.06 8.06 0 0 1-1.24-4.28c0-4.45 3.62-8.07 8.16-8.07 4.45 0 8.07 3.62 8.07 8.07s-3.62 8.12-8.07 8.12z"/>
        </svg>
        <span>Chat on WhatsApp</span>
      </a>

      {/* Desktop Floating Action Triggers */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col gap-3">
        <button
          type="button"
          onClick={onOpenQuote}
          className="btn btn-blue text-sm shadow-xl"
          style={{ minHeight: '44px', padding: '0 20px' }}
          aria-label="Request a quote"
        >
          <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Get a Quote</span>
        </button>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-wa text-sm shadow-xl"
          style={{ minHeight: '44px', padding: '0 20px' }}
          aria-label="Chat with Waves on WhatsApp"
        >
          <svg className="w-4 h-4 mr-1.5 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.06 8.06 0 0 1-1.24-4.28c0-4.45 3.62-8.07 8.16-8.07 4.45 0 8.07 3.62 8.07 8.07s-3.62 8.12-8.07 8.12z"/>
          </svg>
          <span>WhatsApp Direct</span>
        </a>
      </div>
    </>
  );
};

export default FloatingActions;
