import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Lock } from 'lucide-react';
import SuggestionCard from './SuggestionCard';
import ComparisonChart from './ComparisonChart';
import { AgentImpact } from '../types';

interface AgentImpactReportProps {
  agents: AgentImpact[];
  annualLoss: number;
  hourlyRate: number;
  totalHours: number;
  isUnlocked: boolean;
  onUnlockClick: () => void;
}

export default function AgentImpactReport({
  agents,
  annualLoss,
  hourlyRate,
  totalHours,
  isUnlocked,
  onUnlockClick
}: AgentImpactReportProps) {
  const totalAnnualSavings = agents.reduce((sum, agent) => sum + agent.annualSavings, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 bg-red-900/30 border border-red-500/30 rounded-full mb-6">
            <span className="text-red-400 text-sm font-semibold">REALITY CHECK</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
            You're paying yourself
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              ${annualLoss.toLocaleString()}
            </span>
            <br />
            <span className="text-2xl font-normal text-slate-400">to do work a robot does better</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mt-6">
            {totalHours.toFixed(1)} hours per week × {hourlyRate} per hour × 52 weeks
          </p>
        </motion.div>

        <ComparisonChart annualCostOfManualWork={annualLoss} />

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm"
          >
            <p className="text-slate-400 text-sm mb-2">Weekly Robot Work</p>
            <p className="text-3xl font-bold text-blue-400">{totalHours.toFixed(1)}</p>
            <p className="text-slate-400 text-xs mt-1">hours</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm"
          >
            <p className="text-slate-400 text-sm mb-2">Potential Annual Savings</p>
            <p className="text-3xl font-bold text-green-400">${totalAnnualSavings.toLocaleString()}</p>
            <p className="text-slate-400 text-xs mt-1">if fully automated</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm"
          >
            <p className="text-slate-400 text-sm mb-2">Avg Agent ROI</p>
            <p className="text-3xl font-bold text-purple-400">
              {(agents.reduce((sum, a) => sum + a.roiMultiplier, 0) / agents.length).toFixed(1)}x
            </p>
            <p className="text-slate-400 text-xs mt-1">multiplier</p>
          </motion.div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Your AI Team</h3>
            {!isUnlocked && (
              <button
                onClick={onUnlockClick}
                className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-500/50 rounded-lg text-blue-400 hover:bg-blue-900/50 transition-all text-sm font-semibold"
              >
                <Lock className="w-4 h-4" />
                Unlock Full Report
              </button>
            )}
          </div>

          {!isUnlocked && (
            <div className="mb-4 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-300 text-sm flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Agent details are blurred. Enter your email to unlock and download your PDF report.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {agents.map((agent, idx) => (
              <SuggestionCard
                key={agent.agent}
                agent={agent}
                isBlurred={!isUnlocked}
                index={idx}
              />
            ))}
          </div>
        </div>

        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center py-8"
          >
            <button
              onClick={onUnlockClick}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-500/50 transition-all hover:scale-105"
            >
              <TrendingUp className="w-5 h-5" />
              Unlock Full Report & Download PDF
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
