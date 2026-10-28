/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// The browser talks ONLY to the /api/chat serverless proxy (see api/chat.ts).
// The Gemini API key never reaches the client bundle. When no key is configured
// on the server (or the proxy is unavailable, e.g. local dev without Vercel),
// the proxy returns 501 { fallback: true } and we answer with the
// deterministic guardrail responses below.

const CHAT_ENDPOINT = '/api/chat';

const deterministicAnswer = (newMessage: string): string => {
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
};

export const sendMessageToGemini = async (
  history: { role: string; text: string }[],
  newMessage: string
): Promise<string> => {
  try {
    const response = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, message: newMessage })
    });

    if (response.ok) {
      const data: unknown = await response.json();
      const text =
        data && typeof (data as { text?: unknown }).text === 'string'
          ? ((data as { text: string }).text || '').trim()
          : '';
      if (text) return text;
    }
    // Non-OK (501 = no API key configured, 502 = upstream issue, etc.) → fall through.
    return deterministicAnswer(newMessage);
  } catch {
    // Offline, blocked, or proxy unreachable → deterministic fallback.
    return deterministicAnswer(newMessage);
  }
};
