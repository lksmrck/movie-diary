import {
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import { Movie } from "../../models/Movie";
import { useEffect, useRef, useState } from "react";
import CommentModal from "./CommentModal";
import Button from "../Button";
import { Theme } from "../../common/theme";
import AreYouSureDialog from "./AreYouSureDialog";
import agent from "../../api/agent";
import useAuthContext from "../../store/AuthContext";
import useMoviesContext from "../../store/MoviesContext";

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [
    areYouSureDialogOpen_deleteMovie,
    setAreYouSureDialogOpen_deleteMovie,
  ] = useState(false);
  const [
    areYouSureDialogOpen_updateRating,
    setAreYouSureDialogOpen_updateRating,
  ] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ratingToUpdate, setRatingToUpdate] = useState(0);

  const cardRef = useRef(null);

  const { currentUser } = useAuthContext();
  const { setUserMovies } = useMoviesContext();

  const hasComment = movie.comment?.text?.length > 0;

  const handleDeleteMovie = async () => {
    setIsLoading(true);
    await agent.Movies.delete(movie.id!);
    const res = await agent.Movies.getAll(currentUser?.id!);
    if (res?.isSuccess) setUserMovies(res.result);
    setAreYouSureDialogOpen_deleteMovie(false);
    setIsLoading(false);
  };

  const handleCreateOrEditRating = async () => {
    setIsLoading(true);
    await agent.Ratings.createOrEdit({
      id: movie.rating?.id,
      value: ratingToUpdate,
      movieID: movie.id!,
      userID: currentUser!.id,
    });
    const res = await agent.Movies.getAll(currentUser?.id!);
    if (res?.isSuccess) setUserMovies(res.result);
    setRatingToUpdate(0);
    setAreYouSureDialogOpen_updateRating(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!areYouSureDialogOpen_updateRating && cardRef?.current) {
      (cardRef.current as HTMLImageElement).focus();
    }
  }, [areYouSureDialogOpen_updateRating]);

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={4}
      xl={3}
      className="flex justify-center lg:justify-start  "
      sx={{ minWidth: "445px" }}
    >
      <Card
        sx={{
          height: 420,
          position: "relative",
          border: `1px solid ${Theme.Color.grey_3}`,
          borderRadius: "10px",
          backgroundColor: Theme.Color.grey_2,
          // maxWidth: "93vw",
          maxWidth: "565px",
          width: "100%",
        }}
        className=""
      >
        {/* Img and Text */}
        <div className="flex h-64 border-b-2 border-grey-100 shadow-sm overflow-auto p-2">
          <CardActionArea sx={{ width: 120 }}>
            <CardMedia
              ref={cardRef}
              component="img"
              // image={process.env.REACT_APP_MOVIES_IMG_API + movie.posterPath}
              src={import.meta.env.VITE_MOVIES_IMG_API + movie.posterPath}
              sx={{
                height: "150px",
                width: "120px",
              }}
            />
          </CardActionArea>
          <CardContent sx={{ width: 400 }}>
            <Typography gutterBottom variant="h6" component="div">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.description}
            </Typography>
          </CardContent>
        </div>
        {/* Categories */}
        <div className="p-2 [&>*]:ml-2">
          {movie.defaultCategories.map((dc) => (
            <Chip
              label={dc}
              className="not:first:m-2"
              sx={{ fontSize: ".6rem", marginTop: ".4rem" }}
            />
          ))}
          {movie.userCategories.map((c) => (
            <Chip
              label={c.name}
              className=" not:first:m-2"
              sx={{
                backgroundColor: "#9f9f9f",
                fontSize: ".6rem",
                marginTop: ".4rem",
              }}
            />
          ))}
        </div>
        {/* Comment and Rating */}
        <CardActions
          sx={{
            position: "absolute",
            bottom: 0,
            fontSize: ".8rem",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="p-2 ">
            <h2>Your comment</h2>
            <Button
              color="primary"
              text={hasComment ? "Show comment" : "Add comment"}
              variant="contained"
              handleClick={() => setCommentOpen(true)}
              size="small"
            />
          </div>
          <div>
            <h2>Your rating</h2>
            <Rating
              name="rating"
              value={movie.rating?.value}
              max={10}
              precision={0.5}
              size={"small"}
              onFocus={(e) => console.log(e)}
              onFocusCapture={(e) => console.log(e)}
              onChange={(e: any, nw: any) => {
                setRatingToUpdate(e.target.value);
                setAreYouSureDialogOpen_updateRating(true);
              }}
            />
          </div>
          <div className="mt-5 pr-2">
            <Button
              color="red"
              text="X"
              variant="contained"
              handleClick={() => setAreYouSureDialogOpen_deleteMovie(true)}
              size="small"
              sx={{ minWidth: "2rem" }}
            />
          </div>
        </CardActions>
      </Card>
      <CommentModal
        open={commentOpen}
        handleClose={() => setCommentOpen(false)}
        comment={movie.comment}
        title={movie.title}
        movieID={movie.id}
      />
      <AreYouSureDialog
        open={areYouSureDialogOpen_deleteMovie}
        handleClose={() => setAreYouSureDialogOpen_deleteMovie(false)}
        handleProceed={handleDeleteMovie}
        purpose="delete movie"
        isLoading={isLoading}
      />
      <AreYouSureDialog
        open={areYouSureDialogOpen_updateRating}
        handleClose={() => setAreYouSureDialogOpen_updateRating(false)}
        handleProceed={handleCreateOrEditRating}
        purpose="update rating"
        isLoading={isLoading}
      />
    </Grid>
  );
};

export default MovieCard;
