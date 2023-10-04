import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import background from "../../../../styles/assets/images/Shop/BG_Product_Tempest.png";
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
  return (
    <ProductWrap>
      <Box mb={10} mt={20} textAlign="center">
        <TitleHighlight mb={3}>Thông số chi tiết</TitleHighlight>
        <Typography
          sx={{
            fontSize: {
              lg: "20px",
              md: "18px",
              xs: "17px",
            },
            mb: {
              lg: 8,
              xs: 6,
            },
            textShadow: "0 0 5px #69e0ff, 0 0 10px #69e0ff, 0 0 15px #69e0ff",
          }}
          color="#fff"
        >
          {data.name}
        </Typography>

        <Container maxWidth={"lg"}>
          <Grid container columnSpacing={3}>
            <Grid item md={12} mb={7.5}>
              <ImageCarousel imageList={data.cloundinary} />
            </Grid>
            <Grid
              item
              sm={7}
              xs={12}
              sx={{
                mt: {
                  lg: 7.5,
                  sm: 2.5,
                  xs: 0,
                },
              }}
            >
              <DetailInformation
                description={data.description}
                game={data.game}
                weapon={[...data.tags].filter(
                  (d) => d.type === TAG_TYPE.WEAPON
                )}
              />
            </Grid>

            <Grid
              item
              sm={5}
              xs={12}
              sx={{
                mt: {
                  lg: 7.5,
                  sm: 2.5,
                  xs: 7.5,
                },
              }}
            >
              <DetailPrice
                accountId={data.code}
                price={data.newPrice}
                ar={data.ar}
                id={data.id}
                slug={data.slug}
                primogems={data.nguyenThach}
                tinhHuy={data.tinhHuy}
                moonPack={data.moonPack}
                game={data.game}
                ortherParamTof={data.ortherParamTof}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ProductWrap>
  );
}

export default DetailAccountModule;
