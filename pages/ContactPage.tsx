/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { WHATSAPP_LINK, WHATSAPP_CONTACT } from '../constants';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    businessType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full">
      {/* Page Header Band with Uploaded Night Skyline Image */}
      <div 
        className="page-header-band"
        style={{ backgroundImage: `url('/assets/images/skyscrapers_night_water_1790663140393.jpg')` }}
      >
        <div className="page-header-overlay" />
        <h1 className="font-display font-black uppercase tracking-[0.14em] neon-text">contact</h1>
        <p className="page-header-subtitle">Direct Consultation & Quote Enquiries</p>
      </div>

      <div className="content-shell">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Direct channels using the user's CSS contact-card style */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="wv-tag block mb-2">
                Reach Us Directly
              </span>
              <h2 className="text-3xl font-display text-[#F2F7FF] mb-3 tracking-wide">
                Let's discuss your business online presence.
              </h2>
              <p className="text-base text-[#CBD7EC] font-sans leading-relaxed">
                Connect directly on WhatsApp or submit your project details. We review every enquiry personally and provide a clear written scope.
              </p>
            </div>

            {/* WhatsApp Contact Card */}
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-gold-card group"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.06 8.06 0 0 1-1.24-4.28c0-4.45 3.62-8.07 8.16-8.07 4.45 0 8.07 3.62 8.07 8.07s-3.62 8.12-8.07 8.12zm4.43-6.05c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.95-1.21-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.11-.5.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.54-1.31-.74-1.79-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.65.31-.22.24-.84.83-.84 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.13 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.43-.59 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.11-.22-.17-.46-.29z"/>
              </svg>
              <div>
                <span className="block text-xl font-display text-[#F2F7FF] tracking-wide group-hover:text-[#22E4FF] transition-colors">
                  {WHATSAPP_CONTACT}
                </span>
                <span className="block text-xs text-[#CBD7EC] font-sans mt-0.5">
                  Direct WhatsApp Chat · Fast response for Nigerian businesses
                </span>
              </div>
            </a>

            {/* Email Contact Card */}
            <div className="contact-gold-card">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <div>
                <span className="block text-xl font-display text-[#F2F7FF] tracking-wide">
                  hello@wavesdigital.ng
                </span>
                <span className="block text-xs text-[#CBD7EC] font-sans mt-0.5">
                  Official project quotes & written correspondence
                </span>
              </div>
            </div>

            <div className="gold-card p-5">
              <h4 className="text-xs uppercase tracking-wider text-[#22E4FF] font-mono mb-2">
                Location & Coverage:
              </h4>
              <p className="text-xs sm:text-sm text-[#CBD7EC] font-sans leading-relaxed">
                Operating nationwide across Nigeria — Lagos, Abuja, Port Harcourt, Ibadan, and all commercial centers. Delivered securely with mobile-optimized performance.
              </p>
            </div>
          </div>

          {/* Quick Consultation Form */}
          <div className="lg:col-span-6">
            <div className="gold-card p-6 sm:p-8">
              <h3 className="text-xl font-display text-[#F2F7FF] mb-2 tracking-wide">
                Send a Direct Message
              </h3>
              <p className="text-xs text-[#CBD7EC] font-sans mb-6 leading-relaxed">
                Tell us about your business. We will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-[rgba(34,228,255,0.12)] border border-[#22E4FF] text-center space-y-3">
                  <div className="font-display font-black uppercase tracking-wider text-3xl text-[#22E4FF]">Thank you</div>
                  <p className="text-sm font-sans text-[#F2F7FF]">
                    Your message has been received. Our team will contact you shortly.
                  </p>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta inline-block mt-2"
                  >
                    Open Immediate WhatsApp Chat →
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#22E4FF] font-mono mb-1.5">
                      Your Name / Business Name *
                    </label>
                    <input 
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Apex Logistics / Adeola"
                      className="wv-input py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#22E4FF] font-mono mb-1.5">
                      Phone Number or WhatsApp *
                    </label>
                    <input 
                      type="text"
                      required
                      value={formData.emailOrPhone}
                      onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                      placeholder="+234 810 000 0000"
                      className="wv-input py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#22E4FF] font-mono mb-1.5">
                      Service Interested In
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="wv-input py-2.5 text-sm"
                    >
                      <option value="" className="bg-[#040914] text-[#F2F7FF]">Select scope level...</option>
                      <option value="launch" className="bg-[#040914] text-[#F2F7FF]">Launch — Digital Home Foundation</option>
                      <option value="growth" className="bg-[#040914] text-[#F2F7FF]">Growth — Conversion & Full Catalog</option>
                      <option value="ai-growth" className="bg-[#040914] text-[#F2F7FF]">AI Growth — Growth + Grounded AI Concierge</option>
                      <option value="consultation" className="bg-[#040914] text-[#F2F7FF]">General Consultation & Redesign</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#22E4FF] font-mono mb-1.5">
                      Message / Project Details
                    </label>
                    <textarea 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe what your business does and what you want the website to accomplish..."
                      className="wv-input py-2.5 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="cta w-full py-3"
                  >
                    Submit Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;
