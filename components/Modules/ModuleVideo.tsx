import { Box, Button, Hidden, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import React, { useState } from "react";
import background from "../../styles/assets/images/Background.png";

import Frame from "../../styles/assets/images/Frame.png";
import Frame2 from "../../styles/assets/images/Frame2.png";
import Frame3 from "../../styles/assets/images/Layer16.png";
import Even from "../../styles/assets/images/Layer17.png";
import Icon from "../../styles/assets/images/Layer19.png";
import OnHover from "../../styles/assets/images/tag-2.png";
import poster from "../../styles/assets/images/Videos/play.png";
import play from "../../styles/assets/images/Videos/playbutton.png";

const BgWrap = styled(Box)(
  ({ theme }) => `
    height: 100vh;
    width: 100vw;
    display: flex;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 0;
    justify-content: center;
    align-items: center;
    background: url(${background.src});
    overflow:hidden;
    background-size: cover;
   

  `
);
const FrameTop = styled(Box)({
  height: "calc(100vh - 66px)",
  marginTop: "66px",
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "self-end",
  "&::before": {
    background: `url(${Frame.src})`,
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "150px",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    filter: "drop-shadow(0 0 47px #69e0ff)",
  },
  "&::after": {
    background: `url(${Frame2.src})`,
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "150px",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    filter: " drop-shadow(0 0 47px #69e0ff)",
  },
});

const PostBox = styled(Box)(
  ({ theme }) => `
  width:875px;
  height:516px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-55%);
  background:url(${Frame3.src});
  background-repeat: no-repeat;
  background-size: cover;

  
  @media (min-width: 0px) {
    width: 320px;
    height: 189px; top: 20%;
 
  } 
  @media (min-width: 768px){
    width: 570px;
    height: 336px;
    top: 40%;
  }
  @media (min-width: 1024px) {
    top: 40%;
    width:875px;
    height:516px;
 } 
 @media (min-width: 1440px) {
  top: 50%;
  width:875px;
  height:516px;
} 
    `
);

const VideoBox = styled(Box)(
  ({ theme }) => `
  width: 825px;
  height: 465px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);

  @media (min-width: 0px) {
    width: 320px;
    height: 189px;
    text-align: center;
  }
  @media (min-width: 768px) {
     width: 540px;height: 316px;
     
  } 
  @media (min-width: 1024px) {
    width: 825px;
    height: 465px;
 } 
  
      `
);
const PlayButton = styled(Box)(
  ({ theme }) => `
    position: relative;
    display: block;
    margin: 14px auto 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 0;
    background: #fff;
    font-size: 0;
    cursor: pointer;
    outline: none;
    transition: background 0.2s linear;
    @media (min-width: 0px) {
      margin: 11px auto 0;
      width: 38px;
      height: 38px;
    }
    @media (min-width: 768px) {
      margin: 14px auto 0;
      width: 48px;
      height: 48px;
    } 
    `
);
const Title = styled(Typography)(
  ({ theme }) => `
  width: 100%;
  text-align: center;
  padding-top: 40px;
  font-size: 25px;
  color: #fff;
  text-shadow: 0 0 10px #69e0ff, 0 0 20px #69e0ff, 0 0 40px #69e0ff;
  @media (min-width: 0px) {
    font-size: 14px;  
  
 }
  @media (min-width: 768px) {
     font-size: 15px;

 } 

 @media (min-width: 1024px) {
  font-size: 25px;
  padding-top: 20px;

} 
@media (min-width: 1440px) {
  padding-top: 40px;
} 
      `
);
const ButtonEven = styled(Typography)(({ theme }) => ({
  background: `url(${Even.src})`,
  color: "#fff",
  fontSize: "20px",
  display: "flex",
  fontWeight: 600,
  alignItems: "center",
  backgroundPosition: "bottom right",
  height: "77px",
  width: "200px",
  backgroundSize: "cover",
  paddingTop: "15px",
  justifyContent: "flex-start",
  transition: "all 0.3s ease",
  "&:hover": {
    background: `url(${OnHover.src})`,
    backgroundPosition: "bottom right",
    backgroundSize: "cover",
  },
  [theme.breakpoints.down("lg")]: {
    margin: "35px auto 5px",
    width: "33%",
    justifyContent: "center",
    paddingTop: "2px",
  },
  [theme.breakpoints.down("md")]: {
    margin: "35px auto 5px",
    width: "33%",
    justifyContent: "center",
    paddingTop: "2px",
    height: "50px",
    fontSize: "18px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "50%",
    height: "50px",
    justifyContent: "center",
    margin: "25px auto 5px",
    fontSize: "15px",
    "&:last-child": {
      margin: "5px auto 5px",
    },
  },
}));

const BoxEntry = styled(Box)(
  ({ theme }) => `
    width: 356px;
    height: 76px;
    background: url(${poster.src});
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
    transform: translateY(-50%);
    
  @media (min-width: 0px) {
    width: 282px;
    background-size: contain;
    background-repeat: no-repeat;
    height: 60px;
  }
  @media (min-width: 768px) {
    width: 356px; 
    height: 76px; 
  } 
 
      `
);
function ModuleVideo() {
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const playVideo = () => {
    setIsPlay(true);
    const myVideo = document.getElementById("video") as HTMLVideoElement | null;
    myVideo.volume = 0.75;
    myVideo.play();
  };
  const pauseVideo = () => {
    setIsPlay(false);
    const myVideo = document.getElementById("video") as HTMLVideoElement | null;
    myVideo.pause();
  };
  return (
    <BgWrap>
      <FrameTop>
        <PostBox>
          <VideoBox>
            <video
              id="video"
              width="825"
              height="465"
              onClick={pauseVideo}
              poster="https://drive.google.com/uc?export=view&id=15LwsoE9YGs7bJ_P9fRiJ7z97t0ESnRe6"
            >
              <source
                src="https://drive.google.com/uc?export=download&id=1gKNQZKReMVcUeh5udxumDgF12q9qxJAo"
                type="video/mp4"
              />
            </video>

            {!isPlay && (
              <BoxEntry>
                <PlayButton
                  sx={{
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      zIndex: "1",
                      width: "28px",
                      height: "28px",
                      transform: "translate(-50%, -50%)",
                      background: `url(${play.src})`,
                      backgroundPosition: "center top",
                    },
                    "&:hover": {
                      background: "transparent",
                      "&:before": {
                        backgroundPosition: "center bottom",
                      },
                    },
                  }}
                  onClick={playVideo}
                >
                  play
                </PlayButton>
              </BoxEntry>
            )}

            <Box
              sx={{
                position: {
                  lg: "absolute",
                  xs: "relative",
                },
                display: { lg: "inherit", xs: "flex" },
                flexWrap: "wrap",
                right: { lg: "-211.5px" },
                top: { lg: "10%" },
              }}
            >
              <ButtonEven>
                <Hidden lgDown>
                  <Image src={Icon} alt="" width={38} height={38} />{" "}
                </Hidden>
                Zalo
              </ButtonEven>
              <ButtonEven>
                <Hidden lgDown>
                  <Image src={Icon} alt="" width={38} height={38} />{" "}
                </Hidden>{" "}
                Facebook
              </ButtonEven>
              <ButtonEven>
                <Hidden lgDown>
                  <Image src={Icon} alt="" width={38} height={38} />{" "}
                </Hidden>{" "}
                Group
              </ButtonEven>
            </Box>
            <Title>
              Tempest Genshin nơi cung cấp tài khoản, <br /> Nạp game an toàn
              nhất Việt Nam
            </Title>
          </VideoBox>
        </PostBox>
      </FrameTop>
    </BgWrap>
  );
}

export default ModuleVideo;
