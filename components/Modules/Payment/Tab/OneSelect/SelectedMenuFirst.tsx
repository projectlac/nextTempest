import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Devider from "../../../../../styles/assets/images/payment/PaymentDevider.png";
import CustomizedRadios from "../../CustomItem/CustomizedRadios";
interface PropsSelectedMenu {
  handleValue: (value: string) => void;
  value: string;
}
const DashboardBox = styled(Box)(
  ({ theme }) => `
              height: 555px;
              width: 100%;
              background-color: #F4ECE0;
                border: 1px solid #DAB88F;
                border-radius: 30px;
                position:relative;
                z-index: 1;
                padding: 40px;
                text-align:center;
            `
);
function SelectedMenuFirst({ handleValue, value }: PropsSelectedMenu) {
  return (
    <DashboardBox>
      <Typography color="#726550" fontSize={32}>
        Các hình thức thanh toán
      </Typography>
      <Image src={Devider} alt="devider" width={440} height={14} />
      <Box textAlign={"left"}>
        <CustomizedRadios handleValue={handleValue} />
      </Box>
      <Box sx={{ margin: "0 auto" }} width={440}>
        {(() => {
          switch (value) {
            case "momo":
              return (
                <Box textAlign={"left"}>
                  <Typography fontSize={20} color="#9C6546" mt={1}>
                    Số điện thoại:
                  </Typography>
                  <Typography fontSize={16} color="#D09B5F" mt={1}>
                    0344723594 - TRAN MINH VU
                  </Typography>
                  <Typography
                    fontSize={16}
                    color="#9C6546"
                    mt={1}
                  >{`Nội dung: NAPTIEN + “Tên tài khoản"`}</Typography>
                </Box>
              );
              break;
            case "bank":
              return (
                <Box textAlign={"left"}>
                  <Typography fontSize={20} color="#9C6546" mt={1}>
                    Số tài khoản:
                  </Typography>
                  <Typography fontSize={16} color="#D09B5F" mt={1}>
                    TP bank - 04366222601 - TRAN MINH VU <br />
                    Nickname Shop - Tempestgenshin
                  </Typography>
                  <Typography fontSize={16} color="#D09B5F" mt={1}>
                    MB bank - 78989899992 - TRAN MINH V
                  </Typography>
                  <Typography
                    fontSize={16}
                    color="#9C6546"
                    mt={1}
                  >{`Nội dung: NAPTIEN + “Tên tài khoản"`}</Typography>
                </Box>
              );
              break;
            default:
              return (
                <Box textAlign={"left"}>
                  <Typography fontSize={20} color="#9C6546" mt={1}>
                    Paypal:
                  </Typography>
                  <Typography fontSize={16} color="#D09B5F" mt={1}>
                    hhuongtinlatao@gmail.com
                  </Typography>
                  <Typography
                    fontSize={16}
                    color="#9C6546"
                    mt={1}
                  >{`Nội dung: NAPTIEN + “Tên tài khoản"`}</Typography>
                </Box>
              );
          }
        })()}
      </Box>

      <Box mt={5} mb={1}>
        <Image src={Devider} alt="devider" width={440} height={14} />
      </Box>
      <Box>
        <Typography
          fontSize={14}
          color="#C69E72"
          sx={{
            "& span": {
              color: "#94674B",
            },
          }}
        >
          <span>Lưu ý:</span> Vui lòng nạp đúng nội dung để được cộng tiền nhanh
          nhất. Những tài khoản nạp sai nội dung của website sẽ bị trừ{" "}
          <span>10% số tiền</span>. Sau khi nạp từ 10-15 phút chưa nhận được
          tiền trong tài khoản vui lòng liên hệ <span>Admin</span> để được hỗ
          trợ.
        </Typography>
      </Box>
    </DashboardBox>
  );
}

export default SelectedMenuFirst;
