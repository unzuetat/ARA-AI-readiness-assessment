# ARA — Project Charter

## Project Overview
**Project:** AI Readiness Assessment (ARA)
**Author:** Unzuetat
**Created:** March 2026
**Status:** Phase 1 — Foundation

## Scope

### In Scope
- 6-dimension maturity model with 30 behaviorally-anchored questions
- 12 organizational archetypes with pattern-based classification
- Contradiction detection engine (10 rules)
- Two-layer assessment (core + evidence-based deep dive)
- Adaptive deep dive questions calibrated to Layer 1 scores
- Scoring engine with configurable dimension weights
- Recommendation engine with quick wins and structural moves
- Industry benchmarks (9 sectors)
- Radar chart visualization (hexagonal, animated)
- Dark theme executive UI
- Comparison mode (temporal and departmental)
- PDF export
- Responsive design
- CI/CD via GitHub Actions → Vercel

### Out of Scope
- User authentication / accounts
- Backend / database (all client-side)
- Real industry benchmark data (reference profiles only)
- Multi-language support (English only, v1)

## Phases

| Phase | Deliverables | Status |
|---|---|---|
| **Phase 1 — Foundation** | Repo, docs, data model, 30 questions, 12 archetypes, scoring engine, contradiction detector, recommendation data, benchmarks, app scaffold | 🟡 In Progress |
| **Phase 2 — Assessment UI** | Welcome screen, question wizard, progress tracking, dark theme, responsive layout | Planned |
| **Phase 3 — Results** | Radar chart, score dashboard, archetype reveal, contradiction cards, dimension detail, benchmark overlay | Planned |
| **Phase 4 — Intelligence** | Deep dive questions, adaptive logic, score adjustment, comparison mode, recommendation engine UI | Planned |
| **Phase 5 — Polish** | PDF export, final responsive polish, CI/CD, performance optimization, final README | Planned |

## Success Criteria
1. Assessment can be completed in under 20 minutes
2. Archetype classification matches expected output for all test scenarios
3. Contradictions are detected accurately with zero false positives on test data
4. Radar chart is visually precise and communicates information immediately
5. PDF export is suitable for executive presentation
6. Lighthouse performance score ≥ 90
7. All engines have unit test coverage

## Technical Decisions
- Same stack as ChangeFlow (React 18, TypeScript, Tailwind, Zustand, Vitest, Vercel)
- Dark theme as default (light toggle optional)
- All data client-side (no backend dependency)
- Corporate aesthetic matching ChangeFlow (squared corners, border-top indicators)
