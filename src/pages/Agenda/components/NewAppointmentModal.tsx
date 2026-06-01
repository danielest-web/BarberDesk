import React, { useState } from "react";
import { Barber, Service, Appointment } from "../types";
import { DEFAULT_TIMES as TIMES } from "../data";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (a: Appointment) => void;
  onDelete?: (id: string) => void;
  barbers: Barber[];
  services: Service[];
  onCreateService: (s: Service) => void;
  date: string;
  initial?: Appointment | null;
};

export default function NewAppointmentModal({
  visible,
  onClose,
  onSave,
  onDelete,
  barbers,
  services,
  onCreateService,
  date,
  initial = null,
}: Props) {
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [barberId, setBarberId] = useState(barbers[0]?.id ?? 1);
  const [startTime, setStartTime] = useState(TIMES[0]);
  const [serviceId, setServiceId] = useState(services[0]?.id ?? -1);
  const [duration, setDuration] = useState(30);
  const [price, setPrice] = useState(0);
  const [notes, setNotes] = useState("");
  const [creatingService, setCreatingService] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceDuration, setNewServiceDuration] = useState(30);
  const [newServicePrice, setNewServicePrice] = useState(0);

  React.useEffect(() => {
    const s = services.find((s) => s.id === serviceId);
    if (s) {
      setDuration(s.duration);
      setPrice(s.price);
    }
  }, [serviceId]);

  React.useEffect(() => {
    if (initial) {
      setClientName(initial.clientName);
      setPhone(initial.phone ?? "");
      setBarberId(initial.barberId);
      setStartTime(initial.startTime);
      setDuration(initial.duration);
      setPrice(initial.price);
      setNotes(initial.notes ?? "");
    }
  }, [initial]);

  if (!visible) return null;

  function handleSave() {
    const id = initial?.id ?? String(Math.floor(Math.random() * 1000000));
    const serviceName = creatingService
      ? newServiceName
      : (services.find((s) => s.id === serviceId)?.name ?? "");
    const appt: Appointment = {
      id: String(id),
      barberId: Number(barberId),
      clientName,
      phone,
      serviceName,
      startTime,
      duration: Number(duration),
      price: Number(price),
      notes,
      date,
    };

    if (creatingService) {
      const sid = Math.floor(Math.random() * 1000000);
      const s = {
        id: sid,
        name: newServiceName,
        duration: Number(newServiceDuration),
        price: Number(newServicePrice),
      };
      onCreateService(s);
      appt.serviceName = s.name;
      appt.duration = s.duration;
      appt.price = s.price;
    }

    onSave(appt);
    onClose();
  }

  function handleDelete() {
    if (!initial) return;
    if (confirm("Excluir este agendamento?")) {
      onDelete?.(String(initial.id));
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-slate-100 mb-6">
          {initial ? "Editar Agendamento" : "Novo Agendamento"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Client Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Cliente</label>
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition"
              placeholder="Nome do cliente"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Telefone</label>
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition"
              placeholder="(11) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Barber */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Barbeiro</label>
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition"
              value={barberId}
              onChange={(e) => setBarberId(Number(e.target.value))}
            >
              {barbers.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Data</label>
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition"
              value={date}
              readOnly
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Hora</label>
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            >
              {TIMES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Service Selector / Create Service Toggle */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Serviço</label>
            <div className="flex gap-2">
              <select
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition"
                value={serviceId}
                onChange={(e) => setServiceId(Number(e.target.value))}
                disabled={creatingService}
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <button
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  creatingService
                    ? "bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30"
                    : "bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30"
                }`}
                onClick={() => setCreatingService((v) => !v)}
              >
                {creatingService ? "Cancelar" : "Criar"}
              </button>
            </div>
          </div>
        </div>

        {/* Create Service Form */}
        {creatingService && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Nome do Serviço</label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition"
                placeholder="Ex: Corte + Barba"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Duração (min)</label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition"
                type="number"
                placeholder="30"
                value={newServiceDuration}
                onChange={(e) => setNewServiceDuration(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Valor (R$)</label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition"
                type="number"
                placeholder="0.00"
                value={newServicePrice}
                onChange={(e) => setNewServicePrice(Number(e.target.value))}
              />
            </div>
          </div>
        )}

        {/* Duration and Price (if not creating service) */}
        {!creatingService && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Duração (min)</label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition"
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Valor (R$)</label>
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">Observações</label>
          <textarea
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition resize-none"
            placeholder="Observações do cliente..."
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          {initial && (
            <button
              onClick={handleDelete}
              className="px-6 py-3 rounded-lg font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition"
            >
              Excluir
            </button>
          )}
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition"
          >
            {initial ? "Atualizar" : "Salvar Agendamento"}
          </button>
        </div>
      </div>
    </div>
  );
}
