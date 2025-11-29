import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, PenTool, Settings, Activity } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: '热点看板' },
    { to: '/analysis/1', icon: LineChart, label: '详情分析' }, // Default to first item for demo
    { to: '/workbench', icon: PenTool, label: '作业台' },
    { to: '/config', icon: Settings, label: '配置中心' },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0 flex flex-col z-50">
      <div className="h-16 flex items-center justify-center border-b border-slate-100">
        <div className="flex items-center gap-2 text-brand font-bold text-xl">
          <Activity className="w-6 h-6" />
          <span>指数热点捕捉</span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                isActive
                  ? 'bg-brand text-white shadow-md shadow-brand/20'
                  : 'text-slate-600 hover:bg-brand-light hover:text-brand'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-brand-light rounded-lg p-4">
          <p className="text-xs text-brand-dark font-semibold mb-1">系统状态</p>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            实时监控中
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;