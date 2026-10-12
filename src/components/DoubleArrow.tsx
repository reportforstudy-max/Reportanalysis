import React from 'react';

interface DoubleArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  offsetStart?: number;
  offsetEnd?: number;
  strokeColor?: string;
  strokeWidth?: number;
  gap?: number;
  isAnimated?: boolean;
  theme?: string;
}

export const DoubleArrow: React.FC<DoubleArrowProps> = ({
  x1,
  y1,
  x2,
  y2,
  offsetStart = 55,
  offsetEnd = 65,
  strokeColor,
  strokeWidth = 1.5,
  gap = 4.5,
  isAnimated = false,
  theme = 'white-paper',
}) => {
  // Calculate angle and distance
  const dx = x2 - x1;
  const dy = y2 - y1;
  const angle = Math.atan2(dy, dx);
  const length = Math.sqrt(dx * dx + dy * dy);

  // Apply start and end offsets so arrows don't collide with node centers
  const startDist = Math.min(offsetStart, length * 0.3);
  const endDist = Math.max(startDist + 20, length - offsetEnd);

  const startX = x1 + Math.cos(angle) * startDist;
  const startY = y1 + Math.sin(angle) * startDist;
  const endX = x1 + Math.cos(angle) * endDist;
  const endY = y1 + Math.sin(angle) * endDist;

  // Perpendicular vector for parallel double lines
  const perpX = -Math.sin(angle) * (gap / 2);
  const perpY = Math.cos(angle) * (gap / 2);

  // Line 1 coords
  const l1x1 = startX + perpX;
  const l1y1 = startY + perpY;
  const l1x2 = endX + perpX;
  const l1y2 = endY + perpY;

  // Line 2 coords
  const l2x1 = startX - perpX;
  const l2y1 = startY - perpY;
  const l2x2 = endX - perpX;
  const l2y2 = endY - perpY;

  // Arrowhead points
  const headLength = 11;
  const headWidth = gap + 6;
  const tipX = endX + Math.cos(angle) * (headLength * 0.9);
  const tipY = endY + Math.sin(angle) * (headLength * 0.9);

  const arrowLeftX = endX - Math.sin(angle) * headWidth;
  const arrowLeftY = endY + Math.cos(angle) * headWidth;

  const arrowRightX = endX + Math.sin(angle) * headWidth;
  const arrowRightY = endY - Math.cos(angle) * headWidth;

  // Color selection based on theme or custom strokeColor
  const defaultStroke = theme === 'white-paper' 
    ? '#1e293b' 
    : theme === 'dark-slate' 
      ? '#38bdf8' 
      : theme === 'emerald-finance'
        ? '#059669'
        : '#2563eb';

  const finalStroke = strokeColor || defaultStroke;

  return (
    <g className="transition-all duration-300 pointer-events-none">
      {/* Outer subtle glow for premium themes */}
      {theme !== 'white-paper' && (
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={finalStroke}
          strokeWidth={gap + 4}
          strokeOpacity={0.12}
          strokeLinecap="round"
        />
      )}

      {/* Double parallel lines */}
      <line
        x1={l1x1}
        y1={l1y1}
        x2={l1x2}
        y2={l1y2}
        stroke={finalStroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={isAnimated ? '6 3' : 'none'}
        className={isAnimated ? 'animate-pulse' : ''}
      />
      <line
        x1={l2x1}
        y1={l2y1}
        x2={l2x2}
        y2={l2y2}
        stroke={finalStroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={isAnimated ? '6 3' : 'none'}
        className={isAnimated ? 'animate-pulse' : ''}
      />

      {/* Arrowhead double lines */}
      <path
        d={`M ${arrowLeftX} ${arrowLeftY} L ${tipX} ${tipY} L ${arrowRightX} ${arrowRightY}`}
        fill="none"
        stroke={finalStroke}
        strokeWidth={strokeWidth + 0.3}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Small center pulse dot */}
      <circle
        cx={(startX + endX) / 2}
        cy={(startY + endY) / 2}
        r={2}
        fill={finalStroke}
        fillOpacity={0.6}
      />
    </g>
  );
};
