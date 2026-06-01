import React from "react";

type Props = {
  onNew: () => void;
  dateDisplay: string;
};

export default function TopHeader({ onNew, dateDisplay }: Props) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/30 backdrop-blur-lg border-b border-slate-700/20">
      <div className="px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Agenda Geral</h1>
          <p className="text-sm text-slate-400 mt-1">Gerenciar todos os agendamentos e barbeiros</p>
        </div>

        <div className="flex items-center gap-6">
          {/* Date Info */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-800/20 border border-slate-700/30">
            <svg
              className="w-5 h-5 text-indigo-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
            </svg>
            <span className="text-sm font-medium text-slate-300">{dateDisplay}</span>
          </div>

          {/* New Appointment Button */}
          <button
            onClick={onNew}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-lg hover:shadow-xl active:scale-95 transition text-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Novo Agendamento
          </button>
        </div>
      </div>
    </header>
  );
}
