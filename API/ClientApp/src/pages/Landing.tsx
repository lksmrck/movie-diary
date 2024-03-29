import "../index.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import check_icon from "../assets/check_icon.png";
import LandingCard from "../components/landing/LandingCard";
import useMediaQuery from "@mui/material/useMediaQuery";

const Landing = () => {
  const navigate = useNavigate();

  const maxMediumScreen = useMediaQuery("(max-width:1280px)");

  const listItems = [
    "Search for movie you watched",
    "Add it to your movies",
    "Add your rating, comment or own category",
    "See statistics of your watching",
    "Interact with other people",
  ];

  return (
    <div className="gradient-bg min-h-screen flex flex-col xl:flex-row overflow-hidden w-screen md:w-auto items-center justify-center xl:justify-start">
      {/* LEFT */}
      <section className=" m-0 xl:ml-24 mt-14 mr-5 w-1/3 min-w-105  flex xxl:block flex-col items-center justify-center xl:items-start ">
        <div className="flex">
          <h4 className="ml-3 xl:ml-0">
            <span className="font-bold text-white">W E L C O M E</span>
            <span className=" font-bold text-purple-900"> T O</span>
            <span className=" font-bold text-white"> Y O U R</span>
          </h4>
        </div>
        <h4 className=" py-10 text-5xl">
          <span className="font-bold text-white">MOVIE</span>{" "}
          <span className=" font-bold text-purple-900">D I A R Y</span>
        </h4>
        {maxMediumScreen && (
          <LandingCard className="mt-0 md:mt-10  " no="1" leftRotate />
        )}
        <h2 className="w-80 py-0 md:py-24 text-2xl font-bold text-white ">
          3000+ movies in database
        </h2>
        {maxMediumScreen && <LandingCard noRotate no="2" />}
        <div>
          <ul className="text-green-50 [&>*]:mt-2  w-96 md:mt-10 xxl:mt-0">
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
          <div className="flex mt-7 min-w-48">
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
        </div>
        {maxMediumScreen && (
          <LandingCard className=" md:ml-10 mt-0 md:mt-16 xxl:mt-0" no="3" />
        )}
      </section>
      {/* RIGHT */}
      {!maxMediumScreen && (
        <section
          className="flex items-center h-full w-full lg:w-2/3 md:mt-28"
          style={{ maxWidth: "865px" }}
        >
          <div className=" flex flex-col  [&>*]:ml-8 md:flex-row">
            <LandingCard className=" md:mt-20" leftRotate no="1" />
            <LandingCard className=" md:mt-10" noRotate no="2" />
            <LandingCard className="-mt-10 md:ml-10" no="3" />
          </div>
        </section>
      )}
    </div>
  );
};

export default Landing;
