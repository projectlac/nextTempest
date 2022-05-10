import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import Devider from "../../../../styles/assets/images/payment/PaymentDevider.png";
import BGPack from "../../../../styles/assets/images/payment/BGPack.png";
import dst300 from "../../../../styles/assets/images/payment/dst300.png";
import Quati from "../../../../styles/assets/images/payment/Quati.png";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Pack } from "../../../../types";

const DashboardBox = styled(Box)(
  ({ theme }) => `
            height: 600px;
            width: 100%;
            background-color: #F4ECE0;
              border: 1px solid #DAB88F;
              border-radius: 30px;
              position:relative;
              z-index: 1;
              padding: 20px;
              text-align:center;
          `
);

enum COLOR_BORDER {
  MAIN = "#8A573E",
}
const BodyHead = styled(Box)({
  height: "70px",
  color: "#A25E42",
  display: "flex",
  background: "#f3e3ca",
  "& > div ": {
    borderBottom: " 2px solid #DAB88F",
    borderLeft: "2px solid #DAB88F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:first-of-type": {
      borderLeft: "none",
    },
  },
});

const BoxBody = styled(Box)({
  background: "#F4ECE0",
  height: "530px",
  overflow: "hidden",
  overflowY: "auto",
});
const BodyTable = styled(Box)({
  background: "#e4ddd2",
  display: "flex",
  overflow: "hidden",
  overflowY: "auto",
  color: "#6B5E4F",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "& > div ": {
    height: "70px",

    borderBottom: " 2px solid #DAB88F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:first-of-type": {
      borderLeft: "none",
    },
  },
});
function Three() {
  const [defauValue, setDefaultValue] = useState<Pack[]>([
    {
      name: "300ĐST",
      id: "1",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
    {
      name: "300ĐST",
      id: "2",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
    {
      name: "300ĐST",
      id: "3",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
    {
      name: "300ĐST",
      id: "4",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
    {
      name: "300ĐST",
      id: "5",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
    {
      name: "300ĐST",
      id: "6",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
    {
      name: "300ĐST",
      id: "7",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
    {
      name: "300ĐST",
      id: "8",
      price: "105000",
      image: `dst300`,
      quatily: 0,
    },
  ]);
  const toMoney = (price: string) => {
    return price
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  };
  return (
    <Grid container>
      <Grid item md={12}>
        <DashboardBox
          sx={{
            padding: "0px 0px !important",
          }}
        >
          <Box
            height={598}
            sx={{
              width: "100%",
              margin: "0 auto",
              borderRadius: "30px",
              overflow: "hidden",
            }}
          >
            <BodyHead>
              <Box style={{ width: "7%" }}>STT</Box>
              <Box style={{ width: "25%" }}>Loại tiền</Box>
              <Box style={{ width: "24%" }}>Mệnh giá</Box>
              <Box style={{ width: "22%" }}>Ghi chú</Box>
              <Box style={{ width: "22%" }}>Trạng thái</Box>
            </BodyHead>
            <BoxBody>
              {defauValue.length > 0 &&
                defauValue.map((d, index) => (
                  <BodyTable key={index + d.id}>
                    <Box width={"7%"}>{index}</Box>
                    <Box width={"25%"}>{d.name}</Box>
                    <Box width={"24%"}>{toMoney(d.price)} VNĐ</Box>

                    <Box width={"22%"}>{`sdasdas`}</Box>
                    <Box width={"22%"}>Pending...</Box>
                  </BodyTable>
                ))}
            </BoxBody>
          </Box>
        </DashboardBox>
      </Grid>
    </Grid>
  );
}

export default Three;
