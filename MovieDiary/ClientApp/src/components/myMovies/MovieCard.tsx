import {
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    Rating,
    Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import { Movie } from "../../models/Movie";
import { useState } from "react";
import CommentModal from "./CommentModal";
import Button from "../Button";
import { Theme } from "../../common/theme";

type Props = {
    movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
    const [commentOpen, setCommentOpen] = useState(false);
    const hasComment = movie.comment?.text?.length > 0;
    const hasRating = movie.rating.value > 0;

    return (
        <>
            <Card
                sx={{
                    width: 450,
                    height: 380,
                    position: "relative",
                    border: `1px solid ${Theme.Color.grey_3}`,
                }}
            >
                {/* Img and Text */}
                <div className="flex h-64 border-b-2 border-grey-100 shadow-sm overflow-auto p-2">
                    <CardActionArea sx={{ width: 120 }}>
                        <CardMedia
                            component="img"
                            // image={process.env.REACT_APP_MOVIES_IMG_API + movie.posterPath}
                            src={process.env.REACT_APP_MOVIES_IMG_API + movie.posterPath}
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
                {/* [&>*:not(:first-child)] */}
                <div className="p-2 [&>*]:ml-2">
                    {movie.categories.map((c) => (
                        <Chip
                            label={typeof c != "string" ? c.name : c}
                            className=" not:first:m-2"
                        />
                    ))}
                </div>
                {/* Comment and Rating */}
                <CardActions sx={{ position: "absolute", bottom: 0 }}>
                    <div className="p-2">
                        <h2>Your comment</h2>
                        <Button
                            color="primary"
                            text={hasComment ? "Show comment" : "Add comment"}
                            variant="contained"
                            handleClick={() => setCommentOpen(true)}
                        />
                    </div>
                    <div>
                        <h2>Your rating</h2>
                        <Rating name="read-only" value={movie.rating.value} readOnly />
                    </div>
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
