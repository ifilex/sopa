export type LanguageCode = 'es' | 'en' | 'fr' | 'pt' | 'de' | 'it' | 'ru' | 'zh' | 'ja';

export type DifficultyLevel = 'calm' | 'adaptive' | 'advanced' | 'master';

export type WordDisplayMode = 'visible' | 'hidden_mystery';

export type RehabFocus = 'logopedia' | 'left_hemisphere' | 'visual_memory' | 'attention_focus' | 'zen_calm';

export interface LanguageMeta {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  script: 'latin' | 'cyrillic' | 'cjk';
}

export interface WordDefinition {
  word: string;
  clue: string;
  phonetic?: string;
  category: string;
  therapeuticNote?: string;
}

export interface PlacedWord {
  id: string;
  word: string;
  clue: string;
  phonetic?: string;
  category: string;
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
  path: [number, number][];
  found: boolean;
  colorIndex: number;
  foundAtTimestamp?: number;
}

export interface GridCell {
  row: number;
  col: number;
  letter: string;
  isWordLetter: boolean;
  isFound: boolean;
  isZenLetter?: boolean;
  zenLetterIndex?: number;
  colorIndexes: number[];
}

export interface WordSearchBoard {
  size: number;
  grid: GridCell[][];
  words: PlacedWord[];
  zenQuote: string;
  zenAuthor: string;
  unusedLetters: string[];
}

export interface SelectionState {
  isSelecting: boolean;
  startCell: [number, number] | null;
  currentCell: [number, number] | null;
  selectedCells: [number, number][];
}

export interface CognitiveMetrics {
  sustainedAttention: number; // 0-100
  workingMemory: number;      // 0-100
  processingSpeed: number;    // words per min / avg seconds per word
  visualScanning: number;     // 0-100
  vocabularyRetention: number;// 0-100
  emotionalCalm: number;      // 0-100 (based on hesitation/HRV)
}

export interface SessionRecord {
  id: string;
  date: string; // ISO
  language: LanguageCode;
  difficulty: DifficultyLevel;
  rehabFocus: RehabFocus;
  durationSeconds: number;
  wordsTotal: number;
  wordsFound: number;
  hintsUsed: number;
  incorrectAttempts: number;
  avgTimePerWord: number;
  cognitiveScore: number;
  zenQuoteFound: boolean;
  metrics: CognitiveMetrics;
  hrvAvg?: number;
  heartRateAvg?: number;
}

export interface MedalBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'streak' | 'rehab' | 'speed' | 'multilingual' | 'zen';
}

export interface PatientProfile {
  id: string;
  name: string;
  medicalId: string;
  diagnosis: string;
  rehabGoal: string;
  therapistNotes: string;
  therapistName: string;
  clinicName: string;
  joinedDate: string;
}

export interface ReminderSetting {
  enabled: boolean;
  time: string; // "09:00"
  daysOfWeek: number[]; // 0-6
  sound: boolean;
  gentleTone: string;
}

export interface WearableStats {
  connected: boolean;
  deviceName: string;
  heartRate: number;
  hrv: number;
  stressLevel: 'Muy Bajo' | 'Óptimo (Zen)' | 'Moderado' | 'Elevado';
  focusIndex: number;
  batteryLevel: number;
}
