import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { MoviesContextProvider } from "./store/MoviesContext";
import { AuthContextProvider } from "./store/AuthContext";
import { AppContextProvider } from "./store/AppContext";
import AxiosInterceptors from "./api/AxiosInterceptors";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <AppContextProvider>
      <AuthContextProvider>
        <MoviesContextProvider>
          <AxiosInterceptors>
              <div className="gradient-bg">
                <RouterProvider router={router} />
              </div>
          </AxiosInterceptors>
        </MoviesContextProvider>
      </AuthContextProvider>
    </AppContextProvider>
  </>
);
