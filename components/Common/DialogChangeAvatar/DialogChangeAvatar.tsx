import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Background from "../../../styles/assets/images/payment/Layer60.png";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Avatar from "../../../styles/assets/images/payment/avatar-cute-12.jpg";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ScrollBox = styled(Box)({
  height: "465px",
  overflow: "hidden",
  overflowY: "auto",
});
const ImageBox = styled(Box)({
  borderRadius: "50%",
  width: "150px",
  height: "150px",
  border: "6px solid #BFAE9B",
  margin: "-95px auto 5px",
  overflow: "hidden",
});
const ImageChooseBox = styled(Box)({
  borderRadius: "50%",
  width: "100px",
  height: "100px",
  border: "1px solid #BFAE9B",
  overflow: "hidden",
  margin: "0px 15px 15px",
});

const ButtonCustom = styled(Box)({
  height: "40px",
  width: "119px",
  backgroundColor: "transparent",
  border: "2px solid #DAB88F",
  color: "#94674b",
  margin: "0 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "15px",
  cursor: "pointer",
  fontSize: "14px",
  "&.submit": {
    backgroundColor: "#94674b",
    color: "#fff",
  },
});

interface PropsDialog {
  handleClose: () => void;
  open: boolean;
}
export default function DialogChangeAvatar({ open, handleClose }: PropsDialog) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth="md"
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            background: `url(${Background.src})`,
            height: "666px",
            overflowY: "inherit",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            "& .MuiDialogContent-root": {
              overflowY: "inherit",
              height: "calc(100% - 130px)",
            },
            "& .MuiDialogActions-root": {
              height: "130px",
            },
          },
        }}
      >
        <DialogContent>
          <ImageBox>
            <Image src={Avatar} width={150} height={150} alt="crys" />
          </ImageBox>
          <ScrollBox>
            <Box sx={{ padding: "30px", display: "flex", flexWrap: "wrap" }}>
              {[...Array(20)].map((d, i) => (
                <ImageChooseBox key={i}>
                  <Image src={Avatar} width={100} height={100} alt="crys" />
                </ImageChooseBox>
              ))}
            </Box>
          </ScrollBox>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
          }}
        >
          <ButtonCustom onClick={handleClose}>Hủy</ButtonCustom>
          <ButtonCustom className="submit" onClick={handleClose}>
            Xác nhận
          </ButtonCustom>
        </DialogActions>
      </Dialog>
    </div>
  );
}
