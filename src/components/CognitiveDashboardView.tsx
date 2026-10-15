import React, { useState } from 'react';
import {
  CognitiveMetrics,
  MedalBadge,
  SessionRecord,
} from '../types';
import {
  Activity,
  Flame,
  Award,
  TrendingUp,
  Brain,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Zap,
} from 'lucide-react';
import { INITIAL_BADGES } from '../data/languages';

interface CognitiveDashboardViewProps {
  sessions: SessionRecord[];
  currentMetrics: CognitiveMetrics;
  overallScore: number;
  streakDays: number;
  unlockedBadges: MedalBadge[];
  onStartTraining: () => void;
}

export const CognitiveDashboardView: React.FC<CognitiveDashboardViewProps> = ({
  sessions,
  currentMetrics,
  overallScore,
  streakDays,
  unlockedBadges,
  onStartTraining,
}) => {
  const [selectedAxis, setSelectedAxis] = useState<string | null>(null);

  // Compute Radar polygon coordinates
  const radarAxes = [
    { key: 'sustainedAttention', label: 'Atención Sostenida', value: currentMetrics.sustainedAttention },
    { key: 'workingMemory', label: 'Memoria Trabajo', value: currentMetrics.workingMemory },
    { key: 'processingSpeed', label: 'Velocidad Proc.', value: currentMetrics.processingSpeed },
    { key: 'visualScanning', label: 'Rastreo Visual', value: currentMetrics.visualScanning },
    { key: 'vocabularyRetention', label: 'Retención Léxica', value: currentMetrics.vocabularyRetention },
    { key: 'emotionalCalm', label: 'Calma Emocional', value: currentMetrics.emotionalCalm },
  ];

  const size = 260;
  const center = size / 2;
  const radius = 95;
  const angleStep = (Math.PI * 2) / radarAxes.length;

  const points = radarAxes.map((axis, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (axis.value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const gridCircles = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="w-full max-w-2xl mx-auto px-3 py-2 space-y-4">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800/90 border border-slate-200 dark:border-neutral-700 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-neutral-400">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Racha Diaria</span>
          </div>
          <div className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">
            {streakDays} <span className="text-xs font-normal text-slate-400">días</span>
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
            Meta diaria 100%
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800/90 border border-slate-200 dark:border-neutral-700 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-neutral-400">
            <Brain className="w-3.5 h-3.5 text-emerald-500" />
            <span>Índice Neuro</span>
          </div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {overallScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-neutral-400 mt-0.5">
            Fluidez Estable
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800/90 border border-slate-200 dark:border-neutral-700 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-neutral-400">
            <Award className="w-3.5 h-3.5 text-indigo-500" />
            <span>Medallas</span>
          </div>
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
            {unlockedBadges.filter((b) => b.unlocked).length}{' '}
            <span className="text-xs font-normal text-slate-400">/ {unlockedBadges.length}</span>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-neutral-400 mt-0.5">
            Logros de Rehab
          </div>
        </div>
      </div>

      {/* Radar Chart Section */}
      <div className="p-4 rounded-3xl bg-white dark:bg-neutral-800/90 border border-slate-200 dark:border-neutral-700 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-500" />
              Perfil de Ejes Cognitivos
            </h2>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              Evaluación multidimensional de procesos mentales
            </p>
          </div>
        </div>

        {/* SVG Radar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="relative flex items-center justify-center">
            <svg width={size} height={size} className="overflow-visible">
              {/* Background circular grids */}
              {gridCircles.map((ratio, idx) => (
                <circle
                  key={`grid_${idx}`}
                  cx={center}
                  cy={center}
                  r={radius * ratio}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-slate-200 dark:text-neutral-700"
                />
              ))}

              {/* Axis lines */}
              {radarAxes.map((axis, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                return (
                  <line
                    key={`line_${i}`}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-slate-200 dark:text-neutral-700"
                  />
                );
              })}

              {/* Data Polygon */}
              <polygon
                points={points}
                fill="rgba(16, 185, 129, 0.28)"
                stroke="#10b981"
                strokeWidth="2.5"
                className="transition-all duration-500"
              />

              {/* Data points */}
              {radarAxes.map((axis, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const r = (axis.value / 100) * radius;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);

                return (
                  <circle
                    key={`pt_${i}`}
                    cx={x}
                    cy={y}
                    r="4.5"
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="cursor-pointer hover:r-6 transition-all"
                  />
                );
              })}

              {/* Axis Labels */}
              {radarAxes.map((axis, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const labelRadius = radius + 22;
                const x = center + labelRadius * Math.cos(angle);
                const y = center + labelRadius * Math.sin(angle);

                return (
                  <text
                    key={`lbl_${i}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[10px] font-semibold fill-slate-600 dark:fill-neutral-300"
                  >
                    {axis.label}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Metric details list */}
          <div className="grid grid-cols-2 gap-2 w-full sm:w-60">
            {radarAxes.map((axis) => (
              <div
                key={axis.key}
                onClick={() => setSelectedAxis(axis.key)}
                className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedAxis === axis.key
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
                    : 'border-slate-200 dark:border-neutral-700/60 bg-slate-50 dark:bg-neutral-800/40'
                }`}
              >
                <div className="text-[10px] text-slate-500 dark:text-neutral-400 truncate">
                  {axis.label}
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
                  <span>{axis.value}%</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      axis.value >= 75 ? 'bg-emerald-500' : axis.value >= 60 ? 'bg-amber-400' : 'bg-rose-400'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personalized Recommendations & Reinforcement Box */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-neutral-800/90 dark:to-neutral-800/60 border border-emerald-200/80 dark:border-neutral-700 text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Recomendaciones de Refuerzo Personalizado
        </h3>

        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-emerald-100 dark:border-neutral-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                Hemisferio Izquierdo & Logopedia:
              </span>{' '}
              Se observa un tiempo de búsqueda ágil en sentido horizontal. Recomendamos practicar sopa de letras en Alemán o Francés para estimular la plasticidad fonológica y decodificación léxica contralateral.
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-emerald-100 dark:border-neutral-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                Atención Sostenida & Calma:
              </span>{' '}
              Mantén el ritmo respiratorio durante las búsquedas diagonales. La pausa consciente de 2 segundos antes de trazar reduce intentos fallidos en un 35%.
            </div>
          </div>
        </div>
      </div>

      {/* Gamification & Medals Showcase */}
      <div className="p-4 rounded-3xl bg-white dark:bg-neutral-800/90 border border-slate-200 dark:border-neutral-700 shadow-sm text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 flex items-center gap-1.5 mb-3">
          <Award className="w-4 h-4 text-indigo-500" />
          Medallas por Hitos Alcanzados
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {unlockedBadges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3 rounded-2xl border transition-all ${
                badge.unlocked
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800/60 shadow-sm'
                  : 'bg-slate-50 dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-800 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs ${
                    badge.unlocked
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-200 dark:bg-neutral-700 text-slate-400'
                  }`}
                >
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  {badge.title}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-neutral-400 line-clamp-2">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action button */}
      <button
        id="btn_start_training_from_dash"
        onClick={onStartTraining}
        className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
      >
        <Zap className="w-4 h-4" />
        <span>Iniciar Sesión de Estimulación Diaria</span>
      </button>
    </div>
  );
};
