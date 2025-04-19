import { addMonths } from "./dateUtils";

interface Props {
  viewDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const btnBase =
  "bg-slate-800 text-white text-sm px-2 py-1 rounded hover:bg-slate-700 transition";

export const Header = ({ viewDate, onPrev, onNext, onToday }: Props) => (
  <div className="flex items-center justify-between mb-2 select-none">
    <div className="space-x-1">
      <button onClick={onPrev} className={btnBase}>
        ‹
      </button>
      <button onClick={onNext} className={btnBase}>
        ›
      </button>
    </div>
    <h2 className="font-semibold text-lg">
      {viewDate.toLocaleDateString("default", {
        month: "long",
        year: "numeric",
      })}
    </h2>
    <button onClick={onToday} className={`${btnBase} px-3`}>
      Today
    </button>
  </div>
);
