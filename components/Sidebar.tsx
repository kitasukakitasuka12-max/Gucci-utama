import React from 'react';
import { LayoutList, User, ShoppingBag } from 'lucide-react';
import { Task } from '../types';

interface SidebarProps {
  tasks: Task[];
  activeTaskId: number;
  onTaskClick: (id: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ tasks, activeTaskId, onTaskClick }) => {
  return (
    <div className="w-24 md:w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col h-full shrink-0">
      <div className="p-6 flex items-center justify-center md:justify-start gap-3 border-b border-slate-800">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-white/10">
          <ShoppingBag size={20} className="text-black" />
        </div>
        <span className="hidden md:block text-white font-bold tracking-wider">GUCCI</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 space-y-2 px-2 md:px-4">
        {tasks.map((task) => {
          const isActive = task.id === activeTaskId;
          const isLocked = task.locked;

          return (
            <button
              key={task.id}
              onClick={() => !isLocked && onTaskClick(task.id)}
              disabled={isLocked}
              className={`
                w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : isLocked 
                    ? 'bg-transparent text-slate-600 cursor-not-allowed' 
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white'}
              `}
            >
              <LayoutList size={20} className={isActive ? 'text-white' : isLocked ? 'text-slate-600' : 'text-slate-400'} />
              <span className="hidden md:block font-medium">{task.label}</span>
              {task.completed && (
                <div className="ml-auto hidden md:block w-2 h-2 rounded-full bg-green-500"></div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center justify-center md:justify-start gap-3 text-slate-400 hover:text-white w-full transition-colors">
          <User size={24} />
          <span className="hidden md:block text-sm">Account</span>
        </button>
      </div>
    </div>
  );
};