/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { BELIEFS, WHAT_WAVES_PROMISES, WHAT_WAVES_DOES_NOT_PROMISE, WHATSAPP_LINK } from '../constants';

interface AboutPageProps {
  onOpenQuote: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuote }) => {
  return (
    <div className="w-full">
      {/* Page Header Band with Uploaded Workspace Image */}
      <div 
        className="page-header-band"
        style={{ backgroundImage: `url('/assets/images/creative_team_workspace_1790663167313.jpg')` }}
      >
        <div className="page-header-overlay" />
        <h1 className="font-display font-black uppercase tracking-[0.14em] neon-text">digital home</h1>
        <p className="page-header-subtitle">Why Your Business Needs Its Own Ground</p>
      </div>

      <div className="content-shell">
        
        {/* Core Thesis */}
        <section>
          <span className="wv-tag block mb-2">
            The Purpose
          </span>
          <h2 className="text-3xl sm:text-4xl font-display text-[#F2F7FF] mb-6 tracking-wide">
            A website should work for the business, not just look good.
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-[#CBD7EC] font-sans leading-relaxed max-w-3xl">
            <p>
              Social media channels are rented land. The algorithms shift, accounts can get restricted, and your important products and services get buried beneath casual posts, expired stories, and disappearing DMs.
            </p>
            <p>
              A website should do for your business online what its physical location does offline — carry its identity, catalog, verified business details, and a clear, frictionless way for customers to reach you and act.
            </p>
          </div>
        </section>

        {/* 7 Waves Beliefs */}
        <section>
          <span className="wv-tag block mb-4">
            What We Stand For
          </span>
          <h2 className="text-2xl sm:text-3xl font-display text-[#F2F7FF] mb-8 tracking-wide">
            Our Core Beliefs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BELIEFS.map((belief, idx) => (
              <div key={idx} className="gold-card flex items-start gap-4">
                <span className="font-display font-black text-2xl text-[#22E4FF] leading-none shrink-0 font-mono">
                  0{idx + 1}.
                </span>
                <p className="text-sm sm:text-base text-[#F2F7FF]/90 font-sans leading-relaxed">
                  {belief}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Promises and Boundaries */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="gold-card border-[#22E4FF]/40 shadow-[0_0_25px_rgba(34,228,255,0.15)]">
            <h3 className="text-xl font-display text-[#22E4FF] mb-4 tracking-wide">
              What Waves Promises:
            </h3>
            <ul className="space-y-3">
              {WHAT_WAVES_PROMISES.map((p, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#CBD7EC] font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22E4FF] shadow-[0_0_8px_#22E4FF] mt-1.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="gold-card border-[rgba(255,255,255,0.16)]">
            <h3 className="text-xl font-display text-[#F2F7FF] mb-4 tracking-wide">
              What Waves Does Not Promise:
            </h3>
            <ul className="space-y-3">
              {WHAT_WAVES_DOES_NOT_PROMISE.map((p, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#A9BBDA] font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Action */}
        <section className="gold-card text-center p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-display text-[#F2F7FF] mb-4 tracking-wide">
            Let's build your digital home with discipline and clarity.
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
              Start on WhatsApp
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
