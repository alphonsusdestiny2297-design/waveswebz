import React, { useState } from 'react';
import { usePWAInstall } from '../src/hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300
          bg-[#22E4FF]/10 text-[#22E4FF] border border-[#22E4FF]/35 hover:bg-[#22E4FF]/20 hover:border-[#22E4FF] hover:shadow-[0_0_15px_rgba(34,228,255,0.35)]
          cursor-pointer ${className}`}
        aria-label="Install Waves App to device"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300
            bg-[#22E4FF]/10 text-[#22E4FF] border border-[#22E4FF]/35 hover:bg-[#22E4FF]/20 hover:border-[#22E4FF]
            cursor-pointer ${className}`}
          aria-label="Install Waves on iOS"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v12m0-12l4 4m-4-4L8 8m-4 8v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
          </svg>
          <span>Install on iOS</span>
        </button>

        {showIOSGuide && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={() => setShowIOSGuide(false)}
          >
            <div 
              className="w-full max-w-sm rounded-2xl p-6 bg-[#040914] border border-[#22E4FF]/30 shadow-2xl text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg overflow-hidden border border-[#22E4FF]/40">
                    <img src="/pwa-192x192.png" alt="Waves Icon" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">Install Waves</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-md"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs text-[#CBD7EC] leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22E4FF]/20 text-[#22E4FF] flex items-center justify-center font-mono font-bold text-[10px]">1</span>
                  <p>In Safari, tap the <strong className="text-white">Share</strong> button <span className="inline-block px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">⎋</span> at the bottom toolbar.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22E4FF]/20 text-[#22E4FF] flex items-center justify-center font-mono font-bold text-[10px]">2</span>
                  <p>Scroll down and select <strong className="text-white">"Add to Home Screen"</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22E4FF]/20 text-[#22E4FF] flex items-center justify-center font-mono font-bold text-[10px]">3</span>
                  <p>Tap <strong className="text-[#22E4FF]">Add</strong> in the top right to launch Waves instantly as a standalone app.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full py-2 rounded-xl bg-[#22E4FF]/15 hover:bg-[#22E4FF]/25 border border-[#22E4FF]/40 text-[#22E4FF] font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback desktop / browser generic install trigger button
  return (
    <button
      type="button"
      onClick={() => {
        if (!install()) {
          console.log('Install prompt not ready');
        }
      }}
      className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300
        bg-white/5 text-[#CBD7EC] border border-white/15 hover:bg-white/10 hover:text-white hover:border-[#22E4FF]/40
        cursor-pointer ${className}`}
      title="Install Waves PWA on your device"
    >
      <svg className="w-3.5 h-3.5 text-[#22E4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <span>Install App</span>
    </button>
  );
};
