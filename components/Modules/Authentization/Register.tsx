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
        @media (max-width: 435px) {
          width: 100%;
          height: 510px;
          padding: 75px 40px;
          background-size: 100% 100%;}
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
    height:70px;
    background: #F2EEE9;
    border: none;
    border-radius: 20px;
    margin-bottom:40px;
    font-size: 18px;
    padding: 15px 25px;
    font-family: 'michos';
    @media (max-width: 435px) {
      height:45px;
      margin-bottom:30px;
      font-size: 15px;
    }
    @media (min-width: 768px) {
     height:45px;
      margin-bottom:25px;
      font-size: 15px;
  
   } 
  
   @media (min-width: 1024px) {
    height:53px;
    margin-bottom:25px;
    font-size: 15px;
  
  } 
  @media (min-width: 1440px) {
    height:70px;
    font-size: 18px;
    margin-bottom:40px;

  } 
          `
);
interface PropsRegister {
  handleLoginMode: (mode: string) => void;
  closeAuthBox: () => void;
}
function Register({ handleLoginMode, closeAuthBox }: PropsRegister) {
  const { handleChangeStatusToast, handleChangeMessageToast } = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("*Tên đăng nhập không được để trống "),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("*Mật khẩu không được để trống "),
    email: Yup.string()
      .email("Email sai định dạng")
      .required("*Email không được để trống"),
  });

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
        {success ? "Đăng ký thành công" : "ĐĂNG KÝ TÀI KHOẢN TEMPEST"}
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
            sm: "15px auto 15px",

            md: "25px auto 25px",

            xs: "15px auto",
          },
        }}
      >
        <Image src={AuthDevider} layout="responsive" alt="devider" />
      </Box>
      {success ? (
        <>
          <Box
            sx={{
              marginTop: {
                md: "30px",
                lg: "80px",
              },
            }}
          >
            <Typography variant="h5" color="#C69E72">
              Bạn đã đăng ký tài khoản thành công <br /> vui lòng xác nhận email
              để kích hoạt tài khoản!
            </Typography>
            <Typography
              fontSize={15}
              mt={15}
              color="#C69E72"
              sx={{
                "& span": {
                  color: "#94674B",
                },
              }}
            >
              <span>Lưu ý:</span> Email sẽ hết hạn trong vòng 5 phút!
            </Typography>
          </Box>
        </>
      ) : (
        <Formik
          initialValues={{
            username: "",
            password: "",
            email: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values) => {
            const { username, password, email } = values;
            setLoading(true);
            authApi
              .resgister({ username, password, email })
              .then((res) => {
                setLoading(false);
                setSuccess(true);
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
              <Box
                width={"90%"}
                sx={{
                  margin: {
                    md: "0 auto 13px",
                    lg: "0 auto 22px",

                    sm: "0 auto 6px",
                    xs: "0 auto 3px",
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CustomField name="username" placeholder="Tên đăng nhập" />
                  {errors.username && touched.username ? (
                    <Box
                      position="absolute"
                      bottom={20}
                      color="#B56E4F"
                      sx={{
                        bottom: {
                          xs: 10,
                          sm: 7,
                          md: 5,
                          lg: 12,
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
                      bottom={20}
                      color="#B56E4F"
                      sx={{
                        bottom: {
                          xs: 10,
                          sm: 7,
                          md: 5,
                          lg: 12,
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
                <Box sx={{ position: "relative" }}>
                  <CustomField name="email" placeholder="Email xác nhận" />
                  {errors.email && touched.email ? (
                    <Box
                      position="absolute"
                      bottom={20}
                      color="#B56E4F"
                      sx={{
                        bottom: {
                          xs: 10,
                          sm: 7,
                          md: 5,
                          lg: 12,
                        },
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "13px",
                          lg: "1rem",
                        },
                      }}
                    >
                      {errors.email}
                    </Box>
                  ) : null}
                </Box>
              </Box>

              <button id="buttonAuth" type="submit">
                {loading ? (
                  <CircularProgress sx={{ color: "#fff", mt: 1 }} />
                ) : (
                  "Đăng ký"
                )}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </Auth>
  );
}

export default Register;
