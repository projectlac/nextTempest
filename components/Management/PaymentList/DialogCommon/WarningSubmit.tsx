import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import audit from "../../../../api/audit";
import { useAppContext } from "../../../../context/state";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface PropsDialogWarning {
  id: string;
}
export default function WarningSubmit({ id }: PropsDialogWarning) {
  const { handleChangeStatusToast, handleChangeMessageToast, updated } =
    useAppContext();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAll = () => {
    audit
      .completedThisPack(id)
      .then((res) => {
        handleChangeMessageToast("Thay đổi thành công");
        handleChangeStatusToast();
        updated();
      })
      .catch((error) => {
        handleChangeMessageToast("Có lỗi xảy ra");
        handleChangeStatusToast();
      });
    setOpen(false);
  };
  return (
    <div>
      <KeyboardDoubleArrowUpIcon fontSize="medium" onClick={handleClickOpen} />

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
