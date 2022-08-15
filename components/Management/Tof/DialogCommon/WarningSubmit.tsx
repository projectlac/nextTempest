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
import newsApi from "../../../../api/newsApi";
import { useAppContext } from "../../../../context/state";
import tagApi from "../../../../api/tag";
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
  status: number;
  id: string;
}
export default function WarningSubmit({
  cancelDialog,
  status,
  id,
}: PropsDialogWarning) {
  const [open, setOpen] = React.useState(false);
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteAccountById = async (id: string) => {
    try {
      await tagApi.deleteAccount(id).then(() => {
        handleChangeMessageToast("Xóa tài khoản thành công");
        updated();
        handleChangeStatusToast();
      });
    } catch (error) {
      handleChangeMessageToast("Có lỗi xảy ra, vui lòng thử lại!");
      handleChangeStatusToast();
    }
  };
  const handleCloseAll = () => {
    setOpen(false);
    status !== 3 && cancelDialog();
    if (status === 3) {
      deleteAccountById(id);
    }
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
