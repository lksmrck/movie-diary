import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";

const MovieCard = () => {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <div className="flex">
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            src="https://image.tmdb.org/t/p/w1280/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg"
            alt="green iguana"
          />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Harry Potter and Philosophers Stone
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </div>
      <CardActions>
        <Button size="small" color="primary">
          Add comment
        </Button>
        <Button size="small" color="primary">
          Add rating
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
