import { TaskHours, AutomationSuggestion, AgentImpact, AgentType } from '../types';
import { auditTasks, AI_AGENT_MONTHLY_COST } from '../constants';

export const calculateRecommendations = (
  taskHours: TaskHours,
  hourlyRate: number
): AutomationSuggestion[] => {
  const agents: Record<AgentType, string[]> = {
    'The Cashflow Enforcer': ['chase', 'invoice'],
    'The 24/7 Prospector': ['outreach', 'followup'],
    'The Content Multiplier': ['repurpose', 'newsletter'],
    'The Calendar Gatekeeper': ['schedule'],
    'The Support Sentinel': ['support']
  };

  const suggestions: AutomationSuggestion[] = [];

  Object.entries(agents).forEach(([agentName, taskIds]) => {
    const relevantTasks = taskIds.filter(taskId => (taskHours[taskId] || 0) > 0);

    if (relevantTasks.length > 0) {
      const hoursSavedPerWeek = relevantTasks.reduce(
        (sum, taskId) => sum + (taskHours[taskId] || 0),
        0
      );
      const annualSavings = hoursSavedPerWeek * hourlyRate * 52;
      const yearlyAICost = AI_AGENT_MONTHLY_COST * 12;
      const roiMultiplier = annualSavings / yearlyAICost;

      suggestions.push({
        agent: agentName as AgentType,
        taskIds: relevantTasks,
        annualSavings,
        hoursSavedPerWeek,
        roiMultiplier
      });
    }
  });

  return suggestions;
};

export const buildAgentImpacts = (
  suggestions: AutomationSuggestion[]
): AgentImpact[] => {
  return suggestions.map(suggestion => {
    const tasks = auditTasks.filter(task => suggestion.taskIds.includes(task.id));

    return {
      agent: suggestion.agent,
      tasks,
      hoursSavedPerWeek: suggestion.hoursSavedPerWeek,
      annualSavings: suggestion.annualSavings,
      roiMultiplier: suggestion.roiMultiplier
    };
  });
};

export const calculateTotalStats = (
  taskHours: TaskHours,
  hourlyRate: number
) => {
  const totalHours = Object.values(taskHours).reduce((sum, h = 0) => sum + h, 0);
  const annualLoss = totalHours * hourlyRate * 52;

  return {
    totalHours,
    annualLoss
  };
};
