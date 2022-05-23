import { Box, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import background from "../../../../styles/assets/images/Background.png";
import BGContainer from "../../../../styles/assets/images/Shop/BuyAccountBG.png";

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

function BuyAccountModule() {
  return (
    <ProductWrap>
      <Box mb={10}>
        <TitleHighlight>Danh sách tài khoản</TitleHighlight>
        <Container sx={{ background: `url(${BGContainer.src})` }}>
          <Grid container>
            <Grid item md={3}>
              <Filter />
            </Grid>
            <Grid item md={9}>
              <ListProduct />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ProductWrap>
  );
}

export default BuyAccountModule;
