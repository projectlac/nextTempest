import {
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import background from "../../../../styles/assets/images/Shop/BG_Product_Tempest.png";
import background from "../../../../styles/assets/images/Shop/BG_Product_Tempest.png";
import BGContainerBot from "../../../../styles/assets/images/Shop/bot.png";
import BGContainer from "../../../../styles/assets/images/Shop/mid.png";
import BGContainerTop from "../../../../styles/assets/images/Shop/top.png";
import TitleHighlight from "../../../Common/Title/TitleHighlight";
import Filter from "./Filter";
import ListProduct from "./ListProduct";
import { useState } from "react";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
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

interface IBuy {
  slug: string;
  type: string;
}
function BuyAccountModule({ slug, type }: IBuy) {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => {
    setShow(false);
  };
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
          <Hidden mdUp>
            <Box
              sx={{
                position: "relative",
                zIndex: "2",
                display: "flex",
                alignItems: "center",
                mb: 2,
                pt: 1,
                pl: 1,
              }}
              onClick={() => {
                setShow(true);
              }}
            >
              <Button variant="outlined">
                <TravelExploreIcon color="primary" />
                <Typography color={"primary"} ml={1}>
                  Bộ lọc
                </Typography>
              </Button>
            </Box>
          </Hidden>
          <Hidden mdUp>
            <Box
              sx={{
                position: "fixed",
                top: "50%",
                zIndex: "99",
                left: "0",
                right: "0",
                transform: "translateY(-50%)",
                display: show ? "block" : "none",
              }}
            >
              <Filter slug={slug} handleClose={handleClose} />
            </Box>
            <Box
              sx={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100vw",
                height: "100vh",
                background: "#3f3f3f47",
                zIndex: "98",
                display: show ? "block" : "none",
              }}
            ></Box>
          </Hidden>
          <Grid container>
            <Hidden mdDown>
              <Grid item md={3}>
                <Filter slug={slug} />
              </Grid>
            </Hidden>

            <Grid item md={9} sm={12} xs={12}>
              {/* {slug === "genshin-impact" ? <ListProduct /> : <ListProductTOF />} */}
              <ListProduct slug={slug} type={type} />
            </Grid>
          </Grid>
        </BackgroundShop>
      </Box>
    </ProductWrap>
  );
}

export default BuyAccountModule;
