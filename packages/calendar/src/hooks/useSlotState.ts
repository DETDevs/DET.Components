import { DayState } from '../types';

/**
 * Hook que, dado un map de ocupación y la fecha actual,
 * devuelve la función getDayState(iso) usada por Calendar.
 */
export const useSlotState = (
  reservas: Record<string, number>,
  cuposTotales: number
) => {
  return (iso: string): DayState => {
    const hoy = new Date().toISOString().split('T')[0];
    if (iso < hoy) return 'past';

    const taken = reservas[iso] ?? 0;
    if (taken === 0) return 'free';
    if (taken < cuposTotales) return 'partial';
    return 'full';
  };
};
