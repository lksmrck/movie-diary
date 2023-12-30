import "../index.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="gradient-bg h-screenWithoutNavbar flex">
      {/* LEFT */}
      <section className="ml-10 mt-10">
        <h4 className="">
          <span className="text-white">SOME</span>{" "}
          <span className=" font-bold text-purple-900">T H I N G</span>
        </h4>
        <h1 className="py-10 text-5xl text-green-50">WILL BE HERE</h1>
        <h2 className=" py-16 text-2xl font-bold text-white">
          Meanwhile you can go to:
        </h2>
        <div className="flex mt-1">
          <Button
            color="primary"
            text="My Movies"
            variant="contained"
            handleClick={() => navigate("/my-movies")}
          />
          <Button
            color="secondary"
            text="Add Movie"
            variant="outlined"
            sx={{ marginLeft: "1rem" }}
            handleClick={() => navigate("/add-movie")}
          />
        </div>
      </section>
      {/* RIGHT */}
      <section className=""></section>
    </div>
  );
};

export default Home;
