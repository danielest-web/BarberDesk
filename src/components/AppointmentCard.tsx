import React from "react";
import { getDurationBlocks } from "../utils/schedule";

type Props = {
  appointment: any;
  onClick?: (a: any) => void;
};

const colorGradients = [
  "from-blue-600 to-blue-700",
  "from-purple-600 to-purple-700",
  "from-pink-600 to-pink-700",
  "from-cyan-600 to-cyan-700",
  "from-green-600 to-green-700",
  "from-yellow-600 to-yellow-700",
  "from-rose-600 to-rose-700",
  "from-indigo-600 to-indigo-700",
];

export default function AppointmentCard({ appointment, onClick }: Props) {
  const blocks = getDurationBlocks(appointment.duration);
  const height = blocks * 56 - 8;
  const colorIdx = appointment.id.charCodeAt(0) % colorGradients.length;
  const gradient = colorGradients[colorIdx];

  return (
    <div
      onClick={() => onClick?.(appointment)}
      className={`cursor-pointer rounded-xl shadow-lg p-3 text-white bg-gradient-to-br ${gradient} hover:shadow-xl hover:scale-[1.02] transition group border border-white/10`}
      style={{ height }}
    >
      <div className="font-semibold text-sm line-clamp-1 group-hover:underline">
        {appointment.clientName}
      </div>
      <div className="text-xs text-white/80 line-clamp-1">
        {appointment.serviceName}
      </div>
      <div className="text-xs text-white/70 mt-auto pt-1">
        {appointment.startTime} • R$ {appointment.price}
      </div>
    </div>
  );
}
