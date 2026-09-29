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
        <h1 className="cursive gold-text">how it works</h1>
        <p className="page-header-subtitle">From Initial Conversation to Handover & Support</p>
      </div>

      <div className="content-shell">
        
        {/* Intro */}
        <section>
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] block mb-2 font-serif">
            Engineering Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#fff3c4] mb-4">
            A 9-step build process with complete clarity
          </h2>
          <p className="text-sm sm:text-base text-[#fff3c4]/80 font-serif leading-relaxed max-w-3xl">
            You always know what is being built, what is required from you, and when each milestone will be reached. No technical jargon, no surprises.
          </p>
        </section>

        {/* 9 Process Steps */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((s) => (
            <div key={s.stepNumber} className="gold-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(212,175,55,0.2)] mb-3">
                  <span className="cursive text-3xl text-[#d4af37]">
                    0{s.stepNumber}.
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#d4af37]/80 font-serif">
                    Milestone
                  </span>
                </div>

                <h3 className="text-2xl font-serif text-[#fff3c4] mb-2">{s.name}</h3>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-[#d4af37] font-serif mb-1">
                      What Waves Does:
                    </h4>
                    <p className="text-xs sm:text-sm text-[#fff3c4]/80 font-serif leading-relaxed">
                      {s.whatHappens}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-[#d4af37] font-serif mb-1">
                      Your Role:
                    </h4>
                    <p className="text-xs sm:text-sm text-[#fff3c4]/70 font-serif leading-relaxed">
                      {s.clientRole}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[rgba(212,175,55,0.15)] text-[11px] text-[#d4af37]/70 font-serif">
                Step {s.stepNumber} of 9
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="gold-card text-center p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#fff3c4] mb-4">
            Ready to begin with Step 1: Conversation?
          </h2>
          <p className="text-sm text-[#fff3c4]/80 leading-relaxed font-serif mb-6 max-w-xl mx-auto">
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
