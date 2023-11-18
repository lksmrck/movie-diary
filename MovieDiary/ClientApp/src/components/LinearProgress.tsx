import React from "react";
import { LinearProgress as MUI_LinearProgress } from "@mui/material";
import { Theme } from "../common/theme";

const LinearProgress = () => {
  return (
    <MUI_LinearProgress
      sx={{
        "& .MuiLinearProgress-bar2Indeterminate": {
          backgroundColor: Theme.Color.teal_1,
        },
        "& .MuiLinearProgress-bar1Indeterminate": {
          backgroundColor: Theme.Color.teal_2,
        },
      }}
    />
  );
};

export default LinearProgress;
