import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Landing from "./pages/Landing.tsx";
import useAppContext from "./store/AppContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();

  return (
    <>
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
    </>
  );
};

export default App;
