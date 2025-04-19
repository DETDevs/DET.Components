# 🗓️ @detdev/calendar

Componente de calendario **headless + estilizable** para apps React 18/19.

| Prop            | Tipo                                                       | Descripción                                  |
| --------------- | ---------------------------------------------------------- | -------------------------------------------- |
| `weekStartsOn`  | `0 \| 1`                                                   | 0 = domingo (default) / 1 = lunes            |
| `getDayState`   | `(iso: string) => "free" \| "partial" \| "full" \| "past"` | Lógica de disponibilidad por día             |
| `getHoursOfDay` | `(iso: string) => string[]`                                | Devuelve slots horarios en formato `"HH:MM"` |
| `colors`        | `Partial<Record<DayState,string>>`                         | Map de clases Tailwind/estilos por estado    |

```tsx
import { Calendar } from "@detdev/calendar";

const CUPOS = 8;
const reservas = { "2025-04-18": 8, "2025-04-19": 4 };

export default () => (
  <Calendar
    weekStartsOn={0}
    getDayState={(iso) => {
      const r = reservas[iso] ?? 0;
      if (r === 0) return "free";
      if (r < CUPOS) return "partial";
      return "full";
    }}
    getHoursOfDay={(iso) =>
      [...Array(CUPOS - (reservas[iso] ?? 0))].map((_, i) => `${8 + i}:00 AM`)
    }
  />
);
```

[![npm version](https://img.shields.io/npm/v/@detdev/calendar.svg)](https://www.npmjs.com/package/@detdev/calendar)
[![license](https://img.shields.io/npm/l/@detdev/calendar.svg)](LICENSE)

## Instalación

```bash
npm i @detdev/calendar
# ó
pnpm add @detdev/calendar
