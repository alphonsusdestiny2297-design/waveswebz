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
        <span className="wv-tag mb-3 relative z-10">Conversion Architecture</span>
        <h1 className="disp">
          Customer <span className="g">Journey</span>
        </h1>
        <p className="page-header-subtitle">Discover · Understand · Trust · Enquire · Act</p>
      </div>

      <div className="content-shell">
        
        {/* Intro */}
        <section>
          <span className="wv-tag block mb-2">
            Architecture of Conversion
          </span>
          <h2 className="t disp">
            How a Waves website turns attention into revenue
          </h2>
          <p className="sub">
            A website should never leave a visitor confused about what to do next. Every page and section we design corresponds to a precise stage in the buyer's psychology.
          </p>
        </section>

        {/* 5 Stages Detailed */}
        <section className="space-y-6">
          {CUSTOMER_JOURNEY_STAGES.map((stage) => (
            <div key={stage.step} className="card p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-display font-black text-3xl text-[#7CC0FF] font-mono">0{stage.step}.</span>
                  <h3 className="disp text-2xl font-bold text-white tracking-tight">{stage.stage}</h3>
                </div>
                <span className="text-xs tracking-wider uppercase font-mono text-[#7CC0FF]">
                  Stage Purpose
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#7CC0FF] font-mono mb-2">
                    What Happens:
                  </h4>
                  <p className="m-0 text-sm sm:text-base text-[#CBD7EC] leading-relaxed">
                    {stage.purpose}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#7CC0FF] font-mono mb-2">
                    Friction Removed:
                  </h4>
                  <p className="m-0 text-sm sm:text-base text-[#CBD7EC]/90 leading-relaxed">
                    {stage.frictionRemoved}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#7CC0FF] font-mono mb-2">
                    Built-In Features:
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {stage.exampleFeatures.map((feat, i) => (
                      <span 
                        key={i} 
                        className="text-xs font-mono text-[#1FAE5B] bg-[#1FAE5B]/10 px-2.5 py-1 rounded-full border border-[#1FAE5B]/30"
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
        <section className="card text-center p-8 sm:p-12">
          <h2 className="t disp mb-3">
            Build a website designed for real customer action.
          </h2>
          <p className="sub mx-auto mb-6">
            Turn casual visitors into paying clients with a clear, guided journey.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
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
              Consult on WhatsApp
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default JourneyPage;
