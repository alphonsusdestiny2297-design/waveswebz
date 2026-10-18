/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { PageId, ServiceLevelId } from '../types';
import { 
  WHATSAPP_CONTACT, 
  WHATSAPP_LINK, 
  SERVICE_LEVELS, 
  CUSTOMER_JOURNEY_STAGES,
  PROCESS_STEPS
} from '../constants';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: (levelId?: ServiceLevelId) => void;
  onOpenChat: () => void;
}

const HERO_SLIDES = [
  {
    url: '/assets/images/skyline_golden_lake_1790663127615.jpg',
    title: 'Precision Craftsmanship',
    subtitle: 'High-converting digital homes tailored for Nigerian enterprises'
  },
  {
    url: '/assets/images/skyscrapers_night_water_1790663140393.jpg',
    title: 'Credibility That Converts',
    subtitle: 'Turn casual social browsers into paying customers'
  },
  {
    url: '/assets/images/city_street_rainy_chrysler_1790663155616.jpg',
    title: 'Fast Mobile-First Foundations',
    subtitle: 'Engineered to open in seconds on real smartphone connections'
  },
  {
    url: '/assets/images/urban_golden_hour_street_1790663189316.jpg',
    title: 'Integrated WhatsApp AI',
    subtitle: 'Automated appointment booking and 24/7 lead qualification'
  }
];

const BUSINESS_TYPES = [
  'Clinics',
  'Law firms',
  'Salons',
  'Restaurants',
  'Schools',
  'Real estate',
  'Logistics',
  'Boutiques'
];

const SOLUTIONS = [
  {
    title: 'Websites',
    desc: 'Fast, mobile-first sites that say who you are and make it easy to buy, book or call.',
    linkText: 'Explore website packages →',
    targetPage: 'services' as PageId,
    level: 'growth' as ServiceLevelId,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>
      </svg>
    )
  },
  {
    title: 'AI receptionist',
    desc: 'Answers questions on WhatsApp at any hour, then hands over to your team when it matters.',
    linkText: 'See how AI receptionist works →',
    targetPage: 'ai' as PageId,
    level: 'ai-growth' as ServiceLevelId,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h16v11H9l-5 4z"/>
      </svg>
    )
  },
  {
    title: 'Lead qualifier',
    desc: 'Asks the right questions, separates serious buyers from browsers and routes them to the right person.',
    linkText: 'Qualify WhatsApp leads →',
    targetPage: 'ai' as PageId,
    level: 'ai-growth' as ServiceLevelId,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5h18l-7 8v6l-4-2v-4z"/>
      </svg>
    )
  },
  {
    title: 'Appointment booking',
    desc: 'Customers pick a time in chat or on your site. Reminders go out on their own.',
    linkText: 'Automate bookings →',
    targetPage: 'services' as PageId,
    level: 'growth' as ServiceLevelId,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4"/>
      </svg>
    )
  },
  {
    title: 'Follow-up',
    desc: 'Polite, timely nudges that keep every enquiry warm until it replies or closes.',
    linkText: 'Warm up customer leads →',
    targetPage: 'ai' as PageId,
    level: 'ai-growth' as ServiceLevelId,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"/>
      </svg>
    )
  },
  {
    title: 'Custom automation',
    desc: 'A process that eats your week? We design it, connect your tools and make it run itself.',
    linkText: 'Custom scoping →',
    targetPage: 'process' as PageId,
    level: 'growth' as ServiceLevelId,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 4 14h7l-1 8 9-12h-7z"/>
      </svg>
    )
  }
];

const PROMISES = [
  {
    strong: 'Phone first',
    desc: 'Most of your customers browse on a phone. We design for that screen first.'
  },
  {
    strong: 'Light on data',
    desc: 'Compressed images and lean code, so pages open on weak networks.'
  },
  {
    strong: 'WhatsApp built in',
    desc: "A chat button on every page, with the customer's message already filled in."
  },
  {
    strong: 'A human behind it',
    desc: 'AI handles the routine. You and your team stay in control of everything important.'
  }
];

const FAQS = [
  {
    q: 'How long does a website take?',
    a: 'Most business sites go live within a few weeks. We confirm a timeline in writing after the first call.'
  },
  {
    q: 'Do I need the WhatsApp Business app?',
    a: 'It helps. We can set it up with you, or connect the AI receptionist to a number you already use.'
  },
  {
    q: 'Will the AI say something wrong to my customers?',
    a: 'It only answers from the information you approve, and it hands over to you when it is unsure.'
  },
  {
    q: 'What does it cost?',
    a: 'Every project is quoted after a free call, with the full price and timeline before we start.'
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenQuote, onOpenChat }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previewMode, setPreviewMode] = useState<'chat' | 'gallery'>('chat');
  const [formName, setFormName] = useState('');
  const [formBusiness, setFormBusiness] = useState('');
  const [formNeed, setFormNeed] = useState('Website + AI');
  const touchStartX = useRef<number | null>(null);

  // Background slides rotation for the visual showcase
  useEffect(() => {
    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      }
    }
    touchStartX.current = null;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = WHATSAPP_CONTACT.replace(/\D/g, '');
    const message = `Hello Waves, I am ${formName || 'a business owner'} from ${formBusiness || 'my business'}. I need: ${formNeed}.`;
    const targetUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    
    const a = document.createElement('a');
    a.href = targetUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full">
      <a className="skip" href="#solutions">Skip to content</a>

      {/* ============================================================
          1. HERO SECTION WITH INTEGRATED SHOWCASE & STAGE
         ============================================================ */}
      <header className="hero" id="top">
        <div className="blob b-a" aria-hidden="true" />
        <div className="blob b-b" aria-hidden="true" />

        <div className="wrap">
          <div className="hero-row">
            {/* Hero Left Copy */}
            <div className="hero-copy">
              <div className="glass badge">
                <span className="dot" />
                <span>Websites + WhatsApp AI for Nigerian businesses</span>
              </div>

              <h1 className="disp">
                Your business.
                <span className="g">Your digital home.</span>
              </h1>

              <p className="lead">
                We build fast, mobile-first business websites that earn customer trust, then add AI that answers customer questions on WhatsApp, books appointments and follows up automatically.
              </p>

              <div className="cta-group">
                <button 
                  type="button" 
                  onClick={() => onOpenQuote('growth')}
                  className="btn btn-solid"
                >
                  Start your project
                </button>
                <button 
                  type="button" 
                  onClick={() => onNavigate('services')}
                  className="btn glass btn-ghost"
                >
                  Explore Services
                </button>
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <ul className="trust">
                <li>Built for phones first</li>
                <li>Works on slow networks</li>
                <li>Clear price before we start</li>
              </ul>
            </div>

            {/* Hero Right Stage: Interactive Dual-Mode Preview */}
            <div className="stage" aria-label="Preview of a Waves website and AI receptionist">
              {/* Tab Selector between WhatsApp Simulation & Visual Gallery */}
              <div className="flex items-center justify-between p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-1">
                <button
                  type="button"
                  onClick={() => setPreviewMode('chat')}
                  className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all ${
                    previewMode === 'chat' 
                      ? 'bg-[#1747D8] text-white shadow-md' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  WhatsApp AI Demo
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('gallery')}
                  className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all ${
                    previewMode === 'gallery' 
                      ? 'bg-[#1747D8] text-white shadow-md' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Visual Showcase
                </button>
              </div>

              {previewMode === 'chat' ? (
                <>
                  <div className="glass site">
                    <div className="bar">
                      <b />
                      <b />
                      <b />
                      <span className="url">yourbusiness.ng</span>
                    </div>
                    <div className="pg">
                      <div className="sk" style={{ width: '62%' }} />
                      <div className="sk" style={{ width: '44%', marginTop: '10px', opacity: 0.55 }} />
                      <a 
                        href={WHATSAPP_LINK} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          height: '34px',
                          width: '160px',
                          borderRadius: '999px',
                          background: '#1FAE5B',
                          marginTop: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#ffffff'
                        }}
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Live WhatsApp chat simulation */}
                  <div 
                    className="glass chat cursor-pointer" 
                    onClick={onOpenChat} 
                    title="Click to launch interactive Waves AI Concierge"
                  >
                    <h2>
                      <span className="dot" />
                      <span>AI receptionist · online now</span>
                    </h2>
                    <div className="msgs">
                      <div className="m u">Good afternoon, any slot on Thursday?</div>
                      <div className="m a">Yes: 2:00 PM or 4:30 PM. Should I book one?</div>
                      <div className="m u">2:00 PM please.</div>
                      <div className="m a">Booked. I will remind you on Wednesday.</div>
                    </div>
                  </div>

                  <div className="glass chip">
                    <span>✓ New lead qualified</span>
                  </div>
                </>
              ) : (
                /* Interactive Photography Slider */
                <div 
                  className="hero-slider-section"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="slideshow-track">
                    {HERO_SLIDES.map((slide, idx) => (
                      <div
                        key={idx}
                        className={`slide-item ${idx === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url("${slide.url}")` }}
                      />
                    ))}
                  </div>
                  <div className="hero-vignette" />
                  <div className="hero-center-content">
                    <span className="wv-tag mb-2">Showcase Gallery</span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                      {HERO_SLIDES[currentSlide].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#CBD7EC] leading-relaxed">
                      {HERO_SLIDES[currentSlide].subtitle}
                    </p>
                  </div>

                  {/* Slide Indicator Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/20">
                    {HERO_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentSlide 
                            ? 'w-6 bg-[#7CC0FF] shadow-[0_0_10px_#7CC0FF]' 
                            : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`Show slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Animated Waves Divider */}
        <div className="waves" aria-hidden="true">
          <svg className="w1" viewBox="0 0 2400 120" preserveAspectRatio="none">
            <path d="M0 60C100 20 200 20 300 60S500 100 600 60 800 20 900 60s200 40 300 0 200-40 300 0 200 40 300 0 200-40 300 0 200 40 300 0V120H0Z" fill="rgba(124,192,255,.3)"/>
          </svg>
          <svg className="w2 w3" viewBox="0 0 2400 120" preserveAspectRatio="none">
            <path d="M0 60C100 20 200 20 300 60S500 100 600 60 800 20 900 60s200 40 300 0 200-40 300 0 200 40 300 0 200-40 300 0 200 40 300 0V120H0Z" fill="rgba(255,255,255,.25)"/>
          </svg>
          <svg viewBox="0 0 2400 120" preserveAspectRatio="none" style={{ width: '100%', height: '46%' }}>
            <path d="M0 60C300 10 600 110 1200 60S2100 10 2400 60V120H0Z" fill="var(--bg)"/>
          </svg>
        </div>
      </header>

      {/* ============================================================
          2. BUSINESS CATEGORIES PILLS
         ============================================================ */}
      <section className="sec" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <p className="kicker" style={{ margin: '0 0 14px' }}>
            Made for businesses like yours
          </p>
          <ul className="who">
            {BUSINESS_TYPES.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================
          3. SOLUTIONS GRID (WITH DIRECT SUBPAGE ROUTING)
         ============================================================ */}
      <section className="sec" id="solutions">
        <div className="wrap">
          <div className="head">
            <h2 className="t disp">Everything you need to be found, trusted and chosen.</h2>
            <p className="sub">Start with a website that works hard. Add AI for the conversations your team has no time for.</p>
          </div>
          <div className="grid">
            {SOLUTIONS.map((sol) => (
              <article key={sol.title} className="card sol flex flex-col justify-between">
                <div>
                  <div className="ico">{sol.icon}</div>
                  <h3 className="disp">{sol.title}</h3>
                  <p>{sol.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => onNavigate(sol.targetPage)}
                    className="text-left text-[var(--link)] font-bold cursor-pointer hover:underline text-sm"
                  >
                    {sol.linkText}
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenQuote(sol.level)}
                    className="text-xs uppercase font-bold text-white/70 hover:text-white"
                  >
                    Quote
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          4. SERVICE PACKAGES COMPARISON (RESTORED OLD FEATURE)
         ============================================================ */}
      <section className="sec" style={{ paddingTop: '24px' }}>
        <div className="wrap">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="wv-tag block mb-2">Scope & Tiers</span>
              <h2 className="t disp">Choose the right package for your business</h2>
              <p className="sub">Firm written quotes and clear deliverables before any build starts.</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="text-sm font-bold text-[var(--link)] hover:underline inline-flex items-center gap-1.5"
            >
              <span>Compare Full Deliverables</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                        <span className="text-[10px] uppercase tracking-wider text-[#7CC0FF] bg-[#2F7BFF]/20 px-2.5 py-0.5 rounded-full border border-[#7CC0FF]/40 font-mono">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">{level.name}</h3>
                    <p className="text-xs text-[#1FAE5B] font-mono mb-4">{level.tagline}</p>
                    <p className="text-xs sm:text-sm text-[#A9BCDD] mb-6 leading-relaxed">
                      {level.description}
                    </p>

                    <div className="space-y-2 mb-6 pt-4 border-t border-white/10">
                      {level.features.slice(0, 4).map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#EAF2FF]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7CC0FF] mt-1.5 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenQuote(level.id)}
                    className={isGrowth ? 'btn btn-blue w-full text-center' : 'btn glass btn-ghost w-full text-center'}
                  >
                    Select {level.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          5. 5-STAGE CUSTOMER JOURNEY PREVIEW (RESTORED OLD FEATURE)
         ============================================================ */}
      <section className="sec" style={{ paddingTop: '24px' }}>
        <div className="wrap">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="wv-tag block mb-2">Framework</span>
              <h2 className="t disp">The 5-Stage Customer Journey</h2>
              <p className="sub">Every page and element corresponds to a verified stage in buyer psychology.</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('journey')}
              className="text-sm font-bold text-[var(--link)] hover:underline inline-flex items-center gap-1.5"
            >
              <span>Explore Framework Details</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CUSTOMER_JOURNEY_STAGES.map((s) => (
              <div key={s.step} className="card p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-[#7CC0FF] uppercase tracking-wider block mb-2 font-bold">
                    0{s.step}. {s.stage}
                  </span>
                  <p className="text-xs text-[#A9BCDD] leading-relaxed">
                    {s.purpose}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#1FAE5B] font-mono">
                  {s.exampleFeatures[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          6. HOW IT WORKS / 9-STEP PROCESS PREVIEW
         ============================================================ */}
      <section className="sec" id="process" style={{ paddingTop: '24px' }}>
        <div className="wrap">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="wv-tag block mb-2">Methodology</span>
              <h2 className="t disp">From first call to live, in four core phases</h2>
              <p className="sub">You review the architecture and conversational flows before anything is built.</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('process')}
              className="text-sm font-bold text-[var(--link)] hover:underline inline-flex items-center gap-1.5"
            >
              <span>View Full 9-Step Roadmap</span>
              <span>→</span>
            </button>
          </div>

          <div className="steps">
            {PROCESS_STEPS.slice(0, 4).map((step) => (
              <div key={step.stepNumber} className="card step">
                <h3 className="disp">{step.name}</h3>
                <p>{step.whatHappens}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          7. WHY WAVES / COMMITMENTS
         ============================================================ */}
      <section className="sec" id="why" style={{ paddingTop: '24px' }}>
        <div className="wrap">
          <div className="head">
            <h2 className="t disp">What you can hold us to.</h2>
            <p className="sub">Plain commitments instead of vague promises.</p>
          </div>
          <div className="promise">
            {PROMISES.map((p) => (
              <div key={p.strong} className="card">
                <strong>{p.strong}</strong>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          8. WAVES LABS
         ============================================================ */}
      <section className="sec" id="labs" style={{ paddingTop: '24px' }}>
        <div className="wrap">
          <div className="labs">
            <div>
              <span className="glass badge">Waves Labs</span>
              <h2 className="disp">Where we test what's next, before you need it.</h2>
              <p>
                The research and build arm behind Waves: AI agents, automation and interfaces, prototyped in the open and shipped to clients once they are ready.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  type="button"
                  onClick={() => onOpenQuote('ai-growth')}
                  className="btn btn-solid"
                >
                  Ask about Waves Labs
                </button>
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="btn glass btn-ghost"
                >
                  Test AI Concierge
                </button>
              </div>
            </div>

            <div aria-hidden="true">
              <div className="orbit">
                <div className="ring" style={{ inset: 0 }}>
                  <i />
                </div>
                <div className="ring" style={{ inset: '30px', animationDirection: 'reverse', animationDuration: '16s' }}>
                  <i />
                </div>
                <div className="glass core">Labs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          9. FAQ ACCORDIONS
         ============================================================ */}
      <section className="sec" id="faq" style={{ paddingTop: '24px' }}>
        <div className="wrap faq">
          <div className="head">
            <h2 className="t disp">Questions we get a lot.</h2>
          </div>
          {FAQS.map((faq, idx) => (
            <details key={faq.q} className="card" open={idx === 0 ? true : undefined}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ============================================================
          10. DIRECT WHATSAPP INTAKE FORM
         ============================================================ */}
      <section className="final" id="contact">
        <div className="blob b-b" style={{ top: '-120px' }} aria-hidden="true" />
        <div className="wrap">
          <div className="glass">
            <div>
              <h2 className="disp">Ready to give your business a home that works?</h2>
              <p style={{ marginTop: '16px' }}>
                Tell us about your business. We reply on WhatsApp with a clear plan, a timeline and a price.
              </p>
              <div className="mt-8 space-y-3">
                <p className="text-sm text-[#E3EEFF]">
                  ✓ Firm written quote with zero hidden charges
                </p>
                <p className="text-sm text-[#E3EEFF]">
                  ✓ Mobile-first, optimized for Nigerian smartphone networks
                </p>
                <p className="text-sm text-[#E3EEFF]">
                  ✓ Direct connection to WhatsApp (+234 810 046 1332)
                </p>
              </div>
            </div>

            <div>
              <form id="f" onSubmit={handleContactSubmit}>
                <label>
                  <span>Your name</span>
                  <input 
                    name="n" 
                    required 
                    autoComplete="name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Chinedu Okafor"
                  />
                </label>

                <label>
                  <span>Business name</span>
                  <input 
                    name="b" 
                    required 
                    autoComplete="organization"
                    value={formBusiness}
                    onChange={(e) => setFormBusiness(e.target.value)}
                    placeholder="e.g. Apex Health Clinic"
                  />
                </label>

                <label>
                  <span>What do you need?</span>
                  <select 
                    name="w"
                    value={formNeed}
                    onChange={(e) => setFormNeed(e.target.value)}
                  >
                    <option>A new website</option>
                    <option>An AI receptionist on WhatsApp</option>
                    <option>Website + AI</option>
                    <option>Something else</option>
                  </select>
                </label>

                <button className="btn btn-wa mt-2 w-full justify-center" type="submit">
                  Send on WhatsApp
                </button>
                <p className="note">
                  This opens WhatsApp with your message filled in. Nothing is sent until you tap send.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
