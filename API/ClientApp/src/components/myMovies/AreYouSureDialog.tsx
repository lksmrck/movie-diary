import { Box, Modal } from "@mui/material";
import Button from "../Button";

type Props = {
  open: boolean;
  purpose: string;
  handleClose: () => void;
  handleProceed: () => void;
  isLoading: boolean;
};

const AreYouSureDialog = ({
  open,
  handleClose,
  handleProceed,
  purpose,
  isLoading,
}: Props) => {
  const style = {
    position: "absolute" as "absolute",
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 150,
    bgcolor: "background.paper",
    borderRadius: "10px",
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
      <Box sx={style} className="w-96 md:w-125">
        <span> {`Are you sure you want to ${purpose}?`}</span>
        <div className="flex mt-5 justify-center">
          <Button
            handleClick={handleProceed}
            text={"Yes"}
            variant="contained"
            color="primary"
            withLoading
            loading={isLoading}
            sx={{ margin: "0 .5rem" }}
          />

          <Button
            handleClick={handleClose}
            text="No"
            variant="outlined"
            color="secondary"
            sx={{ margin: "0 .5rem" }}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default AreYouSureDialog;
