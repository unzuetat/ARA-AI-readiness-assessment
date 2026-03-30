import { DIMENSION_ORDER } from '../../data/dimensions';
import { useTranslation } from '../../i18n';
import type { DimensionCode, DimensionScore } from '../../types';

interface RadarChartProps {
  scores: Record<DimensionCode, DimensionScore>;
  benchmarkScores?: Record<DimensionCode, number>;
  size?: number;
}

const ANGLES = [
  -Math.PI / 2,           // top (STR)
  -Math.PI / 2 + Math.PI / 3,   // top-right (DAT)
  -Math.PI / 2 + (2 * Math.PI) / 3, // bottom-right (TAL)
  Math.PI / 2,            // bottom (GOV)
  Math.PI / 2 + Math.PI / 3,    // bottom-left (CUL)
  Math.PI / 2 + (2 * Math.PI) / 3,  // top-left (PRO)
];

function polarToXY(angle: number, radius: number, cx: number, cy: number): [number, number] {
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
}

function makePolygonPoints(values: number[], maxVal: number, maxRadius: number, cx: number, cy: number): string {
  return values
    .map((val, i) => {
      const r = (val / maxVal) * maxRadius;
      const [x, y] = polarToXY(ANGLES[i], r, cx, cy);
      return `${x},${y}`;
    })
    .join(' ');
}

function makeGridPolygon(level: number, maxRadius: number, cx: number, cy: number): string {
  const r = (level / 5) * maxRadius;
  return ANGLES.map((angle) => {
    const [x, y] = polarToXY(angle, r, cx, cy);
    return `${x},${y}`;
  }).join(' ');
}

export default function RadarChart({ scores, benchmarkScores, size = 320 }: RadarChartProps) {
  const { t } = useTranslation();

  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.38;
  const labelRadius = size * 0.46;

  const scoreValues = DIMENSION_ORDER.map((dim) => scores[dim].adjusted ?? scores[dim].raw);

  const benchmarkValues = benchmarkScores
    ? DIMENSION_ORDER.map((dim) => benchmarkScores[dim])
    : null;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full max-w-sm mx-auto">
      {/* Grid rings */}
      {[1, 2, 3, 4, 5].map((level) => (
        <polygon
          key={level}
          points={makeGridPolygon(level, maxRadius, cx, cy)}
          fill="none"
          stroke="var(--border)"
          strokeWidth={level === 5 ? 0.5 : 0.3}
        />
      ))}

      {/* Axes */}
      {ANGLES.map((angle, i) => {
        const [x2, y2] = polarToXY(angle, maxRadius, cx, cy);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x2}
            y2={y2}
            stroke="var(--border)"
            strokeWidth={0.3}
          />
        );
      })}

      {/* Benchmark overlay (if provided) */}
      {benchmarkValues && (
        <polygon
          points={makePolygonPoints(benchmarkValues, 5, maxRadius, cx, cy)}
          fill="var(--border)"
          fillOpacity={0.08}
          stroke="var(--border)"
          strokeWidth={1}
          strokeDasharray="4 3"
        />
      )}

      {/* Score polygon */}
      <polygon
        points={makePolygonPoints(scoreValues, 5, maxRadius, cx, cy)}
        fill="var(--radar-fill)"
        stroke="var(--radar-stroke)"
        strokeWidth={1.5}
      />

      {/* Score dots */}
      {scoreValues.map((val, i) => {
        const r = (val / 5) * maxRadius;
        const [x, y] = polarToXY(ANGLES[i], r, cx, cy);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={3}
            fill="var(--radar-stroke)"
          />
        );
      })}

      {/* Dimension labels */}
      {DIMENSION_ORDER.map((dim, i) => {
        const [x, y] = polarToXY(ANGLES[i], labelRadius, cx, cy);
        const score = scoreValues[i];
        return (
          <g key={dim}>
            <text
              x={x}
              y={y - 6}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--text-secondary)"
              fontSize="11"
              fontFamily="Source Sans 3, sans-serif"
              fontWeight="600"
            >
              {t(`dim.${dim}.short`)}
            </text>
            <text
              x={x}
              y={y + 8}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--text-tertiary)"
              fontSize="10"
              fontFamily="Source Sans 3, sans-serif"
            >
              {score.toFixed(1)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
