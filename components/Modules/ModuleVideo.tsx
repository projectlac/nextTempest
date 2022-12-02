import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useEffect, useState } from "react";
import banner from "../../api/banner";
import useTrans from "../../pages/hook/useTrans";
import background from "../../styles/assets/images/Videos/Background_sumeru.jpg";
import book from "../../styles/assets/images/Videos/Book.png";
import Even from "../../styles/assets/images/Videos/button-group.png";
import Frame from "../../styles/assets/images/Videos/Frame.png";

const BgWrap = styled(Box)(
  ({ theme }) => `
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
    @media (min-width: 0px) {
      height: 600px;
    } 
    @media (min-width: 768px){
      height: 720px;
    }
    @media (min-width: 1024px) {
      height: 1000px;
   } 
   @media (min-width: 1400px) {
    height:1000px;
  } 

  `
);
const FrameTop = styled(Box)({
  marginTop: "66px",
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "self-end",
  // "&::before": {
  //   background: `url(${Frame.src})`,
  //   content: '""',
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   width: "100%",
  //   height: "150px",
  //   backgroundSize: "contain",
  //   backgroundRepeat: "no-repeat",
  //   filter: "drop-shadow(0 0 47px #69e0ff)",
  // },
  "&::after": {
    background: `url(${Frame.src})`,
    content: '""',
    position: "absolute",
    bottom: "5px",
    left: 0,
    right: 0,
    width: "100%",
    height: "36px",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    filter: " drop-shadow(0 0 47px #69e0ff)",
  },
  "@media (min-width: 0px)": {
    height: "calc(600px - 56px)",
  },
  "@media (min-width:760px)": {
    height: "calc(720px - 56px)",
  },
  "@media (min-width:1024px)": {
    height: "calc(1000px - 56px)",
  },
  "@media (min-width:1400px)": {
    height: "calc(1000px - 56px)",
  },
});

const BookWrap = styled(Box)(
  ({ theme }) => `
  width:100%;
 height: 530px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-55%);
  background:url(${book.src});
  background-repeat: no-repeat;
  background-size: contain;
  position:relative;
  background-position:center;
  @media (min-width: 0px) {
    width: 320px;
    height: 189px;
     top: 26%;
 
  } 
    @media (min-width: 450px) {
    width: 400px;
    height: 224px;
     top: 40%;
 
  } 
  @media (min-width: 768px){
        width: 640px;
    height: 346px;
    top: 40%;
  }
  @media (min-width: 1024px) {
    top: 56%;
    width:100%;
   height: 491px;
 } 
 @media (min-width: 1400px) {
  top: 50%;
  width:100%;
height: 479px;
} 
    `
);

const VideoBox = styled(Box)(
  ({ theme }) => `
     width: 957px;
    height: 658px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-56%);
  
  @media (min-width: 0px) {
    width: 320px;
    height: 189px;
    text-align: center;
  }
  @media (min-width: 450px) {
    width: 440px;
    height: 100%;
    text-align: center;
  }
  @media (min-width: 768px) {
        width: 630px;
    height: 100%;
     
  } 
  @media (min-width: 1024px) {
         width: 840px;
    height: 737px;
        top: 36%;
 } 
   @media (min-width: 1400px) {
       top: 50%;
      width: 840px;
    height: 737px;

 } 
  @media (min-width: 1650px) {
        width: 957px;
    height: 658px;
     top: 50%;
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
  padding-top: 80px;
  font-size: 25px;
  color: #fff;
  text-shadow: 0 0 10px #69e0ff, 0 0 20px #69e0ff, 0 0 40px #69e0ff;
  @media (min-width: 0px) {
    font-size: 14px;  
   padding-top: 20px;
 }
  @media (min-width: 768px) {
     font-size: 15px;
 padding-top: 20px;
 } 

 @media (min-width: 1024px) {
  font-size: 23px;
  padding-top: 20px;

} 
@media (min-width: 1400px) {
  padding-top: 80px;
  font-size: 27px;

} 
      `
);
const ButtonEven = styled(Box)(({ theme }) => ({
  background: `url(${Even.src})`,
  color: "#fff",
  fontSize: "20px",
  display: "flex",
  fontWeight: 600,
  alignItems: "center",
  backgroundPosition: "center",
  height: "78px",
  width: "261px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  justifyContent: "center",
  transition: "all 0.3s ease",
  marginBottom: "22px",
  "& a": {
    display: "flex",
    alignItems: "center",
  },
  // "&:hover": {
  //   background: `url(${OnHover.src})`,
  //   backgroundPosition: "bottom right",
  //   backgroundSize: "cover",
  // },

  [theme.breakpoints.up("xs")]: {
    width: "50%",
    height: "50px",
    justifyContent: "center",
    margin: "25px auto 5px",
    fontSize: "10px",
  },

  [theme.breakpoints.up("sm")]: {
    width: "50%",
    height: "50px",
    justifyContent: "center",
    margin: "25px auto 5px",
    fontSize: "15px",
  },

  [theme.breakpoints.up("md")]: {
    margin: "15px auto 5px",
    width: "33%",
    justifyContent: "center",
    paddingTop: "2px",
    height: "60px",
    fontSize: "16px",
  },

  [theme.breakpoints.up("lg")]: {
    width: "220px",
    justifyContent: "center",
    paddingTop: "2px",
    marginBottom: "22px",
    height: "67px",
  },
  [theme.breakpoints.up("xl")]: {
    height: "70px",
    width: "220px",
  },
}));

const Item = styled("div")(
  ({ theme }) => `
    width: 774px;
     height: 430px;
    border: 10px solid #fff7ed;
    background-size: cover;
    position: absolute;
    z-index: 3;
    transition: transform 1s;
    opacity: 1;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 50%;
    transform: translateY(-51%);
    box-shadow: 0px 0px 5px 1px #d4d4d4;
    opacity: 0;
  @media (min-width: 0px) {
    width: 282px;
    height: 172px;
  }
  @media (min-width: 450px) {
    width: 356px; 
    height: 180px; 
  } 
  @media (min-width: 768px) {
    width: 504px;
    height: 279px;
  } 
  @media (min-width: 1024px) {
    width: 700px; 
    height: 400px; 
  } 
  @media (min-width: 1440px) {
    width: 700px;
     height: 400px; 
  } 
  
 
      `
);
interface IInfor {
  url: string;
  title: string;
}
function ModuleVideo() {
  const trans = useTrans();
  const [button, setButton] = useState<IInfor[]>([
    { title: "", url: "" },
    { title: "", url: "" },
    { title: "", url: "" },
    { title: "", url: "" },
    { title: "", url: "" },
    { title: "", url: "" },
  ]);
  const [image, setImage] = useState<IInfor[]>([]);

  useEffect(() => {
    banner.getInforHomePage().then((res) => {
      let rawData = res.data[0];
      let data = {
        title: rawData.title.split(","),
        url: rawData.url.split(","),
      };
      let button = [];
      let image = [];
      for (let index = 0; index < 6; index++) {
        button.push({
          title: data.title[index],
          url: data.url[index],
        });
      }
      for (let index = 6; index < data.title.length; index++) {
        image.push({
          title: data.title[index],
          url: data.url[index],
        });
      }
      setButton(button);
      setImage(image);
    });
  }, []);
  // const [isPlay, setIsPlay] = useState<boolean>(false);

  // const playVideo = () => {
  //   setIsPlay(true);
  //   const myVideo = document.getElementById("video") as HTMLVideoElement | null;
  //   myVideo.volume = 0.75;
  //   myVideo.play();
  // };
  // const pauseVideo = () => {
  //   setIsPlay(false);
  //   const myVideo = document.getElementById("video") as HTMLVideoElement | null;
  //   myVideo.pause();
  // };

  const next = () => {
    let lists = document.querySelectorAll(".item");
    lists[0].classList.remove("active");
    lists[0].classList.add("remove");
    setTimeout(() => {
      lists[0].classList.remove("remove");
      document.getElementById("sliderBox").appendChild(lists[0]);
    }, 1200);
    lists[1].classList.add("active");
  };
  const prev = () => {
    let lists = document.querySelectorAll(".item");
    lists[0].classList.remove("active");
    lists[lists.length - 1].classList.add("add");
    setTimeout(() => {
      lists[lists.length - 1].classList.remove("add");
      document.getElementById("sliderBox").prepend(lists[lists.length - 1]);
    }, 1200);
    lists[lists.length - 1].classList.add("active");
  };

  return (
    <BgWrap>
      <FrameTop>
        {/* <PostBox> */}
        <VideoBox className="box-slider">
          <button id="prev" onClick={prev}></button>
          <button id="next" onClick={next}></button>
          <BookWrap id="sliderBox">
            {/* <Box className="item">
              <video
                id="video"
                width="825"
                height="465"
                onClick={pauseVideo}
                poster={frame_video.src}
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
            </Box> */}
            {image.length > 0 &&
              image.map((d, i) => (
                <Item
                  key={i}
                  className="item"
                  style={{
                    backgroundImage: `url(${d.url})`,
                  }}
                ></Item>
              ))}
          </BookWrap>

          <Box
            sx={{
              position: {
                lg: "absolute",
                xs: "relative",
              },
              display: { lg: "inherit", xs: "flex" },
              // flexWrap: "wrap",
              justifyContent: "space-around",
              width: { lg: "auto", md: "80%", sm: "100%", xs: "100%" },
              margin: {
                lg: "0 auto",
                md: "177px auto 0",
                sm: "100px auto 0",
                xs: "-100px auto 0",
              },
              left: { xl: "-330px", lg: "-274px" },
              top: { xl: "25.6%", lg: "29.6%" },
            }}
          >
            <ButtonEven>
              <Link href={button[0].url} passHref>
                <a rel="noopener noreferrer">
                  <Typography component="h1">{button[0].title}</Typography>
                </a>
              </Link>
            </ButtonEven>
            <ButtonEven>
              <Link href={button[1].url} passHref>
                <a rel="noopener noreferrer">
                  <Typography component="h1">{button[1].title}</Typography>
                </a>
              </Link>
            </ButtonEven>

            <ButtonEven>
              <Link href={button[2].url} passHref>
                <a rel="noopener noreferrer">
                  <Typography component="h1">{button[2].title}</Typography>
                </a>
              </Link>
            </ButtonEven>
          </Box>
          <Box
            sx={{
              position: {
                lg: "absolute",
                xs: "relative",
              },
              width: { lg: "auto", md: "80%", sm: "100%", xs: "100%" },
              margin: { sm: "0 auto", xs: "-35px auto 0" },
              display: { lg: "inherit", xs: "flex" },
              justifyContent: "space-around",

              right: { xl: "-330px", lg: "-274px" },
              top: { xl: "25.6%", lg: "29.6%" },
            }}
          >
            <ButtonEven>
              <Link href={button[3].url} passHref>
                <a rel="noopener noreferrer">
                  <Typography component="h1">{button[3].title}</Typography>
                </a>
              </Link>
            </ButtonEven>
            <ButtonEven>
              <Link href={button[4].url} passHref>
                <a rel="noopener noreferrer">
                  <Typography component="h1">{button[4].title}</Typography>
                </a>
              </Link>
            </ButtonEven>

            <ButtonEven>
              <Link href={button[5].url} passHref>
                <a rel="noopener noreferrer">
                  <Typography component="h1">{button[5].title}</Typography>
                </a>
              </Link>
            </ButtonEven>
          </Box>
          <Title>
            <span>
              {trans[0][0]} <br /> {trans[0][1]}
            </span>
          </Title>
        </VideoBox>
        {/* </PostBox> */}
      </FrameTop>
    </BgWrap>
  );
}

export default ModuleVideo;
