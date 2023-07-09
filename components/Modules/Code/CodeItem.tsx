import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ItemProduct from "../../../styles/assets/images/Shop/ImageProductItem.png";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppContext } from "../../../context/state";
import toMoney from "../../../utility/toMoney";
import BuyCode from "./DialogBuy/DialogBuy";
interface PropShopItem {
  image: string;
  name: string;
  price: string;
  amount: string;
  slug: string;
}

const ImageBox = styled(Box)(
  ({ theme }) => `
      height: auto;
      width: 100%;
      position:relative;
 
    `
);
const BoxPrice = styled(Box)(
  ({ theme }) => `
  width: 100%;
  background: #F7F5ED;
  padding: 10px 10px;
  border: 1px solid #DAB88F;
  border-radius: 15px;
  text-align: center;
  margin-top: 20px;
  @media (min-width: 0px) {
    margin-top: 5px;
    padding: 5px 5px;

  } 
  @media (min-width: 768px){
    margin-top: 5px;
    padding: 5px 5px;

  }
  @media (min-width: 1024px) {
    margin-top: 5px;
    padding: 5px 5px;

  } 
  @media (min-width: 1440px) {
    margin-top: 20px;
    padding: 10px 10px;
  } 
      `
);

const Sale = styled(Box)(
  ({ theme }) => `
  position: absolute;
  background: #BF0606;
  color:#fff;
  padding:2px 5px;
  font-family: "Montserrat";
  font-weight:bold;
  bottom:0;
  @media (min-width: 0px) {
    font-size:10px
  } 
  @media (min-width: 768px){
    font-size:15px
  }
      `
);
const IdProduct = styled(Box)(
  ({ theme }) => `
  position: absolute;
  background: #0A2B6D;
  color:#fff;
  padding:2px 5px;
  font-family: "Montserrat";
  font-weight:bold;
  top:0;
  right:0;
  margin:0;
  @media (min-width: 0px) {
    font-size:10px;
    font-weight: 600;
  } 
  @media (min-width: 768px){
    font-size:10px
  }
  @media (min-width: 1024px){
    font-size:15px
  }
      `
);

function ShopItem({ image, name, price, amount, slug }: PropShopItem) {
  const [amountBuy, setAmountBuy] = useState<number>(0);
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountBuy(+e.target.value);
  };

  return (
    <Box
      sx={{
        padding: "15px",
        background: "#fff6ef",
        borderRadius: "10px",
        boxShadow: "0px 0px 5px 1px #ddd",
      }}
    >
      <ImageBox>
        <Box
          component={"a"}
          sx={{
            display: "flex",
            "& span": {
              width: "100% !important",
            },
          }}
        >
          {image && (
            <Image
              src={image}
              alt={name}
              width={320}
              height={250}
              objectFit="cover"
              className="custom-img"

              // loading="eager"
            />
          )}
        </Box>
      </ImageBox>
      {name && (
        <Box>
          <Typography
            component="h2"
            color="#2D4E96"
            align="center"
            sx={{
              mt: {
                lg: 2,
                xs: 0.5,
              },
              fontSize: {
                lg: "1rem",
                sm: "13px",
                xs: "10px",
              },
              minHeight: {
                lg: "50px",
                sm: "40px",
                xs: "30px",
              },
            }}
          >
            {name.slice(0, 50)}
            {name.length > 50 && "..."}
          </Typography>
        </Box>
      )}

      <BoxPrice>
        <Typography
          component="h3"
          color={"#898989"}
          sx={{
            fontSize: {
              md: 15,
              sm: 10,
              xs: 10,
            },
          }}
        >
          Giá: {`${toMoney(+price)} VND`} - Còn lại: {amount}
        </Typography>
      </BoxPrice>
      <Box
        mt={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid container columnSpacing={2} sx={{ mt: 1 }}>
          <Grid item md={4}>
            <TextField
              type="number"
              label="Nhập số lượng"
              InputProps={{ inputProps: { min: 0 } }}
              defaultValue={""}
              onChange={handleChangeAmount}
              sx={{
                backgroundColor: "#fff",
                fontSize: "15px",
              }}
            ></TextField>
          </Grid>
          <Grid item md={8}>
            <BuyCode
              amount={amountBuy}
              limit={amount}
              name={name}
              slug={slug}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ShopItem;
