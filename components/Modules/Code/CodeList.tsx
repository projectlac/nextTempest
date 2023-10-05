import { Box, Container, Grid, Hidden } from "@mui/material";
import { styled } from "@mui/material/styles";
// import background from "../../../../styles/assets/images/Shop/BG_Product_Tempest.png";
import background from "../../../styles/assets/images/Shop/Mask-Group-1.jpg";
import BGContainerBot from "../../../styles/assets/images/Shop/bot.png";
import BGContainer from "../../../styles/assets/images/Shop/mid.png";
import BGContainerTop from "../../../styles/assets/images/Shop/top.png";
import TitleHighlight from "../../Common/Title/TitleHighlight";
import CodeItem from "./CodeItem";
import { useEffect, useState } from "react";
import { ICodeCategoryDetail } from "../../../types/code";
import codeApi from "../../../api/codeApi";
import { useAppContext } from "../../../context/state";

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

function CodeList() {
  const { update } = useAppContext();
  const [listCodeCategory, setListCodeCategory] = useState<
    ICodeCategoryDetail[]
  >([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    codeApi.getCodeHomePage(10, 0).then((res) => {
      setListCodeCategory(res.data.data ?? []);
      setTotal(res.data.total);
    });
  }, [update]);
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
            Danh sách code
          </TitleHighlight>
        </Container>
        <BackgroundShop>
          <Grid container sx={{ paddingLeft: "20px" }} columnSpacing={2}>
            {listCodeCategory.map((d) => (
              <Grid
                item
                md={4}
                key={d.id}
                sx={{
                  position: "relative",
                  zIndex: "2",
                }}
              >
                <CodeItem
                  image={d.image}
                  name={d.name}
                  price={d.price}
                  amount={d.amount}
                  slug={d.slug}
                />
              </Grid>
            ))}
          </Grid>
        </BackgroundShop>
      </Box>
    </ProductWrap>
  );
}

export default CodeList;
