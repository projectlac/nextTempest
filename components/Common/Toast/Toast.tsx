import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface PropsToast {
  openToast: boolean;
  messageToast: string;
  handleCloseToast: (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => void;
}
export default function Toast({
  openToast,
  messageToast,
  handleCloseToast,
}: PropsToast) {
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleCloseToast}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseToast}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={openToast}
      autoHideDuration={6000}
      onClose={handleCloseToast}
      message={messageToast}
      action={action}
      key={"top right"}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        "& .MuiSnackbarContent-root": {
          background: "#f2eee9",
          color: "#000",
        },
      }}
    />
  );
}
