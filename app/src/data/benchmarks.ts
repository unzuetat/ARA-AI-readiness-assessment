import type { IndustryBenchmark } from '../types';

// ============================================================
// Industry Benchmark Profiles
// Reference profiles based on general market observations.
// NOT proprietary data — useful for context comparison.
// ============================================================

export const BENCHMARKS: IndustryBenchmark[] = [
  {
    id: 'public-sector',
    industry: 'Public Sector / Government',
    scores: { STR: 2.0, DAT: 2.0, TAL: 1.5, GOV: 2.5, CUL: 1.5, PRO: 1.5 },
  },
  {
    id: 'financial-services',
    industry: 'Financial Services / Banking',
    scores: { STR: 3.0, DAT: 3.5, TAL: 3.0, GOV: 3.5, CUL: 2.5, PRO: 3.0 },
  },
  {
    id: 'healthcare',
    industry: 'Healthcare',
    scores: { STR: 2.0, DAT: 2.5, TAL: 2.0, GOV: 3.0, CUL: 2.0, PRO: 2.0 },
  },
  {
    id: 'technology',
    industry: 'Technology / SaaS',
    scores: { STR: 3.5, DAT: 4.0, TAL: 3.5, GOV: 2.5, CUL: 3.5, PRO: 3.5 },
  },
  {
    id: 'manufacturing',
    industry: 'Manufacturing',
    scores: { STR: 2.0, DAT: 2.5, TAL: 2.0, GOV: 2.0, CUL: 2.0, PRO: 2.5 },
  },
  {
    id: 'retail',
    industry: 'Retail / E-commerce',
    scores: { STR: 2.5, DAT: 3.0, TAL: 2.5, GOV: 2.0, CUL: 2.5, PRO: 3.0 },
  },
  {
    id: 'education',
    industry: 'Education',
    scores: { STR: 1.5, DAT: 1.5, TAL: 1.5, GOV: 2.0, CUL: 2.0, PRO: 1.5 },
  },
  {
    id: 'telecommunications',
    industry: 'Telecommunications',
    scores: { STR: 2.5, DAT: 3.0, TAL: 2.5, GOV: 2.5, CUL: 2.0, PRO: 2.5 },
  },
  {
    id: 'generic',
    industry: 'Generic / Cross-industry',
    scores: { STR: 2.5, DAT: 2.5, TAL: 2.0, GOV: 2.5, CUL: 2.0, PRO: 2.0 },
  },
];

export const getBenchmark = (id: string): IndustryBenchmark | undefined =>
  BENCHMARKS.find((b) => b.id === id);

export const getBenchmarkByIndustry = (industry: string): IndustryBenchmark | undefined =>
  BENCHMARKS.find((b) => b.industry === industry);
