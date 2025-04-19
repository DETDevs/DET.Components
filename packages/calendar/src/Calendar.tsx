import { useState } from 'react';
import { Header }   from './Header';
import { DayGrid }  from './DayGrid';
import { HourList } from './HourList';

import { useNowTimer } from './hooks/useNowTimer';
import { iso, addMonths } from './dateUtils';
import type { DayState }  from './types';

export interface CalendarProps {
  /** 0 = Sunday‑first, 1 = Monday‑first  */
  weekStartsOn?: 0 | 1;
  /** Determina el estado (free/partial/full/past) de una fecha ISO (YYYY‑MM‑DD) */
  getDayState   : (iso: string) => DayState;
  /** Devuelve los horarios disponibles para esa fecha */
  getHoursOfDay : (iso: string) => string[];
  /** Permite sobre‑escribir clases/colores por estado  */
  colors?       : Partial<Record<DayState, string>>;
}

const DEFAULT_COLORS: Record<DayState, string> = {
  free   : 'bg-emerald-200',
  partial: 'bg-yellow-300',
  full   : 'bg-red-300',
  past   : 'bg-gray-200',
};

export const Calendar = ({
  weekStartsOn = 0,
  getDayState,
  getHoursOfDay,
  colors = {},
}: CalendarProps) => {
  /*  ───────────────────────── hooks ─────────────────────────── */
  useNowTimer();                         // re‑render automático cada minuto

  const [viewDate, setViewDate] = useState(() => new Date());
  const [dialog, setDialog]     = useState<{
    iso: string;
    hours: string[];
  } | null>(null);

  const colorMap = { ...DEFAULT_COLORS, ...colors };

  /*  ───────────────────────── render ────────────────────────── */
  return (
    <>
      {/* navegación */}
      <Header
        viewDate={viewDate}
        onPrev={() => setViewDate(d => addMonths(d, -1))}
        onNext={() => setViewDate(d => addMonths(d,  1))}
        onToday={() => setViewDate(new Date())}
      />

      {/* celdas de días */}
      <DayGrid
        monthDate={viewDate}
        weekStartsOn={weekStartsOn}
        getState={getDayState}
        colorMap={colorMap}
        onSelect={date => {
          const dayISO = iso(date);
          setDialog({
            iso  : dayISO,
            hours: getHoursOfDay(dayISO),
          });
        }}
      />

      {/* modal de horas */}
      {dialog && (
        <HourList
          open   /* siempre true cuando existe `dialog`             */
          iso    ={dialog.iso}
          hours  ={dialog.hours}
          onClose={() => setDialog(null)}
          onConfirm={hora => {
            // 👉 aquí disparás tu reserva / aside / llamada API
            console.log('Reserva confirmada:', hora, 'para el', dialog.iso);
            setDialog(null);
          }}
        />
      )}
    </>
  );
};
