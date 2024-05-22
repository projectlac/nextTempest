import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import { useAppContext } from "../../../../../context/state";
import tagApi from "../../../../../api/tag";
const ButtonError = styled(Button)(
  ({ theme }) => `
     background: red;
     color: #fff;

     &:hover {
        background: red;
     }
    `
);

const ButtonUpdate = styled(Button)(
  ({ theme }) => `
     background: green;
     color: #fff;

     &:hover {
        background: green;
     }
    `
);

interface IBulk {
  selectedCryptoOrders: string[];
  resetSelected: () => void;
}
function DialogBulkUpdate({ selectedCryptoOrders, resetSelected }: IBulk) {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    tagApi
      .updateDayMultiAccount(selectedCryptoOrders)
      .then(() => {
        resetSelected();
        handleChangeStatusToast();
        updated();
        handleChangeMessageToast("Cập nhật thành công");
        setOpen(false);
      })
      .catch(() => {
        handleChangeStatusToast();
        updated();
        handleChangeMessageToast("Có lỗi xảy ra, vui lòng thử lại");
      });
  };

  const deleteAll = () => {
    setOpen(true);
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Box display="flex" alignItems="center">
          <Typography color="text.secondary">
            Cập nhật {selectedCryptoOrders.length} tài khoản
          </Typography>
          <ButtonUpdate
            sx={{ ml: 1 }}
            startIcon={<UpdateIcon />}
            variant="contained"
            onClick={deleteAll}
          >
            Cập nhật
          </ButtonUpdate>
        </Box>
      </Box>
      <Dialog
        open={open}
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
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Xác nhận
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
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
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Xác nhận
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogBulkUpdate;
