import { ReactNode } from 'react';
import { getMonthMatrix, iso } from './dateUtils';
import { DayState } from './types';

interface Props {
  monthDate: Date;            
  weekStartsOn: 0 | 1;
  getState: (iso: string) => DayState;
  onSelect: (d: Date) => void;
  render?: (d: Date) => ReactNode;
  colorMap: Record<DayState, string>;
}

export const DayGrid = ({
  monthDate,
  weekStartsOn,
  getState,
  onSelect,
  render,
  colorMap
}: Props) => {
  const matrix = getMonthMatrix(monthDate.getFullYear(), monthDate.getMonth(), weekStartsOn);

  const weekNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const ordered = [...weekNames.slice(weekStartsOn), ...weekNames.slice(0, weekStartsOn)];

  return (
    <>
      <div className="grid grid-cols-7 text-center text-sm font-medium">
        {ordered.map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-px rounded bg-gray-300">
        {matrix.flat().map(date => {
          const state = getState(iso(date));
          const bg = colorMap[state];
          const isCurrent = date.getMonth() === monthDate.getMonth();

          return (
            <div
              key={iso(date)}
              className={`h-24 p-1 ${bg} ${isCurrent ? '' : 'opacity-40'}
                          ${state === 'full' || state === 'past'
                            ? 'pointer-events-none'
                            : 'cursor-pointer hover:brightness-110'}`}
              onClick={() => onSelect(date)}
            >
              <div className="text-xs">{date.getDate()}</div>
              {render?.(date)}
            </div>
          );
        })}
      </div>
    </>
  );
};
