import React, { useRef } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import { List } from "@mui/material";
import { useClickOutside } from "../../hooks/hooks";
import { formatDate } from "../../utils/formatDate";
import { Theme } from "../../common/theme";

type Props = {
  items: any;
  onSelectMovie: (movie: any) => void;
  onClose: () => void;
};

const FoundMovies = ({ items, onSelectMovie, onClose }: Props) => {
  const listRef = useRef(null);
  useClickOutside(listRef, onClose);

  return (
    <List
      ref={listRef}
      sx={{
        width: "100%",
        overflow: "auto",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "absolute",
        zIndex: 20,
        borderBottom: `1px solid ${Theme.Color.grey_3}`,
        borderLeft: `1px solid ${Theme.Color.grey_3}`,
        paddingTop: 0,
      }}
      className="max-h-72"
    >
      {items.map((data: any) => (
        <ListItem
          disablePadding
          alignItems="flex-start"
          onClick={() => onSelectMovie(data)}
          sx={{
            borderTop: `1px solid ${Theme.Color.grey_2}`,
            borderBottom: `1px solid ${Theme.Color.grey_2}`,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: Theme.Color.grey_1,
            },
          }}
          className="pb-2"
        >
          <ListItemAvatar>
            <img
              alt="poster"
              src={import.meta.env.VITE_MOVIES_IMG_API + data.poster_path}
              width="72px"
              style={{ objectFit: "cover", marginLeft: ".25rem" }}
            />
          </ListItemAvatar>
          <ListItemText
            className="ml-3"
            primary={data.title}
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Released in
                </Typography>
                {` — ${formatDate(data.release_date, true)}`}
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default FoundMovies;
