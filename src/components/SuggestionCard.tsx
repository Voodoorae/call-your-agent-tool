import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { AgentImpact } from '../types';
import { agentMissions, agentIcons } from '../constants';

interface SuggestionCardProps {
  agent: AgentImpact;
  isBlurred: boolean;
  index: number;
}

type IconName = keyof typeof LucideIcons;

export default function SuggestionCard({ agent, isBlurred, index }: SuggestionCardProps) {
  const iconName = agentIcons[agent.agent] as IconName;
  const IconComponent = LucideIcons[iconName];
  const mission = agentMissions[agent.agent];

  const getIconColor = (agentName: string) => {
    switch (agentName) {
      case 'The Cashflow Enforcer':
        return 'from-emerald-500 to-emerald-600';
      case 'The 24/7 Prospector':
        return 'from-blue-500 to-blue-600';
      case 'The Content Multiplier':
        return 'from-purple-500 to-purple-600';
      case 'The Calendar Gatekeeper':
        return 'from-orange-500 to-orange-600';
      case 'The Support Sentinel':
        return 'from-cyan-500 to-cyan-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-blue-500/50 transition-all ${
        isBlurred ? 'blur-sm pointer-events-none' : ''
      }`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`bg-gradient-to-br ${getIconColor(agent.agent)} p-3 rounded-lg flex-shrink-0`}>
          {IconComponent ? <IconComponent className="w-6 h-6 text-white" /> : <LucideIcons.Zap className="w-6 h-6 text-white" />}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{agent.agent}</h3>
          <p className="text-sm text-slate-400 italic">{mission}</p>
        </div>
      </div>

      <div className="bg-slate-700/50 rounded-lg p-4 mb-4 border border-slate-600">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400 text-xs mb-1">Hours Saved Per Week</p>
            <p className="text-2xl font-bold text-blue-400">{agent.hoursSavedPerWeek.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1">Annual Savings</p>
            <p className="text-2xl font-bold text-green-400">${agent.annualSavings.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-slate-400 text-xs mb-2">Tasks Automated</p>
        <div className="space-y-2">
          {agent.tasks.map((task) => (
            <div key={task.id} className="flex items-start gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-slate-200">{task.task}</p>
                <p className="text-slate-500 text-xs">{task.education}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3 text-center">
        <p className="text-slate-400 text-xs mb-1">ROI Multiplier</p>
        <p className="text-2xl font-bold text-blue-400">{agent.roiMultiplier.toFixed(1)}x</p>
      </div>
    </motion.div>
  );
}
