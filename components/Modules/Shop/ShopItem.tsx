import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ItemProduct from "../../../styles/assets/images/Shop/ImageProductItem.png";
import StatusBox from "./StatusBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppContext } from "../../../context/state";
interface PropShopItem {
  item: string;
  oldPrice?: number;
  newPrice: number;
  status: string;
  idProduct: string;
  id: string;
  image: string;
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
    font-size:13px
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
  @media (min-width: 0px) {
    font-size:13px
  } 
  @media (min-width: 768px){
    font-size:15px
  }
      `
);

function ShopItem({
  idProduct,
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
  const { updated, update } = useAppContext();
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
    updated();
    setReRender(!reRender);
  };
  useEffect(() => {
    setListWishList(JSON.parse(localStorage.getItem("wishList")));
  }, [reRender, update]);
  const likeOrNone = (id: string) => {
    const index = listWishList?.indexOf(id);
    if (index === -1) {
      return (
        <FavoriteBorderIcon
          sx={{
            color: "#d33",
            transform: {
              lg: "scale(1.0)",
              xs: "scale(0.7)",
            },
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
          transform: {
            lg: "scale(1.0)",
            xs: "scale(0.7)",
          },
        }}
        onClick={() => {
          addToWishList(id);
        }}
      ></FavoriteIcon>
    );
  };
  const getSale = () => {
    let old = +oldPrice;
    let newP = +newPrice;

    if (old > newP) return `-${Math.floor(((old - newP) / old) * 100)}%`;
    return;
  };
  const toMoney = (price: number) => {
    return price
      ? price
          .toString()
          .split("")
          .reverse()
          .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ".") + prev;
          })
      : "0";
  };
  return (
    <Box>
      <ImageBox>
        <Link href={`/chi-tiet/${slug}`} passHref>
          <Box
            component={"a"}
            sx={{
              "& span": {
                width: "100% !important",
              },
            }}
          >
            {image && (
              <Image
                src={image}
                alt={item}
                width={320}
                height={182}
                objectFit="cover"
                className="custom-img"
              />
            )}
          </Box>
        </Link>
        {getSale() && <Sale>{getSale()}</Sale>}

        <IdProduct>{idProduct}</IdProduct>
      </ImageBox>
      <Box>
        <Typography
          color="#2D4E96"
          sx={{
            mt: {
              lg: 2,
              xs: 0,
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
          <Link href={`/chi-tiet/${slug}`} passHref>
            <a
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "2",
                overflow: "hidden",
              }}
            >
              {item.slice(0, 50)}
              {item.length > 50 && "..."}
            </a>
          </Link>
        </Typography>
      </Box>
      <BoxPrice>
        {
          <Typography
            color={"#898989"}
            sx={{
              fontSize: {
                md: 12,
                sm: 12,
                xs: 10,
              },
              textDecoration: ` ${+oldPrice > +newPrice && "line-through"}`,
            }}
          >
            {+oldPrice > +newPrice ? `${toMoney(+oldPrice)} VND` : `Giá:`}
          </Typography>
        }

        <Typography
          color={"#D3A36E"}
          sx={{
            fontSize: {
              lg: 18,
              md: 15,
              sm: 15,
              xs: 10,
            },
          }}
        >
          {toMoney(+newPrice)} VND
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
        {status === "AVAILABLE" && likeOrNone(id)}
      </Box>
    </Box>
  );
}

export default ShopItem;
