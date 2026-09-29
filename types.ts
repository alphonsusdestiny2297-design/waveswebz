/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type PageId = 'home' | 'about' | 'journey' | 'services' | 'process' | 'ai' | 'contact';

export type ServiceLevelId = 'launch' | 'growth' | 'ai-growth';

export interface ServiceLevel {
  id: ServiceLevelId;
  name: string;
  tagline: string;
  bestFor: string;
  description: string;
  features: string[];
  deliverables: string[];
  recommendedAddons?: string[];
  pricingNote: string;
}

export interface CustomerJourneyStage {
  step: number;
  stage: 'Discover' | 'Understand' | 'Trust' | 'Enquire' | 'Act';
  purpose: string;
  whatItDoes: string;
  frictionRemoved: string;
  exampleFeatures: string[];
}

export interface ProcessStep {
  stepNumber: number;
  name: string;
  whatHappens: string;
  clientRole: string;
}

export interface AIModule {
  id: string;
  name: string;
  description: string;
  businessBenefit: string;
  guardrail: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: 'General' | 'Process' | 'AI' | 'Technical';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface QuoteRequestData {
  businessName: string;
  contactPerson: string;
  phoneOrWhatsApp: string;
  email: string;
  businessType: string;
  serviceLevel: ServiceLevelId;
  selectedAIModules: string[];
  currentOnlinePresence: string;
  primaryGoal: string;
  hasLogoAndContent: 'ready' | 'partial' | 'need-help';
  additionalNotes?: string;
}
