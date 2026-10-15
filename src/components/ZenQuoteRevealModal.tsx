import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Activity, Heart, Share2 } from 'lucide-react';
import { CognitiveMetrics, DifficultyLevel, LanguageCode, RehabFocus } from '../types';
import { soundHaptics } from '../utils/soundHaptics';

interface ZenQuoteRevealModalProps {
  zenQuote: string;
  zenAuthor: string;
  unusedLetters: string[];
  metrics: CognitiveMetrics;
  overallScore: number;
  durationSeconds: number;
  onNextPuzzle: () => void;
  onViewDashboard: () => void;
  currentLanguage: LanguageCode;
  difficulty: DifficultyLevel;
  rehabFocus: RehabFocus;
}

export const ZenQuoteRevealModal: React.FC<ZenQuoteRevealModalProps> = ({
  zenQuote,
  zenAuthor,
  unusedLetters,
  metrics,
  overallScore,
  durationSeconds,
  onNextPuzzle,
  onViewDashboard,
}) => {
  useEffect(() => {
    soundHaptics.playZenCompletion();

    // Soft celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#34d399', '#f59e0b', '#06b6d4', '#8b5cf6'],
      });
    } catch {
      // ignore
    }
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining.toString().padStart(2, '0')}`;
  };

  const handleShareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sopa Zen - Frase de Sabiduría',
        text: `"${zenQuote}" — ${zenAuthor}. Descubrí este mensaje completando mi sesión de estimulación cognitiva en Sopa Zen!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(`"${zenQuote}" — ${zenAuthor}`);
      alert('¡Frase zen copiada al portapapeles!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-neutral-900 border border-emerald-500/30 p-6 shadow-2xl text-center overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Zen Icon header */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-500 flex items-center justify-center text-white shadow-lg mb-3">
          <Sparkles className="w-7 h-7 animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        <div className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">
          Letras Libres del Tablero Reagrupadas
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Frase Zen Revelada
        </h2>

        {/* The Zen Quote Box */}
        <div className="my-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-50/90 via-slate-50/80 to-amber-50/90 dark:from-neutral-800/90 dark:via-neutral-800/60 dark:to-neutral-800/90 border border-emerald-200/80 dark:border-neutral-700 shadow-inner text-center">
          <p className="text-base sm:text-lg font-serif italic text-slate-800 dark:text-slate-100 leading-relaxed">
            "{zenQuote}"
          </p>
          <div className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            — {zenAuthor}
          </div>
        </div>

        {/* Cognitive Session Performance Snapshot */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800/80 border border-slate-200 dark:border-neutral-700/60">
            <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium">
              Tiempo Total
            </div>
            <div className="text-base font-bold text-slate-800 dark:text-slate-100 font-mono">
              {formatTime(durationSeconds)}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800/80 border border-slate-200 dark:border-neutral-700/60">
            <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium">
              Atención Sostenida
            </div>
            <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">
              {metrics.sustainedAttention}%
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800/80 border border-slate-200 dark:border-neutral-700/60">
            <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium">
              Puntaje Cognitivo
            </div>
            <div className="text-base font-bold text-amber-500">
              {overallScore} / 100
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          <button
            id="btn_next_puzzle"
            onClick={onNextPuzzle}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition-all active:scale-95"
          >
            <span>Siguiente Nivel Adaptativo</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="btn_view_dashboard"
            onClick={onViewDashboard}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-800 dark:text-slate-200 font-medium text-sm border border-slate-300 dark:border-neutral-700 transition-all"
          >
            <Activity className="w-4 h-4 text-emerald-500" />
            <span>Ver Neuro-Métricas</span>
          </button>

          <button
            id="btn_share_quote"
            onClick={handleShareQuote}
            title="Compartir Frase Zen"
            className="p-3 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-neutral-700 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
