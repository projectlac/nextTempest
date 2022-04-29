import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SliderImage from "../../styles/assets/images/newsDes/Group1.png";
import BG from "../../styles/assets/images/newsDes/Mask.png";
import LeftArrow from "../../styles/assets/images/newsDes/LeftArrow.png";
import NavLeftArrow from "../../styles/assets/images/newsDes/NavLeftArrow.png";
import NavRightArrow from "../../styles/assets/images/newsDes/NavRightArrow.png";
import RightArrow from "../../styles/assets/images/newsDes/RightArrow.png";
import MainNews from "./MainNews";

const NewWrapper = styled(Box)(
  ({ theme }) => `
  background-size: 100%;
  background-image: url(${BG.src});
  background-repeat: no-repeat; 
  background-position: top;
  background-color: #000;
  overflow:hidden;
  @media (max-width: 768px) {
    overflow:hidden;
}
        `
);
const TitleHighlight = styled(Box)({
  position: "relative",
  width: "100%",
  height: "50px",
  textAlign: "center",
  color: " #fff",
  fontSize: "30px",
  textShadow: "0 0 5px #69e0ff, 0 0 10px #69e0ff, 0 0 15px #69e0ff",
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
    "@media (max-width: 425px)": {
      display: "none",
    },
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
    "@media (max-width: 425px)": {
      display: "none",
    },
  },
});

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <Box
      className={className}
      onClick={onClick}
      sx={{
        "&:before": { display: "none" },
        display: { lg: "flex !important", md: "none !important" },
        alignItems: "center  !important",
        width: 87,
        height: 92,
        marginRight: "-100px",
      }}
    >
      <Image src={NavRightArrow} alt="" width={87} height={92} />
    </Box>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <Box
      className={className}
      onClick={onClick}
      sx={{
        "&:before": { display: "none" },
        display: { lg: "flex !important", md: "none !important" },
        alignItems: "center  !important",
        justifyContent: "flex-end",
        width: 87,
        height: 92,
        marginLeft: "-100px",
      }}
    >
      <Image src={NavLeftArrow} alt="" width={87} height={92} />
    </Box>
  );
}

function SliderBox() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dotsClass: "slick-dots slick-thumb",
    customPaging: function (i) {
      return <div className="slick-custom-dot"></div>;
    },
  };
  return (
    <NewWrapper>
      <Container>
        <Box pt={10} pb={5}>
          <Box pt={5} pb={2}>
            <TitleHighlight>Banner hiện tại</TitleHighlight>
          </Box>
          <Slider {...settings} className="slick-custom">
            <Image src={SliderImage} alt="" />
            <Image src={SliderImage} alt="" />
            <Image src={SliderImage} alt="" />
          </Slider>
        </Box>
        <MainNews />
      </Container>
    </NewWrapper>
  );
}

export default SliderBox;
