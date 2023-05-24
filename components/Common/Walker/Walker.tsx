import { Box, styled } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import image from "../../../styles/assets/images/rimumu.png";
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
  const [scrollPosition, setScrollPosition] = useState<number>(650);

  const handleScroll = () => {
    const position =
      (window.pageYOffset * window.innerHeight) / document.body.offsetHeight;
    setScrollPosition(position + 650);
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
      <Image src={image} height={83} width={75} alt="human" />
    </BoxRunning>
  );
}

export default Walker;
