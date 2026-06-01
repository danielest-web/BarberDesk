import React from "react";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import Agenda from "./pages/Agenda/Agenda";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <TopHeader
            onNew={() => {}}
            dateDisplay={new Date().toLocaleDateString()}
          />
          <main className="p-6 bg-slate-50 min-h-[calc(100vh-64px)]">
            <div className="max-w-[1200px] mx-auto">
              <Agenda />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
