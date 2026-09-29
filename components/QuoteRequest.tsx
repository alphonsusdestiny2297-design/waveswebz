/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { ServiceLevelId, QuoteRequestData } from '../types';
import { SERVICE_LEVELS, AI_MODULES, WHATSAPP_CONTACT } from '../constants';

interface QuoteRequestProps {
  isOpen: boolean;
  onClose: () => void;
  initialLevel?: ServiceLevelId;
}

const QuoteRequest: React.FC<QuoteRequestProps> = ({ isOpen, onClose, initialLevel = 'growth' }) => {
  const [formData, setFormData] = useState<QuoteRequestData>({
    businessName: '',
    contactPerson: '',
    phoneOrWhatsApp: '',
    email: '',
    businessType: 'Professional Services & Consulting',
    serviceLevel: initialLevel,
    selectedAIModules: [],
    currentOnlinePresence: 'Instagram / WhatsApp only',
    primaryGoal: 'Make it easier for customers to understand what we do and contact us',
    hasLogoAndContent: 'ready',
    additionalNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleAIModule = (moduleId: string) => {
    setFormData(prev => {
      const exists = prev.selectedAIModules.includes(moduleId);
      return {
        ...prev,
        selectedAIModules: exists 
          ? prev.selectedAIModules.filter(id => id !== moduleId) 
          : [...prev.selectedAIModules, moduleId]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendWhatsApp = () => {
    const selectedLevelName = SERVICE_LEVELS.find(l => l.id === formData.serviceLevel)?.name || formData.serviceLevel;
    const aiText = formData.selectedAIModules.length > 0 
      ? `\nAI Modules: ${formData.selectedAIModules.join(', ')}` 
      : '';
    
    const message = encodeURIComponent(
      `Hello Waves team,\n\nI would like to request a scope and quote for my business digital home:\n` +
      `• Business: ${formData.businessName || 'My Business'}\n` +
      `• Contact: ${formData.contactPerson || 'Business Owner'}\n` +
      `• Phone/WhatsApp: ${formData.phoneOrWhatsApp}\n` +
      `• Business Type: ${formData.businessType}\n` +
      `• Service Level: ${selectedLevelName}${aiText}\n` +
      `• Content Status: ${formData.hasLogoAndContent}\n` +
      `• Primary Goal: ${formData.primaryGoal}\n\n` +
      `Looking forward to Step 1 (Conversation) and our discovery chat!`
    );

    window.open(`https://wa.me/2348000000000?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          aria-label="Close quote modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Quote Request Received</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <strong>{formData.contactPerson || 'friend'}</strong>. Our team will review your business requirements for <strong>{formData.businessName || 'your business'}</strong> and reach out to begin <em>Step 1: Conversation</em>.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left max-w-md mx-auto mb-8 space-y-1.5 text-slate-700">
              <div><strong>Service Level:</strong> {SERVICE_LEVELS.find(l => l.id === formData.serviceLevel)?.name}</div>
              <div><strong>Contact:</strong> {formData.phoneOrWhatsApp || formData.email}</div>
              <div><strong>Next Step:</strong> 15-minute discovery chat to confirm exact scope before any pricing is agreed.</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleSendWhatsApp}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2"
              >
                <span>Continue on WhatsApp Now</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
                Project Discovery & Scope
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                Request a Scope & Quote for Your Digital Home
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tell us about your business. We scope deliverables clearly so there are never surprises.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Select Service Level */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  1. Desired Service Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SERVICE_LEVELS.map(level => (
                    <button
                      type="button"
                      key={level.id}
                      onClick={() => setFormData({ ...formData, serviceLevel: level.id })}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        formData.serviceLevel === level.id 
                          ? 'border-brand-600 bg-brand-50/60 ring-1 ring-brand-600/30' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900 block">{level.name}</span>
                      <span className="text-[11px] text-slate-500 leading-tight block mt-0.5 line-clamp-2">{level.tagline}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Optional AI Modules (if AI Growth selected) */}
              {formData.serviceLevel === 'ai-growth' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                    Optional AI Modules (Choose any that fit your operation):
                  </label>
                  <div className="space-y-2">
                    {AI_MODULES.map(m => (
                      <label key={m.id} className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.selectedAIModules.includes(m.name)}
                          onChange={() => toggleAIModule(m.name)}
                          className="mt-0.5 accent-brand-600 rounded"
                        />
                        <div>
                          <strong className="text-slate-900">{m.name}</strong> — {m.description}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Business Information */}
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  2. Business & Contact Information
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Business Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Health Clinic"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Contact Person Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Adaeze Okon"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +234 803 123 4567"
                      value={formData.phoneOrWhatsApp}
                      onChange={(e) => setFormData({ ...formData, phoneOrWhatsApp: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. clinic@apexhealth.ng"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-brand-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Business Category</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-brand-600"
                    >
                      <option>Professional Services & Consulting</option>
                      <option>Healthcare, Clinic or Pharmacy</option>
                      <option>Hospitality, Restaurant or Event Venue</option>
                      <option>Retail, Boutique or E-commerce</option>
                      <option>Real Estate, Construction or Engineering</option>
                      <option>Education, School or Training Center</option>
                      <option>Logistics, Cleaning or Field Services</option>
                      <option>Other SME / Growing Brand</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Logo & Content Readiness</label>
                    <select
                      value={formData.hasLogoAndContent}
                      onChange={(e) => setFormData({ ...formData, hasLogoAndContent: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-brand-600"
                    >
                      <option value="ready">Ready (Logo, service details & photos on hand)</option>
                      <option value="partial">Partial (Have some info, need help organizing)</option>
                      <option value="need-help">Need Help (Starting from scratch)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Primary Goal for the Website</label>
                  <input
                    type="text"
                    value={formData.primaryGoal}
                    onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                    placeholder="e.g. Customers should easily book appointments or message us on WhatsApp"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              {/* Pricing Policy Reminder */}
              <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-100 text-[11px] text-brand-900 leading-relaxed">
                <strong>Waves Pricing Standard:</strong> We review your pages and content readiness, then give you an exact, transparent quote before work begins. No hidden charges or unexpected fees.
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-colors text-center"
                >
                  Submit for Review & Quote
                </button>
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Fast WhatsApp Quote</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default QuoteRequest;
