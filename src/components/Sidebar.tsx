import React from "react";

// Icon components - simple, minimal SVG icons
const CalendarIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UsersIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 0l4.24-4.24M1 12h6m6 0h6m-1.78 7.78l-4.24-4.24m-5.08 0l-4.24 4.24" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M19 12H5m14 0l-7-7m7 7l-7 7" />
  </svg>
);

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900/40 border-r border-slate-700/50 h-screen sticky top-0 flex flex-col backdrop-blur-xl">
      {/* Logo Section */}
      <div className="px-6 py-8 border-b border-slate-700/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">BarberDesk</h2>
            <p className="text-xs text-slate-500">Agenda Premium</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavItem icon={<CalendarIcon />} label="Agenda" active />
        <NavItem icon={<UsersIcon />} label="Clientes" />
        <NavItem icon={<UsersIcon />} label="Barbeiros" />
        <NavItem icon={<SettingsIcon />} label="Configurações" />
      </nav>

      {/* Footer */}
      <div className="px-4 py-6 border-t border-slate-700/30 space-y-3">
        <div className="px-4 py-3 rounded-lg bg-slate-800/20 border border-slate-700/30">
          <p className="text-xs text-slate-400">Versão</p>
          <p className="text-sm font-semibold text-slate-200">1.0.0</p>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
          <LogoutIcon />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
        active
          ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
      }`}
    >
      <span className={active ? "text-indigo-400" : "text-slate-500"}>
        {icon}
      </span>
      {label}
    </button>
  );
}
