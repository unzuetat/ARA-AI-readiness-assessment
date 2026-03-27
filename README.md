# AI Readiness Assessment (ARA)

**A structured maturity model tool that diagnoses organizational readiness for AI adoption across 6 dimensions, 5 maturity levels, and 30+ indicators.**

> Built by [Unzuetat](https://github.com/unzuetat) — IT Project Manager & Change Governance Specialist

---

## The Problem

Organizations are under pressure to "adopt AI" but have no objective way to know where they stand. Many confuse *consuming* AI tools (Copilot, automated transcriptions, chatbots) with *being ready for AI* (governance, data quality, strategy, talent).

Directors ask "are we ready for AI?" and get shrugs or generic consulting decks.

## What ARA Does

ARA provides a **structured, multidimensional diagnosis** that goes beyond typical maturity questionnaires:

### Two-Layer Assessment
- **Layer 1 — Core Assessment:** 30 behaviorally-anchored questions across 6 dimensions. Scenario-based selection prevents inflated self-assessment. ~15 minutes.
- **Layer 2 — Deep Dive (optional):** Evidence-based follow-up questions calibrated to your Layer 1 scores. Validates or adjusts your declared maturity. ~5 minutes per dimension.

### Intelligent Diagnosis
- **12 Organizational Archetypes:** Pattern-based classification that names your organization's profile — from "The Enthusiastic Consumer" (uses AI tools but has no strategy) to "The Paper Tiger" (perfect documents, zero execution).
- **Contradiction Detection:** Identifies structurally implausible score combinations. "You claim mature strategy but have no governance" is flagged and explained.
- **Adaptive Questions:** Deep dive questions calibrate to your score — Level 1 organizations get basics, Level 4 organizations get challenged.

### Actionable Output
- **Radar chart** showing your profile across all 6 dimensions
- **Industry benchmarks** for context (public sector, finance, healthcare, tech, manufacturing, retail, education, telecom)
- **Prioritized recommendations** with quick wins and structural moves
- **Comparison mode** for tracking progress over time or across departments
- **PDF export** suitable for leadership presentations

## The 6 Dimensions

| Dimension | Core Question |
|---|---|
| **Strategy & Vision** | Does the organization know WHAT it wants AI to do? |
| **Data & Infrastructure** | Are the technical foundations ready? |
| **Talent & Capabilities** | Does the organization have the right people? |
| **Governance & Compliance** | Do the guardrails exist? |
| **Culture & Leadership** | Is the organization mentally prepared? |
| **Processes & Operations** | Are the workflows ready to integrate AI? |

## The 5 Maturity Levels

| Level | Name | Description |
|---|---|---|
| 1 | **Initial** | AI happens to individuals, not to the organization |
| 2 | **Developing** | Someone is asking the right questions |
| 3 | **Defined** | The organization has decided and is executing |
| 4 | **Managed** | Measurement, optimization, and portfolio thinking |
| 5 | **Optimizing** | AI is part of organizational DNA |

Level 1 is not "bad" — it's a starting point. Most organizations are there. The value is in knowing where you are and what to do next.

## Architecture

```
┌─────────────────────────────────────────────┐
│            Presentation Layer                │
│  React 18 + TypeScript + Tailwind CSS       │
│  Dark theme, executive aesthetic             │
├─────────────────────────────────────────────┤
│         Assessment Engine                    │
│  Scoring │ Archetypes │ Contradictions       │
├─────────────────────────────────────────────┤
│         Diagnosis Engine                     │
│  Gap analysis │ Recommendations │ Benchmarks │
├─────────────────────────────────────────────┤
│  Zustand State │ Assessment Data (JSON/TS)  │
└─────────────────────────────────────────────┘
```

**Tech stack:** React 18, TypeScript, Tailwind CSS, Zustand, Vitest, Vercel.

## Quick Start

```bash
cd app
npm install
npm run dev
```

## Portfolio Context

ARA is project 2 of 5 on the governance axis:

1. ✅ [ChangeFlow](https://github.com/unzuetat/changeflow) — Change governance framework
2. 🟡 **AI Readiness Assessment** — This project
3. Regulatory Change Impact Mapper
4. Decision Governance Tracker
5. Stakeholder Alignment Canvas

## License

MIT
