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

const ROW_HEIGHT = 56;

function timeIndex(t: string, times: string[]) {
  return times.indexOf(t);
}

export default function ScheduleGrid({
  barbers,
  appointments,
  date,
  times = DEFAULT_TIMES,
  onCellClick,
  onApptClick,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-700 shadow-2xl overflow-hidden backdrop-blur-sm">
      <div className="overflow-auto bg-slate-900/50">
        <div
          className="grid"
          style={{ gridTemplateColumns: `140px repeat(${barbers.length}, 1fr)` }}
        >
          {/* Header row */}
          <div className="p-4 border-b border-slate-700 bg-slate-900/80 font-semibold text-slate-300"></div>
          {barbers.map((b) => (
            <div
              key={b.id}
              className="p-4 border-l border-b border-slate-700 bg-slate-900/80 text-center font-semibold text-slate-200"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold mx-auto mb-2">
                {b.name.charAt(0)}
              </div>
              <div className="text-sm">{b.name}</div>
            </div>
          ))}

          {/* Rows */}
          {times.map((time, rowIdx) => (
            <React.Fragment key={time}>
              <div
                className="p-3 border-t border-slate-700 text-xs text-slate-400 font-medium bg-slate-950/40 flex items-center justify-center"
                style={{ height: ROW_HEIGHT }}
              >
                {time}
              </div>
              {barbers.map((b) => {
                const appt = appointments.find(
                  (a) =>
                    a.barberId === b.id &&
                    a.date === date &&
                    a.startTime === time
                );
                if (appt) {
                  return (
                    <div
                      key={b.id + "-" + time}
                      className="p-1 border-l border-t border-slate-700 relative"
                      style={{ height: ROW_HEIGHT }}
                    >
                      <div className="absolute left-2 right-2 top-1">
                        <AppointmentCard
                          appointment={appt}
                          onClick={onApptClick}
                        />
                      </div>
                    </div>
                  );
                }

                const inside = appointments.find(
                  (a) =>
                    a.barberId === b.id &&
                    a.date === date &&
                    timeIndex(a.startTime, times) < rowIdx &&
                    rowIdx <
                      timeIndex(a.startTime, times) + Math.ceil(a.duration / 30)
                );
                if (inside) {
                  return (
                    <div
                      key={b.id + "-" + time}
                      className="p-2 border-l border-t border-slate-700 bg-slate-800/30"
                      style={{ height: ROW_HEIGHT }}
                    ></div>
                  );
                }

                return (
                  <div
                    key={b.id + "-" + time}
                    onClick={() => onCellClick?.(b.id, time)}
                    className="p-2 border-l border-t border-slate-700 hover:bg-slate-800/50 transition cursor-pointer group"
                    style={{ height: ROW_HEIGHT }}
                  >
                    <div className="w-full h-full rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-br from-purple-500/20 to-indigo-500/10 transition"></div>
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
