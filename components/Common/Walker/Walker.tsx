import { Box, styled } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import image from "../../../styles/assets/images/human.png";
const BoxRunning = styled(Box)({
  position: "fixed",
  top: "-500px",
  left: 0,
  zIndex: 99,
  "@media (max-width: 1024px)": {
    display: "block",
  },
  "@media (max-width: 435px)": {
    display: "none",
  },
});

function Walker() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const handleScroll = () => {
    const position =
      (window.pageYOffset * window.innerHeight) / document.body.offsetHeight;
    setScrollPosition(position + 350);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <BoxRunning
      sx={{
        transform: `translateY(${scrollPosition}px)`,
      }}
    >
      <Image src={image} height={128} width={128} alt="human" />
    </BoxRunning>
  );
}

export default Walker;
