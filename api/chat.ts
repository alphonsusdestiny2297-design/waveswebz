/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Waves AI Concierge — serverless proxy (/api/chat)
 *
 * The Gemini API key lives ONLY on the server (Vercel env var GEMINI_API_KEY).
 * The browser never sees it. If no key is configured, this function answers
 * with 501 { fallback: true } and the client falls back to the deterministic
 * scripted guardrail answers, so the concierge always works.
 */

import type { IncomingMessage, ServerResponse } from 'http';

interface ChatTurn {
  role: string;
  text: string;
}

interface ChatRequestBody {
  history?: ChatTurn[];
  message?: string;
}

type VercelRequest = IncomingMessage & { body?: unknown };

const MODEL = 'gemini-2.5-flash';
const MAX_MESSAGE_CHARS = 2000;
const MAX_HISTORY_TURNS = 20;

/**
 * Same non-negotiable guardrails the concierge has always run with:
 * grounding in approved info, no invented pricing, no traffic/sales
 * guarantees, human escalation via WhatsApp, plain honest tone.
 */
const SYSTEM_INSTRUCTION = `You are the Waves AI Website Concierge and Quote Assistant for "Waves" (Your Business. Your Digital Home.).
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

/** Only accept browser calls from this site (or local dev); blocks other origins from burning quota. */
const isAllowedOrigin = (req: IncomingMessage): boolean => {
  const origin = req.headers.origin;
  if (!origin) return true; // same-origin fetches and server-to-server calls often omit Origin
  try {
    const host = new URL(origin).hostname;
    return (
      host === 'waveswebz.vercel.app' ||
      host.endsWith('.vercel.app') ||
      host === 'localhost' ||
      host === '127.0.0.1'
    );
  } catch {
    return false;
  }
};

const readBody = async (req: VercelRequest): Promise<ChatRequestBody | null> => {
  // Vercel's Node runtime pre-parses JSON bodies onto req.body when present.
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body) as ChatRequestBody;
      } catch {
        return null;
      }
    }
    return req.body as ChatRequestBody;
  }
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as ChatRequestBody;
  } catch {
    return null;
  }
};

const sendJson = (res: ServerResponse, statusCode: number, payload: unknown): void => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
};

export default async function handler(req: VercelRequest, res: ServerResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  if (!isAllowedOrigin(req)) {
    sendJson(res, 403, { error: 'Forbidden origin' });
    return;
  }

  const body = await readBody(req);
  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  if (!message || message.length > MAX_MESSAGE_CHARS) {
    sendJson(res, 400, { error: 'Invalid message' });
    return;
  }

  const history = Array.isArray(body?.history)
    ? body!.history!
        .filter(
          (t): t is ChatTurn =>
            !!t &&
            typeof t.text === 'string' &&
            (t.role === 'user' || t.role === 'model') &&
            t.text.length <= MAX_MESSAGE_CHARS
        )
        .slice(-MAX_HISTORY_TURNS)
    : [];

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // No key configured: tell the client to use its deterministic guardrail answers.
    sendJson(res, 501, { fallback: true });
    return;
  }

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });

    const contents = [
      ...history.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const result = await ai.models.generateContent({
      model: MODEL,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
      contents
    });

    const text = (result.text || '').trim();
    if (!text) {
      sendJson(res, 502, { error: 'Empty response from model' });
      return;
    }
    sendJson(res, 200, { text });
  } catch (error) {
    console.error('Gemini proxy error:', error);
    sendJson(res, 502, { error: 'Upstream AI error' });
  }
}
