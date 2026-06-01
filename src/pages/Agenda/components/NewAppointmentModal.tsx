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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/90 border border-slate-700/50 rounded-2xl p-8 w-full max-w-2xl shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-100">
              {initial ? "Editar Agendamento" : "Novo Agendamento"}
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              {initial
                ? "Modifique os dados do agendamento"
                : "Crie um novo agendamento para a barbearia"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Row 1: Client Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Nome do Cliente"
              placeholder="Digite o nome"
              value={clientName}
              onChange={setClientName}
            />
            <FormField
              label="Telefone"
              placeholder="(11) 99999-9999"
              value={phone}
              onChange={setPhone}
            />
          </div>

          {/* Row 2: Barbeiro e Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Barbeiro"
              value={barberId}
              onChange={setBarberId}
              options={barbers.map((b) => ({ value: b.id, label: b.name }))}
            />
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Data
              </label>
              <div className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 font-medium">
                {new Date(date).toLocaleDateString("pt-BR")}
              </div>
            </div>
          </div>

          {/* Row 3: Hora */}
          <div className="grid grid-cols-1 gap-4">
            <FormSelect
              label="Horário"
              value={startTime}
              onChange={setStartTime}
              options={TIMES.map((t) => ({ value: t, label: t }))}
            />
          </div>

          {/* Row 4: Serviço */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Serviço
            </label>
            <div className="flex gap-3">
              <select
                className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition disabled:opacity-50"
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
                className={`px-4 py-3 rounded-xl font-semibold transition flex items-center gap-2 ${
                  creatingService
                    ? "bg-red-600/20 text-red-300 border border-red-500/30 hover:bg-red-600/30"
                    : "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30"
                }`}
                onClick={() => setCreatingService((v) => !v)}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
                {creatingService ? "Cancelar" : "Criar"}
              </button>
            </div>
          </div>

          {/* Create Service Form */}
          {creatingService && (
            <div className="p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-xl space-y-4">
              <h3 className="font-semibold text-indigo-300">
                Criar Novo Serviço
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  label="Nome"
                  placeholder="Ex: Corte + Barba"
                  value={newServiceName}
                  onChange={setNewServiceName}
                />
                <FormField
                  label="Duração (min)"
                  type="number"
                  placeholder="30"
                  value={newServiceDuration}
                  onChange={setNewServiceDuration}
                />
                <FormField
                  label="Valor (R$)"
                  type="number"
                  placeholder="0.00"
                  value={newServicePrice}
                  onChange={setNewServicePrice}
                />
              </div>
            </div>
          )}

          {/* Duration and Price (if not creating) */}
          {!creatingService && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Duração (min)"
                type="number"
                value={duration}
                onChange={setDuration}
              />
              <FormField
                label="Valor (R$)"
                type="number"
                value={price}
                onChange={setPrice}
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Observações
            </label>
            <textarea
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition resize-none"
              placeholder="Notas especiais sobre o agendamento..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-700/50">
          {initial && (
            <button
              onClick={handleDelete}
              className="px-6 py-3 rounded-xl font-semibold text-red-400 border border-red-500/30 hover:bg-red-600/10 transition"
            >
              Excluir
            </button>
          )}
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-lg hover:shadow-xl active:scale-95 transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            {initial ? "Atualizar" : "Criar Agendamento"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  value: any;
  onChange: (val: any) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-2">
        {label}
      </label>
      <input
        type={type}
        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange(type === "number" ? Number(e.target.value) : e.target.value)
        }
      />
    </div>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: any;
  onChange: (val: any) => void;
  options: Array<{ value: any; label: string }>;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-2">
        {label}
      </label>
      <select
        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
