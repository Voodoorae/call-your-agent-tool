import React from 'react';
import { Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">
            AI Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">Audit</span>
          </h1>
        </div>
        <p className="text-sm text-slate-400">Stop doing robot work</p>
      </div>
    </header>
  );
}
