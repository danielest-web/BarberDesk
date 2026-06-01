import React from 'react'

export default function Sidebar(){
  return (
    <aside className="w-64 bg-white border-r h-screen sticky top-0 px-4 py-6">
      <div className="mb-8">
        <div className="text-2xl font-bold">Barbearia Prime</div>
        <div className="text-sm text-gray-500">Painel</div>
      </div>
      <nav className="flex flex-col gap-2">
        <a className="px-3 py-2 rounded bg-blue-50 text-blue-700 font-medium">Agenda</a>
        <a className="px-3 py-2 rounded hover:bg-gray-100">Clientes</a>
        <a className="px-3 py-2 rounded hover:bg-gray-100">Serviços</a>
        <a className="px-3 py-2 rounded hover:bg-gray-100">Financeiro</a>
        <a className="px-3 py-2 rounded hover:bg-gray-100">Configurações</a>
      </nav>
    </aside>
  )
}
