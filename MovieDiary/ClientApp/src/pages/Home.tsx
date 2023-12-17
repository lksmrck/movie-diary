import React, { useState, useEffect } from "react";
import Title from "../components/home/Title";
import useScroll from "../hooks/useScroll";
import GreenCircle from "../assets/greenCircle.png";
import "../index.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { scrollPosition } = useScroll();

  // const [firstImageTop, setFirstImageTop] = useState(0);
  // const [firstImageLeft, setFirstImageLeft] = useState(0);
  const navigate = useNavigate();
  const [shouldAnimationInStart, setShouldAnimationInStart] = useState(false);
  const [shouldAnimationOutStart, setShouldAnimationOutStart] = useState(false);

  const shouldHideTitle = scrollPosition >= 350;
  const scrollState2 = scrollPosition > 100 && scrollPosition < 350;

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
    <div className="gradient-bg h-screenWithoutNavbar flex">
      {/* LEFT */}
      <section className="ml-10 mt-10">
        <h4 className="">
          <span className="text-white">SOME</span>{" "}
          <span className=" font-bold text-purple-900">T H I N G</span>
        </h4>
        <h1 className="py-10 text-5xl text-green-50">Will Be Here</h1>
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

export default Home;
