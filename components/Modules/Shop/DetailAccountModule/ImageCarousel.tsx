import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import background from "../../../../styles/assets/images/Shop/ImageCarouselBG.png";
import Top from "../../../../styles/assets/images/Shop/top.png";
import Mid from "../../../../styles/assets/images/Shop/mid.png";

import Bot from "../../../../styles/assets/images/Shop/bot.png";

import ImageGallery from "react-image-gallery";
const ImageWrap = styled(Box)({
  position: "relative",
  background: `url(${Mid.src})`,
  backgroundSize: "contain",
  padding: "15px 45px",
  "&:before": {
    content: "''",
    position: "absolute",
    height: "116px",
    background: `url(${Top.src})`,
    backgroundSize: `contain`,
    backgroundRepeat: `no-repeat`,
    width: "100%",
    top: "-45px",
    left: 0,
  },
  "&:after": {
    content: "''",
    position: "absolute",
    height: "116px",
    background: `url(${Bot.src})`,
    backgroundSize: `contain`,
    backgroundRepeat: `no-repeat`,
    width: "100%",
    bottom: "-65px",
    left: 0,
  },
});

interface ImageProps {
  imageList: string[];
}
interface ImageType {
  original: string;
  thumbnail: string;
}
function ImageCarousel({ imageList }: ImageProps) {
  const [images, setImage] = useState<ImageType[]>([
    {
      original: "",
      thumbnail: "",
    },
  ]);

  useEffect(() => {
    const newImage = imageList.map((d) => ({ original: d, thumbnail: d }));
    setImage(newImage);
  }, [imageList]);

  return (
    <ImageWrap>
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <ImageGallery
          items={images}
          thumbnailPosition="left"
          showPlayButton={false}
          showNav={false}
          showFullscreenButton={false}
        />
      </Box>
    </ImageWrap>
  );
}

export default ImageCarousel;
