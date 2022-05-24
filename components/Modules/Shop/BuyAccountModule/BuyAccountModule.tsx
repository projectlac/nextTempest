import { Box, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import background from "../../../../styles/assets/images/Background.png";
import BGContainer from "../../../../styles/assets/images/Shop/mid.png";
import BGContainerTop from "../../../../styles/assets/images/Shop/top.png";
import BGContainerBot from "../../../../styles/assets/images/Shop/bot.png";

import TitleHighlight from "../../../Common/Title/TitleHighlight";
import Filter from "./Filter";
import ListProduct from "./ListProduct";

const ProductWrap = styled(Box)(
  ({ theme }) => `
  
    width: 100vw;
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

function BuyAccountModule() {
  return (
    <ProductWrap>
      <Box mb={10} mt={20}>
        <TitleHighlight mb={10}>Danh sách tài khoản</TitleHighlight>
        <BackgroundShop>
          <Grid container>
            <Grid item md={3}>
              <Filter />
            </Grid>
            <Grid item md={9}>
              <ListProduct />
            </Grid>
          </Grid>
        </BackgroundShop>
      </Box>
    </ProductWrap>
  );
}

export default BuyAccountModule;
