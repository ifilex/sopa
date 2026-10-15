import React from 'react';
import { Activity, Watch, Heart, Shield, RefreshCw, X } from 'lucide-react';
import { WearableStats } from '../types';
import { wearableService } from '../utils/wearableService';

interface WearableSyncModalProps {
  stats: WearableStats;
  onClose: () => void;
}

export const WearableSyncModal: React.FC<WearableSyncModalProps> = ({ stats, onClose }) => {
  const devices = [
    'Apple Watch Ultra (BLE)',
    'Garmin Forerunner 965',
    'Fitbit Sense 2 (GSR/HRV)',
    'Polar H10 Chest Strap',
    'Samsung Galaxy Watch 6',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-5 shadow-2xl text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Watch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Sincronización con Vestibles
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-neutral-400">
                Monitoreo continuo de frecuencia cardíaca y HRV
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 my-4">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-800/80 border border-slate-200/80 dark:border-neutral-700">
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 font-medium mb-1">
              <span>Ritmo Cardíaco</span>
              <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
            </div>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-mono">
              {stats.heartRate} <span className="text-xs font-normal text-slate-400">BPM</span>
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">
              Ritmo basal relajado
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-800/80 border border-slate-200/80 dark:border-neutral-700">
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 font-medium mb-1">
              <span>Variabilidad (HRV)</span>
              <Activity className="w-4 h-4 text-teal-500" />
            </div>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-mono">
              {stats.hrv} <span className="text-xs font-normal text-slate-400">ms</span>
            </div>
            <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-1">
              Alta adaptabilidad parasimpática
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-800/80 border border-slate-200/80 dark:border-neutral-700">
            <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-medium mb-1">
              Nivel de Estrés
            </div>
            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {stats.stressLevel}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Sin reactividad ansiosa
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-800/80 border border-slate-200/80 dark:border-neutral-700">
            <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-medium mb-1">
              Índice de Foco Zen
            </div>
            <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {stats.focusIndex}%
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Atención ininterrumpida
            </div>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="space-y-2 mb-4">
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300">
            Dispositivo Vinculado Activo
          </label>
          <select
            value={stats.deviceName}
            onChange={(e) => wearableService.switchDevice(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-800 dark:text-slate-100 text-xs font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {devices.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => wearableService.toggleConnection()}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-colors ${
              stats.connected
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20'
                : 'bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
          >
            {stats.connected ? 'Desconectar Sensor' : 'Reconectar BLE'}
          </button>

          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
