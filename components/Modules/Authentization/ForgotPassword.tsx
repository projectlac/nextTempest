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
  closeAuthBox: () => void;
}
function ForgotPassword({ closeAuthBox }: PropsRegister) {
  const { handleChangeStatusToast, handleChangeMessageToast } = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const ForgotSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("*T??n ????ng nh???p kh??ng ???????c ????? tr???ng "),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("*M???t kh???u kh??ng ???????c ????? tr???ng "),
    confirmNewPassword: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("*M???t kh???u kh??ng ???????c ????? tr???ng ")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "*M???t kh???u kh??ng tr??ng kh???p"
        ),
      }),
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
        {success ? "Xin m???i x??c nh???n email!" : "Qu??n m???t kh???u"}
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
            <Typography
              sx={{
                fontSize: {
                  md: "1rem",
                  xs: "15px",
                },
              }}
              color="#C69E72"
            >
              M???t email x??c nh???n ???? ???????c g???i t???i email ????ng k?? c???a b???n <br />
              vui l??ng ki???m tra Email ????? x??c th???c h??nh ?????ng n??y!
            </Typography>
            <Typography
              color="#C69E72"
              sx={{
                "& span": {
                  color: "#94674B",
                },
                mt: {
                  md: 10,
                  xs: 5,
                },
                fontSize: {
                  md: "1rem",
                  xs: "12px",
                },
              }}
            >
              <span>L??u ??:</span> Email s??? h???t h???n trong v??ng 5 ph??t!
            </Typography>
          </Box>
        </>
      ) : (
        <Formik
          initialValues={{
            username: "",
            password: "",
            confirmNewPassword: "",
          }}
          validationSchema={ForgotSchema}
          onSubmit={(values) => {
            const { username, password, confirmNewPassword } = values;
            setLoading(true);
            authApi
              .forgot({ username, newPassword: password, confirmNewPassword })
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
                  <CustomField name="username" placeholder="T??n ????ng nh???p" />
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
                    placeholder="M???t kh???u m???i"
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
                  <CustomField
                    name="confirmNewPassword"
                    type="password"
                    placeholder="X??c nh???n m???t kh???u"
                  />
                  {errors.confirmNewPassword && touched.confirmNewPassword ? (
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
                      {errors.confirmNewPassword}
                    </Box>
                  ) : null}
                </Box>
              </Box>

              <button id="buttonAuth" type="submit">
                {loading ? (
                  <CircularProgress sx={{ color: "#fff", mt: 1 }} />
                ) : (
                  "Qu??n m???t kh???u"
                )}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </Auth>
  );
}

export default ForgotPassword;
