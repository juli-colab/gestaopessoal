
import React from 'react';
import { ChartPieIcon, CheckCircleIcon } from './icons';

type View = 'finance' | 'tasks';

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'finance', label: 'Financeiro', icon: <ChartPieIcon /> },
    { id: 'tasks', label: 'Tarefas', icon: <CheckCircleIcon /> },
  ];

  return (
    <header className="bg-secondary/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-secondary">
          <h1 className="text-xl sm:text-2xl font-bold text-accent">Zenith Hub</h1>
          <nav className="flex items-center space-x-2 sm:space-x-4 bg-primary p-1 rounded-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as View)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  activeView === item.id
                    ? 'bg-accent text-primary'
                    : 'text-text-secondary hover:bg-secondary/80 hover:text-text-primary'
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
