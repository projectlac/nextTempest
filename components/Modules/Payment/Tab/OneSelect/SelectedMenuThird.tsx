import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import MaintanceFullText from "../../../../../styles/assets/images/payment/MaintanceFullText.png";
const DashboardBox = styled(Box)(
  ({ theme }) => `
              height: 555px;
              width: 100%;
           
              justify-content:center;
              background-color: #F4ECE0;
                border: 1px solid #DAB88F;
                border-radius: 30px;
                position:relative;
                z-index: 1;
                padding: 40px;
                text-align:center;
            `
);
function SelectedMenuThird() {
  return (
    <DashboardBox>
      <Box width={549} height={291} sx={{ margin: "30px auto" }}>
        <Image src={MaintanceFullText} alt="Bảo trì" layout="responsive" />
      </Box>
    </DashboardBox>
  );
}

export default SelectedMenuThird;
