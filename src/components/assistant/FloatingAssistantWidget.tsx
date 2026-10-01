import React, { useState, useRef, useEffect } from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  Bot,
  Sparkles,
  X,
  Send,
  Maximize2,
  Minimize2,
  ChevronDown,
  RotateCcw,
  User,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export const FloatingAssistantWidget: React.FC = () => {
  const {
    activeView,
    navigateTo,
    assistantMessages,
    sendAssistantQuery,
    clearAssistantHistory
  } = useAMS();

  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [assistantMessages, isOpen]);

  // If already on the full assistant page, hide the floating button to avoid redundancy
  if (activeView === 'assistant') {
    return null;
  }

  const quickPrompts = [
    'Disponibilité d’Ousmane Dembélé ?',
    'Bilan physique de Lucas Chevalier',
    'Quel est le programme du prochain match ?',
    'Y a-t-il des alertes de charge physique ?'
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    sendAssistantQuery(inputQuery);
    setInputQuery('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* ========================================================================= */}
      {/* 1. FLOATING QUICK CHAT POPOVER WINDOW                                     */}
      {/* ========================================================================= */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[92vw] sm:w-[410px] h-[540px] max-h-[80vh] bg-white rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200 text-slate-900">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#091A36] via-[#06142B] to-[#040C1A] text-white flex items-center justify-between border-b border-blue-900/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-black text-xs text-white tracking-tight">
                    Assistant IA BLEUS 360
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono text-blue-300/80 mt-0.5 block">
                  Staff & Performance FFF
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigateTo('assistant');
                }}
                className="p-1.5 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Plein écran"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Réduire"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 px-1 shrink-0 font-mono">
              Suggestions :
            </span>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => sendAssistantQuery(prompt)}
                className="px-2.5 py-1 rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 hover:border-blue-300 whitespace-nowrap text-[11px] font-medium transition-colors cursor-pointer shrink-0 shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {assistantMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white ml-8 shadow-2xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 mr-4 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 font-bold text-[10px] opacity-80">
                  {msg.sender === 'user' ? (
                    <>
                      <User className="w-3 h-3" />
                      <span>Vous</span>
                    </>
                  ) : (
                    <>
                      <Bot className="w-3 h-3 text-blue-600" />
                      <span>BLEUS 360 AI</span>
                    </>
                  )}
                  <span className="font-mono text-[9px]">• {msg.timestamp}</span>
                </div>

                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Optional suggested cards from AI */}
                {msg.suggestedCards && msg.suggestedCards.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1.5">
                    {msg.suggestedCards.map((card, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => {
                          setIsOpen(false);
                          navigateTo(
                            card.targetView,
                            {
                              playerId: card.type === 'player' ? card.targetId : undefined,
                              matchId: card.type === 'match' ? card.targetId : undefined,
                              trainingId: card.type === 'training' ? card.targetId : undefined,
                              playerTab: card.targetTab
                            }
                          );
                        }}
                        className="w-full p-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer group"
                      >
                        <div className="min-w-0">
                          <span className="font-bold text-[11px] text-slate-900 group-hover:text-blue-700 block truncate">
                            {card.title}
                          </span>
                          {card.subtitle && (
                            <span className="text-[10px] text-slate-500 block truncate">
                              {card.subtitle}
                            </span>
                          )}
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Posez votre question (Dembélé, charge, match)..."
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all text-slate-900"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="w-9 h-9 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FLOATING TRIGGER BUTTON (BOTTOM RIGHT)                                  */}
      {/* ========================================================================= */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-700 via-blue-800 to-[#091A36] text-white shadow-xl hover:shadow-2xl hover:shadow-blue-900/50 border border-blue-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        title="Assistant IA BLEUS 360"
      >
        {/* Animated Glow Halo */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-40 group-hover:opacity-75 blur-xs transition duration-300 pointer-events-none" />

        <div className="relative flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-blue-200 shadow-inner">
            {isOpen ? <X className="w-4 h-4" /> : <Bot className="w-4 h-4 text-white" />}
          </div>

          <div className="hidden sm:flex flex-col text-left leading-tight pr-1">
            <span className="text-xs font-black tracking-tight text-white flex items-center gap-1">
              <span>Assistant IA</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </span>
            <span className="text-[9px] font-mono font-bold text-blue-200">
              Staff FFF 360
            </span>
          </div>

          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ring-2 ring-blue-900" />
        </div>
      </button>
    </div>
  );
};
