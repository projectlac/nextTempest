import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import background from "../../../../styles/assets/images/Shop/ImageCarouselBG.png";
import Top from "../../../../styles/assets/images/Shop/top.png";
import Mid from "../../../../styles/assets/images/Shop/mid.png";

import Bot from "../../../../styles/assets/images/Shop/bot.png";

import ImageGallery from "react-image-gallery";
import { TAG_TYPE } from "../../../../types/account";
const BGWrap = styled(Box)({
  position: "relative",
  background: `url(${Mid.src})`,
  backgroundSize: "contain",
  padding: "0px 35px 25px",
  "&:before": {
    content: "''",
    position: "absolute",
    height: "116px",
    background: `url(${Top.src})`,
    backgroundSize: `contain`,
    backgroundRepeat: `no-repeat`,
    width: "100%",

    left: 0,

    "@media (min-width:0)": {
      top: "-20px",
    },
    "@media (min-width: 768px)": {
      top: "-50px",
    },
    "@media (min-width: 1024px)": {
      top: "-40px",
    },
  },
  "&:after": {
    content: "''",
    position: "absolute",
    height: "85px",

    background: `url(${Bot.src})`,
    backgroundSize: `contain`,
    backgroundRepeat: `no-repeat`,
    width: "100%",

    left: 0,

    "@media (min-width:0)": {
      bottom: "-70px",
    },
    "@media (min-width: 1024px)": {
      bottom: "-65px",
    },
  },
});

interface DetailProps {
  description: string;
  weapon: string[];
}
function DetailInformation({ description, weapon }: DetailProps) {
  return (
    <BGWrap>
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          color={"#4B65A3"}
          sx={{
            fontSize: {
              lg: "30px",
              xs: "20px",
            },
          }}
        >
          Chi tiết nhân vật và vũ khí
        </Typography>
        <Box
          sx={{
            fontFamily: "Montserrat",
            textAlign: "initial",
            fontSize: {
              md: "20px",
              xs: "15px",
            },
            fontWeight: 500,
            color: "#4B65A3",
          }}
          dangerouslySetInnerHTML={{ __html: description }}
        ></Box>
        <Typography
          color={"#4B65A3"}
          fontFamily="Montserrat"
          fontWeight={"bold"}
          textAlign="left"
          sx={{
            fontSize: {
              md: "20px",
              xs: "15px",
            },
          }}
        >
          Vũ khí
        </Typography>
        <Box
          sx={{
            fontFamily: "Montserrat",
            textAlign: "initial",
            color: "#4B65A3",
            fontSize: {
              md: "20px",
              xs: "15px",
            },
            fontWeight: 500,
          }}
        >
          {(weapon || []).map((d: any, i: number) => (
            <span key={i}>
              {d.title}
              {weapon.length - 1 !== i && ","}{" "}
            </span>
          ))}
        </Box>
      </Box>
    </BGWrap>
  );
}

export default DetailInformation;
