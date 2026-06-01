import React, { useEffect, useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Edit2,
  Menu,
  Phone,
  Plus,
  Power,
  Scissors,
  Trash2,
  User,
  Users,
  X,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  phone: string;
  notes: string;
}

interface Barber {
  id: string;
  name: string;
  phone: string;
  active: boolean;
}

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface Appointment {
  id: string;
  clientId: string;
  barberId: string;
  serviceId: string;
  date: string;
  time: string;
  notes: string;
}

type ModalType = "appointment" | "client" | "barber" | "service";

const rowHeight = 36;
const hourMarks = Array.from({ length: 13 }, (_, index) => index + 8);
const minuteMarks = [0, 10, 20, 30, 40, 50];
const panelClass = "rounded-[24px] border border-[#E5EAF0] bg-white";
const inputClass =
  "w-full rounded-2xl border border-[#E5EAF0] bg-white px-3 py-2.5 text-sm text-[#0F172A] outline-none transition focus:border-[#BFDBFE] focus:ring-4 focus:ring-[#DBEAFE]";
const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-2xl bg-[#111827] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1F2937]";
const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-2xl border border-[#E5EAF0] bg-white px-3 py-2.5 text-sm font-medium text-[#0F172A] transition hover:border-[#CBD5E1] hover:bg-[#F8FAFC]";

const initialClients: Client[] = [
  {
    id: "1",
    name: "Carlos Silva",
    phone: "(11) 98765-4321",
    notes: "Prefere corte na tesoura",
  },
  { id: "2", name: "Andre Souza", phone: "(11) 91234-5678", notes: "" },
  {
    id: "3",
    name: "Rafael Lima",
    phone: "(11) 99876-5432",
    notes: "Cliente VIP",
  },
];

const initialBarbers: Barber[] = [
  { id: "1", name: "Joao Santos", phone: "(11) 94567-8901", active: true },
  { id: "2", name: "Carlos Oliveira", phone: "(11) 95678-9012", active: true },
  { id: "3", name: "Pedro Costa", phone: "(11) 96789-0123", active: true },
];

const initialServices: Service[] = [
  { id: "1", name: "Corte", duration: 30, price: 35 },
  { id: "2", name: "Barba", duration: 30, price: 25 },
  { id: "3", name: "Corte + Barba", duration: 60, price: 55 },
  { id: "4", name: "Pezinho", duration: 20, price: 20 },
];

const initialAppointments: Appointment[] = [
  {
    id: "1",
    clientId: "1",
    barberId: "1",
    serviceId: "3",
    date: "2026-06-01",
    time: "09:00",
    notes: "",
  },
  {
    id: "2",
    clientId: "2",
    barberId: "2",
    serviceId: "1",
    date: "2026-06-01",
    time: "10:30",
    notes: "",
  },
];

const navigationItems = [
  { id: "appointments", label: "Agenda", icon: Calendar },
  { id: "clients", label: "Clientes", icon: Users },
  { id: "barbers", label: "Barbeiros", icon: User },
  { id: "services", label: "Servicos", icon: Scissors },
] as const;

const scheduleSlots = hourMarks.flatMap((hour) =>
  minuteMarks.map((minute) => ({
    hour,
    minute,
    time: `${padNumber(hour)}:${padNumber(minute)}`,
  })),
);

function padNumber(value: number) {
  return value.toString().padStart(2, "0");
}

function toDateInputValue(date: Date) {
  return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
}

function fromDateInputValue(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function capitalizeLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}

function getEndTime(time: string, duration: number) {
  const [hour, minute] = time.split(":").map(Number);
  const end = new Date(2000, 0, 1, hour, minute);
  end.setMinutes(end.getMinutes() + duration);
  return `${padNumber(end.getHours())}:${padNumber(end.getMinutes())}`;
}

function getScheduleStripe(color: string) {
  return `repeating-linear-gradient(to bottom, transparent 0px, transparent ${rowHeight - 1}px, ${color} ${rowHeight - 1}px, ${color} ${rowHeight}px)`;
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "appointments" | "clients" | "barbers" | "services"
  >("appointments");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("appointment");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);

  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem("clients");
    return saved ? JSON.parse(saved) : initialClients;
  });
  const [barbers, setBarbers] = useState<Barber[]>(() => {
    const saved = localStorage.getItem("barbers");
    return saved ? JSON.parse(saved) : initialBarbers;
  });
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem("services");
    return saved ? JSON.parse(saved) : initialServices;
  });
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem("barbers", JSON.stringify(barbers));
  }, [barbers]);

  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const activeBarbers = barbers.filter((barber) => barber.active);
  const currentDateKey = toDateInputValue(currentDate);
  const todaysAppointments = appointments
    .filter((appointment) => appointment.date === currentDateKey)
    .sort((first, second) => first.time.localeCompare(second.time));
  const scheduleGridTemplate =
    activeBarbers.length > 0
      ? `92px repeat(${activeBarbers.length}, minmax(248px, 1fr))`
      : "92px";
  const scheduleHeight = `${scheduleSlots.length * rowHeight}px`;
  const todayKey = toDateInputValue(new Date());

  const formatDate = (date: Date) =>
    capitalizeLabel(
      date.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );

  const changeDate = (days: number) => {
    setCurrentDate((previousDate) => {
      const nextDate = new Date(previousDate);
      nextDate.setDate(previousDate.getDate() + days);
      return nextDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const openCreateModal = (type: ModalType) => {
    setModalType(type);
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditModal = (
    type: ModalType,
    item: Appointment | Client | Barber | Service,
  ) => {
    setModalType(type);
    setEditingItem(item);
    setModalOpen(true);
  };

  const getClientName = (clientId: string) =>
    clients.find((client) => client.id === clientId)?.name ??
    "Cliente nao encontrado";

  const getService = (serviceId: string) =>
    services.find((service) => service.id === serviceId);

  const getBarberAppointments = (barberId: string) =>
    todaysAppointments.filter(
      (appointment) => appointment.barberId === barberId,
    );

  const deleteAppointment = (id: string) => {
    if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
      setAppointments((currentAppointments) =>
        currentAppointments.filter((appointment) => appointment.id !== id),
      );
      if (selectedAppointmentId === id) {
        setSelectedAppointmentId(null);
      }
    }
  };

  const deleteClient = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      setClients((currentClients) =>
        currentClients.filter((client) => client.id !== id),
      );
    }
  };

  const deleteService = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este servico?")) {
      setServices((currentServices) =>
        currentServices.filter((service) => service.id !== id),
      );
    }
  };

  const renderPageHeader = (
    title: string,
    subtitle: string,
    actionLabel: string,
    actionType: ModalType,
  ) => (
    <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">
          BarberDesk
        </p>
        <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#0F172A]">
          {title}
        </h2>
        <p className="mt-1 text-sm text-[#64748B]">{subtitle}</p>
      </div>
      <button
        type="button"
        onClick={() => openCreateModal(actionType)}
        className={primaryButtonClass}
      >
        <Plus className="h-4 w-4" />
        {actionLabel}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#0F172A]">
      <div className="min-h-screen lg:flex">
        <aside
          className={`border-b border-[#E5EAF0] bg-[#F7F9FB]/90 backdrop-blur lg:border-b-0 lg:border-r ${sidebarOpen ? "lg:w-64" : "lg:w-24"}`}
        >
          <div className="flex items-center justify-between px-4 py-4 lg:px-5 lg:py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E5EAF0] bg-white">
                <Scissors className="h-4 w-4 text-[#111827]" />
              </div>
              {sidebarOpen && (
                <div className="hidden lg:block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
                    SaaS
                  </p>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    BarberDesk
                  </p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen((currentValue) => !currentValue)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#E5EAF0] bg-white text-[#64748B] transition hover:border-[#CBD5E1] hover:text-[#0F172A]"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex gap-2 overflow-x-auto px-3 pb-4 lg:flex-col lg:overflow-visible lg:px-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  title={item.label}
                  onClick={() => setActiveTab(item.id)}
                  className={`group inline-flex min-w-fit items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition lg:w-full ${
                    isActive
                      ? "border border-[#E5EAF0] bg-white text-[#0F172A]"
                      : "text-[#64748B] hover:bg-white/70 hover:text-[#0F172A]"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition ${
                      isActive
                        ? "border-[#E5EAF0] bg-[#F8FAFC] text-[#0F172A]"
                        : "border-transparent bg-transparent text-[#64748B] group-hover:border-[#E5EAF0] group-hover:bg-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  {sidebarOpen && (
                    <span className="hidden lg:block">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          {activeTab === "appointments" && (
            <section className="flex h-full flex-col">
              <header className="border-b border-[#E5EAF0] bg-[#F7F9FB]/80 px-4 py-4 backdrop-blur md:px-6 md:py-5">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                  <div className="space-y-3">
                    <div className="inline-flex items-center rounded-full border border-[#E5EAF0] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#64748B]">
                      Agenda operacional
                    </div>
                    <div>
                      <h1 className="text-[30px] font-semibold tracking-[-0.05em] text-[#0F172A]">
                        Agenda diaria
                      </h1>
                      <p className="mt-1 text-sm text-[#64748B]">
                        {formatDate(currentDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
                    <div className="flex items-center gap-2 rounded-[20px] border border-[#E5EAF0] bg-white p-1.5">
                      <button
                        type="button"
                        onClick={() => changeDate(-1)}
                        className="flex h-10 w-10 items-center justify-center rounded-2xl text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={goToToday}
                        className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                          currentDateKey === todayKey
                            ? "bg-[#EFF6FF] text-[#2563EB]"
                            : "text-[#0F172A] hover:bg-[#F8FAFC]"
                        }`}
                      >
                        Hoje
                      </button>
                      <input
                        type="date"
                        value={currentDateKey}
                        onChange={(event) =>
                          setCurrentDate(fromDateInputValue(event.target.value))
                        }
                        className="rounded-2xl border border-[#E5EAF0] px-3 py-2 text-sm text-[#0F172A] outline-none transition focus:border-[#BFDBFE] focus:ring-4 focus:ring-[#DBEAFE]"
                      />
                      <button
                        type="button"
                        onClick={() => changeDate(1)}
                        className="flex h-10 w-10 items-center justify-center rounded-2xl text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => openCreateModal("appointment")}
                      className={primaryButtonClass}
                    >
                      <Plus className="h-4 w-4" />
                      Novo Agendamento
                    </button>
                  </div>
                </div>
              </header>

              <div className="flex-1 px-4 py-4 md:px-6 md:py-6">
                <section className={`${panelClass} overflow-hidden`}>
                  <div className="border-b border-[#E5EAF0] px-4 py-3 md:px-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">
                          Grade do dia
                        </p>
                        <p className="mt-1 text-sm text-[#64748B]">
                          Os horarios ocupados aparecem acima da grade para
                          leitura imediata.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#64748B]">
                        <span className="rounded-full border border-[#E5EAF0] bg-[#F8FAFC] px-3 py-1.5">
                          {activeBarbers.length} barbeiros ativos
                        </span>
                        <span className="rounded-full border border-[#E5EAF0] bg-[#F8FAFC] px-3 py-1.5">
                          {todaysAppointments.length} horarios ocupados
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-auto">
                    <div className="min-w-[1100px]">
                      <div
                        className="grid border-b border-[#E5EAF0] bg-[#FAFBFC]"
                        style={{ gridTemplateColumns: scheduleGridTemplate }}
                      >
                        <div className="border-r border-[#E5EAF0] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
                          Horario
                        </div>
                        {activeBarbers.map((barber) => (
                          <div
                            key={barber.id}
                            className="border-r border-[#E5EAF0] px-5 py-4 last:border-r-0"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#E5EAF0] bg-white text-sm font-semibold text-[#0F172A]">
                                {getInitials(barber.name)}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-[#0F172A]">
                                  {barber.name}
                                </p>
                                <p className="text-xs text-[#64748B]">
                                  Recepcao ativa
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {activeBarbers.length === 0 ? (
                        <div className="flex min-h-[420px] items-center justify-center px-6 py-16 text-center">
                          <div className="max-w-md">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[20px] border border-[#E5EAF0] bg-[#F8FAFC]">
                              <Calendar className="h-5 w-5 text-[#64748B]" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-[#0F172A]">
                              Nenhum barbeiro ativo
                            </h3>
                            <p className="mt-2 text-sm text-[#64748B]">
                              Ative um barbeiro para visualizar a agenda em
                              colunas.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="grid"
                          style={{ gridTemplateColumns: scheduleGridTemplate }}
                        >
                          <div className="border-r border-[#E5EAF0] bg-white">
                            {scheduleSlots.map((slot) => (
                              <div
                                key={`time-${slot.time}`}
                                className="border-b border-[#EDF2F7] px-4"
                                style={{ height: `${rowHeight}px` }}
                              >
                                <div className="flex h-full items-start pt-2">
                                  {slot.minute === 0 ? (
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#94A3B8]">
                                      {slot.time}
                                    </span>
                                  ) : (
                                    <span className="text-[11px] text-[#CBD5E1]">
                                      ·
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {activeBarbers.map((barber) => {
                            const barberAppointments = getBarberAppointments(
                              barber.id,
                            );
                            return (
                              <div
                                key={barber.id}
                                className="relative border-r border-[#E5EAF0] bg-white last:border-r-0"
                                style={{ height: scheduleHeight }}
                                onClick={() => setSelectedAppointmentId(null)}
                              >
                                <div
                                  className="pointer-events-none absolute inset-0"
                                  style={{
                                    backgroundImage:
                                      getScheduleStripe("#EDF2F7"),
                                  }}
                                />

                                {barberAppointments.map((appointment) => {
                                  const service = getService(
                                    appointment.serviceId,
                                  );
                                  const duration = service?.duration ?? 30;
                                  const slotIndex = scheduleSlots.findIndex(
                                    (slot) => slot.time === appointment.time,
                                  );

                                  if (slotIndex < 0) {
                                    return null;
                                  }

                                  const isSelected =
                                    selectedAppointmentId === appointment.id;
                                  const top = slotIndex * rowHeight + 2;
                                  const height = Math.max(
                                    (duration / 10) * rowHeight - 4,
                                    rowHeight * 1.8,
                                  );
                                  const endTime = getEndTime(
                                    appointment.time,
                                    duration,
                                  );
                                  const eventBackground = isSelected
                                    ? `repeating-linear-gradient(to bottom, #111827 0px, #111827 ${rowHeight - 1}px, rgba(255,255,255,0.08) ${rowHeight - 1}px, rgba(255,255,255,0.08) ${rowHeight}px)`
                                    : `repeating-linear-gradient(to bottom, #FFFFFF 0px, #FFFFFF ${rowHeight - 1}px, #EDF2F7 ${rowHeight - 1}px, #EDF2F7 ${rowHeight}px)`;

                                  return (
                                    <div
                                      key={appointment.id}
                                      role="button"
                                      tabIndex={0}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        setSelectedAppointmentId((currentId) =>
                                          currentId === appointment.id
                                            ? null
                                            : appointment.id,
                                        );
                                      }}
                                      onDoubleClick={(event) => {
                                        event.stopPropagation();
                                        openEditModal(
                                          "appointment",
                                          appointment,
                                        );
                                      }}
                                      onKeyDown={(event) => {
                                        if (
                                          event.key === "Enter" ||
                                          event.key === " "
                                        ) {
                                          event.preventDefault();
                                          setSelectedAppointmentId(
                                            (currentId) =>
                                              currentId === appointment.id
                                                ? null
                                                : appointment.id,
                                          );
                                        }
                                      }}
                                      className={`absolute left-[8px] right-[8px] z-10 overflow-hidden rounded-[8px] border px-3 py-2 text-left transition ${
                                        isSelected
                                          ? "border-[#111827] text-white"
                                          : "border-[#CBD5E1] text-[#0F172A]"
                                      }`}
                                      style={{
                                        top: `${top}px`,
                                        height: `${height}px`,
                                        backgroundImage: eventBackground,
                                        backgroundPositionY: `-${top}px`,
                                      }}
                                    >
                                      <div
                                        className={`absolute bottom-0 left-0 top-0 w-[3px] ${
                                          isSelected
                                            ? "bg-white/20"
                                            : "bg-[#2563EB]"
                                        }`}
                                      />

                                      <div className="relative pl-2">
                                        <div className="flex items-start justify-between gap-3">
                                          <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold leading-5">
                                              {getClientName(
                                                appointment.clientId,
                                              )}
                                            </p>
                                            <p
                                              className={`mt-0.5 truncate text-xs ${
                                                isSelected
                                                  ? "text-slate-300"
                                                  : "text-[#64748B]"
                                              }`}
                                            >
                                              {service?.name ?? "Servico"} •{" "}
                                              {duration} min
                                            </p>
                                          </div>

                                          {isSelected && (
                                            <div className="flex items-center gap-1">
                                              <button
                                                type="button"
                                                onClick={(event) => {
                                                  event.stopPropagation();
                                                  openEditModal(
                                                    "appointment",
                                                    appointment,
                                                  );
                                                }}
                                                className="flex h-7 w-7 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/10 hover:text-white"
                                              >
                                                <Edit2 className="h-3.5 w-3.5" />
                                              </button>
                                              <button
                                                type="button"
                                                onClick={(event) => {
                                                  event.stopPropagation();
                                                  deleteAppointment(
                                                    appointment.id,
                                                  );
                                                }}
                                                className="flex h-7 w-7 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/10 hover:text-white"
                                              >
                                                <Trash2 className="h-3.5 w-3.5" />
                                              </button>
                                            </div>
                                          )}
                                        </div>

                                        <div
                                          className={`mt-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                                            isSelected
                                              ? "text-slate-400"
                                              : "text-[#94A3B8]"
                                          }`}
                                        >
                                          <span>{appointment.time}</span>
                                          <span>•</span>
                                          <span>{endTime}</span>
                                        </div>

                                        {appointment.notes && (
                                          <p
                                            className={`mt-2 line-clamp-2 text-xs leading-5 ${
                                              isSelected
                                                ? "text-slate-300"
                                                : "text-[#64748B]"
                                            }`}
                                          >
                                            {appointment.notes}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </section>
          )}

          {activeTab === "clients" && (
            <section className="px-4 py-5 md:px-6 md:py-6">
              {renderPageHeader(
                "Clientes",
                "Cadastro enxuto para localizar historico e atendimento com rapidez.",
                "Novo Cliente",
                "client",
              )}

              <div className={`${panelClass} p-4 md:p-6`}>
                <div className="space-y-3">
                  {clients.map((client) => (
                    <div
                      key={client.id}
                      className="flex flex-col gap-4 rounded-[20px] border border-[#E5EAF0] bg-white px-4 py-4 transition hover:border-[#CBD5E1] sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#0F172A]">
                          {client.name}
                        </p>
                        <div className="mt-1 flex items-center gap-2 text-sm text-[#64748B]">
                          <Phone className="h-3.5 w-3.5" />
                          {client.phone}
                        </div>
                        {client.notes && (
                          <p className="mt-2 text-sm text-[#64748B]">
                            {client.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal("client", client)}
                          className={secondaryButtonClass}
                        >
                          <Edit2 className="h-4 w-4" />
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteClient(client.id)}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#FECACA] bg-[#FEF2F2] text-[#DC2626] transition hover:bg-[#FEE2E2]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === "barbers" && (
            <section className="px-4 py-5 md:px-6 md:py-6">
              {renderPageHeader(
                "Barbeiros",
                "Equipe e disponibilidade em uma visao limpa para operacao diaria.",
                "Novo Barbeiro",
                "barber",
              )}

              <div className={`${panelClass} p-4 md:p-6`}>
                <div className="space-y-3">
                  {barbers.map((barber) => (
                    <div
                      key={barber.id}
                      className="flex flex-col gap-4 rounded-[20px] border border-[#E5EAF0] bg-white px-4 py-4 transition hover:border-[#CBD5E1] sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-[#0F172A]">
                            {barber.name}
                          </p>
                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                              barber.active
                                ? "bg-[#EFF6FF] text-[#2563EB]"
                                : "bg-[#F8FAFC] text-[#64748B]"
                            }`}
                          >
                            {barber.active ? "Ativo" : "Inativo"}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-sm text-[#64748B]">
                          <Phone className="h-3.5 w-3.5" />
                          {barber.phone}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal("barber", barber)}
                          className={secondaryButtonClass}
                        >
                          <Edit2 className="h-4 w-4" />
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setBarbers((currentBarbers) =>
                              currentBarbers.map((currentBarber) =>
                                currentBarber.id === barber.id
                                  ? {
                                      ...currentBarber,
                                      active: !currentBarber.active,
                                    }
                                  : currentBarber,
                              ),
                            )
                          }
                          className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-sm font-medium transition ${
                            barber.active
                              ? "border-[#E5EAF0] bg-white text-[#0F172A] hover:border-[#CBD5E1]"
                              : "border-[#DBEAFE] bg-[#EFF6FF] text-[#2563EB] hover:bg-[#DBEAFE]"
                          }`}
                        >
                          <Power className="h-4 w-4" />
                          {barber.active ? "Desativar" : "Ativar"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === "services" && (
            <section className="px-4 py-5 md:px-6 md:py-6">
              {renderPageHeader(
                "Servicos",
                "Catalogo simples para manter duracao e preco consistentes.",
                "Novo Servico",
                "service",
              )}

              <div className={`${panelClass} p-4 md:p-6`}>
                <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="rounded-[20px] border border-[#E5EAF0] bg-white p-5 transition hover:border-[#CBD5E1]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-semibold text-[#0F172A]">
                            {service.name}
                          </h3>
                          <p className="mt-1 text-sm text-[#64748B]">
                            Servico operacional
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteService(service.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#FECACA] bg-[#FEF2F2] text-[#DC2626] transition hover:bg-[#FEE2E2]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-5 space-y-3 text-sm text-[#64748B]">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {service.duration} minutos
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          {formatCurrency(service.price)}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => openEditModal("service", service)}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#2563EB] transition hover:text-[#1D4ED8]"
                      >
                        <Edit2 className="h-4 w-4" />
                        Editar servico
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/30 px-4 py-6 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center">
            <div className="w-full max-w-xl overflow-hidden rounded-[28px] border border-[#E5EAF0] bg-white">
              <div className="flex items-center justify-between border-b border-[#E5EAF0] px-6 py-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">
                    BarberDesk
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#0F172A]">
                    {modalType === "appointment" &&
                      (editingItem ? "Editar Agendamento" : "Novo Agendamento")}
                    {modalType === "client" &&
                      (editingItem ? "Editar Cliente" : "Novo Cliente")}
                    {modalType === "barber" &&
                      (editingItem ? "Editar Barbeiro" : "Novo Barbeiro")}
                    {modalType === "service" &&
                      (editingItem ? "Editar Servico" : "Novo Servico")}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E5EAF0] bg-white text-[#64748B] transition hover:border-[#CBD5E1] hover:text-[#0F172A]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[80vh] overflow-y-auto px-6 py-6">
                {modalType === "appointment" && (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      const formData = new FormData(
                        event.target as HTMLFormElement,
                      );
                      const newAppointment: Appointment = {
                        id: editingItem?.id ?? Date.now().toString(),
                        clientId: String(formData.get("clientId") ?? ""),
                        barberId: String(formData.get("barberId") ?? ""),
                        serviceId: String(formData.get("serviceId") ?? ""),
                        date: String(formData.get("date") ?? ""),
                        time: String(formData.get("time") ?? ""),
                        notes: String(formData.get("notes") ?? ""),
                      };

                      if (editingItem) {
                        setAppointments((currentAppointments) =>
                          currentAppointments.map((appointment) =>
                            appointment.id === editingItem.id
                              ? newAppointment
                              : appointment,
                          ),
                        );
                      } else {
                        setAppointments((currentAppointments) => [
                          ...currentAppointments,
                          newAppointment,
                        ]);
                      }

                      setSelectedAppointmentId(newAppointment.id);
                      closeModal();
                    }}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                          Cliente
                        </label>
                        <select
                          name="clientId"
                          required
                          defaultValue={editingItem?.clientId ?? ""}
                          className={inputClass}
                        >
                          <option value="">Selecione...</option>
                          {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                              {client.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                          Barbeiro
                        </label>
                        <select
                          name="barberId"
                          required
                          defaultValue={editingItem?.barberId ?? ""}
                          className={inputClass}
                        >
                          <option value="">Selecione...</option>
                          {activeBarbers.map((barber) => (
                            <option key={barber.id} value={barber.id}>
                              {barber.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                        Servico
                      </label>
                      <select
                        name="serviceId"
                        required
                        defaultValue={editingItem?.serviceId ?? ""}
                        className={inputClass}
                      >
                        <option value="">Selecione...</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name} - {service.duration} min -{" "}
                            {formatCurrency(service.price)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                          Data
                        </label>
                        <input
                          type="date"
                          name="date"
                          required
                          defaultValue={editingItem?.date ?? currentDateKey}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                          Horario
                        </label>
                        <input
                          type="time"
                          name="time"
                          required
                          defaultValue={editingItem?.time ?? ""}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                        Observacoes
                      </label>
                      <textarea
                        name="notes"
                        rows={4}
                        defaultValue={editingItem?.notes ?? ""}
                        className={inputClass}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`w-full ${primaryButtonClass}`}
                    >
                      {editingItem ? "Salvar alteracoes" : "Criar agendamento"}
                    </button>
                  </form>
                )}

                {modalType === "client" && (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      const formData = new FormData(
                        event.target as HTMLFormElement,
                      );
                      const newClient: Client = {
                        id: editingItem?.id ?? Date.now().toString(),
                        name: String(formData.get("name") ?? ""),
                        phone: String(formData.get("phone") ?? ""),
                        notes: String(formData.get("notes") ?? ""),
                      };

                      if (editingItem) {
                        setClients((currentClients) =>
                          currentClients.map((client) =>
                            client.id === editingItem.id ? newClient : client,
                          ),
                        );
                      } else {
                        setClients((currentClients) => [
                          ...currentClients,
                          newClient,
                        ]);
                      }

                      closeModal();
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                        Nome
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        defaultValue={editingItem?.name ?? ""}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        defaultValue={editingItem?.phone ?? ""}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                        Observacoes
                      </label>
                      <textarea
                        name="notes"
                        rows={4}
                        defaultValue={editingItem?.notes ?? ""}
                        className={inputClass}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`w-full ${primaryButtonClass}`}
                    >
                      {editingItem ? "Salvar alteracoes" : "Criar cliente"}
                    </button>
                  </form>
                )}

                {modalType === "barber" && (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      const formData = new FormData(
                        event.target as HTMLFormElement,
                      );
                      const newBarber: Barber = {
                        id: editingItem?.id ?? Date.now().toString(),
                        name: String(formData.get("name") ?? ""),
                        phone: String(formData.get("phone") ?? ""),
                        active:
                          editingItem?.active !== undefined
                            ? editingItem.active
                            : true,
                      };

                      if (editingItem) {
                        setBarbers((currentBarbers) =>
                          currentBarbers.map((barber) =>
                            barber.id === editingItem.id ? newBarber : barber,
                          ),
                        );
                      } else {
                        setBarbers((currentBarbers) => [
                          ...currentBarbers,
                          newBarber,
                        ]);
                      }

                      closeModal();
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                        Nome
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        defaultValue={editingItem?.name ?? ""}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        defaultValue={editingItem?.phone ?? ""}
                        className={inputClass}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`w-full ${primaryButtonClass}`}
                    >
                      {editingItem ? "Salvar alteracoes" : "Criar barbeiro"}
                    </button>
                  </form>
                )}

                {modalType === "service" && (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      const formData = new FormData(
                        event.target as HTMLFormElement,
                      );
                      const newService: Service = {
                        id: editingItem?.id ?? Date.now().toString(),
                        name: String(formData.get("name") ?? ""),
                        duration: parseInt(
                          String(formData.get("duration") ?? "0"),
                          10,
                        ),
                        price: parseFloat(String(formData.get("price") ?? "0")),
                      };

                      if (editingItem) {
                        setServices((currentServices) =>
                          currentServices.map((service) =>
                            service.id === editingItem.id
                              ? newService
                              : service,
                          ),
                        );
                      } else {
                        setServices((currentServices) => [
                          ...currentServices,
                          newService,
                        ]);
                      }

                      closeModal();
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                        Nome do servico
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        defaultValue={editingItem?.name ?? ""}
                        className={inputClass}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                          Duracao (min)
                        </label>
                        <input
                          type="number"
                          name="duration"
                          required
                          defaultValue={editingItem?.duration ?? ""}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                          Preco (R$)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          name="price"
                          required
                          defaultValue={editingItem?.price ?? ""}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={`w-full ${primaryButtonClass}`}
                    >
                      {editingItem ? "Salvar alteracoes" : "Criar servico"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
