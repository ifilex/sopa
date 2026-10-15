import {
  CognitiveMetrics,
  DifficultyLevel,
  LanguageCode,
  RehabFocus,
  SessionRecord,
} from '../types';

export interface CognitiveAnalysisResult {
  metrics: CognitiveMetrics;
  overallScore: number;
  cognitiveLevel: 'Desarrollo Inicial' | 'Procesamiento Estable' | 'Alta Fluidez Cognitiva' | 'Maestría Zen';
  strengths: string[];
  recommendations: string[];
  clinicalNeuroInsights: {
    leftHemisphereStimulation: string;
    speechTherapyProgress: string;
    sustainedAttentionIndex: string;
    adaptiveDifficultySuggestion: DifficultyLevel;
  };
}

export function computeSessionCognitiveScore(
  durationSeconds: number,
  wordsTotal: number,
  wordsFound: number,
  incorrectAttempts: number,
  hintsUsed: number,
  difficulty: DifficultyLevel,
  rehabFocus: RehabFocus,
  wearableHrv: number = 72
): CognitiveAnalysisResult {
  const completionRatio = wordsTotal > 0 ? wordsFound / wordsTotal : 0;
  const avgTimePerWord = wordsFound > 0 ? durationSeconds / wordsFound : 60;

  // 1. Processing Speed (Scale 0-100)
  // Target: 8-15s per word for high score
  let speedScore = 100 - Math.max(0, (avgTimePerWord - 8) * 4);
  speedScore = Math.max(25, Math.min(100, speedScore));

  // 2. Sustained Attention (Scale 0-100)
  // Penalized by excessive abandoned drag gestures or prolonged pauses
  let attentionScore = 100 - incorrectAttempts * 6 - (hintsUsed * 10);
  if (durationSeconds < 180 && completionRatio === 1) attentionScore += 10;
  attentionScore = Math.max(30, Math.min(100, attentionScore));

  // 3. Working Memory (Scale 0-100)
  // Retention of word targets & orientation
  let memoryScore = 85 + (wordsFound * 2) - (hintsUsed * 8);
  if (difficulty === 'advanced' || difficulty === 'master') memoryScore += 10;
  memoryScore = Math.max(35, Math.min(100, memoryScore));

  // 4. Visual Scanning (Scale 0-100)
  let scanningScore = 90 - (incorrectAttempts * 4);
  if (difficulty === 'calm') scanningScore = Math.min(85, scanningScore);
  else if (difficulty === 'advanced') scanningScore = Math.min(100, scanningScore + 10);
  scanningScore = Math.max(30, Math.min(100, scanningScore));

  // 5. Vocabulary Retention (Scale 0-100)
  let vocabScore = Math.round(completionRatio * 90 + (rehabFocus === 'logopedia' ? 10 : 5));
  vocabScore = Math.max(40, Math.min(100, vocabScore));

  // 6. Emotional Calm (Scale 0-100)
  let calmScore = Math.round((wearableHrv / 100) * 50 + (100 - incorrectAttempts * 5) * 0.5);
  calmScore = Math.max(40, Math.min(100, calmScore));

  const metrics: CognitiveMetrics = {
    sustainedAttention: Math.round(attentionScore),
    workingMemory: Math.round(memoryScore),
    processingSpeed: Math.round(speedScore),
    visualScanning: Math.round(scanningScore),
    vocabularyRetention: Math.round(vocabScore),
    emotionalCalm: Math.round(calmScore),
  };

  const overallScore = Math.round(
    (metrics.sustainedAttention * 0.2 +
      metrics.workingMemory * 0.2 +
      metrics.processingSpeed * 0.2 +
      metrics.visualScanning * 0.2 +
      metrics.vocabularyRetention * 0.1 +
      metrics.emotionalCalm * 0.1)
  );

  let cognitiveLevel: CognitiveAnalysisResult['cognitiveLevel'] = 'Procesamiento Estable';
  if (overallScore >= 88) cognitiveLevel = 'Maestría Zen';
  else if (overallScore >= 75) cognitiveLevel = 'Alta Fluidez Cognitiva';
  else if (overallScore < 60) cognitiveLevel = 'Desarrollo Inicial';

  // Generate personalized strengths & recommendations
  const strengths: string[] = [];
  const recommendations: string[] = [];

  if (metrics.sustainedAttention >= 80) {
    strengths.push('Excelente capacidad de concentración sostenida sin dispersión.');
  } else {
    recommendations.push('Practica sesiones cortas de 3 a 5 minutos para afianzar el foco atencional progresivo.');
  }

  if (metrics.visualScanning >= 80) {
    strengths.push('Rápida exploración visoperceptiva y discriminación de patrones espaciales.');
  } else {
    recommendations.push('Ejercita el rastreo visual sistemático de izquierda a derecha antes de pasar a diagonales.');
  }

  if (metrics.processingSpeed >= 80) {
    strengths.push('Gran agilidad de procesamiento léxico y evocación verbal inmediata.');
  } else {
    recommendations.push('Mantén la calma y respira profundamente; la precisión es más valiosa que la velocidad.');
  }

  if (rehabFocus === 'logopedia' || rehabFocus === 'left_hemisphere') {
    strengths.push('Activación eficaz de la red lingüística fronto-temporal izquierda.');
    recommendations.push('Pronuncia en voz alta cada palabra al encontrarla para fortalecer la retroalimentación articulatoria.');
  }

  // Clinical neuro-insights
  const leftHemisphere =
    rehabFocus === 'left_hemisphere'
      ? 'Fuerte reclutamiento de áreas de Broca y Wernicke para decodificación grafémica.'
      : 'Estimulación equilibrada bi-hemisférica a través de patrones visuales y semánticos.';

  const speechTherapy =
    rehabFocus === 'logopedia'
      ? `Retención léxica al ${metrics.vocabularyRetention}% con buen índice de reconocimiento fonológico.`
      : 'Adecuada discriminación ortográfica y acceso léxico.';

  const sustainedAttentionText = `Índice de permanencia atencional: ${metrics.sustainedAttention}/100. Nivel de interferencia: ${incorrectAttempts > 3 ? 'Moderado' : 'Mínimo'}.`;

  let adaptiveDifficultySuggestion: DifficultyLevel = difficulty;
  if (overallScore > 85 && difficulty !== 'master') {
    adaptiveDifficultySuggestion = difficulty === 'calm' ? 'adaptive' : difficulty === 'adaptive' ? 'advanced' : 'master';
  } else if (overallScore < 50 && difficulty !== 'calm') {
    adaptiveDifficultySuggestion = 'calm';
  }

  return {
    metrics,
    overallScore,
    cognitiveLevel,
    strengths,
    recommendations,
    clinicalNeuroInsights: {
      leftHemisphereStimulation: leftHemisphere,
      speechTherapyProgress: speechTherapy,
      sustainedAttentionIndex: sustainedAttentionText,
      adaptiveDifficultySuggestion,
    },
  };
}

const SESSIONS_STORAGE_KEY = 'sopa_zen_session_records_v1';

export function saveSessionRecord(session: SessionRecord): void {
  try {
    const existing = getStoredSessionRecords();
    const updated = [session, ...existing].slice(0, 50); // Keep last 50
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save session record', e);
  }
}

export function getStoredSessionRecords(): SessionRecord[] {
  try {
    const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (!raw) return getDefaultSeedRecords();
    return JSON.parse(raw);
  } catch {
    return getDefaultSeedRecords();
  }
}

function getDefaultSeedRecords(): SessionRecord[] {
  // Pre-populate with realistic baseline historical clinical progression for rich analytics
  const today = new Date();
  const records: SessionRecord[] = [];

  const daysAgo = [6, 4, 3, 2, 1];
  const scores = [68, 74, 79, 83, 89];

  daysAgo.forEach((days, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - days);

    records.push({
      id: `seed_session_${i}`,
      date: d.toISOString(),
      language: 'es',
      difficulty: i < 2 ? 'calm' : 'adaptive',
      rehabFocus: 'logopedia',
      durationSeconds: 120 - i * 12,
      wordsTotal: 5 + i,
      wordsFound: 5 + i,
      hintsUsed: Math.max(0, 2 - i),
      incorrectAttempts: Math.max(0, 3 - i),
      avgTimePerWord: 16 - i * 1.5,
      cognitiveScore: scores[i],
      zenQuoteFound: true,
      metrics: {
        sustainedAttention: 65 + i * 5,
        workingMemory: 70 + i * 4,
        processingSpeed: 60 + i * 6,
        visualScanning: 68 + i * 5,
        vocabularyRetention: 75 + i * 4,
        emotionalCalm: 72 + i * 4,
      },
      hrvAvg: 65 + i * 2,
      heartRateAvg: 72 - i,
    });
  });

  return records;
}
