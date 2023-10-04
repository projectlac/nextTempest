import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import background from "../../styles/assets/images/Shop/BG_Product_Tempest.png";
import TitleHighlight from "../Common/Title/TitleHighlight";
import NewCategoryIndex from "./NewCategoryIndex";
import NewProduct from "./Shop/NewProduct";
import NewProductHsr from "./Shop/NewProductHsr";
import NewProductLowAr from "./Shop/NewProductLowAr";
import NewProductLowArHSR from "./Shop/NewProductLowArHSR";
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
        <NewCategoryIndex></NewCategoryIndex>
        <TitleHighlight>Danh sách tài khoản</TitleHighlight>
        <NewProductHsr></NewProductHsr>
        <NewProduct></NewProduct>
        <NewProductLowArHSR />
        <NewProductLowAr></NewProductLowAr>
        <NewProductTof></NewProductTof>

        {/* <FlashSale></FlashSale> */}
      </Container>
    </ProductWrap>
  );
}

export default ModuleShop;
