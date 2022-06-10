import { Box, styled } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
const SocialWrapper = styled(Box)(
  ({ theme }) => `
  position: fixed;
  height: 350px;
  background: #F0F2F6;
  width: 162px;
  transition:0.3s all;
  top: 50%;
  transform: translateY(-50%);
    `
);
const ButtonToggle = styled(Box)(
  ({ theme }) => `
    height: 52px;
    background: #257E9B;
    width: 31px;
    position: absolute;
    border-top-left-radius: 6px;
    top: 20px;
    left: -31px;
    border-bottom-left-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
      `
);
function Social() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <SocialWrapper sx={{ right: `${open ? "0" : "-162px"}` }}>
      <ButtonToggle
        onClick={() => {
          setOpen(!open);
        }}
      >
        <KeyboardArrowLeftIcon
          sx={{
            transform: `rotate(${open ? "180deg" : "0deg"})`,
            fontSize: 40,
            transition: "all 0.2s ",
          }}
        />
      </ButtonToggle>
    </SocialWrapper>
  );
}

export default Social;
