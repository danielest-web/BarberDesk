import React from "react";
import { Barber, Appointment } from "../types";
import { DEFAULT_TIMES } from "../data";
import AppointmentCard from "/src/components/AppointmentCard.tsx";

/*
  Grade de horários (agenda) principal.

  - Linhas: blocos de 30 minutos (baseado em `TIMES`).
  - Colunas: cada `Barber` recebe uma coluna.
  - Exibe blocos de agendamento que podem ocupar múltiplas linhas conforme
    a `duration` do serviço (30/60/90 minutos etc.).

  Lógica resumida:
  - Para cada célula, verificamos se existe um `Appointment` que comece
    exatamente naquele horário (então desenhamos o bloco com `span`).
  - Se o horário estiver dentro do período de um agendamento mas não
    for o início, marcamos a célula como ocupada (fundo cinza) para evitar
    sobreposição visual.
*/

type Props = {
  barbers: Barber[];
  appointments: Appointment[];
  date: string;
  times?: string[];
  onCellClick?: (barberId: number, time: string) => void;
  onApptClick?: (a: Appointment) => void;
};

const ROW_HEIGHT = 56; // px per 30min block

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
    <div className="overflow-auto border rounded bg-white">
      <div
        className="grid"
        style={{ gridTemplateColumns: `120px repeat(${barbers.length}, 1fr)` }}
      >
        {/* Header row */}
        <div className="p-2 border-b bg-gray-50"></div>
        {barbers.map((b) => (
          <div
            key={b.id}
            className="p-2 border-l border-b bg-gray-50 text-center font-medium"
          >
            {b.name}
          </div>
        ))}

        {/* Rows */}
        {times.map((time, rowIdx) => (
          <React.Fragment key={time}>
            <div
              className="p-2 border-t text-sm text-gray-700"
              style={{ height: ROW_HEIGHT }}
            >
              {time}
            </div>
            {barbers.map((b) => {
              // check if any appointment starts here for this barber
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
                    className="p-1 border-l border-t relative"
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
              // check if this time is inside an appointment (occupied but not start)
              const inside = appointments.find(
                (a) =>
                  a.barberId === b.id &&
                  a.date === date &&
                  timeIndex(a.startTime, times) < rowIdx &&
                  rowIdx <
                    timeIndex(a.startTime, times) + Math.ceil(a.duration / 30),
              );
              if (inside) {
                return (
                  <div
                    key={b.id + "-" + time}
                    className="p-2 border-l border-t"
                    style={{ height: ROW_HEIGHT, background: "#f8fafc" }}
                  ></div>
                );
              }

              return (
                <div
                  key={b.id + "-" + time}
                  onClick={() => onCellClick?.(b.id, time)}
                  className="p-2 border-l border-t hover:bg-gray-50"
                  style={{ height: ROW_HEIGHT }}
                ></div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
