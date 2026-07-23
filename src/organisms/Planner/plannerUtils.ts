import type { PlannerConfig, PlannerEvent } from './Planner';

export function calcSlotCount(config: PlannerConfig): number {
  return ((config.endHour - config.startHour) * 60) / config.granularity;
}

export function calcEventPosition(
  event: PlannerEvent,
  config: PlannerConfig,
  slotHeight: number
): { top: number; height: number } {
  const top = (event.startMin / config.granularity) * slotHeight;
  const height = Math.max(slotHeight * 0.6, (event.durationMin / config.granularity) * slotHeight - 4);
  return { top, height };
}

export function pxToMinutes(
  px: number,
  config: PlannerConfig,
  slotHeight: number
): number {
  const raw = Math.round((px / slotHeight) * config.granularity);
  return Math.max(0, raw - (raw % config.granularity));
}

export function formatTime(totalHour: number, minutes: number): string {
  const h = Math.floor(totalHour) + Math.floor(minutes / 60);
  const m = minutes % 60;
  const ap = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 || 12;
  return `${hh}:${String(m).padStart(2, '0')} ${ap}`;
}

export function formatEventRange(event: PlannerEvent, config: PlannerConfig): string {
  const absStart = config.startHour * 60 + event.startMin;
  const absEnd = absStart + event.durationMin;
  return `${formatTime(0, absStart)} – ${formatTime(0, absEnd)}`;
}

export function eventsOverlap(a: PlannerEvent, b: PlannerEvent): boolean {
  return (
    a.columnId === b.columnId &&
    a.startMin < b.startMin + b.durationMin &&
    b.startMin < a.startMin + a.durationMin
  );
}

export function groupOverlappingEvents(events: PlannerEvent[]): Map<string, number> {
  const trackMap = new Map<string, number>();
  const sorted = [...events].sort((a, b) => a.startMin - b.startMin);
  const tracks: number[] = [];

  for (const ev of sorted) {
    let assigned = -1;
    for (let t = 0; t < tracks.length; t++) {
      if (ev.startMin >= tracks[t]) {
        assigned = t;
        break;
      }
    }
    if (assigned === -1) {
      assigned = tracks.length;
      tracks.push(0);
    }
    tracks[assigned] = ev.startMin + ev.durationMin;
    trackMap.set(ev.id, assigned);
  }
  return trackMap;
}
