import type { ContradictionRule } from '../types';

// ============================================================
// Contradiction Rules (10)
// Detect structurally implausible score combinations
// ============================================================

export const CONTRADICTION_RULES: ContradictionRule[] = [
  {
    id: 'C1',
    name: 'Strategy without Governance',
    condition: (s) => s.STR >= 3 && s.GOV <= 1.5,
    severity: 'HIGH',
    narrative:
      'Your organization declares a mature AI strategy but has virtually no governance. Strategy without governance is ambition without accountability — you know what you want to do, but have no guardrails for how to do it safely.',
    implication:
      'AI initiatives will launch without ethical review, compliance checks, or usage policies. The first incident (data leak, biased output, regulatory breach) will have no framework to respond within.',
    resolution:
      'Before scaling any strategic initiative, establish basic governance: an AI usage policy, an approved tools list, and a privacy review for AI projects. These can be lightweight — a one-page policy is infinitely better than none.',
    involvedDimensions: ['STR', 'GOV'],
  },
  {
    id: 'C2',
    name: 'Governance without Action',
    condition: (s) => s.GOV >= 3 && s.PRO <= 1.5,
    severity: 'HIGH',
    narrative:
      'Comprehensive governance policies exist, but operational processes haven\'t changed. Governance has become documentation, not behavior. Policies are filed, not followed.',
    implication:
      'The governance framework creates a false sense of security. When audited, the gap between policy and practice will be visible. Teams may see governance as irrelevant paperwork.',
    resolution:
      'Connect governance to operations. Every policy should have a corresponding process change. Audit whether policies are actually being followed. Make governance visible in daily workflows.',
    involvedDimensions: ['GOV', 'PRO'],
  },
  {
    id: 'C3',
    name: 'Talent without Direction',
    condition: (s) => s.TAL >= 3 && s.STR <= 1.5,
    severity: 'MEDIUM',
    narrative:
      'You have skilled AI people but no strategy for what to do with them. Talented people without direction build what interests them, not what the organization needs.',
    implication:
      'AI talent will work on low-impact projects, become frustrated by lack of organizational support, and eventually leave for organizations that have a vision they can contribute to.',
    resolution:
      'Engage your AI talent in building the strategy. They know what\'s possible — leadership needs to tell them what\'s valuable. Co-create the AI roadmap with technical and business stakeholders.',
    involvedDimensions: ['TAL', 'STR'],
  },
  {
    id: 'C4',
    name: 'Culture without Capability',
    condition: (s) => s.CUL >= 3 && s.DAT <= 1.5 && s.TAL <= 1.5,
    severity: 'MEDIUM',
    narrative:
      'The organization is enthusiastic about AI — leadership is engaged, the culture is ready for change — but the technical foundations don\'t exist. Enthusiasm without capability leads to frustration.',
    implication:
      'Repeated failed attempts to implement AI will erode the cultural goodwill. When tools don\'t work because data is poor or skills are missing, early adopters become cynics.',
    resolution:
      'Invest in the foundations before announcing more AI initiatives. Data quality, basic infrastructure, and at least one skilled hire. The cultural readiness is your advantage — don\'t waste it on premature launches.',
    involvedDimensions: ['CUL', 'DAT', 'TAL'],
  },
  {
    id: 'C5',
    name: 'Data without Governance',
    condition: (s) => s.DAT >= 3 && s.GOV <= 1.5,
    severity: 'HIGH',
    narrative:
      'Strong data infrastructure exists with virtually no governance around it. Data is accessible and high-quality — but there are no policies for how it should be used in AI contexts.',
    implication:
      'High exposure to privacy violations, compliance breaches, and ethical risks. The better your data, the more damage ungoverned AI can do with it.',
    resolution:
      'This is urgent. Establish data privacy impact assessments for AI, define approved uses for sensitive data, and create an AI data classification policy. Good data without governance is a loaded weapon.',
    involvedDimensions: ['DAT', 'GOV'],
  },
  {
    id: 'C6',
    name: 'Processes without Data',
    condition: (s) => s.PRO >= 3 && s.DAT <= 1.5,
    severity: 'MEDIUM',
    narrative:
      'Operational processes are designed for AI integration, but the data to feed them isn\'t there. Automation running on bad data produces automated bad decisions.',
    implication:
      'AI-integrated processes will produce unreliable outputs. Trust in both the processes and in AI will erode as errors accumulate.',
    resolution:
      'Prioritize data quality for the specific processes that are AI-ready. You don\'t need perfect data everywhere — you need good data where AI is being deployed.',
    involvedDimensions: ['PRO', 'DAT'],
  },
  {
    id: 'C7',
    name: 'Vision without Culture',
    condition: (s) => s.STR >= 3 && s.CUL <= 1.5,
    severity: 'MEDIUM',
    narrative:
      'Leadership has an AI vision that the organization doesn\'t share. The strategy exists on paper, but the cultural readiness to execute it does not. Top-down AI without cultural buy-in creates resistance.',
    implication:
      'AI initiatives will face passive resistance. Adoption will be low. The gap between what leadership says and what teams do will grow.',
    resolution:
      'Invest in change management before pushing more initiatives. Communicate the "why" not just the "what." Create safe spaces for teams to experiment and voice concerns.',
    involvedDimensions: ['STR', 'CUL'],
  },
  {
    id: 'C8',
    name: 'Capability without Process',
    condition: (s) => s.DAT >= 3 && s.TAL >= 3 && s.PRO <= 1.5,
    severity: 'MEDIUM',
    narrative:
      'Technical capability exists — skilled people with good data — but there\'s no process to operationalize AI. Models stay in notebooks. Insights stay in presentations. Nothing reaches production.',
    implication:
      'The organization invests in AI but never sees returns. Technical teams prove concepts that never become products. The business sees AI as an expensive experiment.',
    resolution:
      'Build the deployment pipeline. Even a basic one: versioning, testing, staging, production. The gap from POC to production is where most organizations lose their AI investment.',
    involvedDimensions: ['DAT', 'TAL', 'PRO'],
  },
  {
    id: 'C9',
    name: 'Everything without Governance',
    condition: (s) => {
      const vals = Object.values(s);
      const overall = vals.reduce((a, b) => a + b, 0) / vals.length;
      return overall >= 3 && s.GOV <= 1.5;
    },
    severity: 'CRITICAL',
    narrative:
      'The organization is advancing in AI across multiple dimensions but has virtually no governance. This is the highest-risk pattern: capability without guardrails. The more capable an ungoverned AI program becomes, the larger the potential blast radius.',
    implication:
      'It\'s a matter of when, not if, something goes wrong — data breach, biased model, regulatory violation, public embarrassment. And when it does, there\'s no framework to respond.',
    resolution:
      'Stop and govern. This is not a suggestion — it\'s an imperative. Establish an AI policy, designate an owner, and conduct a risk assessment of current AI deployments. Then resume scaling.',
    involvedDimensions: ['GOV', 'STR', 'DAT', 'TAL', 'CUL', 'PRO'],
  },
  {
    id: 'C10',
    name: 'Governance Overreach',
    condition: (s) => {
      const others = [s.STR, s.DAT, s.TAL, s.CUL, s.PRO];
      return s.GOV >= 4 && others.every((v) => v <= 2);
    },
    severity: 'MEDIUM',
    narrative:
      'Governance has outpaced everything else in the organization. You are governing AI you don\'t have. The policies are mature, but there\'s nothing to apply them to.',
    implication:
      'Governance becomes perceived as the reason AI isn\'t happening (even if it isn\'t). Teams see compliance as the enemy. The governance team loses credibility.',
    resolution:
      'Use the governance foundation as an accelerator, not a gatekeeper. Approve a pilot with explicit governance support. Show that governance makes AI safer AND faster to deploy.',
    involvedDimensions: ['GOV', 'STR', 'DAT', 'TAL', 'CUL', 'PRO'],
  },
];
