import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import Divider from "../../../styles/assets/images/Shop/DividerGur.png";
import NextBTN from "../../../styles/assets/images/Shop/NextButton.png";
import BackBTN from "../../../styles/assets/images/Shop/BackButton.png";

interface GuaranteeProps {
  handleSelect: (data: number) => void;
  handleStep: (s: number) => void;
}
const ButtonGroup = styled(Box)(
  () => `
        position:absolute;
        z-index:2;
        width: 100%;
        right: 0;
        bottom: -40px;
        display:flex;       justify-content: flex-end;  `
);

const NextButton = styled(Button)(() => ({
  background: `url(${NextBTN.src})`,
  width: "250px",
  height: "60px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "20px",
  marginLeft: "15px",
  textTransform: "capitalize",
  "@media (min-width:0)": {
    fontSize: "15px",
  },
  "@media (min-width: 768px)": {
    fontSize: "20px",
  },
}));
const BackButton = styled(Box)(() => ({
  background: `url(${BackBTN.src})`,
  width: "275px",
  height: "60px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "20px",
  "@media (min-width:0)": {
    fontSize: "15px",
  },
  "@media (min-width: 768px)": {
    fontSize: "20px",
  },
}));
function Guarantee({ handleSelect, handleStep }: GuaranteeProps) {
  const [selected, setSelected] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSelect(+e.target.value);
    setSelected(true);
  };
  return (
    <>
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          padding: "25px 0",
          height: { md: 530, xs: 580 },
        }}
        textAlign="center"
      >
        <Typography
          color={"#4B66A2"}
          sx={{
            fontSize: { md: 30, sx: 17 },
          }}
        >
          L???a ch???n ch??nh s??ch b???o h??nh
        </Typography>
        <Image src={Divider} alt="" width={440} height={15}></Image>
        <Typography
          color={"#4B66A2"}
          sx={{
            fontSize: { md: 20, sx: 13 },
          }}
          fontWeight={"600"}
          fontFamily="Montserrat"
        >
          B???O H??NH 1:1 KHI ACCOUNT C?? V???N ?????
        </Typography>
        <ul className="customRadio">
          <li>
            <label htmlFor="muhRadio1">
              <Box
                sx={{
                  display: "flex",
                  width: { md: " 800px", xs: "100%" },
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                <Box>
                  <input
                    type="radio"
                    name="muhRadio"
                    value="1"
                    onChange={handleChange}
                  />
                </Box>
                <Box textAlign={"left"} ml={2}>
                  <Typography
                    color={"#50A7CD"}
                    sx={{
                      fontSize: { md: 20, xs: 14 },
                    }}
                  >
                    C??ch 1: B??n m??nh s??? g???n gmail v??o t??i kho???n:
                  </Typography>
                  <Typography
                    color={"#9CABCC"}
                    sx={{
                      fontSize: { md: 18, xs: 13 },
                      ml: { md: 9.6, xs: 0 },
                    }}
                    fontFamily="Montserrat"
                    fontWeight={600}
                  >
                    B??n m??nh s??? g???n mail v??o t??i kho???n ????? tr??nh vi???c account
                    kh??ng b??? back m?? gi??? back ????? nh???n ho??n ti???n.
                  </Typography>
                </Box>
              </Box>
            </label>
          </li>
          <li style={{ marginTop: "15px" }}>
            <label htmlFor="muhRadio2">
              <Box
                sx={{
                  display: "flex",
                  width: { md: " 800px", xs: "100%" },
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                <Box>
                  <input
                    type="radio"
                    name="muhRadio"
                    value="2"
                    onChange={handleChange}
                  />
                </Box>
                <Box textAlign={"left"} ml={2}>
                  <Typography
                    color={"#50A7CD"}
                    sx={{
                      fontSize: { md: 20, xs: 14 },
                    }}
                  >
                    C??ch 2: B???n l???a ch???n n???m gmail t??i kho???n:
                  </Typography>
                  <Typography
                    color={"#9CABCC"}
                    sx={{
                      fontSize: { md: 18, xs: 13 },
                      ml: { md: 9.6, xs: 0 },
                    }}
                    fontFamily="Montserrat"
                    fontWeight={600}
                  >
                    N???u b??n m??nh kh??ng g???n b???t c??? gmail n??o th?? khi c??c b???n g???p
                    v???n ????? s??? ti???n h??nh b???o h??nh 1:1 trong c??c tr?????ng h???p nh??
                    sau:{" "}
                  </Typography>

                  <Typography
                    color={"#9CABCC"}
                    fontFamily="Montserrat"
                    fontWeight={600}
                    sx={{
                      fontSize: { md: 18, xs: 13 },
                      ml: { md: 15, xs: 0 },
                    }}
                  >
                    - B???{" "}
                    <span style={{ color: "#000" }}>thay ?????i Username.</span>
                    <br />- B???{" "}
                    <span style={{ color: "#000" }}>refund nguy??n th???ch. </span>
                  </Typography>

                  <Typography
                    color={"#9CABCC"}
                    sx={{
                      fontSize: { md: 18, xs: 13 },
                      ml: { md: 9.6, xs: 0 },
                    }}
                    fontFamily="Montserrat"
                    fontWeight={600}
                    mt={4}
                  >
                    Nh???n tr??? account n???u kh??ng h??i l??ng (70% trong th??ng ?????u
                    ti??n, sau th??ng ?????u l?? 50%)
                  </Typography>
                </Box>
              </Box>
            </label>
          </li>
        </ul>
      </Box>
      <ButtonGroup>
        <BackButton
          onClick={() => {
            handleStep(1);
          }}
        >{`< Quay l???i `}</BackButton>
        <NextButton
          sx={{
            "&.Mui-disabled": {
              color: "#00000070",
            },
          }}
          disabled={!selected}
          onClick={() => {
            handleStep(3);
          }}
        >{`Ti???p theo >`}</NextButton>
      </ButtonGroup>
    </>
  );
}

export default Guarantee;
