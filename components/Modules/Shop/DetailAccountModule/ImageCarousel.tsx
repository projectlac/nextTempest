import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Mid from "../../../../styles/assets/images/Shop/mid.png";
import Top from "../../../../styles/assets/images/Shop/top.png";
import Bot from "../../../../styles/assets/images/Shop/bot.png";
import ImageGallery from "react-image-gallery";
const ImageWrap = styled(Box)({
  position: "relative",
  background: `url(${Mid.src})`,
  backgroundSize: "contain",

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
      top: "-45px",
    },
  },
  "&:after": {
    content: "''",
    position: "absolute",
    height: "116px",
    background: `url(${Bot.src})`,
    backgroundSize: `contain`,
    backgroundRepeat: `no-repeat`,
    width: "100%",

    left: 0,

    "@media (min-width:0)": {
      bottom: "-100px",
    },
    "@media (min-width: 768px)": {
      bottom: "-70px",
    },
    "@media (min-width: 1024px)": {
      bottom: "-55px",
    },
  },

  "@media (min-width:0)": {
    padding: "15px 25px",
  },
  "@media (min-width: 768px)": {
    padding: "15px 45px",
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
          thumbnailPosition="bottom"
          showPlayButton={false}
          showNav={false}
          showThumbnails={images.length > 1 ? true : false}
        />
      </Box>
    </ImageWrap>
  );
}

export default ImageCarousel;
