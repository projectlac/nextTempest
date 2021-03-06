import styled from "@emotion/styled";
import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Register from "./Register";

const BgWrap = styled(Box)(
  ({ theme }) => `
        height: 100vh;
        width: 100vw;
        display: flex;
        position:fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 0;
        justify-content: center;
        align-items: center;
        background: #00000090;
        overflow:hidden;
        background-size: cover;    
      `
);

interface PropsAuth {
  closeAuthBox: () => void;
}
function Authentization({ closeAuthBox }: PropsAuth) {
  const [loginMode, setLoginMode] = useState<string>("login");

  const handleLoginMode = (mode: string) => {
    setLoginMode(mode);
  };
  return (
    <BgWrap>
      <Container>
        {(() => {
          switch (loginMode) {
            case "login":
              return (
                <Login
                  handleLoginMode={handleLoginMode}
                  closeAuthBox={closeAuthBox}
                />
              );
              break;
            case "register":
              return (
                <Register
                  handleLoginMode={handleLoginMode}
                  closeAuthBox={closeAuthBox}
                />
              );
            default:
              return <ForgotPassword closeAuthBox={closeAuthBox} />;
              break;
          }
        })()}
      </Container>
    </BgWrap>
  );
}

export default Authentization;
