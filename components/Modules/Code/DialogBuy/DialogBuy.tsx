import { CircularProgress, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
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
  amount: number;
  limit: string;
  name: string;
}
interface ICodeAfterBuy {
  code: string;
  id: string;
}
export default function BuyCode({ slug, amount, limit, name }: IEditCodeProps) {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();

  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [code, setCode] = React.useState<ICodeAfterBuy[]>([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCode([]);
  };

  const submit = () => {
    setLoading(true);
    codeApi
      .buyGiftCode({ slug, amount })
      .then((res) => {
        handleChangeMessageToast("Mua thành công");
        handleChangeStatusToast();
        // handleClose();
        setCode(res.data?.detail);
        updated();
      })
      .catch((err) => {
        handleChangeMessageToast(err.response.data.message);
        handleChangeStatusToast();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Button
        variant="outlined"
        fullWidth
        sx={{
          height: "56px",
          borderRadius: "30px",
          backgroundColor: "#fff",
        }}
        disabled={amount <= 0 || amount > +limit}
        onClick={handleClickOpen}
      >
        Mua ngay
      </Button>

      <Dialog
        open={open}
        maxWidth="md"
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
          }}
        >
          Thông báo
        </DialogTitle>

        <DialogContent>
          {code.length === 0 ? (
            <Typography
              sx={{
                span: {
                  color: "#f72929",
                },
                textAlign: "center",
              }}
            >
              Bạn có chắc muốn mua {name} với số lượng là {amount}. <br />
              Khi đã thức hiện sẽ không thể hoàn tác! <br />
              <hr />
              <span>
                Code sẽ được trả về ngay tại popup này và mail đăng ký của bạn
              </span>
              <hr />
            </Typography>
          ) : (
            <Typography
              sx={{
                span: {
                  color: "#f72929",
                },
                textAlign: "center",
              }}
            >
              <span>Code bạn đã mua là</span> <hr />
              {code.map((d) => (
                <b key={d.id}>
                  {d.code} <br />
                </b>
              ))}
              <hr />
            </Typography>
          )}
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
            onClick={code.length > 0 ? handleClose : submit}
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
