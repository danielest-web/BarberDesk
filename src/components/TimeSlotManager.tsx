import React, { useState } from "react";

type Props = {
  extraTimes: string[];
  onAdd: (t: string) => void;
  onRemove: (t: string) => void;
};

export default function TimeSlotManager({
  extraTimes,
  onAdd,
  onRemove,
}: Props) {
  const [val, setVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function handleAdd() {
    if (!val) return;
    if (!/^\d{2}:\d{2}$/.test(val)) {
      alert("Formato inválido. Use HH:MM");
      return;
    }
    if (extraTimes.includes(val)) {
      alert("Horário já existe");
      return;
    }
    onAdd(val);
    setVal("");
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-slate-100 hover:bg-slate-800 transition font-medium text-sm"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
        Horários Extras
      </button>

      {isOpen && (
        <div className="flex items-center gap-2 p-2 bg-slate-800/30 border border-slate-700/50 rounded-xl">
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="HH:MM"
            className="w-24 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition text-sm font-mono"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition font-medium text-sm"
          >
            +
          </button>
        </div>
      )}

      {extraTimes.length > 0 && (
        <div className="flex gap-2 items-center flex-wrap">
          {extraTimes.map((t) => (
            <div
              key={t}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-300 text-sm font-mono"
            >
              <span>{t}</span>
              <button
                onClick={() => onRemove(t)}
                className="text-red-400 hover:text-red-300 transition font-semibold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
