// LC Care UI — Screen primitive
// Scaffold: flex column + header safe-area + scrollable body + bottom padding
// Replaces the repeated display:flex/flexDirection:column/height:100% pattern

import { G } from "../DesignTokens";

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {"clinic"|"garden"|"dark"} [props.theme="clinic"]
 * @param {string} [props.bg] - override background
 * @param {object} [props.style] - extra styles on root div
 */
export default function Screen({ children, theme = "clinic", bg, style }) {
  const backgrounds = {
    clinic: G.bg,
    garden: G.gardenWarmBg,
    dark:   G.darkBg,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        fontFamily: '"Be Vietnam Pro", sans-serif',
        overflowY: "hidden",
        background: bg ?? backgrounds[theme] ?? G.bg,
        position: "relative",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Scrollable body area within a Screen.
 * Use instead of manually adding overflowY: auto everywhere.
 */
export function ScreenBody({ children, style }) {
  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
