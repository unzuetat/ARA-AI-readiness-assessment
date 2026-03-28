import { useState } from 'react';
import { useTranslation } from '../../i18n';
import { useStore } from '../../store';
import { DIMENSION_ORDER } from '../../data/dimensions';
import { BENCHMARKS } from '../../data/benchmarks';
import type { DimensionCode } from '../../types';

const DOT_COLORS: Record<DimensionCode, string> = {
  STR: 'bg-dimension-str',
  DAT: 'bg-dimension-dat',
  TAL: 'bg-dimension-tal',
  GOV: 'bg-dimension-gov',
  CUL: 'bg-dimension-cul',
  PRO: 'bg-dimension-pro',
};

export default function WelcomeView() {
  const { t } = useTranslation();
  const { setPhase, setOrganizationName, setSelectedIndustry } = useStore();
  const [orgName, setOrgName] = useState('');
  const [industry, setIndustry] = useState('');

  const handleStart = () => {
    if (orgName.trim()) setOrganizationName(orgName.trim());
    if (industry) setSelectedIndustry(industry);
    setPhase('assessment');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12 py-12 animate-fade-in">
      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-content-primary">
          {t('welcome.title')}
        </h1>
        <p className="text-content-secondary text-lg leading-relaxed max-w-xl mx-auto">
          {t('welcome.subtitle')}
        </p>
      </div>

      {/* 6 Dimensions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
        {DIMENSION_ORDER.map((code) => (
          <div
            key={code}
            className="flex items-center gap-2.5 px-3 py-2.5 bg-surface-700 rounded border border-surface-400"
          >
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${DOT_COLORS[code]}`} />
            <div>
              <div className="text-sm text-content-secondary font-medium">
                {t(`dim.${code}.short`)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Setup form */}
      <div className="max-w-md mx-auto space-y-4">
        {/* Organization name */}
        <div className="space-y-1.5">
          <label className="text-xs text-content-tertiary font-medium">
            {t('welcome.orgLabel')}
          </label>
          <input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder={t('welcome.orgPlaceholder')}
            className="w-full px-3 py-2.5 bg-surface-700 border border-surface-400 rounded text-sm text-content-primary placeholder:text-content-muted focus:border-accent focus:outline-none transition-default"
          />
        </div>

        {/* Industry selector */}
        <div className="space-y-1.5">
          <label className="text-xs text-content-tertiary font-medium">
            {t('welcome.industryLabel')}
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-3 py-2.5 bg-surface-700 border border-surface-400 rounded text-sm text-content-primary focus:border-accent focus:outline-none transition-default appearance-none"
          >
            <option value="">{t('welcome.industryPlaceholder')}</option>
            {BENCHMARKS.map((b) => (
              <option key={b.id} value={b.industry}>
                {t(`benchmark.${b.id}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-3">
        <button
          onClick={handleStart}
          className="px-10 py-3 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded transition-default"
        >
          {t('welcome.cta')}
        </button>
        <p className="text-xs text-content-muted">
          {t('welcome.meta')}
        </p>
      </div>
    </div>
  );
}
