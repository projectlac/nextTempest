import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import background from "../../styles/assets/images/Shop/Mask-Group-1.jpg";
import FlashSale from "./Shop/FlashSale";
import NewProduct from "./Shop/NewProduct";
import NewProductLowAr from "./Shop/NewProductLowAr";
import NewProductTof from "./Shop/NewProductTof";

const ProductWrap = styled(Box)(
  ({ theme }) => `
  
    width: 100vw;
    display: flex;
    background: url(${background.src});
    overflow:hidden;
    background-size: cover;
    background-position:bottom;
    justify-content:center;
  `
);

function ModuleShop() {
  return (
    <ProductWrap>
      <Container>
        <NewProduct></NewProduct>
        <NewProductLowAr></NewProductLowAr>
        <NewProductTof></NewProductTof>

        <FlashSale></FlashSale>
      </Container>
    </ProductWrap>
  );
}

export default ModuleShop;
