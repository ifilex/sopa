import React, { useState } from 'react';
import { PlacedWord, WordDisplayMode } from '../types';
import { COLOR_PALETTES } from '../data/languages';
import { Check, Eye, EyeOff, Info, Volume2, Sparkles } from 'lucide-react';
import { soundHaptics } from '../utils/soundHaptics';

interface WordListViewProps {
  words: PlacedWord[];
  displayMode: WordDisplayMode;
  onToggleDisplayMode: () => void;
  onWordClick?: (word: PlacedWord) => void;
}

export const WordListView: React.FC<WordListViewProps> = ({
  words,
  displayMode,
  onToggleDisplayMode,
  onWordClick,
}) => {
  const [activeClueWord, setActiveClueWord] = useState<PlacedWord | null>(null);
  const [revealedWordIds, setRevealedWordIds] = useState<Set<string>>(new Set());

  const handleSpeakWord = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundHaptics.playLetterSelect(2);
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.rate = 0.85; // Slightly slower for speech therapy clear articulation
        window.speechSynthesis.speak(utterance);
      } catch {
        // Speech synthesis fallback
      }
    }
  };

  const handleWordTileClick = (w: PlacedWord) => {
    // If in hidden mode and not revealed, reveal this single word on click
    if (displayMode === 'hidden_mystery' && !revealedWordIds.has(w.id) && !w.found) {
      setRevealedWordIds((prev) => new Set(prev).add(w.id));
      soundHaptics.playLetterSelect(1);
    }
    setActiveClueWord(activeClueWord?.id === w.id ? null : w);
    onWordClick?.(w);
  };

  const remainingCount = words.filter((w) => !w.found).length;

  return (
    <div className="w-full max-w-sm mx-auto mt-2 px-1">
      {/* Title & Mode Switcher Bar */}
      <div className="flex items-center justify-between px-1 mb-1.5">
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
            Palabras a buscar:
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
            {remainingCount === 0 ? '¡Todas encontradas!' : `${remainingCount} restantes`}
          </span>
        </div>

        {/* Toggle Mode: Visible vs Oculto (Memoria Avanzada) */}
        <button
          id="btn_toggle_word_display_mode"
          onClick={onToggleDisplayMode}
          title={
            displayMode === 'visible'
              ? 'Cambiar a modo avanzado (palabras ocultas para retención de memoria)'
              : 'Cambiar a modo estándar (palabras visibles)'
          }
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold border transition-colors ${
            displayMode === 'hidden_mystery'
              ? 'bg-purple-100/90 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800/80 shadow-xs'
              : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-neutral-700 hover:border-emerald-400'
          }`}
        >
          {displayMode === 'hidden_mystery' ? (
            <>
              <EyeOff className="w-3 h-3 text-purple-600 dark:text-purple-400" />
              <span>Modo Memoria</span>
            </>
          ) : (
            <>
              <Eye className="w-3 h-3 text-emerald-500" />
              <span>Palabras Visibles</span>
            </>
          )}
        </button>
      </div>

      {/* Words Grid Chips */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {words.map((w) => {
          const palette = COLOR_PALETTES[w.colorIndex % COLOR_PALETTES.length];
          const isRevealed = displayMode === 'visible' || revealedWordIds.has(w.id) || w.found;

          // Masked representation if hidden mode
          const maskedDisplay = w.word
            .split('')
            .map(() => '_ ')
            .join('')
            .trim();

          return (
            <div
              key={w.id}
              onClick={() => handleWordTileClick(w)}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-semibold cursor-pointer transition-all ${
                w.found
                  ? `${palette.bg} ${palette.border} ${palette.text} line-through opacity-85 scale-95 shadow-xs`
                  : isRevealed
                  ? 'bg-white dark:bg-neutral-800/90 border-slate-200 dark:border-neutral-700 text-slate-800 dark:text-slate-200 hover:border-emerald-400 dark:hover:border-emerald-500 shadow-xs'
                  : 'bg-purple-50/60 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900/60 text-purple-700 dark:text-purple-300 hover:border-purple-400 shadow-xs'
              }`}
            >
              {w.found ? (
                <Check className="w-3 h-3 flex-shrink-0" />
              ) : isRevealed ? (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 animate-pulse" />
              )}

              {/* Word text */}
              <span className="tracking-wide font-bold">
                {isRevealed ? w.word : `${w.category} (${w.word.length}l)`}
              </span>

              {/* Phonetic for speech therapy */}
              {isRevealed && w.phonetic && (
                <span className="text-[9px] text-slate-400 dark:text-neutral-500 font-mono hidden sm:inline">
                  {w.phonetic}
                </span>
              )}

              {/* Word letter length pill */}
              {isRevealed && !w.found && (
                <span className="text-[9px] font-mono text-slate-400 dark:text-neutral-500">
                  {w.word.length}
                </span>
              )}

              {/* Audio TTS button */}
              {isRevealed && (
                <button
                  onClick={(e) => handleSpeakWord(w.word, e)}
                  title="Pronunciación (Logopedia)"
                  className="p-0.5 rounded text-slate-400 hover:text-emerald-500 transition-colors"
                >
                  <Volume2 className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Clue / Therapeutic Definition Drawer */}
      {activeClueWord && (
        <div className="mt-2 p-2 rounded-xl bg-emerald-50/90 dark:bg-neutral-800/95 border border-emerald-200/80 dark:border-neutral-700 text-left animate-in fade-in slide-in-from-top-1 duration-150 shadow-xs">
          <div className="flex items-start justify-between gap-1.5">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                  {activeClueWord.word}
                </span>
                {activeClueWord.phonetic && (
                  <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-mono">
                    {activeClueWord.phonetic}
                  </span>
                )}
                <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
                  {activeClueWord.category}
                </span>
              </div>

              <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-0.5 leading-snug">
                {activeClueWord.clue}
              </p>

              {activeClueWord.therapeuticNote && (
                <div className="flex items-center gap-1 mt-0.5 text-[10px] text-emerald-700 dark:text-emerald-300">
                  <Info className="w-2.5 h-2.5 flex-shrink-0" />
                  <span>{activeClueWord.therapeuticNote}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveClueWord(null)}
              className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
