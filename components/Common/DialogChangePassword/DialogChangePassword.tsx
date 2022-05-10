import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
import * as React from "react";
import * as Yup from "yup";
import AuthDevider from "../../../styles/assets/images/Authen/AuthDevider.png";
import Background from "../../../styles/assets/images/payment/Layer60.png";
import { Field, Form, Formik } from "formik";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
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
const CustomField = styled(Field)(
  ({ theme }) => `
    width: 90%;
    height:60px;
    background: #F2EEE9;
    border: none;
    outline:none;
    border-radius: 20px;
    margin-bottom:10px;
    font-size: 18px;
    padding: 15px 25px;
    margin-bottom:40px;
    font-family: 'michos';
          `
);
interface PropsDialog {
  handleClose: () => void;
  open: boolean;
}
export default function DialogChangeAvatar({ open, handleClose }: PropsDialog) {
  const LoginSchema = Yup.object().shape({
    oldPassword: Yup.string().required("*Không được để trống "),
    newPassword: Yup.string().required("*Không được để trống "),
    confirmPassword: Yup.string().required("*Không được để trống "),
  });

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth="md"
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "900px",
            padding: "40px",
            textAlign: "center",
            background: `url(${Background.src})`,
            height: "584px",
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
        <Typography variant="h4" color="#726550">
          {"Đổi mật khẩu"}
        </Typography>
        <Box
          width={410}
          sx={{
            margin: "25px auto 30px",
          }}
        >
          <Image src={AuthDevider} layout="responsive" alt="devider" />
        </Box>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Box
                width={"100%"}
                sx={{ margin: "25px auto 22px", textAlign: "center" }}
              >
                <Box sx={{ position: "relative" }}>
                  <CustomField
                    name="oldPassword"
                    placeholder="Mật khẩu cũ"
                    type="password"
                  />
                  {errors.oldPassword && touched.oldPassword ? (
                    <Box position="absolute" bottom={10} color="#B56E4F">
                      {errors.oldPassword}
                    </Box>
                  ) : null}
                </Box>
                <Box sx={{ position: "relative" }}>
                  <CustomField
                    name="newPassword"
                    placeholder="Mật khẩu mới"
                    type="password"
                  />
                  {errors.newPassword && touched.newPassword ? (
                    <Box position="absolute" bottom={10} color="#B56E4F">
                      {errors.newPassword}
                    </Box>
                  ) : null}
                </Box>
                <Box sx={{ position: "relative" }}>
                  <CustomField
                    name="confirmPassword"
                    placeholder="Xác nhận mật khẩu"
                    type="password"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <Box position="absolute" bottom={10} color="#B56E4F">
                      {errors.confirmPassword}
                    </Box>
                  ) : null}
                </Box>
              </Box>
              <Box
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <ButtonCustom onClick={handleClose}>Hủy</ButtonCustom>
                <button id="submitPassword" type="submit">
                  Xác nhận
                </button>
              </Box>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
