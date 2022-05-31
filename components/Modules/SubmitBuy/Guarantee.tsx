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
  ({ theme }) => `
        position:absolute;
        z-index:2;
        width: 100%;
        right: 0;
        bottom: -93px;
        display:flex;       justify-content: flex-end;  `
);

const NextButton = styled(Button)(
  ({ theme }) => `
            background: url(${NextBTN.src});
          width: 250px;
          height: 60px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 20px; margin-left:15px;
          text-transform:capitalize; `
);
const BackButton = styled(Box)(
  ({ theme }) => `
  background: url(${BackBTN.src});
  width: 275px;
  height: 60px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;    `
);
function Guarantee({ handleSelect, handleStep }: GuaranteeProps) {
  const [selected, setSelected] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSelect(+e.target.value);
    setSelected(true);
  };
  return (
    <>
      <Box
        height={530}
        sx={{ position: "relative", zIndex: 2 }}
        textAlign="center"
      >
        <Typography color={"#4B66A2"} fontSize={30}>
          Lựa chọn chính sách bảo hành
        </Typography>
        <Image src={Divider} alt="" width={440} height={15}></Image>
        <Typography
          color={"#4B66A2"}
          fontSize={20}
          fontWeight={"600"}
          fontFamily="Montserrat"
        >
          BẢO HÀNH 1:1 KHI ACCOUNT CÓ VẤN ĐỀ
        </Typography>
        <ul className="customRadio">
          <li>
            <label htmlFor="muhRadio1">
              <Box
                sx={{
                  display: "flex",
                  width: " 800px",
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
                  <Typography color={"#50A7CD"} fontSize={20}>
                    Cách 1: Bên mình sẽ gắn gmail vào tài khoản:
                  </Typography>
                  <Typography
                    color={"#9CABCC"}
                    fontSize={18}
                    fontFamily="Montserrat"
                    fontWeight={600}
                    ml={9.6}
                  >
                    Bên mình sẽ gắn mail vào tài khoản để tránh việc account
                    không bị back mà giả back để nhận hoàn tiền.
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
                  width: " 800px",
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
                  <Typography color={"#50A7CD"} fontSize={20}>
                    Cách 2: Bạn lựa chọn nắm gmail tài khoản:
                  </Typography>
                  <Typography
                    color={"#9CABCC"}
                    fontSize={18}
                    fontFamily="Montserrat"
                    fontWeight={600}
                    ml={9.6}
                  >
                    Nếu bên mình không gắn bất cứ gmail nào thì khi các bạn gặp
                    vấn đề sẽ tiến hành bảo hành 1:1 trong các trường hợp như
                    sau:{" "}
                  </Typography>

                  <Typography
                    color={"#9CABCC"}
                    fontSize={18}
                    fontFamily="Montserrat"
                    fontWeight={600}
                    ml={15}
                  >
                    - Bị{" "}
                    <span style={{ color: "#000" }}>thay đổi Username.</span>
                    <br />- Bị{" "}
                    <span style={{ color: "#000" }}>refund nguyên thạch. </span>
                  </Typography>

                  <Typography
                    color={"#9CABCC"}
                    fontSize={18}
                    fontFamily="Montserrat"
                    fontWeight={600}
                    ml={9.6}
                    mt={4}
                  >
                    Nhận trả account nếu không hài lòng (70% trong tháng đầu
                    tiên, sau tháng đầu là 50%)
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
        >{`< Quay lại `}</BackButton>
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
        >{`Tiếp theo >`}</NextButton>
      </ButtonGroup>
    </>
  );
}

export default Guarantee;
