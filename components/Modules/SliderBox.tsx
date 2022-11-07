import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import banner from "../../api/banner";
import SliderImage from "../../styles/assets/images/newsDes/Group1.png";
import BG from "../../styles/assets/images/newsDes/Mask.png";
import NavLeftArrow from "../../styles/assets/images/newsDes/NavLeftArrow.png";
import NavRightArrow from "../../styles/assets/images/newsDes/NavRightArrow.png";
import TitleHighlight from "../Common/Title/TitleHighlight";
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
  const [fileListCurreny, setFileListCurreny] = useState<string[]>();

  useEffect(() => {
    const getData = async () => {
      try {
        await banner.getBanner().then((res) => {
          const data = res.data.map((d) => d.url);
          setFileListCurreny(data);
        });
      } catch (error) {}
    };
    getData();
  }, []);

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
            <TitleHighlight>Thông báo</TitleHighlight>
          </Box>
          <Slider {...settings} className="slick-custom">
            {(fileListCurreny || []).map((d) => (
              <Box
                key={d}
                sx={{
                  width: { md: "1352px", xs: "100%" },
                  height: { md: "690px", xs: "350px" },
                  background: `url(${d})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                {/* <Image
                  src={d}
                  alt=""
                  key={d}
                  width={1352}
                  height={690}
                  layout="responsive"
                /> */}
              </Box>
            ))}
          </Slider>
        </Box>
        <MainNews />
      </Container>
    </NewWrapper>
  );
}

export default SliderBox;
