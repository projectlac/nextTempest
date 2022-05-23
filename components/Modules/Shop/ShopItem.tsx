import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ItemProduct from "../../../styles/assets/images/Shop/ImageProductItem.png";
import StatusBox from "./StatusBox";

interface PropShopItem {
  item: string;
  oldPrice?: string;
  newPrice: string;
  status: number;
  id: string;
}

const ImageBox = styled(Box)(
  ({ theme }) => `
      height: 182px;
      width: 100%;
      @media (min-width: 0px) {
        height: 189px; 
      } 
      @media (min-width: 768px){
        height: 182px;
      }
      @media (min-width: 1024px) {
        height: 123px;
      } 
      @media (min-width: 1440px) {
    
        height: 182px;
    
      } 
  
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
function ShopItem({ item, id, oldPrice, newPrice, status }: PropShopItem) {
  enum STATUS_OF_PRODUCT {
    STOCKING = "#1E8813",
    OUT = "#B91C1C",
  }
  return (
    <Box>
      <ImageBox>
        <Link href={`/chi-tiet/${id}`} passHref>
          <Image src={ItemProduct} alt={item} layout="responsive" />
        </Link>
      </ImageBox>
      <Box>
        <Typography
          color="#2D4E96"
          sx={{
            mt: {
              lg: 2,
              xs: 1,
            },
            fontSize: {
              lg: "1rem",
              md: "13px",
            },
          }}
        >
          <Link href={`/chi-tiet/${id}`} passHref>
            {item}
          </Link>
        </Typography>
      </Box>
      <BoxPrice>
        {oldPrice && (
          <Typography
            color={"#898989"}
            sx={{
              fontSize: {
                md: 12,
                sm: 12,
                xs: 10,
              },
              textDecoration: "line-through",
            }}
          >
            {oldPrice}
          </Typography>
        )}

        <Typography
          color={"#D3A36E"}
          sx={{
            fontSize: {
              lg: 18,
              md: 15,
              sm: 15,
              xs: 12,
            },
          }}
        >
          {newPrice}
        </Typography>
      </BoxPrice>
      <Box mt={1}>
        {status === 0 ? (
          <StatusBox colorStatus={STATUS_OF_PRODUCT.OUT} status={status} />
        ) : (
          <StatusBox colorStatus={STATUS_OF_PRODUCT.STOCKING} status={status} />
        )}
      </Box>
    </Box>
  );
}

export default ShopItem;
