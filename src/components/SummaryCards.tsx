import React from "react";

export default function SummaryCards() {
  const cards = [
    {
      title: "Agendamentos",
      value: "12",
      subtitle: "hoje",
      icon: "📅",
      bgGradient: "from-blue-600/10 via-blue-500/5 to-transparent",
      borderColor: "border-blue-400/30",
      accentColor: "from-blue-500 to-blue-600",
      textColor: "text-blue-300",
    },
    {
      title: "Barbeiros Online",
      value: "4",
      subtitle: "ativos",
      icon: "👥",
      bgGradient: "from-purple-600/10 via-purple-500/5 to-transparent",
      borderColor: "border-purple-400/30",
      accentColor: "from-purple-500 to-pink-600",
      textColor: "text-purple-300",
    },
    {
      title: "Faturamento",
      value: "R$ 1.240",
      subtitle: "previsto",
      icon: "💵",
      bgGradient: "from-green-600/10 via-emerald-500/5 to-transparent",
      borderColor: "border-green-400/30",
      accentColor: "from-green-500 to-emerald-600",
      textColor: "text-green-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`relative group bg-gradient-to-br ${card.bgGradient} border ${card.borderColor} rounded-2xl p-6 shadow-2xl hover:shadow-2xl transition-all duration-300 backdrop-blur-xl hover:border-opacity-100 overflow-hidden cursor-pointer hover:-translate-y-1`}
        >
          {/* Animated gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${card.accentColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
          
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex-1">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2 opacity-75">{card.title}</p>
              <p className={`text-3xl font-bold bg-gradient-to-r ${card.accentColor} bg-clip-text text-transparent`}>{card.value}</p>
              <p className="text-slate-500 text-xs mt-2 font-medium">{card.subtitle}</p>
            </div>
            <div className="text-4xl opacity-40 group-hover:opacity-60 transition-opacity">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
