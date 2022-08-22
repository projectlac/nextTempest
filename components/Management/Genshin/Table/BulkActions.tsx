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
import tagApi from "../../../../api/tag";
import { useState } from "react";
import { useAppContext } from "../../../../context/state";

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: red;
     color: #fff;

     &:hover {
        background: red;
     }
    `
);
interface IBulk {
  selectedCryptoOrders: string[];
  resetSelected: () => void;
}
function BulkActions({ selectedCryptoOrders, resetSelected }: IBulk) {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAll = () => {
    tagApi
      .deleteMultiAccount({ ids: selectedCryptoOrders })
      .then(() => {
        resetSelected();
        handleChangeStatusToast();
        updated();
        handleChangeMessageToast("Xóa thành công");
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
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography color="text.secondary">Xóa 10 tài khoản</Typography>
          <ButtonError
            sx={{ ml: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
            onClick={deleteAll}
          >
            Delete
          </ButtonError>
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
          <Button onClick={handleCloseAll} variant="contained" color="primary">
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

export default BulkActions;
