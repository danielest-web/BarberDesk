import React from "react";
import { getDurationBlocks } from "../utils/schedule";

type Props = {
  appointment: any;
  onClick?: (a: any) => void;
};

export default function AppointmentCard({ appointment, onClick }: Props) {
  const blocks = getDurationBlocks(appointment.duration);
  const height = blocks * 56 - 8;
  return (
    <div
      onClick={() => onClick?.(appointment)}
      className="cursor-pointer rounded shadow-md p-2 text-white bg-gradient-to-br from-indigo-500 to-indigo-700"
      style={{ height }}
    >
      <div className="font-semibold">{appointment.clientName}</div>
      <div className="text-sm">{appointment.serviceName}</div>
      <div className="text-xs opacity-90">
        {appointment.startTime} • R$ {appointment.price}
      </div>
    </div>
  );
}
