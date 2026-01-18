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
import CachedIcon from "@mui/icons-material/Cached";

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
export default function Refund({ id }: PropsDialogWarning) {
  const [open, setOpen] = React.useState(false);
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const refundAccountById = async (id: string) => {
    try {
      await tagApi.refundAccount(id).then(() => {
        handleChangeMessageToast("Thay đổi trạng thái thành công");
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
    refundAccountById(id);
  };
  return (
    <div>
      <CachedIcon fontSize="small" onClick={handleClickOpen} />

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
