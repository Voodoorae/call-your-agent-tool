import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { AI_AGENT_MONTHLY_COST } from '../constants';

interface ComparisonChartProps {
  annualCostOfManualWork: number;
}

export default function ComparisonChart({ annualCostOfManualWork }: ComparisonChartProps) {
  const annualCostOfAI = AI_AGENT_MONTHLY_COST * 12;
  const savings = annualCostOfManualWork - annualCostOfAI;
  const roi = (savings / annualCostOfAI * 100).toFixed(0);

  const data = [
    {
      name: 'Annual Cost',
      'Manual Work': annualCostOfManualWork,
      'AI Agents': annualCostOfAI
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm mb-8"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Cost Comparison</h3>
        <p className="text-slate-400">Annual cost: Manual labor vs. AI Agents</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
          <p className="text-slate-400 text-sm mb-1">Manual Work Cost</p>
          <p className="text-2xl font-bold text-red-400">${annualCostOfManualWork.toLocaleString()}</p>
        </div>
        <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
          <p className="text-slate-400 text-sm mb-1">AI Agents Cost</p>
          <p className="text-2xl font-bold text-green-400">${annualCostOfAI.toLocaleString()}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#e2e8f0'
            }}
            formatter={(value) => `$${(value as number).toLocaleString()}`}
          />
          <Legend />
          <Bar dataKey="Manual Work" fill="#ef4444" radius={[8, 8, 0, 0]} />
          <Bar dataKey="AI Agents" fill="#22c55e" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm text-center">
        <p className="text-slate-400 text-sm mb-1">Your Annual Savings</p>
        <p className="text-3xl font-bold text-blue-400">${savings.toLocaleString()}</p>
        <p className="text-slate-400 text-sm mt-2">{roi}% ROI on AI Investment</p>
      </div>
    </motion.div>
  );
}
