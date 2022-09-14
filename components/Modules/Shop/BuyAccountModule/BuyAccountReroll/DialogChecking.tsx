import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Divider, Grid, CircularProgress } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogChecking({
  openDialog,
  handleClose,
  handleSubmitBuy,
  loading,
}) {
  return (
    <div>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle textAlign={"center"} textTransform="uppercase">
          Xác nhận mua
        </DialogTitle>
        <Divider sx={{ mb: 0.5 }} />
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Bạn có chắc chắn rằng sẽ mua tài khoản này? Bằng việc chọn đồng ý,
            bạn sẽ mua tài khoản này.
            <br /> Thông tin tài khoản sẽ được hiện ra ở{" "}
            <b style={{ color: "#000" }}>hóa đơn</b> sau khi mua.
          </DialogContentText>
        </DialogContent>
        <Divider sx={{ mb: 2 }} />
        <DialogActions>
          <Grid container columnSpacing={2}>
            <Grid item md={6} xs={6} textAlign="center">
              <Button
                onClick={handleClose}
                fullWidth
                variant="contained"
                color="error"
              >
                Đóng
              </Button>
            </Grid>
            <Grid item md={6} xs={6} textAlign="center">
              <Button onClick={handleSubmitBuy} fullWidth variant="contained">
                {loading ? <CircularProgress color="secondary" /> : "Đồng ý"}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
