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
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
const Auth = styled(Box)(
  ({ theme }) => `
        width: 1094px;
        height: 677px;
        background: url(${AuthBG.src});
        display: block;
        padding: 100px 105px 50px;
        text-align:center;
        @media (max-width: 435px) {
          width: 100%;
          height: 510px;
          padding: 75px 40px;
          background-size: 100% 100%;
        }
        
        @media (min-width: 768px) {
          background-size: contain;
          background-repeat: no-repeat;
          width: 681px;
          height: 421px;
          margin: 0 auto;
          padding: 60px 105px 50px;
      
       } 
      
       @media (min-width: 1024px) {
        width: 800px;
          height: 499px;
      
      } 
      @media (min-width: 1440px) {
        padding: 100px 105px 50px;
        width: 1094px;
        height: 677px;
      } 
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
    font-family: 'Signika';
    @media (max-width: 435px) {
      height:50px;
      margin-bottom:30px;
      font-size: 15px;
    }
    @media (min-width: 768px) {
      height:50px;
      margin-bottom:27px;
      font-size: 15px;
  
   } 
  
   @media (min-width: 1024px) {
    height:60px;
    margin-bottom:30px;
    font-size: 15px;
  
  } 
  @media (min-width: 1440px) {
    height:80px;
    font-size: 18px;
    margin-bottom:50px;

  } 
          `
);
interface PropsLogin {
  handleLoginMode: (mode: string) => void;
  closeAuthBox: () => void;
}
function Login({ handleLoginMode, closeAuthBox }: PropsLogin) {
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("*Tên đăng nhập không được để trống "),
    password: Yup.string().required("*Mật khẩu không được để trống "),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { handleChangeStatusToast, handleLoginTrue, handleChangeMessageToast } =
    useAppContext();

  return (
    <Auth position={"relative"}>
      <Typography
        sx={{
          fontSize: {
            lg: "34px",
            md: "25px",

            sm: "20px",
            xs: "16px",
          },
        }}
        color="#726550"
      >
        ĐĂNG NHẬP TÀI KHOẢN TEMPEST
      </Typography>
      <Box
        sx={{
          width: {
            sm: 25,
            md: 36,
            xs: 25,
          },
          height: {
            sm: 25,
            md: 36,
            xs: 25,
          },
          position: "absolute",
          right: {
            sm: "-15px",
            xs: "-15px",
            md: "-45px",
          },
          top: {
            sm: "25px",
            xs: "25px",
          },
        }}
      >
        <Image
          src={Close}
          alt=""
          layout="responsive"
          onClick={() => {
            closeAuthBox();
          }}
        />
      </Box>
      <Box
        sx={{
          width: {
            sm: 410,
            xs: "100%",
          },
          margin: {
            md: "25px auto 25px",
            sm: "15px auto 25px",

            xs: "15px auto",
          },
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
              if (["ADMIN", "MOD"].includes(jwt_decode<any>(res.data).role)) {
                router.push("/dashboard");
              }
              closeAuthBox();
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
                  <Box
                    position="absolute"
                    color="#B56E4F"
                    sx={{
                      bottom: {
                        xs: 10,
                        sm: 7,
                        md: 5,
                        lg: 20,
                      },
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                        md: "13px",
                        lg: "1rem",
                      },
                    }}
                  >
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
                  <Box
                    position="absolute"
                    color="#B56E4F"
                    sx={{
                      bottom: {
                        xs: 10,
                        sm: 7,
                        md: 5,
                        lg: 20,
                      },
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                        md: "13px",
                        lg: "1rem",
                      },
                    }}
                  >
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
                margin: {
                  md: "0 auto 40px",
                  sm: "0 auto 33px",
                  lg: "0 auto 65px",
                  xs: "25px auto 25px",
                },
                color: "#726550",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "18px",
                  },
                }}
                onClick={() => {
                  handleLoginMode("forgot");
                }}
              >
                Quên mật khẩu
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "18px",
                  },
                }}
                onClick={() => {
                  handleLoginMode("register");
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
