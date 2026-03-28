import { useTranslation } from '../../i18n';
import type { DimensionCode } from '../../types';

interface DimensionHeaderProps {
  code: DimensionCode;
}

const BORDER_COLORS: Record<DimensionCode, string> = {
  STR: 'border-dimension-str',
  DAT: 'border-dimension-dat',
  TAL: 'border-dimension-tal',
  GOV: 'border-dimension-gov',
  CUL: 'border-dimension-cul',
  PRO: 'border-dimension-pro',
};

const TEXT_COLORS: Record<DimensionCode, string> = {
  STR: 'text-dimension-str',
  DAT: 'text-dimension-dat',
  TAL: 'text-dimension-tal',
  GOV: 'text-dimension-gov',
  CUL: 'text-dimension-cul',
  PRO: 'text-dimension-pro',
};

const BG_COLORS: Record<DimensionCode, string> = {
  STR: 'bg-dimension-str/10',
  DAT: 'bg-dimension-dat/10',
  TAL: 'bg-dimension-tal/10',
  GOV: 'bg-dimension-gov/10',
  CUL: 'bg-dimension-cul/10',
  PRO: 'bg-dimension-pro/10',
};

export default function DimensionHeader({ code }: DimensionHeaderProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`border-l-2 ${BORDER_COLORS[code]} pl-4 py-1 ${BG_COLORS[code]} rounded-r`}
    >
      <div className={`text-xs font-semibold uppercase tracking-wider ${TEXT_COLORS[code]}`}>
        {t(`dim.${code}.short`)}
      </div>
      <div className="text-sm text-content-tertiary mt-0.5">
        {t(`dim.${code}.question`)}
      </div>
    </div>
  );
}
