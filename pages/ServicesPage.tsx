/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ServiceLevelId } from '../types';
import { SERVICE_LEVELS, FAQS, WHATSAPP_LINK } from '../constants';

interface ServicesPageProps {
  onOpenQuote: (levelId?: ServiceLevelId) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenQuote }) => {
  return (
    <div className="w-full">
      {/* Page Header Band with Uploaded Rainy City Street Image */}
      <div 
        className="page-header-band"
        style={{ backgroundImage: `url('/assets/images/city_street_rainy_chrysler_1790663155616.jpg')` }}
      >
        <div className="page-header-overlay" />
        <span className="wv-tag mb-3 relative z-10">Packages & Scope</span>
        <h1 className="disp">
          Services & <span className="g">Packages</span>
        </h1>
        <p className="page-header-subtitle">Launch · Growth · AI Growth</p>
      </div>

      <div className="content-shell">
        
        {/* Intro */}
        <section>
          <span className="wv-tag block mb-2">
            Service Spectrum
          </span>
          <h2 className="t disp">
            Clear, transparent scope tailored to your operational stage
          </h2>
          <p className="sub">
            We provide firm written agreements and clear deliverables before any build starts. Every tier is built on fast, mobile-first foundations.
          </p>
        </section>

        {/* 3 Service Levels */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICE_LEVELS.map((level) => {
            const isGrowth = level.id === 'growth';
            return (
              <div 
                key={level.id}
                className={`card p-6 sm:p-8 flex flex-col justify-between ${
                  isGrowth ? 'border-[#2F7BFF] bg-[rgba(47,123,255,0.08)] shadow-[0_0_35px_rgba(47,123,255,0.25)]' : ''
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs uppercase tracking-widest text-[#7CC0FF] font-mono">
                      Package
                    </span>
                    {isGrowth && (
                      <span className="text-[10px] uppercase tracking-wider text-[#7CC0FF] bg-[#2F7BFF]/20 px-2.5 py-0.5 rounded-full border border-[#7CC0FF]/40 font-mono shadow-[0_0_10px_rgba(124,192,255,0.3)]">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="disp text-3xl font-bold text-white mb-1 tracking-tight">{level.name}</h3>
                  <p className="text-xs text-[#1FAE5B] font-mono mb-4">{level.tagline}</p>
                  
                  <p className="m-0 text-sm sm:text-base text-[#CBD7EC] leading-relaxed mb-6">
                    {level.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-[#7CC0FF] font-mono mb-2">
                        Included Features:
                      </h4>
                      <ul className="space-y-2 border-t border-white/10 pt-3 p-0 m-0 list-none">
                        {level.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7CC0FF] shadow-[0_0_8px_#7CC0FF] mt-2 shrink-0" />
                            <p className="m-0 text-xs sm:text-sm text-[#CBD7EC] leading-relaxed">{feat}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-[#7CC0FF] font-mono mb-2">
                        Key Deliverables:
                      </h4>
                      <ul className="space-y-1.5 border-t border-white/10 pt-3 p-0 m-0 list-none">
                        {level.deliverables.map((deliv, i) => (
                          <li key={i}>
                            <p className="m-0 text-xs text-[#CBD7EC]/80">— {deliv}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-[11px] text-[#A9BCDD] font-mono mb-4 italic">
                    {level.pricingNote}
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenQuote(level.id)}
                    className={isGrowth ? 'btn btn-solid w-full text-center' : 'btn glass btn-ghost w-full text-center'}
                  >
                    Select {level.name} Scope
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* FAQs */}
        <section>
          <span className="wv-tag block mb-2">
            Common Inquiries
          </span>
          <h2 className="t disp mb-3">
            Frequently Asked Questions
          </h2>
          <p className="sub mb-6">
            Direct answers on timelines, pricing, domain setup, and WhatsApp automation.
          </p>

          <div className="space-y-2">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="card">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="card text-center p-8 sm:p-12">
          <h2 className="t disp mb-3">
            Unsure which service level fits your business best?
          </h2>
          <p className="sub mx-auto mb-6">
            Share what you currently do and where customer friction happens. We will recommend the exact right fit.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onOpenQuote()}
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
              Speak with Us on WhatsApp
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ServicesPage;
