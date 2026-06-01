import React from "react";

export default function SummaryCards() {
  const cards = [
    {
      title: "Agendamentos",
      value: "12",
      subtitle: "hoje",
      icon: "📅",
      gradient: "from-blue-500/30 via-blue-400/10 to-transparent",
      hoverGradient: "from-blue-500/50 via-blue-400/20 to-transparent",
      borderColor: "border-blue-400/50",
      accentText: "text-blue-200",
      accentGradient: "from-blue-400 to-blue-500",
    },
    {
      title: "Barbeiros Online",
      value: "4",
      subtitle: "ativos",
      icon: "👥",
      gradient: "from-purple-500/30 via-purple-400/10 to-transparent",
      hoverGradient: "from-purple-500/50 via-purple-400/20 to-transparent",
      borderColor: "border-purple-400/50",
      accentText: "text-purple-200",
      accentGradient: "from-purple-400 to-purple-500",
    },
    {
      title: "Faturamento",
      value: "R$ 1.240",
      subtitle: "previsto",
      icon: "💵",
      gradient: "from-green-500/30 via-green-400/10 to-transparent",
      hoverGradient: "from-green-500/50 via-green-400/20 to-transparent",
      borderColor: "border-green-400/50",
      accentText: "text-green-200",
      accentGradient: "from-green-400 to-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`group relative bg-gradient-to-br ${card.gradient} border-2 ${card.borderColor} rounded-2xl p-7 transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-2xl hover:border-opacity-100 hover:scale-[1.02] hover:border-2`}
        >
          {/* Glow effect on hover */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} blur-2xl`} />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 opacity-80">{card.title}</p>
                <p className={`text-4xl font-black bg-gradient-to-r ${card.accentGradient} bg-clip-text text-transparent`}>
                  {card.value}
                </p>
              </div>
              <div className="text-4xl filter opacity-60 group-hover:opacity-100 transition-all duration-300">{card.icon}</div>
            </div>
            <p className={`text-slate-400 text-xs font-semibold tracking-wide mt-3`}>{card.subtitle}</p>
          </div>

          {/* Bottom accent line */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.accentGradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
        </div>
      ))}
    </div>
  );
}
