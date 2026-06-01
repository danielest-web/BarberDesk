import React from "react";

type Props = {
  date: string;
  onNew: () => void;
};

export default function Header({ date, onNew }: Props) {
  return (
    <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-700/50">
      <div>
        <h3 className="text-xl font-semibold text-slate-100">Agenda Geral</h3>
        <div className="text-xs text-slate-500 mt-1">{date}</div>
      </div>
      <div>
        <button
          onClick={onNew}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition"
        >
          + Novo Agendamento
        </button>
      </div>
    </div>
  );
}
