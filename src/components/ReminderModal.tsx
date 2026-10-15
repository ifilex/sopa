import React, { useState } from 'react';
import { Bell, Clock, CheckCircle, Volume2, Sparkles, Shield } from 'lucide-react';
import { ReminderSetting } from '../types';
import { soundHaptics } from '../utils/soundHaptics';

interface ReminderModalProps {
  onSaveReminder?: (settings: ReminderSetting) => void;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({ onSaveReminder }) => {
  const [reminder, setReminder] = useState<ReminderSetting>({
    enabled: true,
    time: '09:30',
    daysOfWeek: [1, 2, 3, 4, 5],
    sound: true,
    gentleTone: 'Cuenco Tibetano Zen',
  });

  const [testSent, setTestSent] = useState(false);

  const daysLabels = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  const toggleDay = (dayIdx: number) => {
    if (reminder.daysOfWeek.includes(dayIdx)) {
      setReminder({
        ...reminder,
        daysOfWeek: reminder.daysOfWeek.filter((d) => d !== dayIdx),
      });
    } else {
      setReminder({
        ...reminder,
        daysOfWeek: [...reminder.daysOfWeek, dayIdx].sort(),
      });
    }
  };

  const handleTestNotification = () => {
    soundHaptics.playZenCompletion();
    setTestSent(true);

    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Sopa Zen • Momento de Calma', {
          body: 'Tu sesión diaria de estimulación cognitiva y logopedia está lista para revitalizar tu mente.',
          icon: '/favicon.ico',
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((perm) => {
          if (perm === 'granted') {
            new Notification('Sopa Zen • Notificaciones Activadas', {
              body: 'Recordatorios sutiles configurados.',
            });
          }
        });
      }
    }

    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-3 py-2 space-y-4 text-left">
      {/* Top Header */}
      <div className="p-4 rounded-3xl bg-white dark:bg-neutral-800/90 border border-slate-200 dark:border-neutral-700 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Recordatorios Sutiles & Hábitos Zen
            </h2>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              Notificaciones no intrusivas para mantener la plasticidad neuronal
            </p>
          </div>
        </div>
      </div>

      {/* Reminder Config Card */}
      <div className="p-4 rounded-3xl bg-white dark:bg-neutral-800/90 border border-slate-200 dark:border-neutral-700 shadow-sm space-y-4">
        {/* Toggle On/Off */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
              Recordatorio Diario Activo
            </span>
            <p className="text-[11px] text-slate-500 dark:text-neutral-400">
              Avisos suaves programados según tu horario óptimo
            </p>
          </div>
          <button
            onClick={() => setReminder({ ...reminder, enabled: !reminder.enabled })}
            className={`w-12 h-6.5 rounded-full p-0.5 transition-colors ${
              reminder.enabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-neutral-700'
            }`}
          >
            <div
              className={`w-5.5 h-5.5 rounded-full bg-white shadow-sm transform transition-transform ${
                reminder.enabled ? 'translate-x-5.5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Time Picker */}
        <div className="pt-2 border-t border-slate-100 dark:border-neutral-700/60">
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            Hora de la Sesión Diaria
          </label>
          <input
            type="time"
            value={reminder.time}
            onChange={(e) => setReminder({ ...reminder, time: e.target.value })}
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-800 dark:text-slate-100 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Days of week selector */}
        <div className="pt-2 border-t border-slate-100 dark:border-neutral-700/60">
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300 mb-2">
            Días de Repetición
          </label>
          <div className="flex gap-1.5 justify-between max-w-xs">
            {daysLabels.map((label, idx) => {
              const active = reminder.daysOfWeek.includes(idx);
              return (
                <button
                  key={idx}
                  onClick={() => toggleDay(idx)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-neutral-700/60 text-slate-500 dark:text-neutral-400 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tone & Sound selector */}
        <div className="pt-2 border-t border-slate-100 dark:border-neutral-700/60 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-amber-500" />
              Tono Armónico Suave
            </span>
            <span className="text-[11px] text-slate-500 dark:text-neutral-400">
              {reminder.gentleTone}
            </span>
          </div>

          <button
            id="btn_test_reminder"
            onClick={handleTestNotification}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/80 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-semibold hover:bg-amber-200 transition-colors"
          >
            {testSent ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>{testSent ? '¡Notificación Enviada!' : 'Probar Notificación'}</span>
          </button>
        </div>
      </div>

      {/* Non-intrusive guarantee card */}
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-800/50 border border-slate-200 dark:border-neutral-700/60 flex items-start gap-2.5 text-xs text-slate-600 dark:text-neutral-400">
        <Shield className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Filosofía No Intrusiva:</strong> Sopa Zen nunca enviará más de una notificación al día. Todos los avisos se silencian automáticamente en horarios de descanso.
        </p>
      </div>
    </div>
  );
};
