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
import WarningSubmit from "./WarningSubmit";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditSmileCoin() {
  const [open, setOpen] = React.useState(false);
  const [coin, setCoin] = React.useState<number>(10);
  const [mode, setMode] = React.useState<boolean>(true);

  const [coinChange, setCoinChange] = React.useState<number>(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeCoin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoinChange(+e.target.value);
  };

  const chageMode = (mode: boolean) => {
    setMode(mode);
  };
  return (
    <div>
      <CurrencyExchangeIcon fontSize="small" onClick={handleClickOpen} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="sm"
        fullWidth={true}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Chỉnh sửa số Smile Coin hiện tại</DialogTitle>
        <DialogContent>
          <Box textAlign={"center"}>
            <Box mt={2} mb={2}>
              Smile hiện có: {coin} {mode ? "+" : "-"} {coinChange}
            </Box>

            <Box mb={3}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 3 }}
                onClick={() => {
                  chageMode(true);
                }}
              >
                Thêm
              </Button>
              <Button
                variant="contained"
                color="warning"
                disabled={coin > 0 && coin > coinChange ? false : true}
                onClick={() => {
                  chageMode(false);
                }}
              >
                Bớt
              </Button>
            </Box>

            <Box
              width={300}
              sx={{
                margin: "0 auto",
              }}
            >
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                label="Số lượng"
                type="number"
                variant="outlined"
                InputProps={{ inputProps: { min: 0, max: 99999999 } }}
                onChange={changeCoin}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            padding: "15px",
          }}
        >
          <WarningSubmit cancelDialog={handleClose} status={1} id={"2312"} />
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            sx={{ marginLeft: "15px", fontFamily: "Montserrat" }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
