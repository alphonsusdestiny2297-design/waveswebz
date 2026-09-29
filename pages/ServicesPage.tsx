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
        style={{ backgroundImage: `url('/src/assets/images/city_street_rainy_chrysler_1790663155616.jpg')` }}
      >
        <div className="page-header-overlay" />
        <h1 className="cursive gold-text">services</h1>
        <p className="page-header-subtitle">Launch · Growth · AI Growth</p>
      </div>

      <div className="content-shell">
        
        {/* Intro */}
        <section>
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] block mb-2 font-serif">
            Service Spectrum
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#fff3c4] mb-4">
            Clear, transparent scope tailored to your operational stage
          </h2>
          <p className="text-sm sm:text-base text-[#fff3c4]/80 font-serif leading-relaxed max-w-3xl">
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
                  isGrowth ? 'border-[#d4af37] bg-[rgba(212,175,55,0.12)] shadow-2xl' : ''
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs uppercase tracking-widest text-[#d4af37] font-serif">
                      Package
                    </span>
                    {isGrowth && (
                      <span className="text-[10px] uppercase tracking-wider text-[#d4af37] bg-[#d4af37]/15 px-2.5 py-0.5 rounded-full border border-[#d4af37]/40 font-serif">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-3xl font-serif text-[#fff3c4] mb-1">{level.name}</h3>
                  <p className="text-xs text-[#d4af37] font-serif mb-4">{level.tagline}</p>
                  
                  <p className="text-xs sm:text-sm text-[#fff3c4]/80 font-serif leading-relaxed mb-6">
                    {level.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-[#d4af37] font-serif mb-2">
                        Included Features:
                      </h4>
                      <ul className="space-y-2 border-t border-[rgba(212,175,55,0.18)] pt-3">
                        {level.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#fff3c4]/80 font-serif leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-[#d4af37] font-serif mb-2">
                        Key Deliverables:
                      </h4>
                      <ul className="space-y-1.5 border-t border-[rgba(212,175,55,0.18)] pt-3">
                        {level.deliverables.map((deliv, i) => (
                          <li key={i} className="text-xs text-[#fff3c4]/70 font-serif">
                            — {deliv}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[rgba(212,175,55,0.2)]">
                  <p className="text-[11px] text-[#fff3c4]/60 font-serif mb-4 italic">
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
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] block mb-2 font-serif">
            Common Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#fff3c4] mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="gold-faq">
                <summary className="font-serif">
                  {faq.question}
                </summary>
                <p className="text-sm text-[#fff3c4]/80 font-serif leading-relaxed mt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="gold-card text-center p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#fff3c4] mb-4">
            Unsure which service level fits your business best?
          </h2>
          <p className="text-sm text-[#fff3c4]/80 leading-relaxed font-serif mb-6 max-w-xl mx-auto">
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
