import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import background from "../../../../styles/assets/images/Shop/ImageCarouselBG.png";
import ImageGallery from "react-image-gallery";
const ImageWrap = styled(Box)(
  ({ theme }) => `
    
      width: 100%;
        min-height:600px;
      display: flex;
      background: url(${background.src});
      overflow:hidden;
      padding:50px 30px;
      background-size: contain;
      background-repeat:no-repeat;
      justify-content:center;
    `
);

function ImageCarousel() {
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/500/",
      thumbnail: "https://picsum.photos/id/1018/1000/500/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/500/",
      thumbnail: "https://picsum.photos/id/1015/1000/500/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/500/",
      thumbnail: "https://picsum.photos/id/1019/1000/500/",
    },
  ];

  return (
    <ImageWrap>
      <ImageGallery
        items={images}
        thumbnailPosition="left"
        showPlayButton={false}
        showNav={false}
        showFullscreenButton={false}
      />
    </ImageWrap>
  );
}

export default ImageCarousel;
