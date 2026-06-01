import React from 'react'

type Props = {
  onNew: () => void
  dateDisplay: string
}

export default function TopHeader({ onNew, dateDisplay }: Props){
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white border-b">
      <div className="flex items-center gap-4">
        <div className="text-xl font-semibold">Barbearia Prime</div>
        <div className="text-sm text-gray-500">{dateDisplay}</div>
      </div>
      <div className="flex items-center gap-3">
        <input placeholder="Buscar cliente ou serviço" className="border rounded px-3 py-2 w-80" />
        <button onClick={onNew} className="bg-blue-600 text-white px-4 py-2 rounded">Novo Agendamento</button>
      </div>
    </header>
  )
}
