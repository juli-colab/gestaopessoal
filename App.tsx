
import React, { useState } from 'react';
import Header from './components/Header';
import FinancialDashboard from './components/FinancialDashboard';
import TaskManager from './components/TaskManager';

type View = 'finance' | 'tasks';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('finance');

  return (
    <div className="min-h-screen bg-primary font-sans">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {activeView === 'finance' && <FinancialDashboard />}
        {activeView === 'tasks' && <TaskManager />}
      </main>
    </div>
  );
};

export default App;
