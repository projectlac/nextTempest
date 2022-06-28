import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import MaintanceFullText from "../../../../../styles/assets/images/payment/MaintanceFullText.png";
const DashboardBox = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#F4ECE0",
  border: "1px solid #DAB88F",
  borderRadius: "30px",
  position: "relative",
  zIndex: "1",

  textAlign: "center",
  "@media (min-width:0)": {
    padding: "20px 20px",
    height: "500px",
  },
  "@media (min-width: 1024px)": {
    padding: "40px",
    height: "550px",
  },
}));
function SelectedMenuThird() {
  return (
    <DashboardBox>
      <Box
        sx={{
          margin: "30px auto",
          width: { md: 549, xs: "100%" },
          height: { md: 291, xs: 250 },
        }}
      >
        <Image src={MaintanceFullText} alt="Bảo trì" layout="responsive" />
      </Box>
    </DashboardBox>
  );
}

export default SelectedMenuThird;
