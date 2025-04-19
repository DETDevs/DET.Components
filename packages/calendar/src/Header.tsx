import { addMonths } from './dateUtils';

interface Props {
  viewDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export const Header = ({ viewDate, onPrev, onNext, onToday }: Props) => (
  <div className="flex items-center justify-between mb-2 select-none">
    <div className="space-x-1">
      <button onClick={onPrev} className="btn-nav">‹</button>
      <button onClick={onNext} className="btn-nav">›</button>
    </div>
    <h2 className="font-semibold text-lg">
      {viewDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
    </h2>
    <button onClick={onToday} className="btn-nav px-3">today</button>
  </div>
);
