import type { IndustryBenchmark } from '../types';

// ============================================================
// Industry Benchmark Profiles (25 sectors)
// Reference profiles based on general market observations.
// Includes Spanish and Valencian industrial sectors.
// ============================================================

export const BENCHMARKS: IndustryBenchmark[] = [
  // ─── Agroalimentario ──────────────────────────────────────
  {
    id: 'fruit-veg-trade',
    industry: 'Fruit & vegetable import/export',
    scores: { STR: 1.5, DAT: 2.0, TAL: 1.5, GOV: 1.5, CUL: 1.5, PRO: 2.0 },
  },
  {
    id: 'food-beverage',
    industry: 'Food & beverage manufacturing',
    scores: { STR: 2.0, DAT: 2.5, TAL: 2.0, GOV: 2.0, CUL: 2.0, PRO: 2.5 },
  },
  {
    id: 'food-distribution',
    industry: 'Food distribution & logistics',
    scores: { STR: 2.0, DAT: 2.5, TAL: 1.5, GOV: 2.0, CUL: 1.5, PRO: 2.5 },
  },

  // ─── Industrial ───────────────────────────────────────────
  {
    id: 'automotive',
    industry: 'Automotive & components',
    scores: { STR: 3.0, DAT: 3.0, TAL: 2.5, GOV: 2.5, CUL: 2.5, PRO: 3.0 },
  },
  {
    id: 'ceramics',
    industry: 'Ceramics & building materials',
    scores: { STR: 1.5, DAT: 2.0, TAL: 1.5, GOV: 1.5, CUL: 1.5, PRO: 2.0 },
  },
  {
    id: 'textile-fashion',
    industry: 'Textile & fashion',
    scores: { STR: 2.0, DAT: 2.0, TAL: 2.0, GOV: 1.5, CUL: 2.5, PRO: 2.0 },
  },
  {
    id: 'chemicals-plastics',
    industry: 'Chemicals & plastics',
    scores: { STR: 2.0, DAT: 2.5, TAL: 2.0, GOV: 2.5, CUL: 2.0, PRO: 2.5 },
  },
  {
    id: 'packaging',
    industry: 'Packaging & materials',
    scores: { STR: 1.5, DAT: 2.0, TAL: 1.5, GOV: 1.5, CUL: 1.5, PRO: 2.5 },
  },
  {
    id: 'construction',
    industry: 'Construction & engineering',
    scores: { STR: 1.5, DAT: 2.0, TAL: 1.5, GOV: 2.0, CUL: 1.5, PRO: 1.5 },
  },
  {
    id: 'naval-port',
    industry: 'Naval & port services',
    scores: { STR: 2.0, DAT: 2.5, TAL: 2.0, GOV: 2.5, CUL: 1.5, PRO: 2.0 },
  },

  // ─── Servicios ────────────────────────────────────────────
  {
    id: 'financial-services',
    industry: 'Banking & financial services',
    scores: { STR: 3.0, DAT: 3.5, TAL: 3.0, GOV: 3.5, CUL: 2.5, PRO: 3.0 },
  },
  {
    id: 'insurance',
    industry: 'Insurance',
    scores: { STR: 2.5, DAT: 3.0, TAL: 2.5, GOV: 3.0, CUL: 2.0, PRO: 2.5 },
  },
  {
    id: 'consulting',
    industry: 'Consulting & professional services',
    scores: { STR: 3.0, DAT: 2.5, TAL: 3.0, GOV: 2.5, CUL: 3.0, PRO: 2.5 },
  },
  {
    id: 'tourism-hospitality',
    industry: 'Tourism & hospitality',
    scores: { STR: 2.0, DAT: 2.0, TAL: 1.5, GOV: 1.5, CUL: 2.0, PRO: 2.0 },
  },
  {
    id: 'real-estate',
    industry: 'Real estate',
    scores: { STR: 1.5, DAT: 2.0, TAL: 1.5, GOV: 2.0, CUL: 1.5, PRO: 1.5 },
  },

  // ─── Tecnología ───────────────────────────────────────────
  {
    id: 'technology',
    industry: 'Technology / SaaS',
    scores: { STR: 3.5, DAT: 4.0, TAL: 3.5, GOV: 2.5, CUL: 3.5, PRO: 3.5 },
  },
  {
    id: 'telecommunications',
    industry: 'Telecommunications',
    scores: { STR: 2.5, DAT: 3.0, TAL: 2.5, GOV: 2.5, CUL: 2.0, PRO: 2.5 },
  },
  {
    id: 'gaming-digital',
    industry: 'Gaming & digital entertainment',
    scores: { STR: 3.0, DAT: 3.5, TAL: 3.5, GOV: 2.0, CUL: 3.5, PRO: 3.0 },
  },

  // ─── Sector público y regulado ────────────────────────────
  {
    id: 'public-sector',
    industry: 'Public sector / Government',
    scores: { STR: 2.0, DAT: 2.0, TAL: 1.5, GOV: 2.5, CUL: 1.5, PRO: 1.5 },
  },
  {
    id: 'healthcare',
    industry: 'Healthcare',
    scores: { STR: 2.0, DAT: 2.5, TAL: 2.0, GOV: 3.0, CUL: 2.0, PRO: 2.0 },
  },
  {
    id: 'education',
    industry: 'Education',
    scores: { STR: 1.5, DAT: 1.5, TAL: 1.5, GOV: 2.0, CUL: 2.0, PRO: 1.5 },
  },
  {
    id: 'energy-utilities',
    industry: 'Energy & utilities',
    scores: { STR: 2.5, DAT: 3.0, TAL: 2.5, GOV: 3.0, CUL: 2.0, PRO: 2.5 },
  },
  {
    id: 'transport-logistics',
    industry: 'Transport & logistics',
    scores: { STR: 2.0, DAT: 2.5, TAL: 2.0, GOV: 2.0, CUL: 2.0, PRO: 2.5 },
  },
  {
    id: 'pharmaceutical',
    industry: 'Pharmaceutical',
    scores: { STR: 3.0, DAT: 3.5, TAL: 3.0, GOV: 3.5, CUL: 2.5, PRO: 2.5 },
  },

  // ─── Otros ────────────────────────────────────────────────
  {
    id: 'retail',
    industry: 'Retail / E-commerce',
    scores: { STR: 2.5, DAT: 3.0, TAL: 2.5, GOV: 2.0, CUL: 2.5, PRO: 3.0 },
  },
  {
    id: 'manufacturing',
    industry: 'Manufacturing (general)',
    scores: { STR: 2.0, DAT: 2.5, TAL: 2.0, GOV: 2.0, CUL: 2.0, PRO: 2.5 },
  },
  {
    id: 'generic',
    industry: 'Other / Cross-industry',
    scores: { STR: 2.5, DAT: 2.5, TAL: 2.0, GOV: 2.5, CUL: 2.0, PRO: 2.0 },
  },
];

export const getBenchmark = (id: string): IndustryBenchmark | undefined =>
  BENCHMARKS.find((b) => b.id === id);

export const getBenchmarkByIndustry = (industry: string): IndustryBenchmark | undefined =>
  BENCHMARKS.find((b) => b.industry === industry);
