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
  '/assets/images/skyline_golden_lake_1790663127615.jpg',
  '/assets/images/skyscrapers_night_water_1790663140393.jpg',
  '/assets/images/city_street_rainy_chrysler_1790663155616.jpg',
  '/assets/images/urban_golden_hour_street_1790663189316.jpg',
];

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenQuote }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Background slides rotation (pauses when tab is hidden for efficiency)
  useEffect(() => {
    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      }
    }
    touchStartX.current = null;
  };

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
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        title="Click or swipe to reveal website"
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
            <span className="font-display font-black uppercase tracking-[0.14em] neon-text inline-block">waves</span>
          </button>

          <p className="hero-tagline font-mono text-[#22E4FF]">
            liquid glass ui
          </p>

          <p className="text-xs sm:text-sm text-[#CBD7EC] max-w-md mx-auto font-sans tracking-wide leading-relaxed">
            Your Business. Your Digital Home. Fast, mobile-first business websites engineered for trust, clarity, and real customer action.
          </p>
        </div>

        {/* Slide Indicator Dots */}
        <div 
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/15 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentSlide 
                  ? 'w-8 bg-[#22E4FF] shadow-[0_0_12px_#22E4FF]' 
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
          <span className="wv-tag block mb-2">
            Digital Foundation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#F2F7FF] mb-6 leading-tight">
            Waves builds the <span className="font-display font-black uppercase tracking-[0.08em] text-3xl sm:text-4xl md:text-5xl neon-text">digital home</span> for your business.
          </h2>
          <p className="text-base sm:text-lg text-[#CBD7EC] leading-relaxed font-sans max-w-3xl mb-8">
            A professional online place where customers can understand what you offer, trust your business, find what they need, and contact you with zero friction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="gold-card">
              <h3 className="text-xl font-display text-[#F2F7FF] mb-2 tracking-wide">01. Mobile-First</h3>
              <p className="text-sm text-[#CBD7EC] leading-relaxed font-sans">
                Engineered for speed on real smartphone connections without code bloat or battery drain.
              </p>
            </div>

            <div className="gold-card">
              <h3 className="text-xl font-display text-[#F2F7FF] mb-2 tracking-wide">02. Instant WhatsApp</h3>
              <p className="text-sm text-[#CBD7EC] leading-relaxed font-sans">
                Connects directly to your WhatsApp with pre-filled enquiry context so customers take action immediately.
              </p>
            </div>

            <div className="gold-card">
              <h3 className="text-xl font-display text-[#F2F7FF] mb-2 tracking-wide">03. Zero False Hype</h3>
              <p className="text-sm text-[#CBD7EC] leading-relaxed font-sans">
                No fake testimonials or magic growth claims. Clear written scope, honest advice, and dependable execution.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Why Digital Home & Work Visual */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="wv-tag block mb-2">
              The Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-display text-[#F2F7FF] mb-4 tracking-wide">
              Give your business one permanent, reliable address online.
            </h2>
            <p className="text-sm text-[#CBD7EC] leading-relaxed font-sans mb-4">
              Social media is helpful, but it does not belong to you. A website should do for your business online what its physical location does offline — carry its identity, catalog, and clear ways to interact.
            </p>
            <p className="text-sm text-[#CBD7EC] leading-relaxed font-sans mb-6">
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
            <div className="relative rounded-2xl overflow-hidden border border-[rgba(34,228,255,0.25)] shadow-[0_16px_50px_rgba(0,0,0,0.85),0_0_24px_rgba(34,228,255,0.2)]">
              <img 
                src="/assets/images/creative_team_workspace_1790663167313.jpg" 
                alt="Creative collaborative team in workspace"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040914] via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-[#F2F7FF] tracking-wide">
                <span>Waves Studio — Built with discipline and taste</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: 5-Stage Customer Journey */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="wv-tag block mb-2">
                Systematic Conversion
              </span>
              <h2 className="text-2xl sm:text-3xl font-display text-[#F2F7FF] tracking-wide">
                The 5-Stage Customer Journey Framework
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('journey')}
              className="text-xs uppercase tracking-widest text-[#22E4FF] hover:text-[#2CFFB0] transition-colors font-mono"
            >
              View Full Journey Details →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CUSTOMER_JOURNEY_STAGES.map((s) => (
              <div key={s.step} className="gold-card flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-[#22E4FF] uppercase tracking-wider block mb-2 font-bold">
                    0{s.step}. {s.stage}
                  </span>
                  <p className="text-xs text-[#CBD7EC] leading-relaxed font-sans">
                    {s.purpose}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[rgba(34,228,255,0.2)] text-[11px] text-[#2CFFB0] font-mono">
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
              <span className="wv-tag block mb-2">
                Tailored Scope
              </span>
              <h2 className="text-2xl sm:text-3xl font-display text-[#F2F7FF] tracking-wide">
                Choose the right scope for your business
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="text-xs uppercase tracking-widest text-[#22E4FF] hover:text-[#2CFFB0] transition-colors font-mono"
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
                    isGrowth ? 'border-[#22E4FF] shadow-[0_0_25px_rgba(34,228,255,0.3)] bg-[rgba(34,228,255,0.08)]' : ''
                  }`}
                >
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#22E4FF] block mb-1 font-mono">
                      Level
                    </span>
                    <h3 className="text-2xl font-display text-[#F2F7FF] mb-1 tracking-wide">{level.name}</h3>
                    <p className="text-xs text-[#2CFFB0] font-mono mb-4">{level.tagline}</p>
                    <p className="text-xs text-[#CBD7EC] mb-6 leading-relaxed font-sans">
                      {level.bestFor}
                    </p>

                    <div className="space-y-2 mb-6 pt-4 border-t border-[rgba(34,228,255,0.18)]">
                      {level.features.slice(0, 4).map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#CBD7EC] font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22E4FF] shadow-[0_0_8px_#22E4FF] mt-1.5 shrink-0" />
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
            <span className="wv-tag block mb-2">
              Step 1: Conversation
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-[#F2F7FF] mb-4 tracking-wide">
              Ready to give your business its digital home?
            </h2>
            <p className="text-sm sm:text-base text-[#CBD7EC] leading-relaxed font-sans mb-8">
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
