import "../index.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import check_icon from "../assets/check_icon.png";
import LandingCard from "../components/landing/LandingCard";

const Landing = () => {
  const navigate = useNavigate();
  const listItems = [
    "Search for movie you watched",
    "Add it to your movies",
    "Add your rating, comment or own category",
    "See statistics of your watching",
    "Interact with other people",
  ];

  return (
    <div className="gradient-bg min-h-screen flex flex-col lg:flex-row overflow-hidden w-screen md:w-auto">
      {/* LEFT */}
      <section className=" m-24 mt-14 min-w-48 w-screen lg:w-1/3">
        <div className="flex">
          {/* <img src={tv_icon} className="tvIcon " width="40px" /> */}
          <h4 className="ml-3">
            <span className="text-white">MOVIE</span>{" "}
            <span className=" font-bold text-purple-900">D I A R Y</span>
          </h4>
        </div>
        <h1 className="py-10 text-5xl text-green-50  pb-96 md:pb-0 relative">
          Movie Diary
        </h1>
        <h2 className="w-80 py-24 text-2xl font-bold text-white pb-100 md:pb-0 border border-red-600">
          3000+ movies in database
        </h2>

        <ul className="text-green-50 [&>*]:mt-2 -mx-12 md:mx-0 py-5 md:py-0 w-96">
          {listItems.map((li) => (
            <div className="flex">
              <img
                alt="check-icon"
                width="15px"
                src={check_icon}
                className="checkIcon"
              />
              <li className="ml-3">{li}</li>
            </div>
          ))}
        </ul>
        <div className="flex mt-7">
          <Button
            color="primary"
            text="Sign In"
            variant="contained"
            handleClick={() => navigate("/login")}
          />
          <Button
            color="secondary"
            text="Register"
            variant="outlined"
            sx={{ marginLeft: "1rem" }}
            handleClick={() => navigate("/register")}
          />
        </div>
      </section>
      {/* RIGHT */}
      <section className="flex items-center h-full w-full lg:w-2/3 md:mt-28 ">
        <div className=" flex flex-col ml-10 [&>*]:ml-8 md:flex-row">
          <LandingCard className=" absolute md:static bottom-64 " no="1" />
          <LandingCard
            className=" md:mt-10 absolute md:static -bottom-60"
            no="2"
          />
          <LandingCard className="-mt-10 md:ml-10" no="3" />
        </div>
      </section>
    </div>
  );
};

export default Landing;
