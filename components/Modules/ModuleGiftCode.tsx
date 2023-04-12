import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import paymentApi from "../../api/paymentApi";
import { useAppContext } from "../../context/state";
import background from "../../styles/assets/images/Videos/Background_sumeru.jpg";
import book from "../../styles/assets/images/Videos/Book.png";
import Frame from "../../styles/assets/images/Videos/Frame.png";
import Authentization from "./Authentization";
import Link from "next/link";
const BgWrap = styled(Box)(
  ({ theme }) => `
    width: 100vw;
    display: flex;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 0;
    justify-content: center;
    align-items: center;
    background: url(${background.src});
    overflow:hidden;
    background-size: cover;
    @media (min-width: 0px) {
      height: 600px;
    } 
    @media (min-width: 768px){
      height: 720px;
    }
    @media (min-width: 1024px) {
      height: 1000px;
   } 
   @media (min-width: 1400px) {
    height:1000px;
  } 

  `
);
const FrameTop = styled(Box)({
  marginTop: "66px",
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "self-end",

  // },
  "&::after": {
    background: `url(${Frame.src})`,
    content: '""',
    position: "absolute",
    bottom: "5px",
    left: 0,
    right: 0,
    width: "100%",
    height: "36px",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    filter: " drop-shadow(0 0 47px #69e0ff)",
  },
  "@media (min-width: 0px)": {
    height: "calc(600px - 56px)",
  },
  "@media (min-width:760px)": {
    height: "calc(720px - 56px)",
  },
  "@media (min-width:1024px)": {
    height: "calc(1000px - 56px)",
  },
  "@media (min-width:1400px)": {
    height: "calc(1000px - 56px)",
  },
});

const BookWrap = styled(Box)(
  ({ theme }) => `
  width:100%;
 height: 530px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-55%);
  background:url(${book.src});
 
  @media (min-width: 0px) {
    width: 320px;
    height: auto;
     top: 26%;
     background:#f2efe0;
     padding:15px;
     border-radius:8px;
  } 
    @media (min-width: 450px) {
    width: 400px;
    height: auto;
     top:31%;

     padding:0px 40px 20px;
  } 
  @media (min-width: 768px){
        width: 640px;
    height: 346px;
    top: 40%;
    background:url(${book.src});
    background-repeat: no-repeat;
    background-size: contain;
    position:relative;
    background-position:center;
    border-radius:0;
    padding:0px 80px;
  }
  @media (min-width: 1024px) {
    top: 56%;
    width:100%;
   height: 491px;
   padding:50px 150px;
 } 
 @media (min-width: 1400px) {
  top: 50%;
  width:100%;
height: 479px;
padding:20px 170px;
} 
    `
);

const VideoBox = styled(Box)(
  ({ theme }) => `
     width: 957px;
    height: 658px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-56%);
  
  @media (min-width: 0px) {
    width: 320px;
    height: 189px;
    text-align: center;
  }
  @media (min-width: 450px) {
    width: 440px;
    height: 200px;
    text-align: center;
  
  }
  @media (min-width: 768px) {
        width: 630px;
    height: 440px;
     
  } 
  @media (min-width: 1024px) {
         width: 840px;
    height: 737px;
        top: 36%;
 } 
   @media (min-width: 1400px) {
       top: 50%;
      width: 840px;
    height: 737px;

 } 
  @media (min-width: 1650px) {
        width: 957px;
    height: 658px;
     top: 50%;

 } 
  
      `
);

const Item = styled("div")(
  ({ theme }) => `
    width: 774px;
     height: 430px;
    border: 10px solid #fff7ed;
    background-size: cover;
    position: absolute;
    z-index: 3;
    transition: transform 1s;
    opacity: 1;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 50%;
    transform: translateY(-51%);
    box-shadow: 0px 0px 5px 1px #d4d4d4;
    opacity: 0;
  @media (min-width: 0px) {
    width: 282px;
    height: 172px;
  }
  @media (min-width: 450px) {
    width: 356px; 
    height: 180px; 
  } 
  @media (min-width: 768px) {
    width: 504px;
    height: 279px;
  } 
  @media (min-width: 1024px) {
    width: 700px; 
    height: 400px; 
  } 
  @media (min-width: 1440px) {
    width: 700px;
     height: 400px; 
  } 
  
 
      `
);
const CustomField = styled(Field)(
  ({ theme }) => `
    width: 100%;
    height:80px;
    background: #fff;
    border: none;
    border-radius: 20px;
    margin-bottom:50px;
    font-size: 18px;
    padding: 15px 25px;
    font-family: 'Signika';
    @media (min-width:0px) {
      height:50px;
      margin-bottom:30px;
      font-size: 15px;
    }
    @media (min-width: 435px) {
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

function ModuleGiftCode() {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("*Tên đăng nhập không được để trống "),
    password: Yup.string().required("*Mật khẩu không được để trống "),
  });
  return (
    <BgWrap>
      <FrameTop>
        {/* <PostBox> */}
        <VideoBox className="box-slider">
          <BookWrap id="sliderBox">
            {message !== "" ? (
              <>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    padding: "30px 0 20px",
                  }}
                >
                  Thông báo
                </Typography>
                <Box
                  sx={{
                    height: !error ? "75%" : "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "medium",
                      fontSize: "17px",
                      padding: {
                        xs: "30px 0 20px",
                        sm: "0px 0 10px",
                        md: "30px 0 20px",
                      },
                      color: error ? "red" : "black",
                      wordBreak: "break-word",
                    }}
                    dangerouslySetInnerHTML={{ __html: message }}
                  ></Typography>
                  {!error ? (
                    <>
                      <Typography
                        sx={{
                          fontWeight: "medium",
                          fontSize: "17px",
                          width: "150px",
                          margin: "0 auto",
                          background: "#8e985d",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0",
                          borderRadius: "6px",
                          color: "#fff",
                          cursor: "pointer",
                          marginTop: "15xp",
                        }}
                        onClick={() => {
                          setError(false);
                          setMessage("");
                        }}
                      >
                        Tiếp tục
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "normal",
                          fontSize: "15px",
                          fontStyle: "italic",
                          padding: "30px 0 20px",
                          color: "#835b20",
                          wordBreak: "break-word",
                          a: {
                            color: "orange",
                          },
                        }}
                      >
                        Mong bạn ủng hộ Page cũng như Shop để phát triển và phát
                        những code chất lượng hơn nhé
                        <br />
                        Mua account an toàn tại <Link href="/">Tempest.vn</Link>
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      sx={{
                        fontWeight: "normal",
                        fontSize: "15px",
                        padding: "30px 0 20px",
                        color: "#835b20",
                        wordBreak: "break-word",
                        a: {
                          color: "orange",
                        },
                      }}
                    >
                      Nếu bạn chắc chắn đã nhập đúng tài khoản và mật khẩu nhưng
                      bị lỗi này, vui lòng inbox lại page để được hỗ trợ
                    </Typography>
                  )}
                </Box>
                {error && (
                  <Typography
                    sx={{
                      fontWeight: "medium",
                      fontSize: "17px",
                      width: "150px",
                      margin: "0 auto",
                      background: "#8e985d",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0",
                      borderRadius: "6px",
                      color: "#fff",
                      cursor: "pointer",
                      marginTop: "15xp",
                    }}
                    onClick={() => {
                      setError(false);
                      setMessage("");
                    }}
                  >
                    Thử lại
                  </Typography>
                )}
              </>
            ) : (
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  const { username, password } = values;

                  setLoading(true);
                  paymentApi.getCode(username, password).then((res) => {
                    if (res.data.length === 0) {
                      setMessage("Tài khoản này không tồn tại!");
                      setError(true);
                    } else {
                      setMessage(
                        `<p>Tài khoản Amazone mới của bạn là <br/> <span style="color:#d33">${res.data[0].token}</span></p>`
                      );
                      setError(false);
                    }
                    setLoading(false);
                  });
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        padding: "30px 0 20px",
                      }}
                    >
                      Đăng nhập tài khoản Amazone cũ để nhận tài khoản mới
                    </Typography>
                    <Box width={"90%"} sx={{ margin: "0 auto" }}>
                      <Box sx={{ position: "relative" }}>
                        <CustomField
                          name="username"
                          placeholder="Tên đăng nhập"
                        />
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

                    <button
                      id="buttonAuth"
                      type="submit"
                      style={{
                        position: "relative",
                        top: "auto",
                        transform: "none",
                        marginTop: "20px",
                      }}
                    >
                      {loading ? (
                        <CircularProgress sx={{ color: "#fff", mt: 1 }} />
                      ) : (
                        "Get Code"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            )}
          </BookWrap>
          <Box
            sx={{
              position: { xs: "absolute", sm: "absolute" },
              width: { xs: "320px", sm: "450px", md: "774px" },
              margin: "0 auto",
              left: 0,
              right: 0,
              bottom: { xs: "-160px", sm: "-30px" },
              textAlign: "left",
              paddingLeft: "15px",
              color: "#000",
              background: { xs: "#f2efe0", md: "" },
              padding: { xs: "15px", md: "" },
              borderRadius: { xs: "8px", md: "" },
              a: {
                color: "orange",
              },
            }}
          >
            <Typography sx={{ fontSize: { xs: "13px", md: "15px" } }}>
              Lưu ý:{" "}
            </Typography>
            <Typography sx={{ fontSize: { xs: "13px", md: "15px" } }}>
              1. Các bạn không cần đăng nhập tài khoản shop để lấy tài khoản
              Amazone mới. Sau khi lấy được tài khoản Amazone mới, các bạn login
              và get code như page đã hướng dẫn ở link bên dưới
            </Typography>
            <Typography sx={{ fontSize: { xs: "13px", md: "15px" } }}>
              2. Hướng dẫn get code:{" "}
              <a
                href="https://bom.so/wezbro"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://bom.so/wezbro
              </a>
            </Typography>
          </Box>
        </VideoBox>

        {/* </PostBox> */}
      </FrameTop>
    </BgWrap>
  );
}

export default ModuleGiftCode;
