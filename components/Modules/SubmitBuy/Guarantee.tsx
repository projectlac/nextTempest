import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Divider from "../../../styles/assets/images/Shop/DividerGur.png";
interface GuaranteeProps {
  handleSelect: (data: number) => void;
}
function Guarantee({ handleSelect }: GuaranteeProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSelect(+e.target.value);
  };
  return (
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
                  Bên mình sẽ gắn mail vào tài khoản để tránh việc account không
                  bị back mà giả back để nhận hoàn tiền.
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
                  vấn đề sẽ tiến hành bảo hành 1:1 trong các trường hợp như sau:{" "}
                </Typography>

                <Typography
                  color={"#9CABCC"}
                  fontSize={18}
                  fontFamily="Montserrat"
                  fontWeight={600}
                  ml={15}
                >
                  - Bị <span style={{ color: "#000" }}>thay đổi Username.</span>
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
                  Nhận trả account nếu không hài lòng (70% trong tháng đầu tiên,
                  sau tháng đầu là 50%)
                </Typography>
              </Box>
            </Box>
          </label>
        </li>
      </ul>
    </Box>
  );
}

export default Guarantee;
