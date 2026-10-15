/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  DifficultyLevel,
  LanguageCode,
  MedalBadge,
  PatientProfile,
  PlacedWord,
  RehabFocus,
  SessionRecord,
  WearableStats,
  WordDisplayMode,
  WordSearchBoard,
} from './types';
import { INITIAL_BADGES, LANGUAGES } from './data/languages';
import { generateBoard } from './utils/wordSearchEngine';
import { soundHaptics } from './utils/soundHaptics';
import { wearableService } from './utils/wearableService';
import {
  computeSessionCognitiveScore,
  getStoredSessionRecords,
  saveSessionRecord,
} from './utils/cognitiveEngine';

import { Header } from './components/Header';
import { WordSearchBoardView } from './components/WordSearchBoardView';
import { WordListView } from './components/WordListView';
import { ZenQuoteRevealModal } from './components/ZenQuoteRevealModal';
import { CognitiveDashboardView } from './components/CognitiveDashboardView';
import { ClinicalPortalView } from './components/ClinicalPortalView';
import { SocialChallengeView } from './components/SocialChallengeView';
import { ReminderModal } from './components/ReminderModal';
import { WearableSyncModal } from './components/WearableSyncModal';

import {
  Sparkles,
  Brain,
  Timer,
  Target,
  Swords,
  BookOpen,
} from 'lucide-react';

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<'game' | 'dashboard' | 'clinical' | 'social' | 'reminders'>('game');
  const [showWearableModal, setShowWearableModal] = useState(false);

  // App Theme & Preferences
  const [darkMode, setDarkMode] = useState(true);
  const [batterySaver, setBatterySaver] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Game Configuration State
  const [language, setLanguage] = useState<LanguageCode>('es');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('calm');
  const [rehabFocus, setRehabFocus] = useState<RehabFocus>('logopedia');
  const [wordDisplayMode, setWordDisplayMode] = useState<WordDisplayMode>('visible');

  // Board State
  const [board, setBoard] = useState<WordSearchBoard>(() =>
    generateBoard('es', 'calm', 'logopedia')
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [showZenModal, setShowZenModal] = useState(false);

  // Timer & Session Metrics
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  // Historical Records & Clinical Profile
  const [sessions, setSessions] = useState<SessionRecord[]>(() => getStoredSessionRecords());
  const [streakDays, setStreakDays] = useState(4);
  const [badges, setBadges] = useState<MedalBadge[]>(() => {
    const saved = localStorage.getItem('sopa_zen_badges_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_BADGES;
      }
    }
    return INITIAL_BADGES;
  });

  const [patient, setPatient] = useState<PatientProfile>(() => {
    const saved = localStorage.getItem('sopa_zen_patient_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      id: 'patient_01',
      name: 'María González',
      medicalId: 'HC-9042-NEURO',
      diagnosis: 'Rehabilitación post-ACV Hemisferio Izquierdo / Afasia Anómica leve',
      rehabGoal: 'Recuperación de evocación léxica, fonología y atención sostenida',
      therapistNotes: 'Excelente progreso en rastreo visual y discriminación grafema-fonema. Mantener rutina de 10 min diarios.',
      therapistName: 'Dra. Carmen Valenzuela (Neuropsicóloga)',
      clinicName: 'Centro de Neuro-Rehabilitación Integral',
      joinedDate: '2026-07-10',
    };
  });

  // Wearable Real-time State
  const [wearableStats, setWearableStats] = useState<WearableStats>(() => wearableService.getStats());

  // Ghost Match State (Optional friendly duel)
  const [ghostDuel, setGhostDuel] = useState<{ opponent: string; rivalProgress: number } | null>(null);

  // Subscribe to wearable telemetry
  useEffect(() => {
    const unsubscribe = wearableService.subscribe((stats) => {
      setWearableStats(stats);
    });
    return () => unsubscribe();
  }, []);

  // Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && !isCompleted) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);

        // Advance ghost opponent if duel active
        if (ghostDuel && ghostDuel.rivalProgress < 100) {
          setGhostDuel((prev) =>
            prev ? { ...prev, rivalProgress: Math.min(100, prev.rivalProgress + 1.2) } : null
          );
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isCompleted, ghostDuel]);

  // Sync Dark mode with DOM
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Start new puzzle
  const startNewGame = (
    newLang = language,
    newDiff = difficulty,
    newFocus = rehabFocus
  ) => {
    const newBoard = generateBoard(newLang, newDiff, newFocus);
    setBoard(newBoard);
    setIsCompleted(false);
    setShowZenModal(false);
    setElapsedSeconds(0);
    setIncorrectAttempts(0);
    setHintsUsed(0);
    setIsTimerRunning(true);
  };

  const handleLanguageChange = (newLang: LanguageCode) => {
    setLanguage(newLang);
    startNewGame(newLang, difficulty, rehabFocus);
  };

  const handleDifficultyChange = (newDiff: DifficultyLevel) => {
    setDifficulty(newDiff);
    startNewGame(language, newDiff, rehabFocus);
  };

  const handleRehabFocusChange = (newFocus: RehabFocus) => {
    setRehabFocus(newFocus);
    startNewGame(language, difficulty, newFocus);
  };

  // Word Found Event Handler
  const handleWordFound = (word: PlacedWord) => {
    const updatedWords = board.words.map((w) =>
      w.id === word.id ? { ...w, found: true, foundAtTimestamp: Date.now() } : w
    );

    // Update board grid cells
    const updatedGrid = board.grid.map((row) =>
      row.map((cell) => {
        const isPartOfFound = updatedWords.some(
          (w) => w.found && w.path.some(([r, c]) => r === cell.row && c === cell.col)
        );
        return {
          ...cell,
          isFound: isPartOfFound,
        };
      })
    );

    const newBoard: WordSearchBoard = {
      ...board,
      words: updatedWords,
      grid: updatedGrid,
    };

    setBoard(newBoard);

    // Check if ALL words found
    const allFound = updatedWords.every((w) => w.found);
    if (allFound) {
      setIsCompleted(true);
      setIsTimerRunning(false);

      // Compute cognitive metrics
      const analysis = computeSessionCognitiveScore(
        Math.max(1, elapsedSeconds),
        board.words.length,
        board.words.length,
        incorrectAttempts,
        hintsUsed,
        difficulty,
        rehabFocus,
        wearableStats.hrv
      );

      // Create session record
      const sessionRecord: SessionRecord = {
        id: `session_${Date.now()}`,
        date: new Date().toISOString(),
        language,
        difficulty,
        rehabFocus,
        durationSeconds: elapsedSeconds,
        wordsTotal: board.words.length,
        wordsFound: board.words.length,
        hintsUsed,
        incorrectAttempts,
        avgTimePerWord: elapsedSeconds / board.words.length,
        cognitiveScore: analysis.overallScore,
        zenQuoteFound: true,
        metrics: analysis.metrics,
        hrvAvg: wearableStats.hrv,
        heartRateAvg: wearableStats.heartRate,
      };

      saveSessionRecord(sessionRecord);
      setSessions((prev) => [sessionRecord, ...prev]);

      // Check badges
      unlockBadgesCheck();

      // Show Zen Reveal Modal
      setTimeout(() => {
        setShowZenModal(true);
      }, 700);
    }
  };

  const unlockBadgesCheck = () => {
    const updated = badges.map((b) => {
      if (b.id === 'first_word' && !b.unlocked) {
        return { ...b, unlocked: true, unlockedAt: new Date().toISOString() };
      }
      if (b.id === 'zen_quote_1' && !b.unlocked) {
        return { ...b, unlocked: true, unlockedAt: new Date().toISOString() };
      }
      return b;
    });
    setBadges(updated);
    localStorage.setItem('sopa_zen_badges_v1', JSON.stringify(updated));
  };

  const handleIncorrectAttempt = () => {
    setIncorrectAttempts((prev) => prev + 1);
  };

  const handleUseHint = () => {
    setHintsUsed((prev) => prev + 1);
  };

  const handleUpdatePatient = (updated: PatientProfile) => {
    setPatient(updated);
    localStorage.setItem('sopa_zen_patient_v1', JSON.stringify(updated));
  };

  const handleStartGhostChallenge = (opponent: string) => {
    setGhostDuel({ opponent, rivalProgress: 0 });
    setActiveTab('game');
    startNewGame(language, difficulty, rehabFocus);
  };

  // Compute latest cognitive analysis for dashboard
  const latestAnalysis = computeSessionCognitiveScore(
    Math.max(1, elapsedSeconds),
    board.words.filter((w) => w.found).length,
    board.words.length,
    incorrectAttempts,
    hintsUsed,
    difficulty,
    rehabFocus,
    wearableStats.hrv
  );

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const foundCount = board.words.filter((w) => w.found).length;
  const playerProgress = board.words.length > 0 ? (foundCount / board.words.length) * 100 : 0;

  return (
    <div
      className={`min-h-screen w-full flex flex-col font-sans transition-colors ${
        batterySaver
          ? 'bg-black text-neutral-100'
          : darkMode
          ? 'bg-neutral-950 text-slate-100'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Header */}
      <Header
        currentLanguage={language}
        onSelectLanguage={handleLanguageChange}
        streakDays={streakDays}
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          const next = !soundEnabled;
          setSoundEnabled(next);
          soundHaptics.setSoundEnabled(next);
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        batterySaver={batterySaver}
        onToggleBatterySaver={() => {
          setBatterySaver(!batterySaver);
          if (!batterySaver) setDarkMode(true);
        }}
        wearableStats={wearableStats}
        onOpenWearableModal={() => setShowWearableModal(true)}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-lg mx-auto px-2 pb-4 flex flex-col items-center">
        {/* VIEW 1: WORD SEARCH GAME */}
        {activeTab === 'game' && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-150">
            {/* Target Neuro-Focus & Difficulty Pills Bar */}
            <div className="w-full max-w-[340px] flex items-center justify-between gap-1 mb-1.5 overflow-x-auto no-scrollbar py-0.5">
              {/* Rehab preset selector */}
              <div className="flex items-center gap-0.5">
                <button
                  id="rehab_focus_logopedia"
                  onClick={() => handleRehabFocusChange('logopedia')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all ${
                    rehabFocus === 'logopedia'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-200/80 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300'
                  }`}
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Logopedia</span>
                </button>

                <button
                  id="rehab_focus_left_hemisphere"
                  onClick={() => handleRehabFocusChange('left_hemisphere')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all ${
                    rehabFocus === 'left_hemisphere'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-200/80 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300'
                  }`}
                >
                  <Brain className="w-3 h-3" />
                  <span>Hemisf. Izq</span>
                </button>

                <button
                  id="rehab_focus_zen_calm"
                  onClick={() => handleRehabFocusChange('zen_calm')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all ${
                    rehabFocus === 'zen_calm'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-200/80 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Zen</span>
                </button>
              </div>

              {/* Difficulty selector */}
              <div className="flex items-center gap-0.5">
                {(['calm', 'adaptive', 'advanced'] as DifficultyLevel[]).map((d) => (
                  <button
                    key={d}
                    id={`btn_diff_${d}`}
                    onClick={() => handleDifficultyChange(d)}
                    className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                      difficulty === d
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {d === 'calm' ? 'Calma' : d === 'adaptive' ? 'Adapt.' : 'Avanz.'}
                  </button>
                ))}
              </div>
            </div>

            {/* Ghost Duel Live HUD (if active) */}
            {ghostDuel && (
              <div className="w-full max-w-[340px] mb-1.5 p-1.5 rounded-xl bg-indigo-50/80 dark:bg-neutral-800/90 border border-indigo-200 dark:border-neutral-700 text-left">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 dark:text-slate-200 mb-0.5">
                  <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                    <Swords className="w-3 h-3" /> Tú vs {ghostDuel.opponent}
                  </span>
                  <span className="font-mono text-[9px] text-slate-500">
                    {Math.round(playerProgress)}% vs {Math.round(ghostDuel.rivalProgress)}%
                  </span>
                </div>

                <div className="space-y-0.5">
                  <div className="w-full h-1 rounded-full bg-slate-200 dark:bg-neutral-700 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${playerProgress}%` }}
                    />
                  </div>
                  <div className="w-full h-1 rounded-full bg-slate-200 dark:bg-neutral-700 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 transition-all duration-300"
                      style={{ width: `${ghostDuel.rivalProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Main Interactive Word Search Grid */}
            <WordSearchBoardView
              board={board}
              language={language}
              onWordFound={handleWordFound}
              onIncorrectAttempt={handleIncorrectAttempt}
              onUseHint={handleUseHint}
              onRestartBoard={() => startNewGame(language, difficulty, rehabFocus)}
              isCompleted={isCompleted}
              batterySaver={batterySaver}
            />

            {/* Target Words Pill List with IPA Phonetics & Memory Mode Toggle */}
            <WordListView
              words={board.words}
              displayMode={wordDisplayMode}
              onToggleDisplayMode={() =>
                setWordDisplayMode(
                  wordDisplayMode === 'visible' ? 'hidden_mystery' : 'visible'
                )
              }
            />

            {/* Session Live Status Bar */}
            <div className="w-full max-w-[340px] mt-2 flex items-center justify-between px-1 text-[10px] text-slate-500 dark:text-neutral-400 font-medium">
              <div className="flex items-center gap-1 font-mono">
                <Timer className="w-3 h-3 text-emerald-500" />
                <span>{formatTimer(elapsedSeconds)}</span>
              </div>

              <div className="flex items-center gap-1">
                <Target className="w-3 h-3 text-indigo-400" />
                <span>Autocompetencia Zen</span>
              </div>

              <div className="flex items-center gap-1">
                <span>{LANGUAGES[language].nativeName}</span>
                <span className="text-[9px] uppercase font-mono px-1 rounded bg-slate-200 dark:bg-neutral-800">
                  {language}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: COGNITIVE DASHBOARD & ANALYTICS */}
        {activeTab === 'dashboard' && (
          <CognitiveDashboardView
            sessions={sessions}
            currentMetrics={latestAnalysis.metrics}
            overallScore={latestAnalysis.overallScore}
            streakDays={streakDays}
            unlockedBadges={badges}
            onStartTraining={() => {
              setActiveTab('game');
              startNewGame();
            }}
          />
        )}

        {/* VIEW 3: CLINICAL THERAPIST PORTAL */}
        {activeTab === 'clinical' && (
          <ClinicalPortalView
            patient={patient}
            onUpdatePatient={handleUpdatePatient}
            sessions={sessions}
          />
        )}

        {/* VIEW 4: SOCIAL & GHOST CHALLENGES */}
        {activeTab === 'social' && (
          <SocialChallengeView
            bestScore={latestAnalysis.overallScore}
            onStartChallenge={handleStartGhostChallenge}
          />
        )}

        {/* VIEW 5: REMINDERS & GENTLE HABITS */}
        {activeTab === 'reminders' && <ReminderModal />}
      </main>

      {/* Zen Quote Reveal Modal */}
      {showZenModal && (
        <ZenQuoteRevealModal
          zenQuote={board.zenQuote}
          zenAuthor={board.zenAuthor}
          unusedLetters={board.unusedLetters}
          metrics={latestAnalysis.metrics}
          overallScore={latestAnalysis.overallScore}
          durationSeconds={elapsedSeconds}
          onNextPuzzle={() => startNewGame(language, difficulty, rehabFocus)}
          onViewDashboard={() => {
            setShowZenModal(false);
            setActiveTab('dashboard');
          }}
          currentLanguage={language}
          difficulty={difficulty}
          rehabFocus={rehabFocus}
        />
      )}

      {/* Wearable BLE Sync Modal */}
      {showWearableModal && (
        <WearableSyncModal
          stats={wearableStats}
          onClose={() => setShowWearableModal(false)}
        />
      )}
    </div>
  );
}
