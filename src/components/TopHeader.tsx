import React from "react";

type Props = {
  onNew: () => void;
  dateDisplay: string;
};

export default function TopHeader({ onNew, dateDisplay }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-700/50 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Barbearia Prime</h1>
            <p className="text-xs text-slate-500 mt-1">Sua barbearia digital</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-400 bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/30">
            {dateDisplay}
          </div>
          <button
            onClick={onNew}
            className="px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition text-sm"
          >
            + Novo Agendamento
          </button>
        </div>
      </div>
    </header>
  );
}
