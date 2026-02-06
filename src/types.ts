export type AgentType =
  | 'The Cashflow Enforcer'
  | 'The 24/7 Prospector'
  | 'The Content Multiplier'
  | 'The Calendar Gatekeeper'
  | 'The Support Sentinel';

export interface TaskHours {
  [taskId: string]: number;
}

export interface AuditTask {
  id: string;
  task: string;
  category: AgentType;
  education: string;
}

export interface AutomationSuggestion {
  agent: AgentType;
  taskIds: string[];
  annualSavings: number;
  hoursSavedPerWeek: number;
  roiMultiplier: number;
}

export interface AgentImpact {
  agent: AgentType;
  tasks: AuditTask[];
  hoursSavedPerWeek: number;
  annualSavings: number;
  roiMultiplier: number;
}
