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
        <h1 className="font-display font-black uppercase tracking-[0.14em] neon-text">services</h1>
        <p className="page-header-subtitle">Launch · Growth · AI Growth</p>
      </div>

      <div className="content-shell">
        
        {/* Intro */}
        <section>
          <span className="wv-tag block mb-2">
            Service Spectrum
          </span>
          <h2 className="text-3xl sm:text-4xl font-display text-[#F2F7FF] mb-4 tracking-wide">
            Clear, transparent scope tailored to your operational stage
          </h2>
          <p className="text-base sm:text-lg text-[#CBD7EC] font-sans leading-relaxed max-w-3xl">
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
                className={`gold-card flex flex-col justify-between ${
                  isGrowth ? 'border-[#22E4FF] bg-[rgba(34,228,255,0.08)] shadow-[0_0_30px_rgba(34,228,255,0.25)]' : ''
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs uppercase tracking-widest text-[#22E4FF] font-mono">
                      Package
                    </span>
                    {isGrowth && (
                      <span className="text-[10px] uppercase tracking-wider text-[#22E4FF] bg-[#22E4FF]/15 px-2.5 py-0.5 rounded-full border border-[#22E4FF]/40 font-mono shadow-[0_0_10px_rgba(34,228,255,0.3)]">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-3xl font-display text-[#F2F7FF] mb-1 tracking-wide">{level.name}</h3>
                  <p className="text-xs text-[#2CFFB0] font-mono mb-4">{level.tagline}</p>
                  
                  <p className="text-xs sm:text-sm text-[#CBD7EC] font-sans leading-relaxed mb-6">
                    {level.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-[#22E4FF] font-mono mb-2">
                        Included Features:
                      </h4>
                      <ul className="space-y-2 border-t border-[rgba(34,228,255,0.18)] pt-3">
                        {level.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#CBD7EC] font-sans leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22E4FF] shadow-[0_0_8px_#22E4FF] mt-1.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-[#22E4FF] font-mono mb-2">
                        Key Deliverables:
                      </h4>
                      <ul className="space-y-1.5 border-t border-[rgba(34,228,255,0.18)] pt-3">
                        {level.deliverables.map((deliv, i) => (
                          <li key={i} className="text-xs text-[#CBD7EC]/80 font-sans">
                            — {deliv}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[rgba(34,228,255,0.2)]">
                  <p className="text-[11px] text-[#A9BBDA] font-mono mb-4 italic">
                    {level.pricingNote}
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenQuote(level.id)}
                    className={isGrowth ? 'cta w-full' : 'cta cta-secondary w-full'}
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
          <h2 className="text-2xl sm:text-3xl font-display text-[#F2F7FF] mb-6 tracking-wide">
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="gold-faq">
                <summary className="font-display">
                  {faq.question}
                </summary>
                <p className="text-sm text-[#CBD7EC] font-sans leading-relaxed mt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="gold-card text-center p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-display text-[#F2F7FF] mb-4 tracking-wide">
            Unsure which service level fits your business best?
          </h2>
          <p className="text-sm sm:text-base text-[#CBD7EC] leading-relaxed font-sans mb-6 max-w-xl mx-auto">
            Share what you currently do and where customer friction happens. We will recommend the exact right fit.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onOpenQuote()}
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
              Speak with Us on WhatsApp
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ServicesPage;
