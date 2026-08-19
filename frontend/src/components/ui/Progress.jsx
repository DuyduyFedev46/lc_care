// LC Care UI — ProgressBar + ProgressRing primitives
// Replaces ~6 inline progress bars and the SVG ring in CarePlanScreen.

import { G } from "../DesignTokens";

/**
 * Horizontal progress bar
 * @param {object} props
 * @param {number} props.value - 0..100
 * @param {string} [props.color] - fill color (CSS value)
 * @param {string} [props.bg] - track background
 * @param {number} [props.height=6]
 * @param {number|string} [props.radius=99]
 * @param {object} [props.style]
 */
export function ProgressBar({
  value = 0,
  color = "var(--theme, var(--success))",
  bg = "var(--hairline)",
  height = 6,
  radius = 99,
  style,
}) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        width: "100%",
        height,
        borderRadius: radius,
        background: bg,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: color,
          borderRadius: radius,
          transition: `width 0.4s var(--ease-out, ease)`,
        }}
      />
    </div>
  );
}

/**
 * Circular SVG progress ring (used in CarePlanScreen)
 * @param {object} props
 * @param {number} props.value - 0..100
 * @param {number} [props.size=80] - diameter in px
 * @param {number} [props.strokeWidth=8]
 * @param {string} [props.color] - stroke color
 * @param {string} [props.trackColor]
 * @param {React.ReactNode} [props.children] - center content
 */
export function ProgressRing({
  value = 0,
  size = 80,
  strokeWidth = 8,
  color = "var(--theme, var(--success))",
  trackColor = "var(--hairline)",
  children,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ display: "block" }}>
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: "stroke-dashoffset 0.5s var(--ease-out, ease)" }}
        />
      </svg>
      {children && (
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {children}
        </div>
      )}
    </div>
  );
}
