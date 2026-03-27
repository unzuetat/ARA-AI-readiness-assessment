import type { Recommendation, DimensionCode, MaturityLevelNumber } from '../types';

// ============================================================
// Recommendations per Dimension × Level
// ============================================================

export const RECOMMENDATIONS: Recommendation[] = [
  // ─── STRATEGY & VISION ────────────────────────────────────
  { id: 'R-STR-1', dimension: 'STR', applicableLevel: 1, effort: 'Low', impact: 'High',
    quickWin: 'Schedule a 90-minute AI briefing for the executive team. Focus on sector-specific examples and risks. No strategy document needed yet — just shared awareness.',
    structuralMove: 'Assign one executive to own the AI conversation. Not to build a strategy, but to be the person who ensures the organization is paying attention.' },
  { id: 'R-STR-2', dimension: 'STR', applicableLevel: 2, effort: 'Medium', impact: 'High',
    quickWin: 'Document the top 5 AI use cases already discussed informally. Rate each by business impact and feasibility. Share with leadership.',
    structuralMove: 'Create a simple AI strategy canvas: vision statement, 3-5 prioritized use cases, success metrics, and timeline. One page is enough to start.' },
  { id: 'R-STR-3', dimension: 'STR', applicableLevel: 3, effort: 'Medium', impact: 'Medium',
    quickWin: 'Add AI strategy review to the next quarterly business review. Present progress, blockers, and next quarter priorities.',
    structuralMove: 'Implement a scoring framework for AI use case prioritization. Evaluate new proposals against strategic alignment, ROI potential, feasibility, and risk.' },
  { id: 'R-STR-4', dimension: 'STR', applicableLevel: 4, effort: 'High', impact: 'Medium',
    quickWin: 'Benchmark your AI portfolio against 2-3 competitors or sector leaders. Identify gaps and opportunities.',
    structuralMove: 'Embed AI considerations into the corporate strategy cycle. Every strategic initiative should be evaluated for AI enhancement potential.' },

  // ─── DATA & INFRASTRUCTURE ────────────────────────────────
  { id: 'R-DAT-1', dimension: 'DAT', applicableLevel: 1, effort: 'Low', impact: 'High',
    quickWin: 'Identify your top 3 datasets that would be most valuable for AI use cases. Assess their current quality (completeness, accuracy, format).',
    structuralMove: 'Assign data owners for critical datasets. Someone must be accountable for quality, access, and documentation.' },
  { id: 'R-DAT-2', dimension: 'DAT', applicableLevel: 2, effort: 'Medium', impact: 'High',
    quickWin: 'Set up a shared data environment (even a structured shared drive) where cleaned datasets are accessible to multiple teams.',
    structuralMove: 'Start a data catalog. Document what data exists, where it lives, who owns it, and how current it is. Begin with the datasets most relevant to identified AI use cases.' },
  { id: 'R-DAT-3', dimension: 'DAT', applicableLevel: 3, effort: 'Medium', impact: 'Medium',
    quickWin: 'Implement automated data quality checks on your most critical AI-feeding datasets. Flag issues before they reach models.',
    structuralMove: 'Build a self-service data access layer. APIs or a data warehouse that allows teams to access approved data without filing requests.' },
  { id: 'R-DAT-4', dimension: 'DAT', applicableLevel: 4, effort: 'High', impact: 'Medium',
    quickWin: 'Conduct a data pipeline audit: where are the bottlenecks? Where does data go stale? Where are the single points of failure?',
    structuralMove: 'Evolve toward data-as-a-product thinking. Each dataset has an SLA for quality, availability, and freshness. Consumers provide feedback.' },

  // ─── TALENT & CAPABILITIES ────────────────────────────────
  { id: 'R-TAL-1', dimension: 'TAL', applicableLevel: 1, effort: 'Low', impact: 'High',
    quickWin: 'Identify who in the organization is already experimenting with AI (they exist — they\'re just doing it quietly). Map informal skills and interests.',
    structuralMove: 'Launch a basic AI literacy program for all staff. Not technical training — awareness of what AI can and cannot do, and how to use it responsibly.' },
  { id: 'R-TAL-2', dimension: 'TAL', applicableLevel: 2, effort: 'Medium', impact: 'High',
    quickWin: 'Create a community of practice for AI-interested employees. Monthly meetup, shared channel, curated resources. Low cost, high signal.',
    structuralMove: 'Define at least one dedicated AI role (data scientist, ML engineer, or AI product manager) and hire or develop for it.' },
  { id: 'R-TAL-3', dimension: 'TAL', applicableLevel: 3, effort: 'Medium', impact: 'Medium',
    quickWin: 'Launch role-specific AI training: "AI for Managers", "AI for Operations", "AI for Compliance." Tailor content to how each role interacts with AI.',
    structuralMove: 'Build a competency framework for AI skills. Define what each seniority level should know. Include it in career development conversations.' },
  { id: 'R-TAL-4', dimension: 'TAL', applicableLevel: 4, effort: 'High', impact: 'Medium',
    quickWin: 'Give AI team members 10-20% time for exploration, conference attendance, or open-source contribution. Retention starts with engagement.',
    structuralMove: 'Embed AI specialists within business units, not just in a central team. Distributed expertise creates distributed capability.' },

  // ─── GOVERNANCE & COMPLIANCE ──────────────────────────────
  { id: 'R-GOV-1', dimension: 'GOV', applicableLevel: 1, effort: 'Low', impact: 'High',
    quickWin: 'Draft a one-page AI usage guideline: what tools are approved, what data can be used, who to ask when unsure. Distribute it tomorrow.',
    structuralMove: 'Conduct an audit of current AI tool usage across the organization. You can\'t govern what you don\'t see. Shadow AI is your biggest unknown risk.' },
  { id: 'R-GOV-2', dimension: 'GOV', applicableLevel: 2, effort: 'Medium', impact: 'High',
    quickWin: 'Convert informal guidelines into a formal AI policy. Get leadership sign-off. Communicate it to all staff.',
    structuralMove: 'Designate an AI governance owner — a person or small committee responsible for policy, compliance, and exception handling.' },
  { id: 'R-GOV-3', dimension: 'GOV', applicableLevel: 3, effort: 'Medium', impact: 'Medium',
    quickWin: 'Map relevant AI regulations (EU AI Act, sector rules) to your current AI activities. Identify gaps and create a compliance timeline.',
    structuralMove: 'Make ethics reviews mandatory for AI projects above a risk threshold. Create a lightweight review checklist that doesn\'t slow teams down.' },
  { id: 'R-GOV-4', dimension: 'GOV', applicableLevel: 4, effort: 'High', impact: 'Medium',
    quickWin: 'Implement automated compliance monitoring for AI usage policies. Flag violations before they become incidents.',
    structuralMove: 'Pursue external validation — AI ethics audit, ISO certification, or industry-specific compliance certification.' },

  // ─── CULTURE & LEADERSHIP ─────────────────────────────────
  { id: 'R-CUL-1', dimension: 'CUL', applicableLevel: 1, effort: 'Low', impact: 'High',
    quickWin: 'Have one senior leader publicly try an AI tool and share their experience (positive or negative) with the organization. Visibility matters.',
    structuralMove: 'Address AI fears directly. Hold an honest Q&A session: "What AI means for our jobs" — without corporate spin. People can handle truth; they can\'t handle silence.' },
  { id: 'R-CUL-2', dimension: 'CUL', applicableLevel: 2, effort: 'Low', impact: 'High',
    quickWin: 'Create a "safe to experiment" signal: announce that teams can try AI tools in a sandbox without approval, as long as no real data is used.',
    structuralMove: 'Establish a formal AI experimentation framework: sandbox environments, pilot criteria, and a process to move from experiment to production.' },
  { id: 'R-CUL-3', dimension: 'CUL', applicableLevel: 3, effort: 'Medium', impact: 'Medium',
    quickWin: 'Celebrate an AI win publicly. Internal newsletter, town hall mention, Slack highlight. Success stories drive adoption.',
    structuralMove: 'Build change management into every AI project plan. Stakeholder analysis, communication plan, training plan. AI adoption is a change problem, not a technology problem.' },
  { id: 'R-CUL-4', dimension: 'CUL', applicableLevel: 4, effort: 'Medium', impact: 'Medium',
    quickWin: 'Launch an internal AI innovation challenge. Let teams propose and prototype AI solutions. Low stakes, high visibility.',
    structuralMove: 'Evolve toward outcome-based teams where AI is a tool, not a special initiative. When AI stops being a project and starts being how we work, the culture shift is complete.' },

  // ─── PROCESSES & OPERATIONS ───────────────────────────────
  { id: 'R-PRO-1', dimension: 'PRO', applicableLevel: 1, effort: 'Low', impact: 'High',
    quickWin: 'Pick one manual process that wastes the most time. Document it step by step. This is your first automation candidate.',
    structuralMove: 'Create a process inventory. List all core workflows. Rate each by: time spent, error frequency, data availability, automation potential.' },
  { id: 'R-PRO-2', dimension: 'PRO', applicableLevel: 2, effort: 'Medium', impact: 'High',
    quickWin: 'Standardize process documentation format: inputs, outputs, decisions, exceptions. Without this, AI integration is guesswork.',
    structuralMove: 'Build an automation pipeline: a standard way to evaluate, build, test, and deploy process improvements. Include AI-assisted and traditional automation.' },
  { id: 'R-PRO-3', dimension: 'PRO', applicableLevel: 3, effort: 'Medium', impact: 'Medium',
    quickWin: 'Implement A/B testing for one AI-driven process change. Measure before and after. Share the results widely.',
    structuralMove: 'Build a basic MLOps pipeline: model versioning, automated testing, staging environment, monitoring. Even for a single model, this sets the pattern.' },
  { id: 'R-PRO-4', dimension: 'PRO', applicableLevel: 4, effort: 'High', impact: 'Medium',
    quickWin: 'Implement user feedback loops for AI-driven processes. Every AI output should have a "was this helpful?" mechanism.',
    structuralMove: 'Evolve toward continuous deployment for AI models. Automated retraining triggers, canary releases, real-time performance monitoring.' },
];

// ============================================================
// Helpers
// ============================================================

export const getRecommendationsForDimension = (
  dimension: DimensionCode,
  level: number
): Recommendation[] => {
  const roundedLevel = Math.round(Math.max(1, Math.min(4, level))) as MaturityLevelNumber;
  return RECOMMENDATIONS.filter(
    (r) => r.dimension === dimension && r.applicableLevel === roundedLevel
  );
};

export const getRecommendation = (id: string): Recommendation | undefined =>
  RECOMMENDATIONS.find((r) => r.id === id);
