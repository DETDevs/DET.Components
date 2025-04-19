import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

interface Props {
  iso: string; // 2025‑04‑22
  hours: string[]; // ['8:00 AM', ...]
  open: boolean;
  onClose: () => void;
  onConfirm: (hour: string) => void;
}

export const HourList = ({ iso, hours, open, onClose, onConfirm }: Props) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* blur opcional → backdrop‑blur‑sm */}
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-[420px] max-w-[calc(100%-2rem)]
                     -translate-x-1/2 -translate-y-1/2 rounded-xl
                     bg-white p-6 shadow-2xl ring-1 ring-black/10"
        >
          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 cursor-pointer rounded-xl border-0
                         p-1 bg-red-500 text-white hover:bg-red-400"
              aria-label="Cerrar"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </Dialog.Close>

          <h2 className="mb-4 text-center text-xl font-semibold">
            Horarios — {iso}
          </h2>

          <ul className="mb-6 flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
            {hours.map((h) => (
              <li key={h}>
                <button
                  onClick={() => setActive(h)}
                  className={`w-full rounded border px-4 py-2 text-left
                              transition
                              ${
                                active === h
                                  ? "border-blue-600 bg-blue-600/10 text-blue-700"
                                  : "hover:bg-gray-100"
                              }`}
                >
                  {h}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-end gap-2">
            <button
              disabled={!active}
              onClick={() => {
                if (active) onConfirm(active);
              }}
              className={`rounded bg-blue-600 px-4 py-2 text-sm font-medium
                          text-white transition
                          enabled:hover:bg-blue-700
                          disabled:cursor-not-allowed disabled:opacity-50`}
            >
              Confirmar
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
