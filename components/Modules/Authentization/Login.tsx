import styled from "@emotion/styled";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import * as Yup from "yup";
import authApi from "../../../api/authApi";
import { useAppContext } from "../../../context/state";
import AuthDevider from "../../../styles/assets/images/Authen/AuthDevider.png";
import AuthBG from "../../../styles/assets/images/Authen/Layer41.png";
import Close from "../../../styles/assets/images/svg/close.svg";

const Auth = styled(Box)(
  ({ theme }) => `
        width: 1094px;
        height: 677px;
        background: url(${AuthBG.src});
        display: block;
        padding: 100px 105px 50px;
        text-align:center;
        `
);

const CustomField = styled(Field)(
  ({ theme }) => `
    width: 100%;
    height:80px;
    background: #F2EEE9;
    border: none;
    border-radius: 20px;
    margin-bottom:50px;
    font-size: 18px;
    padding: 15px 25px;
    font-family: 'michos';
          `
);
interface PropsLogin {
  handleLoginMode: (mode: boolean) => void;
  closeAuthBox: () => void;
}
function Login({ handleLoginMode, closeAuthBox }: PropsLogin) {
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("*Tên đăng nhập không được để trống "),
    password: Yup.string().required("*Mật khẩu không được để trống "),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { handleChangeStatusToast, handleLoginTrue, handleChangeMessageToast } =
    useAppContext();

  return (
    <Auth position={"relative"}>
      <Typography variant="h4" color="#726550">
        ĐĂNG NHẬP TÀI KHOẢN TEMPEST
      </Typography>
      <Box
        width={36}
        height={36}
        sx={{
          position: "absolute",
          right: "-45px",
          top: "25px",
        }}
      >
        <Image
          src={Close}
          alt=""
          width={36}
          height={36}
          onClick={() => {
            closeAuthBox();
          }}
        />
      </Box>
      <Box
        width={410}
        sx={{
          margin: "25px auto 45px",
        }}
      >
        <Image src={AuthDevider} layout="responsive" alt="devider" />
      </Box>

      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          const { username, password } = values;
          setLoading(true);
          authApi
            .login({ username, password })
            .then((res) => {
              setLoading(false);
              localStorage.setItem("access_token", res.data);
              handleLoginTrue();
            })
            .catch((err) => {
              setLoading(false);
              handleChangeStatusToast();
              handleChangeMessageToast(err.response.data.message);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box width={"90%"} sx={{ margin: "0 auto" }}>
              <Box sx={{ position: "relative" }}>
                <CustomField name="username" placeholder="Tên đăng nhập" />
                {errors.username && touched.username ? (
                  <Box position="absolute" bottom={20} color="#B56E4F">
                    {errors.username}
                  </Box>
                ) : null}
              </Box>
              <Box sx={{ position: "relative" }}>
                <CustomField
                  name="password"
                  placeholder="Mật khẩu"
                  type="password"
                />
                {errors.password && touched.password ? (
                  <Box position="absolute" bottom={20} color="#B56E4F">
                    {errors.password}
                  </Box>
                ) : null}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
                margin: "0 auto 50px",
                color: "#726550",
              }}
            >
              <Typography fontSize={18}>Quên mật khẩu</Typography>
              <Typography
                fontSize={18}
                onClick={() => {
                  handleLoginMode(false);
                }}
              >
                Đăng ký tài khoản
              </Typography>
            </Box>
            <button id="buttonAuth" type="submit">
              {loading ? (
                <CircularProgress sx={{ color: "#fff", mt: 1 }} />
              ) : (
                "Đăng nhập"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </Auth>
  );
}

export default Login;
