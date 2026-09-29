/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { CUSTOMER_JOURNEY_STAGES, WHATSAPP_LINK } from '../constants';

interface JourneyPageProps {
  onOpenQuote: () => void;
}

const JourneyPage: React.FC<JourneyPageProps> = ({ onOpenQuote }) => {
  return (
    <div className="w-full">
      {/* Page Header Band with Uploaded Golden Skyline Image */}
      <div 
        className="page-header-band"
        style={{ backgroundImage: `url('/assets/images/skyline_golden_lake_1790663127615.jpg')` }}
      >
        <div className="page-header-overlay" />
        <h1 className="cursive gold-text">customer journey</h1>
        <p className="page-header-subtitle">Discover · Understand · Trust · Enquire · Act</p>
      </div>

      <div className="content-shell">
        
        {/* Intro */}
        <section>
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] block mb-2 font-serif">
            Architecture of Conversion
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#fff3c4] mb-4">
            How a Waves website turns attention into revenue
          </h2>
          <p className="text-sm sm:text-base text-[#fff3c4]/80 font-serif leading-relaxed max-w-3xl">
            A website should never leave a visitor confused about what to do next. Every page and section we design corresponds to a precise stage in the buyer's psychology.
          </p>
        </section>

        {/* 5 Stages Detailed */}
        <section className="space-y-6">
          {CUSTOMER_JOURNEY_STAGES.map((stage) => (
            <div key={stage.step} className="gold-card p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[rgba(212,175,55,0.2)] mb-4">
                <div className="flex items-baseline gap-3">
                  <span className="cursive text-4xl text-[#d4af37]">0{stage.step}.</span>
                  <h3 className="text-2xl font-serif text-[#fff3c4]">{stage.stage}</h3>
                </div>
                <span className="text-xs tracking-wider uppercase font-serif text-[#d4af37]/80">
                  Stage Purpose
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#d4af37] font-serif mb-1">
                    What Happens:
                  </h4>
                  <p className="text-sm text-[#fff3c4]/85 font-serif leading-relaxed">
                    {stage.purpose}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#d4af37] font-serif mb-1">
                    Friction Removed:
                  </h4>
                  <p className="text-sm text-[#fff3c4]/75 font-serif leading-relaxed">
                    {stage.frictionRemoved}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#d4af37] font-serif mb-1">
                    Built-In Features:
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {stage.exampleFeatures.map((feat, i) => (
                      <span 
                        key={i} 
                        className="text-xs font-serif text-[#fff3c4]/80 bg-[rgba(212,175,55,0.08)] px-2.5 py-1 rounded border border-[rgba(212,175,55,0.25)]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="gold-card text-center p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#fff3c4] mb-4">
            Build a website designed for real customer action.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
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
              Consult on WhatsApp
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default JourneyPage;
