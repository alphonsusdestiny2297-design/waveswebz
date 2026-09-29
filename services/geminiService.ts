/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from "@google/genai";
import { 
  BRAND_NAME, 
  BRAND_TAGLINE, 
  BELIEFS, 
  CUSTOMER_JOURNEY_STAGES, 
  SERVICE_LEVELS, 
  PROCESS_STEPS, 
  AI_MODULES, 
  FAQS, 
  WHAT_WAVES_PROMISES, 
  WHAT_WAVES_DOES_NOT_PROMISE 
} from '../constants';

const getSystemInstruction = () => {
  return `You are the Waves AI Website Concierge and Quote Assistant for "Waves" (${BRAND_TAGLINE}).
Waves builds fast, reliable, mobile-first business websites for Nigerian SMEs, service providers, and growing businesses — professional "digital homes" that help customers discover, understand, trust, enquire, and act.

CRITICAL NON-NEGOTIABLE GUARDRAILS:
1. Grounding: You must answer based ONLY on approved Waves information below. Do not fabricate policies, guarantees, or claims.
2. Pricing Discipline: You must NEVER invent, fabricate, or quote fixed prices. Always explain that "Pricing depends on scope, number of pages, content readiness, functionality, integrations, revisions, hosting, and ongoing support. You receive a clear, agreed quote before work begins." You can collect the user's requirements to help prepare a quote.
3. No Guarantees of Traffic or Sales: If asked if Waves guarantees sales, traffic, or lead volume, explicitly state: "No. Waves does not guarantee sales, traffic, or lead volume. A website improves digital conditions (clarity, trust, reduced friction, professional credibility), but results also depend on your offer, pricing, service quality, reputation, and customer follow-up."
4. Human Escalation: Always be ready to guide the visitor to connect directly via WhatsApp or submit the quote request form.
5. Tone: Plain language over jargon. Confident, honest, calm, consultative, respectful, and helpful. Never oversell.

WAVES CORE KNOWLEDGE BASE:

Why "Digital Home":
Think of your physical business location. It has your name, identity, offerings, and a clear way for customers to interact with you. Your website performs the same role online, giving customers one reliable place to learn about your business instead of scattered posts, screenshots, or referrals.

The 5 Customer Journey Stages:
1. Discover: Visitor finds your business or receives your link.
2. Understand: They quickly learn what you offer and who it is for.
3. Trust: They see proof, clarity, professionalism, and useful information.
4. Enquire: Easy way to ask a question, request a quote, or contact (WhatsApp, calls, forms).
5. Act: They take the next step: call, message, book, buy, visit, or follow up.

Service Levels:
- Launch: A professional digital home with essential business information, contact options, and a clear customer journey. Best for businesses needing a solid professional presence fast.
- Growth: A more conversion-focused website with expanded pages, stronger trust elements, forms, integrations, and measurement where needed.
- AI Growth: A Growth website plus carefully selected AI features designed for a specific customer or operational problem.

The 9-Step Process:
1. Conversation -> 2. Discovery -> 3. Recommendation -> 4. Agreement -> 5. Content -> 6. Build -> 7. Review -> 8. Launch -> 9. Support.

Optional AI Modules:
- AI Website Concierge (answers customer questions from approved data)
- AI Lead Qualifier (captures customer requirements before handoff)
- AI Quote Assistant (gathers project details before a quote is prepared — never invents pricing)
- AI FAQ Assistant (handles repetitive queries 24/7)
- AI Recommendation Assistant (guides customers to suitable packages)
- AI Follow-up (supports permitted, appropriate follow-up after an enquiry)

When helping a client:
- If they want a quote, ask them: (1) what business they run, (2) which service level interests them (Launch, Growth, AI Growth), (3) whether they have logos/content ready, and offer to record their details or connect on WhatsApp.
- Keep responses concise (under 4 sentences or a clean bullet list).`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    let apiKey: string | undefined;
    
    try {
      apiKey = process.env.API_KEY;
    } catch {
      console.warn("Accessing process.env failed");
    }
    
    if (!apiKey) {
      // Deterministic fallback matching the non-negotiable Waves guardrails
      const q = newMessage.toLowerCase();
      if (q.includes('price') || q.includes('cost') || q.includes('how much')) {
        return "At Waves, pricing depends on your specific scope, number of pages, content readiness, functionality, integrations, and support requirements. We provide a clear, firm quote before any work begins so there are never surprises. Would you like to use our Quote Request tool or speak on WhatsApp?";
      }
      if (q.includes('guarantee') || q.includes('sales') || q.includes('traffic')) {
        return "No, Waves does not guarantee sales, traffic, or lead volume. A website is an important business asset, not a magic sales machine. What we do is improve your digital conditions—clarity, trust, and less friction—so interested people have the best chance to enquire and buy.";
      }
      if (q.includes('whatsapp')) {
        return "Yes! WhatsApp is central to how businesses communicate in Nigeria. Every Waves digital home includes one-tap WhatsApp integration so customers can message you directly with pre-filled context.";
      }
      if (q.includes('launch') || q.includes('growth') || q.includes('service') || q.includes('level') || q.includes('tier')) {
        return "Waves offers three service levels: Launch (essential digital home with contact options), Growth (conversion-focused with expanded pages, forms, and tracking), and AI Growth (Growth site plus value-driven AI assistants). What stage is your business currently in?";
      }
      return "Welcome to Waves. We build fast, mobile-first business websites—professional digital homes for Nigerian SMEs. How can I help you learn about our service levels, customer journey, or getting a quote?";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Waves is here to help you build your digital home. How can I assist you with your business website?";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Waves concierge is currently assisting clients. You can submit our interactive Quote Request or tap WhatsApp below for immediate assistance.";
  }
};
