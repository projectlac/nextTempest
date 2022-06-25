import { Box, Typography } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import toMoney from "../../../../utility/toMoney";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { remove } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "../../../../context/state";
import audit from "../../../../api/audit";
import { useRouter } from "next/router";

interface ICart {
  openCart: boolean;
  wrapperRef: any;
  ids: any;
  data: any;
  removeID: (id: string) => void;
}
function Cart({ openCart, wrapperRef, ids, data, removeID }: ICart) {
  const {
    isLogin,
    handleChangeMessageToast,
    refreshLogin,
    handleChangeStatusToast,
  } = useAppContext();
  const [wallet, setWallet] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    if (isLogin)
      audit
        .getProfile()
        .then((res) => {
          setWallet(+res.data.money);
        })
        .catch((res) => {
          handleChangeMessageToast("Có lỗi định danh");
          handleChangeStatusToast();
          refreshLogin();
          localStorage.removeItem("access_token");
          router.push("/");
        });
  }, []);

  const buyAccount = () => {
    let sumPrice = 0;
    data.forEach((d) => (sumPrice += +d.newPrice));
    console.log(sumPrice);

    if (sumPrice > wallet) {
      handleChangeMessageToast(
        "Bạn không đủ Smile Coin để mua tài khoản này, vui lòng nạp thêm"
      );
      handleChangeStatusToast();
    } else {
      router.push(`/thanh-toan/${ids && ids.toString()}?redirect=/`);
    }
  };

  return (
    <Box
      width={300}
      height={300}
      className="box-wishlist"
      sx={{
        background: "#fff",
        position: "absolute",
        height: "300px",
        right: 0,
        top: "40px",
        border: "4px solid #3b5898",
        flexDirection: "column",
        display: `${openCart ? "flex" : "none"}`,
      }}
      ref={wrapperRef}
    >
      <ArrowDropUpIcon
        sx={{
          color: "#fff",
          position: "absolute",
          top: "-14px",
          right: "0px",
        }}
      />
      <Box
        height={250}
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
        }}
      >
        {ids && ids.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItem: "center",
            }}
          >
            Giỏ hàng không có gì cả
          </Box>
        ) : (
          <Box width={300}>
            {data.map((d) => (
              <Box key={d.id}>
                <Box
                  sx={{
                    display: "flex",
                    padding: "5px 5px",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <Box width={95} height={56}>
                    <Image
                      src={d?.imageUrl}
                      alt=""
                      width={95}
                      height={56}
                      objectFit="cover"
                    />
                  </Box>
                  <Box width={"calc(100% - 130px)"}>
                    <Typography
                      fontSize={15}
                      fontFamily="Montserrat"
                      fontWeight={600}
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: "1",
                        overflow: "hidden",
                      }}
                    >
                      <Link href={`/chi-tiet/${d.slug}`}>{d.name}</Link>
                    </Typography>
                    <Typography
                      fontSize={13}
                      fontFamily="Montserrat"
                      color="#999"
                    >
                      <i> {toMoney(d.newPrice)} VND</i>
                    </Typography>
                  </Box>
                  <Box
                    width={30}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#d33",
                    }}
                  >
                    <CloseIcon
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        removeID(d.id);
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      {isLogin && ids && ids?.length > 0 && (
        <Box
          height={50}
          sx={{
            background: "#bea579",
            display: "flex",
            alignItem: "center",
            cursor: "pointer",
            justifyContent: "center",
            transition: "0.2s all ease",
            "&:hover": {
              background: "#ab8f5f",
            },
          }}
          onClick={buyAccount}
        >
          <Typography
            sx={{
              margin: "auto",
              color: "#fff",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              fontSize: 17,
            }}
          >
            Mua
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Cart;
