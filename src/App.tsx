import React from "react";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import Agenda from "./pages/Agenda/Agenda";

export default function App() {
  const handleNewAppointment = () => {
    // Trigger new appointment modal in Agenda
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <TopHeader
        onNew={handleNewAppointment}
        dateDisplay={new Date().toLocaleDateString("pt-BR")}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-8">
            <Agenda />
          </div>
        </main>
      </div>
    </div>
  );
}
