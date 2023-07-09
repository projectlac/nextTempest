import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useFormik } from "formik";
import Image from "next/image";
import * as React from "react";
import * as yup from "yup";
import codeApi from "../../../../api/codeApi";
import { useAppContext } from "../../../../context/state";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface IEditCodeProps {
  slug: string;
}
export default function EditCodeCategory({ slug }: IEditCodeProps) {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();

  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    setLoading(true);
    codeApi
      .deleteCodeCategory(slug)
      .then((res) => {
        handleChangeMessageToast("Xóa thành công");
        handleChangeStatusToast();
        handleClose();
        updated();
      })
      .catch(() => {
        handleChangeMessageToast("Có lỗi xảy ra");
        handleChangeStatusToast();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="error"
        sx={{ fontFamily: "Montserrat" }}
      >
        Xóa
      </Button>

      <Dialog
        open={open}
        maxWidth="xs"
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
          Xóa danh mục
        </DialogTitle>

        <DialogContent>
          Bạn có chắc muốn thực hiện thao tác này. Khi đã thức hiện sẽ không thể
          hoàn tác!
        </DialogContent>
        <DialogActions
          sx={{
            padding: "15px",
            "& button": {
              fontFamily: "Montserrat",
            },
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={submit}
          >
            {loading ? (
              <CircularProgress sx={{ color: "#fff" }} size={24} />
            ) : (
              "Xác nhận"
            )}
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
