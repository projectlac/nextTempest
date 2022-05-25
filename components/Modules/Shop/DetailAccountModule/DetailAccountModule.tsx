import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import background from "../../../../styles/assets/images/Background.png";
import BGContainer from "../../../../styles/assets/images/Shop/BuyAccountBG.png";
import { TAG_TYPE } from "../../../../types/account";

import TitleHighlight from "../../../Common/Title/TitleHighlight";
import DetailInformation from "./DetailInformation";
import DetailPrice from "./DetailPrice";
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
interface DataDetail {
  data: any;
}
function DetailAccountModule({ data }: DataDetail) {
  console.log(data);

  return (
    <ProductWrap>
      <Box mb={10} mt={20} textAlign="center">
        <TitleHighlight mb={3}>Thông số chi tiết</TitleHighlight>
        <Typography fontSize={20} color="#fff" mb={8}>
          {data.name}
        </Typography>

        <Container maxWidth={"lg"}>
          <Grid container columnSpacing={3}>
            <Grid item md={12} mb={7.5}>
              <ImageCarousel imageList={data.cloundinary} />
            </Grid>
            <Grid item md={7} mt={7.5}>
              <DetailInformation
                description={data.description}
                weapon={[...data.tags].filter(
                  (d) => d.type === TAG_TYPE.WEAPON
                )}
              />
            </Grid>

            <Grid item md={5} mt={7.5}>
              <DetailPrice
                accountId={data.code}
                price={data.newPrice}
                ar={data.ar}
                id={data.id}
                primogems={data.nguyenThach}
                tinhHuy={data.tinhHuy}
                moonPack={data.moonPack}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ProductWrap>
  );
}

export default DetailAccountModule;
