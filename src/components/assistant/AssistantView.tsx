import React, { useState } from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  Bot,
  Send,
  Sparkles,
  ArrowRight,
  User,
  Swords,
  Dumbbell,
  Calendar,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const AssistantView: React.FC = () => {
  const {
    assistantMessages,
    sendAssistantQuery,
    clearAssistantHistory,
    navigateTo
  } = useAMS();

  const [inputQuery, setInputQuery] = useState('');

  const quickPrompts = [
    'Quels joueurs sont à risque pour le prochain rassemblement ?',
    'Donne-moi le bilan physique de Lucas Chevalier',
    'Analyse du match France 3-1 Pays-Bas',
    'Quelle était la charge de la dernière séance à Clairefontaine ?',
    'Où en est la réathlétisation d’Ousmane Dembélé ?'
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    sendAssistantQuery(inputQuery);
    setInputQuery('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto">
      {/* Top Header (Matching Mockup Screen 11) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-950 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  Assistant IA BLEUS 360
                </h1>
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  Temps Réel FFF
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Posez vos questions sur les joueurs, les matchs, les entraînements ou les rassemblements.
              </p>
            </div>
          </div>

          <button
            onClick={clearAssistantHistory}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Effacer la conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Suggested Quick Prompts (Screen 11 Chips) */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-[11px] font-semibold text-slate-400 block mb-2">
            Questions fréquentes du staff :
          </span>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => sendAssistantQuery(prompt)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 hover:border-blue-300 text-xs font-medium transition-colors text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="space-y-4">
        {assistantMessages.map((msg) => (
          <div
            key={msg.id}
            className={`p-5 rounded-2xl border ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white border-blue-600 ml-12 shadow-sm'
                : 'bg-white text-slate-900 border-slate-200/90 shadow-xs mr-6'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                }`}
              >
                {msg.sender === 'user' ? 'Vous' : 'Assistant AMS 360'}
              </span>
              <span
                className={`text-[10px] font-mono ${
                  msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
              {msg.text}
            </p>

            {/* Interactive Connected Cards attached to Assistant Reply (Matching Screen 11 Cards) */}
            {msg.suggestedCards && msg.suggestedCards.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Actions & Fiches connectées :
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {msg.suggestedCards.map((card, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        navigateTo(card.targetView, {
                          playerId: card.targetId,
                          matchId: card.targetId,
                          trainingId: card.targetId,
                          playerTab: card.targetTab
                        });
                      }}
                      className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 bg-slate-50/50 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {card.title}
                            </span>
                          </div>
                          {card.subtitle && (
                            <p className="text-[11px] text-slate-500 leading-snug">
                              {card.subtitle}
                            </p>
                          )}
                        </div>

                        {card.tag && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${
                              card.tagColor === 'amber'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : card.tagColor === 'rose'
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : card.tagColor === 'emerald'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-blue-50 text-blue-700 border-blue-200'
                            }`}
                          >
                            {card.tag}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 group-hover:translate-x-1 transition-transform mt-3">
                        <span>Consulter la page</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Form Bar (Screen 11 Bottom) */}
      <form onSubmit={handleSend} className="relative sticky bottom-6 z-20">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Posez votre question à AMS 360..."
          className="w-full pl-5 pr-14 py-3.5 text-xs sm:text-sm bg-white border-2 border-slate-200 focus:border-blue-600 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900 transition-all font-medium"
        />
        <button
          type="submit"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-sm"
          title="Envoyer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
