import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { Box, TextField } from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface PropsDialogWarning {
  cancelDialog?: () => void;
  handleOnSubmit?: () => void;
  status: number;
  id: string;
}
export default function WarningSubmit({
  cancelDialog,
  status,
  handleOnSubmit,
  id,
}: PropsDialogWarning) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAll = () => {
    setOpen(false);
    handleOnSubmit();
    status !== 3 && cancelDialog();
  };
  return (
    <div>
      {status === 3 ? (
        <DeleteTwoToneIcon fontSize="small" onClick={handleClickOpen} />
      ) : (
        <Button
          onClick={handleClickOpen}
          variant="contained"
          sx={{ fontFamily: "Montserrat" }}
        >
          Xác nhận
        </Button>
      )}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            fontFamily: "Montserrat",
          }}
        >
          Bạn có chắc chắc muốn thực hiện thao tác này?
        </DialogTitle>

        <DialogActions
          sx={{
            padding: "15px",
            "& button": {
              fontFamily: "Montserrat",
            },
          }}
        >
          <Button onClick={handleCloseAll} variant="contained" color="primary">
            Xác nhận
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
