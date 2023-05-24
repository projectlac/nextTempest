import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import background from "../../../styles/assets/images/Shop/Mask-Group-1.jpg";
import Reputation from "./Reputation";

const NewWrapper = styled(Box)(
  ({ theme }) => `
  background-size: cover;
  background-image: url(${background.src});
  background-repeat: no-repeat; 
  background-position: top;
  background-color: #000;
  overflow:hidden;
  @media (max-width: 768px) {
    overflow:hidden;
}
        `
);

function SliderBoxReputation() {
  return (
    <NewWrapper>
      <Container>
        <Reputation />
      </Container>
    </NewWrapper>
  );
}

export default SliderBoxReputation;
