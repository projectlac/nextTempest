import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import LeftArrow from "../../../styles/assets/images/newsDes/LeftArrow.png";
import RightArrow from "../../../styles/assets/images/newsDes/RightArrow.png";
const TitleHighlight = styled(Box)({
  position: "relative",
  width: "100%",
  height: "50px",
  textAlign: "center",
  color: " #fff",
  fontSize: "30px",
  textShadow: "0 0 5px #69e0ff, 0 0 10px #69e0ff, 0 0 15px #69e0ff",
  "&:before": {
    position: "absolute",
    content: '""',
    background: `url(${LeftArrow.src})`,
    backgroundSize: "contain",
    height: "35px",
    width: "450px",
    top: 0,
    left: 0,
    backgroundRepeat: "no-repeat",
    "@media (max-width: 1024px)": {
      width: "360px",
    },
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  "&:after": {
    position: "absolute",
    content: '""',
    background: `url(${RightArrow.src})`,
    backgroundSize: "contain",
    height: "35px",
    width: "450px",
    top: 0,
    right: 0,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    "@media (max-width: 1024px)": {
      width: "360px",
    },
    "@media (max-width:768px)": {
      display: "none",
    },
  },
  "@media (max-width: 425px)": {
    fontSize: "23px",
  },
});
export default TitleHighlight;
