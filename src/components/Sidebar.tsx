import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r h-screen sticky top-0 px-6 py-8 shadow-sm">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold">
          BP
        </div>
        <div>
          <div className="text-lg font-semibold">Barbearia Prime</div>
          <div className="text-xs text-gray-500">Sistema de Agendamento</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-50 text-indigo-700 font-medium shadow-sm">
          Agenda
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100">
          Clientes
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100">
          Serviços
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100">
          Financeiro
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100">
          Configurações
        </a>
      </nav>

      <div className="mt-auto pt-8">
        <div className="text-xs text-gray-400">Versão</div>
        <div className="text-sm text-gray-600">MVP • 1.0</div>
      </div>
    </aside>
  );
}
