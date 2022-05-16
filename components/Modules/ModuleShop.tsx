import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import background from "../../styles/assets/images/Background.png";
import FlashSale from "./Shop/FlashSale";
import NewProduct from "./Shop/NewProduct";

const ProductWrap = styled(Box)(
  ({ theme }) => `
  
    width: 100vw;
    display: flex;
    background: url(${background.src});
    overflow:hidden;
    background-size: cover;
    justify-content:center;
  `
);

function ModuleShop() {
  return (
    <ProductWrap>
      <Container>
        <NewProduct></NewProduct>
        <FlashSale></FlashSale>
      </Container>
    </ProductWrap>
  );
}

export default ModuleShop;
