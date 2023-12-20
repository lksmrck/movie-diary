import React, { Component, ErrorInfo, ReactNode } from "react";
import AxiosInstances from "../api/axiosInstances";
import { env } from "process";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // this.setState({ hasError: true });

    const log = async () => {
      //   await AxiosInstances.internal.post("url", { error: error.stack });
      console.log("Error boundary cought Error!");
    };
    if (env.ENV === "production") {
      log();
    }
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <>
          <h2>An error occured in the application.</h2>
        </>
      );
    }

    return children;
  }
}
export default ErrorBoundary;
