import { Box, Container, Grid, Hidden } from "@mui/material";
import { styled } from "@mui/material/styles";
import background from "../../../../../styles/assets/images/Background.png";
import BGContainerBot from "../../../../../styles/assets/images/Shop/bot.png";
import BGContainer from "../../../../../styles/assets/images/Shop/mid.png";
import BGContainerTop from "../../../../../styles/assets/images/Shop/top.png";
import TitleHighlight from "../../../../Common/Title/TitleHighlight";
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

function BuyAccountReroll() {
  return (
    <ProductWrap>
      <Box
        mb={20}
        sx={{
          mt: { md: 20, xs: 15 },
          px: { xs: 2, md: 0 },
        }}
      >
        <Container>
          <TitleHighlight
            sx={{
              mb: { md: 10, xs: 5 },
            }}
          >
            Danh sách tài khoản
          </TitleHighlight>
        </Container>
        <BackgroundShop>
          <Grid container>
            <Grid item sm={12} xs={12}>
              {/* {slug === "genshin-impact" ? <ListProduct /> : <ListProductTOF />} */}
              <ListProduct />
            </Grid>
          </Grid>
        </BackgroundShop>
      </Box>
    </ProductWrap>
  );
}

export default BuyAccountReroll;
