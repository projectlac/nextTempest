import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import background from "../../styles/assets/images/Videos/Background_sumeru.jpg";
import book from "../../styles/assets/images/Videos/Book.png";
import Frame from "../../styles/assets/images/Videos/Frame.png";
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
  padding:75px;
  top: 50%;
  transform: translateY(-55%);
  background:url(${book.src});

  @media (min-width: 0px) {
    width: 320px;
    height: auto;
    background:#e9e7d5;
     top: 26%;
     padding:20px 15px;
    border-radius:8px;
 
  } 
    @media (min-width: 450px) {
    width: 400px;
    height: 224px;
    background:url(${book.src});
    background-repeat: no-repeat;
    background-size: contain;
    position:relative;
    background-position:center;
     top: 40%;
     padding:20px 100px;
 
  } 
  @media (min-width: 768px){
        width: 640px;
    height: 346px;
    top: 40%;
  }
  @media (min-width: 1024px) {
    top: 56%;
    width:100%;
   height: 491px;
   padding:75px 150px;
 } 
 @media (min-width: 1400px) {
  top: 50%;
  width:100%;
height: 479px;
padding:20px 150px;
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
    height: 100%;
    text-align: center;
  }
  @media (min-width: 768px) {
        width: 630px;
    height: 100%;
     
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

const CustomField = styled(Field)(
  ({ theme }) => `
    width: 100%;
    height:80px;
    background: #FFF;
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
const LoginSchema = Yup.object().shape({
  username: Yup.string().required("*Tên đăng nhập không được để trống "),
  password: Yup.string().required("*Mật khẩu không được để trống "),
});

function ModuleGiftCode() {
  return (
    <BgWrap>
      <FrameTop>
        <VideoBox className="box-slider">
          <BookWrap id="sliderBox">
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                const { username, password } = values;
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Typography
                    sx={{
                      color: "#6c962b",
                      fontSize: "20px",
                      padding: "30px 0 20px",
                    }}
                  >
                    Đăng nhập tài khoản được cung cấp để lấy code
                  </Typography>
                  <Box sx={{ position: "relative" }}>
                    {" "}
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
                    <CustomField name="password" placeholder="Mật khẩu" />
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
                  <button
                    id="buttonAuth"
                    style={{
                      position: "relative",
                      top: "auto",
                      transform: "none",
                    }}
                    type="submit"
                  >
                    Get Code
                  </button>
                </Form>
              )}
            </Formik>
            {/* <TextField label="Tài khoản Amazon"></TextField>
            <TextField label="Mật khẩu"></TextField> */}
          </BookWrap>
        </VideoBox>
        {/* </PostBox> */}
      </FrameTop>
    </BgWrap>
  );
}

export default ModuleGiftCode;
