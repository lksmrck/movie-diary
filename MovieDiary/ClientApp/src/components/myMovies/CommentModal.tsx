import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import Button from "../Button";
import { Theme } from "../../common/theme";
import Input from "../Input";
import agent from "../../api/agent";
import { Comment } from "../../models/Movie";
import useAuthContext from "../../store/AuthContext";

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  comment: Comment;
  movieID: string | undefined;
};

const CommentModal = ({
  open,
  handleClose,
  comment,
  title,
  movieID,
}: Props) => {
  const style = {
    position: "absolute" as "absolute",
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 400,
    bgcolor: "background.paper",
    // border: `2px solid ${Theme.Color.teal_2}`,
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const [localComment, setLocalComment] = useState(() => comment?.text);
  const [editStarted, setEditStarted] = useState(() => !comment?.text);
  const [editedComment, setEditedComment] = useState("");
  const { currentUser } = useAuthContext();

  const handleEditComment = async () => {
    if (!editStarted) {
      setEditStarted(true);
      setEditedComment(comment.text);
    }
    if (editStarted) {
      const res = await agent.Comments.createOrEdit({
        id: comment?.id!,
        text: editedComment,
        movieID: movieID ?? "",
        userID: currentUser!.id,
      });

      if (res?.isSuccess) {
        setLocalComment(res?.result.text);
        setEditedComment(res?.result.text);
      }
      setEditStarted(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="title" variant="h6" component="h2">
          Comment of <Box component="span">{title}</Box>
        </Typography>
        {editStarted ? (
          <Input
            name="comment"
            label="Comment"
            multiline
            color={Theme.Color.teal_2}
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            rows={6}
            sx={{ width: "630px", marginTop: "1rem" }}
          />
        ) : (
          <Box
            component="div"
            sx={{
              whiteSpace: "normal",
              my: 2,
              p: 1,
              backgroundColor: "#f5f5f5",
              border: "1px solid",
              borderColor: "#f5f5f5",
              borderRadius: 2,
              fontSize: "0.875rem",
              fontWeight: "700",
              height: 200,
            }}
          >
            {localComment}
          </Box>
        )}

        <Button
          handleClick={handleEditComment}
          text={editStarted ? "Submit" : "Edit"}
          variant="contained"
          color="primary"
          sx={{ marginTop: "2rem" }}
        />

        <Button
          handleClick={() => {
            handleClose();
            setEditStarted(false);
          }}
          text="Close"
          variant="outlined"
          color="secondary"
          sx={{ marginTop: ".5rem" }}
        />
      </Box>
    </Modal>
  );
};

export default CommentModal;
