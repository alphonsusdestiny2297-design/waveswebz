/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { PageId, ServiceLevelId } from '../types';
import { CUSTOMER_JOURNEY_STAGES, SERVICE_LEVELS, WHATSAPP_LINK } from '../constants';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: (levelId?: ServiceLevelId) => void;
  onOpenChat: () => void;
}

const HERO_SLIDES = [
  '/src/assets/images/skyline_golden_lake_1790663127615.jpg',
  '/src/assets/images/skyscrapers_night_water_1790663140393.jpg',
  '/src/assets/images/city_street_rainy_chrysler_1790663155616.jpg',
  '/src/assets/images/urban_golden_hour_street_1790663189316.jpg',
];

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenQuote }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Background slides rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Automatically slide down to reveal the website after the initial fullscreen intro
  useEffect(() => {
    const autoSlideTimer = setTimeout(() => {
      if (window.scrollY < 80) {
        scrollToContent();
      }
    }, 4000);

    return () => clearTimeout(autoSlideTimer);
  }, []);

  return (
    <div className="w-full">
      {/* ============================================================
          1. HERO SLIDER SECTION (COVERS WHOLE SCREEN BEFORE SLIDING DOWN)
         ============================================================ */}
      <section 
        className="hero-slider-section"
        onClick={scrollToContent}
        title="Click to reveal website"
      >
        {/* Slideshow background */}
        <div className="slideshow-track" aria-hidden="true">
          {HERO_SLIDES.map((slideUrl, idx) => (
            <div
              key={idx}
              className={`slide-item ${idx === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url("${slideUrl}")` }}
            />
          ))}
        </div>

        {/* Radial vignette overlay */}
        <div className="hero-vignette" aria-hidden="true" />

        {/* Center brand & headline */}
        <div className="hero-center-content">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              scrollToContent();
            }}
            className="brand-hero focus:outline-none"
            aria-label="Waves — Slide into website"
          >
            <span className="cursive gold-text inline-block">waves</span>
          </button>

          <p className="hero-tagline">
            liquid gold
          </p>

          <p className="text-xs sm:text-sm text-[#fff3c4]/80 max-w-md mx-auto font-serif tracking-wide leading-relaxed">
            Your Business. Your Digital Home. Fast, mobile-first business websites engineered for trust, clarity, and real customer action.
          </p>
        </div>

        {/* Slide Indicator Dots */}
        <div 
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentSlide 
                  ? 'w-8 bg-[#d4af37]' 
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ============================================================
          2. MAIN WEBSITE CONTENT (SMOOTH FLOW FROM SLIDER)
         ============================================================ */}
      <div ref={contentRef} id="website-content" className="content-shell">
        
        {/* Section: Digital Home Proposition */}
        <section>
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] block mb-2 font-serif">
            Digital Foundation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#fff3c4] mb-6 leading-tight">
            Waves builds the <span className="cursive text-4xl sm:text-5xl md:text-6xl gold-text">digital home</span> for your business.
          </h2>
          <p className="text-base sm:text-lg text-[#fff3c4]/80 leading-relaxed font-serif max-w-3xl mb-8">
            A professional online place where customers can understand what you offer, trust your business, find what they need, and contact you with zero friction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="gold-card">
              <h3 className="text-xl font-serif text-[#fff3c4] mb-2">01. Mobile-First</h3>
              <p className="text-sm text-[#fff3c4]/75 leading-relaxed font-serif">
                Engineered for speed on real Nigerian smartphone connections without code bloat or battery drain.
              </p>
            </div>

            <div className="gold-card">
              <h3 className="text-xl font-serif text-[#fff3c4] mb-2">02. Instant WhatsApp</h3>
              <p className="text-sm text-[#fff3c4]/75 leading-relaxed font-serif">
                Connects directly to your WhatsApp with pre-filled enquiry context so customers take action immediately.
              </p>
            </div>

            <div className="gold-card">
              <h3 className="text-xl font-serif text-[#fff3c4] mb-2">03. Zero False Hype</h3>
              <p className="text-sm text-[#fff3c4]/75 leading-relaxed font-serif">
                No fake testimonials or magic growth claims. Clear written scope, honest advice, and dependable execution.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Why Digital Home & Work Visual */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] block mb-2 font-serif">
              The Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#fff3c4] mb-4">
              Give your business one permanent, reliable address online.
            </h2>
            <p className="text-sm text-[#fff3c4]/75 leading-relaxed font-serif mb-4">
              Social media is helpful, but it does not belong to you. A website should do for your business online what its physical location does offline — carry its identity, catalog, and clear ways to interact.
            </p>
            <p className="text-sm text-[#fff3c4]/75 leading-relaxed font-serif mb-6">
              "A small business does not need a small-looking digital presence. Simple, clear, and reliable is better than complicated and impressive-looking."
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="cta"
              >
                Learn Our Beliefs →
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[rgba(212,175,55,0.25)] shadow-2xl">
              <img 
                src="/src/assets/images/creative_team_workspace_1790663167313.jpg" 
                alt="Creative collaborative team in workspace"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-serif text-[#fff3c4]/90 tracking-wide">
                <span>Waves Studio — Built with discipline and taste</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: 5-Stage Customer Journey */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] block mb-2 font-serif">
                Systematic Conversion
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#fff3c4]">
                The 5-Stage Customer Journey Framework
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('journey')}
              className="text-xs uppercase tracking-widest text-[#d4af37] hover:text-[#fff3c4] transition-colors font-serif"
            >
              View Full Journey Details →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CUSTOMER_JOURNEY_STAGES.map((s) => (
              <div key={s.step} className="gold-card flex flex-col justify-between">
                <div>
                  <span className="text-xs font-serif text-[#d4af37] uppercase tracking-wider block mb-2">
                    0{s.step}. {s.stage}
                  </span>
                  <p className="text-xs text-[#fff3c4]/80 leading-relaxed font-serif">
                    {s.purpose}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[rgba(212,175,55,0.15)] text-[11px] text-[#d4af37]/80 font-serif">
                  {s.exampleFeatures[0]}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Service Levels */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] block mb-2 font-serif">
                Tailored Scope
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#fff3c4]">
                Choose the right scope for your business
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="text-xs uppercase tracking-widest text-[#d4af37] hover:text-[#fff3c4] transition-colors font-serif"
            >
              Compare All Deliverables →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SERVICE_LEVELS.map((level) => {
              const isGrowth = level.id === 'growth';
              return (
                <div 
                  key={level.id} 
                  className={`gold-card flex flex-col justify-between ${
                    isGrowth ? 'border-[#d4af37] bg-[rgba(212,175,55,0.12)]' : ''
                  }`}
                >
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#d4af37] block mb-1 font-serif">
                      Level
                    </span>
                    <h3 className="text-2xl font-serif text-[#fff3c4] mb-1">{level.name}</h3>
                    <p className="text-xs text-[#d4af37]/90 font-serif mb-4">{level.tagline}</p>
                    <p className="text-xs text-[#fff3c4]/75 mb-6 leading-relaxed font-serif">
                      {level.bestFor}
                    </p>

                    <div className="space-y-2 mb-6 pt-4 border-t border-[rgba(212,175,55,0.18)]">
                      {level.features.slice(0, 4).map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#fff3c4]/80 font-serif">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenQuote(level.id)}
                    className={isGrowth ? 'cta w-full' : 'cta cta-secondary w-full'}
                  >
                    Select {level.name}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Direct Call to Action */}
        <section className="gold-card text-center p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] block mb-2 font-serif">
              Step 1: Conversation
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#fff3c4] mb-4">
              Ready to give your business its digital home?
            </h2>
            <p className="text-sm text-[#fff3c4]/80 leading-relaxed font-serif mb-8">
              We learn about your business, recommend the right service level, and provide a clear written scope before any work begins.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => onOpenQuote('growth')}
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
                Chat on WhatsApp (+234 810 046 1332)
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;
