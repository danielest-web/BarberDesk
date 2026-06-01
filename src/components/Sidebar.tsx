import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-80 bg-slate-950 border-r border-slate-800 h-screen sticky top-0 px-6 py-8 shadow-2xl flex flex-col">
      {/* Logo Section */}
      <div className="mb-12 pb-8 border-b border-slate-800">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            BP
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              Barbearia Prime
            </h2>
            <p className="text-xs text-slate-500 mt-1">Sistema SaaS</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        <a className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600/30 to-indigo-600/20 text-purple-300 font-medium shadow-lg border border-purple-500/20 hover:from-purple-600/40 hover:to-indigo-600/30 transition cursor-pointer">
          <span className="w-5 h-5 rounded-lg bg-purple-500/40 flex items-center justify-center text-xs">
            📅
          </span>
          Agenda
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition cursor-pointer">
          <span className="w-5 h-5 rounded-lg bg-slate-800 flex items-center justify-center text-xs">
            👤
          </span>
          Clientes
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition cursor-pointer">
          <span className="w-5 h-5 rounded-lg bg-slate-800 flex items-center justify-center text-xs">
            ✂️
          </span>
          Serviços
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition cursor-pointer">
          <span className="w-5 h-5 rounded-lg bg-slate-800 flex items-center justify-center text-xs">
            💰
          </span>
          Financeiro
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition cursor-pointer">
          <span className="w-5 h-5 rounded-lg bg-slate-800 flex items-center justify-center text-xs">
            ⚙️
          </span>
          Configurações
        </a>
      </nav>

      {/* Footer */}
      <div className="pt-8 border-t border-slate-800">
        <div className="text-xs text-slate-500 mb-1">Versão</div>
        <div className="text-sm font-medium text-slate-400">MVP • 1.0.0</div>
        <div className="mt-4 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
          <p className="mb-2">Bem-vindo!</p>
          <p className="text-slate-500">Sua barbearia online</p>
        </div>
      </div>
    </aside>
  );
}
