/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { ServiceLevel, CustomerJourneyStage, ProcessStep, AIModule, FAQItem } from './types';

export const BRAND_NAME = 'Waves';
export const BRAND_TAGLINE = 'Your Business. Your Digital Home.';
export const WHATSAPP_CONTACT = '+2348100461332';
export const WHATSAPP_LINK = 'https://wa.me/2348100461332?text=Hello%20Waves,%20I%20would%20like%20to%20discuss%20a%20digital%20home%20for%20my%20business.';

export const BELIEFS = [
  'A website should work for the business, not just look good.',
  'A small business does not need a small-looking digital presence.',
  'Customers should understand your offer quickly and easily.',
  'Good design removes confusion and builds confidence.',
  'Technology should solve a real business problem.',
  'Simple, clear, and reliable is better than complicated and impressive-looking.',
  'Every feature should have a purpose and a measurable reason to exist.'
];

export const CUSTOMER_JOURNEY_STAGES: CustomerJourneyStage[] = [
  {
    step: 1,
    stage: 'Discover',
    purpose: 'The visitor finds the business or receives the link.',
    whatItDoes: 'Provides one clear, memorable web link you can share on WhatsApp, Instagram bio, business cards, invoices, search, and adverts.',
    frictionRemoved: 'Ends the confusion of scattered screenshots, disappearing status updates, or lost direct messages.',
    exampleFeatures: ['Fast mobile-first load speed', 'Clean custom domain', 'Social share preview cards', 'SEO metadata foundations']
  },
  {
    step: 2,
    stage: 'Understand',
    purpose: 'They quickly learn what you offer and who it is for.',
    whatItDoes: 'Presents your services, products, pricing transparency, and business hours in plain language that customers grasp in seconds.',
    frictionRemoved: 'Eliminates back-and-forth "How much is this?" messages when customers simply need straightforward information.',
    exampleFeatures: ['Plain-language service menus', 'Clear product/service catalogues', 'Target audience clarity', 'Location and hours']
  },
  {
    step: 3,
    stage: 'Trust',
    purpose: 'They see proof, clarity, professionalism, and useful information.',
    whatItDoes: 'Builds customer confidence with genuine testimonials, official business details, verified work samples, and transparent policies.',
    frictionRemoved: 'Calms buyer hesitation, scam anxiety, and uncertainty about whether your business is active and legitimate.',
    exampleFeatures: ['Verified client testimonials', 'Business registration/CAC info', 'Clear project galleries', 'Practical FAQs']
  },
  {
    step: 4,
    stage: 'Enquire',
    purpose: 'They have an easy way to ask a question, request a quote, or contact you.',
    whatItDoes: 'Gives customers structured ways to reach you via one-click WhatsApp, phone calls, location maps, or lead capture forms.',
    frictionRemoved: 'Removes dead ends. Ensures interested buyers do not bounce because contacting you felt tedious or confusing.',
    exampleFeatures: ['One-tap WhatsApp buttons', 'Direct click-to-call links', 'Structured quote forms', 'Google Maps integration']
  },
  {
    step: 5,
    stage: 'Act',
    purpose: 'They take the next step: call, message, book, buy, visit, or follow up.',
    whatItDoes: 'Guides qualified visitors directly into your sales pipeline or service workflow with minimal steps.',
    frictionRemoved: 'Transforms casual browser interest into tangible business enquiries and booked conversations.',
    exampleFeatures: ['Service booking flows', 'Consultation requests', 'Down-payment directions', 'Conversion analytics tracking']
  }
];

export const SERVICE_LEVELS: ServiceLevel[] = [
  {
    id: 'launch',
    name: 'Launch',
    tagline: 'Your Professional Digital Home',
    bestFor: 'Businesses needing a solid, professional online presence that establishes credibility and makes contacting easy.',
    description: 'A professional digital home with essential business information, contact options, mobile-first design, and a clear customer journey.',
    features: [
      'Mobile-first responsive presentation across all devices',
      'Clean presentation of your services, products, and story',
      'Direct WhatsApp chat and click-to-call integration',
      'Essential business contact form & location details',
      'Basic search-engine optimization (SEO) & metadata',
      'Fast loading speed optimized for mobile networks',
      'Clear customer journey: Discover, Understand, Trust, Enquire, Act'
    ],
    deliverables: [
      'Discovery conversation & scope document',
      'Up to 3-5 core page sections / structured layout',
      'WhatsApp & phone click-to-action routing',
      'Testing across mobile phones, tablets, and desktop',
      'Handover and publishing process'
    ],
    pricingNote: 'Pricing is scoped transparently based on your pages, content readiness, and requirements. You receive a firm quote before work begins.'
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'Conversion-Focused & Expanded Reach',
    bestFor: 'Growing businesses that want stronger customer conversion, detailed catalogues, structured enquiry forms, and performance tracking.',
    description: 'A more conversion-focused website with expanded pages, deeper trust elements, structured quote flows, and analytics measurement.',
    features: [
      'Everything in Launch, with expanded multi-page architecture',
      'Structured quote-request or service booking flows',
      'Expanded portfolio, case studies, or product catalogue',
      'Enhanced trust signals: verified reviews, FAQs, credentials',
      'Analytics and conversion tracking (WhatsApp clicks, forms, calls)',
      'Custom form validations & spam protection',
      'Content architecture designed to support paid ads & referrals'
    ],
    deliverables: [
      'Detailed discovery & competitor baseline review',
      'Multi-page / section architecture tailored to your offer',
      'Action tracking setup for WhatsApp, forms, and phone clicks',
      'Structured enquiry-capture pipeline',
      'Formal review, revisions, and launch handover'
    ],
    pricingNote: 'Pricing is scoped transparently based on scope, integrations, and content preparation. You receive a firm quote before work begins.'
  },
  {
    id: 'ai-growth',
    name: 'AI Growth',
    tagline: 'Growth Site + High-Value AI Modules',
    bestFor: 'Established businesses with specific customer communication, lead qualification, or quote intake bottlenecks.',
    description: 'A Growth website plus carefully selected AI features designed for a specific customer or operational problem—grounded strictly in your approved data.',
    features: [
      'Everything in Growth, plus tailored Waves AI modules',
      'AI Website Concierge answering questions from approved business data',
      'AI Lead Qualifier collecting customer requirements before handoff',
      'AI Quote Assistant capturing project details (never invents pricing)',
      'AI FAQ Assistant handling repetitive inquiries 24/7',
      'Graceful fallbacks and human escalation path always guaranteed',
      'Strict guardrails: zero hallucinated pricing, policies, or guarantees'
    ],
    deliverables: [
      'Knowledge-base structuring from your verified documents',
      'Customized AI assistant with approved business scope',
      'WhatsApp / email handoff to your team',
      'Testing for safe responses and edge cases',
      'Ongoing monitoring and update guidelines'
    ],
    pricingNote: 'Scoped individually based on website requirements plus specific AI module configuration and data setup. Quoted before work begins.'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    name: 'Conversation',
    whatHappens: 'We learn about your business, your daily operations, and what you want the website to achieve.',
    clientRole: 'Share what your business does, who your customers are, and how you currently receive enquiries.'
  },
  {
    stepNumber: 2,
    name: 'Discovery',
    whatHappens: 'We identify your target customers, your core offer, required content, priorities, and essential features.',
    clientRole: 'Highlight your best services or products, typical customer questions, and preferred contact channels.'
  },
  {
    stepNumber: 3,
    name: 'Recommendation',
    whatHappens: 'We propose the right level of website (Launch, Growth, or AI Growth) and explain the exact project scope in plain language.',
    clientRole: 'Review our recommendation, ask questions, and confirm the direction fits your business budget and timeline.'
  },
  {
    stepNumber: 4,
    name: 'Agreement',
    whatHappens: 'We confirm deliverables, timeline, payment terms, responsibilities, and revision limits in writing.',
    clientRole: 'Approve the scope and terms so work can begin with clear expectations on both sides.'
  },
  {
    stepNumber: 5,
    name: 'Content',
    whatHappens: 'We organize your business information, services, contact details, prices, brand assets, and approvals.',
    clientRole: 'Provide accurate business information, your logo, brand colors, photos, and any proof points.'
  },
  {
    stepNumber: 6,
    name: 'Build',
    whatHappens: 'We design, develop, integrate, and test the agreed mobile-first experience using reusable, dependable components.',
    clientRole: 'Our team builds the site while you focus on running your business.'
  },
  {
    stepNumber: 7,
    name: 'Review',
    whatHappens: 'You review the agreed build on your phone and computer, and provide consolidated feedback.',
    clientRole: 'Check details, test WhatsApp links and forms, and share any necessary refinements within agreed scope.'
  },
  {
    stepNumber: 8,
    name: 'Launch',
    whatHappens: 'We publish or hand over the website according to the agreed arrangement, connecting your domain and live links.',
    clientRole: 'Celebrate your new digital home and begin sharing your link with customers across all channels.'
  },
  {
    stepNumber: 9,
    name: 'Support',
    whatHappens: 'You may continue with maintenance, technical updates, content adjustments, or analytics monitoring.',
    clientRole: 'Keep your digital home current as your business introduces new products or expands services.'
  }
];

export const AI_MODULES: AIModule[] = [
  {
    id: 'ai-concierge',
    name: 'AI Website Concierge',
    description: 'Answers customer questions accurately using only your pre-approved business information, prices, and services.',
    businessBenefit: 'Guides visitors to the right information 24/7, reducing repetitive inquiries while maintaining brand consistency.',
    guardrail: 'Strictly restricted to approved business data; escalates to WhatsApp or human staff whenever unsure.'
  },
  {
    id: 'ai-lead-qualifier',
    name: 'AI Lead Qualifier',
    description: 'Asks practical questions (location, timeline, budget range, service type) before passing the enquiry to your team.',
    businessBenefit: 'Ensures your team only spends time on serious, qualified prospects with context ready in hand.',
    guardrail: 'Collects information only; never promises pricing or confirms deadlines without your team approval.'
  },
  {
    id: 'ai-quote-assistant',
    name: 'AI Quote Assistant',
    description: 'Collects project specifications, dimensions, quantities, or service needs from customers before a quote is prepared.',
    businessBenefit: 'Speeds up quoting by gathering all requirements upfront, eliminating days of email/chat ping-pong.',
    guardrail: 'Collects quote inputs only — NEVER invents, guesses, or quotes prices autonomously.'
  },
  {
    id: 'ai-faq-assistant',
    name: 'AI FAQ Assistant',
    description: 'Instantly answers frequent customer questions about business hours, delivery areas, booking steps, and policies.',
    businessBenefit: 'Provides immediate answers to impatient buyers on mobile who might otherwise leave.',
    guardrail: 'Directly answers from a controlled knowledge base; never hallucinates store policies.'
  },
  {
    id: 'ai-recommendation-assistant',
    name: 'AI Recommendation Assistant',
    description: 'Helps visitors choose between relevant service packages or products based on their specific situation.',
    businessBenefit: 'Removes decision paralysis for first-time buyers who are unsure which tier or product they need.',
    guardrail: 'Explains trade-offs using approved product descriptions; avoids subjective or exaggerated claims.'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'Do I need to understand websites or coding?',
    answer: 'No. We explain the entire process in plain language and guide you through every decision. You tell us about your business, and we build the system to support it.',
    category: 'General'
  },
  {
    question: 'Can my website send people directly to WhatsApp?',
    answer: 'Yes. WhatsApp is the heartbeat of Nigerian business communication. Every Waves website can feature prominent, one-tap WhatsApp links with pre-filled enquiry messages.',
    category: 'General'
  },
  {
    question: 'Can I use my existing social-media pages?',
    answer: 'Yes. Your website does not replace your social media—it connects to them. Your Instagram, Facebook, TikTok, and LinkedIn can all direct visitors to your digital home where information is organized and permanent.',
    category: 'General'
  },
  {
    question: 'Can I update the website myself?',
    answer: 'That depends on the platform and scope agreed upon. We will clearly explain what you can manage on your own and what ongoing support options are available.',
    category: 'Technical'
  },
  {
    question: 'Can I add AI features later?',
    answer: 'Yes. Every Waves website is built with clean architecture so useful, modular AI features can be integrated whenever your business is ready for them.',
    category: 'AI'
  },
  {
    question: 'Will Waves guarantee sales or traffic?',
    answer: 'No. We do not guarantee sales, traffic, or lead volume. A website improves digital conditions (clarity, trust, reduced friction, professional credibility), but results also depend on your offer, pricing, service quality, reputation, and follow-up. We build to give your business the best possible chance to convert interested visitors.',
    category: 'Process'
  },
  {
    question: 'Can Waves redesign an existing website?',
    answer: 'Yes. We can review your current website, identify where visitors are encountering confusion or friction, and recommend specific improvements or a full rebuild.',
    category: 'Process'
  },
  {
    question: 'What do you need from me to get started?',
    answer: 'Accurate business information, contact details, service descriptions, your logo/brand colors, and photos or testimonials you are authorized to use. We guide you on exactly what is needed.',
    category: 'Process'
  }
];

export const WHAT_WAVES_PROMISES = [
  'Clear communication and a defined project scope before work starts.',
  'Professional work delivered according to agreed requirements.',
  'A website designed around your business objectives and customer needs.',
  'Mobile-responsive presentation and rigorous attention to usability.',
  'Honest advice about what you need — and what you do not need.',
  'No fake testimonials, fake results, or misleading claims.',
  'No false promises about traffic, leads, sales, or guaranteed business growth.',
  'Respect for your business information, brand assets, and approvals.'
];

export const WHAT_WAVES_DOES_NOT_PROMISE = [
  'We do not guarantee sales, traffic, or lead volume.',
  'A website is an important business asset, not a magic sales machine.',
  'Results depend on your offer, pricing, service quality, reputation, market demand, and customer follow-up.',
  'We promise a serious process, clear deliverables, and honest recommendations to improve your digital conditions.'
];
