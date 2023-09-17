import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Landing from "./pages/Landing.tsx";

const App = () => {
  const location = useLocation();

  return (
    <>
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
