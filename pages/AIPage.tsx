/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { AI_MODULES, WHATSAPP_LINK } from '../constants';

interface AIPageProps {
  onOpenChat: () => void;
  onOpenQuote: () => void;
}

const AIPage: React.FC<AIPageProps> = ({ onOpenChat, onOpenQuote }) => {
  return (
    <div className="w-full">
      {/* Page Header Band with Uploaded Executive Boardroom Image */}
      <div 
        className="page-header-band"
        style={{ backgroundImage: `url('/src/assets/images/boardroom_executive_strategy_1790663177604.jpg')` }}
      >
        <div className="page-header-overlay" />
        <h1 className="cursive gold-text">ai modules</h1>
        <p className="page-header-subtitle">Practical Automation Grounded in Verified Data</p>
      </div>

      <div className="content-shell">
        
        {/* Intro */}
        <section>
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] block mb-2 font-serif">
            High-Value Automation
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#fff3c4] mb-4">
            AI features designed to solve concrete business bottlenecks
          </h2>
          <p className="text-sm sm:text-base text-[#fff3c4]/80 font-serif leading-relaxed max-w-3xl">
            We do not add generic AI gimmicks. Waves AI modules are restricted strictly to your approved business catalog, policies, and prices—with graceful human WhatsApp handoffs always in place.
          </p>
        </section>

        {/* Modules Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AI_MODULES.map((mod) => (
            <div key={mod.id} className="gold-card flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-serif block mb-2">
                  Specialized Module
                </span>
                <h3 className="text-2xl font-serif text-[#fff3c4] mb-3">{mod.name}</h3>

                <p className="text-sm text-[#fff3c4]/85 font-serif leading-relaxed mb-4">
                  {mod.description}
                </p>

                <div className="space-y-3 pt-3 border-t border-[rgba(212,175,55,0.18)]">
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-[#d4af37] font-serif mb-1">
                      Business Outcome:
                    </h4>
                    <p className="text-xs sm:text-sm text-[#fff3c4]/75 font-serif leading-relaxed">
                      {mod.businessBenefit}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-[#d4af37] font-serif mb-1">
                      Guardrail Guarantee:
                    </h4>
                    <p className="text-xs sm:text-sm text-[#fff3c4]/65 font-serif leading-relaxed italic">
                      {mod.guardrail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(212,175,55,0.15)] flex justify-between items-center">
                <span className="text-xs text-[#d4af37]/80 font-serif">Available on AI Growth Level</span>
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="text-xs text-[#fff3c4] hover:text-[#d4af37] transition-colors font-serif underline"
                >
                  Test Demo Concierge →
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Guardrails Card */}
        <section className="gold-card border-[#d4af37]/40 p-8 sm:p-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] block mb-2 font-serif">
            Security & Trust First
          </span>
          <h3 className="text-2xl font-serif text-[#fff3c4] mb-4">
            Our Strict AI Safety Architecture
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-[#fff3c4]/80 font-serif leading-relaxed">
            <div>
              <strong className="text-[#d4af37] block mb-1">01. Grounded Knowledge Only</strong>
              Responses are bound to the prices, operating hours, and service definitions you approve in writing.
            </div>
            <div>
              <strong className="text-[#d4af37] block mb-1">02. No Autonomous Pricing</strong>
              Assistants gather project parameters but never commit to arbitrary prices or fake discounts.
            </div>
            <div>
              <strong className="text-[#d4af37] block mb-1">03. 1-Tap Human Escalation</strong>
              If a customer question is ambiguous, the concierge immediately routes the visitor to WhatsApp with chat context preserved.
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="gold-card text-center p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#fff3c4] mb-4">
            Explore AI modules tailored to your operations.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={onOpenQuote}
              className="cta"
            >
              Request an AI Scope Quote
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="cta cta-secondary"
            >
              Consult with Waves on WhatsApp
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AIPage;
