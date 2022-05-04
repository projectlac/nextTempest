import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import backgroundAT from "../../../styles/assets/images/payment/backgroundAT.png";
import backgroundBT from "../../../styles/assets/images/payment/buttonNormal.png";
import background from "../../../styles/assets/images/payment/GroupPayment.png";
import One from "./Tab/One";

const DashboardWrapper = styled(Box)(
  ({ theme }) => `
        height: 720px;
        width: 100%;
        display: flex;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 0;
        justify-content: center;
        align-items: center;
        background: url(${background.src});
       
        background-size: contain;    
        background-repeat: no-repeat;
        background-position:center;
        padding: 0 50px;
        position:relative;
        z-index:1;
      `
);

const ListTab = styled(Box)({
  display: "flex",
  position: "absolute",
  top: "-43.5px",
  width: "100%",
  justifyContent: "flex-end",
  marginRight: "50px",
  "& > div": {
    background: `url(${backgroundBT.src})`,
    width: "300px",
    height: "50px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    textAlign: "center",
    paddingTop: "13px",
    color: "#A18A6F",
    fontSize: "20px",
    marginLeft: "5px",
    transition: "all 0.1s linear",
    "&.active": {
      background: `url(${backgroundAT.src})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      color: "#F1E8D3",
      height: "59px",
      marginTop: "-9px",
      paddingTop: "16px",
      fontSize: "22px",
    },
  },
});
function Dashboard() {
  const [active, setActive] = useState<number>(1);
  const handleSetActive = (tab: number) => {
    setActive(tab);
  };
  return (
    <DashboardWrapper mt={10}>
      <ListTab>
        <Box
          className={`${active === 0 ? "active" : ""}`}
          onClick={() => {
            handleSetActive(0);
          }}
        >
          Lịch sử nạp
        </Box>
        <Box
          className={`${active === 1 ? "active" : ""}`}
          onClick={() => {
            handleSetActive(1);
          }}
        >
          Nạp Slime Coin
        </Box>
        <Box
          className={`${active === 2 ? "active" : ""}`}
          onClick={() => {
            handleSetActive(2);
          }}
        >
          Nạp đá sáng thế
        </Box>
      </ListTab>
      <Box width={"100%"}>
        <One />
      </Box>
    </DashboardWrapper>
  );
}

export default Dashboard;
