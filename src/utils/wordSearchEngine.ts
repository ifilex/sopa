import {
  DifficultyLevel,
  GridCell,
  LanguageCode,
  PlacedWord,
  RehabFocus,
  WordDefinition,
  WordSearchBoard,
} from '../types';
import { WORD_BANK } from '../data/languages';

const ALPHABETS: Record<LanguageCode, string> = {
  es: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',
  en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  fr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  pt: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  de: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ',
  it: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ru: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
  zh: '心静智明和理意觉知息真道生光美',
  ja: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん',
};

interface Direction {
  dr: number;
  dc: number;
}

const DIRECTIONS_CALM: Direction[] = [
  { dr: 0, dc: 1 },  // Left to Right
  { dr: 1, dc: 0 },  // Top to Bottom
];

const DIRECTIONS_ADAPTIVE: Direction[] = [
  { dr: 0, dc: 1 },  // Left to Right
  { dr: 1, dc: 0 },  // Top to Bottom
  { dr: 1, dc: 1 },  // Diagonal Down-Right
  { dr: 1, dc: -1 }, // Diagonal Down-Left
];

const DIRECTIONS_ADVANCED: Direction[] = [
  { dr: 0, dc: 1 },   // L -> R
  { dr: 1, dc: 0 },   // T -> B
  { dr: 1, dc: 1 },   // D Down-Right
  { dr: 1, dc: -1 },  // D Down-Left
  { dr: 0, dc: -1 },  // R -> L (Reverse)
  { dr: -1, dc: 0 },  // B -> T (Reverse)
  { dr: -1, dc: 1 },  // D Up-Right
  { dr: -1, dc: -1 }, // D Up-Left
];

export function getGridConfig(difficulty: DifficultyLevel): { size: number; wordCount: number } {
  switch (difficulty) {
    case 'calm':
      return { size: 7, wordCount: 4 };
    case 'adaptive':
      return { size: 8, wordCount: 6 };
    case 'advanced':
      return { size: 10, wordCount: 8 };
    case 'master':
      return { size: 11, wordCount: 9 };
  }
}

export function generateBoard(
  language: LanguageCode,
  difficulty: DifficultyLevel,
  rehabFocus: RehabFocus
): WordSearchBoard {
  const { size, wordCount } = getGridConfig(difficulty);
  const bank = WORD_BANK[language] || WORD_BANK.es;

  // Select target word definitions from current rehab focus and complement with zen_calm
  const primaryWords = bank[rehabFocus] || bank.logopedia;
  const secondaryWords = bank.zen_calm || [];
  const combined = [...primaryWords, ...secondaryWords];

  // Shuffle and pick
  const shuffledDefs: WordDefinition[] = [...combined].sort(() => Math.random() - 0.5);
  const selectedDefs: WordDefinition[] = [];

  for (const item of shuffledDefs) {
    // Clean word
    const cleaned = cleanWordForLanguage(item.word, language);
    if (cleaned.length >= 2 && cleaned.length <= size) {
      if (!selectedDefs.some((d) => cleanWordForLanguage(d.word, language) === cleaned)) {
        selectedDefs.push(item);
        if (selectedDefs.length >= wordCount) break;
      }
    }
  }

  // Directions based on difficulty
  let allowedDirections = DIRECTIONS_CALM;
  if (difficulty === 'adaptive') allowedDirections = DIRECTIONS_ADAPTIVE;
  if (difficulty === 'advanced' || difficulty === 'master') allowedDirections = DIRECTIONS_ADVANCED;

  // Initialize empty grid
  const rawGrid: (string | null)[][] = Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));

  const placedWords: PlacedWord[] = [];
  let colorIdx = 0;

  for (const def of selectedDefs) {
    const wordClean = cleanWordForLanguage(def.word, language);
    const placed = tryPlaceWord(rawGrid, size, wordClean, allowedDirections);
    if (placed) {
      placedWords.push({
        id: `word_${placedWords.length}_${wordClean}`,
        word: wordClean,
        clue: def.clue,
        phonetic: def.phonetic,
        category: def.category,
        startRow: placed.startRow,
        startCol: placed.startCol,
        endRow: placed.endRow,
        endCol: placed.endCol,
        path: placed.path,
        found: false,
        colorIndex: colorIdx % 10,
      });
      colorIdx++;
    }
  }

  // Select Zen Quote for the remaining letters
  const zenQuoteList = bank.zenQuotes || WORD_BANK.es.zenQuotes;
  const chosenZen = zenQuoteList[Math.floor(Math.random() * zenQuoteList.length)];
  const cleanZenChars = cleanZenQuoteForLanguage(chosenZen.quote, language);

  let zenCharIdx = 0;
  const unusedLetters: string[] = [];
  const alphabet = ALPHABETS[language] || ALPHABETS.es;

  // Fill empty cells with Zen quote characters
  const gridCells: GridCell[][] = [];

  for (let r = 0; r < size; r++) {
    const rowCells: GridCell[] = [];
    for (let c = 0; c < size; c++) {
      if (rawGrid[r][c] !== null) {
        // Part of a placed word
        rowCells.push({
          row: r,
          col: c,
          letter: rawGrid[r][c] as string,
          isWordLetter: true,
          isFound: false,
          colorIndexes: [],
        });
      } else {
        // Unused cell -> Zen letter!
        let letter = '';
        if (zenCharIdx < cleanZenChars.length) {
          letter = cleanZenChars[zenCharIdx];
          zenCharIdx++;
        } else {
          // Loop or fallback from alphabet
          letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        unusedLetters.push(letter);

        rowCells.push({
          row: r,
          col: c,
          letter: letter,
          isWordLetter: false,
          isFound: false,
          isZenLetter: true,
          zenLetterIndex: unusedLetters.length - 1,
          colorIndexes: [],
        });
      }
    }
    gridCells.push(rowCells);
  }

  return {
    size,
    grid: gridCells,
    words: placedWords,
    zenQuote: chosenZen.quote,
    zenAuthor: chosenZen.author,
    unusedLetters,
  };
}

function cleanWordForLanguage(word: string, lang: LanguageCode): string {
  if (lang === 'zh' || lang === 'ja') {
    return word.trim();
  }
  return word
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics for search consistency
    .replace(/[^A-ZÑА-ЯЁ]/g, '');
}

function cleanZenQuoteForLanguage(quote: string, lang: LanguageCode): string[] {
  if (lang === 'zh' || lang === 'ja') {
    return Array.from(quote.replace(/\s+/g, ''));
  }
  const cleaned = quote
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-ZÑА-ЯЁ]/g, '');
  return Array.from(cleaned);
}

function tryPlaceWord(
  grid: (string | null)[][],
  size: number,
  word: string,
  directions: Direction[]
): { startRow: number; startCol: number; endRow: number; endCol: number; path: [number, number][] } | null {
  const chars = Array.from(word);
  const wordLen = chars.length;

  const positions: { r: number; c: number; dir: Direction }[] = [];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      for (const dir of directions) {
        const endR = r + dir.dr * (wordLen - 1);
        const endC = c + dir.dc * (wordLen - 1);
        if (endR >= 0 && endR < size && endC >= 0 && endC < size) {
          positions.push({ r, c, dir });
        }
      }
    }
  }

  // Shuffle candidate positions
  positions.sort(() => Math.random() - 0.5);

  for (const pos of positions) {
    let canPlace = true;
    const path: [number, number][] = [];

    for (let i = 0; i < wordLen; i++) {
      const currR = pos.r + pos.dir.dr * i;
      const currC = pos.c + pos.dir.dc * i;
      const existing = grid[currR][currC];

      if (existing !== null && existing !== chars[i]) {
        canPlace = false;
        break;
      }
      path.push([currR, currC]);
    }

    if (canPlace) {
      // Commit placement to raw grid
      for (let i = 0; i < wordLen; i++) {
        const [currR, currC] = path[i];
        grid[currR][currC] = chars[i];
      }
      return {
        startRow: pos.r,
        startCol: pos.c,
        endRow: pos.r + pos.dir.dr * (wordLen - 1),
        endCol: pos.c + pos.dir.dc * (wordLen - 1),
        path,
      };
    }
  }

  return null;
}

/**
 * Snap arbitrary pointer drag between (r1, c1) and (r2, c2) to a valid grid line
 */
export function calculateLinePath(
  startR: number,
  startC: number,
  endR: number,
  endC: number
): [number, number][] {
  const deltaR = endR - startR;
  const deltaC = endC - startC;

  if (deltaR === 0 && deltaC === 0) {
    return [[startR, startC]];
  }

  const absR = Math.abs(deltaR);
  const absC = Math.abs(deltaC);

  let stepR = 0;
  let stepC = 0;
  let steps = 0;

  // Determine closest direction: Horizontal, Vertical, or Diagonal (45°)
  if (absR === 0) {
    // Horizontal
    stepR = 0;
    stepC = Math.sign(deltaC);
    steps = absC;
  } else if (absC === 0) {
    // Vertical
    stepR = Math.sign(deltaR);
    stepC = 0;
    steps = absR;
  } else if (absR === absC || Math.abs(absR - absC) <= 1) {
    // Diagonal
    stepR = Math.sign(deltaR);
    stepC = Math.sign(deltaC);
    steps = Math.max(absR, absC);
  } else if (absR > absC * 2) {
    // Closer to vertical
    stepR = Math.sign(deltaR);
    stepC = 0;
    steps = absR;
  } else if (absC > absR * 2) {
    // Closer to horizontal
    stepR = 0;
    stepC = Math.sign(deltaC);
    steps = absC;
  } else {
    // Default to diagonal
    stepR = Math.sign(deltaR);
    stepC = Math.sign(deltaC);
    steps = Math.min(absR, absC);
  }

  const path: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    path.push([startR + stepR * i, startC + stepC * i]);
  }
  return path;
}

export function matchSelectedPath(
  selectedPath: [number, number][],
  words: PlacedWord[]
): PlacedWord | null {
  if (selectedPath.length < 2) return null;

  for (const w of words) {
    if (w.found) continue;

    // Check forward match
    if (pathsEqual(selectedPath, w.path)) {
      return w;
    }
    // Check reverse match
    const reversed = [...w.path].reverse();
    if (pathsEqual(selectedPath, reversed)) {
      return w;
    }
  }
  return null;
}

function pathsEqual(p1: [number, number][], p2: [number, number][]): boolean {
  if (p1.length !== p2.length) return false;
  for (let i = 0; i < p1.length; i++) {
    if (p1[i][0] !== p2[i][0] || p1[i][1] !== p2[i][1]) return false;
  }
  return true;
}
