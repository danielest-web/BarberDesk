import React from "react";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import SummaryCards from "./components/SummaryCards";
import Agenda from "./pages/Agenda/Agenda";

export default function App() {
  const handleNewAppointment = () => {
    // Trigger new appointment modal in Agenda
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <TopHeader onNew={handleNewAppointment} dateDisplay={new Date().toLocaleDateString("pt-BR")} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
          <div className="p-6 max-w-[1800px] mx-auto w-full space-y-6">
            {/* Page Header */}
            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-1">Agenda</h2>
              <p className="text-sm text-slate-400">Visualize e gerencie todos os agendamentos da barbearia</p>
            </div>

            {/* Summary Cards */}
            <SummaryCards />

            {/* Schedule Section */}
            <div className="mt-8">
              <Agenda />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
