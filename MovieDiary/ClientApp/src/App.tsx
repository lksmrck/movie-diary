import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Landing from "./pages/Landing.tsx";
import { Alert, Snackbar } from "@mui/material";
import useAppContext from "./store/AppContext.tsx";

const App = () => {
  const location = useLocation();

  const { error, setError } = useAppContext();

  return (
    <>
      <Snackbar
        open={error.isError}
        autoHideDuration={2000}
        onClose={() => setError({ isError: false, message: "" })}
      >
        <Alert
          onClose={() => setError({ isError: false, message: "" })}
          severity="error"
        >
          {error.message}
        </Alert>
      </Snackbar>
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
