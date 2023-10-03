import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import FlashSate from "../../../styles/assets/images/Shop/FLASH-SALE.png";
import BGButtonShowMore from "../../../styles/assets/images/Shop/Button-Fornite_Tempest.png";

import Link from "next/link";
import tagApi from "../../../api/tag";
import BackgroundShopResponse from "../../Common/BackgroundShop/BackgroundShopResponse";
import ShopItem from "./ShopItem";

const ButtonShowMore = styled(Box)({
  display: "flex",
  left: "0",
  bottom: "-30px",
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
    height: "41px",
    width: "181px",
    padding: "0 36px",
    fontSize: "14px",
  },
  "@media (min-width: 768px)": {
    height: "54px",
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
    background: url(${FlashSate.src});
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

function NewProduct() {
  const [productList, setProductList] = useState<any>([]);

  useEffect(() => {
    tagApi
      .getAccount({
        character: "",
        limit: 8,
        offset: 0,
        server: "",
        weapon: "",
        sort: 3,
        queryString: "",
        isSold: false,
        type: "",
      })
      .then((res) => setProductList(res.data.data));
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
        mt: { md: 30, xs: 15 },
        mb: { md: 20, xs: 15 },
      }}
    >
      <BackgroundShopResponse>
        <Title />
        <Box py={5}>
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
        </Box>
        <ButtonShowMore>
          <Link
            href={{
              pathname: "/mua-tai-khoan/[id]",
              query: { id: "genshin-impact" },
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

export default NewProduct;
