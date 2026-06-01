import React from "react";

export default function SummaryCards() {
  const cards = [
    {
      title: "Agendamentos Hoje",
      value: "12",
      subtitle: "próximas 24h",
      icon: "📅",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      accentColor: "text-blue-400",
    },
    {
      title: "Barbeiros Ativos",
      value: "4",
      subtitle: "em serviço",
      icon: "👥",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      accentColor: "text-purple-400",
    },
    {
      title: "Receita Prevista",
      value: "R$ 1.240",
      subtitle: "hoje",
      icon: "💵",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      accentColor: "text-green-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`bg-gradient-to-br ${card.color} border ${card.borderColor} rounded-xl p-5 shadow-lg hover:shadow-xl transition backdrop-blur-sm hover:scale-[1.02]`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">{card.title}</p>
              <p className={`text-2xl font-bold ${card.accentColor}`}>{card.value}</p>
            </div>
            <span className="text-2xl opacity-50">{card.icon}</span>
          </div>
          <p className="text-slate-500 text-xs">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
