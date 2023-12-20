import React, { useState, useEffect } from "react";
import Title from "../components/home/Title";
import useScroll from "../hooks/useScroll";
import GreenCircle from "../assets/greenCircle.png";
import "../index.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import check_icon from "../assets/check_icon.png";
import LandingCard from "../components/landing/LandingCard";

const Landing = () => {
  const { scrollPosition } = useScroll();

  // const [firstImageTop, setFirstImageTop] = useState(0);
  // const [firstImageLeft, setFirstImageLeft] = useState(0);
  const navigate = useNavigate();
  const [shouldAnimationInStart, setShouldAnimationInStart] = useState(false);
  const [shouldAnimationOutStart, setShouldAnimationOutStart] = useState(false);

  const shouldHideTitle = scrollPosition >= 350;
  const scrollState2 = scrollPosition > 100 && scrollPosition < 350;

  const listItems = [
    "Search for movie you watched",
    "Add it to your movies",
    "Add your rating, comment or own category",
    "See statistics of your watching",
    "Interact with other people",
  ];

  useEffect(() => {
    if (scrollPosition > 350) return;

    // setFirstImageTop(1.2 * scrollPosition);
    // setFirstImageLeft(1.1 * scrollPosition);
    if (scrollPosition > 50) {
      setShouldAnimationInStart(true);
      setShouldAnimationOutStart(false);
    } else {
      setShouldAnimationInStart(false);
      setShouldAnimationOutStart(true);
    }
  }, [scrollPosition]);

  return (
    <div className="gradient-bg h-screen flex">
      {/* LEFT */}
      <section className=" m-24 mt-14 w-1/3">
        <div className="flex">
          {/* <img src={tv_icon} className="tvIcon " width="40px" /> */}
          <h4 className="ml-3">
            <span className="text-white">MOVIE</span>{" "}
            <span className=" font-bold text-purple-900">D I A R Y</span>
          </h4>
        </div>
        <h1 className="py-10 text-5xl text-green-50">Movie Diary</h1>
        <h2 className=" py-24 text-2xl font-bold text-white">
          3000+ movies in database
        </h2>

        <ul className="text-green-50 [&>*]:mt-2">
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
      <section className="flex items-center  h-full  w-2/3 ">
        <div className=" flex ml-10 [&>*]:ml-8">
          <LandingCard className="" no="1" />
          <LandingCard className="mt-10" no="2" />
          <LandingCard className="ml-10" no="3" />
        </div>
      </section>
      {/* {!shouldHideTitle && (
      <>
        <Title
          scrollText={scrollState2}
          top={scrollPosition}
          switchPosition={scrollPosition > 300}
        />
        <div
          className={`fixed ${
            shouldAnimationInStart ? "animate-home_image_move_in" : ""
          } ${shouldAnimationOutStart ? "animate-home_image_move_out" : ""}`}
          style={{ top: 0, left: 0 }}
        >
          <img src={GreenCircle} />
        </div>
      </>
    )}

    <div className="h-screen"></div>
    <div className="h-screen"></div> */}
    </div>
  );
};

export default Landing;
