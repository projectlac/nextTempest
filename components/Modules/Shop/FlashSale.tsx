import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import TitleHighlight from "../../Common/Title/TitleHighlight";
import BG from "../../../styles/assets/images/Shop/BGFlashSale.png";
import BGButtonShowMore from "../../../styles/assets/images/Shop/ButtonShowMore.png";

import ShopItem from "./ShopItem";
import Link from "next/link";
import tagApi from "../../../api/tag";
const BoxShop = styled(Box)(
  ({ theme }) => `
    height: 1025px;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: url(${BG.src});
    margin-top: 100px;
    background-repeat:no-repeat;
    background-size: contain;
    padding: 1px 60px;
    position: relative;

    @media (min-width: 0px) {
      height: 740px;
      margin-bottom:75px;

    } 
    @media (min-width: 768px){
      height: 740px;
      margin-bottom:75px;

    }
    @media (min-width: 1024px) {
      height: 740px;
      margin-bottom:75px;

    } 
    @media (min-width: 1440px) {
      height: 1025px;
      margin-bottom:150px;

    } 
  `
);

const ButtonShowMore = styled(Box)(
  ({ theme }) => `
    height: 60px;
    width: 237px;
    display: flex;
    left: 0;
    bottom:-28px;
    right: 0;
    z-index: 0;
    margin:0 auto;
    position:absolute;
    justify-content: center;
    align-items: center;
    background: url(${BGButtonShowMore.src});
    overflow:hidden;
    background-size: contain;
    padding: 1px 60px;
    color:#fff;
    font-size:17px
  `
);

function NewProduct() {
  const [productList, setProductList] = useState<any>([]);

  useEffect(() => {
    tagApi
      .getAccount({
        character: "",
        limit: 4,
        offset: 0,
        server: "",
        weapon: "",
        sort: 3,
      })
      .then((res) => setProductList(res.data.data));
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <BoxShop mt={4}>
        <Grid
          container
          columnSpacing={3}
          sx={{
            mt: { lg: 18, xs: 12 },
          }}
        >
          {productList &&
            productList.map((d, i) => (
              <Grid
                item
                md={3}
                key={i}
                mt={2}
                sx={{
                  mb: {
                    lg: 4,
                    xs: 3,
                  },
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
        <ButtonShowMore>
          <Link href={`/mua-tai-khoan`} passHref>
            Xem thêm
          </Link>
        </ButtonShowMore>
      </BoxShop>
    </Box>
  );
}

export default NewProduct;
