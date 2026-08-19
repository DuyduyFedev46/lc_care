import { Component } from "react";
import i18n from "../i18n";
import { G } from "./DesignTokens";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", height: "100%", background: G.bg,
          padding: 24, fontFamily: '"Be Vietnam Pro", sans-serif',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: G.text, marginBottom: 8, textAlign: "center" }}>
            {i18n.t("error_occurred")}
          </div>
          <div style={{
            fontSize: 12, color: "#DC2626", background: "#FEF2F2",
            padding: 12, borderRadius: 12, maxWidth: 360, wordBreak: "break-word",
            lineHeight: 1.5, marginBottom: 4,
          }}>
            {this.state.error?.message || String(this.state.error)}
          </div>
          {this.state.errorInfo?.componentStack && (
            <details style={{ maxWidth: 360, marginTop: 4 }}>
              <summary style={{ fontSize: 11, color: G.textLight, cursor: "pointer" }}>{i18n.t("details")}</summary>
              <pre style={{ fontSize: 10, color: G.textMid, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          <button onClick={() => window.location.reload()} style={{
            marginTop: 24, height: 44, borderRadius: 14, background: "var(--brand)",
            color: "#FFF", border: "none", fontSize: 14, fontWeight: 700,
            cursor: "pointer", padding: "0 24px",
            fontFamily: '"Be Vietnam Pro", sans-serif',
          }}>
            {i18n.t("reload_page")}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
