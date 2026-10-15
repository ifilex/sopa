import React, { useRef, useState, useCallback } from 'react';
import {
  LanguageCode,
  PlacedWord,
  SelectionState,
  WordSearchBoard,
} from '../types';
import { COLOR_PALETTES } from '../data/languages';
import { calculateLinePath, matchSelectedPath } from '../utils/wordSearchEngine';
import { soundHaptics } from '../utils/soundHaptics';
import { Lightbulb, RotateCcw, Sparkles } from 'lucide-react';

interface WordSearchBoardViewProps {
  board: WordSearchBoard;
  language: LanguageCode;
  onWordFound: (word: PlacedWord) => void;
  onIncorrectAttempt: () => void;
  onUseHint: () => void;
  onRestartBoard: () => void;
  isCompleted: boolean;
  batterySaver: boolean;
}

export const WordSearchBoardView: React.FC<WordSearchBoardViewProps> = ({
  board,
  language,
  onWordFound,
  onIncorrectAttempt,
  onUseHint,
  onRestartBoard,
  isCompleted,
  batterySaver,
}) => {
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const [selection, setSelection] = useState<SelectionState>({
    isSelecting: false,
    startCell: null,
    currentCell: null,
    selectedCells: [],
  });

  const [highlightHintCell, setHighlightHintCell] = useState<[number, number] | null>(null);

  // Helper to get grid cell at touch/mouse coordinates
  const getCellFromCoords = useCallback(
    (clientX: number, clientY: number): [number, number] | null => {
      if (!gridContainerRef.current) return null;
      const rect = gridContainerRef.current.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return null;
      }

      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;
      const cellSize = rect.width / board.size;

      const col = Math.floor(relativeX / cellSize);
      const row = Math.floor(relativeY / cellSize);

      if (row >= 0 && row < board.size && col >= 0 && col < board.size) {
        return [row, col];
      }
      return null;
    },
    [board.size]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isCompleted) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    const cell = getCellFromCoords(e.clientX, e.clientY);
    if (cell) {
      setSelection({
        isSelecting: true,
        startCell: cell,
        currentCell: cell,
        selectedCells: [cell],
      });
      soundHaptics.playLetterSelect(0);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!selection.isSelecting || !selection.startCell || isCompleted) return;

    const cell = getCellFromCoords(e.clientX, e.clientY);
    if (!cell) return;

    if (
      !selection.currentCell ||
      cell[0] !== selection.currentCell[0] ||
      cell[1] !== selection.currentCell[1]
    ) {
      const path = calculateLinePath(
        selection.startCell[0],
        selection.startCell[1],
        cell[0],
        cell[1]
      );

      // Check if path changed to play subtle sound
      if (path.length !== selection.selectedCells.length) {
        soundHaptics.playLetterSelect(path.length);
      }

      setSelection((prev) => ({
        ...prev,
        currentCell: cell,
        selectedCells: path,
      }));
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!selection.isSelecting || isCompleted) return;

    if (selection.selectedCells.length >= 2) {
      const matched = matchSelectedPath(selection.selectedCells, board.words);
      if (matched) {
        onWordFound(matched);
        soundHaptics.playWordFound();
      } else {
        onIncorrectAttempt();
        soundHaptics.triggerHaptic(25);
      }
    }

    setSelection({
      isSelecting: false,
      startCell: null,
      currentCell: null,
      selectedCells: [],
    });
  };

  const handleHintClick = () => {
    const unfoundWords = board.words.filter((w) => !w.found);
    if (unfoundWords.length === 0) return;

    // Pick first unfound word and highlight its starting cell
    const targetWord = unfoundWords[0];
    const startCell: [number, number] = [targetWord.startRow, targetWord.startCol];
    setHighlightHintCell(startCell);
    onUseHint();
    soundHaptics.playLetterSelect(5);

    setTimeout(() => {
      setHighlightHintCell(null);
    }, 2500);
  };

  const isCellSelected = (r: number, c: number) => {
    return selection.selectedCells.some(([sr, sc]) => sr === r && sc === c);
  };

  // Determine language font styling
  const isCjk = language === 'zh' || language === 'ja';
  const isCyrillic = language === 'ru';

  return (
    <div className="w-full flex flex-col items-center select-none touch-none">
      {/* Board Controls & Compact Status bar */}
      <div className="w-full max-w-[340px] flex items-center justify-between px-1 mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-neutral-800 text-slate-700 dark:text-slate-300">
            {board.words.filter((w) => w.found).length}/{board.words.length} Encontradas
          </span>
          {isCompleted && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-pulse">
              <Sparkles className="w-3 h-3" />
              ¡Completo!
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            id="btn_hint"
            onClick={handleHintClick}
            disabled={isCompleted}
            title="Pista cognitiva (muestra inicio de palabra)"
            className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100/90 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 hover:bg-amber-200 transition-colors disabled:opacity-50"
          >
            <Lightbulb className="w-3 h-3 text-amber-500" />
            <span>Pista</span>
          </button>

          <button
            id="btn_reset_board"
            onClick={onRestartBoard}
            title="Reiniciar tablero"
            className="p-1 rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Miniaturized, Touch-Optimized Board Container */}
      <div
        id="word_search_grid"
        ref={gridContainerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          aspectRatio: '1 / 1',
          touchAction: 'none',
        }}
        className={`relative w-full max-w-[min(88vw,340px)] mx-auto p-1.5 rounded-2xl bg-white dark:bg-neutral-900 shadow-md dark:shadow-xl border border-slate-200 dark:border-neutral-800 grid gap-0.5 transition-all ${
          batterySaver ? 'dark:bg-black border-neutral-900' : ''
        }`}
      >
        {/* SVG Overlay for completed found words highlighting paths */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-10"
          style={{ width: '100%', height: '100%' }}
        >
          {board.words
            .filter((w) => w.found)
            .map((w) => {
              const cellSizePercent = 100 / board.size;
              const x1 = (w.startCol + 0.5) * cellSizePercent;
              const y1 = (w.startRow + 0.5) * cellSizePercent;
              const x2 = (w.endCol + 0.5) * cellSizePercent;
              const y2 = (w.endRow + 0.5) * cellSizePercent;

              const palette = COLOR_PALETTES[w.colorIndex % COLOR_PALETTES.length];

              return (
                <g key={w.id}>
                  {/* Outer glow stroke */}
                  <line
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke={palette.line}
                    strokeWidth={board.size > 8 ? '20' : '26'}
                    strokeLinecap="round"
                    opacity="0.35"
                  />
                  {/* Inner crisp line */}
                  <line
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke={palette.line}
                    strokeWidth={board.size > 8 ? '14' : '18'}
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </g>
              );
            })}

          {/* Active selection preview drag line */}
          {selection.isSelecting && selection.selectedCells.length > 1 && (
            <line
              x1={`${(selection.selectedCells[0][1] + 0.5) * (100 / board.size)}%`}
              y1={`${(selection.selectedCells[0][0] + 0.5) * (100 / board.size)}%`}
              x2={`${(selection.selectedCells[selection.selectedCells.length - 1][1] + 0.5) * (100 / board.size)}%`}
              y2={`${(selection.selectedCells[selection.selectedCells.length - 1][0] + 0.5) * (100 / board.size)}%`}
              stroke="#10b981"
              strokeWidth={board.size > 8 ? '18' : '22'}
              strokeLinecap="round"
              opacity="0.45"
            />
          )}
        </svg>

        {/* Grid Cells */}
        <div
          className="w-full h-full grid gap-0.5 relative z-20"
          style={{
            gridTemplateColumns: `repeat(${board.size}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${board.size}, minmax(0, 1fr))`,
          }}
        >
          {board.grid.map((row, rIdx) =>
            row.map((cell, cIdx) => {
              const selected = isCellSelected(rIdx, cIdx);
              const isHint = highlightHintCell && highlightHintCell[0] === rIdx && highlightHintCell[1] === cIdx;

              // Check if part of found word
              const foundWord = board.words.find(
                (w) => w.found && w.path.some(([pr, pc]) => pr === rIdx && pc === cIdx)
              );

              // Zen Letter illumination after completion
              const isZenFree = isCompleted && cell.isZenLetter;

              return (
                <div
                  key={`cell_${rIdx}_${cIdx}`}
                  id={`cell_${rIdx}_${cIdx}`}
                  className={`relative flex items-center justify-center rounded-lg font-bold transition-all select-none cursor-pointer ${
                    isCjk
                      ? 'text-xs sm:text-sm font-sans'
                      : isCyrillic
                      ? 'text-xs sm:text-sm font-sans tracking-tighter'
                      : board.size > 8
                      ? 'text-xs sm:text-sm font-sans'
                      : 'text-sm sm:text-base font-sans'
                  } ${
                    selected
                      ? 'bg-emerald-500 text-white shadow-sm scale-105 z-30'
                      : isHint
                      ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300 animate-bounce z-30'
                      : isZenFree
                      ? 'bg-gradient-to-tr from-amber-400 to-emerald-400 text-slate-900 font-extrabold shadow-sm ring-1 ring-amber-300 animate-pulse scale-105 z-25'
                      : foundWord
                      ? 'text-slate-900 dark:text-slate-100 font-extrabold bg-transparent'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-800/60'
                  }`}
                >
                  <span className="relative z-20 pointer-events-none">
                    {cell.letter}
                  </span>

                  {/* Tiny Zen sparkle indicator when puzzle completes */}
                  {isZenFree && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
