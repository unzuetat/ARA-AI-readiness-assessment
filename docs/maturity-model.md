# ARA — Maturity Model Documentation

## Overview

The AI Readiness Assessment uses a structured maturity model to diagnose organizational readiness for AI adoption. The model evaluates 6 dimensions across 5 maturity levels using behaviorally-anchored scenarios.

## Design Principles

### Anti-Gaming
Questions do not ask "Do you have X? Yes/No." Instead, they present 5 scenario descriptions and ask the evaluator to select which best matches their organization. This forces honest self-assessment because:
- Level 3 is not obviously "the right answer"
- Scenarios describe observable behaviors, not aspirations
- Evidence-based deep dive can verify or adjust declared levels

### Two-Layer Validation
- **Layer 1 (Core):** 30 scenario-based questions establish baseline scores
- **Layer 2 (Deep Dive):** Optional evidence questions validate or adjust scores

### Contradiction Detection
The model cross-references scores between dimensions to identify structurally implausible combinations (e.g., high strategy with no governance).

## The 6 Dimensions

### 1. Strategy & Vision (STR)
*Does the organization know WHAT it wants AI to do?*
Evaluates: AI roadmap, use case identification, executive commitment, budget, internal communication.

### 2. Data & Infrastructure (DAT)
*Are the technical foundations ready?*
Evaluates: Data quality, accessibility, compute infrastructure, integration capability, data governance.

### 3. Talent & Capabilities (TAL)
*Does the organization have the right people?*
Evaluates: AI skills, literacy programs, dedicated roles, talent strategy, internal champions.

### 4. Governance & Compliance (GOV)
*Do the guardrails exist?*
Evaluates: AI usage policies, ethical framework, regulatory awareness, model governance, data privacy.

### 5. Culture & Leadership (CUL)
*Is the organization mentally prepared?*
Evaluates: Leadership engagement, experimentation culture, change readiness, AI perception, cross-functional collaboration.

### 6. Processes & Operations (PRO)
*Are the workflows ready to integrate AI?*
Evaluates: Process automation baseline, documentation, change management for AI, MLOps, feedback loops.

## The 5 Maturity Levels

| Level | Name | Characteristics |
|---|---|---|
| 1 | **Initial** | Ad-hoc, individual, ungoverned. AI use is personal, not organizational. |
| 2 | **Developing** | Awareness and first steps. Isolated pilots, initial discussions. |
| 3 | **Defined** | Formalized processes. Policies exist, roles defined, roadmap in place. |
| 4 | **Managed** | Measurement and optimization. KPIs defined, continuous improvement. |
| 5 | **Optimizing** | AI integrated in organizational DNA. Continuous innovation, sector leadership. |

## Scoring

### Dimension Score
Average of the 5 question scores within that dimension. Range: 1.0 to 5.0.

### Overall Score
Weighted average of all 6 dimension scores. Default weights are equal (1.0 each). Configurable weight presets available.

### Deep Dive Adjustment
Evidence questions can adjust a dimension score by -1.0 to +0.5, changing the confidence level from "declared" to "evidence-supported."

## Organizational Archetypes

The model classifies organizations into 12 archetypes based on score patterns, not just averages. See the application for full archetype descriptions and classification logic.
