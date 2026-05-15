import { Component, ReactNode } from "react";

interface State { hasError: boolean }

class ICPErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: unknown) { console.error("ICP section error:", error); }
  render() {
    if (this.state.hasError) {
      return (
        <section className="mb-16">
          <div className="bg-card rounded-lg p-6 text-sm text-muted-foreground italic">
            Error rendering ICP data
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

export default ICPErrorBoundary;
