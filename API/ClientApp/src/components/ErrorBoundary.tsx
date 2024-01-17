import { Component, ErrorInfo, ReactNode } from "react";
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
    console.log("Error boundary cought Error");
    const log = async () => {
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
      console.log("y");
      return (
        <div className="h-screen w-screen flex justify-center">
          <h2 className=" mt-10 text-xl font-bold text-gray-800">
            An error occured in the application.
          </h2>
        </div>
      );
    }

    return children;
  }
}
export default ErrorBoundary;
