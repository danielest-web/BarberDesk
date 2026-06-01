import React from "react";
import { getDurationBlocks } from "../utils/schedule";

type Props = {
  appointment: any;
  onClick?: (a: any) => void;
};

const colorGradients = [
  "from-blue-500 via-blue-600 to-blue-700 border-blue-400/50",
  "from-purple-500 via-purple-600 to-purple-700 border-purple-400/50",
  "from-pink-500 via-pink-600 to-pink-700 border-pink-400/50",
  "from-cyan-500 via-cyan-600 to-cyan-700 border-cyan-400/50",
  "from-emerald-500 via-emerald-600 to-emerald-700 border-emerald-400/50",
  "from-amber-500 via-amber-600 to-amber-700 border-amber-400/50",
  "from-rose-500 via-rose-600 to-rose-700 border-rose-400/50",
  "from-indigo-500 via-indigo-600 to-indigo-700 border-indigo-400/50",
];

export default function AppointmentCard({ appointment, onClick }: Props) {
  const blocks = getDurationBlocks(appointment.duration);
  const height = blocks * 64 - 8;
  const colorIdx = appointment.id.charCodeAt(0) % colorGradients.length;
  const gradient = colorGradients[colorIdx];

  return (
    <div
      onClick={() => onClick?.(appointment)}
      className={`cursor-pointer rounded-xl shadow-lg p-3 text-white bg-gradient-to-br ${gradient} hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition group border-2 backdrop-blur-sm`}
      style={{ height }}
    >
      <div className="font-bold text-sm line-clamp-2 group-hover:underline leading-tight">
        {appointment.clientName}
      </div>
      <div className="text-xs text-white/85 line-clamp-1 mt-1">
        {appointment.serviceName}
      </div>
      <div className="flex items-end justify-between mt-auto pt-2">
        <div className="text-xs text-white/75">
          <div className="font-semibold">{appointment.startTime}</div>
          <div className="text-white/60">{appointment.duration}min</div>
        </div>
        <div className="text-xs font-semibold text-white/90 bg-white/20 px-2 py-0.5 rounded-md">
          R$ {appointment.price}
        </div>
      </div>
    </div>
  );
}
