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
        style={{ backgroundImage: `url('/assets/images/urban_golden_hour_street_1790663189316.webp')` }}
      >
        <div className="page-header-overlay" />
        <span className="wv-tag mb-3 relative z-10">Build Roadmap</span>
        <h1 className="disp">
          How It <span className="g">Works</span>
        </h1>
        <p className="page-header-subtitle">From Initial Conversation to Handover & Support</p>
      </div>

      <div className="content-shell">
        
        {/* Intro */}
        <section>
          <span className="wv-tag block mb-2">
            Engineering Methodology
          </span>
          <h2 className="t disp">
            A 9-step build process with complete clarity
          </h2>
          <p className="sub">
            You always know what is being built, what is required from you, and when each milestone will be reached. No technical jargon, no surprises.
          </p>
        </section>

        {/* 9 Process Steps */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((s) => (
            <div key={s.stepNumber} className="card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <span className="font-display font-black text-2xl text-[#7CC0FF] font-mono">
                    0{s.stepNumber}.
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#7CC0FF] font-mono">
                    Milestone
                  </span>
                </div>

                <h3 className="disp text-xl font-bold text-white mb-2">{s.name}</h3>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-[#7CC0FF] font-mono mb-1">
                      What Waves Does:
                    </h4>
                    <p className="m-0 text-xs sm:text-sm text-[#CBD7EC] leading-relaxed">
                      {s.whatHappens}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-[#1FAE5B] font-mono mb-1">
                      Your Role:
                    </h4>
                    <p className="m-0 text-xs sm:text-sm text-[#CBD7EC]/90 leading-relaxed">
                      {s.clientRole}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] text-[#7CC0FF] font-mono">
                Step {s.stepNumber} of 9
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="card text-center p-8 sm:p-12">
          <h2 className="t disp mb-3">
            Ready to begin with Step 1: Conversation?
          </h2>
          <p className="sub mx-auto mb-6">
            Tell us about your business, the customers you serve, and how you want to be discovered.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenQuote}
              className="btn btn-solid"
            >
              Request a Project Quote
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa"
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
