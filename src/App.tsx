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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader
          onNew={handleNewAppointment}
          dateDisplay={new Date().toLocaleDateString("pt-BR")}
        />
        <main className="flex-1 overflow-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="p-8 max-w-[1600px] mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Agenda</h1>
              <p className="text-slate-400">
                Gerencie seus agendamentos com estilo
              </p>
            </div>
            <SummaryCards />
            <div className="mt-8">
              <Agenda />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
