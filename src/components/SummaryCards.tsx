import React from "react";

export default function SummaryCards() {
  const cards = [
    {
      title: "Agendamentos Hoje",
      value: "12",
      subtitle: "próximas 24h",
      color: "from-blue-500 to-cyan-500",
      accent: "bg-blue-500/20",
    },
    {
      title: "Barbeiros Ativos",
      value: "4",
      subtitle: "em serviço",
      color: "from-purple-500 to-pink-500",
      accent: "bg-purple-500/20",
    },
    {
      title: "Receita Prevista",
      value: "R$ 1.240",
      subtitle: "hoje",
      color: "from-green-500 to-emerald-500",
      accent: "bg-green-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`bg-gradient-to-br ${card.color} bg-opacity-10 border border-slate-700/50 rounded-2xl p-6 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:border-slate-600 transition cursor-pointer group`}
        >
          <div
            className={`${card.accent} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}
          >
            <span className="text-xl">
              {idx === 0 ? "📅" : idx === 1 ? "👥" : "💵"}
            </span>
          </div>
          <p className="text-slate-400 text-sm font-medium mb-2">
            {card.title}
          </p>
          <p className="text-3xl font-bold text-slate-100 mb-1">{card.value}</p>
          <p className="text-xs text-slate-500">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
