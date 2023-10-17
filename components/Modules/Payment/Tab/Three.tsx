import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { Pack } from "../../../../types";
import InfinityListHistory from "./OneSelect/InfinityListHistory/InfinityListHistory";

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
  color: "#A33E42",
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
    "@media (min-width:0)": {
      fontSize: "13px",
    },
    "@media (min-width: 1024px)": {
      fontSize: "15px",
    },
  },
});

const BoxBody = styled(Box)({
  background: "#F4ECE0",
  height: "530px",
  overflow: "hidden",
  overflowY: "auto",
});

function Three() {
  const [defauValue, setDefaultValue] = useState<Pack[]>([
    {
      name: "300ĐST",
      id: "1",
      price: "105000",
      image: `dst300`,
      quantily: 0,
    },
    {
      name: "300ĐST",
      id: "2",
      price: "105000",
      image: `dst300`,
      quantily: 0,
    },
    {
      name: "300ĐST",
      id: "3",
      price: "105000",
      image: `dst300`,
      quantily: 0,
    },
    {
      name: "300ĐST",
      id: "4",
      price: "105000",
      image: `dst300`,
      quantily: 0,
    },
    {
      name: "300ĐST",
      id: "5",
      price: "105000",
      image: `dst300`,
      quantily: 0,
    },
    {
      name: "300ĐST",
      id: "6",
      price: "105000",
      image: `dst300`,
      quantily: 0,
    },
    {
      name: "300ĐST",
      id: "7",
      price: "105000",
      image: `dst300`,
      quantily: 0,
    },
    {
      name: "300ĐST",
      id: "8",
      price: "105000",
      image: `dst300`,
      quantily: 0,
    },
  ]);

  return (
    <Grid container sx={{ position: "relative", zIndex: 2 }}>
      <DashboardBox
        sx={{
          padding: "0px 0px !important",
          overflow: "hidden",

          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: "5px",
          },
          mt: {
            md: 0,
            xs: 3,
          },
        }}
      >
        <Box
          height={598}
          sx={{
            width: {
              md: "100%",
              xs: 700,
            },

            margin: "0 auto",
            borderRadius: "30px",
            overflow: "hidden",
          }}
        >
          <BodyHead>
            <Box style={{ width: "10%" }}>STT</Box>
            <Box style={{ width: "20%" }}>Mã tài khoản</Box>
            <Box style={{ width: "20%" }}>User</Box>
            <Box style={{ width: "20%" }}>Password</Box>
            <Box style={{ width: "30%" }}>Game</Box>
          </BodyHead>
          <BoxBody>
            <InfinityListHistory />
          </BoxBody>
        </Box>
      </DashboardBox>
    </Grid>
  );
}

export default Three;
