import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useEffect, useState } from "react";
import banner from "../../api/banner";
import useTrans from "../../pages/hook/useTrans";
import book from "../../styles/assets/images/Videos/Book_Tempest.png";
import background from "../../styles/assets/images/Videos/HomeBg1_Tempest.jpg";
import Even from "../../styles/assets/images/Videos/Button_Group_Tempest.png";

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
    position:relative;
        background-size: cover;
    background-position: bottom center;
    @media (min-width: 0px) {
      height: 700px;
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
const FrameTop = styled(Box)({});

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
  background-position:45px;
  @media (min-width: 0px) {
    width: 320px;
    height: 185px;
     top: 26%;
 background-position: -1px;
  } 
    @media (min-width: 450px) {
    width: 400px;
    height: 224px;
     top:40%;
 
  } 
  @media (min-width: 768px){
        width: 640px;
    height: 346px;
    top: 40%;
  background-position:9px;

  }
  @media (min-width: 1024px) {
    top: 56%;
    width:100%;
  background-position:-9px;
   height: 491px;
 } 
 @media (min-width: 1400px) {
  top: 50%;
  width:100%;
height: 484px;
background-position: -12px;
} 
@media (min-width: 1650px) {
     background-position: 40px;
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
     top: 45%;
 } 
  
      `
);

const Title = styled(Typography)(
  ({ theme }) => `
  width: 100%;
  text-align: center;
  padding-top: 80px;
  font-size: 25px;
  color:#2B78BB;
  @media (min-width: 0px) {
    font-size: 14px;  
   padding-top: 20px;
     top:85%;
    position: absolute;
 }
   @media (min-width: 450px) {
    font-size: 14px;  
   padding-top: 20px;
     top:65%;
    position: absolute;
 }
  @media (min-width: 768px) {
    font-size: 15px;
    top: 65%;
    position: absolute;
 } 

 @media (min-width: 1024px) {
  font-size: 21px;
   position: absolute;
  padding-top: 20px;
  top: auto;
    bottom: -4%;

} 
@media (min-width: 1400px) {
  padding-top: 65px;
  font-size: 21px;
bottom: 4%;
} 
      `
);
const ButtonEven = styled(Box)(({ theme }) => ({
  background: `url(${Even.src})`,
  color: "#F2EAC4",
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
  "&:hover": {
    transform: "scale(1.05)",
  },

  [theme.breakpoints.up("xs")]: {
    width: "45%",
    height: "50px",
    justifyContent: "center",
    margin: "0px auto 5px",
    fontSize: "10px",
  },

  [theme.breakpoints.up("sm")]: {
    width: "45%",
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
    height: "83px",
    width: "300px",
    justifyContent: "center",
    paddingTop: "2px",
    marginBottom: "22px",
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
    border:4px solid #fff7ed;
  }
  @media (min-width: 450px) {
    width: 356px; 
    height: 180px; 
  } 
  @media (min-width: 768px) {
    width: 504px;
    height: 279px;
    border: 10px solid #fff7ed;
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
      let index = res.data.indexOf(
        res.data.filter(
          (d) => d.id === "e7f97af1-d398-4a13-809a-e6f3349d866a"
        )[0]
      );

      let rawData = res.data[index];
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
    }, 800);
    lists[1].classList.add("active");
  };
  const prev = () => {
    let lists = document.querySelectorAll(".item");
    lists[0].classList.remove("active");
    lists[lists.length - 1].classList.add("add");
    setTimeout(() => {
      lists[lists.length - 1].classList.remove("add");
      document.getElementById("sliderBox").prepend(lists[lists.length - 1]);
    }, 800);
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

          <Title>
            <span>
              {trans[0][0]} <br /> {trans[0][1]}
            </span>
          </Title>
        </VideoBox>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            // flexWrap: "wrap",
            justifyContent: "space-around",
            width: { lg: "75vw", md: "80%", sm: "90%", xs: "90%" },
            margin: {
              lg: "15px auto",
              md: "177px auto 0",
              sm: "100px auto 0",
              xs: "-100px auto 0",
            },
            left: { xl: "0", lg: "0", xs: "0" },

            right: 0,
            position: "absolute",

            bottom: { xl: "6%", lg: "8%", md: "10%", xs: "45px" },
            "& p": {
              fontSize: { md: "1.25rem", xs: "11px" },
            },
          }}
        >
          <ButtonEven>
            <Link href={button[0].url} passHref>
              <a rel="noopener noreferrer">
                <Typography>{button[0].title}</Typography>
              </a>
            </Link>
          </ButtonEven>
          <ButtonEven>
            <Link href={button[1].url} passHref>
              <a rel="noopener noreferrer">
                <Typography>{button[1].title}</Typography>
              </a>
            </Link>
          </ButtonEven>

          <ButtonEven>
            <Link href={button[2].url} passHref>
              <a rel="noopener noreferrer">
                <Typography>{button[2].title}</Typography>
              </a>
            </Link>
          </ButtonEven>
          <ButtonEven>
            <Link href={button[2].url} passHref>
              <a rel="noopener noreferrer">
                <Typography>{button[3].title}</Typography>
              </a>
            </Link>
          </ButtonEven>
        </Box>
        {/* </PostBox> */}
      </FrameTop>
    </BgWrap>
  );
}

export default ModuleVideo;
