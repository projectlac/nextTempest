import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import { useEffect, useState } from "react";
import tagApi from "../../../api/tag";
import BGButtonShowMore from "../../../styles/assets/images/Shop/Button-Fornite_Tempest.png";
import NewestProduct from "../../../styles/assets/images/Shop/acckhoidauzzz.png";
import BackgroundShopResponse from "../../Common/BackgroundShop/BackgroundShopResponse";
import ShopItem from "./ShopItem";
import { GAME } from "../../../utility/constain";

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

const Title = styled(Box)({
  display: "flex",
  left: "0",
  right: "0",
  margin: "0 auto",
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  top: "-65px",
  width: "430px",
  height: "100px",
  background: `url(${NewestProduct.src})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  padding: "0 60px",
  color: "#fff",
  fontSize: "17px",
  zIndex: "2",

  "@media (min-width: 0)": {
    width: "315px",
    top: "-50px",
  },
  "@media (min-width: 768px)": {
    width: "430px",
    top: "-65px",
  },
});

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
        isSold: false,
        game: GAME.ZZZ,
        type: "NEW",
      })
      .then((res) => setProductList(res.data.data));
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        margin: "0 0 100px 0",
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
              query: { id: GAME.ZZZ },
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
