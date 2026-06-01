import React from 'react'

/*
  Componente de cabeçalho da tela Agenda Geral.

  Mostra o título "Agenda Geral", a data atual (formatada) e o botão
  "Novo Agendamento" que abre o modal de criação.

  Props:
  - `date`: string já formatada para exibição (ex: "31/05/2026").
  - `onNew`: callback acionado ao clicar em "Novo Agendamento".
*/

type Props = {
  date: string
  onNew: () => void
}

export default function Header({ date, onNew }: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-semibold">Agenda Geral</h1>
        <div className="text-sm text-gray-600">{date}</div>
      </div>
      <div>
        <button
          onClick={onNew}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Novo Agendamento
        </button>
      </div>
    </div>
  )
}
