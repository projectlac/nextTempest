import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import React from "react";
import BGNews from "../../../styles/assets/images/newsDes/BGNews.png";
import BGNewsBottom from "../../../styles/assets/images/newsDes/BGNewsBottom.png";
import BGNewsTop from "../../../styles/assets/images/newsDes/BGNewsTop.png";
import BG from "../../../styles/assets/images/newsDes/Mask.png";
import { DetailNewsType } from "../../../types/DashboardTypes/news";
import Devider from "../../../styles/assets/images/payment/PaymentDevider.png";

const NewWrapper = styled(Box)(
  ({ theme }) => `
    background-size: 100%;
    background-image: url(${BG.src});
    background-repeat: no-repeat; 
    background-position: top;
    background-color: #000;
    overflow:hidden;min-height:100vh;
   
    @media (max-width: 768px) {
      overflow:hidden;
  }
          `
);
const NewBox = styled(Box)(() => ({
  position: "relative",
  background: `url(${BGNews.src})`,
  minHeight: "750px",
  marginTop: "100px",
  marginBottom: "75px",
  backgroundSize: "100%",
  padding: "0 50px 20px",
  "@media (max-width: 435px)": {
    padding: "20px 25px",
  },
  "&:before": {
    position: "absolute",
    content: '""',
    background: `url(${BGNewsTop.src})`,
    height: "55px",
    width: "100%",
    top: "-50px",
    left: 0,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    "@media (max-width: 435px)": {
      top: "-30px",
    },
  },
  "&:after": {
    position: "absolute",
    content: '""',
    background: `url(${BGNewsBottom.src})`,
    backgroundSize: "100%",
    height: "35px",
    width: "100%",
    bottom: "-30px",
    right: 0,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    "@media (max-width: 435px)": {
      bottom: "-20px",
    },
  },
}));

const Title = styled(Typography)(
  ({ theme }) => `
    color: #B68967;
    text-align: center;
    width: 70%;
    margin: 0 auto;
    font-size: 25px;

    @media (min-width: 0px) {
      width: 100%;
      font-size:15px;
    }
    @media (min-width: 768px) {
      width: 100%;
      font-size:20px;

    }
    @media (min-width: 1024px) {
      font-size: 25px;
      width: 70%;
    }
    @media (min-width: 1400px) {
      font-size: 25px;
      width: 70%;
    }

            `
);

interface PropsDetailNews {
  detailNews: DetailNewsType;
}
function DetailNews({ detailNews }: PropsDetailNews) {
  return (
    <NewWrapper>
      <Container>
        <Box pb={0}>
          <Box pt={5} pb={2}>
            <NewBox>
              <Title>{detailNews.title}</Title>

              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Image src={Devider} alt="devider" width={440} height={14} />
              </Box>
              <Box
                sx={{
                  fontFamily: "Montserrat, michos !important",
                }}
              >
                {detailNews.description}
              </Box>
              <Box
                sx={{
                  fontFamily: "Montserrat, michos !important",
                  "& *": {
                    wordBreak: "break-word",
                    wordWrap: "break-word",
                  },
                  "& p ": {
                    fontFamily: "Montserrat, michos !important",
                    background: "transparent !important",
                    "& span": {
                      fontFamily: "Montserrat, michos !important",
                      background: "transparent !important",
                      "& a": {
                        color: "#337ab7",
                      },
                    },
                    "& img": {
                      maxWidth: "100%",
                      width: {
                        md: "auto",
                        xs: "100%",
                      },
                      height: {
                        md: "auto",
                        xs: "auto",
                      },
                    },
                  },
                  "& div img": {
                    maxWidth: "100%",
                    width: {
                      md: "auto",
                      xs: "100%",
                    },
                    height: {
                      md: "auto",
                      xs: "auto",
                    },
                  },
                }}
                dangerouslySetInnerHTML={{ __html: detailNews.content }}
              />
            </NewBox>
          </Box>
        </Box>
      </Container>
    </NewWrapper>
  );
}

export default DetailNews;
