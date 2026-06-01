import React from "react";

type Props = {
  onNew: () => void;
  dateDisplay: string;
};

export default function TopHeader({ onNew, dateDisplay }: Props) {
  return (
    <header className="flex items-center justify-between py-4 px-8 bg-white border-b shadow-sm">
      <div className="flex items-center gap-6">
        <div className="text-2xl font-bold">Barbearia Prime</div>
        <div className="text-sm text-gray-600">{dateDisplay}</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            placeholder="Buscar cliente ou serviço"
            className="border rounded-full px-4 py-2 w-96 pl-10 shadow-sm"
          />
        </div>
        <button
          onClick={onNew}
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
        >
          Novo Agendamento
        </button>
          <div>
            <input
              placeholder="Buscar cliente ou serviço"
              className="border rounded-full px-4 py-2 w-96 shadow-sm"
            />
          </div>
        
      </div>
    </header>
  );
}
