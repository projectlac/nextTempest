import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import background from "../../../../styles/assets/images/Background.png";
import BGContainer from "../../../../styles/assets/images/Shop/BuyAccountBG.png";

import TitleHighlight from "../../../Common/Title/TitleHighlight";
import ImageCarousel from "./ImageCarousel";

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

function DetailAccountModule() {
  return (
    <ProductWrap>
      <Box mb={10} mt={20} textAlign="center">
        <TitleHighlight mb={3}>Thông số chi tiết</TitleHighlight>
        <Typography
          fontSize={20}
          color="#fff"
          mb={3}
        >{`[EU] AR58 - Ayato, Ayaka, Xiao, Raiden Shogun, Itto, Zhongli, Venti, Ganyu, Diluc, Mona, Keqing (C1), Qiqi (C1)`}</Typography>

        <Container maxWidth={"lg"}>
          <Grid container>
            <Grid item md={12}>
              <ImageCarousel />
            </Grid>
            <Grid item md={7}>
              2
            </Grid>

            <Grid item md={5}>
              3
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ProductWrap>
  );
}

export default DetailAccountModule;
