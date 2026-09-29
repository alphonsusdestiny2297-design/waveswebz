/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { WHATSAPP_LINK } from '../constants';

interface AssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOpenQuote: () => void;
}

const SUGGESTED_PROMPTS = [
  'What is the difference between Launch and Growth?',
  'How does WhatsApp integration work on Waves sites?',
  'Does Waves guarantee sales or traffic?',
  'What are the 5 stages of the customer journey?',
  'How do your optional AI modules work?'
];

const Assistant: React.FC<AssistantProps> = ({ isOpen, onClose, onOpen, onOpenQuote }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: 'Hello! I am the Waves Concierge. I can answer questions about our digital homes, service levels (Launch, Growth, AI Growth), or our 9-step build process. How can I help you today?', 
      timestamp: Date.now() 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Position state for moveable/draggable floating button
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef<{
    pointerStartX: number;
    pointerStartY: number;
    btnStartX: number;
    btnStartY: number;
    hasMoved: boolean;
  }>({
    pointerStartX: 0,
    pointerStartY: 0,
    btnStartX: 0,
    btnStartY: 0,
    hasMoved: false,
  });

  // Initialize position from localStorage or default bottom-left
  useEffect(() => {
    try {
      const saved = localStorage.getItem('waves_ai_button_pos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          // Verify it's within current window bounds
          const safeX = Math.min(Math.max(16, parsed.x), window.innerWidth - 180);
          const safeY = Math.min(Math.max(16, parsed.y), window.innerHeight - 70);
          setPosition({ x: safeX, y: safeY });
          return;
        }
      }
    } catch {
      // fallback
    }

    // Default to bottom-left
    setPosition({
      x: 24,
      y: Math.max(80, window.innerHeight - 80)
    });
  }, []);

  // Keep inside window on resize
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => {
        if (!prev) return null;
        return {
          x: Math.min(Math.max(16, prev.x), window.innerWidth - 180),
          y: Math.min(Math.max(16, prev.y), window.innerHeight - 70)
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isThinking]);

  // Pointer drag event handlers for moving the button
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag with primary pointer button
    if (e.button !== 0) return;

    const currentX = position?.x ?? 24;
    const currentY = position?.y ?? (window.innerHeight - 80);

    dragRef.current = {
      pointerStartX: e.clientX,
      pointerStartY: e.clientY,
      btnStartX: currentX,
      btnStartY: currentY,
      hasMoved: false,
    };

    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.pointerStartX) return;

    const deltaX = e.clientX - dragRef.current.pointerStartX;
    const deltaY = e.clientY - dragRef.current.pointerStartY;

    if (!dragRef.current.hasMoved && Math.hypot(deltaX, deltaY) > 5) {
      dragRef.current.hasMoved = true;
      setIsDragging(true);
    }

    if (dragRef.current.hasMoved) {
      const buttonWidth = 175;
      const buttonHeight = 52;
      const nextX = Math.min(Math.max(12, dragRef.current.btnStartX + deltaX), window.innerWidth - buttonWidth - 12);
      const nextY = Math.min(Math.max(12, dragRef.current.btnStartY + deltaY), window.innerHeight - buttonHeight - 12);

      setPosition({ x: nextX, y: nextY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }

    setIsDragging(false);

    // If user dragged, save position
    if (dragRef.current.hasMoved) {
      if (position) {
        try {
          localStorage.setItem('waves_ai_button_pos', JSON.stringify(position));
        } catch {
          // safe fallback
        }
      }
    } else {
      // If user simply clicked/tapped without moving, toggle the assistant
      if (isOpen) {
        onClose();
      } else {
        onOpen();
      }
    }

    dragRef.current.pointerStartX = 0;
    dragRef.current.pointerStartY = 0;
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isThinking) return;

    const userMsg: ChatMessage = { role: 'user', text: text.trim(), timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsThinking(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(history, userMsg.text);
      
      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'model',
        text: 'I am temporarily unable to reach the knowledge base, but our team is readily available on WhatsApp to answer your questions directly.',
        timestamp: Date.now()
      }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Dynamic positioning for the opened chat modal relative to current button coordinates
  const modalStyle: React.CSSProperties = {};
  if (position) {
    // Vertical placement: above if near bottom, below if near top
    if (position.y > 440) {
      modalStyle.bottom = `${window.innerHeight - position.y + 12}px`;
    } else {
      modalStyle.top = `${position.y + 58}px`;
    }

    // Horizontal placement: align left or right to avoid clipping
    if (position.x > window.innerWidth / 2) {
      modalStyle.right = `${Math.max(12, window.innerWidth - position.x - 175)}px`;
    } else {
      modalStyle.left = `${Math.max(12, position.x)}px`;
    }
  }

  return (
    <>
      {/* ============================================================
          CHAT DIALOG WINDOW (POSITIONED SAFELY RELATIVE TO BUTTON)
         ============================================================ */}
      {isOpen && (
        <div 
          style={modalStyle}
          className="fixed z-50 bg-[#0e0e0e] rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.85),0_0_24px_rgba(212,175,55,0.25)] w-[92vw] sm:w-[400px] h-[560px] flex flex-col overflow-hidden border border-[rgba(212,175,55,0.35)] font-serif animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="bg-[#080808] p-4 border-b border-[rgba(212,175,55,0.25)] flex justify-between items-center text-[#fff3c4]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.4)] flex items-center justify-center text-[#d4af37] font-bold text-xs">
                W
              </div>
              <div>
                <span className="font-bold text-sm block tracking-wide">Waves AI Concierge</span>
                <span className="text-[10px] text-[#d4af37] flex items-center gap-1 font-serif">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                  Grounded on Verified Waves Data
                </span>
              </div>
            </div>
            
            <button 
              onClick={onClose} 
              className="text-[#fff3c4]/60 hover:text-[#fff3c4] p-1 rounded-lg transition-colors"
              aria-label="Close concierge"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="p-3 bg-[#111111] border-b border-[rgba(212,175,55,0.18)] flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#d4af37]/80">Suggested Questions:</span>
              <div className="flex flex-col gap-1">
                {SUGGESTED_PROMPTS.slice(0, 3).map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="text-[11px] text-left px-2.5 py-1.5 rounded-lg bg-[#161616] hover:bg-[rgba(212,175,55,0.1)] text-[#fff3c4]/80 hover:text-[#fff3c4] transition-colors border border-[rgba(212,175,55,0.2)] font-serif"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#0a0a0a]" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[linear-gradient(135deg,#d4af37,#7a5c1e)] text-[#0a0a0a] font-medium rounded-tr-none shadow-md font-serif' 
                      : 'bg-[#141414] border border-[rgba(212,175,55,0.2)] text-[#fff3c4]/90 rounded-tl-none font-serif'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-[#141414] border border-[rgba(212,175,55,0.2)] p-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Escalation Bar */}
          <div className="px-3.5 py-2.5 bg-[#080808] border-t border-[rgba(212,175,55,0.2)] flex items-center justify-between text-[11px] font-serif">
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d4af37] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Escalate to WhatsApp</span>
            </a>
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="text-[#fff3c4] hover:text-[#d4af37] transition-colors"
            >
              Request Formal Quote →
            </button>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#0d0d0d] border-t border-[rgba(212,175,55,0.2)]">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about service levels, customer journey, quotes..." 
                className="flex-1 bg-[#161616] border border-[rgba(212,175,55,0.25)] focus:border-[#d4af37] rounded-xl px-3.5 py-2 text-xs text-[#fff3c4] placeholder-[#fff3c4]/40 outline-none transition-colors font-serif"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isThinking}
                className="bg-[#d4af37] text-[#0a0a0a] hover:bg-[#fff3c4] px-3.5 rounded-xl transition-colors disabled:opacity-40 font-bold"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          FLOATING & USER-DRAGGABLE TRIGGER BUTTON
          Hold down and shift to reposition anywhere on screen!
         ============================================================ */}
      <div 
        style={position ? { 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          position: 'fixed',
          zIndex: 48,
          touchAction: 'none'
        } : { 
          bottom: '1.5rem', 
          left: '1.5rem', 
          position: 'fixed',
          zIndex: 48,
          touchAction: 'none'
        }}
        className="font-serif select-none"
      >
        <button 
          type="button"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={`bg-[#0a0a0a]/95 text-[#fff3c4] px-3.5 py-2.5 sm:px-4 sm:py-2.5 flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.5)] hover:border-[#d4af37] shadow-[0_4px_22px_rgba(0,0,0,0.7),0_0_12px_rgba(212,175,55,0.25)] backdrop-blur-md transition-shadow group select-none touch-none ${
            isDragging ? 'cursor-grabbing scale-105 shadow-[0_8px_30px_rgba(212,175,55,0.4)]' : 'cursor-grab hover:scale-102'
          }`}
          title="Hold down and drag to shift position · Click to open AI Concierge"
          aria-label="Open Waves AI Concierge (Draggable)"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4 text-[#d4af37]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <>
              {/* Grip indicator icon for dragging */}
              <svg className="w-3.5 h-3.5 text-[#d4af37]/60 group-hover:text-[#d4af37] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="9" cy="6" r="1.5" />
                <circle cx="15" cy="6" r="1.5" />
                <circle cx="9" cy="12" r="1.5" />
                <circle cx="15" cy="12" r="1.5" />
                <circle cx="9" cy="18" r="1.5" />
                <circle cx="15" cy="18" r="1.5" />
              </svg>

              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />

              <span className="text-xs font-serif tracking-wider uppercase text-[#fff3c4] whitespace-nowrap">
                AI Concierge
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default Assistant;
