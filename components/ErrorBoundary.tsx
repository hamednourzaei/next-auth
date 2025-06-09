"use client";

import React, { ErrorInfo } from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-100 text-red-700 rounded">
          <h2 className="text-xl font-bold mb-2">Something went wrong.</h2>
          <p>Try refreshing the page or come back later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
