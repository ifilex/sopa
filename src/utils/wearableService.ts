import { WearableStats } from '../types';

export class WearableService {
  private stats: WearableStats = {
    connected: true,
    deviceName: 'Apple Watch Ultra (BLE)',
    heartRate: 68,
    hrv: 76,
    stressLevel: 'Óptimo (Zen)',
    focusIndex: 91,
    batteryLevel: 84,
  };

  private listeners: ((stats: WearableStats) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;

  constructor() {
    this.startTelemetry();
  }

  private startTelemetry() {
    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      if (!this.stats.connected) return;

      // Gentle natural biological variation
      const hrDelta = (Math.random() - 0.5) * 3;
      const hrvDelta = (Math.random() - 0.5) * 4;

      const newHr = Math.max(58, Math.min(84, Math.round(this.stats.heartRate + hrDelta)));
      const newHrv = Math.max(60, Math.min(95, Math.round(this.stats.hrv + hrvDelta)));

      let stress: WearableStats['stressLevel'] = 'Óptimo (Zen)';
      if (newHrv < 65) stress = 'Moderado';
      else if (newHrv > 80) stress = 'Muy Bajo';

      const focus = Math.max(75, Math.min(99, Math.round(88 + (newHrv - 70) * 0.4)));

      this.stats = {
        ...this.stats,
        heartRate: newHr,
        hrv: newHrv,
        stressLevel: stress,
        focusIndex: focus,
      };

      this.notify();
    }, 2500);
  }

  public subscribe(fn: (stats: WearableStats) => void): () => void {
    this.listeners.push(fn);
    fn(this.stats);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  public toggleConnection(): WearableStats {
    this.stats = {
      ...this.stats,
      connected: !this.stats.connected,
    };
    this.notify();
    return this.stats;
  }

  public switchDevice(name: string) {
    this.stats = {
      ...this.stats,
      deviceName: name,
    };
    this.notify();
  }

  public getStats(): WearableStats {
    return this.stats;
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.stats));
  }
}

export const wearableService = new WearableService();
