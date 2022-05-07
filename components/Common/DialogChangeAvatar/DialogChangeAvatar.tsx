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

const ImageBox = styled(Box)({
  borderRadius: "50%",
  width: "150px",
  height: "150px",
  margin: "25px auto 0",
  overflow: "hidden",
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
            height: "584px",

            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          },
        }}
      >
        <DialogContent>
          <ImageBox>
            <Image src={Avatar} width={150} height={150} alt="crys" />
          </ImageBox>
          <DialogContentText id="alert-dialog-slide-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi rem
            dolorem sequi voluptatibus facere in! Illum, eligendi quia,
            distinctio sint quis iusto perspiciatis ipsa accusamus cum alias
            iste maiores totam!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
