import React, { useState } from "react";
import useScroll from "../../hooks/useScroll";

type Props = {
  scrollText: boolean;
  top: number;
  switchPosition: boolean;
};

const Title = ({ scrollText, top, switchPosition }: Props) => {
  const text = scrollText ? "Are you ready?" : "Welcome to the movie diary";

  return (
    <div
      className={`${!switchPosition ? "fixed" : "static"}  w-full`}
      style={{ top: `${switchPosition ? `${top}px` : "70px"}` }}
    >
      <div className="flex justify-center">
        <div>{text}</div>
      </div>
    </div>
  );
};

export default Title;
