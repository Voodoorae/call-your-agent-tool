import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Info } from 'lucide-react';
import { auditTasks } from '../constants';
import { TaskHours } from '../types';

interface AuditFormProps {
  hourlyRate: number;
  onHourlyRateChange: (rate: number) => void;
  taskHours: TaskHours;
  onTaskHoursChange: (tasks: TaskHours) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export default function AuditForm({
  hourlyRate,
  onHourlyRateChange,
  taskHours,
  onTaskHoursChange,
  onAnalyze,
  isLoading
}: AuditFormProps) {
  const [activeTooltip, setActiveTooltip] = React.useState<string | null>(null);

  const handleHoursChange = (taskId: string, hours: string) => {
    const hoursNum = Math.max(0, parseFloat(hours) || 0);
    onTaskHoursChange({
      ...taskHours,
      [taskId]: hoursNum === 0 ? undefined : hoursNum
    });
  };

  const totalHours = Object.values(taskHours).reduce((sum, h = 0) => sum + h, 0);
  const isValid = totalHours > 0 && hourlyRate > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-6"
    >
      <div className="mb-8">
        <label className="block text-sm font-semibold text-white mb-3">
          Your Hourly Rate
        </label>
        <div className="flex gap-2">
          <span className="text-2xl font-bold text-blue-400">$</span>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => onHourlyRateChange(Math.max(1, parseFloat(e.target.value) || 0))}
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="100"
            min="1"
          />
          <span className="text-slate-400 text-2xl font-bold">/hour</span>
        </div>
        <p className="text-xs text-slate-400 mt-2">Be honest—what is an hour of your focus worth?</p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-4">How many hours per week do you spend on these?</h3>
        <div className="space-y-3">
          {auditTasks.map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur-sm hover:border-blue-500/50 transition-all"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{task.task}</span>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveTooltip(task.id)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      onClick={() => setActiveTooltip(activeTooltip === task.id ? null : task.id)}
                      className="text-blue-400 hover:text-blue-300 relative"
                    >
                      <HelpCircle className="w-4 h-4" />
                      {activeTooltip === task.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute left-0 top-6 w-72 bg-blue-900/80 backdrop-blur-sm border border-blue-500/50 rounded-lg p-3 shadow-xl z-10 text-left"
                        >
                          <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-100">{task.education}</p>
                          </div>
                        </motion.div>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-blue-400">{task.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={taskHours[task.id] || ''}
                    onChange={(e) => handleHoursChange(task.id, e.target.value)}
                    className="w-16 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-center font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                    step="0.5"
                  />
                  <span className="text-slate-400 text-sm">hrs</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-end gap-4">
        {totalHours > 0 && (
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg px-4 py-3 backdrop-blur-sm">
            <p className="text-slate-400 text-sm">Total weekly time on robot work</p>
            <p className="text-2xl font-bold text-blue-400">{totalHours.toFixed(1)} hours</p>
          </div>
        )}
        <button
          onClick={onAnalyze}
          disabled={!isValid || isLoading}
          className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${
            isValid && !isLoading
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/50 hover:scale-105'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Analyzing...' : 'See My Reality Check'}
        </button>
      </div>
    </motion.div>
  );
}
