import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ScheduleGrid from "./components/ScheduleGrid";
import NewAppointmentModal from "./components/NewAppointmentModal";
import { DEFAULT_BARBERS } from "./data";
import { DEFAULT_SERVICES, SAMPLE_APPOINTMENTS, DEFAULT_TIMES } from "./data";
import { Barber, Service, Appointment } from "./types";
import { hasScheduleConflict } from "../../utils/schedule";
import TimeSlotManager from "../../components/TimeSlotManager";

/*
  Melhorias na tela Agenda:
  - Persistir dados em chaves separadas no localStorage.
  - Permitir horários extras adicionados pelo usuário.
  - Abrir modal ao clicar na grade (pré-preenchendo barbeiro + horário).
  - Editar/excluir agendamentos.
*/

const APPOINTMENTS_KEY = "barber-saas-appointments";
const SERVICES_KEY = "barber-saas-services";
const TIMES_KEY = "barber-saas-time-slots";

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export default function Agenda() {
  const [date, setDate] = useState(todayISO());
  const [barbers] = useState<Barber[]>(DEFAULT_BARBERS);

  const [services, setServices] = useState<Service[]>(() => {
    try {
      const raw = localStorage.getItem(SERVICES_KEY);
      if (!raw) return DEFAULT_SERVICES;
      return JSON.parse(raw);
    } catch {
      return DEFAULT_SERVICES;
    }
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const raw = localStorage.getItem(APPOINTMENTS_KEY);
      if (!raw) return SAMPLE_APPOINTMENTS ?? [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });

  const [extraTimes, setExtraTimes] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(TIMES_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [initialAppt, setInitialAppt] = useState<Appointment | null>(null);

  useEffect(() => {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
  }, [services]);
  useEffect(() => {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  }, [appointments]);
  useEffect(() => {
    localStorage.setItem(TIMES_KEY, JSON.stringify(extraTimes));
  }, [extraTimes]);

  function allTimes() {
    const merged = [...DEFAULT_TIMES, ...extraTimes];
    // remove duplicates and sort by time
    const uniq = Array.from(new Set(merged));
    uniq.sort((a, b) => {
      const [ah, am] = a.split(":").map(Number);
      const [bh, bm] = b.split(":").map(Number);
      return ah * 60 + am - (bh * 60 + bm);
    });
    return uniq;
  }

  function handleSave(appt: Appointment) {
    if (hasScheduleConflict(appointments, appt)) {
      alert("Esse barbeiro já possui agendamento nesse horário.");
      return;
    }
    setAppointments((prev) => {
      const exists = prev.findIndex((p) => String(p.id) === String(appt.id));
      if (exists >= 0) {
        const copy = [...prev];
        copy[exists] = appt;
        return copy;
      }
      return [...prev, appt];
    });
  }

  function handleDelete(id: string) {
    setAppointments((prev) => prev.filter((p) => String(p.id) !== String(id)));
  }

  function handleCreateService(s: Service) {
    setServices((prev) => [...prev, s]);
  }

  function handleCellClick(barberId: number, time: string) {
    // abrir modal com barbeiro e horario preenchidos
    setInitialAppt({
      id: String(Math.floor(Math.random() * 1000000)),
      barberId,
      clientName: "",
      phone: "",
      serviceName: "",
      startTime: time,
      duration: 30,
      price: 0,
      date,
      notes: "",
    });
    setShowModal(true);
  }

  function handleApptClick(a: Appointment) {
    setInitialAppt(a);
    setShowModal(true);
  }

  const dateDisplay = (() => {
    const d = new Date(date);
    return d.toLocaleDateString();
  })();

  return (
    <div className="p-6">
      <Header
        date={dateDisplay}
        onNew={() => {
          setInitialAppt(null);
          setShowModal(true);
        }}
      />
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <TimeSlotManager
          extraTimes={extraTimes}
          onAdd={(t) => setExtraTimes((prev) => [...prev, t])}
          onRemove={(t) => setExtraTimes((prev) => prev.filter((x) => x !== t))}
        />
      </div>

      <ScheduleGrid
        barbers={barbers}
        appointments={appointments}
        date={date}
        times={allTimes()}
        onCellClick={handleCellClick}
        onApptClick={handleApptClick}
      />

      <NewAppointmentModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        onDelete={handleDelete}
        barbers={barbers}
        services={services}
        onCreateService={handleCreateService}
        date={date}
        initial={initialAppt}
      />
    </div>
  );
}
