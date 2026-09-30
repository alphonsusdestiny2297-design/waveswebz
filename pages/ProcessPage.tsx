/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { PROCESS_STEPS, WHATSAPP_LINK } from '../constants';

interface ProcessPageProps {
  onOpenQuote: () => void;
}

const ProcessPage: React.FC<ProcessPageProps> = ({ onOpenQuote }) => {
  return (
    <div className="w-full">
      {/* Page Header Band with Uploaded Golden Hour Street Scene */}
      <div 
        className="page-header-band"
        style={{ backgroundImage: `url('/assets/images/urban_golden_hour_street_1790663189316.jpg')` }}
      >
        <div className="page-header-overlay" />
        <h1 className="font-display font-black uppercase tracking-[0.14em] neon-text">how it works</h1>
        <p className="page-header-subtitle">From Initial Conversation to Handover & Support</p>
      </div>

      <div className="content-shell">
        
        {/* Intro */}
        <section>
          <span className="wv-tag block mb-2">
            Engineering Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-display text-[#F2F7FF] mb-4 tracking-wide">
            A 9-step build process with complete clarity
          </h2>
          <p className="text-base sm:text-lg text-[#CBD7EC] font-sans leading-relaxed max-w-3xl">
            You always know what is being built, what is required from you, and when each milestone will be reached. No technical jargon, no surprises.
          </p>
        </section>

        {/* 9 Process Steps */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((s) => (
            <div key={s.stepNumber} className="gold-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.18)] mb-3">
                  <span className="font-display font-black text-2xl text-[#22E4FF] font-mono">
                    0{s.stepNumber}.
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#22E4FF] font-mono">
                    Milestone
                  </span>
                </div>

                <h3 className="text-xl font-display text-[#F2F7FF] mb-2 tracking-wide">{s.name}</h3>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-[#22E4FF] font-mono mb-1">
                      What Waves Does:
                    </h4>
                    <p className="text-xs sm:text-sm text-[#CBD7EC] font-sans leading-relaxed">
                      {s.whatHappens}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-[#2CFFB0] font-mono mb-1">
                      Your Role:
                    </h4>
                    <p className="text-xs sm:text-sm text-[#CBD7EC]/80 font-sans leading-relaxed">
                      {s.clientRole}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[rgba(34,228,255,0.18)] text-[11px] text-[#22E4FF] font-mono">
                Step {s.stepNumber} of 9
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="gold-card text-center p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-display text-[#F2F7FF] mb-4 tracking-wide">
            Ready to begin with Step 1: Conversation?
          </h2>
          <p className="text-sm sm:text-base text-[#CBD7EC] leading-relaxed font-sans mb-6 max-w-xl mx-auto">
            Tell us about your business, the customers you serve, and how you want to be discovered.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenQuote}
              className="cta"
            >
              Request a Project Quote
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="cta cta-secondary"
            >
              Start on WhatsApp
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProcessPage;
