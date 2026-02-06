import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import AuditForm from './components/AuditForm';
import AgentImpactReport from './components/AgentImpactReport';
import LeadCaptureModal from './components/LeadCaptureModal';
import { TaskHours, AutomationSuggestion, AgentImpact } from './types';
import { calculateRecommendations, buildAgentImpacts, calculateTotalStats } from './utils/recommendations';

const App: React.FC = () => {
  const [taskHours, setTaskHours] = useState<TaskHours>({});
  const [suggestions, setSuggestions] = useState<AutomationSuggestion[] | null>(null);
  const [agentImpact, setAgentImpact] = useState<AgentImpact[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hourlyRate, setHourlyRate] = useState(100);

  const handleAnalyze = useCallback(async () => {
    setIsLoading(true);

    setTimeout(() => {
      const suggestions = calculateRecommendations(taskHours, hourlyRate);
      const impacts = buildAgentImpacts(suggestions);

      setSuggestions(suggestions);
      setAgentImpact(impacts);
      setShowGate(true);
      setIsLoading(false);
    }, 800);
  }, [taskHours, hourlyRate]);
  
   const handleEmailSubmit = useCallback(async (email: string) => {
    setIsLoading(true);

    try {
      // 1. Send the data to GoHighLevel
      // REPLACE THE URL BELOW WITH YOUR ACTUAL GHL WEBHOOK
      const webhookUrl = "https://services.leadconnectorhq.com/hooks/8I4dcdbVv5h8XxnqQ9Cg/webhook-trigger/b00d0d9c-2881-46fd-8dc9-ebbf0d4dfa2f"; 
      
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          source: "Call Your Agent Calculator",
          date: new Date().toISOString()
        }),
        mode: "no-cors" // keeps the browser happy
      });

      // 2. Unlock the report regardless of the result
      setIsUnlocked(true);
      setShowGate(false);

    } catch (error) {
      console.error("Webhook failed", error);
      // Still unlock the report so the user isn't punished
      setIsUnlocked(true);
      setShowGate(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const { totalHours, annualLoss } = calculateTotalStats(taskHours, hourlyRate);

  const handleReset = () => {
    setTaskHours({});
    setSuggestions(null);
    setAgentImpact(null);
    setShowGate(false);
    setIsUnlocked(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="max-w-6xl mx-auto">
        {!suggestions ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-12"
          >
            <div className="text-center mb-12 px-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                How much is your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                  time really worth?
                </span>
              </h2>
              <p className="text-slate-400 text-lg">
                Tell us what you spend your week doing. We'll calculate your pain.
              </p>
            </div>

            <AuditForm
              hourlyRate={hourlyRate}
              onHourlyRateChange={setHourlyRate}
              taskHours={taskHours}
              onTaskHoursChange={setTaskHours}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
          </motion.div>
        ) : (
          <>
            <AgentImpactReport
              agents={agentImpact || []}
              annualLoss={annualLoss}
              hourlyRate={hourlyRate}
              totalHours={totalHours}
              isUnlocked={isUnlocked}
              onUnlockClick={() => setShowGate(true)}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="max-w-6xl mx-auto px-6 pb-12 flex justify-center"
            >
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold rounded-lg transition-all"
              >
                Run Another Audit
              </button>
            </motion.div>
          </>
        )}
      </main>

      <LeadCaptureModal
        isOpen={showGate}
        onClose={() => setShowGate(false)}
        onSubmit={handleEmailSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;
