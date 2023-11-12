import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import { Movie } from "../../models/Movie";
import { useState } from "react";
import CommentModal from "./CommentModal";

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const hasComment = movie.comment?.text.length > 0;
  const hasRating = movie.rating.value > 0;

  return (
    <>
      <Card sx={{ width: 500 }}>
        <div className="flex">
          <CardActionArea sx={{ width: 100 }}>
            <CardMedia
              component="img"
              // image={process.env.REACT_APP_MOVIES_IMG_API + movie.posterPath}
              src={process.env.REACT_APP_MOVIES_IMG_API + movie.posterPath}
              sx={{
                height: "150px",
                width: "100px",
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
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => setCommentOpen(true)}
          >
            {hasComment ? "Show comment" : "Add comment"}
          </Button>
          <Button size="small" color="primary">
            {hasRating ? "Show comment" : "Add rating"}
          </Button>
        </CardActions>
      </Card>
      <CommentModal
        open={commentOpen}
        handleClose={() => setCommentOpen(false)}
        comment={movie.comment.text}
        title={movie.title}
      />
    </>
  );
};

export default MovieCard;
