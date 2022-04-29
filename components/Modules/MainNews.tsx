import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import LeftArrow from "../../styles/assets/images/newsDes/LeftArrow.png";
import RightArrow from "../../styles/assets/images/newsDes/RightArrow.png";
import BGNews from "../../styles/assets/images/newsDes/BGNews.png";
import BGNewsTop from "../../styles/assets/images/newsDes/BGNewsTop.png";
import BGNewsBottom from "../../styles/assets/images/newsDes/BGNewsBottom.png";
import Paimon from "../../styles/assets/images/newsDes/Paimon.png";
import HotNews from "../../styles/assets/images/newsDes/HotNews.png";
import Clip from "../../styles/assets/images/newsDes/Clip.png";
import Image from "next/image";
import Link from "next/link";

const TitleHighlight = styled(Box)({
  position: "relative",
  width: "100%",
  height: "50px",
  textAlign: "center",
  color: " #fff",
  fontSize: "30px",
  "&:before": {
    position: "absolute",
    content: '""',
    background: `url(${LeftArrow.src})`,
    backgroundSize: "contain",
    height: "35px",
    width: "450px",
    top: 0,
    left: 0,
    backgroundRepeat: "no-repeat",
  },
  "&:after": {
    position: "absolute",
    content: '""',
    background: `url(${RightArrow.src})`,
    backgroundSize: "contain",
    height: "35px",
    width: "450px",
    top: 0,
    right: 0,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
  },
});

const NewBox = styled(Box)({
  position: "relative",
  background: `url(${BGNews.src})`,
  minHeight: "750px",
  backgroundSize: "100%",
  padding: "0 50px",
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
  },
});
const PaimonImage = styled(Box)(
  ({ theme }) => `
    width: 541px;
    height: 723px;
    background: url(${Paimon.src});
    position: absolute;
    top: -150px;
    z-index: 9;
    right: -66px;
    background-size: 100%;
    background-repeat: no-repeat;
    @media (max-width: 768px) {
      width: 336px;
      height: 466px;
  }
      `
);
const HottestNews = styled(Box)(
  ({ theme }) => `
  width: 75%;
  height: auto;
      `
);

function MainNews() {
  return (
    <Box pb={5}>
      <Box pt={5} pb={2}>
        <TitleHighlight mb={10}>Tin chính</TitleHighlight>
        <NewBox>
          <PaimonImage />
          <HottestNews>
            <Box
              sx={{
                border: "2px solid #b68967",
                borderRadius: "32px",
                padding: "5px",
                width: "100%",
                overflow: "hidden",
                position: "relative",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  borderRadius: "32px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={HotNews}
                  alt=""
                  layout="responsive"
                  objectFit="contain"
                />
              </Box>
            </Box>
            <Typography sx={{ fontSize: "27px", mt: 2, color: "#B68967" }}>
              <Link href="/">[28.04.2022] Lịch livestream phiên bản 2.7</Link>
            </Typography>
          </HottestNews>

          <Grid container md={12} mt={8}>
            {[...Array(3)].map((d, i) => (
              <Box sx={{ display: "flex", width: "100%" }} mb={2} key={i}>
                <Grid item md={4} xs={4}>
                  <Box
                    sx={{
                      border: "2px solid #C9AD97",
                      width: "100%",
                      position: "relative",
                      height: "auto",
                      padding: "5px",
                    }}
                  >
                    <Image
                      src={Clip}
                      alt=""
                      layout="responsive"
                      objectFit="contain"
                    />
                  </Box>
                </Grid>
                <Grid item md={8}>
                  <Box px={3}>
                    <Typography
                      sx={{ fontSize: "20px", mt: 2, color: "#B68967" }}
                    >
                      <Link href="/">
                        [28.04.2022] Lịch livestream phiên bản 2.7
                      </Link>
                    </Typography>

                    <p style={{ color: "#000" }}>
                      <Link href="/">{`Xem thêm>>`}</Link>
                    </p>
                  </Box>
                </Grid>
              </Box>
            ))}
          </Grid>
        </NewBox>
      </Box>
    </Box>
  );
}

export default MainNews;
