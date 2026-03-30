import { useState } from 'react';
import { useTranslation } from '../i18n';
import { useStore } from '../store';
import { DIMENSION_ORDER } from '../data/dimensions';
import { BENCHMARKS } from '../data/benchmarks';
import type { DimensionCode } from '../types';

const DIM_COLORS: Record<DimensionCode, string> = {
  STR: 'var(--dim-str)',
  DAT: 'var(--dim-dat)',
  TAL: 'var(--dim-tal)',
  GOV: 'var(--dim-gov)',
  CUL: 'var(--dim-cul)',
  PRO: 'var(--dim-pro)',
};

const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi'];

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
    <div className="max-w-none mx-auto animate-fade-in">
      {/* Hero with radar */}
      <div className="flex gap-10 items-start py-8">
        <div className="flex-1 pt-2">
          <div className="text-xs tracking-widest uppercase text-fg3 mb-3">
            {t('welcome.eyebrow')}
          </div>
          <h1 className="font-serif text-4xl font-normal leading-tight text-fg mb-4">
            {t('welcome.titleLine1')}
            <br />
            <em>{t('welcome.titleLine2')}</em>
          </h1>
          <p className="text-base leading-relaxed text-fg2 max-w-lg">
            {t('welcome.subtitle')}
          </p>
        </div>

        {/* Radar hexagon */}
        <div className="flex-shrink-0 w-48 h-48 hidden sm:block">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <g transform="translate(100,100)">
              <polygon points="0,-80 69,-40 69,40 0,80 -69,40 -69,-40" fill="none" stroke="var(--border)" strokeWidth="0.5" />
              <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" fill="none" stroke="var(--border)" strokeWidth="0.3" />
              <polygon points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20" fill="none" stroke="var(--border)" strokeWidth="0.3" />
              <polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-20" fill="none" stroke="var(--border)" strokeWidth="0.3" />
              <line x1="0" y1="0" x2="0" y2="-80" stroke="var(--border)" strokeWidth="0.3" />
              <line x1="0" y1="0" x2="69" y2="-40" stroke="var(--border)" strokeWidth="0.3" />
              <line x1="0" y1="0" x2="69" y2="40" stroke="var(--border)" strokeWidth="0.3" />
              <line x1="0" y1="0" x2="0" y2="80" stroke="var(--border)" strokeWidth="0.3" />
              <line x1="0" y1="0" x2="-69" y2="40" stroke="var(--border)" strokeWidth="0.3" />
              <line x1="0" y1="0" x2="-69" y2="-40" stroke="var(--border)" strokeWidth="0.3" />
              <polygon points="0,-16 17,-10 14,8 0,16 -10,6 -14,-8" fill="var(--radar-fill)" stroke="var(--radar-stroke)" strokeWidth="1" />
              <text x="0" y="-88" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10" fontFamily="Source Sans 3">STR</text>
              <text x="78" y="-38" textAnchor="start" fill="var(--text-tertiary)" fontSize="10" fontFamily="Source Sans 3">DAT</text>
              <text x="78" y="44" textAnchor="start" fill="var(--text-tertiary)" fontSize="10" fontFamily="Source Sans 3">TAL</text>
              <text x="0" y="96" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10" fontFamily="Source Sans 3">GOV</text>
              <text x="-78" y="44" textAnchor="end" fill="var(--text-tertiary)" fontSize="10" fontFamily="Source Sans 3">CUL</text>
              <text x="-78" y="-38" textAnchor="end" fill="var(--text-tertiary)" fontSize="10" fontFamily="Source Sans 3">PRO</text>
              <text x="0" y="5" textAnchor="middle" fill="var(--text-tertiary)" fontSize="16" fontFamily="Playfair Display" fontStyle="italic">?</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border)] mb-8" />

      {/* Dimension grid — editorial style with 0.5px dividers */}
      <div className="grid-editorial grid-cols-3 mb-8">
        {DIMENSION_ORDER.map((code, i) => (
          <div key={code} className="p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className="w-2 h-2"
                style={{ backgroundColor: DIM_COLORS[code], borderRadius: '1px' }}
              />
              <span className="font-serif text-sm italic text-fg3">{ROMAN[i]}</span>
            </div>
            <div className="text-sm font-semibold text-fg mb-0.5">
              {t(`dim.${code}.short`)}
            </div>
            <div className="text-xs text-fg3 leading-relaxed">
              {t(`dim.${code}.question`)}
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <label className="text-[10px] tracking-widest uppercase text-fg3 block mb-1.5">
            {t('welcome.orgLabel')}
          </label>
          <input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder={t('welcome.orgPlaceholder')}
            className="input-editorial"
          />
        </div>
        <div className="flex-1">
          <label className="text-[10px] tracking-widest uppercase text-fg3 block mb-1.5">
            {t('welcome.industryLabel')}
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="input-editorial appearance-none cursor-pointer"
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
      <div className="flex items-center gap-5">
        <button
          onClick={handleStart}
          className="bg-accent text-on-accent text-sm font-medium px-9 py-3 bg-accent-hover transition-default cursor-pointer"
        >
          {t('welcome.cta')}
        </button>
        <span className="text-xs text-fg3">
          {t('welcome.meta')}
        </span>
      </div>
    </div>
  );
}
