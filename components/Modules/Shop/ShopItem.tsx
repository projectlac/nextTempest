import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ItemProduct from "../../../styles/assets/images/Shop/ImageProductItem.png";
import StatusBox from "./StatusBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
interface PropShopItem {
  item: string;
  oldPrice?: string;
  newPrice: string;
  status: string;
  id: string;
  image: string;
  slug: string;
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

function ShopItem({
  item,
  id,
  slug,
  image,
  oldPrice,
  newPrice,
  status,
}: PropShopItem) {
  enum STATUS_OF_PRODUCT {
    STOCKING = "#1E8813",
    OUT = "#B91C1C",
  }
  const [listWishList, setListWishList] = useState<string[]>([]);
  const [reRender, setReRender] = useState<boolean>(false);
  const addToWishList = (id: string) => {
    const wishList = localStorage.getItem("wishList");
    if (wishList) {
      const storedWishList = JSON.parse(localStorage.getItem("wishList"));
      const index = storedWishList.indexOf(id);
      if (index === -1) {
        storedWishList.push(id);
        localStorage.setItem("wishList", JSON.stringify(storedWishList));
      } else {
        storedWishList.splice(index, 1);
        localStorage.setItem("wishList", JSON.stringify(storedWishList));
      }
    } else {
      const temp = [id];
      localStorage.setItem("wishList", JSON.stringify(temp));
    }
    setReRender(!reRender);
  };
  useEffect(() => {
    setListWishList(JSON.parse(localStorage.getItem("wishList")));
  }, [reRender]);
  const likeOrNone = (id: string) => {
    const index = listWishList.indexOf(id);
    if (index === -1) {
      return (
        <FavoriteBorderIcon
          sx={{
            color: "#d33",
          }}
          onClick={() => {
            addToWishList(id);
          }}
        ></FavoriteBorderIcon>
      );
    }
    return (
      <FavoriteIcon
        sx={{
          color: "#d33",
        }}
        onClick={() => {
          addToWishList(id);
        }}
      ></FavoriteIcon>
    );
  };
  return (
    <Box>
      <ImageBox>
        <Link href={`/chi-tiet/${slug}`} passHref>
          <Image
            src={image}
            alt={item}
            layout="responsive"
            width={301}
            height={181}
          />
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
            minHeight: {
              lg: "50px",
              xs: "50px",
            },
          }}
        >
          <Link href={`/chi-tiet/${slug}`} passHref>
            <a>
              {item.slice(0, 40)}
              {item.length > 40 && "..."}
            </a>
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
      <Box
        mt={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          {status !== "AVAILABLE" ? (
            <StatusBox colorStatus={STATUS_OF_PRODUCT.OUT} status={status} />
          ) : (
            <StatusBox
              colorStatus={STATUS_OF_PRODUCT.STOCKING}
              status={status}
            />
          )}
        </Box>
        {likeOrNone(id)}
      </Box>
    </Box>
  );
}

export default ShopItem;
