import { useState, useEffect } from "react";
import harry from "../../assets/backdrop_images/Harry_Potter_Bckdrp.jpg";
import twilight from "../../assets/backdrop_images/Twilight_Bckdrp.jpg";
import shades from "../../assets/backdrop_images/Fifty_shades_Bckdrp.jpg";
import { Box, Rating, Chip } from "@mui/material";
import Button from "../Button";
import Input from "../Input";
import { Theme } from "../../common/theme";
import "./LandingCard.css";
import { useNavigate } from "react-router-dom";

type Props = {
  className?: string;
  no: "1" | "2" | "3";
  leftRotate?: boolean;
  noRotate?: boolean;
};

const LandingCard = ({ className, no, leftRotate, noRotate }: Props) => {
  const [flipped, setFlipped] = useState(false);
  const [shouldRenderBackSide, setShouldRenderBackSide] = useState(false);
  const navigate = useNavigate();

  const dateWatched =
    no === "1" ? "1.12.2023" : no === "2" ? "24.12.2023" : "1.1.2024";
  const comment =
    no === "1"
      ? "This movie sucks! But my GF liked it"
      : no === "2"
      ? "RIP Dobby"
      : "Meh, I've seen better.";
  const rating = no === "1" ? 1 : no === "2" ? 5 : 2;
  const categories =
    no === "1"
      ? ["GFs picks", "Lovestory"]
      : no === "2"
      ? ["Spels and magic", "Long evenings"]
      : ["When bored", "Funny"];
  const image = no === "1" ? twilight : no === "2" ? harry : shades;

  useEffect(() => {
    if (flipped) {
      setTimeout(() => {
        setShouldRenderBackSide(true);
      }, 700);
    }
  }, [flipped]);

  const rotation = leftRotate ? "-rotate-12" : noRotate ? "" : "rotate-12";

  return (
    <div
      className={` h-112 w-64   rounded-lg  ${rotation} bg-black ${className} ${
        flipped ? "card " : ""
      } scale-75 md:scale-100  }`}
    >
      {flipped ? (
        shouldRenderBackSide && (
          <div className="card-back text-white flex flex-col justify-center h-full items-center ">
            <p>Not that easy.</p>
            <p>Sign in first, bro.</p>
            <Button
              color="primary"
              text="Sign In"
              variant="contained"
              handleClick={() => navigate("/login")}
              sx={{ marginTop: "1rem" }}
            />
          </div>
        )
      ) : (
        <div className="card-front  ">
          <div>
            <img
              alt="backdrop_image"
              src={image}
              width="300px"
              className="rounded-t-lg"
            />
          </div>
          <div className=" text-white [&>h3]:text-xs px-2">
            <Input
              variant="filled"
              name="dateWatched"
              label="Date watched"
              color={Theme.Color.teal_2}
              value={dateWatched}
              onChange={(e) => console.log("Y")}
              sx={{
                width: "10rem",
                height: "2rem",
                fontSize: ".5rem",
              }}
              size="small"
              InputProps={{ style: { fontSize: 12, color: "white" } }}
              InputLabelProps={{
                style: {
                  color: Theme.Color.teal_2,
                  fontWeight: "bold",
                },
              }}
            />
            <Input
              name="comment"
              label="Comment"
              variant="filled"
              multiline
              color={Theme.Color.teal_2}
              value={comment}
              onChange={(e) => console.log("Y")}
              sx={{
                width: "15rem",

                marginTop: ".5rem",
              }}
              InputProps={{ style: { fontSize: 12, color: "white" } }}
              InputLabelProps={{
                style: {
                  color: Theme.Color.teal_2,
                  fontWeight: "bold",
                },
              }}
            />

            <Rating
              name="rating"
              value={rating}
              onChange={(e) => console.log("Y")}
              size="small"
              sx={{
                border: `2px solid ${Theme.Color.teal_2}`,
                padding: ".3rem",
                marginTop: ".5rem",
                borderRadius: "4px",
                marginLeft: ".7rem",
              }}
            />
            <div className="ml-3">
              <h3
                className="mt-2  text-teal-700 font-bold"
                style={{ fontSize: 12 }}
              >
                Your categories
              </h3>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                  marginTop: ".5rem",
                }}
              >
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    sx={{ backgroundColor: "grey", fontSize: ".6rem" }}
                  />
                ))}
              </Box>
            </div>
            <div className="flex px-10 justify-between mt-9">
              <Button
                variant="contained"
                color="primary"
                text="Save"
                handleClick={() => setFlipped(true)}
                size="small"
              />
              <Button
                variant="outlined"
                color="secondary"
                text="Cancel"
                handleClick={() => console.log("Y")}
                size="small"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingCard;
