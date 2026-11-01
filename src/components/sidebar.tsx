import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    name: "My Applications",
    icon: BriefcaseBusiness,
    active: false,
  },
  {
    name: "Companies",
    icon: Building2,
    active: false,
  },
  {
    name: "Interviews",
    icon: CalendarDays,
    active: false,
  },
  {
    name: "Analytics",
    icon: BarChart3,
    active: false,
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col">
      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Career<span className="text-blue-600">Path</span>
          </h1>
          <p className="text-xs text-slate-500">Career management</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                item.active
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={19} />
              {item.name}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
          <Settings size={19} />
          Settings
        </button>
      </div>
    </aside>
  );
}
