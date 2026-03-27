import type { Dimension, DimensionCode, MaturityLevel } from '../types';

// ============================================================
// Dimensions
// ============================================================

export const DIMENSIONS: Dimension[] = [
  {
    code: 'STR',
    name: 'Strategy & Vision',
    shortName: 'Strategy',
    description: 'Evaluates whether the organization has a clear, funded, and communicated vision for AI adoption.',
    coreQuestion: 'Does the organization know WHAT it wants AI to do?',
    icon: 'Compass',
    accentColor: 'str',
  },
  {
    code: 'DAT',
    name: 'Data & Infrastructure',
    shortName: 'Data',
    description: 'Assesses data quality, accessibility, compute infrastructure, integration capability, and data governance.',
    coreQuestion: 'Are the technical foundations ready?',
    icon: 'Database',
    accentColor: 'dat',
  },
  {
    code: 'TAL',
    name: 'Talent & Capabilities',
    shortName: 'Talent',
    description: 'Measures AI skills, literacy programs, dedicated roles, talent strategy, and internal champions.',
    coreQuestion: 'Does the organization have the right people?',
    icon: 'Users',
    accentColor: 'tal',
  },
  {
    code: 'GOV',
    name: 'Governance & Compliance',
    shortName: 'Governance',
    description: 'Evaluates AI usage policies, ethical frameworks, regulatory awareness, model governance, and privacy.',
    coreQuestion: 'Do the guardrails exist?',
    icon: 'Shield',
    accentColor: 'gov',
  },
  {
    code: 'CUL',
    name: 'Culture & Leadership',
    shortName: 'Culture',
    description: 'Assesses leadership engagement, experimentation culture, change readiness, and cross-functional collaboration.',
    coreQuestion: 'Is the organization mentally prepared?',
    icon: 'Sparkles',
    accentColor: 'cul',
  },
  {
    code: 'PRO',
    name: 'Processes & Operations',
    shortName: 'Processes',
    description: 'Measures automation baseline, process documentation, change management for AI, MLOps, and feedback loops.',
    coreQuestion: 'Are the workflows ready to integrate AI?',
    icon: 'Workflow',
    accentColor: 'pro',
  },
];

export const DIMENSION_ORDER: DimensionCode[] = ['STR', 'DAT', 'TAL', 'GOV', 'CUL', 'PRO'];

export const getDimension = (code: DimensionCode): Dimension =>
  DIMENSIONS.find((d) => d.code === code)!;

// ============================================================
// Maturity Levels
// ============================================================

export const MATURITY_LEVELS: MaturityLevel[] = [
  {
    level: 1,
    name: 'Initial',
    oneLiner: 'AI happens to individuals, not to the organization',
    description:
      'No conscious organizational effort. AI use is ad-hoc, individual, and ungoverned. Tools may be used, but there is no strategy, governance, or measurement.',
  },
  {
    level: 2,
    name: 'Developing',
    oneLiner: 'Someone is asking the right questions',
    description:
      'Awareness and first steps. Isolated pilots, some training, initial discussions. The organization is beginning to recognize AI as relevant.',
  },
  {
    level: 3,
    name: 'Defined',
    oneLiner: 'The organization has decided and is executing',
    description:
      'Formalized processes. Policies exist, roles are defined, a roadmap is in place, and projects are running with governance.',
  },
  {
    level: 4,
    name: 'Managed',
    oneLiner: 'Measurement, optimization, and portfolio thinking',
    description:
      'AI KPIs are defined, models are monitored, continuous improvement is active, and there is a portfolio of AI initiatives.',
  },
  {
    level: 5,
    name: 'Optimizing',
    oneLiner: 'AI is part of organizational DNA',
    description:
      'AI integrated in how the organization thinks, decides, and operates. Continuous innovation, sector leadership, AI-native processes.',
  },
];

export const getMaturityLevel = (level: number): MaturityLevel =>
  MATURITY_LEVELS.find((l) => l.level === Math.round(Math.max(1, Math.min(5, level))))!;
