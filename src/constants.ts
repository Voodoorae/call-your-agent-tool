import { AuditTask, AgentType } from './types';

export const auditTasks: AuditTask[] = [
  {
    id: 'chase',
    task: 'Chasing late payments',
    category: 'The Cashflow Enforcer',
    education: 'AI detects overdue bills and chases them automatically.'
  },
  {
    id: 'invoice',
    task: 'Creating & sending invoices',
    category: 'The Cashflow Enforcer',
    education: 'Connects to CRM and generates PDF invoices instantly.'
  },
  {
    id: 'outreach',
    task: 'Sending cold emails/DMs',
    category: 'The 24/7 Prospector',
    education: 'AI scans LinkedIn and writes hyper-personalized messages.'
  },
  {
    id: 'followup',
    task: 'Following up with leads',
    category: 'The 24/7 Prospector',
    education: '80% of sales happen after the 5th touch. AI follows up forever.'
  },
  {
    id: 'repurpose',
    task: 'Repurposing content',
    category: 'The Content Multiplier',
    education: 'Turn 1 video into 10 posts instantly.'
  },
  {
    id: 'newsletter',
    task: 'Writing & sending newsletters',
    category: 'The Content Multiplier',
    education: 'AI writes, formats, and schedules your weekly newsletter.'
  },
  {
    id: 'schedule',
    task: 'Scheduling meetings',
    category: 'The Calendar Gatekeeper',
    education: 'AI negotiates times via email and books the slot.'
  },
  {
    id: 'support',
    task: 'Answering FAQs & Tickets',
    category: 'The Support Sentinel',
    education: 'AI resolves 80% of support tickets instantly 24/7.'
  }
];

export const agentMissions: Record<AgentType, string> = {
  'The Cashflow Enforcer': 'I ensure you get paid while you sleep.',
  'The 24/7 Prospector': 'I never stop hunting for your next client.',
  'The Content Multiplier': 'I turn your ideas into a media empire.',
  'The Calendar Gatekeeper': 'I reclaim your time from scheduling hell.',
  'The Support Sentinel': 'I keep clients happy without you typing a word.'
};

export const agentIcons: Record<AgentType, string> = {
  'The Cashflow Enforcer': 'Banknote',
  'The 24/7 Prospector': 'Target',
  'The Content Multiplier': 'Zap',
  'The Calendar Gatekeeper': 'CalendarClock',
  'The Support Sentinel': 'ShieldCheck'
};

export const AI_AGENT_MONTHLY_COST = 200;
