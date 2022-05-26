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
    top: "-40px",
    left: 0,
  },
  "&:after": {
    content: "''",
    position: "absolute",
    height: "85px",

    background: `url(${Bot.src})`,
    backgroundSize: `contain`,
    backgroundRepeat: `no-repeat`,
    width: "100%",
    bottom: "-65px",
    left: 0,
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
        <Typography color={"#4B65A3"} fontSize={30}>
          Chi tiết nhân vật và vũ khí
        </Typography>
        <Box
          sx={{
            fontFamily: "Montserrat",
            textAlign: "initial",
            fontSize: "20px",
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
          fontSize={20}
        >
          Vũ khí
        </Typography>
        <Box
          sx={{
            fontFamily: "Montserrat",
            textAlign: "initial",
            color: "#4B65A3",
            fontSize: 20,
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
