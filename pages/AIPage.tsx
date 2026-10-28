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
        style={{ backgroundImage: `url('/assets/images/boardroom_executive_strategy_1790663177604.jpg')` }}
      >
        <div className="page-header-overlay" />
        <span className="wv-tag mb-3 relative z-10">WhatsApp Automation</span>
        <h1 className="disp">
          WhatsApp <span className="g">AI Modules</span>
        </h1>
        <p className="page-header-subtitle">Practical Automation Grounded in Verified Data</p>
      </div>

      <div className="content-shell">
        
        {/* Intro */}
        <section>
          <span className="wv-tag block mb-2">
            High-Value Automation
          </span>
          <h2 className="t disp">
            AI features designed to solve concrete business bottlenecks
          </h2>
          <p className="sub">
            We do not add generic AI gimmicks. Waves AI modules are restricted strictly to your approved business catalog, policies, and prices—with graceful human WhatsApp handoffs always in place.
          </p>
        </section>

        {/* Modules Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AI_MODULES.map((mod) => (
            <div key={mod.id} className="card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#7CC0FF] font-mono block mb-2">
                  Specialized Module
                </span>
                <h3 className="disp text-2xl font-bold text-white mb-3 tracking-tight">{mod.name}</h3>

                <p className="m-0 text-sm sm:text-base leading-relaxed text-[#CBD7EC] mb-4">
                  {mod.description}
                </p>

                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-[#7CC0FF] font-mono mb-1">
                      Business Outcome:
                    </h4>
                    <p className="m-0 text-xs sm:text-sm text-[#EAF2FF]/95 leading-relaxed">
                      {mod.businessBenefit}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-[#1FAE5B] font-mono mb-1">
                      Guardrail Guarantee:
                    </h4>
                    <p className="m-0 text-xs sm:text-sm text-[#CBD7EC]/90 leading-relaxed italic">
                      {mod.guardrail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-[#7CC0FF] font-mono">Available on AI Growth Level</span>
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="text-left text-[var(--link)] font-bold cursor-pointer hover:underline text-sm"
                >
                  Test Demo Concierge →
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Guardrails Card */}
        <section className="card p-8 sm:p-10 border-[#2F7BFF]/40 shadow-[0_0_30px_rgba(47,123,255,0.2)]">
          <span className="wv-tag block mb-2">
            Security & Trust First
          </span>
          <h2 className="t disp mb-3">
            Our Strict AI Safety Architecture
          </h2>
          <p className="sub mb-8">
            Built from the ground up for commercial accuracy, compliance, and zero hallucination.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <strong className="text-[#7CC0FF] block mb-1 font-mono text-sm">01. Grounded Knowledge Only</strong>
              <p className="m-0 text-xs sm:text-sm leading-relaxed text-[#CBD7EC]">
                Responses are bound to the prices, operating hours, and service definitions you approve in writing.
              </p>
            </div>
            <div>
              <strong className="text-[#7CC0FF] block mb-1 font-mono text-sm">02. No Autonomous Pricing</strong>
              <p className="m-0 text-xs sm:text-sm leading-relaxed text-[#CBD7EC]">
                Assistants gather project parameters but never commit to arbitrary prices or fake discounts.
              </p>
            </div>
            <div>
              <strong className="text-[#7CC0FF] block mb-1 font-mono text-sm">03. 1-Tap Human Escalation</strong>
              <p className="m-0 text-xs sm:text-sm leading-relaxed text-[#CBD7EC]">
                If a customer question is ambiguous, the concierge immediately routes the visitor to WhatsApp with chat context preserved.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="card text-center p-8 sm:p-12">
          <h2 className="t disp mb-3">
            Explore AI modules tailored to your operations.
          </h2>
          <p className="sub mx-auto mb-6">
            Let's discuss how an AI receptionist, lead qualifier, or booking agent can save your team hours every day.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={onOpenQuote}
              className="btn btn-solid"
            >
              Request an AI Scope Quote
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa"
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
