import styled from "@emotion/styled";
import { Box, Container } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useAppContext } from "../../../context/state";
import background from "../../../styles/assets/images/payment/BG.png";
import coin from "../../../styles/assets/images/payment/Layer-38.png";
import nt from "../../../styles/assets/images/payment/Layer-39.png";
import TitleHighlight from "../../Common/Title/TitleHighlight";
import Authentization from "../Authentization";
import Dashboard from "./Dashboard";

const BgWrap = styled(Box)(({ theme }) => ({
  width: "100vw",
  display: "flex",
  left: "0",
  top: "0",
  bottom: "0",
  right: "0",
  zIndex: "0",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  background: ` url(${background.src})`,
  backgroundSize: "cover",
  "@media (min-width:0)": {
    height: "auto",
  },
  "@media (min-width: 1024px)": {
    height: "100vh",
  },
}));

const BoxSelection = styled(Box)(
  ({ theme }) => `
        display: flex;
        justify-content: center;
        align-items: center;
        height: 653px;
   
      `
);

function PaymentBox() {
  const [openAuth, setOpenAuth] = useState<boolean>(false);
  const { openDashboard, isLogin } = useAppContext();

  const handleOpen = (mode: number) => {
    if (!isLogin) {
      setOpenAuth(true);
    }
  };

  const closeAuthBox = () => {
    setOpenAuth(false);
  };
  return (
    <BgWrap>
      {!openDashboard ? (
        <Container>
          <TitleHighlight>Chọn hình thức nạp</TitleHighlight>
          <BoxSelection mt={2}>
            <Box width={532} height={653}>
              <Image
                src={coin}
                alt="nap smlie coin"
                layout="responsive"
                onClick={() => {
                  handleOpen(1);
                }}
              />
            </Box>
            <Box width={532} height={653}>
              <Image
                src={nt}
                alt="nap da sang the"
                layout="responsive"
                onClick={() => {
                  handleOpen(2);
                }}
              />
            </Box>
          </BoxSelection>
          {openAuth && <Authentization closeAuthBox={closeAuthBox} />}
        </Container>
      ) : (
        <Container>
          <Dashboard />
        </Container>
      )}
    </BgWrap>
  );
}

export default PaymentBox;
