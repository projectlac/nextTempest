import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Box, styled } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaDiscord,
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import zalo from "../../../styles/assets/images/icons9-zalo.svg";
import Smile from "../../../styles/assets/images/Smile.png";
const SocialWrapper = styled(Box)(
  ({ theme }) => `
  position: fixed;
  height: 350px;
  background: #F0F2F6;
  width: 162px;
  transition:0.3s all;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
    `
);
const ButtonToggle = styled(Box)(
  ({ theme }) => `
    height: 52px;
    background: #257E9B;
    width: 31px;
    position: absolute;
    border-top-left-radius: 6px;
    top: 50px;
    left: -31px;
    border-bottom-left-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
   
      `
);
const SocialList = styled(Box)({
  display: "flex",
  flexDirection: "column",

  padding: "20px",

  justifyContent: "space-evenly",
  height: "100%",

  "& a": {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: " 13px",
    display: "flex",
    justifyContent: "space-between",
    textAlign: "right",
    alignItems: "center",
    "& svg": {
      fontSize: "25px",
    },
  },
});
const SmileBox = styled(Box)(
  ({ theme }) => `
      height: 72px;
      width: 103px;
      position: absolute;
      background: url(${Smile.src});
      top: -40px;
      left: -31px;
      transition:0.3s all;
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
      <SmileBox sx={{ opacity: `${open ? 1 : 0}` }} />
      <SocialList>
        <Link href="https://www.facebook.com/tranminhvu128/" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <FaFacebookF /> Facebook
          </a>
        </Link>

        <Link href="https://twitter.com/tranmin79309125" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <FaTwitter /> Twitter
          </a>
        </Link>

        <Link href="/" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <FaYoutube /> Youtube
          </a>
        </Link>

        <Link href="https://www.instagram.com/tempest.vn/" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <FaInstagram /> Instagram
          </a>
        </Link>

        <Link href="https://discord.gg/st7vzKksH5" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <FaDiscord /> Discord
          </a>
        </Link>

        <Link href="https://zalo.me/0344723594" passHref>
          <a>
            <Image src={zalo} width={25} height={25} alt="zalo" /> Zalo
          </a>
        </Link>
      </SocialList>
    </SocialWrapper>
  );
}

export default Social;
