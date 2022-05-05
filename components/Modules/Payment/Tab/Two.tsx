import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import Devider from "../../../../styles/assets/images/payment/PaymentDevider.png";
import dst300 from "../../../../styles/assets/images/payment/dst300.png";

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

function Two() {
  return (
    <Grid container>
      <Grid item md={7}>
        <DashboardBox
          sx={{
            padding: "40px !important",
          }}
        ></DashboardBox>
      </Grid>
      <Grid item md={5}>
        <Box textAlign={"center"} ml={5}>
          <Typography color="#726550" fontSize={30}>
            Chọn gói cần nạp
          </Typography>
          <Image src={Devider} alt="devider" width={440} height={14} />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& .MuiGrid-item": {
                padding: "5px",
              },
            }}
          >
            <Grid item md={4}>
              <Box height={142} sx={{ border: "6px solid #707070" }}>
                <Typography>300 DST</Typography>
                <Image src={dst300} alt="" />
              </Box>
              <Box>105.000</Box>
            </Grid>
            <Grid item md={4}>
              <Box height={142} sx={{ border: "6px solid #707070" }}>
                <Typography>300 DST</Typography>
                <Image src={dst300} alt="" />
              </Box>
              <Box>105.000</Box>
            </Grid>
            <Grid item md={4}>
              <Box height={142} sx={{ border: "6px solid #707070" }}>
                <Typography>300 DST</Typography>
                <Image src={dst300} alt="" />
              </Box>
              <Box>105.000</Box>
            </Grid>
            <Grid item md={4}>
              <Box height={142} sx={{ border: "6px solid #707070" }}>
                <Typography>300 DST</Typography>
                <Image src={dst300} alt="" />
              </Box>
              <Box>105.000</Box>
            </Grid>
            <Grid item md={4}>
              <Box height={142} sx={{ border: "6px solid #707070" }}>
                <Typography>300 DST</Typography>
                <Image src={dst300} alt="" />
              </Box>
              <Box>105.000</Box>
            </Grid>
            <Grid item md={4}>
              <Box height={142} sx={{ border: "6px solid #707070" }}>
                <Typography>300 DST</Typography>
                <Image src={dst300} alt="" />
              </Box>
              <Box>105.000</Box>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Two;
