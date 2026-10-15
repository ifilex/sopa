import React from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  BatteryCharging,
  Activity,
  Award,
  Bell,
  Stethoscope,
  Users,
} from 'lucide-react';
import { LanguageCode, WearableStats } from '../types';
import { LANGUAGES } from '../data/languages';

interface HeaderProps {
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  streakDays: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  batterySaver: boolean;
  onToggleBatterySaver: () => void;
  wearableStats: WearableStats;
  onOpenWearableModal: () => void;
  activeTab: 'game' | 'dashboard' | 'clinical' | 'social' | 'reminders';
  onChangeTab: (tab: 'game' | 'dashboard' | 'clinical' | 'social' | 'reminders') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onSelectLanguage,
  streakDays,
  soundEnabled,
  onToggleSound,
  darkMode,
  onToggleDarkMode,
  batterySaver,
  onToggleBatterySaver,
  wearableStats,
  onOpenWearableModal,
  activeTab,
  onChangeTab,
}) => {
  const [langMenuOpen, setLangMenuOpen] = React.useState(false);

  return (
    <header className="w-full max-w-lg mx-auto px-2 pt-1 pb-1">
      {/* Top Compact Bar */}
      <div className="flex items-center justify-between gap-1.5">
        {/* Brand & Mini App Title */}
        <button
          onClick={() => onChangeTab('game')}
          className="flex items-center gap-1.5 text-left group"
          id="btn_brand_home"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h1 className="text-xs font-bold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-1 font-sans leading-none">
              Sopa Zen
              <span className="text-[9px] font-semibold px-1 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                Cognitiva
              </span>
            </h1>
          </div>
        </button>

        {/* Quick Compact Controls */}
        <div className="flex items-center gap-1">
          {/* Wearable telemetry badge */}
          <button
            id="btn_wearable_status"
            onClick={onOpenWearableModal}
            title="Sincronización con reloj / vestible"
            className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-neutral-800/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-neutral-700/60 hover:border-emerald-400 transition-colors"
          >
            <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span className="font-mono">{wearableStats.heartRate} bpm</span>
          </button>

          {/* Language selector */}
          <div className="relative">
            <button
              id="btn_lang_selector"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-neutral-800/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-neutral-700/60 hover:border-emerald-400 transition-colors"
            >
              <span>{LANGUAGES[currentLanguage].flag}</span>
              <span className="uppercase text-[9px] font-mono">{currentLanguage}</span>
            </button>

            {langMenuOpen && (
              <div
                className="absolute right-0 mt-1 w-36 rounded-xl bg-white dark:bg-neutral-800 shadow-xl border border-slate-200 dark:border-neutral-700 p-1 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setLangMenuOpen(false)}
              >
                <div className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-400">
                  Idioma
                </div>
                {(Object.keys(LANGUAGES) as LanguageCode[]).map((code) => {
                  const meta = LANGUAGES[code];
                  const isSelected = code === currentLanguage;
                  return (
                    <button
                      key={code}
                      onClick={() => onSelectLanguage(code)}
                      className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                        isSelected
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{meta.flag}</span>
                        <span>{meta.nativeName}</span>
                      </div>
                      <span className="text-[9px] text-slate-400">{code.toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sound toggle */}
          <button
            id="btn_sound_toggle"
            onClick={onToggleSound}
            title={soundEnabled ? 'Silenciar sonidos zen' : 'Activar sonidos zen'}
            className="p-1 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-500" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
          </button>

          {/* Dark / Light toggle */}
          <button
            id="btn_theme_toggle"
            onClick={onToggleDarkMode}
            title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            className="p-1 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
          </button>

          {/* Battery Saver toggle */}
          <button
            id="btn_battery_saver_toggle"
            onClick={onToggleBatterySaver}
            title={batterySaver ? 'Ahorro de batería activo' : 'Modo ahorro'}
            className={`p-1 rounded-md transition-colors ${
              batterySaver
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-neutral-800'
            }`}
          >
            <BatteryCharging className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Navigation Mini Pills */}
      <nav className="flex items-center justify-between gap-0.5 mt-1.5 p-0.5 rounded-lg bg-slate-100 dark:bg-neutral-800/80 border border-slate-200/80 dark:border-neutral-700/60 overflow-x-auto no-scrollbar">
        <button
          id="nav_tab_game"
          onClick={() => onChangeTab('game')}
          className={`flex-1 min-w-[58px] flex items-center justify-center gap-1 py-1 px-1.5 rounded-md text-[10px] font-bold transition-all whitespace-nowrap ${
            activeTab === 'game'
              ? 'bg-white dark:bg-neutral-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>Sopa</span>
        </button>

        <button
          id="nav_tab_dashboard"
          onClick={() => onChangeTab('dashboard')}
          className={`flex-1 min-w-[58px] flex items-center justify-center gap-1 py-1 px-1.5 rounded-md text-[10px] font-bold transition-all whitespace-nowrap ${
            activeTab === 'dashboard'
              ? 'bg-white dark:bg-neutral-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Activity className="w-3 h-3" />
          <span>Cognición</span>
        </button>

        <button
          id="nav_tab_clinical"
          onClick={() => onChangeTab('clinical')}
          className={`flex-1 min-w-[58px] flex items-center justify-center gap-1 py-1 px-1.5 rounded-md text-[10px] font-bold transition-all whitespace-nowrap ${
            activeTab === 'clinical'
              ? 'bg-white dark:bg-neutral-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Stethoscope className="w-3 h-3" />
          <span>Clínico</span>
        </button>

        <button
          id="nav_tab_social"
          onClick={() => onChangeTab('social')}
          className={`flex-1 min-w-[58px] flex items-center justify-center gap-1 py-1 px-1.5 rounded-md text-[10px] font-bold transition-all whitespace-nowrap ${
            activeTab === 'social'
              ? 'bg-white dark:bg-neutral-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Users className="w-3 h-3" />
          <span>Desafío</span>
        </button>

        <button
          id="nav_tab_reminders"
          onClick={() => onChangeTab('reminders')}
          className={`flex-1 min-w-[58px] flex items-center justify-center gap-1 py-1 px-1.5 rounded-md text-[10px] font-bold transition-all whitespace-nowrap ${
            activeTab === 'reminders'
              ? 'bg-white dark:bg-neutral-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Bell className="w-3 h-3" />
          <span>Rutina</span>
        </button>
      </nav>
    </header>
  );
};
