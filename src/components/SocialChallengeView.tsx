import React, { useState } from 'react';
import { Users, Trophy, Share2, Sparkles, Copy, Check, Swords, Play } from 'lucide-react';
import { soundHaptics } from '../utils/soundHaptics';

interface SocialChallengeViewProps {
  onStartChallenge: (opponentName: string, challengeCode: string) => void;
  bestScore: number;
}

export const SocialChallengeView: React.FC<SocialChallengeViewProps> = ({
  onStartChallenge,
  bestScore,
}) => {
  const [challengeCode, setChallengeCode] = useState('ZEN-8924');
  const [copied, setCopied] = useState(false);
  const [selectedOpponent, setSelectedOpponent] = useState('Yo Mismo (Mejor Fantasma)');

  const friendlyGhosts = [
    { name: 'Yo Mismo (Mejor Fantasma)', record: '1m 24s', score: bestScore, level: 'Tu Récord' },
    { name: 'Dr. Lucas (Logopeda)', record: '1m 40s', score: 88, level: 'Mentor Clínico' },
    { name: 'Elena (Compañera Zen)', record: '1m 55s', score: 82, level: 'Nivel Medio' },
    { name: 'Amigo Retador (Aleatorio)', record: '2m 10s', score: 76, level: 'Comunitario' },
  ];

  const handleCopy = () => {
    soundHaptics.playLetterSelect(1);
    navigator.clipboard?.writeText(`¡Acepta mi desafío en Sopa Zen! Código: ${challengeCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-3 py-2 space-y-4 text-left">
      {/* Top Banner */}
      <div className="p-4 rounded-3xl bg-white dark:bg-neutral-800/90 border border-slate-200 dark:border-neutral-700 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Desafíos Sociales & Autocompetencia Zen
            </h2>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              Compite contra tu mejor versión o comparte con amigos
            </p>
          </div>
        </div>
      </div>

      {/* Share / Invitation Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-neutral-800/90 dark:to-neutral-800/60 border border-indigo-200/80 dark:border-neutral-700 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Código de Partida Compartida
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
            {challengeCode}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-neutral-300">
          Invita a un amigo o familiar a jugar exactamente el mismo tablero y compara los tiempos y las frases zen descubiertas.
        </p>

        <div className="flex gap-2">
          <button
            id="btn_copy_challenge"
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white dark:bg-neutral-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-neutral-600 text-xs font-bold shadow-sm hover:bg-indigo-50 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡Copiado al Portapapeles!' : 'Copiar Invitación'}</span>
          </button>

          <button
            id="btn_share_native"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Desafío Sopa Zen',
                  text: `Te desafío a completar esta Sopa Zen en tiempo récord. Código: ${challengeCode}`,
                  url: window.location.href,
                }).catch(() => {});
              } else {
                handleCopy();
              }
            }}
            className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ghost Rivals List */}
      <div className="p-4 rounded-3xl bg-white dark:bg-neutral-800/90 border border-slate-200 dark:border-neutral-700 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
          <Swords className="w-4 h-4 text-indigo-500" />
          Selecciona un Oponente Fantasma en Vivo
        </h3>

        <div className="space-y-2">
          {friendlyGhosts.map((ghost) => (
            <div
              key={ghost.name}
              onClick={() => setSelectedOpponent(ghost.name)}
              className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedOpponent === ghost.name
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-400'
                  : 'bg-slate-50 dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-neutral-700 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold text-xs">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {ghost.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400">
                    {ghost.level} • Mejor Tiempo: {ghost.record}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {ghost.score} pts
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          id="btn_start_ghost_duel"
          onClick={() => onStartChallenge(selectedOpponent, challengeCode)}
          className="w-full mt-2 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Comenzar Duelo Fantasma contra "{selectedOpponent}"</span>
        </button>
      </div>
    </div>
  );
};
