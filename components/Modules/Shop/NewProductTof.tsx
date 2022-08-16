import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import TitleHighlight from "../../Common/Title/TitleHighlight";
import BG from "../../../styles/assets/images/Shop/BGnewProduct.png";
import BGButtonShowMore from "../../../styles/assets/images/Shop/ButtonShowMore.png";
import NewestProduct from "../../../styles/assets/images/Shop/newestProduct.png";
import tagApi from "../../../api/tag";
import ShopItem from "./ShopItem";
import Link from "next/link";
import BackgroundShopResponse from "../../Common/BackgroundShop/BackgroundShopResponse";

const BoxShop = styled(Box)(
  ({ theme }) => `
    height: 627px;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: url(${BG.src});
    background-repeat: no-repeat;
    background-size: contain;
    padding: 0 60px;
    position: relative;
    @media (min-width: 0px) {
      height: 627px;
    } 
    @media (min-width: 768px){
      height: 627px;
    }
    @media (min-width: 1024px) {
      height: 450px;
    } 
    @media (min-width: 1440px) {
      height: 627px;
    } 
  `
);

const ButtonShowMore = styled(Box)({
  display: "flex",
  left: "0",
  bottom: "-35px",
  right: "0",
  zIndex: "2",
  margin: "0 auto",
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  background: `url(${BGButtonShowMore.src})`,
  backgroundSize: "contain",
  color: "#fff",

  "@media (min-width: 0)": {
    height: "47px",
    width: "181px",
    padding: "0 36px",
    fontSize: "14px",
  },
  "@media (min-width: 768px)": {
    height: "60px",
    width: "237px",
    padding: "1px 60px",
    fontSize: "17px",
  },
});

const Title = styled(Box)(
  ({ theme }) => `
    display: flex;
    left: 0;
    right: 0;
    margin:0 auto;
    position:absolute;
    justify-content: center;
    align-items: center;
    background: url(${NewestProduct.src});
    overflow:hidden;
    top: -65px;
    width: 250px;
    height: 100px;
    background-size: contain;
    background-repeat: no-repeat;
    padding: 0 60px;
    color:#fff;
    font-size:17px;
    z-index:2

  `
);

function NewProductTof() {
  const [productList, setProductList] = useState<any>([]);

  useEffect(() => {
    tagApi
      .getAccount({
        character: "",
        limit: 4,
        offset: 0,
        server: "",
        weapon: "",
        sort: null,
        queryString: "",
        game: "tower-of-fantasy",
      })
      .then((res) => setProductList(res.data.data));
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <BackgroundShopResponse>
        <Title />
        <Box
          pt={4}
          pb={8}
          sx={{
            mt: { lg: 18, xs: 12 },
          }}
        >
          <Grid
            container
            columnSpacing={3}
            sx={{
              px: { md: 4, xs: 2 },
              position: "relative",
              zIndex: 2,
            }}
          >
            {productList &&
              productList.map((d, i) => (
                <Grid
                  item
                  md={3}
                  sm={3}
                  xs={6}
                  key={i}
                  sx={{
                    mt: { lg: 3, xs: 3 },
                  }}
                >
                  <ShopItem
                    image={d.imageUrl}
                    item={d.name}
                    idProduct={d.code}
                    oldPrice={+d.oldPrice}
                    newPrice={+d.newPrice}
                    status={d.status}
                    slug={d.slug}
                    id={d.id}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        <ButtonShowMore>
          <Link
            href={{
              pathname: "/mua-tai-khoan/[id]",
              query: { id: "tower-of-fantasy" },
            }}
            passHref
          >
            Xem thêm
          </Link>
        </ButtonShowMore>
      </BackgroundShopResponse>
    </Box>
  );
}

export default NewProductTof;
