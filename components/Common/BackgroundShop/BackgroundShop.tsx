import BGContainer from "../../../styles/assets/images/Shop/mid.png";
import BGContainerTop from "../../../styles/assets/images/Shop/top.png";
import BGContainerBot from "../../../styles/assets/images/Shop/bot.png";
import { styled } from "@mui/system";
import { Container } from "@mui/material";

const BackgroundShop = styled(Container)({
  background: `url(${BGContainer.src})`,
  position: "relative",
  backgroundSize: "contain",

  "&:before": {
    position: "absolute",
    content: "''",
    background: `url(${BGContainerTop.src})`,
    height: "116px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    left: "0",
    top: "-50px",
    zIndex: "1",
    width: "100%",
  },
  "&:after": {
    position: "absolute",
    content: "''",
    background: `url(${BGContainerBot.src})`,
    height: "116px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    left: "0",
    bottom: "-70px",
    zIndex: "1",
    width: "100%",
  },
});
export default BackgroundShop;
