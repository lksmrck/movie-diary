import { Box, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import Button from "../Button";
import { Theme } from "../../common/theme";

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  comment: string;
};

const CommentModal = ({ open, handleClose, comment, title }: Props) => {
  const style = {
    position: "absolute" as "absolute",
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: `2px solid ${Theme.Color.teal_2}`,
    borderRadius: Theme.BorderRadius.S,
    boxShadow: 24,
    p: 4,
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
          {`Comment of ${title}`}
        </Typography>
        <Typography id="comment" variant="body1" component="p">
          {comment}
        </Typography>

        <Button
          handleClick={handleClose}
          text="Zavřít"
          variant="outlined"
          color="primary"
        />
      </Box>
    </Modal>
  );
};

export default CommentModal;
