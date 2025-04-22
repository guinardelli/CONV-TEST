import React from 'react';
import { UnitConverter } from './components/UnitConverter';
import './App.css';

function App() {
  return (
    <div className="App bg-gray-200 min-h-screen flex flex-col p-4">
      <div className="bg-gray-100 max-w-4xl mx-auto rounded border border-gray-400 shadow-md overflow-hidden">
        <div className="bg-gray-300 p-1 border-b border-gray-400 flex justify-between items-center">
          <div className="text-sm font-bold">Unidades 2 (Alberto Smaniotto)</div>
          <div className="flex space-x-2">
            <button className="w-6 h-6 flex items-center justify-center text-xs border border-gray-400 bg-gray-100">−</button>
            <button className="w-6 h-6 flex items-center justify-center text-xs border border-gray-400 bg-gray-100">□</button>
            <button className="w-6 h-6 flex items-center justify-center text-xs border border-gray-400 bg-gray-100">×</button>
          </div>
        </div>
        <main className="p-4">
          <UnitConverter />
        </main>
      </div>
    </div>
  );
}

export default App;