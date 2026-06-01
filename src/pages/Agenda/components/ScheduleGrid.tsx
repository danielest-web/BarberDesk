import React from "react";
import { Barber, Appointment } from "../types";
import { DEFAULT_TIMES } from "../data";
import AppointmentCard from "/src/components/AppointmentCard.tsx";

type Props = {
  barbers: Barber[];
  appointments: Appointment[];
  date: string;
  times?: string[];
  onCellClick?: (barberId: number, time: string) => void;
  onApptClick?: (a: Appointment) => void;
};

const ROW_HEIGHT = 64;

function timeIndex(t: string, times: string[]) {
  return times.indexOf(t);
}

// Color palette for barbers
const BARBER_COLORS = [
  "from-blue-500/10 border-blue-500/20",
  "from-cyan-500/10 border-cyan-500/20",
  "from-teal-500/10 border-teal-500/20",
  "from-emerald-500/10 border-emerald-500/20",
];

export default function ScheduleGrid({
  barbers,
  appointments,
  date,
  times = DEFAULT_TIMES,
  onCellClick,
  onApptClick,
}: Props) {
  const getBarberColor = (idx: number) =>
    BARBER_COLORS[idx % BARBER_COLORS.length];

  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <div
          className="inline-grid min-w-full"
          style={{
            gridTemplateColumns: `120px repeat(${barbers.length}, 1fr)`,
          }}
        >
          {/* Header row */}
          <div className="px-4 py-5 bg-slate-800/30 border-b border-slate-700/50 font-semibold text-slate-400 text-xs uppercase tracking-wide flex items-center justify-center">
            Horários
          </div>
          {barbers.map((b, idx) => (
            <div
              key={b.id}
              className={`px-4 py-5 bg-gradient-to-b ${getBarberColor(idx)} border-l border-b border-slate-700/50 text-center`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold mx-auto mb-2 shadow-lg">
                {b.name.charAt(0)}
              </div>
              <div className="text-sm font-semibold text-slate-200">
                {b.name}
              </div>
              <p className="text-xs text-slate-400 mt-1">Online</p>
            </div>
          ))}

          {/* Rows */}
          {times.map((time, rowIdx) => (
            <React.Fragment key={time}>
              <div
                className="px-4 py-3 border-t border-slate-700/50 text-xs font-semibold text-slate-300 bg-slate-900/40 flex items-center justify-center font-mono"
                style={{ height: ROW_HEIGHT }}
              >
                {time}
              </div>
              {barbers.map((b, bIdx) => {
                const appt = appointments.find(
                  (a) =>
                    a.barberId === b.id &&
                    a.date === date &&
                    a.startTime === time,
                );
                if (appt) {
                  return (
                    <div
                      key={b.id + "-" + time}
                      className={`p-2 border-l border-t border-slate-700/50 bg-gradient-to-b ${getBarberColor(bIdx)} relative group`}
                      style={{ height: ROW_HEIGHT }}
                    >
                      <AppointmentCard
                        appointment={appt}
                        onClick={onApptClick}
                      />
                    </div>
                  );
                }

                const inside = appointments.find(
                  (a) =>
                    a.barberId === b.id &&
                    a.date === date &&
                    timeIndex(a.startTime, times) < rowIdx &&
                    rowIdx <
                      timeIndex(a.startTime, times) +
                        Math.ceil(a.duration / 30),
                );
                if (inside) {
                  return (
                    <div
                      key={b.id + "-" + time}
                      className={`p-2 border-l border-t border-slate-700/50 bg-gradient-to-b ${getBarberColor(bIdx)} opacity-60`}
                      style={{ height: ROW_HEIGHT }}
                    ></div>
                  );
                }

                return (
                  <div
                    key={b.id + "-" + time}
                    onClick={() => onCellClick?.(b.id, time)}
                    className={`p-2 border-l border-t border-slate-700/50 bg-gradient-to-b ${getBarberColor(bIdx)} hover:shadow-md hover:border-slate-600/60 transition cursor-pointer group`}
                    style={{ height: ROW_HEIGHT }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition h-full rounded-lg bg-white/5 backdrop-blur-sm"></div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
