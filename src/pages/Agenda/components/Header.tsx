import React from "react";

type Props = {
  date: string;
  onNew: () => void;
};

export default function Header({ date, onNew }: Props) {
  return (
    <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-700/30">
      <div>
        <h3 className="text-lg font-semibold text-slate-200">
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Visualize e gerencie os agendamentos de hoje
        </p>
      </div>
      <button
        onClick={onNew}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl active:scale-95 transition text-sm"
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
  );
}
