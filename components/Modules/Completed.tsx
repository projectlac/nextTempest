import { Box, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import background from "../../styles/assets/images/Shop/BG_Product_Tempest.png";
import BGContainer from "../../styles/assets/images/Shop/mid.png";
import BGContainerTop from "../../styles/assets/images/Shop/top.png";
import BGContainerBot from "../../styles/assets/images/Shop/bot.png";

const ProductWrap = styled(Box)(
  ({ theme }) => `
  
    width: 100vw;
    height:100vh;
    display: flex;
    background: url(${background.src});
    overflow:hidden;
    background-size: cover;
    justify-content:center;
  `
);

const BackgroundShop = styled(Container)({
  background: `url(${BGContainer.src})`,
  position: "relative",
  backgroundSize: "contain",

  "&:before": {
    position: "absolute",
    content: "''",
    background: `url(${BGContainerTop.src})`,
    height: "116px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    left: "0",
    top: "-50px",
    zIndex: "1",
    width: "100%",
  },
  "&:after": {
    position: "absolute",
    content: "''",
    background: `url(${BGContainerBot.src})`,
    height: "116px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    left: "0",
    bottom: "-70px",
    zIndex: "1",
    width: "100%",
  },
});

function Completed() {
  return (
    <ProductWrap>
      <Box mb={10} mt={20}></Box>
    </ProductWrap>
  );
}

export default Completed;
