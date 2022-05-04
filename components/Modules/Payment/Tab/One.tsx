import React from "react";
import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Devider from "../../../../styles/assets/images/payment/PaymentDevider.png";
import CustomizedRadios from "../CustomItem/CustomizedRadios";
const DashboardBox = styled(Box)(
  ({ theme }) => `
            height: 500px;
            width: 100%;
            background-color: #F4ECE0;
              border: 1px solid #DAB88F;
              border-radius: 30px;
              position:relative;
              z-index: 1;
              padding: 40px;
              text-align:center;
          `
);
function One() {
  return (
    <Grid
      container
      columnSpacing={{ xs: 1, sm: 2, md: 5 }}
      sx={{
        marginTop: "-40px",
      }}
    >
      <Grid item md={3}>
        <DashboardBox></DashboardBox>
      </Grid>
      <Grid item md={9}>
        <DashboardBox>
          <Typography color="#726550" fontSize={32}>
            Các hình thức thanh toán
          </Typography>
          <Image src={Devider} alt="devider" width={440} height={14} />
          <Box textAlign={"left"}>
            <CustomizedRadios />
          </Box>
        </DashboardBox>
      </Grid>
    </Grid>
  );
}

export default One;
