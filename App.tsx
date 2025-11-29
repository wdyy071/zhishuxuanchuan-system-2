import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Workbench from './pages/Workbench';
import ConfigCenter from './pages/ConfigCenter';
import ConfigDetail from './pages/ConfigDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#f8fbff] text-slate-800 flex font-sans">
        <Sidebar />
        <main className="flex-1 ml-48 p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analysis/:id" element={<Analysis />} />
              <Route path="/workbench" element={<Workbench />} />
              <Route path="/config" element={<ConfigCenter />} />
              <Route path="/config-detail" element={<ConfigDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;