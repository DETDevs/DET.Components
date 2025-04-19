import { Calendar } from "./Calendar";
import type { DayState } from "./types";

const CUPOS = 8;
const reservas: Record<string, number> = {
  "2025-04-19": 8,
  "2025-04-20": 4,
};

const getState = (iso: string): DayState => {
  if (iso < new Date().toISOString().split("T")[0]) return "past";
  const r = reservas[iso] ?? 0;
  if (r === 0) return "free";
  if (r < CUPOS) return "partial";
  return "full";
};

const getHours = (iso: string) =>
  Array.from(
    { length: CUPOS - (reservas[iso] ?? 0) },
    (_, i) => `${8 + i}:00 AM`
  );

function App() {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Calendar getDayState={getState} getHoursOfDay={getHours} />
    </div>
  );
}

export default App;
