import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Landing from "./pages/Landing.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthContext from "./store/AuthContext.tsx";

const App = () => {
  const location = useLocation();
  const { currentUser } = useAuthContext();

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
          {currentUser && <Navbar />}
          <Outlet />
        </>
      )}
    </>
  );
};

export default App;
