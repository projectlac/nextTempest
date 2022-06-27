import { Box, Container, Grid, Hidden } from "@mui/material";
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

    zIndex: "1",
    width: "100%",

    "@media (min-width:0)": {
      top: "-20px",
    },
    "@media (min-width: 768px)": {
      top: "-50px",
    },
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

    "@media (min-width:0)": {
      bottom: "-100px",
    },
    "@media (min-width: 768px)": {
      bottom: "-70px",
    },
  },
});

function BuyAccountModule() {
  return (
    <ProductWrap>
      <Box
        mb={20}
        mt={20}
        sx={{
          px: { xs: 2, md: 0 },
        }}
      >
        <TitleHighlight mb={10}>Danh sách tài khoản</TitleHighlight>
        <BackgroundShop>
          <Grid container>
            <Hidden mdDown>
              <Grid item md={3}>
                <Filter />
              </Grid>
            </Hidden>
            <Grid item md={9} sm={12}>
              <ListProduct />
            </Grid>
          </Grid>
        </BackgroundShop>
      </Box>
    </ProductWrap>
  );
}

export default BuyAccountModule;
