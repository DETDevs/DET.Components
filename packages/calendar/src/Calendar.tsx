import { useState } from "react";
import { Header } from "./Header";
import { DayGrid } from "./DayGrid";
import { HourList } from "./HourList";

import { useNowTimer } from "./hooks/useNowTimer";
import { iso, addMonths } from "./dateUtils";
import type { DayState } from "./types";

export interface CalendarProps {
  weekStartsOn?: 0 | 1;
  getDayState: (iso: string) => DayState;
  getHoursOfDay: (iso: string) => string[];
  colors?: Partial<Record<DayState, string>>;
}

const DEFAULT_COLORS: Record<DayState, string> = {
  free: "bg-emerald-200",
  partial: "bg-yellow-300",
  full: "bg-red-300",
  past: "bg-gray-200",
};

export const Calendar = ({
  weekStartsOn = 0,
  getDayState,
  getHoursOfDay,
  colors = {},
}: CalendarProps) => {
  useNowTimer(); // re‑render automático cada minuto

  const [viewDate, setViewDate] = useState(() => new Date());
  const [dialog, setDialog] = useState<{
    iso: string;
    hours: string[];
  } | null>(null);

  const colorMap = { ...DEFAULT_COLORS, ...colors };

  return (
    <>
      <Header
        viewDate={viewDate}
        onPrev={() => setViewDate((d) => addMonths(d, -1))}
        onNext={() => setViewDate((d) => addMonths(d, 1))}
        onToday={() => setViewDate(new Date())}
      />

      <DayGrid
        monthDate={viewDate}
        weekStartsOn={weekStartsOn}
        getState={getDayState}
        colorMap={colorMap}
        onSelect={(date) => {
          const dayISO = iso(date);
          setDialog({
            iso: dayISO,
            hours: getHoursOfDay(dayISO),
          });
        }}
      />

      {dialog && (
        <HourList
          open
          iso={dialog.iso}
          hours={dialog.hours}
          onClose={() => setDialog(null)}
          onConfirm={(hora) => {
            console.log("Reserva confirmada:", hora, "para el", dialog.iso);
            setDialog(null);
          }}
        />
      )}
    </>
  );
};
