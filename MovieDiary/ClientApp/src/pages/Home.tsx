import React, { useState, useEffect } from "react";
import Title from "../components/home/Title";
import useScroll from "../hooks/useScroll";
import GreenCircle from "../assets/greenCircle.png";

const Home = () => {
  const { scrollPosition } = useScroll();

  // const [firstImageTop, setFirstImageTop] = useState(0);
  // const [firstImageLeft, setFirstImageLeft] = useState(0);

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
    <div className="relative h-full border border-red-700">
      {!shouldHideTitle && (
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
      <div className="h-screen"></div>
    </div>
  );
};

export default Home;
