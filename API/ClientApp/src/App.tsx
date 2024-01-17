import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const location = useLocation();
  return (
    <>
    <ErrorBoundary>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {location.pathname === "/" ? (
        <Landing />
      ) : (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
      </ErrorBoundary>
    </>
  );
};

export default App;
