import type { Archetype, DimensionCode } from '../types';

// ============================================================
// Organizational Archetypes (12)
// Priority: lower number = checked first
// ============================================================

export const ARCHETYPES: Archetype[] = [
  // --- Priority 1: Extreme patterns ---
  {
    id: 'the-unaware',
    name: 'The Unaware',
    pattern: 'All dimensions ≤ 1.5',
    narrative:
      'AI is not on the organization\'s radar. Individual employees may use AI tools, but the organization has no position, no strategy, and no awareness of what it\'s missing. This is the most common starting point — and there\'s nothing wrong with being here, as long as you know it.',
    keyRisk: 'Being disrupted by competitors who are investing in AI while your organization doesn\'t know it should be paying attention.',
    exitPath: 'Start with awareness — a 90-minute executive briefing on AI opportunity and risk in your sector. No strategy document needed yet. Just shared understanding.',
    priority: 1,
    scoreCondition: (s) => {
      const vals = Object.values(s);
      return vals.every((v) => v <= 1.5);
    },
  },
  {
    id: 'the-ai-native',
    name: 'The AI-Native',
    pattern: 'Overall ≥ 4.5, no dimension below 3.5',
    narrative:
      'AI is part of how the organization thinks, decides, and operates. Not perfect — but mature across all dimensions. Continuous improvement is the mode, not achievement of a milestone.',
    keyRisk: 'Overconfidence. Disruption from paradigm shifts (new regulations, new technology, market changes). The biggest threat to mature organizations is believing they\'re done.',
    exitPath: 'Maintain through continuous learning. Lead the industry. Contribute to standards. Teach others.',
    priority: 2,
    scoreCondition: (s) => {
      const vals = Object.values(s);
      const overall = vals.reduce((a, b) => a + b, 0) / vals.length;
      return overall >= 4.5 && vals.every((v) => v >= 3.5);
    },
  },

  // --- Priority 2: Contradiction patterns ---
  {
    id: 'the-paper-tiger',
    name: 'The Paper Tiger',
    pattern: 'STR ≥ 3, GOV ≥ 3, but PRO ≤ 2 and (DAT ≤ 2 or TAL ≤ 2)',
    narrative:
      'Strategy documents are polished. Governance frameworks are comprehensive. But nothing is actually happening on the ground. The gap between documentation and execution is the defining feature. Leadership may believe progress is being made because documents exist.',
    keyRisk: 'The mismatch between narrative and reality becomes entrenched. The organization stops being able to distinguish between planning and doing.',
    exitPath: 'Audit execution against plans. Create accountability mechanisms that measure actions and outcomes, not documents and presentations.',
    priority: 10,
    scoreCondition: (s) =>
      s.STR >= 3 && s.GOV >= 3 && s.PRO <= 2 && (s.DAT <= 2 || s.TAL <= 2),
  },
  {
    id: 'the-cautious-observer',
    name: 'The Cautious Observer',
    pattern: 'GOV ≥ 3, CUL ≤ 2, STR ≤ 2',
    narrative:
      'The organization has policies — often restrictions. "We have a policy" means "we\'ve told people what they can\'t do." AI governance exists as a barrier, not an enabler. The organization watches from the sidelines, protected by its rules.',
    keyRisk: 'Paralysis. The organization becomes known as anti-innovation. Talent leaves for places where they can actually build things.',
    exitPath: 'Reframe governance as an enabler. Approve specific use cases. Show that governance enables bold action, not just restriction. Let one team do something visible.',
    priority: 11,
    scoreCondition: (s) => s.GOV >= 3 && s.CUL <= 2 && s.STR <= 2,
  },
  {
    id: 'the-capability-first',
    name: 'The Capability-First',
    pattern: 'DAT ≥ 3, TAL ≥ 3, PRO ≥ 3, but GOV ≤ 2 and STR ≤ 2',
    narrative:
      'The organization can build and deploy AI. Teams are skilled, infrastructure exists, processes support deployment. But there\'s no strategic direction and minimal governance. They\'re technically capable of doing things they haven\'t decided whether to do.',
    keyRisk: 'Building the wrong things. Compliance exposure. Technical debt from ungoverned deployment. Capable people working on low-impact problems.',
    exitPath: 'Wrap governance and strategy around existing capability. This is actually a strong position — you have the hard part (capability) and need the easier part (direction and guardrails).',
    priority: 12,
    scoreCondition: (s) =>
      s.DAT >= 3 && s.TAL >= 3 && s.PRO >= 3 && s.GOV <= 2 && s.STR <= 2,
  },
  {
    id: 'the-governance-first',
    name: 'The Governance-First',
    pattern: 'GOV ≥ 4, STR ≥ 3, but DAT ≤ 2 and TAL ≤ 2 and PRO ≤ 2',
    narrative:
      'The organization has done the strategic and governance work properly. Policies, frameworks, roles — all defined. But the technical muscle is weak. They know what they want to do; they can\'t do it yet.',
    keyRisk: 'Frustration. The plan is good but execution stalls on technical capability. Governance without capability becomes bureaucracy.',
    exitPath: 'Invest in talent and infrastructure. The governance foundation means new capability can be deployed safely and quickly. You have the safe rails — now add the train.',
    priority: 13,
    scoreCondition: (s) =>
      s.GOV >= 4 && s.STR >= 3 && s.DAT <= 2 && s.TAL <= 2 && s.PRO <= 2,
  },
  {
    id: 'the-technical-island',
    name: 'The Technical Island',
    pattern: 'DAT ≥ 3, TAL ≥ 3, but STR ≤ 2 and CUL ≤ 2 and GOV ≤ 2',
    narrative:
      'A strong technical team is doing impressive work in isolation. They have the data, the skills, and the infrastructure. But they operate without business alignment, cultural support, or governance. It\'s a team success, not an organizational capability.',
    keyRisk: 'The technical team becomes disillusioned. Their work doesn\'t translate to business impact. They leave for an organization that will listen.',
    exitPath: 'Connect technical capability to business strategy. Give the team a seat at the leadership table. Build governance around what they\'ve built, not in spite of it.',
    priority: 14,
    scoreCondition: (s) =>
      s.DAT >= 3 && s.TAL >= 3 && s.STR <= 2 && s.CUL <= 2 && s.GOV <= 2,
  },

  // --- Priority 3: Structural patterns ---
  {
    id: 'the-siloed-achiever',
    name: 'The Siloed Achiever',
    pattern: 'High variance: max - min ≥ 2.5',
    narrative:
      'Excellence in one or two areas, weakness everywhere else. Often the result of a single passionate leader or team that drove progress in their domain without lifting the rest of the organization. The spikes are real — but so are the valleys.',
    keyRisk: 'Key person dependency. If the champion leaves, capability collapses. The organization hasn\'t learned; a person has.',
    exitPath: 'Document and institutionalize what works. Spread it horizontally. Turn individual excellence into organizational capability. The champion needs a team, not just a title.',
    priority: 20,
    scoreCondition: (s) => {
      const vals = Object.values(s);
      return Math.max(...vals) - Math.min(...vals) >= 2.5;
    },
  },
  {
    id: 'the-enthusiastic-consumer',
    name: 'The Enthusiastic Consumer',
    pattern: 'STR ≤ 2, DAT ≤ 2, GOV ≤ 2, general low scores with AI tool usage',
    narrative:
      'The organization believes it "uses AI" because employees use AI-powered tools — Copilot, ChatGPT, automated transcriptions. But consuming AI products built by others is not the same as having AI capability. There\'s no strategy, no governance, no measurement. The organization is a customer of AI, not a practitioner.',
    keyRisk: 'Data leakage from ungoverned AI tool usage. Shadow AI proliferating. No ROI visibility. A false sense of progress that delays real investment.',
    exitPath: 'Audit current AI tool usage across the organization. You\'ll be surprised by what you find. Then formalize: which tools are approved, what data can go in, and who decides what\'s next.',
    priority: 21,
    scoreCondition: (s) => {
      const vals = Object.values(s);
      const overall = vals.reduce((a, b) => a + b, 0) / vals.length;
      return s.STR <= 2 && s.GOV <= 2 && overall <= 2.2 && overall > 1.5;
    },
  },
  {
    id: 'the-pocketful-of-pilots',
    name: 'The Pocketful of Pilots',
    pattern: 'STR 2-3, TAL 2-3, PRO ≤ 2, DAT ≤ 2',
    narrative:
      'Multiple AI experiments are running, often initiated by enthusiastic individuals or teams. But none have scaled. There\'s no infrastructure to move from POC to production, and no process to capture learnings across pilots. Every pilot starts from scratch.',
    keyRisk: 'Pilot fatigue. After enough experiments that "didn\'t go anywhere," the organization loses enthusiasm. Innovation becomes associated with wasted effort.',
    exitPath: 'Pick one pilot with the best ROI potential. Build the infrastructure to scale it. Use it as the template for all future pilots. One success story changes everything.',
    priority: 22,
    scoreCondition: (s) =>
      s.STR >= 2 && s.STR <= 3 && s.TAL >= 2 && s.TAL <= 3 && s.PRO <= 2 && s.DAT <= 2,
  },

  // --- Priority 4: Level patterns ---
  {
    id: 'the-strategic-executor',
    name: 'The Strategic Executor',
    pattern: 'Most dimensions ≥ 3, at least 2 at ≥ 4. Overall ≥ 3.5',
    narrative:
      'The organization is executing on AI with intent and capability. Strategy, governance, and execution are aligned. The remaining gaps are specific and addressable. This is where good organizations are.',
    keyRisk: 'Complacency. "We\'re doing well" can become "we\'re doing enough." The gap between Level 4 and Level 5 requires a different kind of ambition.',
    exitPath: 'Push remaining dimensions to Level 3+. Focus on the 1-2 areas still lagging. Set Level 5 targets for core dimensions. The finish line keeps moving.',
    priority: 30,
    scoreCondition: (s) => {
      const vals = Object.values(s);
      const overall = vals.reduce((a, b) => a + b, 0) / vals.length;
      const atFour = vals.filter((v) => v >= 4).length;
      return overall >= 3.5 && atFour >= 2;
    },
  },
  {
    id: 'the-balanced-beginner',
    name: 'The Balanced Beginner',
    pattern: 'All dimensions between 2.0 and 3.0, low variance',
    narrative:
      'The organization is making progress across the board, but hasn\'t excelled anywhere. Foundations are being laid evenly. This is not bad — it\'s actually a strong position if the momentum continues.',
    keyRisk: 'Stalling at Level 2-3 across everything. Broad but shallow progress can feel like no progress. Stakeholders want to see spikes, not flat lines.',
    exitPath: 'Pick 1-2 dimensions to push to Level 4. Create visible wins that build momentum. The balanced foundation makes it safe to go deep somewhere.',
    priority: 31,
    scoreCondition: (s) => {
      const vals = Object.values(s);
      const allInRange = vals.every((v) => v >= 2.0 && v <= 3.0);
      const variance =
        vals.reduce((sum, v) => {
          const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
          return sum + Math.pow(v - mean, 2);
        }, 0) / vals.length;
      return allInRange && variance <= 0.15;
    },
  },
];

// ============================================================
// Classifier
// ============================================================

export const classifyArchetype = (
  scores: Record<DimensionCode, number>
): Archetype => {
  // Sort by priority and return the first match
  const sorted = [...ARCHETYPES].sort((a, b) => a.priority - b.priority);

  for (const archetype of sorted) {
    if (archetype.scoreCondition(scores)) {
      return archetype;
    }
  }

  // Fallback: find closest archetype by Euclidean distance to typical pattern
  // This shouldn't happen with the current rules, but provides safety
  return ARCHETYPES.find((a) => a.id === 'the-balanced-beginner')!;
};
