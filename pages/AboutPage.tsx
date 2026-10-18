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
        <span className="wv-tag mb-3 relative z-10">Digital Identity</span>
        <h1 className="disp">
          Your Digital <span className="g">Home</span>
        </h1>
        <p className="page-header-subtitle">Why Your Business Needs Its Own Ground</p>
      </div>

      <div className="content-shell">
        
        {/* Core Thesis */}
        <section>
          <span className="wv-tag block mb-2">
            The Purpose
          </span>
          <h2 className="t disp">
            A website should work for the business, not just look good.
          </h2>
          <div className="mt-4 space-y-4 max-w-3xl">
            <p className="sub">
              Social media channels are rented land. The algorithms shift, accounts can get restricted, and your important products and services get buried beneath casual posts, expired stories, and disappearing DMs.
            </p>
            <p>
              A website should do for your business online what its physical location does offline — carry its identity, catalog, verified business details, and a clear, frictionless way for customers to reach you and act.
            </p>
          </div>
        </section>

        {/* 7 Waves Beliefs */}
        <section>
          <span className="wv-tag block mb-2">
            What We Stand For
          </span>
          <h2 className="t disp">
            Our Core Beliefs
          </h2>
          <p className="sub mb-8">
            Seven guiding commitments we stand behind for every project we build.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BELIEFS.map((belief, idx) => (
              <div key={idx} className="card p-6 flex items-start gap-4">
                <span className="font-display font-black text-2xl text-[#7CC0FF] leading-none shrink-0 font-mono">
                  0{idx + 1}.
                </span>
                <p className="m-0 leading-relaxed text-[#EAF2FF]/95">
                  {belief}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Promises and Boundaries */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card p-6 sm:p-8 border-[#2F7BFF]/40 shadow-[0_0_25px_rgba(47,123,255,0.15)]">
            <h3 className="disp text-xl font-bold text-[#7CC0FF] mb-4">
              What Waves Promises:
            </h3>
            <ul className="space-y-3 p-0 m-0 list-none">
              {WHAT_WAVES_PROMISES.map((p, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7CC0FF] shadow-[0_0_8px_#7CC0FF] mt-2 shrink-0" />
                  <p className="m-0 text-sm sm:text-base leading-relaxed text-[#EAF2FF]/90">{p}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 sm:p-8 border-white/15">
            <h3 className="disp text-xl font-bold text-white mb-4">
              What Waves Does Not Promise:
            </h3>
            <ul className="space-y-3 p-0 m-0 list-none">
              {WHAT_WAVES_DOES_NOT_PROMISE.map((p, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 shrink-0" />
                  <p className="m-0 text-sm sm:text-base leading-relaxed text-[#A9BCDD]">{p}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Action */}
        <section className="card text-center p-8 sm:p-12">
          <h2 className="t disp mb-3">
            Let's build your digital home with discipline and clarity.
          </h2>
          <p className="sub mx-auto mb-6">
            Request a detailed project scope or chat directly with our team on WhatsApp.
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
              Start on WhatsApp
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
